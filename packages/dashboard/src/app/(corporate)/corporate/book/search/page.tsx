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
    badge: { label: "Recommended", color: "bg-[#222]" },
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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#222]">Book Travel</h1>
        <p className="text-[#717171] mt-1">Step 2 of 4 — AI Negotiation &amp; Compare</p>
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                i < 1
                  ? "bg-emerald text-white"
                  : i === 1
                  ? "bg-[#222] text-white"
                  : "bg-[#F7F7F7] text-[#B0B0B0] border border-[#EBEBEB]"
              }`}>
                {i < 1 ? (
                  <i className="fa-solid fa-check text-xs" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${
                i <= 1 ? "text-[#222]" : "text-[#B0B0B0]"
              }`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-px mx-3 ${i < 1 ? "bg-emerald" : i === 1 ? "bg-[#222]" : "bg-[#EBEBEB]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Negotiation Status Panel */}
      {!showOffers && (
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-[#EBEBEB] p-8 mb-8 animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-emerald animate-pulse-dot" />
            <h2 className="text-lg font-semibold text-[#222]">AI Agent is negotiating...</h2>
          </div>

          <div className="space-y-3">
            {negotiationMessages.slice(0, visibleMessages).map((msg, i) => (
              <div key={i} className="flex items-center gap-3 animate-fade-up">
                <div className="w-6 h-6 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0">
                  {i < visibleMessages - 1 ? (
                    <i className="fa-solid fa-check text-emerald text-[9px]" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-emerald animate-pulse-dot" />
                  )}
                </div>
                <span className="text-sm text-[#484848]">{msg.text}</span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-1.5 rounded-full bg-[#F7F7F7] overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald transition-all duration-700 ease-out"
                style={{ width: `${(visibleMessages / negotiationMessages.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Hotel Offer Cards — Airbnb listing style */}
      {showOffers && (
        <div className="animate-fade-up">
          <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
            <div>
              <h2 className="text-xl font-semibold text-[#222]">3 offers for Paris</h2>
              <p className="text-sm text-[#717171] mt-1">May 12 -- 15, 2026 &middot; 3 nights &middot; Superior room</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#717171]">
              <i className="fa-solid fa-robot text-emerald" />
              Negotiated by AI in 5.6s
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {hotelOffers.map((offer) => {
              const savingsPct = Math.round(((offer.originalRate - offer.negotiatedRate) / offer.originalRate) * 100);
              return (
                <div key={offer.id} className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden relative hover:shadow-md transition-shadow">
                  {/* Badge */}
                  <div className={`absolute top-3 left-3 z-10 ${offer.badge.color} text-white text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1`}>
                    {offer.badge.label}
                  </div>

                  {/* Photo placeholder */}
                  <div className="h-40 bg-gradient-to-br from-[#F7F7F7] to-[#EBEBEB] flex items-center justify-center">
                    <i className="fa-solid fa-hotel text-3xl text-[#B0B0B0]" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: offer.stars }).map((_, i) => (
                          <i key={i} className="fa-solid fa-star text-amber text-[9px]" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="badge-emerald badge text-[10px]">
                          <i className="fa-solid fa-leaf text-[8px]" />
                          ESG {offer.esg}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-[#222] mb-0.5">{offer.name}</h3>
                    <p className="text-xs text-[#717171] mb-3">{offer.location}</p>

                    {/* Inclusions */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {offer.inclusions.map((inc) => (
                        <span key={inc} className="inline-flex items-center gap-1 text-[#484848] text-[10px] font-medium bg-[#F7F7F7] rounded-md px-2 py-0.5">
                          <i className="fa-solid fa-check text-emerald text-[7px]" />
                          {inc}
                        </span>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-semibold text-[#222]">&euro;{offer.negotiatedRate}</span>
                      <span className="text-sm text-[#717171]">/night</span>
                      <span className="text-xs line-through text-[#B0B0B0] ml-auto">&euro;{offer.originalRate}</span>
                      <span className="text-xs font-semibold text-emerald bg-emerald/10 px-2 py-0.5 rounded-full">
                        -{savingsPct}%
                      </span>
                    </div>

                    {/* Select button */}
                    <button className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#222] text-white hover:bg-black transition-colors">
                      Select this hotel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
