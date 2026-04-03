#!/usr/bin/env tsx
/**
 * HNP Platform — Script de démonstration
 * Lance une négociation complète entre l'agent corporate et l'agent hôtelier
 * Usage: npm run demo [--verbose]
 */

const verbose = process.argv.includes('--verbose')

function log(msg: string, data?: unknown) {
  const ts = new Date().toISOString().split('T')[1].slice(0, 12)
  console.log(`[${ts}] ${msg}`)
  if (verbose && data) console.log(JSON.stringify(data, null, 2))
}

async function runDemo() {
  console.log('\n' + '═'.repeat(60))
  console.log('  HNP Platform — Démonstration de négociation IA-à-IA')
  console.log('═'.repeat(60) + '\n')

  // Scénario : Paul Martin de TechCorp SAS a une réunion à Paris
  const travelRequest = {
    traveler_id: 'T001',
    traveler_name: 'Paul Martin',
    destination: 'Paris',
    check_in: '2026-05-12',
    check_out: '2026-05-15',
    purpose: 'Réunion client Société Générale',
    nights: 3
  }

  log('🏢 AGENT CORPORATE — Déclencheur de voyage détecté', travelRequest)
  console.log()

  // Étape 1 : TRAVEL_INTENT
  log('📤 [Round 1] Agent Corporate → Agent Hôtelier : TRAVEL_INTENT')
  const intent = {
    type: 'TRAVEL_INTENT',
    request_id: 'hnp-' + Math.random().toString(36).slice(2, 10),
    timestamp: new Date().toISOString(),
    corporate_id: 'TC-2026-001',
    destination: 'Paris 3ème',
    check_in: travelRequest.check_in,
    check_out: travelRequest.check_out,
    travelers: 1,
    policy_snapshot: {
      max_rate: 180,
      requirements: ['cancellation_24h_free', 'esg_tier_B_min', 'wifi']
    },
    volume_signal: {
      nights_ytd: 47,
      loyalty_tier: 'gold'
    }
  }
  if (verbose) console.log(JSON.stringify(intent, null, 2))
  await sleep(800)

  // Étape 2 : HOTEL_OFFER
  log('📥 [Round 1] Agent Hôtelier → Agent Corporate : HOTEL_OFFER')
  const offer1 = {
    type: 'HOTEL_OFFER',
    request_id: intent.request_id,
    timestamp: new Date().toISOString(),
    hotel_id: 'LMBH-PARIS-001',
    hotel_name: 'Le Marais Boutique Hotel',
    rate_eur: 164,
    room_type: 'standard',
    inclusions: ['wifi', 'late_checkout_12h'],
    cancellation_policy: 'Annulation gratuite jusqu\'à 18h avant arrivée',
    validity_expires: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    loyalty_points: 820,
    esg_tier: 'A',
    yield_applied: 'compte_gold_-12pct_volume'
  }
  if (verbose) console.log(JSON.stringify(offer1, null, 2))
  console.log(`   → Tarif proposé : ${offer1.rate_eur}€/nuit (budget max : 180€)`)
  console.log(`   → Annulation : ${offer1.cancellation_policy}`)
  console.log(`   → Inclusions : ${offer1.inclusions.join(', ')}`)
  await sleep(600)

  // Étape 3 : COUNTER_PROPOSAL (politique demande 24h, offre dit 18h)
  log('📤 [Round 2] Agent Corporate → Agent Hôtelier : COUNTER_PROPOSAL')
  const counter = {
    type: 'COUNTER_PROPOSAL',
    request_id: intent.request_id,
    timestamp: new Date().toISOString(),
    accept_rate: true,
    requested_modifications: {
      cancellation: 'Annulation gratuite jusqu\'à 24h avant arrivée',
      inclusions: ['wifi', 'late_checkout_12h', 'breakfast_1_morning']
    },
    justification: 'Compte Gold TC-2026-001 · 47 nuits YTD · politique corporate exige annulation 24h',
    round_number: 1
  }
  if (verbose) console.log(JSON.stringify(counter, null, 2))
  console.log(`   → Tarif accepté : ${offer1.rate_eur}€ ✓`)
  console.log(`   → Demande : annulation portée à 24h + 1 petit-déjeuner`)
  await sleep(700)

  // Étape 4 : HOTEL_OFFER modifiée
  log('📥 [Round 2] Agent Hôtelier → Agent Corporate : HOTEL_OFFER (modifiée)')
  const offer2 = {
    type: 'HOTEL_OFFER',
    request_id: intent.request_id,
    timestamp: new Date().toISOString(),
    hotel_id: 'LMBH-PARIS-001',
    rate_eur: 164,
    room_type: 'standard',
    inclusions: ['wifi', 'late_checkout_12h', 'breakfast_day_1'],
    cancellation_policy: 'Annulation gratuite jusqu\'à 24h avant arrivée ✓',
    validity_expires: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    loyalty_points: 820,
    esg_tier: 'A'
  }
  if (verbose) console.log(JSON.stringify(offer2, null, 2))
  console.log(`   → Annulation portée à 24h ✓`)
  console.log(`   → Petit-déjeuner J1 inclus ✓`)
  console.log(`   → Tarif maintenu : ${offer2.rate_eur}€/nuit`)
  await sleep(500)

  // Étape 5 : CONFIRMATION
  log('✅ CONFIRMATION — Négociation conclue')
  const confirmation = {
    type: 'CONFIRMATION',
    request_id: intent.request_id,
    timestamp: new Date().toISOString(),
    booking_ref: 'LMBH-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    hotel: 'Le Marais Boutique Hotel, Paris 3ème',
    traveler: 'Paul Martin (TechCorp SAS)',
    check_in: travelRequest.check_in,
    check_out: travelRequest.check_out,
    nights: 3,
    final_rate_eur: offer2.rate_eur,
    total_eur: offer2.rate_eur * 3,
    final_inclusions: offer2.inclusions,
    final_cancellation: '24h free',
    payment_method: 'lodged_card_TC-2026-001',
    audit_hash: 'sha256:' + Math.random().toString(36).slice(2, 34),
    negotiation_summary: {
      total_rounds: 2,
      initial_offer_eur: 164,
      final_rate_eur: 164,
      vs_budget_max: '164€ / 180€ = -9% sous plafond',
      vs_public_rate: '164€ vs ~195€ public = -16% économie',
      duration_seconds: 2.1,
      human_intervention: false
    }
  }

  console.log()
  console.log('┌─────────────────────────────────────────────┐')
  console.log('│         RÉSERVATION CONFIRMÉE               │')
  console.log('├─────────────────────────────────────────────┤')
  console.log(`│  Ref     : ${confirmation.booking_ref}                   │`)
  console.log(`│  Hôtel   : Le Marais Boutique Hotel         │`)
  console.log(`│  Voyag.  : Paul Martin                      │`)
  console.log(`│  Dates   : ${confirmation.check_in} → ${confirmation.check_out}  │`)
  console.log(`│  Tarif   : ${confirmation.final_rate_eur}€/nuit × 3 = ${confirmation.total_eur}€     │`)
  console.log(`│  Annul.  : Gratuite jusqu\'à 24h             │`)
  console.log(`│  Inclus  : WiFi · Late checkout · PDJ J1   │`)
  console.log('├─────────────────────────────────────────────┤')
  console.log(`│  Durée négociation : ${confirmation.negotiation_summary.duration_seconds}s · 2 rounds        │`)
  console.log(`│  Économie : -16% vs tarif public            │`)
  console.log(`│  Humain impliqué : ❌ ZÉRO                  │`)
  console.log('└─────────────────────────────────────────────┘')

  if (verbose) {
    console.log('\nAudit trail complet :')
    console.log(JSON.stringify(confirmation, null, 2))
  }

  console.log('\n🎯 Prochaine étape : npm run dev → ouvrir http://localhost:3000\n')
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

runDemo().catch(console.error)
