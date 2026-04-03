/**
 * POST /api/offers
 *
 * Queries multiple hotels via SiteMinderProvider and returns
 * ranked offers for the "Choose Offer" page.
 *
 * This replaces the single-hotel negotiation for the Assisted mode flow.
 */

import { NextResponse } from "next/server";

const TIER_CONFIGS: Record<string, { max_offers: number; decision_timeout_min: number; mode: string }> = {
  starter:    { max_offers: 3,  decision_timeout_min: 30,  mode: "live" },
  business:   { max_offers: 5,  decision_timeout_min: 60,  mode: "live" },
  enterprise: { max_offers: 10, decision_timeout_min: 120, mode: "live" },
  shadow:     { max_offers: 3,  decision_timeout_min: 30,  mode: "shadow" },
};

export async function POST(request: Request) {
  const body = await request.json();
  const {
    destination = "Paris",
    check_in,
    check_out,
    room_type = "standard",
    corporate_id = "TC-2026-001",
    budget = 180,
    tier = "starter",
  } = body;

  if (!check_in || !check_out) {
    return NextResponse.json({ error: "Missing check_in / check_out" }, { status: 400 });
  }

  const config = TIER_CONFIGS[tier] ?? TIER_CONFIGS.starter;

  const { SiteMinderProvider } = await import("@/lib/siteminder-provider");
  const provider = new SiteMinderProvider(destination);

  const results = await provider.getMultiHotelOffers({
    check_in,
    check_out,
    room_type,
    corporate_id,
    max_offers: config.max_offers,
    budget_max_eur: Number(budget),
  });

  const nights = Math.ceil(
    (new Date(check_out).getTime() - new Date(check_in).getTime()) / 86400000,
  );

  // Assign badges
  const offers = results.map((r, i) => {
    const savings_pct = Math.round(((Number(budget) - r.rates.adjusted_rate_eur) / Number(budget)) * 1000) / 10;

    // Best price = cheapest, Best rated = highest google rating
    let badge: string | null = null;
    if (i === 0) badge = "best_price";

    const highestRated = [...results].sort((a, b) => b.hotel.rating_google - a.hotel.rating_google)[0];
    if (r.hotel.hotel_id === highestRated.hotel.hotel_id && badge !== "best_price") {
      badge = "best_rated";
    }

    // Recommended = best score combining price, rating, ESG
    const scores = results.map((x) => ({
      id: x.hotel.hotel_id,
      score:
        (1 - x.rates.adjusted_rate_eur / Number(budget)) * 40 +
        x.hotel.rating_google * 8 +
        (x.hotel.esg_tier === "A" ? 10 : x.hotel.esg_tier === "B" ? 5 : 0),
    }));
    scores.sort((a, b) => b.score - a.score);
    if (r.hotel.hotel_id === scores[0].id && badge === null) {
      badge = "recommended";
    }
    // If no badge assigned yet but it's the recommended
    if (r.hotel.hotel_id === scores[0].id && badge === "best_price") {
      badge = "recommended"; // Override best_price if also best overall
    }

    return {
      id: `offer-${r.hotel.hotel_id}`,
      hotel_id: r.hotel.hotel_id,
      hotel_name: r.hotel.name,
      category: r.hotel.category,
      address: r.hotel.address,
      district: r.hotel.district,
      esg_tier: r.hotel.esg_tier,
      rating_google: r.hotel.rating_google,
      rating_booking: r.hotel.rating_booking,
      reviews_count: r.hotel.reviews_count,
      photo_url: r.hotel.photo_url,
      website_url: r.hotel.website_url,
      distance_office_km: r.hotel.distance_office_km,
      transit_min: r.hotel.transit_min,
      rate_eur: r.rates.adjusted_rate_eur,
      base_rate_eur: r.rates.base_rate_eur,
      public_rate_eur: (r.rates as unknown as Record<string, unknown>).public_rate_eur as number ?? r.rates.base_rate_eur,
      rateflow_base_eur: (r.rates as unknown as Record<string, unknown>).rateflow_base_eur as number ?? r.rates.adjusted_rate_eur,
      ota_commission_pct: r.hotel.ota_commission_pct,
      rateflow_fee_pct: r.hotel.rateflow_fee_pct,
      savings_vs_public_pct: Math.round(((r.rates.base_rate_eur - r.rates.adjusted_rate_eur) / r.rates.base_rate_eur) * 1000) / 10,
      savings_vs_budget_pct: savings_pct,
      room_type: r.rates.room_type,
      inclusions: r.rates.inclusions,
      cancellation: r.hotel.cancellation_policy,
      amenities: r.hotel.amenities,
      adjustments: r.rates.adjustments,
      nights,
      total_eur: Math.round(r.rates.adjusted_rate_eur * nights * 100) / 100,
      badge,
      policy_compliant: r.rates.adjusted_rate_eur <= Number(budget),
    };
  });

  // Ensure we have exactly one recommended
  if (!offers.some((o) => o.badge === "recommended") && offers.length > 0) {
    const unbadged = offers.find((o) => o.badge === null);
    if (unbadged) unbadged.badge = "recommended";
  }

  return NextResponse.json({
    offers,
    meta: {
      destination,
      check_in,
      check_out,
      nights,
      budget: Number(budget),
      tier,
      mode: config.mode,
      decision_timeout_min: config.decision_timeout_min,
      hotels_queried: provider.getHotels().length,
    },
  });
}
