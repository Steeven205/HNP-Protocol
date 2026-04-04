/**
 * Bilingual content dictionary for Rateflow landing page.
 */

export type Lang = "en" | "fr";

export const t = {
  // ── Nav
  nav_features: { en: "Features", fr: "Fonctionnalités" },
  nav_protocol: { en: "Protocol", fr: "Protocole" },
  nav_shadow: { en: "Shadow Mode", fr: "Mode Shadow" },
  nav_integrations: { en: "Integrations", fr: "Intégrations" },
  nav_security: { en: "Security", fr: "Sécurité" },
  nav_request_demo: { en: "Request Demo", fr: "Demander une démo" },

  // ── Hero
  hero_badge: { en: "AI-to-AI Negotiation Protocol", fr: "Protocole de négociation IA-à-IA" },
  hero_title: { en: "The End of the Annual Hotel RFP", fr: "La fin du RFP hôtelier annuel" },
  hero_subtitle: {
    en: "Two AI agents negotiate hotel bookings in real time — no annual contract, no human intervention, no more frozen rates.",
    fr: "Deux agents IA négocient des réservations hôtelières en temps réel — sans contrat annuel, sans intervention humaine, sans tarifs figés.",
  },
  hero_cta_pilot: { en: "Request a Pilot", fr: "Demander un pilote" },
  hero_cta_action: { en: "See it in action", fr: "Voir en action" },
  hero_stat_1_label: { en: "Per negotiation", fr: "Par négociation" },
  hero_stat_2_label: { en: "Average savings", fr: "Économies moyennes" },
  hero_stat_3_label: { en: "Humans involved", fr: "Humains impliqués" },

  // ── Hero widget
  widget_title: { en: "LIVE NEGOTIATION", fr: "NÉGOCIATION EN DIRECT" },
  widget_status: { en: "In Progress", fr: "En cours" },
  widget_corp_agent: { en: "Corporate Agent", fr: "Agent Corporate" },
  widget_hotel_agent: { en: "Hotel Agent", fr: "Agent Hôtelier" },
  widget_msg_intent: {
    en: "Paris, May 12–15 · Standard Room · Budget max: \u20AC180/night · Gold account, 127 nights YTD",
    fr: "Paris, 12–15 mai · Chambre standard · Budget max : 180\u20AC/nuit · Compte gold, 127 nuits YTD",
  },
  widget_msg_offer: {
    en: "\u20AC145 \u2192 \u20AC116/night · WiFi + Late checkout · 24h free cancellation · ESG Tier A · -12% gold discount",
    fr: "145\u20AC \u2192 116\u20AC/nuit · WiFi + Late checkout · Annulation 24h gratuite · ESG Tier A · -12% remise gold",
  },
  widget_confirmed: { en: "\u2713 CONFIRMED — BK-LMBH-PM0512", fr: "\u2713 CONFIRMÉ — BK-LMBH-PM0512" },
  widget_vs_budget: { en: "vs budget", fr: "vs budget" },
  widget_humans: { en: "0 humans", fr: "0 humains" },

  // ── Problem
  problem_badge: { en: "The Problem", fr: "Le Problème" },
  problem_title: { en: "The Annual Hotel RFP Is Structurally Broken", fr: "Le RFP hôtelier annuel est structurellement obsolète" },
  problem_subtitle: {
    en: "Corporate travel managers spend months negotiating rates that are outdated before the ink dries.",
    fr: "Les travel managers passent des mois à négocier des tarifs obsolètes avant même la signature.",
  },
  problem_1_title: { en: "Frozen Rates", fr: "Tarifs figés" },
  problem_1_text: {
    en: "Rates locked for 12 months in a market that fluctuates daily. By month 2, your contract is already sub-optimal.",
    fr: "Tarifs figés 12 mois dans un marché qui fluctue quotidiennement. Dès le 2e mois, votre contrat est sous-optimal.",
  },
  problem_2_title: { en: "3–6 Month Cycles", fr: "Cycles de 3 à 6 mois" },
  problem_2_text: {
    en: "Travel managers and revenue managers exchange spreadsheets for months. An entire RFP process to fix what should be automatic.",
    fr: "Des mois d'échanges de tableurs entre travel managers et revenue managers pour un résultat immédiatement dépassé.",
  },
  problem_3_title: { en: "Locked to Contracted Hotels", fr: "Limité aux hôtels sous contrat" },
  problem_3_text: {
    en: "Independent hotels outside your group contract are inaccessible. You overpay for alternatives or go without options.",
    fr: "Les hôtels indépendants hors contrat sont inaccessibles. Vous surpayez pour des alternatives ou renoncez.",
  },
  problem_4_title: { en: "Months of PMS Loading", fr: "Des mois de chargement PMS" },
  problem_4_text: {
    en: "Once a contract is signed, negotiated rates must be manually loaded into the PMS of every hotel — one by one. For a 100-hotel group, this takes 2–3 months. The contract exists but rates aren't bookable.",
    fr: "Une fois le contrat signé, les tarifs négociés doivent être chargés manuellement dans le PMS de chaque hôtel — un par un. Pour un groupe de 100 hôtels, cela prend 2 à 3 mois. Le contrat existe mais les tarifs ne sont pas réservables.",
  },
  problem_5_title: { en: "Dedicated Teams on Both Sides", fr: "Des équipes dédiées des deux côtés" },
  problem_5_text: {
    en: "Hotel groups need teams to load, verify, and maintain corporate rates across hundreds of properties. Corporates need teams to track, audit, and reconcile. A hidden operational cost on every contract.",
    fr: "Les groupes hôteliers mobilisent des équipes pour charger, vérifier et maintenir les tarifs corporate sur des centaines d'établissements. Les corporates mobilisent des équipes pour suivre et réconcilier. Un coût opérationnel caché sur chaque contrat.",
  },
  problem_6_title: { en: "OTA Commissions Lost", fr: "Commissions OTA perdues" },
  problem_6_text: {
    en: "Hotels pay 15–25% commission to online travel agencies on every corporate booking. That money vanishes. Neither side benefits.",
    fr: "Les hôtels versent 15–25% de commission aux agences en ligne sur chaque réservation corporate. Cet argent disparaît. Aucune partie n'en bénéficie.",
  },

  // ── Exchange Analogy
  analogy_badge: { en: "The Concept", fr: "Le Concept" },
  analogy_title: { en: "A Real-Time Exchange for Hotel Rates", fr: "Une bourse d'échange en temps réel pour les tarifs hôteliers" },
  analogy_subtitle: {
    en: "Like a financial exchange connects buyers and sellers with transparent pricing, Rateflow connects corporate demand and hotel supply through a standardized protocol — with real-time price discovery on every transaction.",
    fr: "Comme une bourse connecte acheteurs et vendeurs avec des prix transparents, Rateflow connecte la demande corporate et l'offre hôtelière via un protocole standardisé — avec une découverte de prix en temps réel à chaque transaction.",
  },
  analogy_corp_title: { en: "Corporate Agent", fr: "Agent Corporate" },
  analogy_corp_text: {
    en: "Travel policy encoded as AI. Negotiates on behalf of the company within approved limits.",
    fr: "Politique voyage encodée en IA. Négocie au nom de l'entreprise dans les limites approuvées.",
  },
  analogy_protocol_sub: { en: "The standard both agents use", fr: "Le standard utilisé par les deux" },
  analogy_hotel_title: { en: "Hotel Agent", fr: "Agent Hôtelier" },
  analogy_hotel_text: {
    en: "Yield rules encoded as AI. Negotiates with corporates autonomously, maximizing RevPAR.",
    fr: "Règles de yield encodées en IA. Négocie avec les corporates de façon autonome, en maximisant le RevPAR.",
  },

  // ── Benefits Two-Sided
  benefits_badge: { en: "Two Products, One Protocol", fr: "Deux produits, un protocole" },
  benefits_title: { en: "Built for Both Sides of Every Booking", fr: "Conçu pour les deux côtés de chaque réservation" },
  benefits_subtitle: {
    en: "Rateflow deploys two AI agents that speak the same protocol. Hotels configure once. Corporates automate forever.",
    fr: "Rateflow déploie deux agents IA qui parlent le même protocole. Les hôtels configurent une fois. Les corporates automatisent pour toujours.",
  },
  benefits_corp_title: { en: "For Corporate Travel Managers", fr: "Pour les Travel Managers Corporate" },
  benefits_corp_sub: {
    en: "Automate your hotel procurement. Eliminate the annual RFP.",
    fr: "Automatisez votre procurement hôtelier. Éliminez le RFP annuel.",
  },
  benefits_hotel_title: { en: "For Hotel Revenue Managers", fr: "Pour les Revenue Managers Hôteliers" },
  benefits_hotel_sub: {
    en: "Accept corporate bookings automatically. Maximize RevPAR without manual effort.",
    fr: "Acceptez les réservations corporate automatiquement. Maximisez le RevPAR sans effort manuel.",
  },
  b_corp_1: { en: "100% Policy Compliance, Automated", fr: "Conformité politique 100% automatisée" },
  b_corp_1t: {
    en: "Budget caps per city, ESG requirements, cancellation policies — enforced automatically on every booking without manual review.",
    fr: "Plafonds budgétaires par ville, exigences ESG, politiques d'annulation — appliqués automatiquement sur chaque réservation.",
  },
  b_corp_2: { en: "Access to All Connected Hotels", fr: "Accès à tous les hôtels connectés" },
  b_corp_2t: {
    en: "Not just your contracted hotels. Any hotel connected to Rateflow Protocol — independents, boutique properties, apart-hotels — is instantly available.",
    fr: "Pas seulement vos hôtels sous contrat. Tout hôtel connecté au protocole Rateflow est instantanément accessible.",
  },
  b_corp_3: { en: "Volume Leverage, Used Automatically", fr: "Levier volume utilisé automatiquement" },
  b_corp_3t: {
    en: "Your YTD nights, loyalty tier, and spending history become negotiating leverage on every single booking — not just at contract renewal.",
    fr: "Vos nuits YTD, votre tier de fidélité et votre historique deviennent un levier de négociation à chaque réservation.",
  },
  b_corp_4: { en: "Shadow Mode — Keep Your Contracts", fr: "Mode Shadow — Gardez vos contrats" },
  b_corp_4t: {
    en: "Keep existing contracts. Run Rateflow in parallel. See exactly what you would have saved each month before committing.",
    fr: "Gardez vos contrats existants. Lancez Rateflow en parallèle. Voyez exactement ce que vous auriez économisé chaque mois.",
  },
  b_corp_5: { en: "Multi-Hotel Bidding (1-to-N)", fr: "Appel d'offres multi-hôtels (1-to-N)" },
  b_corp_5t: {
    en: "Corporate Agent broadcasts to N hotels simultaneously. Collects all offers. Ranks by price, ESG, and policy fit. Presents top 3 in seconds.",
    fr: "L'Agent Corporate broadcast vers N hôtels simultanément. Collecte toutes les offres. Classe par prix, ESG et conformité politique.",
  },
  b_hotel_1: { en: "20-Minute Setup, No System Changes", fr: "Configuration en 20 minutes, zéro changement système" },
  b_hotel_1t: {
    en: "Connects via your existing channel manager (D-EDGE, SiteMinder). Import your rates automatically. Set 3 parameters. Live in minutes.",
    fr: "Se connecte via votre channel manager existant (D-EDGE, SiteMinder). Import automatique des tarifs. 3 paramètres à configurer. Opérationnel en minutes.",
  },
  b_hotel_2: { en: "Recover OTA Commissions (15–25%)", fr: "Récupérez les commissions OTA (15–25%)" },
  b_hotel_2t: {
    en: "Every corporate booking via Rateflow is a direct booking. No OTA commission paid. You pay 3–5% to Rateflow instead of 15–25% to online travel agencies.",
    fr: "Chaque réservation corporate via Rateflow est une réservation directe. Pas de commission OTA. Vous payez 3–5% à Rateflow au lieu de 15–25% aux agences en ligne.",
  },
  b_hotel_3: { en: "Natural Language Configuration", fr: "Configuration en langage naturel" },
  b_hotel_3t: {
    en: "Tell your Hotel Agent what you want in plain language: 'Fill my Monday/Tuesday rooms first' or 'Reward accounts with 50+ nights per year'.",
    fr: "Dites à votre Agent Hôtelier ce que vous voulez en langage naturel : 'Remplir mes lundis/mardis en priorité' ou 'Fidéliser les comptes 50+ nuits/an'.",
  },
  b_hotel_4: { en: "Dynamic Yield Engine", fr: "Moteur de yield dynamique" },
  b_hotel_4t: {
    en: "Adjusts rates automatically based on real-time occupancy, season, stay duration, and account loyalty tier. Smarter than any static rate plan.",
    fr: "Ajuste les tarifs automatiquement selon l'occupation, la saisonnalité, la durée de séjour et le tier de fidélité du compte.",
  },
  b_hotel_5: { en: "Access New Corporate Clients", fr: "Accédez à de nouveaux clients corporate" },
  b_hotel_5t: {
    en: "Any corporate using Rateflow Protocol can discover and book your hotel — without a pre-existing contract, without a sales team, without a RFP cycle.",
    fr: "Tout corporate utilisant le protocole Rateflow peut découvrir et réserver votre hôtel — sans contrat préalable, sans équipe commerciale.",
  },

  // ── Protocol Steps
  protocol_badge: { en: "How It Works", fr: "Comment ça marche" },
  protocol_title: { en: "The HNP Protocol — 4 Messages, 30 Seconds", fr: "Le Protocole HNP — 4 messages, 30 secondes" },
  protocol_subtitle: {
    en: "A complete hotel booking negotiation, from intent to confirmation, in under 30 seconds.",
    fr: "Une négociation complète, de l'intention à la confirmation, en moins de 30 secondes.",
  },
  protocol_1_text: {
    en: "Corporate Agent detects travel need (calendar, email, or manual trigger). Broadcasts destination, dates, budget limits, policy requirements, and volume leverage signal to N hotels simultaneously.",
    fr: "L'Agent Corporate détecte un besoin de voyage. Broadcast vers N hôtels simultanément avec les dates, budget, politique et signal de volume.",
  },
  protocol_2_text: {
    en: "Hotel Agent checks real-time availability, applies yield engine (occupancy, season, corporate tier, OTA offset), and returns an optimized rate with inclusions. Offer valid for 15 minutes.",
    fr: "L'Agent Hôtelier vérifie la disponibilité en temps réel, applique le yield engine et retourne un tarif optimisé avec inclusions. Offre valable 15 minutes.",
  },
  protocol_3_text: {
    en: "If rate or conditions don't fully meet policy, Corporate Agent counter-proposes — citing YTD volume, loyalty tier, or stay duration. Maximum 2 rounds. Hotel Agent responds instantly.",
    fr: "Si le tarif ou les conditions ne correspondent pas, l'Agent Corporate contre-propose en citant le volume YTD et la fidélité. Maximum 2 rounds.",
  },
  protocol_4_text: {
    en: "Agreement reached. Booking reference generated. SHA-256 audit hash computed. Both agents confirm. Total time: under 30 seconds. Zero humans required.",
    fr: "Accord trouvé. Référence de réservation générée. Hash SHA-256 calculé. Les deux agents confirment. Durée totale : moins de 30 secondes.",
  },

  // ── OTA Commission Offset
  ota_badge: { en: "OTA Commission Offset", fr: "Redistribution des commissions OTA" },
  ota_title: { en: "Everyone Wins. Except the Middleman.", fr: "Tout le monde gagne. Sauf l'intermédiaire." },
  ota_subtitle: {
    en: "Hotels pay 15–25% commission to OTAs on every corporate booking. Rateflow redistributes that commission between the hotel and the corporate.",
    fr: "Les hôtels paient 15–25% de commission aux OTAs sur chaque réservation corporate. Rateflow redistribue cette commission entre l'hôtel et le corporate.",
  },
  ota_via_ota: { en: "Booking via OTA Today", fr: "Réservation via OTA aujourd'hui" },
  ota_public_rate: { en: "Public rate", fr: "Tarif public" },
  ota_commission: { en: "OTA Commission (20%)", fr: "Commission OTA (20%)" },
  ota_hotel_net: { en: "Hotel net revenue", fr: "Revenu net hôtel" },
  ota_corp_pays: { en: "Corporate pays", fr: "Le corporate paie" },
  ota_via_rateflow: { en: "Booking via Rateflow", fr: "Réservation via Rateflow" },
  ota_negotiated_rate: { en: "Negotiated rate", fr: "Tarif négocié" },
  ota_commission_zero: { en: "OTA Commission", fr: "Commission OTA" },
  ota_rateflow_fee: { en: "Rateflow fee (4%)", fr: "Fee Rateflow (4%)" },
  ota_callout_title: { en: "The OTA Commission Is Redistributed, Not Eliminated", fr: "La commission OTA est redistribuée, pas éliminée" },
  ota_callout_text: {
    en: "The 20% OTA commission becomes: 14% discount for the corporate (first automatic discount on every booking), 3% additional net gain for the hotel, 3–5% Rateflow fee. The value stays in the transaction — not with a middleman.",
    fr: "La commission OTA de 20% devient : 14% de remise pour le corporate (premier discount automatique), 3% de gain net supplémentaire pour l'hôtel, 3–5% de fee Rateflow. La valeur reste dans la transaction — pas chez un intermédiaire.",
  },

  // ── Onboarding
  onboarding_badge: { en: "Onboarding", fr: "Onboarding" },
  onboarding_title: { en: "Live in 20 Minutes. Really.", fr: "Opérationnel en 20 minutes. Vraiment." },
  onboarding_subtitle: {
    en: "No developer required. No system migration. No training. Three steps and your Hotel Agent is negotiating corporate bookings.",
    fr: "Pas de développeur nécessaire. Pas de migration système. Pas de formation. Trois étapes et votre Agent Hôtelier négocie des réservations corporate.",
  },
  onboard_1_title: { en: "Auto-Import from Channel Manager", fr: "Import automatique du channel manager" },
  onboard_1_text: {
    en: "Connect your D-EDGE or SiteMinder account. Your room types, current rates, and cancellation policies are imported automatically. Nothing to re-enter.",
    fr: "Connectez votre compte D-EDGE ou SiteMinder. Vos types de chambres, tarifs actuels et politiques d'annulation sont importés automatiquement.",
  },
  onboard_1_a: { en: "Room types imported", fr: "Types de chambres importés" },
  onboard_1_b: { en: "Current rates imported", fr: "Tarifs actuels importés" },
  onboard_1_c: { en: "Cancellation policies imported", fr: "Politiques d'annulation importées" },
  onboard_2_title: { en: "3 Essential Parameters", fr: "3 paramètres essentiels" },
  onboard_2_text: {
    en: "That's all you need to start. No complex rate plans. No consultant required. Just three decisions.",
    fr: "C'est tout ce dont vous avez besoin pour démarrer. Pas de plans tarifaires complexes. Pas de consultant.",
  },
  onboard_2_a: { en: "Floor rate (slider: never below \u20ACX/night)", fr: "Tarif plancher (slider : jamais en dessous de X\u20AC/nuit)" },
  onboard_2_b: { en: "Volume discount (X+ nights/year \u2192 Y% off)", fr: "Remise volume (X+ nuits/an \u2192 Y% remise)" },
  onboard_2_c: { en: "Auto-inclusions (WiFi / Breakfast / Late checkout)", fr: "Inclusions auto (WiFi / PDJ / Late checkout)" },
  onboard_3_title: { en: "Preview Before Going Live", fr: "Prévisualiser avant de lancer" },
  onboard_3_text: {
    en: "Run 3 simulated negotiations with your configured rules. See exactly what your Hotel Agent would offer before accepting real bookings.",
    fr: "Lancez 3 négociations simulées avec vos règles configurées. Voyez exactement ce que votre Agent Hôtelier proposerait avant d'accepter de vraies réservations.",
  },
  onboard_3_a: { en: "3 simulated negotiations", fr: "3 négociations simulées" },
  onboard_3_b: { en: "Review offers and pricing", fr: "Vérifier les offres et tarifs" },
  onboard_3_c: { en: "Adjust rules if needed", fr: "Ajuster les règles si nécessaire" },

  // ── Shadow Mode
  shadow_badge: { en: "Shadow Mode", fr: "Mode Shadow" },
  shadow_title: { en: "Keep Your Contracts. See What You're Missing.", fr: "Gardez vos contrats. Voyez ce que vous perdez." },
  shadow_subtitle: {
    en: "Run Rateflow in parallel with your existing contracts. Every month, a report shows the exact savings you would have made.",
    fr: "Lancez Rateflow en parallèle avec vos contrats existants. Chaque mois, un rapport montre les économies exactes que vous auriez réalisées.",
  },
  shadow_sim_label: { en: "Monthly savings simulation — TechCorp SAS", fr: "Simulation d'économies mensuelles — TechCorp SAS" },
  shadow_paid: { en: "Paid", fr: "Payé" },
  shadow_via_rateflow: { en: "via Rateflow", fr: "via Rateflow" },
  shadow_apr: { en: "Apr", fr: "Avr" },
  shadow_q1_label: { en: "Q1 simulated savings", fr: "Économies simulées T1" },
  shadow_big_text: {
    en: "That's what TechCorp would have saved in the first quarter alone — without changing a single contract.",
    fr: "C'est ce que TechCorp aurait économisé au premier trimestre seulement — sans changer un seul contrat.",
  },
  shadow_bullet_1_title: { en: "Zero Risk to Existing Contracts", fr: "Zéro risque pour les contrats existants" },
  shadow_bullet_1_text: {
    en: "Shadow mode never books anything. It only simulates. Your existing contracts remain untouched.",
    fr: "Le mode shadow ne réserve rien. Il simule uniquement. Vos contrats existants restent intacts.",
  },
  shadow_bullet_2_title: { en: "Monthly Savings Report", fr: "Rapport mensuel d'économies" },
  shadow_bullet_2_text: {
    en: "Every month: what you paid vs what Rateflow would have negotiated. Delta in euros, per booking, per city, per hotel.",
    fr: "Chaque mois : ce que vous avez payé vs ce que Rateflow aurait négocié. Delta en euros, par réservation, par ville, par hôtel.",
  },
  shadow_bullet_3_title: { en: "Switch When You're Ready", fr: "Basculez quand vous êtes prêt" },
  shadow_bullet_3_text: {
    en: "When the numbers convince you — and they will — switching to live mode is a single toggle. Your configuration is already set.",
    fr: "Quand les chiffres vous convainquent — et ils le feront — passer en mode live est un simple bouton. Votre configuration est déjà prête.",
  },

  // ── Connectors
  connectors_badge: { en: "Integrations", fr: "Intégrations" },
  connectors_title: { en: "Connects to Your Existing Stack", fr: "Se connecte à votre stack existante" },
  connectors_subtitle: {
    en: "One connector per channel manager. Thousands of hotels. No system migration required.",
    fr: "Un connecteur par channel manager. Des milliers d'hôtels. Aucune migration système requise.",
  },
  conn_1_priority: { en: "Priority 1 — France & Benelux", fr: "Priorité 1 — France & Benelux" },
  conn_1_count: { en: "17,000+ hotels · Paris-based", fr: "17 000+ hôtels · Basé à Paris" },
  conn_1_text: {
    en: "The reference channel manager for French-speaking Europe. Direct booking engine, CRS, and Channel Manager in one API. Strategic partnership potential.",
    fr: "Le channel manager de référence pour l'Europe francophone. Moteur de réservation direct, CRS et Channel Manager en une API. Partenariat stratégique potentiel.",
  },
  conn_2_priority: { en: "Priority 2 — Europe & Global Scale", fr: "Priorité 2 — Europe & Scale mondial" },
  conn_2_count: { en: "40,000+ hotels · 150 countries", fr: "40 000+ hôtels · 150 pays" },
  conn_2_text: {
    en: "The global leader in hotel channel management. One API for 40,000+ hotels across 150 countries. The key to scaling Rateflow worldwide.",
    fr: "Le leader mondial du channel management hôtelier. Une API pour 40 000+ hôtels dans 150 pays. La clé pour scaler Rateflow mondialement.",
  },
  conn_3_priority: { en: "Priority 3 — Direct PMS", fr: "Priorité 3 — PMS Direct" },
  conn_3_count: { en: "Direct PMS integration", fr: "Intégration PMS directe" },
  conn_3_text: {
    en: "Direct PMS connection for hotels using Mews. Access real-time availability, corporate rate plans, and booking confirmation directly. Already validated in sandbox.",
    fr: "Connexion PMS directe pour les hôtels utilisant Mews. Accès disponibilité temps réel, rate plans corporate et confirmation de réservation. Déjà validé en sandbox.",
  },
  connectors_more: {
    en: "More connectors in roadmap: Amadeus, Sabre, Opera Cloud, Cloudbeds, RoomRaccoon",
    fr: "Plus de connecteurs en roadmap : Amadeus, Sabre, Opera Cloud, Cloudbeds, RoomRaccoon",
  },

  // ── Stats
  stats_1: { en: "Average negotiation time. From travel intent to confirmed booking.", fr: "Durée moyenne de négociation. De l'intention à la confirmation." },
  stats_2: { en: "Average savings vs annual contracted rates. Measured on live negotiations.", fr: "Économies moyennes vs tarifs contractuels annuels. Mesurés sur des négociations live." },
  stats_3: { en: "Human touchpoints required. From intent to confirmation, fully autonomous.", fr: "Points de contact humains requis. De l'intention à la confirmation, entièrement autonome." },
  stats_4: { en: "Global corporate hotel spending addressable market. Growing at 8% CAGR.", fr: "Marché adressable mondial hébergement corporate. Croissance de 8% par an." },

  // ── Audit
  audit_badge: { en: "Security & Compliance", fr: "Sécurité & Conformité" },
  audit_title: { en: "Every Negotiation, Immutably Logged", fr: "Chaque négociation, loggée de façon immuable" },
  audit_subtitle: {
    en: "Full SHA-256 audit trail on every message. Every offer, counter-proposal, and confirmation is cryptographically sealed.",
    fr: "Audit trail SHA-256 complet sur chaque message. Chaque offre, contre-proposition et confirmation est scellée cryptographiquement.",
  },
  audit_trail_label: { en: "Audit Trail — NEG-2026-8923", fr: "Audit Trail — NEG-2026-8923" },
  audit_session_hash: { en: "Session Hash", fr: "Hash de session" },
  audit_b1_title: { en: "Cryptographic Integrity", fr: "Intégrité cryptographique" },
  audit_b1_text: {
    en: "Every HNP message is hashed with SHA-256. Any tampering is immediately detectable. The audit trail cannot be falsified.",
    fr: "Chaque message HNP est hashé en SHA-256. Toute altération est immédiatement détectable. L'audit trail ne peut pas être falsifié.",
  },
  audit_b2_title: { en: "GDPR-Compliant Logging", fr: "Logging conforme RGPD" },
  audit_b2_text: {
    en: "All negotiation data stored in Supabase EU region. Data retention policies configurable. Full data export on request.",
    fr: "Toutes les données de négociation stockées dans la région Supabase EU. Politiques de rétention configurables. Export complet sur demande.",
  },
  audit_b3_title: { en: "Full Spend Visibility", fr: "Visibilité totale des dépenses" },
  audit_b3_text: {
    en: "Every booking, every negotiation round, every rate evolution. Exportable for financial reporting, expense management, and policy audits.",
    fr: "Chaque réservation, chaque round de négociation, chaque évolution tarifaire. Exportable pour le reporting financier et les audits de politique.",
  },
  audit_b4_title: { en: "Hotel Yield Rules Stay Private", fr: "Règles de yield hôtelières confidentielles" },
  audit_b4_text: {
    en: "The Hotel Agent's yield logic is never exposed to the Corporate Agent or to Rateflow. Corporates only see the final offer — never the pricing rules behind it.",
    fr: "La logique de yield de l'Agent Hôtelier n'est jamais exposée à l'Agent Corporate ni à Rateflow. Les corporates ne voient que l'offre finale.",
  },

  // ── CTA
  cta_badge: { en: "Join the Pilot", fr: "Rejoindre le pilote" },
  cta_title: { en: "Ready to Automate Your Hotel Procurement?", fr: "Prêt à automatiser votre procurement hôtelier ?" },
  cta_subtitle: {
    en: "We're looking for 3 hotel partners and 3 corporate partners to validate the protocol on real data. Free for 6 months. Your feedback shapes the product.",
    fr: "Nous cherchons 3 hôtels partenaires et 3 entreprises partenaires pour valider le protocole sur des données réelles. Gratuit pendant 6 mois.",
  },
  cta_hotel: { en: "I'm a Hotel Partner", fr: "Je suis un hôtel partenaire" },
  cta_corporate: { en: "I'm a Corporate Partner", fr: "Je suis un corporate partenaire" },
  cta_investor: { en: "I'm an Investor", fr: "Je suis un investisseur" },
  cta_built_by: {
    en: "Built by Steve Ambassa · Kairion · Brussels, Belgium · background: BCG · Pullman Brussels · Montempô Paris",
    fr: "Développé par Steve Ambassa · Kairion · Bruxelles, Belgique · background : BCG · Pullman Brussels · Montempô Paris",
  },

  // ── Footer
  footer_desc: {
    en: "The AI-to-AI negotiation protocol for corporate hotel bookings. Built on HNP — the open standard that replaces the annual hotel RFP.",
    fr: "Le protocole de négociation IA-à-IA pour les réservations hôtelières corporate. Construit sur HNP — le standard ouvert qui remplace le RFP hôtelier annuel.",
  },
  footer_product: { en: "Product", fr: "Produit" },
  footer_for_corporates: { en: "For Corporates", fr: "Pour les Corporates" },
  footer_for_hotels: { en: "For Hotels", fr: "Pour les Hôtels" },
  footer_hnp_protocol: { en: "HNP Protocol", fr: "Protocole HNP" },
  footer_shadow_mode: { en: "Shadow Mode", fr: "Mode Shadow" },
  footer_integrations: { en: "Integrations", fr: "Intégrations" },
  footer_company: { en: "Company", fr: "Entreprise" },
  footer_about: { en: "About Kairion", fr: "À propos de Kairion" },
  footer_minddesk: { en: "MindDesk.ai", fr: "MindDesk.ai" },
  footer_xenia: { en: "Xenia Visibility", fr: "Xenia Visibility" },
  footer_contact: { en: "Contact", fr: "Contact" },
  footer_legal: { en: "Legal", fr: "Légal" },
  footer_terms: { en: "Terms of Service", fr: "Conditions d'utilisation" },
  footer_privacy: { en: "Privacy Policy", fr: "Politique de confidentialité" },
  footer_gdpr: { en: "Data Processing (GDPR)", fr: "Traitement des données (RGPD)" },
  footer_security: { en: "Security", fr: "Sécurité" },
  footer_ecosystem: {
    en: "Part of the Kairion AI ecosystem · Also: MindDesk · Xenia Visibility · Alterneo",
    fr: "Partie de l'écosystème IA Kairion · Aussi : MindDesk · Xenia Visibility · Alterneo",
  },
} as const;

export type TranslationKey = keyof typeof t;
