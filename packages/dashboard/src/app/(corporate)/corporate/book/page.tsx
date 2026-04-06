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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#222]">Book Travel</h1>
        <p className="text-[#717171] mt-1">Step 1 of 4 — Trip Details</p>
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                i === 0
                  ? "bg-[#222] text-white"
                  : "bg-[#F7F7F7] text-[#B0B0B0] border border-[#EBEBEB]"
              }`}>
                {i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${
                i === 0 ? "text-[#222]" : "text-[#B0B0B0]"
              }`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-px mx-3 ${i === 0 ? "bg-[#222]" : "bg-[#EBEBEB]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Left: Form (2/3) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h2 className="text-lg font-semibold text-[#222] mb-6">Trip Details</h2>

          <div className="space-y-5">
            {/* Traveler */}
            <div>
              <label className="block text-sm font-medium text-[#222] mb-1.5">
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
              <label className="block text-sm font-medium text-[#222] mb-1.5">
                Destination
              </label>
              <div className="relative">
                <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-[#717171] text-sm" />
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
                <label className="block text-sm font-medium text-[#222] mb-1.5">
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
                <label className="block text-sm font-medium text-[#222] mb-1.5">
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
                <label className="block text-sm font-medium text-[#222] mb-1.5">
                  Rooms
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center text-[#222] hover:border-[#222] transition-colors"
                  >
                    <i className="fa-solid fa-minus text-xs" />
                  </button>
                  <span className="text-lg font-semibold text-[#222] w-8 text-center">{rooms}</span>
                  <button
                    onClick={() => setRooms(rooms + 1)}
                    className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center text-[#222] hover:border-[#222] transition-colors"
                  >
                    <i className="fa-solid fa-plus text-xs" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#222] mb-1.5">
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
              <label className="block text-sm font-medium text-[#222] mb-1.5">
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
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 sticky top-8">
            <h3 className="text-base font-semibold text-[#222] mb-5">
              <i className="fa-solid fa-shield-halved text-emerald mr-2" />
              Policy Preview
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fa-solid fa-check text-emerald text-[8px]" />
                </div>
                <div>
                  <p className="text-xs text-[#717171]">Budget</p>
                  <p className="text-sm text-[#222] font-medium">
                    Max &euro;{maxRate}/night for {destination || "destination"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fa-solid fa-check text-emerald text-[8px]" />
                </div>
                <div>
                  <p className="text-xs text-[#717171]">Category</p>
                  <p className="text-sm text-[#222] font-medium">Min. 3-star required</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fa-solid fa-check text-emerald text-[8px]" />
                </div>
                <div>
                  <p className="text-xs text-[#717171]">Cancellation</p>
                  <p className="text-sm text-[#222] font-medium">24h free cancellation required</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fa-solid fa-check text-emerald text-[8px]" />
                </div>
                <div>
                  <p className="text-xs text-[#717171]">Max stay</p>
                  <p className="text-sm text-[#222] font-medium">{travelPolicy.maxNights} nights max</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#EBEBEB]">
              <p className="text-xs text-[#717171] mb-2">Preferred chains</p>
              <div className="flex flex-wrap gap-1.5">
                {travelPolicy.preferredChains.map((c) => (
                  <span key={c} className="badge-emerald badge text-[10px]">{c}</span>
                ))}
              </div>
            </div>

            <button
              disabled={!isFormValid}
              className={`mt-6 w-full py-3 rounded-lg text-sm font-semibold transition-all ${
                isFormValid
                  ? "bg-[#222] text-white hover:bg-black"
                  : "bg-[#F7F7F7] text-[#B0B0B0] cursor-not-allowed"
              }`}
            >
              Next: Find Hotels
              <i className="fa-solid fa-arrow-right ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
