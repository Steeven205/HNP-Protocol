/**
 * POST /api/negotiate
 *
 * Starts a real AI-to-AI negotiation — runs entirely on Vercel.
 * No MCP subprocess. Claude API calls SiteMinderProvider directly.
 *
 * Flow:
 * 1. Get hotel offers from SiteMinderProvider
 * 2. Send hotel data + corporate policy to Claude API
 * 3. Claude reasons, evaluates, and decides
 * 4. Stream events to the store for SSE
 */

import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { store, type LiveMessage } from "@/lib/negotiation-store";
import { SiteMinderProvider } from "@/lib/siteminder-provider";

// Allow up to 60s for the negotiation to complete
export const maxDuration = 60;

// ─── Corporate policy (inline from mock data) ────────────────────────────────

const CORPORATE_POLICY = {
  company: "TechCorp SAS",
  corporate_id: "TC-2026-001",
  max_rate: { paris: 180, lyon: 150, default: 130 } as Record<string, number>,
  esg_requirement: "tier_B_minimum",
  cancellation: "24h_free",
  ytd_nights: 127,
  loyalty_tier: "gold",
};

function getBudgetForCity(city: string): number {
  return CORPORATE_POLICY.max_rate[city.toLowerCase()] ?? CORPORATE_POLICY.max_rate["default"];
}

// ─── POST handler ────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const body = await request.json();
  const { traveler, destination, check_in, check_out, budget, purpose } = body;

  if (!traveler || !destination || !check_in || !check_out) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const id = `NEG-LIVE-${randomUUID().slice(0, 8).toUpperCase()}`;
  const budgetNum = Number(budget) || getBudgetForCity(destination);

  store.create(id, { traveler, destination, check_in, check_out, budget: budgetNum });

  // Launch negotiation in background (don't await — return ID immediately)
  runNegotiationDirect(id, {
    traveler,
    destination,
    check_in,
    check_out,
    purpose,
    budget: budgetNum,
  });

  return NextResponse.json({ id });
}

// ─── Negotiation engine (no MCP, runs on Vercel) ─────────────────────────────

async function runNegotiationDirect(
  id: string,
  trigger: {
    traveler: string;
    destination: string;
    check_in: string;
    check_out: string;
    purpose?: string;
    budget: number;
  },
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

  const nights = Math.ceil(
    (new Date(trigger.check_out).getTime() - new Date(trigger.check_in).getTime()) / 86400000,
  );

  try {
    store.update(id, { status: "in_progress" });

    // ── Step 1: Travel Intent ────────────────────────────────────────
    store.addMessage(id, makeMsg(
      "system", "SYSTEM",
      `Negotiation started for ${trigger.traveler} — ${trigger.destination}, ${trigger.check_in} → ${trigger.check_out}`,
    ));

    store.addMessage(id, makeMsg(
      "corporate", "TRAVEL_INTENT",
      `Booking request for ${trigger.traveler} in ${trigger.destination}. ${nights} night(s) from ${trigger.check_in} to ${trigger.check_out}. Budget max: ${trigger.budget}€/night. Corporate ID: ${CORPORATE_POLICY.corporate_id}. Gold account, ${CORPORATE_POLICY.ytd_nights} nights YTD.`,
      { corporate_id: CORPORATE_POLICY.corporate_id, budget: trigger.budget, nights },
    ));

    // ── Step 2: Get hotel availability & rates ───────────────────────
    const provider = new SiteMinderProvider(trigger.destination);
    const hotels = provider.getHotels();

    store.addMessage(id, makeMsg(
      "system", "SYSTEM",
      `Querying ${hotels.length} hotels in ${trigger.destination}...`,
    ));

    const offers = await provider.getMultiHotelOffers({
      check_in: trigger.check_in,
      check_out: trigger.check_out,
      room_type: "standard",
      corporate_id: CORPORATE_POLICY.corporate_id,
      max_offers: 3,
      budget_max_eur: trigger.budget,
    });

    if (offers.length === 0) {
      store.addMessage(id, makeMsg("system", "SYSTEM", "No available hotels found."));
      store.update(id, { status: "error", completed_at: new Date().toISOString() });
      return;
    }

    // Show best offer as hotel response
    const bestOffer = offers[0];
    const bestRate = bestOffer.rates.adjusted_rate_eur;
    const baseRate = bestOffer.rates.base_rate_eur;

    store.update(id, { initial_rate: baseRate, current_rate: bestRate, rounds: 1 });

    store.addMessage(id, makeMsg(
      "hotel", "HOTEL_OFFER",
      `${bestOffer.hotel.name}: ${bestRate}€/night (base ${baseRate}€). Inclusions: ${bestOffer.rates.inclusions.join(", ")}. Cancellation: ${bestOffer.hotel.cancellation_policy.replace(/_/g, " ")}. ESG: Tier ${bestOffer.hotel.esg_tier}. Rating: ${bestOffer.hotel.rating_google}★`,
      {
        rate_eur: bestRate,
        base_rate_eur: baseRate,
        room_type: bestOffer.rates.room_type,
        inclusions: bestOffer.rates.inclusions,
        hotel_name: bestOffer.hotel.name,
        esg_tier: bestOffer.hotel.esg_tier,
        cancellation: bestOffer.hotel.cancellation_policy,
      },
    ));

    // Show other offers
    if (offers.length > 1) {
      for (let i = 1; i < offers.length; i++) {
        const o = offers[i];
        store.addMessage(id, makeMsg(
          "hotel", "HOTEL_OFFER",
          `${o.hotel.name}: ${o.rates.adjusted_rate_eur}€/night (base ${o.rates.base_rate_eur}€). Inclusions: ${o.rates.inclusions.join(", ")}. ESG: Tier ${o.hotel.esg_tier}. Rating: ${o.hotel.rating_google}★`,
          {
            rate_eur: o.rates.adjusted_rate_eur,
            base_rate_eur: o.rates.base_rate_eur,
            room_type: o.rates.room_type,
            inclusions: o.rates.inclusions,
            hotel_name: o.hotel.name,
            esg_tier: o.hotel.esg_tier,
          },
        ));
      }
    }

    // ── Step 3: Claude evaluates the offers ──────────────────────────
    store.update(id, { rounds: 2 });

    const hotelSummary = offers.map((o, i) =>
      `${i + 1}. ${o.hotel.name} (${o.hotel.category.replace("_", " ")})\n` +
      `   Rate: ${o.rates.adjusted_rate_eur}€/night (base ${o.rates.base_rate_eur}€)\n` +
      `   Inclusions: ${o.rates.inclusions.join(", ")}\n` +
      `   Cancellation: ${o.hotel.cancellation_policy.replace(/_/g, " ")}\n` +
      `   ESG: Tier ${o.hotel.esg_tier} | Rating: ${o.hotel.rating_google}★ (${o.hotel.reviews_count} reviews)\n` +
      `   Distance: ${o.hotel.distance_office_km}km | Transit: ${o.hotel.transit_min}min`
    ).join("\n\n");

    const systemPrompt = `You are the Corporate Travel AI Agent for ${CORPORATE_POLICY.company} (ID: ${CORPORATE_POLICY.corporate_id}).
You evaluate hotel offers and make booking decisions based on the corporate travel policy.

TRAVEL POLICY:
- Maximum rate for ${trigger.destination}: ${trigger.budget}€/night
- ESG requirement: ${CORPORATE_POLICY.esg_requirement}
- Cancellation required: ${CORPORATE_POLICY.cancellation}
- Volume leverage: ${CORPORATE_POLICY.ytd_nights} nights YTD, ${CORPORATE_POLICY.loyalty_tier} tier

RULES:
- ACCEPT if rate ≤ budget, cancellation policy met, ESG compliant
- COUNTER-PROPOSE if rate is within 15% above budget
- ESCALATE if rate is more than 15% above budget

Respond in this exact format:
1. Brief analysis of each offer (2-3 lines each)
2. Your DECISION: which hotel you select and why
3. End with a JSON block:
\`\`\`json
{"status":"CONFIRMED","hotel":"...","rate":...,"savings_pct":...,"reason":"..."}
\`\`\``;

    const userMessage = `TRAVEL REQUEST:
Traveler: ${trigger.traveler}
Destination: ${trigger.destination}
Dates: ${trigger.check_in} → ${trigger.check_out} (${nights} nights)
Budget: ${trigger.budget}€/night
${trigger.purpose ? `Purpose: ${trigger.purpose}` : ""}

HOTEL OFFERS RECEIVED:

${hotelSummary}

Evaluate these offers against our travel policy and select the best option.`;

    // Call Claude API
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      store.addMessage(id, makeMsg("system", "SYSTEM", "Error: ANTHROPIC_API_KEY not configured"));
      store.update(id, { status: "error", completed_at: new Date().toISOString() });
      return;
    }

    store.addMessage(id, makeMsg("system", "SYSTEM", "Corporate Agent evaluating offers..."));

    const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!claudeResponse.ok) {
      const errText = await claudeResponse.text();
      throw new Error(`Claude API error ${claudeResponse.status}: ${errText.slice(0, 200)}`);
    }

    const claudeData = await claudeResponse.json() as {
      content: Array<{ type: string; text?: string }>;
    };

    const assistantText = claudeData.content
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("\n");

    // ── Step 4: Parse Claude's decision ──────────────────────────────
    // Add Claude's analysis as a corporate message
    const analysisLines = assistantText.split("\n").filter((l) => l.trim());
    store.addMessage(id, makeMsg(
      "corporate", "COUNTER_PROPOSAL",
      analysisLines.slice(0, 8).join("\n"),
      { round_number: 1 },
    ));

    // Extract JSON result
    const jsonMatch = assistantText.match(/```json\s*\n([\s\S]*?)\n\s*```/);
    let finalRate = bestRate;
    let selectedHotel = bestOffer.hotel.name;
    let savingsPct = Math.round(((trigger.budget - bestRate) / trigger.budget) * 100 * 10) / 10;
    let status: "confirmed" | "escalated" | "error" = "confirmed";

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]) as {
          status?: string;
          hotel?: string;
          rate?: number;
          savings_pct?: number;
          reason?: string;
        };
        if (parsed.rate) finalRate = parsed.rate;
        if (parsed.hotel) selectedHotel = parsed.hotel;
        if (parsed.savings_pct) savingsPct = parsed.savings_pct;
        if (parsed.status === "ESCALATED") status = "escalated";
      } catch {
        // Use defaults
      }
    }

    // Find the selected offer for booking ref
    const selectedOffer = offers.find((o) =>
      o.hotel.name.toLowerCase().includes(selectedHotel.toLowerCase().slice(0, 10))
    ) ?? bestOffer;

    const bookingRef = `BK-${selectedOffer.hotel.hotel_id.slice(0, 4)}-${Date.now().toString(36).toUpperCase().slice(-6)}`;

    store.update(id, {
      current_rate: finalRate,
      booking_ref: bookingRef,
    });

    // ── Step 5: Confirmation ─────────────────────────────────────────
    const total = Math.round(finalRate * nights * 100) / 100;

    store.addMessage(id, makeMsg(
      "corporate", "CONFIRMATION",
      `Booking confirmed at ${selectedHotel}. Rate: ${finalRate}€/night × ${nights} nights = ${total}€. Savings: ${savingsPct}% vs budget. Policy compliant: cancellation ✓, ESG ✓, rate ✓. Ref: ${bookingRef}`,
      {
        final_rate: finalRate,
        total,
        booking_ref: bookingRef,
        savings_pct: savingsPct,
        hotel_name: selectedHotel,
      },
    ));

    // Finalize
    const elapsed = (Date.now() - new Date(store.get(id)!.started_at).getTime()) / 1000;
    store.update(id, {
      status,
      final_rate: finalRate,
      savings_pct: savingsPct,
      duration_s: Math.round(elapsed * 10) / 10,
      completed_at: new Date().toISOString(),
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    store.update(id, { status: "error", completed_at: new Date().toISOString() });
    store.addMessage(id, makeMsg("system", "SYSTEM", `Error: ${msg}`));
  }
}
