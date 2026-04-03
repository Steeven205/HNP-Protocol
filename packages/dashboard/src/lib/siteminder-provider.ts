/**
 * SiteMinderProvider — Stub implémentant HotelDataProvider
 * avec un inventaire multi-hôtel réaliste.
 *
 * Phase POC : données simulées basées sur des hôtels parisiens réels.
 * Phase MVP : connecter à l'API SiteMinder (developer.siteminder.com).
 *
 * SiteMinder agrège 40 000+ hôtels. Ce provider simule cette
 * capacité avec 5 propriétés et un yield engine par hôtel.
 */

import { computeYield, type YieldConfig, type CorporateDiscount, type YieldContext, type RateAdjustment } from "./yield-engine";

type RoomType = "standard" | "superior" | "suite";

interface AvailabilityResponse {
  available: boolean;
  room_type: RoomType;
  rooms_available: number;
  check_in: string;
  check_out: string;
  nights: number;
}

interface RateResponse {
  room_type: RoomType;
  base_rate_eur: number;
  adjusted_rate_eur: number;
  adjustments: RateAdjustment[];
  inclusions: string[];
  currency: "EUR";
}

interface CheckAvailabilityParams {
  check_in: string;
  check_out: string;
  room_type?: RoomType;
  guests?: number;
}

interface GetRatesParams {
  check_in: string;
  check_out: string;
  room_type: RoomType;
  corporate_id?: string;
}

interface BookingDetails {
  request_id: string;
  hotel_id: string;
  room_type: string;
  check_in: string;
  check_out: string;
  rate_eur: number;
  inclusions: string[];
  cancellation_policy: string;
  corporate_details: { corporate_id: string; company_name: string; traveler_name: string; traveler_email: string };
  payment_method: string;
}

interface BookingResult {
  booking_ref: string;
  status: "CONFIRMED" | "PENDING" | "FAILED";
  confirmation_timestamp: string;
}

interface YieldRules {
  rules: Array<{ name: string; condition: string; adjustment_pct: number; priority: number }>;
  base_currency: "EUR";
}

// ─── Hotel Inventory ─────────────────────────────────────────────────────────

export interface SiteMinderHotel {
  hotel_id: string;
  name: string;
  category: "3_star" | "4_star" | "5_star";
  address: string;
  district: string;
  city: string;
  esg_tier: "A" | "B" | "C";
  rating_google: number;
  rating_booking: number;
  reviews_count: number;
  photo_url: string;
  website_url: string;
  distance_office_km: number;
  transit_min: number;
  rooms: Record<string, { count: number; base_rate_eur: number }>;
  amenities: string[];
  cancellation_policy: string;
  yield_config: YieldConfig;
  corporate_discounts: Record<string, CorporateDiscount>;
  auto_inclusions: { condition: string; inclusions: string[] };
}

// 5 realistic Paris hotels
const HOTELS: SiteMinderHotel[] = [
  {
    hotel_id: "LMBH-PARIS-001",
    name: "Le Marais Boutique Hotel",
    category: "4_star",
    address: "12 rue des Archives, 75003 Paris",
    district: "Le Marais / 3ème",
    city: "Paris",
    esg_tier: "A",
    rating_google: 4.5,
    rating_booking: 8.6,
    reviews_count: 892,
    photo_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop",
    website_url: "https://example.com/marais-boutique",
    distance_office_km: 1.8,
    transit_min: 12,
    rooms: {
      standard: { count: 45, base_rate_eur: 145 },
      superior: { count: 20, base_rate_eur: 185 },
      suite: { count: 5, base_rate_eur: 320 },
    },
    amenities: ["wifi", "breakfast_buffet", "gym", "bar", "concierge"],
    cancellation_policy: "24h_free",
    yield_config: {
      high_season_months: [7, 8, 12],
      high_season_surcharge_pct: 20,
      low_season_months: [1, 2, 11],
      low_season_discount_pct: 15,
      occupation_tiers: [
        { above_pct: 80, surcharge_pct: 15 },
        { above_pct: 60, surcharge_pct: 5 },
        { below_pct: 40, discount_pct: 10 },
      ],
      length_of_stay_discounts: [
        { min_nights: 3, discount_pct: 8 },
        { min_nights: 7, discount_pct: 15 },
      ],
      last_minute_surcharge: { hours_before: 48, surcharge_pct: 10 },
      floor_rate_eur: 110,
      max_discount_total_pct: 25,
    },
    corporate_discounts: {
      "TC-2026-001": { tier: "gold", negotiated_discount_pct: 12 },
    },
    auto_inclusions: { condition: "nights_gte_2", inclusions: ["wifi", "late_checkout_12h"] },
  },
  {
    hotel_id: "BAST-PARIS-002",
    name: "Hôtel Bastille Inn",
    category: "3_star",
    address: "28 rue de la Roquette, 75011 Paris",
    district: "Bastille / 11ème",
    city: "Paris",
    esg_tier: "B",
    rating_google: 4.2,
    rating_booking: 8.1,
    reviews_count: 341,
    photo_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    website_url: "https://example.com/bastille-inn",
    distance_office_km: 3.2,
    transit_min: 18,
    rooms: {
      standard: { count: 30, base_rate_eur: 118 },
      superior: { count: 10, base_rate_eur: 148 },
    },
    amenities: ["wifi", "bar"],
    cancellation_policy: "24h_free",
    yield_config: {
      high_season_months: [6, 7, 8, 9, 12],
      high_season_surcharge_pct: 18,
      low_season_months: [1, 2, 11],
      low_season_discount_pct: 12,
      occupation_tiers: [
        { above_pct: 85, surcharge_pct: 12 },
        { above_pct: 60, surcharge_pct: 3 },
        { below_pct: 35, discount_pct: 15 },
      ],
      length_of_stay_discounts: [
        { min_nights: 3, discount_pct: 6 },
        { min_nights: 5, discount_pct: 10 },
      ],
      last_minute_surcharge: { hours_before: 24, surcharge_pct: 8 },
      floor_rate_eur: 85,
      max_discount_total_pct: 20,
    },
    corporate_discounts: {
      "TC-2026-001": { tier: "silver", negotiated_discount_pct: 8 },
    },
    auto_inclusions: { condition: "nights_gte_2", inclusions: ["wifi"] },
  },
  {
    hotel_id: "REPB-PARIS-003",
    name: "Hôtel République Palace",
    category: "4_star",
    address: "5 place de la République, 75003 Paris",
    district: "République / 3ème",
    city: "Paris",
    esg_tier: "A",
    rating_google: 4.7,
    rating_booking: 8.9,
    reviews_count: 1247,
    photo_url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop",
    website_url: "https://example.com/republique-palace",
    distance_office_km: 1.5,
    transit_min: 8,
    rooms: {
      standard: { count: 60, base_rate_eur: 165 },
      superior: { count: 25, base_rate_eur: 210 },
      suite: { count: 8, base_rate_eur: 380 },
    },
    amenities: ["wifi", "breakfast_buffet", "gym", "spa", "bar", "minibar", "concierge"],
    cancellation_policy: "48h_free",
    yield_config: {
      high_season_months: [5, 6, 7, 8, 9, 12],
      high_season_surcharge_pct: 22,
      low_season_months: [1, 2],
      low_season_discount_pct: 10,
      occupation_tiers: [
        { above_pct: 75, surcharge_pct: 18 },
        { above_pct: 55, surcharge_pct: 8 },
        { below_pct: 30, discount_pct: 12 },
      ],
      length_of_stay_discounts: [
        { min_nights: 3, discount_pct: 5 },
        { min_nights: 7, discount_pct: 12 },
      ],
      last_minute_surcharge: { hours_before: 72, surcharge_pct: 12 },
      floor_rate_eur: 140,
      max_discount_total_pct: 20,
    },
    corporate_discounts: {
      "TC-2026-001": { tier: "gold", negotiated_discount_pct: 10 },
    },
    auto_inclusions: { condition: "nights_gte_1", inclusions: ["wifi", "breakfast", "gym", "minibar"] },
  },
  {
    hotel_id: "SNTH-PARIS-004",
    name: "Saint-Honoré Résidence",
    category: "3_star",
    address: "42 rue du Faubourg Saint-Honoré, 75008 Paris",
    district: "Madeleine / 8ème",
    city: "Paris",
    esg_tier: "B",
    rating_google: 4.0,
    rating_booking: 7.8,
    reviews_count: 215,
    photo_url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=250&fit=crop",
    website_url: "https://example.com/saint-honore",
    distance_office_km: 2.8,
    transit_min: 15,
    rooms: {
      standard: { count: 25, base_rate_eur: 105 },
      superior: { count: 8, base_rate_eur: 135 },
    },
    amenities: ["wifi", "concierge"],
    cancellation_policy: "24h_free",
    yield_config: {
      high_season_months: [5, 6, 9, 10, 12],
      high_season_surcharge_pct: 15,
      low_season_months: [1, 2, 8, 11],
      low_season_discount_pct: 18,
      occupation_tiers: [
        { above_pct: 80, surcharge_pct: 10 },
        { below_pct: 40, discount_pct: 12 },
      ],
      length_of_stay_discounts: [
        { min_nights: 3, discount_pct: 10 },
        { min_nights: 5, discount_pct: 15 },
      ],
      last_minute_surcharge: { hours_before: 24, surcharge_pct: 5 },
      floor_rate_eur: 78,
      max_discount_total_pct: 30,
    },
    corporate_discounts: {},
    auto_inclusions: { condition: "nights_gte_3", inclusions: ["wifi"] },
  },
  {
    hotel_id: "OPRA-PARIS-005",
    name: "Grand Hôtel Opéra",
    category: "5_star",
    address: "2 rue Scribe, 75009 Paris",
    district: "Opéra / 9ème",
    city: "Paris",
    esg_tier: "A",
    rating_google: 4.8,
    rating_booking: 9.2,
    reviews_count: 2031,
    photo_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=250&fit=crop",
    website_url: "https://example.com/grand-opera",
    distance_office_km: 2.1,
    transit_min: 14,
    rooms: {
      standard: { count: 80, base_rate_eur: 245 },
      superior: { count: 35, base_rate_eur: 310 },
      suite: { count: 12, base_rate_eur: 520 },
    },
    amenities: ["wifi", "breakfast_gourmet", "spa", "gym", "bar", "minibar", "concierge", "valet_parking", "room_service"],
    cancellation_policy: "48h_free",
    yield_config: {
      high_season_months: [4, 5, 6, 9, 10, 12],
      high_season_surcharge_pct: 25,
      low_season_months: [1, 2, 8],
      low_season_discount_pct: 8,
      occupation_tiers: [
        { above_pct: 70, surcharge_pct: 20 },
        { above_pct: 50, surcharge_pct: 10 },
        { below_pct: 30, discount_pct: 8 },
      ],
      length_of_stay_discounts: [
        { min_nights: 3, discount_pct: 5 },
      ],
      last_minute_surcharge: { hours_before: 72, surcharge_pct: 15 },
      floor_rate_eur: 210,
      max_discount_total_pct: 15,
    },
    corporate_discounts: {
      "TC-2026-001": { tier: "gold", negotiated_discount_pct: 8 },
    },
    auto_inclusions: { condition: "nights_gte_1", inclusions: ["wifi", "breakfast_gourmet", "gym", "minibar", "room_service"] },
  },
];

// ─── Simulated occupancy ─────────────────────────────────────────────────────

function getOccupancy(hotel_id: string, date: string): number {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const dayOfWeek = d.getDay();
  const hash = (d.getDate() * 7 + month * 13 + hotel_id.charCodeAt(0)) % 20 - 10;

  let base = 55;
  if (dayOfWeek === 5 || dayOfWeek === 6) base += 15;
  if ([6, 7, 8, 9, 12].includes(month)) base += 15;
  if ([1, 2, 11].includes(month)) base -= 12;
  return Math.max(10, Math.min(98, base + hash));
}

// ─── Provider ────────────────────────────────────────────────────────────────

export class SiteMinderProvider {
  private hotels: SiteMinderHotel[];

  constructor(city?: string) {
    this.hotels = city
      ? HOTELS.filter((h) => h.city.toLowerCase() === city.toLowerCase())
      : HOTELS;
  }

  /** List all available hotels for a city */
  getHotels(): SiteMinderHotel[] {
    return this.hotels;
  }

  /** Get a specific hotel by ID */
  getHotel(hotel_id: string): SiteMinderHotel | undefined {
    return HOTELS.find((h) => h.hotel_id === hotel_id);
  }

  /** Get availability for a specific hotel */
  async getAvailability(params: CheckAvailabilityParams & { hotel_id?: string }): Promise<AvailabilityResponse> {
    const hotel = params.hotel_id
      ? this.getHotel(params.hotel_id)
      : this.hotels[0];

    if (!hotel) {
      return { available: false, room_type: (params.room_type ?? "standard") as RoomType, rooms_available: 0, check_in: params.check_in, check_out: params.check_out, nights: 0 };
    }

    const room_type = params.room_type ?? "standard";
    const room = hotel.rooms[room_type];
    if (!room) {
      return { available: false, room_type: room_type as RoomType, rooms_available: 0, check_in: params.check_in, check_out: params.check_out, nights: 0 };
    }

    const nights = Math.ceil(
      (new Date(params.check_out).getTime() - new Date(params.check_in).getTime()) / 86400000,
    );

    // Simulate some rooms booked based on occupancy
    const occ = getOccupancy(hotel.hotel_id, params.check_in);
    const booked = Math.floor(room.count * occ / 100);
    const available = Math.max(0, room.count - booked);

    return {
      available: available > 0,
      room_type: room_type as RoomType,
      rooms_available: available,
      check_in: params.check_in,
      check_out: params.check_out,
      nights,
    };
  }

  /** Get rates for a specific hotel */
  async getRates(params: GetRatesParams & { hotel_id?: string }): Promise<RateResponse> {
    const hotel = params.hotel_id
      ? this.getHotel(params.hotel_id)
      : this.hotels[0];

    if (!hotel) throw new Error("Hotel not found");

    const room = hotel.rooms[params.room_type];
    if (!room) throw new Error(`Room type ${params.room_type} not found`);

    const check_in = new Date(params.check_in);
    const check_out = new Date(params.check_out);
    const nights = Math.ceil((check_out.getTime() - check_in.getTime()) / 86400000);
    const occupancy_pct = getOccupancy(hotel.hotel_id, params.check_in);

    let corporate: CorporateDiscount | undefined;
    if (params.corporate_id && hotel.corporate_discounts[params.corporate_id]) {
      corporate = hotel.corporate_discounts[params.corporate_id];
    }

    const ctx: YieldContext = { check_in, check_out, occupancy_pct, corporate };
    const { adjusted_rate_eur, adjustments } = computeYield(room.base_rate_eur, hotel.yield_config, ctx);

    // Auto-inclusions
    const inclusions = ["wifi"];
    if (hotel.auto_inclusions.condition === "nights_gte_1" ||
      (hotel.auto_inclusions.condition === "nights_gte_2" && nights >= 2) ||
      (hotel.auto_inclusions.condition === "nights_gte_3" && nights >= 3)) {
      inclusions.push(...hotel.auto_inclusions.inclusions.filter((i) => !inclusions.includes(i)));
    }

    return {
      room_type: params.room_type,
      base_rate_eur: room.base_rate_eur,
      adjusted_rate_eur,
      adjustments,
      inclusions,
      currency: "EUR",
    };
  }

  /** Create a booking */
  async createBooking(details: BookingDetails): Promise<BookingResult> {
    const ref = `BK-${details.hotel_id.slice(0, 4)}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    return {
      booking_ref: ref,
      status: "CONFIRMED",
      confirmation_timestamp: new Date().toISOString(),
    };
  }

  /** Get yield rules for a specific hotel */
  async getYieldRules(hotel_id?: string): Promise<YieldRules> {
    const hotel = hotel_id ? this.getHotel(hotel_id) : this.hotels[0];
    if (!hotel) throw new Error("Hotel not found");

    const config = hotel.yield_config;
    return {
      rules: [
        { name: "high_season", condition: `month in [${config.high_season_months}]`, adjustment_pct: config.high_season_surcharge_pct, priority: 1 },
        { name: "low_season", condition: `month in [${config.low_season_months}]`, adjustment_pct: -config.low_season_discount_pct, priority: 1 },
        { name: "floor_rate", condition: `rate < ${config.floor_rate_eur}`, adjustment_pct: 0, priority: 10 },
      ],
      base_currency: "EUR",
    };
  }

  /**
   * Get negotiated offers from multiple hotels for a travel request.
   * This is the key method for multi-hotel mode.
   */
  async getMultiHotelOffers(params: {
    check_in: string;
    check_out: string;
    room_type: string;
    corporate_id?: string;
    max_offers: number;
    budget_max_eur: number;
  }): Promise<Array<{
    hotel: SiteMinderHotel;
    availability: AvailabilityResponse;
    rates: RateResponse;
  }>> {
    const results: Array<{
      hotel: SiteMinderHotel;
      availability: AvailabilityResponse;
      rates: RateResponse;
    }> = [];

    // Query all hotels in parallel
    const promises = this.hotels.map(async (hotel) => {
      try {
        const availability = await this.getAvailability({
          ...params,
          hotel_id: hotel.hotel_id,
          room_type: params.room_type as RoomType,
        });

        if (!availability.available) return null;

        const rates = await this.getRates({
          ...params,
          hotel_id: hotel.hotel_id,
          room_type: params.room_type as RoomType,
        });

        return { hotel, availability, rates };
      } catch {
        return null;
      }
    });

    const settled = await Promise.all(promises);
    for (const result of settled) {
      if (result) results.push(result);
    }

    // Rank: policy-compliant first, then by adjusted rate
    results.sort((a, b) => {
      const aCompliant = a.rates.adjusted_rate_eur <= params.budget_max_eur;
      const bCompliant = b.rates.adjusted_rate_eur <= params.budget_max_eur;
      if (aCompliant !== bCompliant) return aCompliant ? -1 : 1;
      return a.rates.adjusted_rate_eur - b.rates.adjusted_rate_eur;
    });

    return results.slice(0, params.max_offers);
  }
}
