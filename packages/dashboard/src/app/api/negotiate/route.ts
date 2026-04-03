/**
 * POST /api/negotiate
 *
 * Starts a real AI-to-AI negotiation.
 * Launches runNegotiation() in background, streams events to the store.
 * Returns the negotiation ID immediately.
 */

import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { store, type LiveMessage } from "@/lib/negotiation-store";

export async function POST(request: Request) {
  const body = await request.json();
  const { traveler, destination, check_in, check_out, budget, purpose } = body;

  if (!traveler || !destination || !check_in || !check_out) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const id = `NEG-LIVE-${randomUUID().slice(0, 8).toUpperCase()}`;
  const budgetNum = Number(budget) || 180;

  store.create(id, { traveler, destination, check_in, check_out, budget: budgetNum });

  // Launch negotiation in background (don't await)
  launchNegotiation(id, { traveler, destination, check_in, check_out, purpose, budget: budgetNum });

  return NextResponse.json({ id });
}

async function launchNegotiation(
  id: string,
  trigger: { traveler: string; destination: string; check_in: string; check_out: string; purpose?: string; budget: number },
) {
  let msgCounter = 0;

  const makeMsg = (
    agent: LiveMessage["agent"],
    type: LiveMessage["type"],
    content: string,
    data?: Record<string, unknown>,
  ): LiveMessage => ({
    id: `live-${id}-${++msgCounter}`,
    agent,
    type,
    timestamp: new Date().toISOString(),
    content,
    data,
  });

  try {
    // Dynamic import — only works locally (MCP subprocess + Claude API).
    // On Vercel serverless this module doesn't exist, caught by try/catch.
    const mod = await (new Function('p', 'return import(p)'))("@hnp/corporate-agent/agent") as {
      runNegotiation: (trigger: { traveler: string; destination: string; check_in: string; check_out: string; purpose?: string }, opts: Record<string, unknown>) => Promise<{ status: string; final_rate_eur?: number; savings_pct?: number }>;
    };
    const { runNegotiation } = mod;

    store.update(id, { status: "in_progress" });

    store.addMessage(id, makeMsg(
      "system",
      "SYSTEM",
      `Négociation démarrée pour ${trigger.traveler} — ${trigger.destination}, ${trigger.check_in} → ${trigger.check_out}`,
    ));

    const result = await runNegotiation(
      {
        traveler: trigger.traveler,
        destination: trigger.destination,
        check_in: trigger.check_in,
        check_out: trigger.check_out,
        purpose: trigger.purpose,
      },
      {
        verbose: false,
        onEvent: (event: { type: string; data: Record<string, unknown> }) => {
          switch (event.type) {
            case "mcp_connected":
              store.addMessage(id, makeMsg(
                "system",
                "SYSTEM",
                `Connexion MCP établie — ${(event.data.tools as string[]).length} outils hotel-agent`,
              ));
              break;

            case "session_start":
              store.addMessage(id, makeMsg(
                "corporate",
                "TRAVEL_INTENT",
                `Demande de réservation pour ${trigger.traveler} à ${trigger.destination}. ${store.get(id)?.nights ?? "?"} nuit(s) du ${trigger.check_in} au ${trigger.check_out}. Budget max: ${trigger.budget}€/nuit. Corporate ID: TC-2026-001.`,
                event.data,
              ));
              break;

            case "iteration_start":
              store.update(id, { rounds: event.data.iteration as number });
              break;

            case "tool_result": {
              const name = event.data.name as string;
              const resultStr = event.data.result as string;

              try {
                const parsed = JSON.parse(resultStr);

                if (name === "hotel_get_rates" && parsed.adjusted_rate_eur) {
                  const rate = parsed.adjusted_rate_eur as number;
                  const session = store.get(id);
                  if (session && session.initial_rate === null) {
                    store.update(id, { initial_rate: rate });
                  }
                  store.update(id, { current_rate: rate });

                  store.addMessage(id, makeMsg(
                    "hotel",
                    "HOTEL_OFFER",
                    `Tarif ajusté: ${rate}€/nuit (base ${parsed.base_rate_eur}€). Inclusions: ${(parsed.inclusions as string[])?.join(", ") || "wifi"}.` +
                      (parsed.adjustments
                        ? ` Ajustements: ${(parsed.adjustments as Array<{ rule: string; percentage: number }>).map((a) => `${a.rule} ${a.percentage > 0 ? "+" : ""}${a.percentage}%`).join(", ")}.`
                        : ""),
                    {
                      rate_eur: rate,
                      room_type: parsed.room_type,
                      inclusions: parsed.inclusions,
                      base_rate_eur: parsed.base_rate_eur,
                      adjustments: parsed.adjustments,
                    },
                  ));
                }

                if (name === "hotel_make_offer" && parsed.rate_eur) {
                  store.update(id, { current_rate: parsed.rate_eur as number });
                  store.addMessage(id, makeMsg(
                    "hotel",
                    "HOTEL_OFFER",
                    `Offre formelle: ${parsed.rate_eur}€/nuit. Inclusions: ${(parsed.inclusions as string[])?.join(", ")}. Annulation: ${parsed.cancellation_policy}. ESG: ${parsed.esg_tier}. Validité: 15 minutes.`,
                    {
                      rate_eur: parsed.rate_eur,
                      room_type: parsed.room_type,
                      inclusions: parsed.inclusions,
                      cancellation: parsed.cancellation_policy,
                      esg_tier: parsed.esg_tier,
                    },
                  ));
                }

                if (name === "hotel_confirm_booking" && parsed.booking_ref) {
                  store.update(id, { booking_ref: parsed.booking_ref as string });
                }

                if (name === "hotel_check_availability") {
                  store.addMessage(id, makeMsg(
                    "system",
                    "SYSTEM",
                    `Disponibilité: ${parsed.rooms_available} chambres ${parsed.room_type} disponibles (${parsed.nights} nuits).`,
                  ));
                }
              } catch {
                // non-JSON tool result
              }
              break;
            }

            case "agent_text": {
              const text = event.data.text as string;
              // Check if this is a counter-proposal reasoning
              if (text.toLowerCase().includes("contre-propos") || text.toLowerCase().includes("counter")) {
                store.addMessage(id, makeMsg(
                  "corporate",
                  "COUNTER_PROPOSAL",
                  text.split("\n").filter((l) => l.trim()).slice(0, 5).join(" "),
                  { round_number: store.get(id)?.rounds ?? 1 },
                ));
              }
              // Check if this is a confirmation message
              else if (text.toLowerCase().includes("confirmé") || text.toLowerCase().includes("confirmed") || text.includes("BK-")) {
                const session = store.get(id);
                const finalRate = session?.current_rate ?? session?.initial_rate;
                const savings = finalRate && session?.budget
                  ? Math.round(((session.budget - finalRate) / session.budget) * 100 * 10) / 10
                  : null;

                store.addMessage(id, makeMsg(
                  "corporate",
                  "CONFIRMATION",
                  text.split("\n").filter((l) => l.trim()).slice(0, 6).join(" "),
                  {
                    final_rate: finalRate,
                    total: finalRate && session ? finalRate * session.nights : null,
                    booking_ref: session?.booking_ref ?? "pending",
                    savings_pct: savings,
                  },
                ));
              }
              break;
            }
          }
        },
      },
    );

    // Finalize session
    const session = store.get(id);
    const elapsed = session
      ? (Date.now() - new Date(session.started_at).getTime()) / 1000
      : 0;

    store.update(id, {
      status: result.status === "CONFIRMED" ? "confirmed"
        : result.status === "ESCALATED" ? "escalated"
        : "error",
      final_rate: result.final_rate_eur ?? session?.current_rate ?? null,
      savings_pct: result.savings_pct ?? null,
      duration_s: Math.round(elapsed * 10) / 10,
      completed_at: new Date().toISOString(),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    store.update(id, { status: "error", completed_at: new Date().toISOString() });
    store.addMessage(id, makeMsg("system", "SYSTEM", `Erreur: ${msg}`));
  }
}
