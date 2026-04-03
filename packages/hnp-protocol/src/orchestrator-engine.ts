/**
 * Orchestrator Engine — Runtime de gestion des sessions de négociation.
 *
 * Responsabilités :
 * - Créer / suivre les sessions de négociation
 * - Générer l'audit trail avec hash SHA256
 * - Appliquer les timeouts et limites de rounds
 * - Détecter les escalades
 */

import { createHash, randomUUID } from "node:crypto";

import type {
  NegotiationSession,
  NegotiationStatus,
  AuditEntry,
  OrchestratorConfig,
  EscalationReason,
} from "./orchestrator.js";

export const DEFAULT_CONFIG: OrchestratorConfig = {
  round_timeout_ms: 30_000,
  max_rounds: 2,
  enable_audit: true,
};

export function sha256(data: string): string {
  return createHash("sha256").update(data).digest("hex");
}

export function createSession(
  request_id: string,
  corporate_id: string,
  hotel_id: string,
): NegotiationSession {
  return {
    request_id,
    status: "PENDING",
    corporate_id,
    hotel_id,
    started_at: new Date().toISOString(),
    rounds: [],
  };
}

export function updateSessionStatus(
  session: NegotiationSession,
  status: NegotiationStatus,
): NegotiationSession {
  return {
    ...session,
    status,
    completed_at:
      status === "CONFIRMED" || status === "ESCALATED" || status === "REJECTED" || status === "TIMEOUT"
        ? new Date().toISOString()
        : session.completed_at,
  };
}

export function createAuditEntry(
  request_id: string,
  message_type: AuditEntry["message_type"],
  payload: Record<string, unknown>,
  round_duration_ms?: number,
): AuditEntry {
  const payloadStr = JSON.stringify(payload);
  return {
    id: randomUUID(),
    request_id,
    timestamp: new Date().toISOString(),
    message_type,
    hash: sha256(payloadStr),
    payload: payload as unknown as AuditEntry["payload"],
    round_duration_ms,
  };
}

export function shouldEscalate(
  session: NegotiationSession,
  config: OrchestratorConfig,
): EscalationReason | null {
  if (session.rounds.length > config.max_rounds) {
    return "MAX_ROUNDS_EXCEEDED";
  }
  const lastRound = session.rounds[session.rounds.length - 1];
  if (lastRound?.duration_ms && lastRound.duration_ms > config.round_timeout_ms) {
    return "HOTEL_TIMEOUT";
  }
  return null;
}

export function computeSessionDurationMs(session: NegotiationSession): number {
  const start = new Date(session.started_at).getTime();
  const end = session.completed_at
    ? new Date(session.completed_at).getTime()
    : Date.now();
  return end - start;
}

// ─── Shadow Mode ─────────────────────────────────────────────────────────────

export interface NegotiationMode {
  /** "live" = real booking, "shadow" = simulate only */
  mode: "live" | "shadow";
  /** Max hotel offers to present (tier-based: 3, 5, or 10) */
  max_offers: number;
  /** Minutes the user has to choose an offer */
  decision_timeout_min: number;
  /** Auto-confirm best offer (Enterprise only) */
  auto_confirm: boolean;
}

export const TIER_CONFIGS: Record<string, NegotiationMode> = {
  starter: { mode: "live", max_offers: 3, decision_timeout_min: 30, auto_confirm: false },
  business: { mode: "live", max_offers: 5, decision_timeout_min: 60, auto_confirm: false },
  enterprise: { mode: "live", max_offers: 10, decision_timeout_min: 120, auto_confirm: true },
  shadow: { mode: "shadow", max_offers: 3, decision_timeout_min: 30, auto_confirm: false },
};

export interface ShadowResult {
  request_id: string;
  timestamp: string;
  corporate_id: string;
  destination: string;
  check_in: string;
  check_out: string;
  nights: number;
  actual_rate_eur: number | null;
  hnp_best_rate_eur: number;
  hnp_hotel_name: string;
  savings_eur: number | null;
  savings_pct: number | null;
  offers_count: number;
}
