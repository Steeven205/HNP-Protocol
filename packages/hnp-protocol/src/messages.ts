/**
 * Les 4 types de messages du protocole HNP.
 *
 * Chaque message est immutable et loggé avec un hash SHA256.
 */

// ─── Type 1 : Requête de voyage (Corporate → Hôtel) ─────────────────────────

export interface PolicySnapshot {
  max_rate: number;
  requirements: string[];
}

export interface VolumeSignal {
  /** Nuits déjà réservées cette année */
  nights_ytd: number;
  loyalty_tier: string;
}

export interface TravelIntent {
  type: "TRAVEL_INTENT";
  /** UUID unique de la requête */
  request_id: string;
  /** ISO 8601 */
  timestamp: string;
  corporate_id: string;
  destination: string;
  /** ISO 8601 date */
  check_in: string;
  /** ISO 8601 date */
  check_out: string;
  travelers: number;
  /** Snapshot de la politique au moment T */
  policy_snapshot: PolicySnapshot;
  /** Levier de négociation */
  volume_signal?: VolumeSignal;
}

// ─── Type 2 : Offre hôtelière (Hôtel → Corporate) ───────────────────────────

export interface HotelOffer {
  type: "HOTEL_OFFER";
  request_id: string;
  /** ISO 8601 */
  timestamp: string;
  hotel_id: string;
  rate_eur: number;
  room_type: string;
  inclusions: string[];
  cancellation_policy: string;
  /** ISO 8601 — l'offre expire */
  validity_expires: string;
  loyalty_points?: number;
  esg_tier: string;
}

// ─── Type 3 : Contre-proposition (Corporate → Hôtel) ────────────────────────

export interface RequestedModifications {
  cancellation?: string;
  inclusions?: string[];
  rate_adjustment?: number;
}

export interface CounterProposal {
  type: "COUNTER_PROPOSAL";
  request_id: string;
  /** ISO 8601 */
  timestamp: string;
  accept_rate: boolean;
  requested_modifications: RequestedModifications;
  /** Argument de l'agent (volume, fidélité...) */
  justification: string;
  /** 1 ou 2 (max 2 rounds) */
  round_number: number;
}

// ─── Type 4 : Confirmation (les deux) ────────────────────────────────────────

export interface NegotiationSummary {
  rounds: number;
  initial_rate: number;
  final_rate: number;
  savings_pct: number;
}

export interface BookingConfirmation {
  type: "CONFIRMATION";
  request_id: string;
  /** ISO 8601 */
  timestamp: string;
  booking_ref: string;
  final_rate: number;
  final_inclusions: string[];
  final_cancellation: string;
  payment_method: string;
  /** SHA256 de la transaction complète */
  audit_hash: string;
  negotiation_summary: NegotiationSummary;
}

// ─── Union de tous les messages HNP ──────────────────────────────────────────

export type HnpMessage =
  | TravelIntent
  | HotelOffer
  | CounterProposal
  | BookingConfirmation;

export type HnpMessageType = HnpMessage["type"];
