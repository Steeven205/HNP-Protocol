"use client";

import { useState } from "react";

const steps = [
  { label: "Trip Details", icon: "fa-suitcase" },
  { label: "AI Negotiation", icon: "fa-robot" },
  { label: "Compare Offers", icon: "fa-scale-balanced" },
  { label: "Confirm", icon: "fa-circle-check" },
];

const bookingSummary = {
  hotel: "Le Marais Boutique Hotel",
  location: "Le Marais / 3eme, Paris",
  stars: 4,
  checkIn: "2026-05-12",
  checkOut: "2026-05-15",
  nights: 3,
  roomType: "Superior",
  rackRate: 195,
  rateflowRate: 142,
  totalCost: 426,
  inclusions: ["WiFi", "Breakfast", "Late checkout"],
  cancellation: "Free cancellation up to 24h before check-in",
  esg: "A",
};

export default function BookConfirmPage() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const bookingRef = "RF-89X2K-M";

  const savingsPerNight = bookingSummary.rackRate - bookingSummary.rateflowRate;
  const totalSavings = savingsPerNight * bookingSummary.nights;
  const savingsPct = Math.round((savingsPerNight / bookingSummary.rackRate) * 100);

  return (
    <div className="flex flex-col h-full">
      {/* ── Header Bar ──────────────────────────────────────────────────── */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 glass-panel flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Book Travel</h1>
          <p className="text-xs text-slate-400 mt-0.5">Step 4/4 &mdash; Confirm Booking</p>
        </div>
      </header>

      {/* ── Scrollable Content ──────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Step Progress Bar */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold ${
                i < 3 ? "step-completed" : "step-active"
              }`}>
                {i < 3 ? (
                  <i className="fa-solid fa-check text-[10px]" />
                ) : (
                  <i className={`fa-solid ${s.icon} text-[10px]`} />
                )}
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 h-px bg-emerald/50" />
              )}
            </div>
          ))}
        </div>

        {!showSuccess ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Booking Summary Card */}
            <div className="glass-panel rounded-2xl p-8">
              <h2 className="font-display text-lg font-semibold text-white mb-6">Booking Summary</h2>

              <div className="flex items-start gap-6 mb-6">
                {/* Hotel photo placeholder */}
                <div className="w-32 h-24 rounded-xl bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-hotel text-2xl text-white/10" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{bookingSummary.hotel}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: bookingSummary.stars }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-amber text-[9px]" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">&middot;</span>
                    <span className="text-xs text-slate-400">{bookingSummary.location}</span>
                    <span className="badge-emerald badge text-[10px] ml-2">
                      <i className="fa-solid fa-leaf text-[8px]" />
                      ESG {bookingSummary.esg}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-300">
                    <span><i className="fa-solid fa-calendar-days text-emerald mr-1.5" />{bookingSummary.checkIn} &rarr; {bookingSummary.checkOut}</span>
                    <span><i className="fa-solid fa-moon text-emerald mr-1.5" />{bookingSummary.nights} nights</span>
                    <span><i className="fa-solid fa-bed text-emerald mr-1.5" />{bookingSummary.roomType}</span>
                  </div>
                </div>
              </div>

              {/* Rate Breakdown */}
              <div className="bg-white/[0.02] rounded-xl border border-white/5 p-5 mb-6">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Rate Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Rack Rate</span>
                    <span className="text-sm text-slate-500 line-through">&euro;{bookingSummary.rackRate}/night</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald font-medium">Rateflow Negotiated Rate</span>
                    <span className="text-sm text-emerald font-bold">&euro;{bookingSummary.rateflowRate}/night</span>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                    <span className="text-sm text-white font-semibold">Total ({bookingSummary.nights} nights)</span>
                    <span className="text-lg text-white font-bold">&euro;{bookingSummary.totalCost}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald">You save</span>
                    <span className="text-sm font-bold text-emerald">
                      &euro;{totalSavings} ({savingsPct}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Inclusions */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Inclusions</h4>
                <div className="flex flex-wrap gap-2">
                  {bookingSummary.inclusions.map((inc) => (
                    <span key={inc} className="inline-flex items-center gap-1.5 bg-emerald/10 text-emerald text-xs font-medium rounded-lg px-3 py-1.5 border border-emerald/20">
                      <i className="fa-solid fa-check text-[8px]" />
                      {inc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cancellation */}
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <i className="fa-solid fa-shield-halved text-emerald" />
                {bookingSummary.cancellation}
              </div>
            </div>

            {/* Policy Compliance */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="font-display text-base font-semibold text-white mb-4">
                <i className="fa-solid fa-shield-halved text-emerald mr-2" />
                Policy Compliance
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Rate within budget", detail: `€${bookingSummary.rateflowRate} < €180 max` },
                  { label: "Category compliant", detail: "4-star (min 3-star)" },
                  { label: "Cancellation policy OK", detail: "24h free cancellation" },
                  { label: "ESG requirement met", detail: `Tier ${bookingSummary.esg} (min Tier B)` },
                ].map((check) => (
                  <div key={check.label} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-check text-emerald text-[8px]" />
                    </div>
                    <div>
                      <span className="text-xs text-white font-medium">{check.label}</span>
                      <span className="text-[10px] text-slate-400 ml-1.5">{check.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms + Confirm */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 rounded border border-white/20 bg-white/5 accent-emerald"
                />
                <span className="text-xs text-slate-400">
                  I accept the booking terms and corporate travel policy
                </span>
              </label>

              <button
                disabled={!termsAccepted}
                onClick={() => setShowSuccess(true)}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all ${
                  termsAccepted
                    ? "btn-emerald"
                    : "bg-white/5 text-slate-500 cursor-not-allowed"
                }`}
              >
                <i className="fa-solid fa-lock mr-2" />
                Confirm Booking
              </button>
            </div>
          </div>
        ) : (
          /* ── Success Modal ──────────────────────────────────────────── */
          <div className="max-w-lg mx-auto animate-fade-up">
            <div className="glass-panel rounded-2xl p-10 text-center">
              {/* Checkmark animation */}
              <div className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6">
                <div className="w-14 h-14 rounded-full bg-emerald/30 flex items-center justify-center">
                  <i className="fa-solid fa-circle-check text-emerald text-3xl" />
                </div>
              </div>

              <h2 className="font-display text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
              <p className="text-sm text-slate-400 mb-6">Your reservation has been secured at the AI-negotiated rate</p>

              <div className="bg-white/[0.03] rounded-xl border border-white/10 p-5 mb-6">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Booking Reference</p>
                <p className="text-2xl font-bold text-emerald font-mono">{bookingRef}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <p className="text-xs text-slate-400">Hotel</p>
                  <p className="text-sm text-white font-medium mt-0.5">{bookingSummary.hotel}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Rate</p>
                  <p className="text-sm text-white font-medium mt-0.5">&euro;{bookingSummary.rateflowRate}/night</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Savings</p>
                  <p className="text-sm text-emerald font-bold mt-0.5">&euro;{totalSavings} saved</p>
                </div>
              </div>

              <button className="btn-emerald px-8 py-3 rounded-xl text-sm font-semibold">
                <i className="fa-solid fa-suitcase mr-2" />
                View My Bookings
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
