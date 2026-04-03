# Spécification HNP — Hotel Negotiation Protocol v0.1

## Vue d'ensemble

Le HNP est un protocole de communication standardisé entre deux agents IA :
- **Agent Corporate** : représente le travel manager d'une entreprise
- **Agent Hôtelier** : représente le revenue manager d'un hôtel ou groupe

## Flow de négociation

```
Corporate Agent                    Hotel Agent
     |                                  |
     |──── TRAVEL_INTENT ─────────────>|
     |                                  | (calcule offre selon yield rules)
     |<─── HOTEL_OFFER ─────────────── |
     |                                  |
     | (compare à la politique)         |
     |                                  |
     |──── COUNTER_PROPOSAL ──────────>|  (optionnel, max 2 rounds)
     |<─── HOTEL_OFFER (modifiée) ──── |  (optionnel)
     |                                  |
     |──── CONFIRMATION ──────────────>|
     |<─── CONFIRMATION ─────────────  |
     |                                  |
   [Audit trail Supabase]
```

## Règles du protocole

1. Chaque négociation a un `request_id` UUID unique
2. Maximum 2 rounds de contre-proposition
3. Chaque offre a une durée de validité (défaut : 15 minutes)
4. Un timeout déclenche l'escalade humaine
5. Toute la séquence est loggée avec timestamps précis
6. Le hash SHA256 final garantit l'intégrité de l'audit trail

## Critères d'acceptation automatique

L'agent corporate accepte automatiquement si :
- Tarif ≤ plafond politique ET
- Politique d'annulation respectée ET
- Tier ESG minimum respecté

L'agent corporate contre-propose si :
- Tarif dans la fourchette [-20%, 0%] du plafond ET
- Au moins 1 critère non respecté (inclusions, annulation)

L'agent corporate refuse si :
- Tarif > plafond politique de +20% ou plus
- Tier ESG insuffisant
- Politique d'annulation incompatible

## Escalade humaine

Déclenché si :
- Aucun accord après 2 rounds
- Timeout de l'agent hôtelier
- Tarif final > politique même après contre-proposition
- Erreur technique
