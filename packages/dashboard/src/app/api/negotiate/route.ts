/**
 * POST /api/negotiate
 *
 * Runs a real AI-to-AI negotiation and streams events as SSE.
 * Everything runs in a single serverless function — no shared state needed.
 *
 * Flow:
 * 1. Query hotels from SiteMinderProvider
 * 2. Send hotel data + corporate policy to Claude API
 * 3. Stream each step as an SSE event to the client
 */

import { SiteMinderProvider } from "@/lib/siteminder-provider";

export const maxDuration = 60;

// ─── Corporate policy ────────────────────────────────────────────────────────

const CORPORATE = {
  company: "TechCorp SAS",
  corporate_id: "TC-2026-001",
  max_rate: { paris: 180, lyon: 150, default: 130 } as Record<string, number>,
  esg: "tier_B_minimum",
  cancellation: "24h_free",
  ytd_nights: 127,
  tier: "gold",
};

function budgetFor(city: string): number {
  return CORPORATE.max_rate[city.toLowerCase()] ?? CORPORATE.max_rate["default"];
}

export async function POST(request: Request) {
  const body = await request.json();
  const { traveler, destination, check_in, check_out, budget, purpose } = body;

  if (!traveler || !destination || !check_in || !check_out) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const budgetNum = Number(budget) || budgetFor(destination);
  const nights = Math.ceil(
    (new Date(check_out).getTime() - new Date(check_in).getTime()) / 86400000,
  );
  const negId = `NEG-LIVE-${Date.now().toString(36).toUpperCase().slice(-8)}`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let msgCount = 0;

      function send(agent: string, type: string, content: string, data?: Record<string, unknown>) {
        const msg = {
          id: `${negId}-${++msgCount}`,
          agent,
          type,
          timestamp: new Date().toISOString(),
          content,
          data,
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(msg)}\n\n`));
      }

      function sendMeta(meta: Record<string, unknown>) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "meta", ...meta })}\n\n`));
      }

      try {
        // ── Init ────────────────────────────────────────────────────
        sendMeta({ negotiation_id: negId, status: "in_progress", budget: budgetNum, nights });

        send("system", "SYSTEM", `Negotiation started for ${traveler} — ${destination}, ${check_in} → ${check_out}`);

        send("corporate", "TRAVEL_INTENT",
          `Booking request for ${traveler} in ${destination}. ${nights} night(s) from ${check_in} to ${check_out}. Budget: ${budgetNum}€/night. Corporate Gold, ${CORPORATE.ytd_nights} nights YTD.`,
          { corporate_id: CORPORATE.corporate_id, budget: budgetNum, nights },
        );

        // ── Query hotels ────────────────────────────────────────────
        const provider = new SiteMinderProvider(destination);
        const hotels = provider.getHotels();
        send("system", "SYSTEM", `Querying ${hotels.length} hotels in ${destination}...`);

        const offers = await provider.getMultiHotelOffers({
          check_in, check_out,
          room_type: "standard",
          corporate_id: CORPORATE.corporate_id,
          max_offers: 3,
          budget_max_eur: budgetNum,
        });

        if (offers.length === 0) {
          send("system", "SYSTEM", "No available hotels found.");
          sendMeta({ status: "error" });
          controller.close();
          return;
        }

        // ── Hotel offers ────────────────────────────────────────────
        for (const o of offers) {
          send("hotel", "HOTEL_OFFER",
            `${o.hotel.name}: ${o.rates.adjusted_rate_eur}€/night (base ${o.rates.base_rate_eur}€). Inclusions: ${o.rates.inclusions.join(", ")}. Cancellation: ${o.hotel.cancellation_policy.replace(/_/g, " ")}. ESG: Tier ${o.hotel.esg_tier}. Rating: ${o.hotel.rating_google}★`,
            {
              rate_eur: o.rates.adjusted_rate_eur,
              base_rate_eur: o.rates.base_rate_eur,
              room_type: o.rates.room_type,
              inclusions: o.rates.inclusions,
              hotel_name: o.hotel.name,
              esg_tier: o.hotel.esg_tier,
              cancellation: o.hotel.cancellation_policy,
              rating: o.hotel.rating_google,
            },
          );
        }

        // ── Claude evaluates ────────────────────────────────────────
        send("system", "SYSTEM", "Corporate Agent evaluating offers...");

        const hotelSummary = offers.map((o, i) =>
          `${i + 1}. ${o.hotel.name} (${o.hotel.category.replace("_", " ")})\n` +
          `   Rate: ${o.rates.adjusted_rate_eur}€/night (base ${o.rates.base_rate_eur}€)\n` +
          `   Inclusions: ${o.rates.inclusions.join(", ")}\n` +
          `   Cancellation: ${o.hotel.cancellation_policy.replace(/_/g, " ")}\n` +
          `   ESG: Tier ${o.hotel.esg_tier} | Rating: ${o.hotel.rating_google}★ (${o.hotel.reviews_count} reviews)\n` +
          `   Distance: ${o.hotel.distance_office_km}km | Transit: ${o.hotel.transit_min}min`
        ).join("\n\n");

        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          send("system", "SYSTEM", "Error: ANTHROPIC_API_KEY not configured");
          sendMeta({ status: "error" });
          controller.close();
          return;
        }

        const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 2048,
            system: `You are the Corporate Travel AI Agent for ${CORPORATE.company}.
Evaluate hotel offers and decide which to book based on the travel policy.

POLICY: Max rate ${destination}: ${budgetNum}€/night. ESG: ${CORPORATE.esg}. Cancellation: ${CORPORATE.cancellation}. Volume: ${CORPORATE.ytd_nights} nights YTD, ${CORPORATE.tier} tier.

RULES: ACCEPT if rate ≤ budget + policy met. COUNTER if within 15% above. ESCALATE if >15% above.

Respond with:
1. Brief analysis of each offer (2-3 lines)
2. DECISION: which hotel and why
3. JSON block:
\`\`\`json
{"status":"CONFIRMED","hotel":"...","rate":...,"savings_pct":...,"reason":"..."}
\`\`\``,
            messages: [{
              role: "user",
              content: `TRAVEL REQUEST:\nTraveler: ${traveler}\nDestination: ${destination}\nDates: ${check_in} → ${check_out} (${nights} nights)\nBudget: ${budgetNum}€/night\n${purpose ? `Purpose: ${purpose}\n` : ""}\nHOTEL OFFERS:\n\n${hotelSummary}\n\nEvaluate and select the best option.`,
            }],
          }),
        });

        if (!claudeRes.ok) {
          const err = await claudeRes.text();
          throw new Error(`Claude API ${claudeRes.status}: ${err.slice(0, 200)}`);
        }

        const claudeData = await claudeRes.json() as {
          content: Array<{ type: string; text?: string }>;
        };

        const text = claudeData.content
          .filter((b) => b.type === "text")
          .map((b) => b.text ?? "")
          .join("\n");

        // ── Parse decision ──────────────────────────────────────────
        const lines = text.split("\n").filter((l) => l.trim());
        send("corporate", "COUNTER_PROPOSAL",
          lines.slice(0, 8).join("\n"),
          { round_number: 1 },
        );

        const jsonMatch = text.match(/```json\s*\n([\s\S]*?)\n\s*```/);
        const best = offers[0];
        let finalRate = best.rates.adjusted_rate_eur;
        let hotel = best.hotel.name;
        let savings = Math.round(((budgetNum - finalRate) / budgetNum) * 1000) / 10;

        if (jsonMatch) {
          try {
            const p = JSON.parse(jsonMatch[1]) as Record<string, unknown>;
            if (p.rate) finalRate = p.rate as number;
            if (p.hotel) hotel = p.hotel as string;
            if (p.savings_pct) savings = p.savings_pct as number;
          } catch { /* use defaults */ }
        }

        const selectedOffer = offers.find((o) =>
          o.hotel.name.toLowerCase().includes(hotel.toLowerCase().slice(0, 10))
        ) ?? best;

        const ref = `BK-${selectedOffer.hotel.hotel_id.slice(0, 4)}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
        const total = Math.round(finalRate * nights * 100) / 100;

        // ── Confirmation ────────────────────────────────────────────
        send("corporate", "CONFIRMATION",
          `Booking confirmed at ${hotel}. Rate: ${finalRate}€/night × ${nights} nights = ${total}€. Savings: ${savings}% vs budget. Ref: ${ref}`,
          { final_rate: finalRate, total, booking_ref: ref, savings_pct: savings, hotel_name: hotel },
        );

        sendMeta({
          status: "confirmed",
          final_rate: finalRate,
          savings_pct: savings,
          booking_ref: ref,
          hotel_name: hotel,
        });

      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        send("system", "SYSTEM", `Error: ${msg}`);
        sendMeta({ status: "error" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
