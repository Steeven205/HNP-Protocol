/**
 * Types liés à l'agent hôtelier et au MCP Server.
 */

// ─── Room & Hotel ────────────────────────────────────────────────────────────

export type RoomType = "standard" | "superior" | "suite";
export type EsgTier = "A" | "B" | "C" | "D";
export type HotelCategory = "3_star" | "4_star" | "5_star";

export interface RoomInventory {
  count: number;
  base_rate: number;
}

export interface HotelLocation {
  city: string;
  arrondissement?: string;
  address: string;
}

export interface HotelData {
  hotel_id: string;
  name: string;
  category: HotelCategory;
  location: HotelLocation;
  rooms: Record<RoomType, RoomInventory>;
  amenities: string[];
  esg_tier: EsgTier;
  pms: string;
  corporate_accounts: string[];
}

// ─── MCP Tool Parameters ────────────────────────────────────────────────────

export interface CheckAvailabilityParams {
  check_in: string;
  check_out: string;
  room_type?: RoomType;
  guests?: number;
}

export interface GetRatesParams {
  check_in: string;
  check_out: string;
  room_type: RoomType;
  /** ID compte corporate pour tarif négocié */
  corporate_id?: string;
}

export interface MakeOfferParams {
  /** ID de la requête HNP entrante */
  request_id: string;
  rate_eur: number;
  inclusions: string[];
  cancellation_policy: string;
  /** Durée de validité de l'offre en minutes */
  validity_minutes: number;
}

export interface CounterRespondParams {
  request_id: string;
  accept: boolean;
  modified_offer?: Partial<OfferResponse>;
  reason?: string;
}

export interface ConfirmBookingParams {
  request_id: string;
  corporate_details: CorporateDetails;
  payment_method: string;
}

export type PolicyType = "cancellation" | "corporate" | "payment" | "yield";

export interface GetPolicyParams {
  policy_type: PolicyType;
}

// ─── MCP Tool Responses ──────────────────────────────────────────────────────

export interface AvailabilityResponse {
  available: boolean;
  room_type: RoomType;
  rooms_available: number;
  check_in: string;
  check_out: string;
  nights: number;
}

export interface RateResponse {
  room_type: RoomType;
  base_rate_eur: number;
  adjusted_rate_eur: number;
  adjustments: RateAdjustment[];
  inclusions: string[];
  currency: "EUR";
}

export interface RateAdjustment {
  rule: string;
  percentage: number;
  reason: string;
}

export interface OfferResponse {
  request_id: string;
  hotel_id: string;
  rate_eur: number;
  room_type: RoomType;
  inclusions: string[];
  cancellation_policy: string;
  validity_expires: string;
  esg_tier: EsgTier;
}

export interface CounterResponse {
  request_id: string;
  accepted: boolean;
  modified_offer?: OfferResponse;
  reason?: string;
}

export interface CorporateDetails {
  corporate_id: string;
  company_name: string;
  traveler_name: string;
  traveler_email: string;
}

export interface BookingConfirmationResponse {
  booking_ref: string;
  request_id: string;
  hotel_id: string;
  final_rate_eur: number;
  room_type: RoomType;
  check_in: string;
  check_out: string;
  inclusions: string[];
  cancellation_policy: string;
  status: "CONFIRMED";
}

export interface PolicyResponse {
  policy_type: PolicyType;
  rules: Record<string, unknown>;
  last_updated: string;
}

// ─── Yield Management ────────────────────────────────────────────────────────

export interface YieldRule {
  name: string;
  condition: string;
  adjustment_pct: number;
  priority: number;
}

export interface YieldRules {
  rules: YieldRule[];
  base_currency: "EUR";
}
