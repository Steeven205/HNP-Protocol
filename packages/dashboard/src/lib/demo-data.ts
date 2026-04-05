// ─── Comprehensive Demo Data for Rateflow Platform ─────────────────────────

// ─── Corporate Side ─────────────────────────────────────────────────────────

export const corporateUser = {
  name: "Sophie Martin",
  initials: "SM",
  role: "Sales Manager",
  company: "TechCorp SAS",
  email: "s.martin@techcorp.fr",
};

export const travelManager = {
  name: "Marie Dupont",
  initials: "MD",
  role: "Travel Manager",
  company: "TechCorp SAS",
  email: "m.dupont@techcorp.fr",
};

export const corporateKPIs = {
  totalSpend: { value: "€47,820", trend: "-12.3%", trendUp: false, label: "Total Spend YTD" },
  avgRate: { value: "€142", trend: "-18%", trendUp: false, label: "Avg. Rate/Night" },
  bookingsCount: { value: "127", trend: "+23%", trendUp: true, label: "Bookings YTD" },
  savings: { value: "€6,340", trend: "+34%", trendUp: true, label: "AI Savings YTD" },
  complianceRate: { value: "94%", trend: "+5%", trendUp: true, label: "Policy Compliance" },
  avgNegTime: { value: "8.2s", trend: "-42%", trendUp: false, label: "Avg. Negotiation Time" },
};

export const recentBookings = [
  { id: "BK-2026-089", traveler: "Sophie Martin", destination: "Paris", hotel: "Le Marais Boutique", checkIn: "2026-05-12", checkOut: "2026-05-15", nights: 3, rate: 142, status: "confirmed", savings: 38 },
  { id: "BK-2026-088", traveler: "Thomas Bernard", destination: "Lyon", hotel: "Hôtel Bellecour", checkIn: "2026-05-08", checkOut: "2026-05-10", nights: 2, rate: 118, status: "confirmed", savings: 32 },
  { id: "BK-2026-087", traveler: "Julie Petit", destination: "Paris", hotel: "Bastille Inn", checkIn: "2026-05-06", checkOut: "2026-05-09", nights: 3, rate: 128, status: "in_progress", savings: 0 },
  { id: "BK-2026-086", traveler: "Marc Lefevre", destination: "Berlin", hotel: "Alexanderplatz Hotel", checkIn: "2026-05-01", checkOut: "2026-05-04", nights: 3, rate: 112, status: "confirmed", savings: 28 },
  { id: "BK-2026-085", traveler: "Claire Moreau", destination: "Amsterdam", hotel: "Canal View Suites", checkIn: "2026-04-28", checkOut: "2026-04-30", nights: 2, rate: 135, status: "escalated", savings: 0 },
  { id: "BK-2026-084", traveler: "Sophie Martin", destination: "Paris", hotel: "République Palace", checkIn: "2026-04-22", checkOut: "2026-04-25", nights: 3, rate: 155, status: "confirmed", savings: 25 },
];

export const myBookings = [
  { id: "BK-2026-089", destination: "Paris", hotel: "Le Marais Boutique Hotel", address: "12 rue des Archives, 75003", checkIn: "2026-05-12", checkOut: "2026-05-15", nights: 3, rate: 142, totalCost: 426, status: "upcoming", roomType: "Superior", confirmation: "RF-89X2K", esg: "A", rating: 4.6 },
  { id: "BK-2026-084", destination: "Paris", hotel: "Hôtel République Palace", address: "45 rue de Turbigo, 75003", checkIn: "2026-04-22", checkOut: "2026-04-25", nights: 3, rate: 155, totalCost: 465, status: "completed", roomType: "Standard", confirmation: "RF-84M1P", esg: "B", rating: 4.3 },
  { id: "BK-2026-076", destination: "Lyon", hotel: "Grand Hôtel des Terreaux", address: "8 place des Terreaux, 69001", checkIn: "2026-04-08", checkOut: "2026-04-10", nights: 2, rate: 125, totalCost: 250, status: "completed", roomType: "Standard", confirmation: "RF-76L9T", esg: "B", rating: 4.1 },
  { id: "BK-2026-065", destination: "Berlin", hotel: "Mitte Design Hotel", address: "Friedrichstraße 43, 10117", checkIn: "2026-03-18", checkOut: "2026-03-21", nights: 3, rate: 108, totalCost: 324, status: "completed", roomType: "Superior", confirmation: "RF-65B3D", esg: "A", rating: 4.4 },
  { id: "BK-2026-052", destination: "Amsterdam", hotel: "Canal View Suites", address: "Herengracht 182, 1016 BR", checkIn: "2026-02-24", checkOut: "2026-02-26", nights: 2, rate: 148, totalCost: 296, status: "cancelled", roomType: "Suite", confirmation: "RF-52A7C", esg: "A", rating: 4.7 },
];

export const teamBookings = [
  { id: "BK-2026-091", traveler: "Antoine Dubois", department: "Engineering", destination: "Paris", hotel: "Saint-Honoré Résidence", checkIn: "2026-05-18", checkOut: "2026-05-20", nights: 2, rate: 118, status: "pending_approval", purpose: "Tech conference" },
  { id: "BK-2026-090", traveler: "Camille Laurent", department: "Marketing", destination: "London", hotel: "Shoreditch Boutique", checkIn: "2026-05-15", checkOut: "2026-05-17", nights: 2, rate: 165, status: "pending_approval", purpose: "Client meeting" },
  { id: "BK-2026-089", traveler: "Sophie Martin", department: "Sales", destination: "Paris", hotel: "Le Marais Boutique", checkIn: "2026-05-12", checkOut: "2026-05-15", nights: 3, rate: 142, status: "confirmed", purpose: "Client meeting" },
  { id: "BK-2026-088", traveler: "Thomas Bernard", department: "Sales", destination: "Lyon", hotel: "Hôtel Bellecour", checkIn: "2026-05-08", checkOut: "2026-05-10", nights: 2, rate: 118, status: "confirmed", purpose: "Partner visit" },
  { id: "BK-2026-086", traveler: "Marc Lefevre", department: "Product", destination: "Berlin", hotel: "Alexanderplatz Hotel", checkIn: "2026-05-01", checkOut: "2026-05-04", nights: 3, rate: 112, status: "confirmed", purpose: "Team offsite" },
  { id: "BK-2026-085", traveler: "Claire Moreau", department: "Finance", destination: "Amsterdam", hotel: "Canal View Suites", checkIn: "2026-04-28", checkOut: "2026-04-30", nights: 2, rate: 135, status: "escalated", purpose: "Audit meeting" },
];

export const travelPolicy = {
  maxRates: { paris: 180, lyon: 150, berlin: 130, amsterdam: 160, london: 200, default: 130 },
  minCategory: "3_star",
  esgRequirement: "tier_B_minimum",
  cancellation: "24h_free_required",
  maxNights: 7,
  approvalAbove: 250,
  preferredChains: ["Accor", "IHG", "Marriott"],
  mealPolicy: "Breakfast included when available",
  loyaltyProgram: "Company account accumulation",
};

export const shadowReport = {
  period: "Q1 2026",
  totalBookings: 127,
  totalSpendActual: 68420,
  totalSpendHNP: 52080,
  totalSavings: 16340,
  savingsPct: 23.9,
  avgSavingsPerBooking: 128.66,
  topSavingsCity: "Paris",
  breakdown: [
    { city: "Paris", bookings: 52, actualSpend: 31200, hnpSpend: 23400, savings: 7800, savingsPct: 25.0 },
    { city: "Lyon", bookings: 28, actualSpend: 12600, hnpSpend: 9800, savings: 2800, savingsPct: 22.2 },
    { city: "Berlin", bookings: 18, actualSpend: 8100, hnpSpend: 6480, savings: 1620, savingsPct: 20.0 },
    { city: "Amsterdam", bookings: 15, actualSpend: 9600, hnpSpend: 7200, savings: 2400, savingsPct: 25.0 },
    { city: "London", bookings: 14, actualSpend: 6920, hnpSpend: 5200, savings: 1720, savingsPct: 24.9 },
  ],
  monthlyTrend: [
    { month: "Jan", actual: 22100, hnp: 17200 },
    { month: "Feb", actual: 23800, hnp: 18100 },
    { month: "Mar", actual: 22520, hnp: 16780 },
  ],
};

// ─── Hotel Side ─────────────────────────────────────────────────────────────

export const hotelUser = {
  name: "Marie Dupont",
  initials: "MD",
  role: "Revenue Manager",
  company: "Le Marais Group",
};

export const hotelKPIs = {
  revpar: { value: "€142.50", trend: "+8.3%", trendUp: true, label: "RevPAR Réseau" },
  occupancy: { value: "78.2%", trend: "+4.1%", trendUp: true, label: "Taux d'Occupation" },
  adr: { value: "€182.30", trend: "+3.9%", trendUp: true, label: "ADR Moyen" },
  corporateRevenue: { value: "€156.80", trend: "-2.1%", trendUp: false, label: "Revenue Corporate" },
};

export const hotelProperties = [
  { id: "LMBH-PARIS-001", name: "Le Marais Boutique Hotel", city: "Paris", category: "4_star", rooms: 70, occupancy: 82, adr: 172, revpar: 141, esg: "A", status: "active" },
  { id: "BRUS-BXL-002", name: "Brussels Central Hotel", city: "Brussels", category: "4_star", rooms: 120, occupancy: 74, adr: 165, revpar: 122, esg: "B", status: "active" },
  { id: "LYON-001", name: "Lyon Confluence Hotel", city: "Lyon", category: "3_star", rooms: 85, occupancy: 79, adr: 138, revpar: 109, esg: "B", status: "active" },
  { id: "AMST-001", name: "Amsterdam Centrum", city: "Amsterdam", category: "4_star", rooms: 95, occupancy: 88, adr: 195, revpar: 172, esg: "A", status: "active" },
  { id: "MADR-001", name: "Madrid Sol Boutique", city: "Madrid", category: "3_star", rooms: 60, occupancy: 71, adr: 128, revpar: 91, esg: "B", status: "onboarding" },
];

export const hotelNegotiations = [
  { id: "REQ-8924", corporate: "TechCorp SAS", traveler: "Sophie Martin", hotel: "Le Marais Boutique", destination: "Paris", checkIn: "2026-05-12", checkOut: "2026-05-15", nights: 3, rooms: 1, roomType: "Superior", initialRate: 185, currentRate: 158, budgetMax: 180, status: "in_progress", round: 2, maxRounds: 2, startedAt: "2026-04-05T14:20:00Z", expiresIn: "18:42" },
  { id: "REQ-8923", corporate: "ConsultGroup FR", traveler: "Pierre Moreau", hotel: "Le Marais Boutique", destination: "Paris", checkIn: "2026-05-10", checkOut: "2026-05-12", nights: 2, rooms: 1, roomType: "Standard", initialRate: 145, currentRate: 132, budgetMax: 150, status: "confirmed", round: 1, maxRounds: 2, startedAt: "2026-04-05T13:10:00Z", finalRate: 132 },
  { id: "REQ-8921", corporate: "TechCorp SAS", traveler: "Marc Lefevre", hotel: "Brussels Central", destination: "Brussels", checkIn: "2026-05-01", checkOut: "2026-05-04", nights: 3, rooms: 1, roomType: "Standard", initialRate: 165, currentRate: 142, budgetMax: 150, status: "confirmed", round: 2, maxRounds: 2, startedAt: "2026-04-04T09:30:00Z", finalRate: 142 },
  { id: "REQ-8919", corporate: "StartupIO", traveler: "Laura Chen", hotel: "Lyon Confluence", destination: "Lyon", checkIn: "2026-05-06", checkOut: "2026-05-08", nights: 2, rooms: 2, roomType: "Standard", initialRate: 138, currentRate: 138, budgetMax: 120, status: "escalated", round: 2, maxRounds: 2, startedAt: "2026-04-03T16:45:00Z" },
  { id: "REQ-8917", corporate: "MediaCorp EU", traveler: "Hans Mueller", hotel: "Amsterdam Centrum", destination: "Amsterdam", checkIn: "2026-05-15", checkOut: "2026-05-18", nights: 3, rooms: 1, roomType: "Superior", initialRate: 195, currentRate: 168, budgetMax: 180, status: "confirmed", round: 1, maxRounds: 2, startedAt: "2026-04-02T11:00:00Z", finalRate: 168 },
  { id: "REQ-8915", corporate: "FinanceHouse", traveler: "Anna Weber", hotel: "Le Marais Boutique", destination: "Paris", checkIn: "2026-04-28", checkOut: "2026-04-30", nights: 2, rooms: 1, roomType: "Suite", initialRate: 320, currentRate: 280, budgetMax: 300, status: "timeout", round: 2, maxRounds: 2, startedAt: "2026-04-01T08:15:00Z" },
];

export const negotiationDetail = {
  id: "REQ-8924",
  corporate: "TechCorp SAS",
  corporateId: "TC-2026-001",
  traveler: "Sophie Martin",
  hotel: "Le Marais Boutique Hotel",
  hotelId: "LMBH-PARIS-001",
  destination: "Paris",
  checkIn: "2026-05-12",
  checkOut: "2026-05-15",
  nights: 3,
  rooms: 3,
  roomType: "Superior",
  initialRate: 185,
  budgetMax: 180,
  status: "in_progress" as const,
  round: 2,
  maxRounds: 2,
  messages: [
    { id: 1, agent: "corporate", type: "TRAVEL_INTENT", timestamp: "2026-04-05T14:20:12Z", content: "Booking request for Sophie Martin — Paris, 12-15 May 2026. 3 nights, Superior room. Budget: €180/night. Corporate Gold tier, 127 nights YTD.", data: { budget: 180, nights: 3 } },
    { id: 2, agent: "system", type: "SYSTEM", timestamp: "2026-04-05T14:20:14Z", content: "Querying Le Marais Boutique Hotel inventory..." },
    { id: 3, agent: "hotel", type: "HOTEL_OFFER", timestamp: "2026-04-05T14:20:18Z", content: "Le Marais Boutique Hotel offers Superior room at €185/night (base €195). Includes: WiFi, breakfast, late checkout. Cancellation: 24h free. ESG: Tier A. Rating: 4.6★", data: { rate: 185, baseRate: 195, inclusions: ["WiFi", "Breakfast", "Late checkout"] } },
    { id: 4, agent: "corporate", type: "COUNTER_PROPOSAL", timestamp: "2026-04-05T14:20:25Z", content: "Rate of €185 exceeds our budget of €180/night. Requesting adjustment given Gold tier status (127 nights YTD) and 3-night stay. Counter-proposal: €168/night with same inclusions.", data: { counterRate: 168, round: 1 } },
    { id: 5, agent: "hotel", type: "HOTEL_OFFER", timestamp: "2026-04-05T14:20:32Z", content: "Revised offer: €158/night for Superior room. Maintaining all inclusions (WiFi, breakfast, late checkout). Volume discount applied for Gold tier corporate. Valid for 30 minutes.", data: { rate: 158, baseRate: 195, inclusions: ["WiFi", "Breakfast", "Late checkout"] } },
    { id: 6, agent: "system", type: "SYSTEM", timestamp: "2026-04-05T14:20:33Z", content: "Offer within budget (€158 < €180). Awaiting corporate confirmation..." },
  ],
  rateHistory: [
    { round: 0, rate: 195, label: "Rack Rate" },
    { round: 1, rate: 185, label: "Initial Offer" },
    { round: 2, rate: 158, label: "Counter Offer" },
  ],
};

export const auditEntries = [
  { id: "AUD-2026-1247", negotiationId: "REQ-8924", timestamp: "2026-04-05T14:20:33Z", type: "HOTEL_OFFER", hash: "a3f8c2d1...e7b4", actor: "Hotel Agent AI", property: "Le Marais Boutique", corporate: "TechCorp SAS", status: "verified" },
  { id: "AUD-2026-1246", negotiationId: "REQ-8924", timestamp: "2026-04-05T14:20:25Z", type: "COUNTER_PROPOSAL", hash: "7e9b1f3a...c8d2", actor: "Corporate Agent AI", property: "Le Marais Boutique", corporate: "TechCorp SAS", status: "verified" },
  { id: "AUD-2026-1245", negotiationId: "REQ-8924", timestamp: "2026-04-05T14:20:18Z", type: "HOTEL_OFFER", hash: "d4c6a8e2...f1b5", actor: "Hotel Agent AI", property: "Le Marais Boutique", corporate: "TechCorp SAS", status: "verified" },
  { id: "AUD-2026-1244", negotiationId: "REQ-8924", timestamp: "2026-04-05T14:20:12Z", type: "TRAVEL_INTENT", hash: "b2e5d9f7...a3c8", actor: "Corporate Agent AI", property: "Le Marais Boutique", corporate: "TechCorp SAS", status: "verified" },
  { id: "AUD-2026-1243", negotiationId: "REQ-8923", timestamp: "2026-04-05T13:15:02Z", type: "CONFIRMATION", hash: "f1a7c3e8...b9d4", actor: "System", property: "Le Marais Boutique", corporate: "ConsultGroup FR", status: "verified" },
  { id: "AUD-2026-1242", negotiationId: "REQ-8923", timestamp: "2026-04-05T13:14:45Z", type: "HOTEL_OFFER", hash: "c8d2b5a1...e6f3", actor: "Hotel Agent AI", property: "Le Marais Boutique", corporate: "ConsultGroup FR", status: "verified" },
  { id: "AUD-2026-1241", negotiationId: "REQ-8921", timestamp: "2026-04-04T09:42:18Z", type: "CONFIRMATION", hash: "e3f9a7b2...d1c6", actor: "System", property: "Brussels Central", corporate: "TechCorp SAS", status: "verified" },
  { id: "AUD-2026-1240", negotiationId: "REQ-8919", timestamp: "2026-04-03T16:58:30Z", type: "ESCALATION", hash: "a1b4c7d8...e2f5", actor: "System", property: "Lyon Confluence", corporate: "StartupIO", status: "verified" },
];

export const yieldConfig = {
  properties: hotelProperties,
  currentProperty: "LMBH-PARIS-001",
  floorRate: { standard: 120, superior: 155, suite: 260 },
  seasonRules: [
    { name: "Peak Season", months: [6, 7, 8, 12], adjustment: "+20%" },
    { name: "Low Season", months: [1, 2, 11], adjustment: "-10%" },
    { name: "Regular", months: [3, 4, 5, 9, 10], adjustment: "0%" },
  ],
  volumeDiscounts: [
    { threshold: 10, discount: 5 },
    { threshold: 25, discount: 8 },
    { threshold: 50, discount: 12 },
    { threshold: 100, discount: 15 },
  ],
  autoInclusions: {
    wifi: true,
    breakfast: true,
    parking: false,
    lateCheckout: true,
    airportShuttle: false,
  },
  occupancyRules: [
    { above: 90, adjustment: "+15%" },
    { above: 80, adjustment: "+8%" },
    { above: 60, adjustment: "0%" },
    { below: 40, adjustment: "-12%" },
  ],
  nlRules: [
    "Fill Monday and Tuesday rooms as priority",
    "Loyalty bonus for accounts with 50+ nights/year",
    "No non-refundable rates for new corporate accounts",
  ],
};

export const billingData = {
  plan: "Professional",
  monthlyFee: 299,
  nextBilling: "2026-05-01",
  usageThisMonth: {
    negotiations: 47,
    confirmedBookings: 38,
    totalRevenue: 28420,
    platformFee: 852.60,
    feePct: 3,
  },
  invoices: [
    { id: "INV-2026-04", date: "2026-04-01", amount: 748.20, status: "paid" },
    { id: "INV-2026-03", date: "2026-03-01", amount: 892.40, status: "paid" },
    { id: "INV-2026-02", date: "2026-02-01", amount: 621.80, status: "paid" },
    { id: "INV-2026-01", date: "2026-01-01", amount: 534.60, status: "paid" },
  ],
};

export const integrations = [
  { id: "siteminder", name: "SiteMinder", icon: "fa-plug", status: "connected", lastSync: "2 min ago", description: "Channel manager — real-time rates & availability" },
  { id: "mews", name: "Mews PMS", icon: "fa-server", status: "connected", lastSync: "5 min ago", description: "Property management system — bookings & inventory" },
  { id: "dedge", name: "D-EDGE", icon: "fa-link", status: "available", lastSync: null, description: "Distribution platform — 17,000+ hotels" },
  { id: "opera", name: "Oracle Opera", icon: "fa-database", status: "available", lastSync: null, description: "Enterprise PMS — large hotel chains" },
  { id: "cloudbeds", name: "Cloudbeds", icon: "fa-cloud", status: "available", lastSync: null, description: "All-in-one hospitality platform" },
  { id: "stripe", name: "Stripe", icon: "fa-credit-card", status: "connected", lastSync: "1 hour ago", description: "Payment processing & invoicing" },
];

export const hotelTeamMembers = [
  { name: "Marie Dupont", role: "Revenue Manager", email: "m.dupont@lemaraisgroup.com", status: "active", lastActive: "2 min ago", permissions: "admin" },
  { name: "Jean-Pierre Blanc", role: "General Manager", email: "jp.blanc@lemaraisgroup.com", status: "active", lastActive: "1 hour ago", permissions: "admin" },
  { name: "Isabelle Roux", role: "Front Desk Manager", email: "i.roux@lemaraisgroup.com", status: "active", lastActive: "30 min ago", permissions: "viewer" },
  { name: "Lucas Martin", role: "Revenue Analyst", email: "l.martin@lemaraisgroup.com", status: "active", lastActive: "3 hours ago", permissions: "editor" },
  { name: "Sarah Dubois", role: "Night Manager", email: "s.dubois@lemaraisgroup.com", status: "inactive", lastActive: "2 days ago", permissions: "viewer" },
];

export const hotelShadowReport = {
  period: "Q1 2026",
  totalNegotiations: 189,
  wonVsOTA: 142,
  winRate: 75.1,
  avgRateVsOTA: { ota: 172, rateflow: 158, savings: 14 },
  otaCommissionSaved: 4820,
  revenueRetained: 3210,
  monthlyData: [
    { month: "Jan", otaRate: 168, rateflowRate: 155, bookings: 58 },
    { month: "Feb", otaRate: 175, rateflowRate: 160, bookings: 63 },
    { month: "Mar", otaRate: 172, rateflowRate: 158, bookings: 68 },
  ],
};

// ─── Spending chart data ────────────────────────────────────────────────────

export const spendingByMonth = [
  { month: "Jan", spend: 8200, budget: 9500 },
  { month: "Feb", spend: 7800, budget: 9500 },
  { month: "Mar", spend: 9100, budget: 9500 },
  { month: "Apr", spend: 8400, budget: 9500 },
  { month: "May", spend: 6320, budget: 9500 },
];

export const spendingByCity = [
  { city: "Paris", spend: 18200, pct: 38 },
  { city: "Lyon", spend: 8400, pct: 18 },
  { city: "Berlin", spend: 6800, pct: 14 },
  { city: "Amsterdam", spend: 7200, pct: 15 },
  { city: "London", spend: 7220, pct: 15 },
];
