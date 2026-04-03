/**
 * Policy Engine — Validation programmatique des offres hôtelières
 * contre la politique voyage de l'entreprise.
 *
 * Sert de garde-fou indépendant de Claude : même si l'agent IA
 * décide d'accepter, le policy engine peut bloquer ou escalader.
 */

import type { CorporateData } from "./system-prompt.js";

export type PolicyVerdict = "ACCEPT" | "COUNTER" | "ESCALATE";

export interface PolicyEvaluation {
  verdict: PolicyVerdict;
  rate_eur: number;
  budget_max_eur: number;
  rate_vs_budget_pct: number;
  checks: PolicyCheck[];
}

export interface PolicyCheck {
  rule: string;
  passed: boolean;
  detail: string;
}

export interface OfferToEvaluate {
  rate_eur: number;
  destination: string;
  cancellation_policy: string;
  esg_tier: string;
  inclusions: string[];
  nights: number;
  round_number: number;
}

const ESG_TIER_ORDER = ["A", "B", "C", "D"];

function esgMeetsRequirement(offered: string, required: string): boolean {
  const match = required.match(/^tier_([A-D])_minimum$/);
  if (!match) return true;
  const minTier = match[1];
  const offeredIndex = ESG_TIER_ORDER.indexOf(offered.toUpperCase());
  const requiredIndex = ESG_TIER_ORDER.indexOf(minTier);
  return offeredIndex >= 0 && offeredIndex <= requiredIndex;
}

function cancellationMeetsRequirement(offered: string, required: string): boolean {
  const offerLower = offered.toLowerCase();
  if (required === "24h_free") {
    return offerLower.includes("24h") || offerLower.includes("flexible");
  }
  if (required === "48h_free") {
    return (
      offerLower.includes("48h") ||
      offerLower.includes("24h") ||
      offerLower.includes("flexible")
    );
  }
  return true;
}

export function evaluateOffer(
  offer: OfferToEvaluate,
  policy: CorporateData,
): PolicyEvaluation {
  const checks: PolicyCheck[] = [];
  const city = offer.destination.toLowerCase();
  const budget_max_eur =
    policy.travel_policy.max_rate_per_night_eur[city] ??
    policy.travel_policy.max_rate_per_night_eur["default"] ??
    130;

  const rate_vs_budget_pct =
    ((offer.rate_eur - budget_max_eur) / budget_max_eur) * 100;

  // ─── Rate check ────────────────────────────────────────────────────
  const rateOk = offer.rate_eur <= budget_max_eur;
  checks.push({
    rule: "max_rate",
    passed: rateOk,
    detail: rateOk
      ? `${offer.rate_eur}€ ≤ budget ${budget_max_eur}€`
      : `${offer.rate_eur}€ dépasse budget ${budget_max_eur}€ de ${rate_vs_budget_pct.toFixed(1)}%`,
  });

  // ─── Cancellation check ────────────────────────────────────────────
  const cancelOk = cancellationMeetsRequirement(
    offer.cancellation_policy,
    policy.travel_policy.cancellation_required,
  );
  checks.push({
    rule: "cancellation",
    passed: cancelOk,
    detail: cancelOk
      ? `Annulation "${offer.cancellation_policy}" conforme`
      : `Annulation "${offer.cancellation_policy}" non conforme — requis: ${policy.travel_policy.cancellation_required}`,
  });

  // ─── ESG check ─────────────────────────────────────────────────────
  const esgOk = esgMeetsRequirement(
    offer.esg_tier,
    policy.travel_policy.esg_requirement,
  );
  checks.push({
    rule: "esg",
    passed: esgOk,
    detail: esgOk
      ? `ESG tier "${offer.esg_tier}" conforme`
      : `ESG tier "${offer.esg_tier}" insuffisant — requis: ${policy.travel_policy.esg_requirement}`,
  });

  // ─── Approval threshold ────────────────────────────────────────────
  const needsApproval =
    offer.rate_eur > policy.travel_policy.approval_required_above_eur;
  checks.push({
    rule: "approval_threshold",
    passed: !needsApproval,
    detail: needsApproval
      ? `${offer.rate_eur}€ > seuil approbation ${policy.travel_policy.approval_required_above_eur}€ — approbation humaine requise`
      : `${offer.rate_eur}€ ≤ seuil approbation ${policy.travel_policy.approval_required_above_eur}€`,
  });

  // ─── Rounds check ─────────────────────────────────────────────────
  const roundsOk =
    offer.round_number <= policy.negotiation_rules.max_counter_rounds;
  checks.push({
    rule: "max_rounds",
    passed: roundsOk,
    detail: roundsOk
      ? `Round ${offer.round_number}/${policy.negotiation_rules.max_counter_rounds}`
      : `Round ${offer.round_number} dépasse max ${policy.negotiation_rules.max_counter_rounds}`,
  });

  // ─── Verdict ───────────────────────────────────────────────────────
  const allPassed = checks.every((c) => c.passed);

  let verdict: PolicyVerdict;
  if (allPassed) {
    verdict = "ACCEPT";
  } else if (
    rate_vs_budget_pct >
    policy.negotiation_rules.escalate_to_human_if.rate_above_budget_pct
  ) {
    verdict = "ESCALATE";
  } else if (!roundsOk) {
    verdict = "ESCALATE";
  } else if (needsApproval) {
    verdict = "ESCALATE";
  } else {
    verdict = "COUNTER";
  }

  return {
    verdict,
    rate_eur: offer.rate_eur,
    budget_max_eur,
    rate_vs_budget_pct: Math.round(rate_vs_budget_pct * 10) / 10,
    checks,
  };
}
