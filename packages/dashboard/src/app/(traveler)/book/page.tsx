"use client";

import { useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface OfferResult {
  id: string;
  hotel_name: string;
  stars: number;
  district: string;
  rate_eur: number;
  base_rate_eur: number;
  savings_pct: number;
  inclusions: string[];
  badge: { label: string; color: string; icon: string } | null;
  photo_url: string;
}

type FlowStep = "search" | "loading" | "results" | "confirmed";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const mockOffers: OfferResult[] = [
  {
    id: "offer-1",
    hotel_name: "Hotel Bastille Inn",
    stars: 3,
    district: "Bastille / 11eme",
    rate_eur: 118,
    base_rate_eur: 138,
    savings_pct: 34,
    inclusions: ["WiFi", "24h cancellation"],
    badge: { label: "Best Price", color: "bg-green-500", icon: "fa-tag" },
    photo_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
  },
  {
    id: "offer-2",
    hotel_name: "Le Marais Boutique Hotel",
    stars: 4,
    district: "Le Marais / 3eme",
    rate_eur: 132,
    base_rate_eur: 145,
    savings_pct: 27,
    inclusions: ["WiFi", "Breakfast", "Late checkout"],
    badge: { label: "Recommended", color: "bg-navy-800", icon: "fa-star" },
    photo_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop",
  },
  {
    id: "offer-3",
    hotel_name: "Hotel Saint-Honore",
    stars: 4,
    district: "Louvre / 1er",
    rate_eur: 145,
    base_rate_eur: 165,
    savings_pct: 19,
    inclusions: ["WiFi", "Breakfast", "Gym", "Minibar"],
    badge: { label: "Best Rated", color: "bg-amber-500", icon: "fa-trophy" },
    photo_url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop",
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function BookPage() {
  const [step, setStep] = useState<FlowStep>("search");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<OfferResult | null>(null);
  const [bookingRef, setBookingRef] = useState("");

  // Compute nights
  function computeNights(): number {
    if (!checkIn || !checkOut) return 1;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
  }

  function handleSearch() {
    if (!destination || !checkIn || !checkOut) return;
    setStep("loading");

    // Simulate AI negotiation delay
    setTimeout(() => {
      setStep("results");
    }, 2800);
  }

  function handleSelect(offer: OfferResult) {
    setSelectedOffer(offer);
    const ref = `BK-${offer.id.slice(-1)}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setBookingRef(ref);
    setStep("confirmed");
  }

  function handleReset() {
    setStep("search");
    setDestination("");
    setCheckIn("");
    setCheckOut("");
    setSelectedOffer(null);
    setBookingRef("");
  }

  const nights = computeNights();

  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="font-display font-extrabold text-4xl text-navy-800 mb-3">
          Book a Hotel
        </h1>
        <p className="text-slate-500 text-lg">
          AI finds and negotiates the best rates for you
        </p>
      </div>

      {/* ── SEARCH FORM ──────────────────────────────────────────────────── */}
      {step === "search" && (
        <div className="w-full max-w-2xl bg-white rounded-[20px] border border-[#E2E6F0] shadow-card-md p-8">
          {/* Destination */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Destination
            </label>
            <div className="relative">
              <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Paris, London, New York..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#E2E6F0] bg-[#FAFBFF] text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all"
              />
            </div>
          </div>

          {/* Date row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Check-in
              </label>
              <div className="relative">
                <i className="fa-solid fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#E2E6F0] bg-[#FAFBFF] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Check-out
              </label>
              <div className="relative">
                <i className="fa-solid fa-calendar-check absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#E2E6F0] bg-[#FAFBFF] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            disabled={!destination || !checkIn || !checkOut}
            className={`w-full py-4 rounded-xl text-sm font-semibold transition-all ${
              destination && checkIn && checkOut
                ? "bg-navy-800 text-white hover:bg-navy-900 shadow-card-md hover:-translate-y-px"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <i className="fa-solid fa-magnifying-glass mr-2" />
            Find Hotels
          </button>
        </div>
      )}

      {/* ── LOADING STATE ────────────────────────────────────────────────── */}
      {step === "loading" && (
        <div className="w-full max-w-2xl flex flex-col items-center py-20">
          {/* Spinner */}
          <div className="relative w-16 h-16 mb-8">
            <div className="absolute inset-0 rounded-full border-[3px] border-slate-100" />
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-navy-800 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fa-solid fa-robot text-navy-800 text-lg" />
            </div>
          </div>

          <h2 className="font-display font-bold text-xl text-navy-800 mb-2">
            AI is negotiating with 5 hotels...
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            Our AI agent is comparing rates and negotiating the best deals
          </p>

          {/* Progress steps */}
          <div className="flex flex-col gap-3 w-full max-w-sm">
            {[
              { label: "Checking availability", icon: "fa-magnifying-glass", done: true },
              { label: "Comparing public rates", icon: "fa-chart-bar", done: true },
              { label: "Negotiating corporate discounts", icon: "fa-comments", done: false },
              { label: "Verifying policy compliance", icon: "fa-shield-halved", done: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                {s.done ? (
                  <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                    <i className="fa-solid fa-check text-green-600 text-[10px]" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-navy-50 border border-navy-100 flex items-center justify-center">
                    <i className={`fa-solid ${s.icon} text-navy-600 text-[10px]`} />
                  </div>
                )}
                <span className={`text-sm ${s.done ? "text-slate-400 line-through" : "text-slate-700 font-medium"}`}>
                  {s.label}
                </span>
                {!s.done && i === 2 && (
                  <div className="flex gap-1 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-800 typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-800 typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-800 typing-dot" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RESULTS ──────────────────────────────────────────────────────── */}
      {step === "results" && (
        <div className="w-full">
          {/* Summary bar */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div>
              <h2 className="font-display font-bold text-xl text-navy-800">
                3 offers for {destination}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {checkIn} to {checkOut} &middot; {nights} night{nights !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-slate-500 hover:text-navy-800 transition-colors"
            >
              <i className="fa-solid fa-arrow-left mr-1.5" />
              New search
            </button>
          </div>

          {/* Offer cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {mockOffers.map((offer) => (
              <div
                key={offer.id}
                className="relative bg-white rounded-[16px] border border-[#E2E6F0] shadow-card overflow-hidden hover:shadow-card-md hover:border-navy-200 transition-all group"
              >
                {/* Badge */}
                {offer.badge && (
                  <div className={`absolute top-3 left-3 z-10 ${offer.badge.color} text-white text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 flex items-center gap-1 shadow-md`}>
                    <i className={`fa-solid ${offer.badge.icon} text-[8px]`} />
                    {offer.badge.label}
                  </div>
                )}

                {/* Photo */}
                <div className="h-36 bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={offer.photo_url}
                    alt={offer.hotel_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-slate-900 mb-0.5">{offer.hotel_name}</h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: offer.stars }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-amber-400 text-[9px]" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">&middot;</span>
                    <span className="text-xs text-slate-500">{offer.district}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-extrabold text-navy-800">{offer.rate_eur}&euro;</span>
                    <span className="text-sm text-slate-400">/night</span>
                    <span className="text-xs line-through text-slate-400 ml-auto">{offer.base_rate_eur}&euro;</span>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      -{offer.savings_pct}%
                    </span>
                  </div>

                  {/* Inclusions */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {offer.inclusions.map((inc) => (
                      <span
                        key={inc}
                        className="inline-flex items-center gap-1 bg-slate-50 text-slate-600 text-[10px] font-medium rounded-md px-2 py-0.5 border border-slate-100"
                      >
                        <i className="fa-solid fa-check text-green-500 text-[7px]" />
                        {inc}
                      </span>
                    ))}
                  </div>

                  {/* Select button */}
                  <button
                    onClick={() => handleSelect(offer)}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-navy-800 text-white hover:bg-navy-900 transition-all hover:-translate-y-px shadow-card"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI footer */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400 py-4">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-robot text-navy-600" />
              Negotiated by AI in 24s
            </span>
            <span className="w-px h-3 bg-slate-200" />
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-user-xmark" />
              0 human touchpoints
            </span>
            <span className="w-px h-3 bg-slate-200" />
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-green-500" />
              Policy compliant
            </span>
          </div>
        </div>
      )}

      {/* ── CONFIRMED ────────────────────────────────────────────────────── */}
      {step === "confirmed" && selectedOffer && (
        <div className="w-full max-w-2xl">
          <div className="bg-green-50 border border-green-200 rounded-[20px] p-8">
            {/* Check icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fa-solid fa-circle-check text-green-600 text-3xl" />
              </div>
            </div>

            <h2 className="text-center font-display font-bold text-2xl text-green-800 mb-2">
              Booking Confirmed
            </h2>
            <p className="text-center text-sm text-green-600 mb-8">
              Your reservation has been secured at the negotiated rate
            </p>

            {/* Details grid */}
            <div className="bg-white rounded-xl border border-green-200 divide-y divide-green-100">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-green-600 mb-1">
                    Booking Ref
                  </p>
                  <p className="text-sm font-mono font-bold text-green-900">{bookingRef}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-green-600 mb-1">
                    Hotel
                  </p>
                  <p className="text-sm font-semibold text-green-900">{selectedOffer.hotel_name}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-green-600 mb-1">
                    Rate
                  </p>
                  <p className="text-sm font-semibold text-green-900">{selectedOffer.rate_eur}&euro;/night</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-green-600 mb-1">
                    Total
                  </p>
                  <p className="text-sm font-semibold text-green-900">
                    {selectedOffer.rate_eur * nights}&euro;
                    <span className="text-xs text-green-600 font-normal ml-1">({nights} night{nights !== 1 ? "s" : ""})</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-green-600 mb-1">
                    Dates
                  </p>
                  <p className="text-sm font-semibold text-green-900">{checkIn} &rarr; {checkOut}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-green-600 mb-1">
                    Savings
                  </p>
                  <p className="text-sm font-bold text-green-700">{selectedOffer.savings_pct}% below budget</p>
                </div>
              </div>
            </div>
          </div>

          {/* Book another trip */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-navy-800 text-white hover:bg-navy-900 transition-all hover:-translate-y-px shadow-card-md"
            >
              <i className="fa-solid fa-plus" />
              Book Another Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
