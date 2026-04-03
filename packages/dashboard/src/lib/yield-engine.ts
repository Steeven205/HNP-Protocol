/**
 * Moteur de yield simplifié — ajuste les tarifs selon les règles
 * définies dans hotel.json.
 *
 * Règles appliquées :
 * - Haute saison (juil-août, déc) → +20%
 * - Basse saison (jan, fév, nov) → -15%
 * - Occupation > 80% → +15%, > 60% → +5%, < 40% → -10%
 * - Séjour ≥ 3 nuits → -8%, ≥ 7 nuits → -15%
 * - Corporate Gold → -12%, Silver → -8%
 * - Last minute < 48h → +10%
 * - Plancher : floor_rate_eur
 * - Plafond de réduction : max_discount_total_pct
 */

export interface RateAdjustment {
  rule: string;
  percentage: number;
  reason: string;
}

export interface YieldConfig {
  high_season_months: number[];
  high_season_surcharge_pct: number;
  low_season_months: number[];
  low_season_discount_pct: number;
  occupation_tiers: Array<
    | { above_pct: number; surcharge_pct: number }
    | { below_pct: number; discount_pct: number }
  >;
  length_of_stay_discounts: Array<{
    min_nights: number;
    discount_pct: number;
  }>;
  last_minute_surcharge: {
    hours_before: number;
    surcharge_pct: number;
  };
  floor_rate_eur: number;
  max_discount_total_pct: number;
}

export interface CorporateDiscount {
  tier: "gold" | "silver";
  negotiated_discount_pct: number;
}

export interface YieldContext {
  check_in: Date;
  check_out: Date;
  occupancy_pct: number;
  corporate?: CorporateDiscount;
}

export interface YieldResult {
  adjusted_rate_eur: number;
  adjustments: RateAdjustment[];
}

export function computeYield(
  base_rate_eur: number,
  config: YieldConfig,
  ctx: YieldContext,
): YieldResult {
  const adjustments: RateAdjustment[] = [];
  let rate = base_rate_eur;

  const checkInMonth = ctx.check_in.getMonth() + 1;
  const nights = Math.ceil(
    (ctx.check_out.getTime() - ctx.check_in.getTime()) / (1000 * 60 * 60 * 24),
  );
  const hoursUntilCheckIn =
    (ctx.check_in.getTime() - Date.now()) / (1000 * 60 * 60);

  // ─── Season ────────────────────────────────────────────────────────────
  if (config.high_season_months.includes(checkInMonth)) {
    const pct = config.high_season_surcharge_pct;
    adjustments.push({
      rule: "high_season",
      percentage: pct,
      reason: `Haute saison (mois ${checkInMonth})`,
    });
    rate += base_rate_eur * (pct / 100);
  } else if (config.low_season_months.includes(checkInMonth)) {
    const pct = -config.low_season_discount_pct;
    adjustments.push({
      rule: "low_season",
      percentage: pct,
      reason: `Basse saison (mois ${checkInMonth})`,
    });
    rate += base_rate_eur * (pct / 100);
  }

  // ─── Occupancy ─────────────────────────────────────────────────────────
  for (const tier of config.occupation_tiers) {
    if ("above_pct" in tier && ctx.occupancy_pct > tier.above_pct) {
      adjustments.push({
        rule: "occupancy",
        percentage: tier.surcharge_pct,
        reason: `Occupation ${ctx.occupancy_pct}% > ${tier.above_pct}%`,
      });
      rate += base_rate_eur * (tier.surcharge_pct / 100);
      break;
    }
    if ("below_pct" in tier && ctx.occupancy_pct < tier.below_pct) {
      adjustments.push({
        rule: "occupancy",
        percentage: -tier.discount_pct,
        reason: `Occupation ${ctx.occupancy_pct}% < ${tier.below_pct}%`,
      });
      rate -= base_rate_eur * (tier.discount_pct / 100);
      break;
    }
  }

  // ─── Length of stay ────────────────────────────────────────────────────
  const losDiscounts = [...config.length_of_stay_discounts].sort(
    (a, b) => b.min_nights - a.min_nights,
  );
  for (const los of losDiscounts) {
    if (nights >= los.min_nights) {
      adjustments.push({
        rule: "length_of_stay",
        percentage: -los.discount_pct,
        reason: `Séjour ${nights} nuits ≥ ${los.min_nights}`,
      });
      rate -= base_rate_eur * (los.discount_pct / 100);
      break;
    }
  }

  // ─── Corporate discount ────────────────────────────────────────────────
  if (ctx.corporate) {
    const pct = ctx.corporate.negotiated_discount_pct;
    adjustments.push({
      rule: "corporate",
      percentage: -pct,
      reason: `Compte corporate ${ctx.corporate.tier}`,
    });
    rate -= base_rate_eur * (pct / 100);
  }

  // ─── Last minute ───────────────────────────────────────────────────────
  if (
    hoursUntilCheckIn > 0 &&
    hoursUntilCheckIn < config.last_minute_surcharge.hours_before
  ) {
    const pct = config.last_minute_surcharge.surcharge_pct;
    adjustments.push({
      rule: "last_minute",
      percentage: pct,
      reason: `Réservation < ${config.last_minute_surcharge.hours_before}h avant arrivée`,
    });
    rate += base_rate_eur * (pct / 100);
  }

  // ─── Caps ──────────────────────────────────────────────────────────────
  const totalDiscount = base_rate_eur - rate;
  const maxDiscount = base_rate_eur * (config.max_discount_total_pct / 100);
  if (totalDiscount > maxDiscount) {
    rate = base_rate_eur - maxDiscount;
    adjustments.push({
      rule: "max_discount_cap",
      percentage: 0,
      reason: `Réduction plafonnée à ${config.max_discount_total_pct}%`,
    });
  }

  if (rate < config.floor_rate_eur) {
    rate = config.floor_rate_eur;
    adjustments.push({
      rule: "floor_rate",
      percentage: 0,
      reason: `Tarif plancher appliqué (${config.floor_rate_eur}€)`,
    });
  }

  return {
    adjusted_rate_eur: Math.round(rate * 100) / 100,
    adjustments,
  };
}
