#!/usr/bin/env node

/**
 * Corporate Agent — CLI Entry Point
 *
 * Usage :
 *   node dist/index.js                          → Démo avec trigger par défaut
 *   node dist/index.js --verbose                 → Avec logs détaillés
 *   node dist/index.js --traveler "Sophie Chen" \
 *     --destination Paris \
 *     --check-in 2026-06-10 \
 *     --check-out 2026-06-13 \
 *     --purpose "Réunion client Q3"
 */

import { config } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../../.env.local") });
config({ path: resolve(__dirname, "../../../.env") });

import { runNegotiation, type NegotiationResult } from "./agent.js";
import type { TravelRequestTrigger } from "@hnp/protocol";

function parseArgs(argv: string[]): {
  trigger: TravelRequestTrigger;
  verbose: boolean;
} {
  const args = argv.slice(2);
  let verbose = false;
  let traveler = "Paul Martin";
  let destination = "Paris";
  let check_in = "2026-05-12";
  let check_out = "2026-05-15";
  let purpose: string | undefined = "Rendez-vous client — prospection Q2";

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--verbose":
      case "-v":
        verbose = true;
        break;
      case "--traveler":
        traveler = args[++i];
        break;
      case "--destination":
        destination = args[++i];
        break;
      case "--check-in":
        check_in = args[++i];
        break;
      case "--check-out":
        check_out = args[++i];
        break;
      case "--purpose":
        purpose = args[++i];
        break;
    }
  }

  return {
    trigger: { traveler, destination, check_in, check_out, purpose },
    verbose,
  };
}

function printHeader(trigger: TravelRequestTrigger): void {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║         HNP — Corporate Agent Negotiation              ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  console.log(`  Voyageur    : ${trigger.traveler}`);
  console.log(`  Destination : ${trigger.destination}`);
  console.log(`  Dates       : ${trigger.check_in} → ${trigger.check_out}`);
  if (trigger.purpose) {
    console.log(`  Motif       : ${trigger.purpose}`);
  }
  console.log("\n─────────────────────────────────────────────────────────\n");
}

function printResult(result: NegotiationResult): void {
  console.log("\n═════════════════════════════════════════════════════════");
  console.log("                    RÉSULTAT");
  console.log("═════════════════════════════════════════════════════════\n");

  const statusIcon =
    result.status === "CONFIRMED"
      ? "✓"
      : result.status === "ESCALATED"
        ? "⚠"
        : "✗";

  console.log(`  Statut       : ${statusIcon} ${result.status}`);
  console.log(`  Request ID   : ${result.request_id}`);
  if (result.final_rate_eur !== undefined) {
    console.log(`  Tarif final  : ${result.final_rate_eur}€/nuit`);
  }
  console.log(`  Rounds       : ${result.rounds}`);
  if (result.savings_pct !== undefined) {
    console.log(`  Économie     : ${result.savings_pct}%`);
  }
  console.log(`  Raison       : ${result.reason}`);

  // Print transcript summary
  const toolCalls = result.transcript.filter((t) => t.tool_name);
  if (toolCalls.length > 0) {
    console.log(`\n  Outils appelés (${toolCalls.length}) :`);
    for (const call of toolCalls) {
      console.log(`    → ${call.tool_name}`);
    }
  }

  console.log("\n═════════════════════════════════════════════════════════\n");
}

async function main(): Promise<void> {
  const { trigger, verbose } = parseArgs(process.argv);

  printHeader(trigger);

  console.log("Lancement de la négociation...\n");

  const result = await runNegotiation(trigger, { verbose });

  printResult(result);

  process.exit(result.status === "CONFIRMED" ? 0 : 1);
}

main().catch((err) => {
  console.error("\n❌ Erreur fatale:", err instanceof Error ? err.message : err);
  process.exit(2);
});
