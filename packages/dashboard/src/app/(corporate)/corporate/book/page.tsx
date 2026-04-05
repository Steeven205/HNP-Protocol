"use client";

import { useState } from "react";
import { travelPolicy } from "@/lib/demo-data";

const steps = [
  { label: "Trip Details", icon: "fa-suitcase" },
  { label: "AI Negotiation", icon: "fa-robot" },
  { label: "Compare Offers", icon: "fa-scale-balanced" },
  { label: "Confirm", icon: "fa-circle-check" },
];

const travelers = [
  "Sophie Martin",
  "Thomas Bernard",
  "Julie Petit",
  "Marc Lefevre",
  "Claire Moreau",
];

const roomTypes = ["Standard", "Superior", "Suite"];

export default function BookTripDetailsPage() {
  const [traveler, setTraveler] = useState("");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [roomType, setRoomType] = useState("Standard");
  const [purpose, setPurpose] = useState("");

  const destinationLower = destination.toLowerCase();
  const maxRate = (travelPolicy.maxRates as Record<string, number>)[destinationLower] ?? travelPolicy.maxRates.default;

  const isFormValid = traveler && destination && checkIn && checkOut;

  return (
    <div className="flex flex-col h-full">
      {/* ── Header Bar ──────────────────────────────────────────────────── */}
      <header className="h-16 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Book Travel</h1>
          <p className="text-xs text-slate-500 mt-0.5">Step 1/4 &mdash; Trip Details</p>
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
                  ? "step-active"
                  : "step-pending"
              }`}>
                <i className={`fa-solid ${s.icon} text-[10px]`} />
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 h-px bg-[#E2E8F0]" />
              )}
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Left: Form (2/3) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8">
            <h2 className="font-display text-lg font-semibold text-slate-900 mb-6">Trip Details</h2>

            <div className="space-y-5">
              {/* Traveler */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Who is traveling?
                </label>
                <select
                  value={traveler}
                  onChange={(e) => setTraveler(e.target.value)}
                  className="form-input w-full rounded-lg px-4 py-3 text-sm"
                >
                  <option value="">Select traveler...</option>
                  {travelers.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Destination
                </label>
                <div className="relative">
                  <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input
                    type="text"
                    placeholder="Paris, Lyon, Berlin..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="form-input w-full rounded-lg pl-11 pr-4 py-3 text-sm"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="form-input w-full rounded-lg px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="form-input w-full rounded-lg px-4 py-3 text-sm"
                  />
                </div>
              </div>

              {/* Rooms & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Rooms
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-10 h-10 rounded-lg bg-slate-50 border border-[#E2E8F0] flex items-center justify-center text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                      <i className="fa-solid fa-minus text-xs" />
                    </button>
                    <span className="text-lg font-semibold text-slate-900 w-8 text-center">{rooms}</span>
                    <button
                      onClick={() => setRooms(rooms + 1)}
                      className="w-10 h-10 rounded-lg bg-slate-50 border border-[#E2E8F0] flex items-center justify-center text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                      <i className="fa-solid fa-plus text-xs" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Room Type
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="form-input w-full rounded-lg px-4 py-3 text-sm"
                  >
                    {roomTypes.map((rt) => (
                      <option key={rt} value={rt}>{rt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Trip Purpose */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Trip Purpose
                </label>
                <input
                  type="text"
                  placeholder="Client meeting, conference, team offsite..."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="form-input w-full rounded-lg px-4 py-3 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right: Policy Preview (1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sticky top-8">
              <h3 className="font-display text-base font-semibold text-slate-900 mb-4">
                <i className="fa-solid fa-shield-halved text-emerald mr-2" />
                Policy Preview
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-emerald text-[9px]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Budget</p>
                    <p className="text-xs text-slate-900 font-medium">
                      Max &euro;{maxRate}/night for {destination || "destination"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-emerald text-[9px]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Category</p>
                    <p className="text-xs text-slate-900 font-medium">Min. 3-star required</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-emerald text-[9px]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Cancellation</p>
                    <p className="text-xs text-slate-900 font-medium">24h free cancellation required</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-emerald text-[9px]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Max stay</p>
                    <p className="text-xs text-slate-900 font-medium">{travelPolicy.maxNights} nights max</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E2E8F0]">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Preferred chains</p>
                <div className="flex flex-wrap gap-1.5">
                  {travelPolicy.preferredChains.map((c) => (
                    <span key={c} className="badge-emerald badge text-[10px]">{c}</span>
                  ))}
                </div>
              </div>

              <button
                disabled={!isFormValid}
                className={`mt-6 w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                  isFormValid
                    ? "btn-emerald"
                    : "bg-slate-50 text-slate-500 cursor-not-allowed"
                }`}
              >
                Next: Find Hotels
                <i className="fa-solid fa-arrow-right ml-2" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
