#!/usr/bin/env npx tsx
/**
 * HNP Platform — Démonstration de négociation IA-à-IA
 *
 * Ce script lance une négociation réelle entre :
 *   - Agent Corporate (Claude API — travel manager IA de TechCorp SAS)
 *   - Agent Hôtelier  (MCP Server — Le Marais Boutique Hotel)
 *
 * L'orchestrateur HNP supervise la session, génère l'audit trail
 * avec hash SHA256, et applique les timeouts/escalades.
 *
 * Usage :
 *   npm run demo             → Négociation standard
 *   npm run demo:verbose     → Avec logs détaillés des outils
 */

import { config } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });
config({ path: resolve(__dirname, "../.env") });

import {
  createSession,
  updateSessionStatus,
  createAuditEntry,
  sha256,
  computeSessionDurationMs,
  type AuditEntry,
  type NegotiationSession,
} from "@hnp/protocol";

import {
  runNegotiation,
  type NegotiationEvent,
  type NegotiationResult,
} from "@hnp/corporate-agent/agent";

// ─── Config ──────────────────────────────────────────────────────────────────

const verbose = process.argv.includes("--verbose");

const SCENARIO = {
  traveler: "Paul Martin",
  destination: "Paris",
  check_in: "2026-05-12",
  check_out: "2026-05-15",
  purpose: "Réunion client Société Générale — prospection Q2",
};

// ─── State ───────────────────────────────────────────────────────────────────

let session: NegotiationSession;
const auditTrail: AuditEntry[] = [];
let toolCallCount = 0;
const startTime = Date.now();

// ─── Display helpers ─────────────────────────────────────────────────────────

const BLUE = "\x1b[34m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

function elapsed(): string {
  const ms = Date.now() - startTime;
  return `${DIM}+${(ms / 1000).toFixed(1)}s${RESET}`;
}

function printLine(icon: string, label: string, detail: string): void {
  console.log(`  ${icon}  ${BOLD}${label}${RESET}  ${detail}  ${elapsed()}`);
}

function printToolCall(name: string, summary: string): void {
  toolCallCount++;
  const shortName = name.replace("hotel_", "");
  console.log(`       ${DIM}${CYAN}→ ${shortName}${RESET}  ${DIM}${summary}${RESET}`);
}

function printDivider(): void {
  console.log(`  ${DIM}${"─".repeat(58)}${RESET}`);
}

// ─── Event handler ───────────────────────────────────────────────────────────

function handleEvent(event: NegotiationEvent): void {
  switch (event.type) {
    case "mcp_connected": {
      const tools = event.data.tools as string[];
      printLine("🔌", "MCP CONNECTÉ", `${tools.length} outils hotel-agent`);
      break;
    }

    case "session_start": {
      const budget = event.data.budget as number;
      printLine("📋", "DEMANDE DE VOYAGE", `budget max ${budget}€/nuit`);

      // Create orchestrator session
      session = createSession(
        event.data.request_id as string,
        "TC-2026-001",
        "LMBH-PARIS-001",
      );
      session = updateSessionStatus(session, "IN_PROGRESS");

      auditTrail.push(
        createAuditEntry(session.request_id, "TRAVEL_INTENT", {
          type: "TRAVEL_INTENT",
          ...event.data,
        }),
      );
      break;
    }

    case "iteration_start": {
      const iter = event.data.iteration as number;
      if (iter > 1) printDivider();
      printLine("🤖", `ROUND ${iter}`, "Agent Corporate réfléchit...");
      break;
    }

    case "agent_text": {
      const text = event.data.text as string;
      // Show a condensed version of agent reasoning
      const lines = text.split("\n").filter((l) => l.trim());
      const summary = lines[0]?.slice(0, 90) ?? "";
      if (summary && verbose) {
        console.log(`       ${DIM}💬 ${summary}${summary.length >= 90 ? "…" : ""}${RESET}`);
      }
      break;
    }

    case "tool_call": {
      const name = event.data.name as string;
      const input = event.data.input as Record<string, unknown>;

      if (name === "hotel_check_availability") {
        printToolCall(name, `${input.room_type ?? "standard"} ${input.check_in}→${input.check_out}`);
      } else if (name === "hotel_get_rates") {
        printToolCall(name, `${input.room_type} corporate=${input.corporate_id ?? "none"}`);
      } else if (name === "hotel_make_offer") {
        printToolCall(name, `${input.rate_eur}€ [${(input.inclusions as string[])?.join(", ")}]`);
      } else if (name === "hotel_counter_respond") {
        printToolCall(name, `accept=${input.accept}`);
      } else if (name === "hotel_confirm_booking") {
        printToolCall(name, `${input.traveler_name} → ${input.payment_method}`);
      } else if (name === "hotel_get_policy") {
        printToolCall(name, `${input.policy_type}`);
      } else {
        printToolCall(name, JSON.stringify(input).slice(0, 60));
      }
      break;
    }

    case "tool_result": {
      const name = event.data.name as string;
      const result = event.data.result as string;

      try {
        const parsed = JSON.parse(result);

        if (name === "hotel_check_availability") {
          const avail = parsed.rooms_available;
          const icon = avail > 0 ? GREEN + "✓" + RESET : RED + "✗" + RESET;
          console.log(`       ${DIM}  ${icon} ${avail} chambres disponibles (${parsed.nights} nuits)${RESET}`);
        } else if (name === "hotel_get_rates") {
          const base = parsed.base_rate_eur;
          const adj = parsed.adjusted_rate_eur;
          const delta = Math.round(((adj - base) / base) * 100);
          console.log(`       ${DIM}  ${GREEN}✓${RESET} ${DIM}${base}€ → ${BOLD}${adj}€${RESET}${DIM} (${delta > 0 ? "+" : ""}${delta}%) [${parsed.inclusions?.join(", ")}]${RESET}`);

          // Audit: HOTEL_OFFER equivalent
          auditTrail.push(
            createAuditEntry(session.request_id, "HOTEL_OFFER", {
              type: "HOTEL_OFFER",
              rate_eur: adj,
              base_rate_eur: base,
              adjustments: parsed.adjustments,
              inclusions: parsed.inclusions,
            }),
          );
        } else if (name === "hotel_make_offer") {
          console.log(`       ${DIM}  ${GREEN}✓${RESET} ${DIM}offre créée — expire ${parsed.validity_expires?.slice(11, 19) ?? "?"}${RESET}`);
          auditTrail.push(
            createAuditEntry(session.request_id, "HOTEL_OFFER", {
              type: "HOTEL_OFFER",
              ...parsed,
            }),
          );
        } else if (name === "hotel_confirm_booking") {
          console.log(`       ${DIM}  ${GREEN}✓${RESET} ${DIM}réf: ${BOLD}${parsed.booking_ref}${RESET}${RESET}`);
          auditTrail.push(
            createAuditEntry(session.request_id, "CONFIRMATION", {
              type: "CONFIRMATION",
              ...parsed,
            }),
          );
        }
      } catch {
        // non-JSON result
      }
      break;
    }

    case "negotiation_end": {
      // Handled after runNegotiation returns
      break;
    }
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log();
  console.log(`${BOLD}  ╔═══════════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${BOLD}  ║     HNP Platform — Négociation IA-à-IA en temps réel     ║${RESET}`);
  console.log(`${BOLD}  ╚═══════════════════════════════════════════════════════════╝${RESET}`);
  console.log();
  console.log(`  ${DIM}Voyageur${RESET}     ${SCENARIO.traveler} ${DIM}(Sales Director, TechCorp SAS)${RESET}`);
  console.log(`  ${DIM}Destination${RESET}  ${SCENARIO.destination} ${DIM}— Le Marais Boutique Hotel ★★★★${RESET}`);
  console.log(`  ${DIM}Dates${RESET}        ${SCENARIO.check_in} → ${SCENARIO.check_out} ${DIM}(3 nuits)${RESET}`);
  console.log(`  ${DIM}Motif${RESET}        ${SCENARIO.purpose}`);
  console.log();
  printDivider();
  console.log();

  let result: NegotiationResult;
  try {
    result = await runNegotiation(SCENARIO, {
      verbose,
      onEvent: handleEvent,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("apiKey") || msg.includes("authentication") || msg.includes("API")) {
      console.log();
      console.log(`  ${RED}${BOLD}✗ ANTHROPIC_API_KEY non configurée${RESET}`);
      console.log();
      console.log(`  ${DIM}Crée un fichier .env.local à la racine :${RESET}`);
      console.log(`    ${CYAN}ANTHROPIC_API_KEY=sk-ant-...${RESET}`);
      console.log();
      process.exit(2);
    }
    throw err;
  }

  // ─── Finalize session ──────────────────────────────────────────────
  const statusMap: Record<string, string> = {
    CONFIRMED: "CONFIRMED",
    ESCALATED: "ESCALATED",
    REJECTED: "REJECTED",
    ERROR: "REJECTED",
  };
  session = updateSessionStatus(
    session,
    (statusMap[result.status] ?? "REJECTED") as NegotiationSession["status"],
  );
  const durationMs = computeSessionDurationMs(session);

  // ─── Result display ────────────────────────────────────────────────
  console.log();
  printDivider();
  console.log();

  if (result.status === "CONFIRMED") {
    console.log(`  ${GREEN}${BOLD}┌────────────────────────────────────────────────┐${RESET}`);
    console.log(`  ${GREEN}${BOLD}│           ✓  RÉSERVATION CONFIRMÉE             │${RESET}`);
    console.log(`  ${GREEN}${BOLD}└────────────────────────────────────────────────┘${RESET}`);
  } else if (result.status === "ESCALATED") {
    console.log(`  ${YELLOW}${BOLD}┌────────────────────────────────────────────────┐${RESET}`);
    console.log(`  ${YELLOW}${BOLD}│           ⚠  ESCALADE HUMAINE                 │${RESET}`);
    console.log(`  ${YELLOW}${BOLD}└────────────────────────────────────────────────┘${RESET}`);
  } else {
    console.log(`  ${RED}${BOLD}┌────────────────────────────────────────────────┐${RESET}`);
    console.log(`  ${RED}${BOLD}│           ✗  NÉGOCIATION ÉCHOUÉE               │${RESET}`);
    console.log(`  ${RED}${BOLD}└────────────────────────────────────────────────┘${RESET}`);
  }

  console.log();
  console.log(`  ${DIM}Statut${RESET}        ${BOLD}${result.status}${RESET}`);
  console.log(`  ${DIM}Request ID${RESET}    ${DIM}${result.request_id}${RESET}`);
  if (result.final_rate_eur) {
    const nights = 3;
    console.log(`  ${DIM}Tarif final${RESET}   ${BOLD}${result.final_rate_eur}€/nuit${RESET} × ${nights} = ${BOLD}${result.final_rate_eur * nights}€${RESET}`);
  }
  if (result.savings_pct !== undefined) {
    console.log(`  ${DIM}Économie${RESET}     ${GREEN}${result.savings_pct}%${RESET}`);
  }
  console.log(`  ${DIM}Rounds API${RESET}    ${result.rounds}`);
  console.log(`  ${DIM}Outils MCP${RESET}    ${toolCallCount} appels`);
  console.log(`  ${DIM}Durée${RESET}         ${(durationMs / 1000).toFixed(1)}s`);
  console.log(`  ${DIM}Humain${RESET}        ❌ ZÉRO`);

  if (result.reason) {
    console.log(`  ${DIM}Raison${RESET}       ${result.reason.slice(0, 100)}`);
  }

  // ─── Audit trail ───────────────────────────────────────────────────
  console.log();
  printDivider();
  console.log();
  console.log(`  ${BOLD}AUDIT TRAIL${RESET}  ${DIM}(${auditTrail.length} entrées, SHA256)${RESET}`);
  console.log();
  for (const entry of auditTrail) {
    const shortHash = entry.hash.slice(0, 12);
    const time = entry.timestamp.slice(11, 23);
    console.log(`  ${DIM}${time}${RESET}  ${CYAN}${entry.message_type.padEnd(18)}${RESET}  ${DIM}${shortHash}…${RESET}`);
  }

  // Final session hash
  const sessionHash = sha256(JSON.stringify(session));
  console.log();
  console.log(`  ${DIM}Session hash : ${sessionHash.slice(0, 24)}…${RESET}`);

  // ─── Verbose transcript ────────────────────────────────────────────
  if (verbose && result.transcript.length > 0) {
    console.log();
    printDivider();
    console.log();
    console.log(`  ${BOLD}TRANSCRIPT COMPLET${RESET}  ${DIM}(${result.transcript.length} messages)${RESET}`);
    console.log();
    for (const entry of result.transcript) {
      const time = entry.timestamp.slice(11, 23);
      if (entry.role === "assistant") {
        console.log(`  ${DIM}${time}${RESET}  ${BLUE}AGENT${RESET}`);
        for (const line of entry.content.split("\n").slice(0, 8)) {
          console.log(`    ${DIM}${line}${RESET}`);
        }
        if (entry.content.split("\n").length > 8) {
          console.log(`    ${DIM}... (${entry.content.split("\n").length - 8} lignes de plus)${RESET}`);
        }
      } else {
        console.log(`  ${DIM}${time}${RESET}  ${CYAN}TOOL ${entry.tool_name}${RESET}`);
        const preview = entry.content.slice(0, 120);
        console.log(`    ${DIM}${preview}${preview.length >= 120 ? "…" : ""}${RESET}`);
      }
    }
  }

  console.log();
  console.log(`  ${DIM}🎯 Prochaine étape : npm run dev → ouvrir http://localhost:3000${RESET}`);
  console.log();

  process.exit(result.status === "CONFIRMED" ? 0 : 1);
}

main().catch((err) => {
  console.error(`\n  ${RED}❌ Erreur fatale :${RESET}`, err instanceof Error ? err.message : err);
  if (verbose) console.error(err);
  process.exit(2);
});
