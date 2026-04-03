# HNP Platform — Hotel Negotiation Protocol

## Vision du projet

Plateforme de négociation IA-à-IA pour le voyage corporate B2B hôtelier.
Deux agents IA autonomes négocient des réservations hôtelières en temps réel,
sans intervention humaine, sans contrat annuel préalable.

**Fondateur** : Steve Ambassa (Kairion) — Brussels/La Louvière, BE
**Stack** : TypeScript · Next.js 15 · Supabase · Vercel · Claude API (Anthropic)
**Phase actuelle** : POC/MVP — données fictives, protocole réel

---

## Concept fondamental

### Le problème résolu

Le RFP hôtelier annuel est structurellement obsolète :
- Négociation manuelle 1x/an entre travel managers et groupes hôteliers
- Tarifs figés 12 mois dans un marché qui fluctue en temps réel
- Processus lourd (mois de cycles, tableurs Excel, emails)
- Résultat sous-optimal dès le 2ème mois du contrat

### La solution : protocole HNP

**HNP (Hotel Negotiation Protocol)** = standard de communication entre :
- **Agent Corporate** : IA côté entreprise (travel manager IA)
- **Agent Hôtelier** : IA côté groupe hôtelier (revenue manager IA)

Les deux agents négocient en continu, transaction par transaction,
dans le cadre de politiques prédéfinies des deux côtés.
Résultat : tarif optimal en permanence, zéro humain impliqué.

### Analogie business

Visa n'est ni la banque de l'acheteur ni celle du vendeur.
Visa crée le protocole que les deux banques utilisent.
HNP Platform fait la même chose pour les hôtels et les entreprises.

---

## Architecture du projet

### Monorepo structure

```
hnp-platform/
├── CLAUDE.md                    ← ce fichier
├── packages/
│   ├── hotel-agent/             ← Module A : Agent hôtelier (MCP Server)
│   ├── corporate-agent/         ← Module B : Agent entreprise (Claude API)
│   ├── hnp-protocol/            ← Module C : Orchestrateur + types partagés
│   └── dashboard/               ← Module D : Interface Next.js
├── data/
│   └── mock/                    ← Données fictives réalistes
│       ├── hotel.json           ← Hôtel fictif : Le Marais Boutique Hotel
│       ├── rates.json           ← Grille tarifaire dynamique
│       └── corporate.json       ← Entreprise fictive : TechCorp SAS
├── docs/
│   ├── HNP_SPEC.md              ← Spécification du protocole HNP
│   ├── ARCHITECTURE.md          ← Diagramme d'architecture détaillé
│   └── DEMO_SCRIPT.md           ← Script de démonstration prospect
└── scripts/
    └── demo.ts                  ← Lance une négociation de démo complète
```

---

## Module A — Hotel Agent (MCP Server)

### Rôle

Expose l'inventaire et les capacités de négociation d'un hôtel via MCP.
Phase POC : données fictives. Phase MVP : connecteur Mews API réel.

### Les 6 outils MCP exposés

```typescript
// 1. Vérifier la disponibilité
hotel_check_availability({
  check_in: string,        // "2026-05-12"
  check_out: string,       // "2026-05-15"
  room_type?: string,      // "standard" | "superior" | "suite"
  guests?: number          // 1 par défaut
}): AvailabilityResponse

// 2. Obtenir les tarifs
hotel_get_rates({
  check_in: string,
  check_out: string,
  room_type: string,
  corporate_id?: string    // ID compte corporate pour tarif négocié
}): RateResponse

// 3. Faire une offre (déclenchée par l'agent hôtelier)
hotel_make_offer({
  request_id: string,      // ID de la requête HNP entrante
  rate_eur: number,
  inclusions: string[],    // ["wifi", "breakfast", "parking"]
  cancellation_policy: string,
  validity_minutes: number // Durée de validité de l'offre
}): OfferResponse

// 4. Répondre à une contre-proposition
hotel_counter_respond({
  request_id: string,
  accept: boolean,
  modified_offer?: Partial<OfferResponse>,
  reason?: string
}): CounterResponse

// 5. Confirmer une réservation
hotel_confirm_booking({
  request_id: string,
  corporate_details: CorporateDetails,
  payment_method: string
}): BookingConfirmation

// 6. Obtenir la politique de l'hôtel
hotel_get_policy({
  policy_type: "cancellation" | "corporate" | "payment" | "yield"
}): PolicyResponse
```

### Interface abstraite (pattern pour connecteur futur)

```typescript
// data/providers/HotelDataProvider.ts
interface HotelDataProvider {
  getAvailability(params: AvailabilityParams): Promise<Availability>
  getRates(params: RateParams): Promise<Rate[]>
  createBooking(details: BookingDetails): Promise<BookingConfirmation>
  getYieldRules(): Promise<YieldRules>
}

// Implémentations :
// - MockHotelProvider (POC — données JSON)
// - MewsHotelProvider (MVP — Mews API réelle)
// - SiteMinderProvider (Scale — SiteMinder API)
```

### Moteur de yield simplifié

L'agent hôtelier ajuste les tarifs selon des règles YAML :
- Occupation > 80% → +15% sur tarif de base
- Séjour ≥ 3 nuits → -8% (fidélisation)
- Compte corporate Gold → -12% (volume historique)
- Haute saison (juil-août, Noël) → +20%
- Last minute < 48h → +10% (urgence)
- Breakfast inclus si séjour ≥ 2 nuits et corporate

---

## Module B — Corporate Agent

### Rôle

Agent Claude (via API Anthropic) qui représente le travel manager d'une entreprise.
Détecte les besoins de déplacement, formule des requêtes HNP,
négocie avec l'agent hôtelier, confirme dans les limites de la politique.

### La politique corporate encodée

```typescript
// data/mock/corporate.json
{
  "company": "TechCorp SAS",
  "corporate_id": "TC-2026-001",
  "travel_policy": {
    "max_rate_per_night": {
      "paris": 180,
      "lyon": 150,
      "default": 130
    },
    "minimum_category": "3_star",
    "esg_requirement": "tier_B_minimum",
    "cancellation": "24h_free_required",
    "breakfast": "optional",
    "loyalty_program": "accumulate_company_account",
    "approval_required_above": 250,
    "preferred_chains": ["Accor", "IHG", "Marriott"]
  },
  "negotiation_rules": {
    "max_counter_rounds": 2,
    "volume_leverage_threshold": 5,  // 5+ nuits = levier volume
    "auto_accept_if_below_budget_pct": 15  // -15% budget = accept auto
  }
}
```

### Prompt système de l'agent

L'agent Corporate reçoit un system prompt complet contenant :
- La politique voyage de TechCorp SAS
- L'historique des séjours précédents (données mock)
- Le contexte de la négociation en cours
- Les règles d'escalade (quand alerter un humain)

### Déclencheurs supportés

```typescript
// Déclencheur manuel (demo)
trigger_travel_request({
  traveler: string,
  destination: string,
  check_in: string,
  check_out: string,
  purpose?: string
})

// Futur : webhook depuis agenda Google Calendar
// Futur : parsing email "réunion confirmée à Paris le 15 mai"
```

---

## Module C — HNP Protocol (Orchestrateur)

### Les 4 types de messages du protocole

```typescript
// Type 1 : Requête de voyage (Corporate → Hôtel)
interface TravelIntent {
  type: "TRAVEL_INTENT"
  request_id: string          // UUID unique
  timestamp: string           // ISO 8601
  corporate_id: string
  destination: string
  check_in: string
  check_out: string
  travelers: number
  policy_snapshot: {          // Snapshot de la politique au moment T
    max_rate: number
    requirements: string[]
  }
  volume_signal?: {           // Levier de négociation
    nights_ytd: number        // Nuits déjà réservées cette année
    loyalty_tier: string
  }
}

// Type 2 : Offre hôtelière (Hôtel → Corporate)
interface HotelOffer {
  type: "HOTEL_OFFER"
  request_id: string
  timestamp: string
  hotel_id: string
  rate_eur: number
  room_type: string
  inclusions: string[]
  cancellation_policy: string
  validity_expires: string    // ISO 8601 — l'offre expire
  loyalty_points?: number
  esg_tier: string
}

// Type 3 : Contre-proposition (Corporate → Hôtel)
interface CounterProposal {
  type: "COUNTER_PROPOSAL"
  request_id: string
  timestamp: string
  accept_rate: boolean
  requested_modifications: {
    cancellation?: string
    inclusions?: string[]
    rate_adjustment?: number
  }
  justification: string       // Argument de l'agent (volume, fidélité...)
  round_number: number        // 1 ou 2 (max 2 rounds)
}

// Type 4 : Confirmation (les deux)
interface BookingConfirmation {
  type: "CONFIRMATION"
  request_id: string
  timestamp: string
  booking_ref: string
  final_rate: number
  final_inclusions: string[]
  final_cancellation: string
  payment_method: string
  audit_hash: string          // SHA256 de la transaction complète
  negotiation_summary: {
    rounds: number
    initial_rate: number
    final_rate: number
    savings_pct: number
  }
}
```

### Audit trail

Chaque message est persisté dans Supabase avec :
- Timestamp précis
- Hash SHA256 de l'état complet
- Durée de chaque round de négociation
- Résultat final

### Règles d'escalade humaine

L'orchestrateur escalade à un humain si :
- Rate finale > budget policy
- Plus de 2 rounds de contre-proposition sans accord
- Timeout de l'agent hôtelier (> 30 secondes)
- Erreur technique dans le protocole

---

## Module D — Dashboard

### Stack

Next.js 15 · App Router · Tailwind CSS · Supabase Realtime

### Pages

```
/                    → Landing / démo live
/negotiations        → Liste des négociations en cours et historique
/negotiations/[id]   → Détail d'une négociation (messages en temps réel)
/audit              → Audit trail complet
/config             → Configuration politique corporate et hôtelière
```

### Fonctionnalité clé pour la démo

La page `/negotiations/[id]` montre en temps réel :
- Les messages échangés entre les deux agents (comme un chat)
- Le tarif qui évolue à chaque round
- Le timer de validité de l'offre
- Le statut final : CONFIRMED / ESCALATED / TIMEOUT

C'est ce que tu montres aux prospects. Ça doit être impressionnant.

---

## Données fictives (data/mock/)

### L'hôtel fictif : Le Marais Boutique Hotel

```json
{
  "hotel_id": "LMBH-PARIS-001",
  "name": "Le Marais Boutique Hotel",
  "category": "4_star",
  "location": {
    "city": "Paris",
    "arrondissement": "3ème",
    "address": "12 rue des Archives, 75003 Paris"
  },
  "rooms": {
    "standard": { "count": 45, "base_rate": 145 },
    "superior": { "count": 20, "base_rate": 185 },
    "suite": { "count": 5, "base_rate": 320 }
  },
  "amenities": ["wifi", "breakfast", "gym", "bar"],
  "esg_tier": "A",
  "pms": "mock",
  "corporate_accounts": ["TC-2026-001", "CONSULT-FR-042"]
}
```

### L'entreprise fictive : TechCorp SAS

Scale-up tech 300 personnes, Paris.
Budget voyage annuel : 850 000€.
Destinations principales : Paris, Lyon, Berlin, Amsterdam.
Travel manager : Marie Dupont.
15 déplacements/mois en moyenne.

---

## Variables d'environnement requises

```env
# .env.local
ANTHROPIC_API_KEY=sk-ant-...         # API Claude pour les deux agents
NEXT_PUBLIC_SUPABASE_URL=...         # URL Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=...    # Clé publique Supabase
SUPABASE_SERVICE_ROLE_KEY=...        # Clé service (server-side only)

# Phase MVP+ (pas nécessaire pour le POC)
MEWS_CLIENT_TOKEN=...                # Connecteur Mews
SITEMINDER_API_KEY=...               # Connecteur SiteMinder
```

---

## Commandes de développement

```bash
# Installation (depuis la racine)
npm install

# Développement
npm run dev                    # Lance dashboard Next.js
npm run dev:hotel-agent        # Lance le MCP Server hôtelier
npm run dev:corporate-agent    # Lance l'agent corporate en mode test

# Demo
npm run demo                   # Lance une négociation complète de démo
npm run demo:verbose           # Même chose avec logs détaillés

# Tests
npm run test                   # Tests unitaires
npm run test:protocol          # Tests du protocole HNP uniquement

# Build
npm run build                  # Build production
```

---

## Ordre de développement recommandé

### Semaine 1 — Fondations
1. Créer le package `hnp-protocol` avec les types TypeScript partagés
2. Créer les données mock (hotel.json, corporate.json, rates.json)
3. Créer le MCP Server `hotel-agent` avec les 6 outils
4. Tester le MCP Server seul avec MCP Inspector

### Semaine 2 — Agent Corporate
1. Créer l'agent `corporate-agent` avec Claude API
2. Encoder la politique TechCorp SAS dans le system prompt
3. Implémenter le déclencheur de voyage
4. Tester la première négociation complète en CLI

### Semaine 3 — Orchestrateur et logs
1. Implémenter l'orchestrateur HNP complet
2. Connecter Supabase pour l'audit trail
3. Implémenter les règles d'escalade
4. Script `demo.ts` fonctionnel

### Semaine 4 — Dashboard
1. Créer le projet Next.js dans `dashboard/`
2. Page de négociation temps réel avec Supabase Realtime
3. Audit trail consultable
4. Design propre pour la démo prospects

### Semaine 5 — Mews Provider + Multi-Hotel (FAIT)
1. `MewsProvider` implémente `HotelDataProvider` ✅
   - Connecté à la sandbox Mews (api.mews-demo.com)
   - Configuration, disponibilité, tarifs, booking
   - Testé avec succès sur l'hôtel de test Mews
2. `SiteMinderProvider` (stub 5 hôtels parisiens) ✅
3. Mode multi-hotel dans l'orchestrateur ✅
4. Page `/negotiations/[id]/choose` avec comparaison ✅
5. OTA Commission Offset dans le yield engine ✅

### Semaine 6 — Shadow Mode + Rapports
1. Flag `shadow_mode` dans l'orchestrateur
   - Même flow de négociation, skip `createBooking()`
   - Log dans Supabase table `shadow_negotiations`
2. Rapport mensuel d'économies simulées
   - Payé réellement vs payé via HNP vs delta €

### Semaine 7 — Onboarding Hôtelier (20 min max)
Flow en 3 étapes :

ÉTAPE 1 — Import auto SiteMinder (5 min)
- Import types de chambre, tarifs BAR, annulation, dispo
- L'hôtel ne ressaisit rien

ÉTAPE 2 — 3 paramètres de yield (10 min)
- Floor rate (slider) : "jamais en dessous de X€"
- Remises volume (2 champs) : "X+ nuits/an → Y% remise"
- Inclusions auto (checkboxes) : WiFi / PDJ / Late checkout

ÉTAPE 3 — Simulation (5 min)
- 3 négociations simulées avec les règles configurées
- L'hôtel voit le résultat avant de lancer

### Semaine 8 — Configuration langage naturel
1. Claude API côté Hotel Agent
   - Revenue manager configure en langage naturel :
     "Remplir mes lundis/mardis en priorité"
     "Fidéliser les comptes 50+ nuits/an"
     "Pas de non-remboursable pour les nouveaux comptes"
   - Claude traduit en règles de pricing → Supabase
2. Dashboard revenue manager (supervision + ajustements)

---

## Stratégie Go-to-Market : SiteMinder + Shadow Mode

### Le problème de la poule et de l'œuf (résolu)

Un marketplace biface a besoin des deux côtés pour fonctionner.
La solution : SiteMinder comme point d'entrée unique côté hôtel.

### Phase 1 — SiteMinder comme agrégateur hôtelier

SiteMinder agrège 40 000+ hôtels avec disponibilité et tarifs temps réel.
Un seul connecteur API = accès à des milliers de propriétés.
Pas besoin de convaincre chaque hôtel individuellement.

```
SiteMinder API (40 000+ hôtels)
    │
    ▼
SiteMinderProvider (implémente HotelDataProvider)
    │
    ▼
Hotel Agent MCP Server
    │
    ▼
HNP Protocol Orchestrator
    ├── Mode LIVE      → négocie et réserve vraiment
    └── Mode SHADOW    → négocie mais ne réserve pas
                         → log les économies simulées
```

### Phase 2 — Shadow Mode côté corporate

Les corporates gardent leurs contrats annuels existants.
HNP tourne en parallèle sur les mêmes réservations.
Un rapport mensuel montre les économies qu'ils auraient réalisées.
Quand les chiffres parlent — et ils parlent — ils basculent.

**Pitch aux corporates :**
*"Gardez vos contrats. Branchez HNP en shadow mode.
Dans 30 jours on vous montre combien vous auriez économisé."*

**Pitch aux hôtels :**
*"Vos tarifs SiteMinder sont déjà là. Configurez vos règles de yield
une fois. Recevez des demandes corporate sans contrat annuel."*

### Phase 3 — Hotel Agent intelligent

Chaque hôtel a sa propre stratégie de pricing.
Le Hotel Agent devient un produit SaaS avec Claude API :

```
Hotel Agent SaaS (produit HNP côté hôtelier)
  ├── Connecteur PMS (SiteMinder, Mews, Opera...)
  ├── Stratégie de yield (configurable)
  ├── IA (Claude API) — négocie intelligemment
  └── Dashboard revenue manager — supervise & ajuste
```

### Architecture cible : protocole biface

```
┌─────────────────────────┐         ┌─────────────────────────┐
│   CORPORATE SIDE        │         │   HOTEL SIDE            │
│                         │         │                         │
│  Dashboard corporate    │         │  Dashboard hôtelier     │
│  (travel manager)       │         │  (revenue manager)      │
│         │               │         │         │               │
│  Corporate Agent        │         │  Hotel Agent            │
│  (Claude + politique)   │         │  (Claude + yield + PMS) │
└─────────┼───────────────┘         └─────────┼───────────────┘
          │        ┌──────────────┐            │
          └───────►│ HNP Protocol │◄───────────┘
                   │  • Routing   │
                   │  • Multi-bid │
                   │  • Audit     │
                   │  • Standard  │
                   └──────────────┘
```

### Business model (Visa model + tiered SaaS)

```
Hotel : abonnement SaaS + fee par booking (ou commission %)
Protocol : Kairion = propriétaire du standard
```

#### Tiers Corporate

| Plan       | Offres | Délai choix | Enrichissement            | Mode auto | Cible               |
|------------|--------|-------------|---------------------------|-----------|----------------------|
| Starter    | 3      | 30 min      | Ratings + prix + policy   | Non       | PME <50 voyageurs    |
| Business   | 5      | 60 min      | + Reviews + photos + Maps | Non       | ETI 50-200 voyageurs |
| Enterprise | 10     | 2h          | + API custom + SSO        | Oui       | Grands groupes 200+  |

Levier d'upsell : le rapport shadow montre les économies supplémentaires
avec N+2 offres → conversion Starter → Business naturelle.

#### Configuration technique des tiers

```typescript
interface NegotiationConfig {
  max_offers: number;            // 3 | 5 | 10 selon le plan
  decision_timeout_min: number;  // 30 | 60 | 120
  enrichment_level: "basic" | "full" | "premium";
  auto_confirm: boolean;         // Enterprise only
}
```

### Flow utilisateur : mode Assisted (défaut)

```
1. DEMANDE        Voyageur : "Paris, 12-15 mai"
                         │
2. BROADCAST      Corporate Agent négocie avec N hôtels en parallèle
                    │              │              │
                  Hotel A        Hotel B        Hotel C
                    │              │              │
3. ENRICHMENT     Google Places API : ratings, photos, avis, distance
                    │              │              │
4. PRÉSENTATION   3-5 offres côte à côte dans /negotiations/[id]/choose
                  + ratings + reviews + liens site hôtel
                  + countdown timer (30-60 min)
                  + badge "Best Price" / "Recommended" / "Best Rated"
                         │
5. CHOIX HUMAIN   L'utilisateur compare, visite les sites, choisit
                         │
6. CONFIRMATION   Booking confirmé sur l'offre sélectionnée
```

### Les 3 modes de l'agent Corporate

| Mode     | Comportement                                    | Usage                         |
|----------|-------------------------------------------------|-------------------------------|
| Auto     | L'IA négocie et confirme seule                   | Enterprise only, récurrent    |
| Assisted | L'IA négocie N offres, l'humain choisit (défaut) | Cas standard                  |
| Manual   | L'IA affiche les offres brutes, l'humain négocie | VIP, cas complexes            |

---

## Principes de développement

### Ce que ce projet est
- Un protocole standard de négociation B2B hôtelière (biface)
- Un marché ouvert : les corporates accèdent à tout l'inventaire en temps réel
- Le "Visa" de l'hôtellerie corporate — le protocole que les deux côtés utilisent
- Un POC/MVP destiné à convaincre partenaires, hôtels et investisseurs US

### Ce que ce projet n'est PAS (encore)
- Un produit de production avec des milliers d'utilisateurs
- Un système légalement validé pour des transactions réelles
- Une intégration complète avec tous les PMS du marché

### Règles de code
- TypeScript strict partout — pas de `any`
- Chaque message HNP est immutable et loggé
- L'interface `HotelDataProvider` est sacrée — ne pas coupler le code au mock
- Les politiques (corporate + yield) sont en YAML/JSON — jamais hardcodées
- Chaque round de négociation a un timeout de 30 secondes
- Le mode SHADOW est une feature flag — même code, `createBooking()` skip

### Priorité absolue : la démo doit impressionner
Le dashboard `/negotiations/[id]` est la carte de visite du projet.
Un prospect doit comprendre en 30 secondes ce qui se passe.
Investir du temps dans l'UX de cette page.

---

## Roadmap — Expansion par connecteurs

### Stratégie connecteurs : du local au global

```
PHASE 1 — MVP France/Belgique
  └── D-EDGE connecteur (17 000 hôtels francophones)
  └── D-EDGE est basé à Paris, forte présence FR/BE
  └── Programme partenaire + API REST documentée

PHASE 2 — Scale Europe  
  └── SiteMinder connecteur (40 000+ hôtels Europe/monde)
  └── SiteMinder est global, 150 pays
  └── developer.siteminder.com pour sandbox

PHASE 3 — US Market
  └── Amadeus / Sabre / TravelClick connecteurs
  └── Nécessaire pour les chaînes US (Marriott, Hilton, Hyatt)
```

Chaque connecteur implémente la même interface `HotelDataProvider`.
Ajouter un connecteur = un fichier, zéro changement dans le protocole.

### Timeline

```
           FR/BE (prouver)                  EU + US (scale)
           ─────────────────                ─────────────────

M0 (now)   POC fonctionnel                  —
           Dashboard live
           Démo IA-à-IA complète

M2-M4      D-EDGE Provider                  Shadow mode capte
           Shadow mode activé               automatiquement les
           3 corporates FR/BE               voyages hors FR/BE
           Rapports d'économies             → données EU "gratuites"

M4-M6      Conversion LIVE                  SiteMinder Provider
           1-2 corporates FR/BE            → 40 000 hôtels EU
           → premières transactions         2-3 corporates EU shadow
           → métriques de traction

M6-M9      Scale FR/BE : 10 corporates      Résultats shadow multi-pays
           Hotel Agent IA (Claude)          → deck investisseur
           Dashboard revenue manager        → "data-proven EU+US"

M9-M12     Lever Seed $1-2M                 Connecteurs Amadeus/Sabre
           avec data FR/BE + shadow EU      Lancer LIVE US
           Pitch : "données shadow sur      NYC + SF first
           3 marchés, 22% savings moyen"

M12-M18    Scale EU : 50+ corporates        Scale US : 10+ corporates
           Hotel Agent IA mature            Compliance SOC2
           Multi-hotel bidding

M18+       Series A avec traction           Scale mondial
           bimarché EU+US                   Asie, Moyen-Orient
```

### Adaptations techniques pour le multi-marché

```
Composant           Adaptation                      Effort
─────────────────   ──────────────────────────────   ──────
Messages HNP        Ajouter currency (EUR/USD/GBP)  Trivial
Travel Policy       max_rate par ville (déjà fait)  0
Yield Engine        Par hôtel (déjà agnostique)     0
D-EDGE/SiteMinder   Même interface HotelDataProvider 0
Dashboard           i18n (FR/EN) + devise affichée  Moyen
Audit Trail         Multi-devise dans les rapports  Faible
Rapports Shadow     Agrégation par marché/devise    Moyen
```

### Le pitch investisseur qui en découle

Ne pas dire : "On a un pilote en France, on veut lever pour aller aux US."

Dire : "On a des données shadow sur 3 marchés — Paris, Londres, New York —
qui montrent 22% d'économies moyennes sur 450 réservations simulées.
Le protocole est prouvé transatlantique. On lève pour convertir le live."

C'est un pitch Seed, pas pré-seed.

---

## Contact et contexte

Projet développé par Steve Ambassa sous Kairion (Bruxelles/La Louvière, BE).
Background : BCG (stratégie Afrique/MEA) · Aviation (Gadair Airlines) ·
Hôtellerie (Pullman Brussels Midi 220ch · Montempô Paris 136 units).
Stack principale : Next.js · Supabase · Vercel · Claude Code · GitHub.
