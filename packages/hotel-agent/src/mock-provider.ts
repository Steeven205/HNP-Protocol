/**
 * MockHotelProvider — Implémente HotelDataProvider avec données JSON.
 * POC uniquement. Sera remplacé par MewsHotelProvider en MVP.
 */

import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type {
  HotelDataProvider,
  CheckAvailabilityParams,
  AvailabilityResponse,
  GetRatesParams,
  RateResponse,
  BookingDetails,
  BookingResult,
  YieldRules,
  RoomType,
} from "@hnp/protocol";

import { computeYield, type YieldConfig, type CorporateDiscount } from "./yield-engine.js";
import { store } from "./store.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MOCK_DATA_PATH = resolve(__dirname, "../../../data/mock/hotel.json");

interface MockRoom {
  count: number;
  base_rate_eur: number;
  description: string;
  amenities: string[];
}

interface MockCorporateAccount {
  corporate_id: string;
  company: string;
  tier: string;
  negotiated_discount_pct: number;
  nights_ytd: number;
}

interface MockHotelData {
  hotel_id: string;
  name: string;
  category: string;
  esg_tier: string;
  rooms: Record<string, MockRoom>;
  hotel_amenities: string[];
  breakfast_price_eur: number;
  parking_price_eur: number;
  corporate_accounts: MockCorporateAccount[];
  yield_rules: YieldConfig;
  cancellation_policies: Record<string, string>;
  auto_inclusions_for_corporate: {
    condition: string;
    inclusions: string[];
  };
}

export class MockHotelProvider implements HotelDataProvider {
  private data: MockHotelData | null = null;

  private async load(): Promise<MockHotelData> {
    if (this.data) return this.data;
    const raw = await readFile(MOCK_DATA_PATH, "utf-8");
    this.data = JSON.parse(raw) as MockHotelData;
    return this.data;
  }

  async getHotelData(): Promise<MockHotelData> {
    return this.load();
  }

  async getAvailability(params: CheckAvailabilityParams): Promise<AvailabilityResponse> {
    const data = await this.load();
    const room_type = params.room_type ?? "standard";
    const room = data.rooms[room_type];

    if (!room) {
      return {
        available: false,
        room_type: room_type as RoomType,
        rooms_available: 0,
        check_in: params.check_in,
        check_out: params.check_out,
        nights: 0,
      };
    }

    const nights = Math.ceil(
      (new Date(params.check_out).getTime() - new Date(params.check_in).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    const booked = store.countBookedRooms(
      room_type as RoomType,
      params.check_in,
      params.check_out,
    );
    const available = room.count - booked;

    return {
      available: available > 0,
      room_type: room_type as RoomType,
      rooms_available: Math.max(0, available),
      check_in: params.check_in,
      check_out: params.check_out,
      nights,
    };
  }

  async getRates(params: GetRatesParams): Promise<RateResponse> {
    const data = await this.load();
    const room = data.rooms[params.room_type];

    if (!room) {
      throw new Error(`Type de chambre inconnu : ${params.room_type}`);
    }

    const check_in = new Date(params.check_in);
    const check_out = new Date(params.check_out);
    const occupancy_pct = store.getOccupancy(params.check_in);

    let corporate: CorporateDiscount | undefined;
    if (params.corporate_id) {
      const account = data.corporate_accounts.find(
        (a) => a.corporate_id === params.corporate_id,
      );
      if (account) {
        corporate = {
          tier: account.tier as "gold" | "silver",
          negotiated_discount_pct: account.negotiated_discount_pct,
        };
      }
    }

    const { adjusted_rate_eur, adjustments } = computeYield(
      room.base_rate_eur,
      data.yield_rules,
      { check_in, check_out, occupancy_pct, corporate },
    );

    // Auto-inclusions corporate
    const nights = Math.ceil(
      (check_out.getTime() - check_in.getTime()) / (1000 * 60 * 60 * 24),
    );
    const inclusions = ["wifi"];
    if (
      params.corporate_id &&
      data.auto_inclusions_for_corporate.condition === "nights_gte_2" &&
      nights >= 2
    ) {
      inclusions.push(...data.auto_inclusions_for_corporate.inclusions.filter(
        (i) => !inclusions.includes(i),
      ));
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

  async createBooking(details: BookingDetails): Promise<BookingResult> {
    const ref = `BK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    store.saveBooking({
      booking_ref: ref,
      request_id: details.request_id,
      hotel_id: details.hotel_id,
      final_rate_eur: details.rate_eur,
      room_type: details.room_type as RoomType,
      check_in: details.check_in,
      check_out: details.check_out,
      inclusions: details.inclusions,
      cancellation_policy: details.cancellation_policy,
      status: "CONFIRMED",
      corporate_name: details.corporate_details.company_name,
      traveler_name: details.corporate_details.traveler_name,
      traveler_email: details.corporate_details.traveler_email,
      payment_method: details.payment_method,
      created_at: new Date().toISOString(),
    });

    return {
      booking_ref: ref,
      status: "CONFIRMED",
      confirmation_timestamp: new Date().toISOString(),
    };
  }

  async getYieldRules(): Promise<YieldRules> {
    const data = await this.load();
    const config = data.yield_rules;

    return {
      rules: [
        {
          name: "high_season",
          condition: `month in [${config.high_season_months.join(",")}]`,
          adjustment_pct: config.high_season_surcharge_pct,
          priority: 1,
        },
        {
          name: "low_season",
          condition: `month in [${config.low_season_months.join(",")}]`,
          adjustment_pct: -config.low_season_discount_pct,
          priority: 1,
        },
        ...config.occupation_tiers.map((t, i) => ({
          name: "occupancy",
          condition: "above_pct" in t
            ? `occupancy > ${t.above_pct}%`
            : `occupancy < ${(t as { below_pct: number }).below_pct}%`,
          adjustment_pct: "above_pct" in t
            ? (t as { surcharge_pct: number }).surcharge_pct
            : -(t as { discount_pct: number }).discount_pct,
          priority: 2 + i,
        })),
        ...config.length_of_stay_discounts.map((l, i) => ({
          name: "length_of_stay",
          condition: `nights >= ${l.min_nights}`,
          adjustment_pct: -l.discount_pct,
          priority: 5 + i,
        })),
        {
          name: "last_minute",
          condition: `hours_before_checkin < ${config.last_minute_surcharge.hours_before}`,
          adjustment_pct: config.last_minute_surcharge.surcharge_pct,
          priority: 7,
        },
      ],
      base_currency: "EUR",
    };
  }
}
