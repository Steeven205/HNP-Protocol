"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewNegotiationPage() {
  const router = useRouter();

  const [traveler, setTraveler] = useState("");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("standard");
  const [maxBudget, setMaxBudget] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const nightsCount =
    checkIn && checkOut
      ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 0;

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          traveler: traveler || "Paul Martin",
          destination: destination || "Paris",
          check_in: checkIn || "2026-05-12",
          check_out: checkOut || "2026-05-15",
          budget: maxBudget || "180",
          purpose: specialRequests || undefined,
        }),
      });
      const data = await res.json();
      if (data.id) {
        router.push(`/negotiations/${data.id}?live=true`);
      } else {
        setSubmitting(false);
      }
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <Link href="/negotiations" className="hover:text-navy-800 transition-colors">
          Negotiations
        </Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
        <span className="text-slate-900 font-medium">New</span>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-8">New Negotiation</h1>

      <div className="flex gap-8">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          {/* Traveler Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Traveler Name
            </label>
            <div className="relative">
              <i className="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                required
                value={traveler}
                onChange={(e) => setTraveler(e.target.value)}
                placeholder="e.g. Sophie Chen"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Destination City
            </label>
            <div className="relative">
              <i className="fa-solid fa-location-dot absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Paris"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
              />
            </div>
          </div>

          {/* Check-in / Check-out */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Dates
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <i className="fa-solid fa-calendar absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>
              <i className="fa-solid fa-arrow-right text-slate-400 text-sm" />
              <div className="relative flex-1">
                <i className="fa-solid fa-calendar absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>
            </div>
            {nightsCount > 0 && (
              <p className="mt-1.5 text-xs text-slate-500">
                {nightsCount} night{nightsCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Room Type
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-700 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
            >
              <option value="standard">Standard</option>
              <option value="superior">Superior</option>
              <option value="suite">Suite</option>
            </select>
          </div>

          {/* Max Budget */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Max Budget per Night
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
                &euro;
              </span>
              <input
                type="number"
                required
                min={0}
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                placeholder="180"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Special Requests
              <span className="ml-1 text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={3}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Late checkout, quiet room, ground floor..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600 resize-none"
            />
          </div>
        </form>

        {/* Right: Summary Sidebar */}
        <div className="w-80 shrink-0">
          <div className="sticky top-24 bg-white rounded-[16px] p-6 shadow-soft border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-5">Negotiation Summary</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Agent Mode</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Autonomous
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Target Savings</span>
                <span className="text-sm font-medium text-slate-900">15&ndash;20%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Corporate ID</span>
                <span className="text-sm font-mono text-slate-700">TC-2026-001</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Max Rounds</span>
                <span className="text-sm font-medium text-slate-900">2</span>
              </div>

              {traveler && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Traveler</span>
                  <span className="text-sm font-medium text-slate-900">{traveler}</span>
                </div>
              )}

              {destination && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Destination</span>
                  <span className="text-sm font-medium text-slate-900">{destination}</span>
                </div>
              )}

              {nightsCount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Duration</span>
                  <span className="text-sm font-medium text-slate-900">
                    {nightsCount} night{nightsCount !== 1 ? "s" : ""}
                  </span>
                </div>
              )}

              {maxBudget && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Budget</span>
                  <span className="text-sm font-medium text-slate-900">{maxBudget}&nbsp;&euro;/night</span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 mt-5 pt-5">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-navy-800 text-white py-3 rounded-xl font-semibold text-sm hover:bg-navy-700 transition-colors"
              >
                {submitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2" />
                    Launching...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-rocket mr-2" />
                    Start Negotiation
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-slate-400">
                The AI agent will negotiate autonomously within your policy limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
