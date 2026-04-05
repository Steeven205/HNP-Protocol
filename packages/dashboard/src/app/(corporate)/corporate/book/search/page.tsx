"use client";

import { useState, useEffect } from "react";

const steps = [
  { label: "Trip Details", icon: "fa-suitcase" },
  { label: "AI Negotiation", icon: "fa-robot" },
  { label: "Compare Offers", icon: "fa-scale-balanced" },
  { label: "Confirm", icon: "fa-circle-check" },
];

const negotiationMessages = [
  { text: "Checking availability across 5 hotels...", delay: 0 },
  { text: "Comparing base rates and corporate discounts...", delay: 800 },
  { text: "Negotiating with Le Marais Boutique Hotel...", delay: 1600 },
  { text: "Negotiating with Hotel Bastille Inn...", delay: 2400 },
  { text: "Negotiating with Hotel Saint-Honore...", delay: 3200 },
  { text: "Verifying policy compliance on 3 offers...", delay: 4000 },
  { text: "Ranking offers by value score...", delay: 4800 },
];

const hotelOffers = [
  {
    id: "offer-1",
    name: "Hotel Bastille Inn",
    stars: 3,
    location: "Bastille / 11eme, Paris",
    originalRate: 145,
    negotiatedRate: 118,
    inclusions: ["WiFi", "24h cancellation"],
    esg: "B",
    policyCompliant: true,
    badge: { label: "Best Price", color: "bg-emerald" },
  },
  {
    id: "offer-2",
    name: "Le Marais Boutique Hotel",
    stars: 4,
    location: "Le Marais / 3eme, Paris",
    originalRate: 185,
    negotiatedRate: 142,
    inclusions: ["WiFi", "Breakfast", "Late checkout"],
    esg: "A",
    policyCompliant: true,
    badge: { label: "Recommended", color: "bg-blue" },
  },
  {
    id: "offer-3",
    name: "Hotel Saint-Honore",
    stars: 4,
    location: "Louvre / 1er, Paris",
    originalRate: 195,
    negotiatedRate: 155,
    inclusions: ["WiFi", "Breakfast", "Gym", "Minibar"],
    esg: "A",
    policyCompliant: true,
    badge: { label: "Best Rated", color: "bg-amber" },
  },
];

export default function BookSearchPage() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    negotiationMessages.forEach((msg, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleMessages(i + 1);
        }, msg.delay)
      );
    });

    timers.push(
      setTimeout(() => {
        setShowOffers(true);
      }, 5600)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* ── Header Bar ──────────────────────────────────────────────────── */}
      <header className="h-16 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Book Travel</h1>
          <p className="text-xs text-slate-500 mt-0.5">Step 2/4 &mdash; AI Negotiation &amp; Compare</p>
        </div>
      </header>

      {/* ── Scrollable Content ──────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Step Progress Bar */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold ${
                i === 0
                  ? "step-completed"
                  : i === 1
                  ? "step-active"
                  : "step-pending"
              }`}>
                {i === 0 ? (
                  <i className="fa-solid fa-check text-[10px]" />
                ) : (
                  <i className={`fa-solid ${s.icon} text-[10px]`} />
                )}
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-px ${i === 0 ? "bg-emerald/50" : "bg-[#E2E8F0]"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Negotiation Status Panel */}
        {!showOffers && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 mb-8 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full bg-emerald animate-pulse-dot" />
              <h2 className="font-display text-lg font-semibold text-slate-900">AI Agent is negotiating...</h2>
            </div>

            <div className="space-y-3">
              {negotiationMessages.slice(0, visibleMessages).map((msg, i) => (
                <div key={i} className="flex items-center gap-3 animate-fade-up">
                  <div className="w-6 h-6 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0">
                    {i < visibleMessages - 1 ? (
                      <i className="fa-solid fa-check text-emerald text-[9px]" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-emerald animate-pulse-dot" />
                    )}
                  </div>
                  <span className="text-sm text-slate-600">{msg.text}</span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald transition-all duration-700 ease-out"
                  style={{ width: `${(visibleMessages / negotiationMessages.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Hotel Offer Cards */}
        {showOffers && (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">3 offers for Paris</h2>
                <p className="text-xs text-slate-500 mt-1">May 12&ndash;15, 2026 &middot; 3 nights &middot; Superior room</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <i className="fa-solid fa-robot text-emerald" />
                Negotiated by AI in 5.6s
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {hotelOffers.map((offer) => {
                const savingsPct = Math.round(((offer.originalRate - offer.negotiatedRate) / offer.originalRate) * 100);
                return (
                  <div key={offer.id} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden relative">
                    {/* Badge */}
                    <div className={`absolute top-3 left-3 z-10 ${offer.badge.color} text-white text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 flex items-center gap-1`}>
                      {offer.badge.label}
                    </div>

                    {/* Photo placeholder */}
                    <div className="h-36 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <i className="fa-solid fa-hotel text-3xl text-slate-300" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-slate-900 mb-1">{offer.name}</h3>
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: offer.stars }).map((_, i) => (
                            <i key={i} className="fa-solid fa-star text-amber text-[9px]" />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">&middot;</span>
                        <span className="text-xs text-slate-500">{offer.location}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold text-slate-900">&euro;{offer.negotiatedRate}</span>
                        <span className="text-xs text-slate-500">/night</span>
                        <span className="text-xs line-through text-slate-500 ml-auto">&euro;{offer.originalRate}</span>
                        <span className="text-xs font-bold text-emerald bg-emerald/10 px-2 py-0.5 rounded-full">
                          -{savingsPct}%
                        </span>
                      </div>

                      {/* Inclusions */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {offer.inclusions.map((inc) => (
                          <span key={inc} className="inline-flex items-center gap-1 bg-slate-50 text-slate-600 text-[10px] font-medium rounded-md px-2 py-0.5 border border-[#E2E8F0]">
                            <i className="fa-solid fa-check text-emerald text-[7px]" />
                            {inc}
                          </span>
                        ))}
                      </div>

                      {/* ESG + Policy */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="badge-emerald badge text-[10px]">
                          <i className="fa-solid fa-leaf text-[8px]" />
                          ESG {offer.esg}
                        </span>
                        {offer.policyCompliant && (
                          <span className="badge-emerald badge text-[10px]">
                            <i className="fa-solid fa-shield-halved text-[8px]" />
                            Compliant
                          </span>
                        )}
                      </div>

                      {/* Select button */}
                      <button className="w-full py-2.5 rounded-xl text-sm font-semibold btn-emerald">
                        Select
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
