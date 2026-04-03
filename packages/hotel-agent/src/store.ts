/**
 * Store en mémoire pour les offres et réservations actives.
 * POC uniquement — remplacé par Supabase en MVP.
 */

import type {
  OfferResponse,
  BookingConfirmationResponse,
  RoomType,
} from "@hnp/protocol";

export interface ActiveOffer extends OfferResponse {
  check_in: string;
  check_out: string;
  created_at: string;
}

export interface Booking extends BookingConfirmationResponse {
  corporate_name: string;
  traveler_name: string;
  traveler_email: string;
  payment_method: string;
  created_at: string;
}

class Store {
  private offers = new Map<string, ActiveOffer>();
  private bookings = new Map<string, Booking>();
  private occupancy = new Map<string, number>();

  // ─── Offers ──────────────────────────────────────────────────────────

  saveOffer(offer: ActiveOffer): void {
    this.offers.set(offer.request_id, offer);
  }

  getOffer(request_id: string): ActiveOffer | undefined {
    const offer = this.offers.get(request_id);
    if (!offer) return undefined;
    if (new Date(offer.validity_expires) < new Date()) {
      this.offers.delete(request_id);
      return undefined;
    }
    return offer;
  }

  updateOffer(request_id: string, updates: Partial<ActiveOffer>): ActiveOffer | undefined {
    const offer = this.getOffer(request_id);
    if (!offer) return undefined;
    const updated = { ...offer, ...updates };
    this.offers.set(request_id, updated);
    return updated;
  }

  deleteOffer(request_id: string): void {
    this.offers.delete(request_id);
  }

  // ─── Bookings ────────────────────────────────────────────────────────

  saveBooking(booking: Booking): void {
    this.bookings.set(booking.request_id, booking);
  }

  getBooking(request_id: string): Booking | undefined {
    return this.bookings.get(request_id);
  }

  // ─── Occupancy (mock) ────────────────────────────────────────────────

  /**
   * Simule le taux d'occupation pour une date donnée.
   * En POC on génère un taux pseudo-aléatoire basé sur la date.
   */
  getOccupancy(date: string): number {
    const cached = this.occupancy.get(date);
    if (cached !== undefined) return cached;

    const d = new Date(date);
    const month = d.getMonth() + 1;
    const dayOfWeek = d.getDay();

    let base = 55;
    // Week-ends plus chargés
    if (dayOfWeek === 5 || dayOfWeek === 6) base += 15;
    // Haute saison
    if ([7, 8, 12].includes(month)) base += 20;
    // Basse saison
    if ([1, 2, 11].includes(month)) base -= 15;
    // Variation pseudo-aléatoire basée sur le jour
    const hash = (d.getDate() * 7 + month * 13) % 20 - 10;
    const occupancy = Math.max(10, Math.min(98, base + hash));

    this.occupancy.set(date, occupancy);
    return occupancy;
  }

  // ─── Count booked rooms for a given type/date range ──────────────────

  countBookedRooms(room_type: RoomType, check_in: string, check_out: string): number {
    let count = 0;
    for (const booking of this.bookings.values()) {
      if (
        booking.room_type === room_type &&
        booking.check_in < check_out &&
        booking.check_out > check_in
      ) {
        count++;
      }
    }
    return count;
  }
}

export const store = new Store();
