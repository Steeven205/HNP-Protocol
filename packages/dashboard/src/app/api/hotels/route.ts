import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Paris";
  const minStars = Number(searchParams.get("min_stars")) || 3;
  const maxRate = Number(searchParams.get("max_rate")) || 999;
  const roomType = (searchParams.get("room_type") || "standard").toLowerCase();
  const limit = Number(searchParams.get("limit")) || 5;

  const rateColumn =
    roomType === "suite" ? "base_rate_suite" :
    roomType === "superior" ? "base_rate_superior" :
    "base_rate_standard";

  const { data: hotels, error } = await supabase
    .from("hotels")
    .select("*")
    .eq("city", city)
    .eq("status", "active")
    .gte("stars", minStars)
    .not(rateColumn, "is", null)
    .lte(rateColumn, maxRate + 50) // slight margin for negotiation
    .order("rating_google", { ascending: false })
    .limit(limit);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // Simulate negotiated rates (yield engine logic)
  const offers = (hotels || []).map((hotel, i) => {
    const baseRate = Number(hotel[rateColumn]);
    // Simulate corporate discount: 8-22% off depending on hotel
    const discountPct = 8 + Math.floor(Math.random() * 15);
    const negotiatedRate = Math.round(baseRate * (1 - discountPct / 100));

    return {
      id: `offer-${hotel.hotel_id}`,
      hotel_id: hotel.hotel_id,
      name: hotel.name,
      stars: hotel.stars,
      category: hotel.category,
      address: hotel.address,
      arrondissement: hotel.arrondissement,
      district: hotel.district,
      rooms_count: hotel.rooms_count,
      phone: hotel.phone,
      website_url: hotel.website_url,
      photo_url: hotel.photo_url,
      description: hotel.description,
      esg_tier: hotel.esg_tier,
      rating_google: hotel.rating_google,
      rating_booking: hotel.rating_booking,
      reviews_count: hotel.reviews_count,
      amenities: hotel.amenities || [],
      cancellation_policy: hotel.cancellation_policy,
      breakfast_included: hotel.breakfast_included,
      base_rate: baseRate,
      negotiated_rate: negotiatedRate,
      discount_pct: discountPct,
      room_type: roomType,
      badge: i === 0 ? "recommended" : i === 1 ? "best_price" : "best_rated",
      policy_compliant: negotiatedRate <= maxRate,
    };
  });

  // Sort: compliant first, then by negotiated rate
  offers.sort((a, b) => {
    if (a.policy_compliant !== b.policy_compliant) return a.policy_compliant ? -1 : 1;
    return a.negotiated_rate - b.negotiated_rate;
  });

  // Re-assign badges after sort
  if (offers.length >= 1) offers[0].badge = "best_price";
  if (offers.length >= 2) offers[1].badge = "recommended";
  if (offers.length >= 3) offers[2].badge = "best_rated";

  return Response.json({ offers, total: offers.length });
}
