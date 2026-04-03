#!/usr/bin/env node

/**
 * Hotel Agent — MCP Server
 *
 * Expose l'inventaire et les capacités de négociation
 * du Marais Boutique Hotel via le Model Context Protocol.
 *
 * 6 outils :
 * 1. hotel_check_availability
 * 2. hotel_get_rates
 * 3. hotel_make_offer
 * 4. hotel_counter_respond
 * 5. hotel_confirm_booking
 * 6. hotel_get_policy
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import type {
  RoomType,
  OfferResponse,
  EsgTier,
} from "@hnp/protocol";

import { MockHotelProvider } from "./mock-provider.js";
import { store } from "./store.js";

const provider = new MockHotelProvider();

const server = new McpServer({
  name: "hotel-agent",
  version: "0.1.0",
});

// ─── Tool 1 : hotel_check_availability ───────────────────────────────────────

server.tool(
  "hotel_check_availability",
  "Vérifie la disponibilité des chambres pour des dates données. " +
    "Retourne le nombre de chambres disponibles par type.",
  {
    check_in: z.string().describe("Date d'arrivée (YYYY-MM-DD)"),
    check_out: z.string().describe("Date de départ (YYYY-MM-DD)"),
    room_type: z
      .enum(["standard", "superior", "suite"])
      .optional()
      .describe("Type de chambre (défaut: standard)"),
    guests: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("Nombre de voyageurs (défaut: 1)"),
  },
  async ({ check_in, check_out, room_type, guests }) => {
    const result = await provider.getAvailability({
      check_in,
      check_out,
      room_type,
      guests,
    });

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  },
);

// ─── Tool 2 : hotel_get_rates ────────────────────────────────────────────────

server.tool(
  "hotel_get_rates",
  "Obtient les tarifs ajustés pour un type de chambre et des dates. " +
    "Applique le moteur de yield (saison, occupation, durée, corporate).",
  {
    check_in: z.string().describe("Date d'arrivée (YYYY-MM-DD)"),
    check_out: z.string().describe("Date de départ (YYYY-MM-DD)"),
    room_type: z
      .enum(["standard", "superior", "suite"])
      .describe("Type de chambre"),
    corporate_id: z
      .string()
      .optional()
      .describe("ID compte corporate pour tarif négocié"),
  },
  async ({ check_in, check_out, room_type, corporate_id }) => {
    const result = await provider.getRates({
      check_in,
      check_out,
      room_type,
      corporate_id,
    });

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  },
);

// ─── Tool 3 : hotel_make_offer ───────────────────────────────────────────────

server.tool(
  "hotel_make_offer",
  "Crée une offre formelle en réponse à une requête HNP. " +
    "L'offre a une durée de validité limitée.",
  {
    request_id: z.string().describe("ID de la requête HNP entrante"),
    rate_eur: z.number().positive().describe("Tarif proposé en EUR/nuit"),
    room_type: z
      .enum(["standard", "superior", "suite"])
      .describe("Type de chambre proposé"),
    check_in: z.string().describe("Date d'arrivée (YYYY-MM-DD)"),
    check_out: z.string().describe("Date de départ (YYYY-MM-DD)"),
    inclusions: z
      .array(z.string())
      .describe('Services inclus (ex: ["wifi", "breakfast", "parking"])'),
    cancellation_policy: z
      .string()
      .describe("Politique d'annulation appliquée"),
    validity_minutes: z
      .number()
      .int()
      .positive()
      .describe("Durée de validité de l'offre en minutes"),
  },
  async ({
    request_id,
    rate_eur,
    room_type,
    check_in,
    check_out,
    inclusions,
    cancellation_policy,
    validity_minutes,
  }) => {
    const hotelData = await provider.getHotelData();
    const validity_expires = new Date(
      Date.now() + validity_minutes * 60 * 1000,
    ).toISOString();

    const offer: OfferResponse = {
      request_id,
      hotel_id: hotelData.hotel_id,
      rate_eur,
      room_type: room_type as RoomType,
      inclusions,
      cancellation_policy,
      validity_expires,
      esg_tier: hotelData.esg_tier as EsgTier,
    };

    store.saveOffer({
      ...offer,
      check_in,
      check_out,
      created_at: new Date().toISOString(),
    });

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(offer, null, 2),
        },
      ],
    };
  },
);

// ─── Tool 4 : hotel_counter_respond ──────────────────────────────────────────

server.tool(
  "hotel_counter_respond",
  "Répond à une contre-proposition du corporate agent. " +
    "Peut accepter, refuser ou modifier l'offre.",
  {
    request_id: z.string().describe("ID de la requête HNP"),
    accept: z.boolean().describe("Accepter la contre-proposition"),
    modified_rate_eur: z
      .number()
      .positive()
      .optional()
      .describe("Nouveau tarif si modification"),
    modified_inclusions: z
      .array(z.string())
      .optional()
      .describe("Nouvelles inclusions si modification"),
    modified_cancellation: z
      .string()
      .optional()
      .describe("Nouvelle politique d'annulation si modification"),
    reason: z
      .string()
      .optional()
      .describe("Justification de la réponse"),
  },
  async ({
    request_id,
    accept,
    modified_rate_eur,
    modified_inclusions,
    modified_cancellation,
    reason,
  }) => {
    const existingOffer = store.getOffer(request_id);

    if (!existingOffer) {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              error: "Offre introuvable ou expirée",
              request_id,
            }),
          },
        ],
        isError: true,
      };
    }

    if (accept) {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                request_id,
                accepted: true,
                offer: existingOffer,
                reason: reason ?? "Contre-proposition acceptée",
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    // Modifier l'offre
    const updates: Partial<typeof existingOffer> = {};
    if (modified_rate_eur !== undefined) updates.rate_eur = modified_rate_eur;
    if (modified_inclusions !== undefined) updates.inclusions = modified_inclusions;
    if (modified_cancellation !== undefined) updates.cancellation_policy = modified_cancellation;

    // Prolonger la validité de 15 minutes
    updates.validity_expires = new Date(
      Date.now() + 15 * 60 * 1000,
    ).toISOString();

    const updatedOffer = store.updateOffer(request_id, updates);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              request_id,
              accepted: false,
              modified_offer: updatedOffer,
              reason: reason ?? "Offre modifiée",
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

// ─── Tool 5 : hotel_confirm_booking ──────────────────────────────────────────

server.tool(
  "hotel_confirm_booking",
  "Confirme une réservation à partir d'une offre acceptée. " +
    "Génère une référence de réservation unique.",
  {
    request_id: z.string().describe("ID de la requête HNP"),
    corporate_id: z.string().describe("ID du compte corporate"),
    company_name: z.string().describe("Nom de l'entreprise"),
    traveler_name: z.string().describe("Nom du voyageur"),
    traveler_email: z.string().email().describe("Email du voyageur"),
    payment_method: z
      .string()
      .describe('Méthode de paiement (ex: "corporate_card", "invoice")'),
  },
  async ({
    request_id,
    corporate_id,
    company_name,
    traveler_name,
    traveler_email,
    payment_method,
  }) => {
    const offer = store.getOffer(request_id);

    if (!offer) {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              error: "Offre introuvable ou expirée. Impossible de confirmer.",
              request_id,
            }),
          },
        ],
        isError: true,
      };
    }

    const result = await provider.createBooking({
      request_id,
      hotel_id: offer.hotel_id,
      room_type: offer.room_type,
      check_in: offer.check_in,
      check_out: offer.check_out,
      rate_eur: offer.rate_eur,
      inclusions: offer.inclusions,
      cancellation_policy: offer.cancellation_policy,
      corporate_details: {
        corporate_id,
        company_name,
        traveler_name,
        traveler_email,
      },
      payment_method,
    });

    // Retirer l'offre active
    store.deleteOffer(request_id);

    const booking = store.getBooking(request_id);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              ...result,
              booking_details: booking
                ? {
                    hotel_id: booking.hotel_id,
                    room_type: booking.room_type,
                    check_in: booking.check_in,
                    check_out: booking.check_out,
                    final_rate_eur: booking.final_rate_eur,
                    inclusions: booking.inclusions,
                    cancellation_policy: booking.cancellation_policy,
                  }
                : undefined,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

// ─── Tool 6 : hotel_get_policy ───────────────────────────────────────────────

server.tool(
  "hotel_get_policy",
  "Retourne la politique de l'hôtel (annulation, corporate, paiement, yield).",
  {
    policy_type: z
      .enum(["cancellation", "corporate", "payment", "yield"])
      .describe("Type de politique à consulter"),
  },
  async ({ policy_type }) => {
    const hotelData = await provider.getHotelData();

    let rules: Record<string, unknown>;

    switch (policy_type) {
      case "cancellation":
        rules = hotelData.cancellation_policies;
        break;

      case "corporate":
        rules = {
          accounts: hotelData.corporate_accounts.map((a) => ({
            corporate_id: a.corporate_id,
            company: a.company,
            tier: a.tier,
            discount_pct: a.negotiated_discount_pct,
          })),
          auto_inclusions: hotelData.auto_inclusions_for_corporate,
        };
        break;

      case "payment":
        rules = {
          accepted_methods: [
            "corporate_card",
            "invoice_30_days",
            "prepaid",
          ],
          currency: "EUR",
          deposit_required: false,
          vat_rate_pct: 10,
        };
        break;

      case "yield": {
        const yieldRules = await provider.getYieldRules();
        rules = {
          yield_rules: yieldRules.rules,
          floor_rate_eur: hotelData.yield_rules.floor_rate_eur,
          max_discount_total_pct: hotelData.yield_rules.max_discount_total_pct,
        };
        break;
      }
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              policy_type,
              hotel_id: hotelData.hotel_id,
              hotel_name: hotelData.name,
              rules,
              last_updated: new Date().toISOString(),
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

// ─── Start ───────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Hotel Agent MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
