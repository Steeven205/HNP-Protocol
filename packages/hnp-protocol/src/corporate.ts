/**
 * Types liés à l'agent corporate et à la politique voyage.
 */

// ─── Travel Policy ───────────────────────────────────────────────────────────

export type CancellationRequirement = "24h_free_required" | "48h_free_required" | "flexible";
export type BreakfastPolicy = "required" | "optional" | "excluded";
export type MinimumCategory = "3_star" | "4_star" | "5_star";
export type EsgRequirement = "tier_A_minimum" | "tier_B_minimum" | "tier_C_minimum" | "none";

export interface TravelPolicy {
  /** Tarif max par nuit, par ville */
  max_rate_per_night: Record<string, number>;
  minimum_category: MinimumCategory;
  esg_requirement: EsgRequirement;
  cancellation: CancellationRequirement;
  breakfast: BreakfastPolicy;
  loyalty_program: string;
  /** Montant au-dessus duquel une approbation humaine est requise */
  approval_required_above: number;
  preferred_chains: string[];
}

// ─── Negotiation Rules ───────────────────────────────────────────────────────

export interface NegotiationRules {
  /** Nombre max de rounds de contre-proposition */
  max_counter_rounds: number;
  /** Seuil de nuits pour activer le levier volume */
  volume_leverage_threshold: number;
  /** Pourcentage sous budget pour accept automatique */
  auto_accept_if_below_budget_pct: number;
}

// ─── Corporate Profile ───────────────────────────────────────────────────────

export interface CorporateProfile {
  company: string;
  corporate_id: string;
  travel_policy: TravelPolicy;
  negotiation_rules: NegotiationRules;
}

// ─── Travel Request Trigger ──────────────────────────────────────────────────

export interface TravelRequestTrigger {
  traveler: string;
  destination: string;
  check_in: string;
  check_out: string;
  purpose?: string;
}
