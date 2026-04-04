"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { offerComparison, type HotelOffer } from "@/lib/mock-data";
import { supabase } from "@/lib/supabase";

function formatCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) return "00:00";
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const badgeConfig: Record<string, { label: string; bg: string; icon: string }> = {
  best_price: { label: "Best Price", bg: "bg-green-500", icon: "fa-tag" },
  recommended: { label: "Recommended", bg: "bg-navy-800", icon: "fa-star" },
  best_rated: { label: "Best Rated", bg: "bg-amber-500", icon: "fa-trophy" },
};

const categoryStars: Record<string, number> = {
  "3_star": 3,
  "4_star": 4,
  "5_star": 5,
};

export default function ChooseOfferPage() {
  const router = useRouter();

  // Try to load live offers from sessionStorage, fallback to mock
  const [data, setData] = useState(offerComparison);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("rateflow_live_offers");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.offers && parsed.offers.length > 0) {
          setData({
            negotiation_id: parsed.negotiation_id ?? "LIVE",
            traveler: parsed.traveler ?? "Traveler",
            destination: parsed.destination ?? "Paris",
            check_in: parsed.check_in ?? "",
            check_out: parsed.check_out ?? "",
            nights: parsed.nights ?? 1,
            budget: parsed.budget ?? 180,
            decision_timeout_min: parsed.decision_timeout_min ?? 30,
            created_at: new Date().toISOString(),
            offers: parsed.offers as HotelOffer[],
          });
          setIsLive(true);
        }
      }
    } catch {
      // Use mock data
    }
  }, []);

  // Decision countdown (30 min = 1800s)
  const [countdown, setCountdown] = useState(data.decision_timeout_min * 60);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  useEffect(() => {
    if (confirmed) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [confirmed]);

  const expired = countdown <= 0;
  const urgent = countdown < 300; // < 5 min

  async function handleConfirm() {
    if (!selectedId) return;
    const offer = data.offers.find((o) => o.id === selectedId);
    if (!offer) return;

    setConfirming(true);

    const ref = `BK-${offer.hotel_id.slice(0, 4)}-${Date.now().toString(36).toUpperCase().slice(-6)}`;

    if (isLive) {
      try {
        const payload = {
          type: "CONFIRMATION" as const,
          request_id: data.negotiation_id,
          booking_ref: ref,
          hotel_id: offer.hotel_id,
          hotel_name: offer.hotel_name,
          final_rate: offer.rate_eur,
          room_type: offer.room_type,
          inclusions: offer.inclusions,
          cancellation: offer.cancellation,
          confirmed_at: new Date().toISOString(),
        };

        const hashBuffer = await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(JSON.stringify(payload)),
        );
        const sha256 = Array.from(new Uint8Array(hashBuffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        const [updateRes, insertRes] = await Promise.all([
          supabase
            .from("negotiations")
            .update({
              status: "confirmed",
              selected_hotel: offer.hotel_name,
              selected_hotel_id: offer.hotel_id,
              final_rate: offer.rate_eur,
              savings_pct: offer.savings_vs_budget_pct,
              booking_ref: ref,
              completed_at: new Date().toISOString(),
            })
            .eq("id", data.negotiation_id),
          supabase.from("audit_entries").insert({
            negotiation_id: data.negotiation_id,
            booking_ref: ref,
            message_type: "CONFIRMATION",
            audit_hash: sha256,
            payload,
            account: "TechCorp SAS",
            hotel: offer.hotel_name,
            location: data.destination,
            final_rate: offer.rate_eur,
            savings: data.budget - offer.rate_eur,
          }),
        ]);

        if (updateRes.error) console.error("Negotiation update error:", updateRes.error);
        if (insertRes.error) console.error("Audit insert error:", insertRes.error);
      } catch (err) {
        console.error("Supabase persistence error:", err);
      }
    }

    setBookingRef(ref);
    setConfirmed(true);
    setConfirming(false);
  }

  const selectedOffer = data.offers.find((o) => o.id === selectedId);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <Link href="/negotiations" className="hover:text-navy-800 transition-colors">Negotiations</Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
        <Link href={`/negotiations/${data.negotiation_id}`} className="hover:text-navy-800 transition-colors">{data.negotiation_id}</Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
        <span className="text-slate-900 font-medium">Choose Offer</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Choose Your Hotel</h1>
          <p className="text-sm text-slate-500 mt-1">
            {data.traveler} &middot; {data.destination} &middot; {data.check_in} → {data.check_out} &middot; {data.nights} night{data.nights !== 1 ? "s" : ""} &middot; Budget: {data.budget}€/night
          </p>
        </div>

        {/* Timer */}
        {!confirmed && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
            expired ? "bg-red-50 border-red-200 text-red-700" :
            urgent ? "bg-amber-50 border-amber-200 text-amber-700" :
            "bg-white border-slate-200 text-slate-700"
          } shadow-soft`}>
            <i className={`fa-solid fa-stopwatch text-sm ${expired ? "text-red-500" : urgent ? "text-amber-500" : "text-navy-600"}`} />
            {expired ? (
              <span className="text-sm font-bold">Offers Expired</span>
            ) : (
              <>
                <span className="text-sm font-mono font-bold">{formatCountdown(countdown)}</span>
                <span className="text-xs text-slate-400">remaining</span>
              </>
            )}
          </div>
        )}

        {confirmed && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 shadow-soft">
            <i className="fa-solid fa-circle-check text-sm" />
            <span className="text-sm font-bold">Booking Confirmed</span>
          </div>
        )}
      </div>

      {/* Negotiation summary bar */}
      <div className="flex items-center gap-6 mb-8 p-4 bg-white rounded-[16px] border border-slate-200 shadow-soft">
        <div className="flex items-center gap-2 text-sm">
          <i className="fa-solid fa-robot text-navy-600" />
          <span className="text-slate-500">Negotiated by AI in</span>
          <span className="font-semibold text-slate-900">
            {Math.round(data.offers.reduce((sum, o) => sum + o.negotiation_duration_s, 0) * 10) / 10}s total
          </span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-2 text-sm">
          <i className="fa-solid fa-shield-check text-green-600" />
          <span className="text-slate-500">Policy compliance:</span>
          <span className="font-semibold text-green-600">
            {data.offers.filter((o) => o.policy_compliant).length}/{data.offers.length} compliant
          </span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-2 text-sm">
          <i className="fa-solid fa-user-xmark text-slate-400" />
          <span className="text-slate-500">Human intervention:</span>
          <span className="font-semibold text-slate-900">None</span>
        </div>
      </div>

      {/* Offer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {data.offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            budget={data.budget}
            nights={data.nights}
            selected={selectedId === offer.id}
            confirmed={confirmed}
            disabled={expired && !confirmed}
            onSelect={() => !confirmed && !expired && setSelectedId(offer.id)}
          />
        ))}
      </div>

      {/* Action Bar */}
      {!confirmed && !expired && (
        <div className="flex items-center justify-between p-6 bg-white rounded-[16px] border border-slate-200 shadow-soft">
          <div>
            {selectedOffer ? (
              <p className="text-sm text-slate-700">
                Selected: <strong>{selectedOffer.hotel_name}</strong> — {selectedOffer.rate_eur}€/night × {data.nights} = <strong>{selectedOffer.rate_eur * data.nights}€ total</strong>
              </p>
            ) : (
              <p className="text-sm text-slate-500">Select an offer to continue</p>
            )}
          </div>
          <button
            onClick={handleConfirm}
            disabled={!selectedId || confirming}
            className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all ${
              selectedId && !confirming
                ? "bg-navy-800 text-white hover:bg-navy-700 shadow-soft"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {confirming ? (
              <><i className="fa-solid fa-spinner fa-spin mr-2" />Confirming...</>
            ) : (
              <><i className="fa-solid fa-check mr-2" />Confirm Booking</>
            )}
          </button>
        </div>
      )}

      {/* Confirmed state */}
      {confirmed && selectedOffer && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-[16px]">
          <div className="flex items-center gap-3 mb-3">
            <i className="fa-solid fa-circle-check text-green-600 text-xl" />
            <h3 className="text-lg font-bold text-green-800">Booking Confirmed</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <p className="text-green-600 text-xs uppercase font-semibold mb-1">Booking Ref</p>
              <p className="font-semibold text-green-900 font-mono text-xs">{bookingRef ?? "---"}</p>
            </div>
            <div>
              <p className="text-green-600 text-xs uppercase font-semibold mb-1">Hotel</p>
              <p className="font-semibold text-green-900">{selectedOffer.hotel_name}</p>
            </div>
            <div>
              <p className="text-green-600 text-xs uppercase font-semibold mb-1">Rate</p>
              <p className="font-semibold text-green-900">{selectedOffer.rate_eur}€/night</p>
            </div>
            <div>
              <p className="text-green-600 text-xs uppercase font-semibold mb-1">Total</p>
              <p className="font-semibold text-green-900">{selectedOffer.rate_eur * data.nights}€</p>
            </div>
            <div>
              <p className="text-green-600 text-xs uppercase font-semibold mb-1">Savings</p>
              <p className="font-semibold text-green-900">{selectedOffer.savings_vs_budget_pct}% vs budget</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/negotiations"
              className="text-sm font-medium text-green-700 hover:text-green-900 transition-colors"
            >
              <i className="fa-solid fa-arrow-left mr-1" />
              Back to Negotiations
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Offer Card Component ────────────────────────────────────────────────────

function OfferCard({
  offer,
  budget,
  nights,
  selected,
  confirmed,
  disabled,
  onSelect,
}: {
  offer: HotelOffer;
  budget: number;
  nights: number;
  selected: boolean;
  confirmed: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  const badge = offer.badge ? badgeConfig[offer.badge] : null;
  const stars = categoryStars[offer.category] ?? 3;
  const isChosen = confirmed && selected;

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-[16px] border-2 p-0 overflow-hidden transition-all cursor-pointer ${
        isChosen
          ? "border-green-500 shadow-lg ring-2 ring-green-200"
          : selected
            ? "border-navy-600 shadow-lg ring-2 ring-navy-100"
            : disabled
              ? "border-slate-200 opacity-60 cursor-not-allowed"
              : "border-slate-200 hover:border-navy-300 hover:shadow-soft"
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className={`absolute top-4 left-4 z-10 ${badge.bg} text-white text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1 flex items-center gap-1.5 shadow-md`}>
          <i className={`fa-solid ${badge.icon} text-[9px]`} />
          {badge.label}
        </div>
      )}

      {/* Selected indicator */}
      {(selected || isChosen) && (
        <div className={`absolute top-4 right-4 z-10 w-7 h-7 rounded-full ${isChosen ? "bg-green-500" : "bg-navy-800"} text-white flex items-center justify-center shadow-md`}>
          <i className="fa-solid fa-check text-xs" />
        </div>
      )}

      {/* Photo */}
      <div className="h-44 bg-slate-100 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={offer.photo_url}
          alt={offer.hotel_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: stars }).map((_, i) => (
              <i key={i} className="fa-solid fa-star text-amber-400 text-[10px]" />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <h3 className="text-lg font-bold text-slate-900 mb-1">{offer.hotel_name}</h3>
        <p className="text-xs text-slate-500 mb-4">
          <i className="fa-solid fa-location-dot mr-1" />
          {offer.district}
        </p>

        {/* 3-Tier Pricing Breakdown */}
        <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-2">
          {/* Public rate (OTA) */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Public rate (OTA)</span>
            <span className="text-sm text-slate-400 line-through">{offer.base_rate_eur}€</span>
          </div>
          {/* Rateflow rate (after OTA offset) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-navy-600 font-medium">Rateflow rate</span>
              <span className="text-[10px] bg-navy-50 text-navy-600 px-1.5 py-0.5 rounded font-medium">
                -{offer.savings_vs_budget_pct > 20 ? "18" : "15"}% OTA saved
              </span>
            </div>
            <span className="text-sm font-semibold text-navy-800">
              {Math.round(offer.base_rate_eur * (1 - (offer.savings_vs_budget_pct > 20 ? 0.18 : 0.15)))}€
            </span>
          </div>
          {/* Final negotiated rate */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-green-700">After negotiation</span>
            </div>
            <span className="text-lg font-bold text-green-700">{offer.rate_eur}€</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            -{Math.round(((offer.base_rate_eur - offer.rate_eur) / offer.base_rate_eur) * 100)}% total savings
          </span>
          <span className="text-xs text-slate-400">
            Total: {Math.round(offer.rate_eur * nights)}€
          </span>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <i className="fa-brands fa-google text-xs text-slate-400" />
            <span className="text-sm font-semibold text-slate-900">{offer.rating_google}</span>
            <span className="text-xs text-slate-400">({offer.reviews_count})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white bg-blue-700 rounded px-1.5 py-0.5">B</span>
            <span className="text-sm font-semibold text-slate-900">{offer.rating_booking}/10</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              offer.esg_tier === "A" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }`}>
              ESG {offer.esg_tier}
            </span>
          </div>
        </div>

        {/* Inclusions */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {offer.inclusions.map((inc) => (
            <span key={inc} className="inline-flex items-center gap-1 bg-slate-50 text-slate-600 text-[11px] font-medium rounded-lg px-2 py-1 border border-slate-100">
              <i className="fa-solid fa-check text-green-500 text-[8px]" />
              {inc.replace(/_/g, " ")}
            </span>
          ))}
          <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-600 text-[11px] font-medium rounded-lg px-2 py-1 border border-slate-100">
            <i className="fa-solid fa-ban text-slate-400 text-[8px]" />
            Cancel {offer.cancellation.replace(/_/g, " ")}
          </span>
        </div>

        {/* Distance */}
        <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
          <span>
            <i className="fa-solid fa-route mr-1" />
            {offer.distance_office_km} km from office
          </span>
          <span>
            <i className="fa-solid fa-train-subway mr-1" />
            {offer.transit_min} min transit
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
          <a
            href={offer.website_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-medium text-navy-600 hover:text-navy-800 transition-colors"
          >
            <i className="fa-solid fa-globe mr-1" />
            Website
          </a>
          <a
            href={offer.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-medium text-navy-600 hover:text-navy-800 transition-colors"
          >
            <i className="fa-solid fa-map-location-dot mr-1" />
            Map
          </a>
          <span
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-medium text-navy-600 hover:text-navy-800 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-comments mr-1" />
            {offer.reviews_count} reviews
          </span>
        </div>

        {/* Policy compliance */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-2">Policy</p>
          <div className="grid grid-cols-2 gap-1">
            {offer.policy_checks.map((check) => (
              <div key={check.label} className="flex items-center gap-1.5">
                {check.passed ? (
                  <i className="fa-solid fa-check text-green-500 text-[8px]" />
                ) : (
                  <i className="fa-solid fa-xmark text-red-500 text-[8px]" />
                )}
                <span className="text-[11px] text-slate-500">{check.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
