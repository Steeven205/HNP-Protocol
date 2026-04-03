/**
 * Corporate Agent — Boucle agentique Claude API + MCP.
 *
 * Flow :
 * 1. Reçoit un trigger de voyage (TravelRequestTrigger)
 * 2. Construit le message utilisateur avec le contexte
 * 3. Boucle : Claude raisonne → tool_use → MCP → tool_result → Claude
 * 4. Termine quand Claude rend un verdict (CONFIRMED/ESCALATED/REJECTED)
 */

import Anthropic from "@anthropic-ai/sdk";
import { randomUUID } from "node:crypto";

import type { TravelRequestTrigger } from "@hnp/protocol";

import { HotelMcpClient } from "./mcp-client.js";
import {
  loadCorporateData,
  buildSystemPrompt,
  type CorporateData,
} from "./system-prompt.js";
import { evaluateOffer } from "./policy-engine.js";

const MAX_ITERATIONS = 15;
const MODEL = "claude-sonnet-4-20250514";

export interface NegotiationResult {
  status: "CONFIRMED" | "ESCALATED" | "REJECTED" | "ERROR";
  request_id: string;
  final_rate_eur?: number;
  rounds: number;
  savings_pct?: number;
  reason: string;
  transcript: TranscriptEntry[];
}

export interface TranscriptEntry {
  role: "assistant" | "tool";
  content: string;
  timestamp: string;
  tool_name?: string;
}

export type NegotiationEventType =
  | "session_start"
  | "mcp_connected"
  | "iteration_start"
  | "agent_text"
  | "tool_call"
  | "tool_result"
  | "policy_guard"
  | "negotiation_end";

export interface NegotiationEvent {
  type: NegotiationEventType;
  timestamp: string;
  data: Record<string, unknown>;
}

export interface AgentOptions {
  verbose?: boolean;
  onEvent?: (event: NegotiationEvent) => void;
}

export async function runNegotiation(
  trigger: TravelRequestTrigger,
  options: AgentOptions = {},
): Promise<NegotiationResult> {
  const { verbose = false, onEvent } = options;
  const log = verbose
    ? (...args: unknown[]) => console.error("[corporate-agent]", ...args)
    : () => {};

  const emit = (type: NegotiationEventType, data: Record<string, unknown>) => {
    onEvent?.({ type, timestamp: new Date().toISOString(), data });
  };

  const request_id = randomUUID();
  const transcript: TranscriptEntry[] = [];

  // ─── Load corporate policy ────────────────────────────────────────
  log("Chargement politique corporate...");
  const corporateData = await loadCorporateData();
  const systemPrompt = buildSystemPrompt(corporateData);

  // ─── Connect to hotel-agent MCP ───────────────────────────────────
  log("Connexion au hotel-agent MCP...");
  const mcpClient = new HotelMcpClient();
  await mcpClient.connect();

  try {
    const tools = await mcpClient.listToolsAsAnthropicFormat();
    log(`${tools.length} outils MCP chargés : ${tools.map((t) => t.name).join(", ")}`);
    emit("mcp_connected", { tools: tools.map((t) => t.name), request_id });

    // ─── Build user message ───────────────────────────────────────────
    const userMessage = buildUserMessage(trigger, request_id, corporateData);
    emit("session_start", { request_id, trigger, budget: getBudget(trigger, corporateData) });

    // ─── Init Anthropic client ────────────────────────────────────────
    const anthropic = new Anthropic();
    const messages: Anthropic.MessageParam[] = [
      { role: "user", content: userMessage },
    ];

    // ─── Agentic loop ─────────────────────────────────────────────────
    let iterations = 0;

    while (iterations < MAX_ITERATIONS) {
      iterations++;
      log(`\n── Iteration ${iterations} ──`);
      emit("iteration_start", { iteration: iterations });

      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 4096,
        system: systemPrompt,
        tools,
        messages,
      });

      // Process response content blocks
      const assistantContent = response.content;
      const toolUseBlocks: Anthropic.ToolUseBlock[] = [];
      const textParts: string[] = [];

      for (const block of assistantContent) {
        if (block.type === "text") {
          textParts.push(block.text);
          log(`\n💬 Agent:\n${block.text}`);
          emit("agent_text", { text: block.text });
        } else if (block.type === "tool_use") {
          toolUseBlocks.push(block);
        }
      }

      if (textParts.length > 0) {
        transcript.push({
          role: "assistant",
          content: textParts.join("\n"),
          timestamp: new Date().toISOString(),
        });
      }

      // ─── No tool calls → negotiation complete ──────────────────────
      if (response.stop_reason === "end_turn" && toolUseBlocks.length === 0) {
        log("\n✓ Négociation terminée (pas d'appels outils)");
        emit("negotiation_end", { reason: "end_turn", iterations });
        break;
      }

      // ─── Process tool calls ────────────────────────────────────────
      if (toolUseBlocks.length > 0) {
        // Add assistant message with all content blocks
        messages.push({ role: "assistant", content: assistantContent });

        const toolResults: Anthropic.ToolResultBlockParam[] = [];

        for (const toolBlock of toolUseBlocks) {
          log(`\n🔧 Tool: ${toolBlock.name}(${JSON.stringify(toolBlock.input)})`);
          emit("tool_call", { name: toolBlock.name, input: toolBlock.input });

          const { result, isError } = await mcpClient.callTool(
            toolBlock.name,
            toolBlock.input as Record<string, unknown>,
          );

          log(`   → ${isError ? "❌" : "✓"} ${result.slice(0, 200)}${result.length > 200 ? "..." : ""}`);
          emit("tool_result", { name: toolBlock.name, result, isError });

          // Policy engine guard on hotel_make_offer and hotel_get_rates
          const guardedResult = maybeApplyPolicyGuard(
            toolBlock.name,
            result,
            trigger,
            corporateData,
            log,
          );

          transcript.push({
            role: "tool",
            content: guardedResult ?? result,
            timestamp: new Date().toISOString(),
            tool_name: toolBlock.name,
          });

          toolResults.push({
            type: "tool_result",
            tool_use_id: toolBlock.id,
            content: guardedResult ?? result,
            is_error: isError,
          });
        }

        messages.push({ role: "user", content: toolResults });
      }

      // If stop_reason is end_turn with tool calls processed, continue loop
      if (response.stop_reason === "end_turn" && toolUseBlocks.length > 0) {
        // Claude decided to end after tool calls, keep looping for final response
        continue;
      }
    }

    if (iterations >= MAX_ITERATIONS) {
      log("⚠ Max iterations atteint");
    }

    // ─── Extract result from transcript ───────────────────────────────
    return extractResult(request_id, transcript, iterations);
  } finally {
    await mcpClient.disconnect();
  }
}

function getBudget(trigger: TravelRequestTrigger, corporate: CorporateData): number {
  const city = trigger.destination.toLowerCase();
  return (
    corporate.travel_policy.max_rate_per_night_eur[city] ??
    corporate.travel_policy.max_rate_per_night_eur["default"] ??
    130
  );
}

function buildUserMessage(
  trigger: TravelRequestTrigger,
  request_id: string,
  corporate: CorporateData,
): string {
  const budget = getBudget(trigger, corporate);

  const nights = Math.ceil(
    (new Date(trigger.check_out).getTime() -
      new Date(trigger.check_in).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const traveler = corporate.travelers.find(
    (t) => t.name === trigger.traveler,
  );

  return `NOUVELLE DEMANDE DE VOYAGE — ID: ${request_id}

Voyageur : ${trigger.traveler}${traveler ? ` (${traveler.role})` : ""}
Destination : ${trigger.destination}
Check-in : ${trigger.check_in}
Check-out : ${trigger.check_out}
Durée : ${nights} nuit(s)
${trigger.purpose ? `Motif : ${trigger.purpose}` : ""}

Budget max pour ${trigger.destination} : ${budget}€/nuit
Corporate ID : ${corporate.corporate_id}

Négocie la meilleure offre possible pour ce voyage en suivant le protocole.
Commence par vérifier la disponibilité, puis obtiens les tarifs.`;
}

/**
 * Injecte un avertissement du policy engine dans les résultats d'outil
 * quand un tarif est au-dessus du budget.
 */
function maybeApplyPolicyGuard(
  toolName: string,
  result: string,
  trigger: TravelRequestTrigger,
  corporate: CorporateData,
  log: (...args: unknown[]) => void,
): string | null {
  if (toolName !== "hotel_get_rates") return null;

  try {
    const parsed = JSON.parse(result) as {
      adjusted_rate_eur?: number;
    };

    if (!parsed.adjusted_rate_eur) return null;

    const evaluation = evaluateOffer(
      {
        rate_eur: parsed.adjusted_rate_eur,
        destination: trigger.destination,
        cancellation_policy: "flexible",
        esg_tier: "A",
        inclusions: [],
        nights: 1,
        round_number: 0,
      },
      corporate,
    );

    if (evaluation.verdict !== "ACCEPT") {
      const guard = `\n\n⚠️ POLICY ENGINE: ${evaluation.verdict}\n${evaluation.checks
        .filter((c) => !c.passed)
        .map((c) => `- ${c.detail}`)
        .join("\n")}`;
      log(`   🛡️ Policy guard: ${evaluation.verdict}`);
      return result + guard;
    }
  } catch {
    // Ignore parse errors
  }

  return null;
}

function extractResult(
  request_id: string,
  transcript: TranscriptEntry[],
  iterations: number,
): NegotiationResult {
  // Find the last assistant message with a JSON result block
  const lastAssistant = [...transcript]
    .reverse()
    .find((t) => t.role === "assistant");

  if (!lastAssistant) {
    return {
      status: "ERROR",
      request_id,
      rounds: iterations,
      reason: "Aucune réponse de l'agent",
      transcript,
    };
  }

  // Try to extract JSON result block
  const jsonMatch = lastAssistant.content.match(
    /```json\s*\n([\s\S]*?)\n\s*```/,
  );

  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1]) as {
        status?: string;
        request_id?: string;
        final_rate_eur?: number;
        rounds?: number;
        savings_pct?: number;
        reason?: string;
      };

      return {
        status: (parsed.status as NegotiationResult["status"]) ?? "CONFIRMED",
        request_id: parsed.request_id ?? request_id,
        final_rate_eur: parsed.final_rate_eur,
        rounds: parsed.rounds ?? iterations,
        savings_pct: parsed.savings_pct,
        reason: parsed.reason ?? "Négociation terminée",
        transcript,
      };
    } catch {
      // Fall through to heuristic
    }
  }

  // Heuristic: check for keywords
  const text = lastAssistant.content.toLowerCase();
  let status: NegotiationResult["status"] = "CONFIRMED";
  if (text.includes("escalad")) status = "ESCALATED";
  if (text.includes("rejet") || text.includes("refus")) status = "REJECTED";

  return {
    status,
    request_id,
    rounds: iterations,
    reason: lastAssistant.content.slice(0, 200),
    transcript,
  };
}
