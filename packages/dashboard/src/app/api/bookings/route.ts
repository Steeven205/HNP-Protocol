import { supabase } from "@/lib/supabase";

// Create a booking
export async function POST(request: Request) {
  const body = await request.json();
  const {
    traveler, destination, hotel_id, hotel_name, check_in, check_out,
    nights, room_type, rack_rate, negotiated_rate, total_cost,
    inclusions, cancellation_policy, esg_tier, stars, address, district,
  } = body;

  const bookingRef = `RF-${Date.now().toString(36).toUpperCase().slice(-5)}-${Math.random().toString(36).slice(2, 4).toUpperCase()}`;

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      booking_ref: bookingRef,
      traveler,
      destination,
      hotel_id,
      hotel_name,
      check_in,
      check_out,
      nights,
      room_type,
      rack_rate,
      negotiated_rate,
      total_cost,
      inclusions,
      cancellation_policy,
      esg_tier,
      stars,
      address,
      district,
      status: "confirmed",
      savings_eur: (rack_rate - negotiated_rate) * nights,
      savings_pct: Math.round(((rack_rate - negotiated_rate) / rack_rate) * 100),
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ booking: data, booking_ref: bookingRef });
}

// Get bookings for a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const traveler = searchParams.get("traveler");

  let query = supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (traveler) {
    query = query.eq("traveler", traveler);
  }

  const { data, error } = await query;

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ bookings: data || [] });
}
