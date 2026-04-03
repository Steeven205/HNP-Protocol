/**
 * @hnp/protocol — Types partagés du Hotel Negotiation Protocol
 *
 * Point d'entrée unique pour tous les types utilisés par :
 * - hotel-agent (MCP Server)
 * - corporate-agent (Claude API)
 * - dashboard (Next.js)
 * - orchestrateur
 */

// ─── Protocol Messages ──────────────────────────────────────────────────────
export type {
  PolicySnapshot,
  VolumeSignal,
  TravelIntent,
  HotelOffer,
  RequestedModifications,
  CounterProposal,
  NegotiationSummary,
  BookingConfirmation,
  HnpMessage,
  HnpMessageType,
} from "./messages.js";

// ─── Hotel Types ─────────────────────────────────────────────────────────────
export type {
  RoomType,
  EsgTier,
  HotelCategory,
  RoomInventory,
  HotelLocation,
  HotelData,
  CheckAvailabilityParams,
  GetRatesParams,
  MakeOfferParams,
  CounterRespondParams,
  ConfirmBookingParams,
  PolicyType,
  GetPolicyParams,
  AvailabilityResponse,
  RateResponse,
  RateAdjustment,
  OfferResponse,
  CounterResponse,
  CorporateDetails,
  BookingConfirmationResponse,
  PolicyResponse,
  YieldRule,
  YieldRules,
} from "./hotel.js";

// ─── Corporate Types ─────────────────────────────────────────────────────────
export type {
  CancellationRequirement,
  BreakfastPolicy,
  MinimumCategory,
  EsgRequirement,
  TravelPolicy,
  NegotiationRules,
  CorporateProfile,
  TravelRequestTrigger,
} from "./corporate.js";

// ─── Provider Interface ──────────────────────────────────────────────────────
export type {
  BookingDetails,
  BookingResult,
  HotelDataProvider,
} from "./providers.js";

// ─── Orchestrator Types ──────────────────────────────────────────────────────
export type {
  NegotiationStatus,
  NegotiationRound,
  NegotiationSession,
  AuditEntry,
  EscalationReason,
  EscalationEvent,
  OrchestratorConfig,
} from "./orchestrator.js";

// ─── Orchestrator Engine (runtime) ───────────────────────────────────────────
export {
  DEFAULT_CONFIG,
  sha256,
  createSession,
  updateSessionStatus,
  createAuditEntry,
  shouldEscalate,
  computeSessionDurationMs,
  TIER_CONFIGS,
} from "./orchestrator-engine.js";

export type {
  NegotiationMode,
  ShadowResult,
} from "./orchestrator-engine.js";
