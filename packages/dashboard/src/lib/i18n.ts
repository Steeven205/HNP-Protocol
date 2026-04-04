/**
 * Bilingual content dictionary for Rateflow landing page.
 */

export type Lang = "en" | "fr";

export const t = {
  // ── Header
  nav_welcome: { en: "Welcome", fr: "Accueil" },
  nav_signin: { en: "Sign In", fr: "Connexion" },
  nav_demo: { en: "View Demo", fr: "Voir la démo" },
  nav_signin_btn: { en: "Sign In to Dashboard", fr: "Accéder au Dashboard" },

  // ── Hero
  hero_badge: { en: "Next-Gen AI Hotel Negotiation", fr: "Négociation Hôtelière IA Nouvelle Génération" },
  hero_title_1: { en: "The Annual Hotel RFP", fr: "L'appel d'offres hôtelier annuel" },
  hero_title_2: { en: "Is Structurally Obsolete", fr: "est structurellement obsolète" },
  hero_subtitle: {
    en: "Rateflow replaces months of manual negotiation with autonomous AI agents that secure optimal hotel rates in seconds — transaction by transaction, in real time, with full policy compliance on both sides.",
    fr: "Rateflow remplace des mois de négociation manuelle par des agents IA autonomes qui obtiennent les meilleurs tarifs hôteliers en quelques secondes — transaction par transaction, en temps réel, en conformité totale avec les politiques des deux côtés.",
  },
  hero_cta_1: { en: "Sign In to Dashboard", fr: "Accéder au Dashboard" },
  hero_cta_2: { en: "Watch a Live Negotiation", fr: "Voir une négociation en direct" },

  // ── Problem
  problem_title: { en: "Why the Hotel RFP Is Broken", fr: "Pourquoi l'appel d'offres hôtelier ne fonctionne plus" },
  problem_subtitle: {
    en: "The annual negotiation cycle between travel managers and hotel groups was designed for a world that no longer exists.",
    fr: "Le cycle de négociation annuel entre travel managers et groupes hôteliers a été conçu pour un monde qui n'existe plus.",
  },
  problem_1_title: { en: "Negotiated Once, Outdated Immediately", fr: "Négocié une fois, obsolète immédiatement" },
  problem_1_text: {
    en: "Rates are locked for 12 months while the market fluctuates daily. By month two, your contracted rate is already sub-optimal.",
    fr: "Les tarifs sont figés 12 mois alors que le marché fluctue quotidiennement. Dès le 2ème mois, votre tarif contractuel est déjà sous-optimal.",
  },
  problem_2_title: { en: "Months of Excel & Email Cycles", fr: "Des mois d'Excel et d'emails" },
  problem_2_text: {
    en: "Travel managers and revenue managers exchange spreadsheets for weeks. A single corporate RFP can take 3-6 months to close.",
    fr: "Travel managers et revenue managers échangent des tableurs pendant des semaines. Un seul appel d'offres peut prendre 3 à 6 mois.",
  },
  problem_3_title: { en: "Human Bottleneck on Both Sides", fr: "Goulot d'étranglement humain des deux côtés" },
  problem_3_text: {
    en: "Hotels can't personalize rates for every corporate account. Corporates can't renegotiate mid-year when conditions change.",
    fr: "Les hôtels ne peuvent pas personnaliser les tarifs pour chaque compte corporate. Les entreprises ne peuvent pas renégocier en cours d'année.",
  },
  problem_4_title: { en: "Value Left on the Table", fr: "De la valeur laissée sur la table" },
  problem_4_text: {
    en: "Neither side gets the optimal deal. Hotels miss revenue on low-occupancy nights. Corporates overpay during off-peak periods.",
    fr: "Aucune des deux parties n'obtient le deal optimal. Les hôtels perdent du revenu sur les nuits à faible occupation. Les entreprises surpayent hors saison.",
  },

  // ── Visa Analogy
  analogy_badge: { en: "The Analogy", fr: "L'analogie" },
  analogy_title: { en: "Think of It Like Visa for Hotels", fr: "Pensez-y comme le Visa de l'hôtellerie" },
  analogy_text: {
    en: "Visa is neither the buyer's bank nor the seller's bank. Visa created the protocol that both banks use to transact. Rateflow does the same thing — it's the standard that corporate AI agents and hotel AI agents use to negotiate.",
    fr: "Visa n'est ni la banque de l'acheteur ni celle du vendeur. Visa a créé le protocole que les deux banques utilisent. Rateflow fait la même chose — c'est le standard que les agents IA corporate et hôteliers utilisent pour négocier.",
  },
  analogy_corporate: { en: "Corporate Agent", fr: "Agent Corporate" },
  analogy_corporate_sub: { en: "Your travel policy, encoded as AI", fr: "Votre politique voyage, encodée en IA" },
  analogy_protocol_sub: { en: "The standard both agents speak", fr: "Le standard que les deux agents parlent" },
  analogy_hotel: { en: "Hotel Agent", fr: "Agent Hôtelier" },
  analogy_hotel_sub: { en: "Yield rules, encoded as AI", fr: "Règles de yield, encodées en IA" },

  // ── Benefits
  benefits_title: { en: "Both Sides Win", fr: "Les deux côtés gagnent" },
  benefits_subtitle: {
    en: "Rateflow creates value for corporates and hotels simultaneously.",
    fr: "Rateflow crée de la valeur pour les entreprises et les hôtels simultanément.",
  },
  benefits_corporate: { en: "For Corporates", fr: "Pour les entreprises" },
  benefits_hotel: { en: "For Hotels", fr: "Pour les hôtels" },
  b_corp_1: { en: "15–35% Average Savings", fr: "15–35% d'économies moyennes" },
  b_corp_1t: { en: "Dynamic rates beat static annual contracts on every transaction.", fr: "Les tarifs dynamiques battent les contrats annuels statiques sur chaque transaction." },
  b_corp_2: { en: "Seconds, Not Months", fr: "Des secondes, pas des mois" },
  b_corp_2t: { en: "Replace 3-month RFP cycles with instant negotiation per booking.", fr: "Remplacez 3 mois d'appel d'offres par une négociation instantanée par réservation." },
  b_corp_3: { en: "100% Policy Compliance", fr: "100% conforme à la politique" },
  b_corp_3t: { en: "Your travel policy is enforced programmatically — ESG, budget caps, cancellation rules.", fr: "Votre politique voyage est appliquée automatiquement — ESG, plafonds budgétaires, règles d'annulation." },
  b_corp_4: { en: "Complete Spend Visibility", fr: "Visibilité complète des dépenses" },
  b_corp_4t: { en: "Every negotiation is audited with SHA-256 hashing. No hidden costs, full transparency.", fr: "Chaque négociation est auditée avec un hash SHA-256. Aucun coût caché, transparence totale." },
  b_corp_5: { en: "Volume Leverage, Automated", fr: "Levier volume, automatisé" },
  b_corp_5t: { en: "Your booking history (YTD nights, loyalty tier) is used as negotiation leverage automatically.", fr: "Votre historique de réservation (nuits YTD, tier fidélité) est utilisé comme levier de négociation automatiquement." },
  b_hotel_1: { en: "Optimized Revenue per Room", fr: "Revenu optimisé par chambre" },
  b_hotel_1t: { en: "Yield engine adjusts rates by occupancy, season, and demand in real time.", fr: "Le moteur de yield ajuste les tarifs selon l'occupation, la saison et la demande en temps réel." },
  b_hotel_2: { en: "Zero Manual Workload", fr: "Zéro charge manuelle" },
  b_hotel_2t: { en: "No more email threads with 200 corporate accounts. The AI handles it all.", fr: "Plus de fils d'emails avec 200 comptes corporate. L'IA gère tout." },
  b_hotel_3: { en: "Fill Low-Occupancy Nights", fr: "Remplir les nuits creuses" },
  b_hotel_3t: { en: "Offer targeted discounts when rooms would otherwise stay empty.", fr: "Offrez des remises ciblées quand les chambres resteraient vides." },
  b_hotel_4: { en: "Grow Corporate Accounts", fr: "Développer les comptes corporate" },
  b_hotel_4t: { en: "Volume-based pricing attracts repeat corporate bookings automatically.", fr: "La tarification volume attire les réservations corporate récurrentes automatiquement." },
  b_hotel_5: { en: "Connects to Your PMS", fr: "Se connecte à votre PMS" },
  b_hotel_5t: { en: "Integrates with Mews, SiteMinder, and other property management systems via API.", fr: "S'intègre avec Mews, SiteMinder et d'autres PMS via API." },

  // ── How it works
  how_title: { en: "How It Works", fr: "Comment ça marche" },
  how_subtitle: {
    en: "A negotiation completes in under 30 seconds. Here's what happens behind the scenes.",
    fr: "Une négociation se termine en moins de 30 secondes. Voici ce qui se passe en coulisses.",
  },
  how_1: { en: "Travel Intent", fr: "Intention de voyage" },
  how_1t: {
    en: "A trip is detected (calendar, email, or manual trigger). The Corporate Agent broadcasts dates, destination, budget limits, and policy requirements.",
    fr: "Un voyage est détecté (agenda, email ou déclenchement manuel). L'Agent Corporate diffuse les dates, la destination, les limites budgétaires et les exigences de politique.",
  },
  how_2: { en: "Hotel Offer", fr: "Offre hôtelière" },
  how_2t: {
    en: "The Hotel Agent checks availability, applies yield rules (occupancy, season, corporate tier), and returns an optimized rate with inclusions.",
    fr: "L'Agent Hôtelier vérifie la disponibilité, applique les règles de yield (occupation, saison, tier corporate) et retourne un tarif optimisé avec inclusions.",
  },
  how_3: { en: "Counter-Proposal (if needed)", fr: "Contre-proposition (si nécessaire)" },
  how_3t: {
    en: "If the rate exceeds budget or inclusions are missing, the Corporate Agent counter-proposes — citing volume leverage, loyalty, or stay duration. Max 2 rounds.",
    fr: "Si le tarif dépasse le budget ou des inclusions manquent, l'Agent Corporate contre-propose — en citant le levier volume, la fidélité ou la durée du séjour. Max 2 rounds.",
  },
  how_4: { en: "Instant Confirmation", fr: "Confirmation instantanée" },
  how_4t: {
    en: "Agreement is reached. Booking reference generated, SHA-256 audit hash computed, both parties notified. Total time: seconds.",
    fr: "L'accord est trouvé. Référence de réservation générée, hash SHA-256 calculé, les deux parties notifiées. Temps total : quelques secondes.",
  },

  // ── Stats
  stats_title: { en: "Built for Enterprise Scale", fr: "Conçu pour l'échelle entreprise" },
  stats_1: { en: "Average negotiation time", fr: "Temps moyen de négociation" },
  stats_2: { en: "Savings vs. annual RFP rates", fr: "Économies vs tarifs RFP annuels" },
  stats_3: { en: "Human touchpoints required", fr: "Interventions humaines requises" },
  stats_4: { en: "Every transaction audited", fr: "Chaque transaction auditée" },

  // ── Demo
  demo_title: { en: "See a Real Negotiation", fr: "Voir une vraie négociation" },
  demo_subtitle: {
    en: "An actual negotiation between the TechCorp Corporate Agent and the Le Marais Boutique Hotel Agent — completed in 18.4 seconds.",
    fr: "Une négociation réelle entre l'Agent Corporate TechCorp et l'Agent du Marais Boutique Hotel — terminée en 18,4 secondes.",
  },

  // ── CTA
  cta_title: { en: "Ready to Automate Your Hotel Procurement?", fr: "Prêt à automatiser vos achats hôteliers ?" },
  cta_subtitle: {
    en: "Join the pilot program. Connect your travel policy and let the AI negotiate for you.",
    fr: "Rejoignez le programme pilote. Connectez votre politique voyage et laissez l'IA négocier pour vous.",
  },
  cta_btn_1: { en: "Get Started", fr: "Commencer" },
  cta_btn_2: { en: "Contact Sales", fr: "Contacter l'équipe" },

  // ── Footer
  footer_desc: {
    en: "The intelligent layer for corporate hotel procurement. Two AI agents negotiate so humans don't have to. Built by Kairion, Brussels.",
    fr: "La couche intelligente pour les achats hôteliers corporate. Deux agents IA négocient pour que les humains n'aient pas à le faire. Développé par Kairion, Bruxelles.",
  },
  footer_product: { en: "Product", fr: "Produit" },
  footer_company: { en: "Company", fr: "Entreprise" },
  footer_about: { en: "About", fr: "À propos" },
  footer_security: { en: "Security", fr: "Sécurité" },
  footer_privacy: { en: "Privacy", fr: "Confidentialité" },
} as const;

export type TranslationKey = keyof typeof t;
