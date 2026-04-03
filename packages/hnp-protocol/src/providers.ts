/**
 * Interface abstraite pour les fournisseurs de données hôtelières.
 *
 * Pattern pour connecteur futur — ne pas coupler le code au mock.
 * Implémentations prévues :
 * - MockHotelProvider  (POC — données JSON)
 * - MewsHotelProvider  (MVP — Mews API réelle)
 * - SiteMinderProvider (Scale — SiteMinder API)
 */

import type {
  CheckAvailabilityParams,
  AvailabilityResponse,
  GetRatesParams,
  RateResponse,
  YieldRules,
} from "./hotel.js";

import type { CorporateDetails } from "./hotel.js";

export interface BookingDetails {
  request_id: string;
  hotel_id: string;
  room_type: string;
  check_in: string;
  check_out: string;
  rate_eur: number;
  inclusions: string[];
  cancellation_policy: string;
  corporate_details: CorporateDetails;
  payment_method: string;
}

export interface BookingResult {
  booking_ref: string;
  status: "CONFIRMED" | "PENDING" | "FAILED";
  confirmation_timestamp: string;
}

export interface HotelDataProvider {
  getAvailability(params: CheckAvailabilityParams): Promise<AvailabilityResponse>;
  getRates(params: GetRatesParams): Promise<RateResponse>;
  createBooking(details: BookingDetails): Promise<BookingResult>;
  getYieldRules(): Promise<YieldRules>;
}
