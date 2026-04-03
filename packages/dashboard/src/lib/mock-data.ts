/**
 * Mock data for the Rateflow Dashboard.
 * Sources: data/mock/hotel.json + data/mock/corporate.json
 */

// ─── Hotel data (from hotel.json) ────────────────────────────────────────────

export const hotel = {
  hotel_id: "LMBH-PARIS-001",
  name: "Le Marais Boutique Hotel",
  category: "4_star" as const,
  esg_tier: "A",
  location: {
    city: "Paris",
    arrondissement: "3ème",
    address: "12 rue des Archives, 75003 Paris",
  },
  rooms: {
    standard: { count: 45, base_rate_eur: 145 },
    superior: { count: 20, base_rate_eur: 185 },
    suite: { count: 5, base_rate_eur: 320 },
  },
};

// ─── Corporate data (from corporate.json) ────────────────────────────────────

export const corporate = {
  company: "TechCorp SAS",
  corporate_id: "TC-2026-001",
  travel_manager: { name: "Marie Dupont", email: "m.dupont@techcorp.fr" },
  travel_policy: {
    max_rate_per_night_eur: { paris: 180, lyon: 150, default: 130 } as Record<string, number>,
    minimum_category: "3_star",
    esg_requirement: "tier_B_minimum",
    cancellation_required: "24h_free",
    approval_required_above_eur: 250,
  },
  negotiation_rules: { max_counter_rounds: 2 },
  travel_history: { ytd_nights: 127, ytd_spend_eur: 18450 },
};

// ─── Negotiations ────────────────────────────────────────────────────────────

export type NegotiationStatus = "confirmed" | "in_progress" | "escalated" | "timeout";

export interface Negotiation {
  id: string;
  traveler: string;
  destination: string;
  hotel: string;
  check_in: string;
  check_out: string;
  nights: number;
  status: NegotiationStatus;
  rounds: number;
  final_rate: number | null;
  initial_rate: number;
  budget: number;
  savings_pct: number | null;
  created_at: string;
  duration_s: number;
}

export const negotiations: Negotiation[] = [
  {
    id: "NEG-8924",
    traveler: "Paul Martin",
    destination: "Paris",
    hotel: "Le Marais Boutique Hotel",
    check_in: "2026-05-12",
    check_out: "2026-05-15",
    nights: 3,
    status: "in_progress",
    rounds: 1,
    final_rate: null,
    initial_rate: 145,
    budget: 180,
    savings_pct: null,
    created_at: "2026-04-03T09:00:00Z",
    duration_s: 0,
  },
  {
    id: "NEG-8923",
    traveler: "Sophie Chen",
    destination: "Paris",
    hotel: "Le Marais Boutique Hotel",
    check_in: "2026-05-08",
    check_out: "2026-05-10",
    nights: 2,
    status: "confirmed",
    rounds: 2,
    final_rate: 132,
    initial_rate: 145,
    budget: 180,
    savings_pct: 26.7,
    created_at: "2026-04-02T14:30:00Z",
    duration_s: 18.4,
  },
  {
    id: "NEG-8922",
    traveler: "Paul Martin",
    destination: "Lyon",
    hotel: "Hôtel des Confluences",
    check_in: "2026-04-20",
    check_out: "2026-04-22",
    nights: 2,
    status: "escalated",
    rounds: 2,
    final_rate: 168,
    initial_rate: 155,
    budget: 150,
    savings_pct: null,
    created_at: "2026-04-01T10:00:00Z",
    duration_s: 24.1,
  },
  {
    id: "NEG-8921",
    traveler: "Sophie Chen",
    destination: "Paris",
    hotel: "Le Marais Boutique Hotel",
    check_in: "2026-04-15",
    check_out: "2026-04-18",
    nights: 3,
    status: "confirmed",
    rounds: 1,
    final_rate: 116,
    initial_rate: 145,
    budget: 180,
    savings_pct: 35.6,
    created_at: "2026-03-28T16:45:00Z",
    duration_s: 12.8,
  },
  {
    id: "NEG-8920",
    traveler: "Paul Martin",
    destination: "Paris",
    hotel: "Le Marais Boutique Hotel",
    check_in: "2026-04-10",
    check_out: "2026-04-12",
    nights: 2,
    status: "timeout",
    rounds: 2,
    final_rate: null,
    initial_rate: 145,
    budget: 180,
    savings_pct: null,
    created_at: "2026-03-25T08:20:00Z",
    duration_s: 30.0,
  },
];

// ─── Negotiation Detail (chat messages) ──────────────────────────────────────

export interface ChatMessage {
  id: string;
  agent: "corporate" | "hotel";
  type: "TRAVEL_INTENT" | "HOTEL_OFFER" | "COUNTER_PROPOSAL" | "CONFIRMATION";
  timestamp: string;
  content: string;
  data?: Record<string, unknown>;
}

export const negotiationDetail = {
  id: "NEG-8923",
  traveler: "Sophie Chen",
  destination: "Paris",
  hotel: "Le Marais Boutique Hotel",
  hotel_id: "LMBH-PARIS-001",
  check_in: "2026-05-08",
  check_out: "2026-05-10",
  nights: 2,
  status: "confirmed" as NegotiationStatus,
  budget: 180,
  initial_rate: 145,
  final_rate: 132,
  savings_pct: 26.7,
  duration_s: 18.4,
  esg_tier: "A",
  offer_validity_minutes: 15,
  messages: [
    {
      id: "msg-1",
      agent: "corporate" as const,
      type: "TRAVEL_INTENT" as const,
      timestamp: "2026-04-02T14:30:00Z",
      content:
        "Demande de réservation pour Sophie Chen (CTO) à Paris, Le Marais Boutique Hotel. 2 nuits du 8 au 10 mai 2026. Budget max: 180€/nuit. Corporate ID: TC-2026-001.",
      data: {
        corporate_id: "TC-2026-001",
        destination: "Paris",
        check_in: "2026-05-08",
        check_out: "2026-05-10",
        budget: 180,
        volume_signal: { nights_ytd: 127, loyalty_tier: "gold" },
      },
    },
    {
      id: "msg-2",
      agent: "hotel" as const,
      type: "HOTEL_OFFER" as const,
      timestamp: "2026-04-02T14:30:06Z",
      content:
        "Offre initiale: 145€/nuit chambre standard. Inclusions: WiFi, late checkout 12h. Annulation: gratuite 24h avant arrivée. ESG: Tier A. Validité: 15 minutes.",
      data: {
        rate_eur: 145,
        room_type: "standard",
        inclusions: ["wifi", "late_checkout_12h"],
        cancellation: "24h_free",
        esg_tier: "A",
      },
    },
    {
      id: "msg-3",
      agent: "corporate" as const,
      type: "COUNTER_PROPOSAL" as const,
      timestamp: "2026-04-02T14:30:12Z",
      content:
        "Tarif 145€ acceptable (sous budget 180€). Contre-proposition: demande réduction volume (127 nuits YTD, compte gold), petit-déjeuner inclus. Cible: 130€/nuit.",
      data: {
        accept_rate: false,
        requested_rate: 130,
        justification: "Volume 127 nuits YTD, compte gold, fidélité hôtel préféré",
        round_number: 1,
      },
    },
    {
      id: "msg-4",
      agent: "hotel" as const,
      type: "HOTEL_OFFER" as const,
      timestamp: "2026-04-02T14:30:16Z",
      content:
        "Offre révisée: 132€/nuit (-9% vs offre initiale). Petit-déjeuner J1 inclus. WiFi + late checkout maintenus. Annulation 24h. Validité: 15 minutes.",
      data: {
        rate_eur: 132,
        room_type: "standard",
        inclusions: ["wifi", "late_checkout_12h", "breakfast_day1"],
        cancellation: "24h_free",
        esg_tier: "A",
      },
    },
    {
      id: "msg-5",
      agent: "corporate" as const,
      type: "CONFIRMATION" as const,
      timestamp: "2026-04-02T14:30:18Z",
      content:
        "Offre acceptée. 132€/nuit × 2 nuits = 264€ total. Économie: 26.7% vs budget. Politique respectée: annulation 24h ✓, ESG A ✓, sous budget ✓. Réf: BK-LMBH-SC0508.",
      data: {
        final_rate: 132,
        total: 264,
        booking_ref: "BK-LMBH-SC0508",
        savings_pct: 26.7,
        policy_checks: {
          rate: true,
          cancellation: true,
          esg: true,
        },
      },
    },
  ] as ChatMessage[],
};

// ─── Audit Trail ─────────────────────────────────────────────────────────────

export interface AuditEntry {
  id: string;
  ref: string;
  date: string;
  account: string;
  hotel: string;
  location: string;
  final_rate: number;
  currency: string;
  savings: number;
  audit_hash: string;
  negotiation_id: string;
}

export const auditEntries: AuditEntry[] = [
  {
    id: "aud-1",
    ref: "BKG-8923-SC",
    date: "2026-04-02",
    account: "TechCorp SAS",
    hotel: "Le Marais Boutique Hotel",
    location: "Paris",
    final_rate: 132,
    currency: "EUR",
    savings: 48,
    audit_hash: "8f2a4b6c9d1e3f5a7b8c0d2e4f6a8b0c3d5e7f9a1b3c5d7e9f0a2b4c6d8e0f3b9c",
    negotiation_id: "NEG-8923",
  },
  {
    id: "aud-2",
    ref: "BKG-8921-SC",
    date: "2026-03-28",
    account: "TechCorp SAS",
    hotel: "Le Marais Boutique Hotel",
    location: "Paris",
    final_rate: 116,
    currency: "EUR",
    savings: 64,
    audit_hash: "3a7f2c8d1b4e6f9a0c3d5e7b8f1a2c4d6e8f0a1b3c5d7e9f2a4b6c8d0e3f5a7b9c",
    negotiation_id: "NEG-8921",
  },
  {
    id: "aud-3",
    ref: "BKG-8919-PM",
    date: "2026-03-20",
    account: "TechCorp SAS",
    hotel: "Le Marais Boutique Hotel",
    location: "Paris",
    final_rate: 140,
    currency: "EUR",
    savings: 40,
    audit_hash: "5b9c1d3e7f2a4b6c8d0e3f5a7b9c1d3e5f7a2b4c6d8e0f1a3b5c7d9e2f4a6b8c0d",
    negotiation_id: "NEG-8919",
  },
  {
    id: "aud-4",
    ref: "BKG-8917-SC",
    date: "2026-03-15",
    account: "TechCorp SAS",
    hotel: "Le Marais Boutique Hotel",
    location: "Paris",
    final_rate: 128,
    currency: "EUR",
    savings: 52,
    audit_hash: "7d0e2f4a6b8c1d3e5f7a9b2c4d6e8f0a1b3c5d7e9f1a3b5c7d9e2f4a6b8c0d3e5f",
    negotiation_id: "NEG-8917",
  },
];

export const auditMetrics = {
  totalTransactions: 47,
  totalSavingsEur: 2_840,
  avgNegotiationTime: 18.4,
  policyCompliance: 97.8,
};

// ─── Offer Comparison (multi-hotel) ──────────────────────────────────────────

export interface HotelOffer {
  id: string;
  hotel_name: string;
  hotel_id: string;
  category: string;
  address: string;
  district: string;
  rate_eur: number;
  base_rate_eur: number;
  savings_vs_budget_pct: number;
  room_type: string;
  inclusions: string[];
  cancellation: string;
  esg_tier: string;
  rating_google: number;
  rating_booking: number;
  reviews_count: number;
  photo_url: string;
  website_url: string;
  maps_url: string;
  distance_office_km: number;
  transit_min: number;
  badge: "best_price" | "recommended" | "best_rated" | null;
  negotiation_rounds: number;
  negotiation_duration_s: number;
  policy_compliant: boolean;
  policy_checks: { label: string; passed: boolean }[];
}

export const offerComparison = {
  negotiation_id: "NEG-8923",
  traveler: "Sophie Chen",
  destination: "Paris",
  check_in: "2026-05-08",
  check_out: "2026-05-10",
  nights: 2,
  budget: 180,
  decision_timeout_min: 30,
  created_at: "2026-04-02T14:30:00Z",
  offers: [
    {
      id: "offer-1",
      hotel_name: "Hôtel Bastille Inn",
      hotel_id: "BAST-PARIS-002",
      category: "3_star",
      address: "28 rue de la Roquette, 75011 Paris",
      district: "Bastille / 11ème",
      rate_eur: 118,
      base_rate_eur: 138,
      savings_vs_budget_pct: 34.4,
      room_type: "standard",
      inclusions: ["wifi"],
      cancellation: "24h_free",
      esg_tier: "B",
      rating_google: 4.2,
      rating_booking: 8.1,
      reviews_count: 341,
      photo_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
      website_url: "https://example.com/bastille-inn",
      maps_url: "https://maps.google.com/?q=28+rue+de+la+Roquette+Paris",
      distance_office_km: 3.2,
      transit_min: 18,
      badge: "best_price" as const,
      negotiation_rounds: 2,
      negotiation_duration_s: 22.1,
      policy_compliant: true,
      policy_checks: [
        { label: "Rate ≤ budget (€180)", passed: true },
        { label: "Cancellation 24h", passed: true },
        { label: "ESG Tier B+", passed: true },
        { label: "Min 3 stars", passed: true },
      ],
    },
    {
      id: "offer-2",
      hotel_name: "Le Marais Boutique Hotel",
      hotel_id: "LMBH-PARIS-001",
      category: "4_star",
      address: "12 rue des Archives, 75003 Paris",
      district: "Le Marais / 3ème",
      rate_eur: 132,
      base_rate_eur: 145,
      savings_vs_budget_pct: 26.7,
      room_type: "standard",
      inclusions: ["wifi", "late_checkout_12h", "breakfast_day1"],
      cancellation: "24h_free",
      esg_tier: "A",
      rating_google: 4.5,
      rating_booking: 8.6,
      reviews_count: 892,
      photo_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop",
      website_url: "https://example.com/marais-boutique",
      maps_url: "https://maps.google.com/?q=12+rue+des+Archives+Paris",
      distance_office_km: 1.8,
      transit_min: 12,
      badge: "recommended" as const,
      negotiation_rounds: 2,
      negotiation_duration_s: 18.4,
      policy_compliant: true,
      policy_checks: [
        { label: "Rate ≤ budget (€180)", passed: true },
        { label: "Cancellation 24h", passed: true },
        { label: "ESG Tier B+", passed: true },
        { label: "Min 3 stars", passed: true },
      ],
    },
    {
      id: "offer-3",
      hotel_name: "Hôtel République Palace",
      hotel_id: "REPB-PARIS-003",
      category: "4_star",
      address: "5 place de la République, 75003 Paris",
      district: "République / 3ème",
      rate_eur: 145,
      base_rate_eur: 165,
      savings_vs_budget_pct: 19.4,
      room_type: "superior",
      inclusions: ["wifi", "breakfast", "gym", "minibar"],
      cancellation: "48h_free",
      esg_tier: "A",
      rating_google: 4.7,
      rating_booking: 8.9,
      reviews_count: 1247,
      photo_url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop",
      website_url: "https://example.com/republique-palace",
      maps_url: "https://maps.google.com/?q=5+place+de+la+Republique+Paris",
      distance_office_km: 1.5,
      transit_min: 8,
      badge: "best_rated" as const,
      negotiation_rounds: 1,
      negotiation_duration_s: 14.2,
      policy_compliant: true,
      policy_checks: [
        { label: "Rate ≤ budget (€180)", passed: true },
        { label: "Cancellation 24h", passed: true },
        { label: "ESG Tier B+", passed: true },
        { label: "Min 3 stars", passed: true },
      ],
    },
  ] as HotelOffer[],
};

// ─── Rate cap cities for Configuration ───────────────────────────────────────

export const rateCaps = [
  { city: "Paris", max_eur: 180 },
  { city: "Lyon", max_eur: 150 },
  { city: "Bordeaux", max_eur: 140 },
  { city: "Lille", max_eur: 130 },
  { city: "Default", max_eur: 130 },
];

// ─── Team members ────────────────────────────────────────────────────────────

export const teamMembers = [
  { name: "Marie Dupont", email: "m.dupont@techcorp.fr", role: "Admin", status: "active" as const },
  { name: "Paul Martin", email: "p.martin@techcorp.fr", role: "Traveler", status: "active" as const },
  { name: "Sophie Chen", email: "s.chen@techcorp.fr", role: "Traveler", status: "active" as const },
  { name: "Julien Moreau", email: "j.moreau@techcorp.fr", role: "Manager", status: "pending" as const },
];
