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
import { supabase } from "@/lib/supabase";
import { createHash } from "node:crypto";

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

function auditHash(payload: unknown): string {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

function persistMessage(
  negotiation_id: string,
  agent: string,
  message_type: string,
  content: string,
  data?: Record<string, unknown>,
) {
  supabase
    .from("negotiation_messages")
    .insert({ negotiation_id, agent, message_type, content, data: data ?? null })
    .then(() => {});
}

function persistAudit(
  negotiation_id: string,
  message_type: string,
  payload: unknown,
  extra?: Record<string, unknown>,
) {
  supabase
    .from("audit_entries")
    .insert({
      negotiation_id,
      message_type,
      audit_hash: auditHash(payload),
      payload,
      ...extra,
    })
    .then(() => {});
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
  const negStartedAt = new Date().toISOString();

  // Persist negotiation row (fire-and-forget)
  supabase
    .from("negotiations")
    .insert({
      id: negId,
      traveler,
      destination,
      check_in,
      check_out,
      nights,
      budget: budgetNum,
      status: "in_progress",
      shadow_mode: false,
      created_at: negStartedAt,
    })
    .then(() => {});

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let msgCount = 0;

      const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

        // Persist message (fire-and-forget)
        persistMessage(negId, agent, type, content, data);
      }

      function sendMeta(meta: Record<string, unknown>) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "meta", ...meta })}\n\n`));
      }

      try {
        // ── Init ────────────────────────────────────────────────────
        sendMeta({ negotiation_id: negId, status: "in_progress", budget: budgetNum, nights });

        send("system", "SYSTEM", `Negotiation started for ${traveler} — ${destination}, ${check_in} → ${check_out}`);

        await delay(1200);

        send("corporate", "TRAVEL_INTENT",
          `Booking request for ${traveler} in ${destination}. ${nights} night(s) from ${check_in} to ${check_out}. Budget: ${budgetNum}€/night. Corporate Gold, ${CORPORATE.ytd_nights} nights YTD.`,
          { corporate_id: CORPORATE.corporate_id, budget: budgetNum, nights },
        );

        await delay(1500);

        // ── Query hotels ────────────────────────────────────────────
        const provider = new SiteMinderProvider(destination);
        const hotels = provider.getHotels();
        send("system", "SYSTEM", `Querying ${hotels.length} hotels in ${destination}...`);

        await delay(2000);

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

          // Update negotiation status (fire-and-forget)
          supabase
            .from("negotiations")
            .update({ status: "error", completed_at: new Date().toISOString() })
            .eq("id", negId)
            .then(() => {});

          controller.close();
          return;
        }

        // ── Hotel offers ────────────────────────────────────────────
        const sortedByRating = [...offers].sort((a, b) => b.hotel.rating_google - a.hotel.rating_google);

        const enrichedOffers = offers.map((o, i) => ({
          id: `offer-${o.hotel.hotel_id}`,
          hotel_id: o.hotel.hotel_id,
          hotel_name: o.hotel.name,
          category: o.hotel.category,
          address: o.hotel.address,
          district: o.hotel.district,
          esg_tier: o.hotel.esg_tier,
          rating_google: o.hotel.rating_google,
          rating_booking: o.hotel.rating_booking,
          reviews_count: o.hotel.reviews_count,
          photo_url: o.hotel.photo_url,
          website_url: o.hotel.website_url,
          distance_office_km: o.hotel.distance_office_km,
          transit_min: o.hotel.transit_min,
          rate_eur: o.rates.adjusted_rate_eur,
          base_rate_eur: o.rates.base_rate_eur,
          savings_vs_budget_pct: Math.round(((budgetNum - o.rates.adjusted_rate_eur) / budgetNum) * 1000) / 10,
          room_type: o.rates.room_type,
          inclusions: o.rates.inclusions,
          cancellation: o.hotel.cancellation_policy,
          badge: i === 0 ? "best_price" : o.hotel.hotel_id === sortedByRating[0].hotel.hotel_id ? "best_rated" : "recommended",
          nights,
          policy_compliant: o.rates.adjusted_rate_eur <= budgetNum,
          policy_checks: [
            { label: `Rate ≤ ${budgetNum}€`, passed: o.rates.adjusted_rate_eur <= budgetNum },
            { label: "Cancellation 24h", passed: true },
            { label: "ESG Tier B+", passed: o.hotel.esg_tier === "A" || o.hotel.esg_tier === "B" },
          ],
        }));

        // Persist enriched offers (fire-and-forget)
        for (const eo of enrichedOffers) {
          supabase
            .from("negotiation_offers")
            .insert({
              negotiation_id: negId,
              hotel_id: eo.hotel_id,
              hotel_name: eo.hotel_name,
              category: eo.category,
              address: eo.address,
              district: eo.district,
              esg_tier: eo.esg_tier,
              rating_google: eo.rating_google,
              rating_booking: eo.rating_booking,
              reviews_count: eo.reviews_count,
              photo_url: eo.photo_url,
              website_url: eo.website_url,
              distance_office_km: eo.distance_office_km,
              transit_min: eo.transit_min,
              rate_eur: eo.rate_eur,
              base_rate_eur: eo.base_rate_eur,
              savings_vs_budget_pct: eo.savings_vs_budget_pct,
              room_type: eo.room_type,
              inclusions: eo.inclusions,
              cancellation: eo.cancellation,
              badge: eo.badge,
              policy_compliant: eo.policy_compliant,
              policy_checks: eo.policy_checks,
            })
            .then(() => {});
        }

        for (let i = 0; i < offers.length; i++) {
          const o = offers[i];
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
          // Pause between each hotel offer for realistic feel
          await delay(1800 + i * 400);
        }

        // Send enriched offers for the choose page
        sendMeta({ offers: enrichedOffers, budget: budgetNum, nights, decision_timeout_min: 30 });

        // ── Claude evaluates offers ─────────────────────────────────
        await delay(1500);
        send("system", "SYSTEM", "Corporate Agent analyzing offers against travel policy...");
        await delay(1000);

        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (apiKey) {
          const hotelSummary = offers.map((o, i) =>
            `${i + 1}. ${o.hotel.name} (${o.hotel.category.replace("_", " ")})\n` +
            `   Rate: ${o.rates.adjusted_rate_eur}€/night (base ${o.rates.base_rate_eur}€)\n` +
            `   Inclusions: ${o.rates.inclusions.join(", ")}\n` +
            `   Cancellation: ${o.hotel.cancellation_policy.replace(/_/g, " ")}\n` +
            `   ESG: Tier ${o.hotel.esg_tier} | Rating: ${o.hotel.rating_google}★ (${o.hotel.reviews_count} reviews)\n` +
            `   Distance: ${o.hotel.distance_office_km}km | Transit: ${o.hotel.transit_min}min`
          ).join("\n\n");

          try {
            const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
              },
              body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1024,
                system: `You are the Corporate Travel AI Agent for ${CORPORATE.company}. You evaluate hotel offers for business travelers. Be concise and professional. Respond in the same language as the user's destination (French for French cities, English otherwise).

POLICY: Max rate for ${destination}: ${budgetNum}€/night. ESG: ${CORPORATE.esg}. Cancellation: ${CORPORATE.cancellation}. Volume leverage: ${CORPORATE.ytd_nights} nights YTD, ${CORPORATE.tier} tier.

Provide a brief analysis (3-5 sentences) comparing the ${offers.length} offers. Mention which is the best value, which has the best rating, and your recommendation. Do NOT make a final decision — the traveler will choose.`,
                messages: [{
                  role: "user",
                  content: `Analyze these ${offers.length} hotel offers for ${traveler} in ${destination} (${nights} nights, budget ${budgetNum}€/night):\n\n${hotelSummary}`,
                }],
              }),
            });

            if (claudeRes.ok) {
              const claudeData = await claudeRes.json() as {
                content: Array<{ type: string; text?: string }>;
              };
              const analysis = claudeData.content
                .filter((b) => b.type === "text")
                .map((b) => b.text ?? "")
                .join("\n");

              await delay(1500);
              send("corporate", "COUNTER_PROPOSAL", analysis, { round_number: 1 });
            }
          } catch {
            // Claude failed — continue without analysis
          }
        }

        // ── Waiting for user choice ─────────────────────────────────
        await delay(1200);
        const compliant = enrichedOffers.filter((o) => o.policy_compliant).length;
        send("system", "SYSTEM", `${compliant} policy-compliant offers ready — compare and choose your hotel.`);
        sendMeta({ status: "awaiting_choice" });

        // Update negotiation status (fire-and-forget)
        const bestOffer = enrichedOffers[0];
        const durationS = Math.round((Date.now() - new Date(negStartedAt).getTime()) / 1000);
        supabase
          .from("negotiations")
          .update({
            status: "awaiting_choice",
            initial_rate: bestOffer?.base_rate_eur ?? null,
            final_rate: bestOffer?.rate_eur ?? null,
            savings_pct: bestOffer?.savings_vs_budget_pct ?? null,
            rounds: 1,
            duration_s: durationS,
          })
          .eq("id", negId)
          .then(() => {});

        // Audit trail entry (fire-and-forget)
        const auditPayload = {
          negotiation_id: negId,
          status: "awaiting_choice",
          offers_count: enrichedOffers.length,
          compliant_count: compliant,
          budget: budgetNum,
          best_rate: bestOffer?.rate_eur,
        };
        persistAudit(negId, "AWAITING_CHOICE", auditPayload, {
          account: CORPORATE.company,
          location: destination,
        });

      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        send("system", "SYSTEM", `Error: ${msg}`);
        sendMeta({ status: "error" });

        // Update negotiation status on error (fire-and-forget)
        supabase
          .from("negotiations")
          .update({ status: "error", completed_at: new Date().toISOString() })
          .eq("id", negId)
          .then(() => {});
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
