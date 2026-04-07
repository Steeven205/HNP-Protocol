"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { travelPolicy } from "@/lib/demo-data";

const steps = [
  { label: "Trip Details", status: "active" },
  { label: "AI Negotiation", status: "pending" },
  { label: "Compare Offers", status: "pending" },
  { label: "Confirm", status: "pending" },
];

const travelers = [
  "Sophie Martin (Me)",
  "Someone else",
  "Multiple travelers",
];

const roomTypes = ["Standard", "Superior", "Suite"];

export default function BookTripDetailsPage() {
  const router = useRouter();
  const [traveler, setTraveler] = useState("Sophie Martin (Me)");
  const [destination, setDestination] = useState("Paris");
  const [checkIn, setCheckIn] = useState("2026-05-12");
  const [checkOut, setCheckOut] = useState("2026-05-15");
  const [rooms, setRooms] = useState(1);
  const [roomType, setRoomType] = useState("Superior");
  const [purpose, setPurpose] = useState("Client meeting");

  const destinationLower = destination.toLowerCase();
  const maxRate = (travelPolicy.maxRates as Record<string, number>)[destinationLower] ?? travelPolicy.maxRates.default;

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = checkIn && checkOut ? Math.max(0, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))) : 0;

  const isFormValid = traveler && destination && checkIn && checkOut;

  function handleNext() {
    const actualTraveler = traveler === "Sophie Martin (Me)" ? "Sophie Martin" : traveler;
    const searchParams = new URLSearchParams({
      traveler: actualTraveler,
      destination,
      check_in: checkIn,
      check_out: checkOut,
      rooms: String(rooms),
      room_type: roomType,
      purpose,
      budget: String(maxRate),
    });
    sessionStorage.setItem(
      "bookingRequest",
      JSON.stringify({ traveler: actualTraveler, destination, checkIn, checkOut, rooms, roomType, purpose, budget: maxRate })
    );
    router.push(`/corporate/book/search?${searchParams}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Wizard Progress Header */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                  s.status === "active"
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-[#F9FAFB] text-[#9CA3AF] border-[#E5E7EB]"
                }`}>
                  {i + 1}
                </div>
                <div className="hidden sm:block">
                  <div className={`text-sm font-semibold ${s.status === "active" ? "text-[#111827]" : "text-[#9CA3AF]"}`}>{s.label}</div>
                  <div className={`text-xs ${s.status === "active" ? "text-emerald-600" : "text-[#9CA3AF]"}`}>
                    {s.status === "active" ? "Current Step" : "Pending"}
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px bg-[#E5E7EB] mx-2 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section (Left 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
            <h2 className="text-2xl font-bold text-[#111827] mb-6 pb-4 border-b border-[#E5E7EB]">Trip Basics</h2>

            <div className="space-y-6">
              {/* Traveler */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Who is traveling?</label>
                <div className="relative">
                  <select
                    value={traveler}
                    onChange={(e) => setTraveler(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl py-3 pl-4 pr-10 text-sm text-[#111827] appearance-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    {travelers.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none text-xs" />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Destination</label>
                <div className="relative">
                  <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="e.g. Paris, France"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl py-3 pl-11 pr-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Check-in</label>
                  <div className="relative">
                    <i className="fa-regular fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl py-3 pl-11 pr-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Check-out</label>
                  <div className="relative">
                    <i className="fa-regular fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl py-3 pl-11 pr-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  {nights > 0 && (
                    <div className="text-xs text-emerald-600 mt-2 text-right">{nights} night{nights > 1 ? "s" : ""}</div>
                  )}
                </div>
              </div>

              {/* Room Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Rooms</label>
                  <div className="flex items-center bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-[#F3F4F6] transition-colors text-[#374151]"
                    >
                      <i className="fa-solid fa-minus text-xs" />
                    </button>
                    <input type="text" value={rooms} readOnly className="flex-1 text-center bg-transparent border-none text-[#111827] font-medium focus:ring-0 focus:outline-none" />
                    <button
                      type="button"
                      onClick={() => setRooms(rooms + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-[#F3F4F6] transition-colors text-[#374151]"
                    >
                      <i className="fa-solid fa-plus text-xs" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Room Type</label>
                  <div className="relative">
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl py-3 pl-4 pr-10 text-sm text-[#111827] appearance-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      {roomTypes.map((rt) => (
                        <option key={rt} value={rt}>{rt}</option>
                      ))}
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none text-xs" />
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Trip Purpose (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Client meeting"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel (Right 1/3) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 sticky top-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E7EB]">
              <h3 className="text-xl font-bold text-[#111827]">Policy Preview</h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-200">
                <i className="fa-solid fa-check text-[10px]" /> Compliant
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fa-solid fa-check text-xs" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#111827]">Budget OK</div>
                  <div className="text-xs text-[#6B7280]">{destination || "City"} max: &euro;{maxRate}/night</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fa-solid fa-check text-xs" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#111827]">Category limits</div>
                  <div className="text-xs text-[#6B7280]">Min 3-star required</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fa-solid fa-check text-xs" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#111827]">Trip length</div>
                  <div className="text-xs text-[#6B7280]">{nights > 0 ? `${nights} night${nights > 1 ? "s" : ""}` : "N/A"} (Max {travelPolicy.maxNights} allowed)</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
              <button
                type="button"
                disabled={!isFormValid}
                onClick={handleNext}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  isFormValid
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg hover:shadow-emerald-500/20"
                    : "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
                }`}
              >
                Next: Find Hotels <i className="fa-solid fa-arrow-right" />
              </button>
              <button className="w-full mt-3 py-2 text-[#6B7280] hover:text-[#111827] text-xs font-medium transition-colors">
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
