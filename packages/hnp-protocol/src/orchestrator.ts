/**
 * Types pour l'orchestrateur HNP et l'audit trail.
 */

import type { HnpMessage } from "./messages.js";

// ─── Negotiation State ───────────────────────────────────────────────────────

export type NegotiationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "CONFIRMED"
  | "ESCALATED"
  | "TIMEOUT"
  | "REJECTED";

export interface NegotiationRound {
  round_number: number;
  started_at: string;
  completed_at?: string;
  duration_ms?: number;
  message: HnpMessage;
}

export interface NegotiationSession {
  request_id: string;
  status: NegotiationStatus;
  corporate_id: string;
  hotel_id: string;
  started_at: string;
  completed_at?: string;
  rounds: NegotiationRound[];
  escalation_reason?: string;
}

// ─── Audit Trail ─────────────────────────────────────────────────────────────

export interface AuditEntry {
  id: string;
  request_id: string;
  timestamp: string;
  message_type: HnpMessage["type"];
  /** SHA256 de l'état complet */
  hash: string;
  payload: HnpMessage;
  round_duration_ms?: number;
}

// ─── Escalation ──────────────────────────────────────────────────────────────

export type EscalationReason =
  | "OVER_BUDGET"
  | "MAX_ROUNDS_EXCEEDED"
  | "HOTEL_TIMEOUT"
  | "PROTOCOL_ERROR";

export interface EscalationEvent {
  request_id: string;
  timestamp: string;
  reason: EscalationReason;
  details: string;
  /** Données de la négociation au moment de l'escalade */
  session_snapshot: NegotiationSession;
}

// ─── Orchestrator Config ─────────────────────────────────────────────────────

export interface OrchestratorConfig {
  /** Timeout par round en millisecondes (défaut: 30000) */
  round_timeout_ms: number;
  /** Nombre max de rounds avant escalade */
  max_rounds: number;
  /** Activer l'audit trail Supabase */
  enable_audit: boolean;
}
