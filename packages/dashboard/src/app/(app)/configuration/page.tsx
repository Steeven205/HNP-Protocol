"use client";

import { useState } from "react";
import { rateCaps, corporate, hotel } from "@/lib/mock-data";

interface RateCap {
  city: string;
  max_eur: number;
}

export default function ConfigurationPage() {
  /* ── Corporate Policy state ─────────────────────────────────────────── */
  const [caps, setCaps] = useState<RateCap[]>(() =>
    rateCaps.map((r) => ({ ...r })),
  );
  const [minCategory, setMinCategory] = useState(
    corporate.travel_policy.minimum_category === "3_star" ? "3" : "4",
  );
  const [cancellationPolicy, setCancellationPolicy] = useState("24h");
  const [esgEnabled, setEsgEnabled] = useState(true);

  /* ── Hotel Yield state ──────────────────────────────────────────────── */
  const [floorRate, setFloorRate] = useState(110);
  const [seasonalEnabled, setSeasonalEnabled] = useState(true);

  /* ── Rate cap helpers ───────────────────────────────────────────────── */
  function updateCap(index: number, field: keyof RateCap, value: string | number) {
    setCaps((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, [field]: field === "max_eur" ? Number(value) : value } : c,
      ),
    );
  }

  function removeCap(index: number) {
    setCaps((prev) => prev.filter((_, i) => i !== index));
  }

  function addCap() {
    setCaps((prev) => [...prev, { city: "", max_eur: 130 }]);
  }

  /* ── Shared classes ─────────────────────────────────────────────────── */
  const inputClass =
    "w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm";

  const selectClass =
    "w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm appearance-none cursor-pointer";

  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Configuration</h1>
        <span className="rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-medium text-green-700">
          v1.0 Active
        </span>
      </div>

      {/* ── Two-column grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-8">
        {/* ─── Left: Corporate Policy ─────────────────────────────────── */}
        <div className="space-y-8">
          <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
              Corporate Policy
            </h2>

            {/* Rate Caps per City */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Rate Caps per City
              </label>

              <div className="space-y-2">
                {caps.map((cap, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-brand-300 transition-colors"
                  >
                    <input
                      type="text"
                      value={cap.city}
                      onChange={(e) => updateCap(index, "city", e.target.value)}
                      placeholder="City name"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm"
                    />
                    <div className="relative w-32">
                      <input
                        type="number"
                        value={cap.max_eur}
                        onChange={(e) =>
                          updateCap(index, "max_eur", e.target.value)
                        }
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm text-right"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                        &euro;
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCap(index)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <i className="fa-solid fa-trash-can text-xs" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addCap}
                className="mt-3 flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors"
              >
                <i className="fa-solid fa-plus text-xs" />
                Add City
              </button>
            </div>

            {/* Minimum Hotel Category */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Minimum Hotel Category
              </label>
              <div className="relative">
                <select
                  value={minCategory}
                  onChange={(e) => setMinCategory(e.target.value)}
                  className={selectClass}
                >
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Required Cancellation Policy
              </label>
              <div className="relative">
                <select
                  value={cancellationPolicy}
                  onChange={(e) => setCancellationPolicy(e.target.value)}
                  className={selectClass}
                >
                  <option value="24h">24h Free</option>
                  <option value="48h">48h Free</option>
                  <option value="flexible">Flexible</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />
              </div>
            </div>

            {/* ESG Certification */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  ESG Certification Required
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Require Tier B minimum for all bookings
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={esgEnabled}
                onClick={() => setEsgEnabled((v) => !v)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  esgEnabled ? "bg-navy-800" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    esgEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </section>
        </div>

        {/* ─── Right: Hotel Yield Rules ───────────────────────────────── */}
        <div className="space-y-8">
          <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
              Hotel Yield Rules
            </h2>

            {/* Base Rate */}
            <div className="mb-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Base Rate (Standard)
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {hotel.name}
                  </p>
                </div>
                <span className="text-2xl font-bold text-navy-800">
                  {hotel.rooms.standard.base_rate_eur}&nbsp;&euro;
                </span>
              </div>
            </div>

            {/* Floor Rate */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Floor Rate (Minimum Acceptable)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={floorRate}
                  onChange={(e) => setFloorRate(Number(e.target.value))}
                  className={inputClass}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                  &euro;/night
                </span>
              </div>
            </div>

            {/* Length of Stay */}
            <div className="mb-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-2">
                Length of Stay Discount
              </p>
              <div className="space-y-1.5 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>3+ nights</span>
                  <span className="font-medium text-green-600">-8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>5+ nights</span>
                  <span className="font-medium text-green-600">-12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>7+ nights</span>
                  <span className="font-medium text-green-600">-15%</span>
                </div>
              </div>
            </div>

            {/* Seasonal Multiplier */}
            <div className="mb-5 flex items-center justify-between p-3 rounded-xl border border-slate-200">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Seasonal Multiplier
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Jul-Aug +20%, Christmas +20%, Last minute +10%
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={seasonalEnabled}
                onClick={() => setSeasonalEnabled((v) => !v)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  seasonalEnabled ? "bg-navy-800" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    seasonalEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Corporate Discount Tiers */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-2">
                Corporate Discount Tiers
              </p>
              <div className="space-y-1.5 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    Standard
                  </span>
                  <span className="font-medium">-5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    Silver (50+ nights/yr)
                  </span>
                  <span className="font-medium text-green-600">-8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    Gold (100+ nights/yr)
                  </span>
                  <span className="font-medium text-green-600">-12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    Platinum (200+ nights/yr)
                  </span>
                  <span className="font-medium text-green-600">-16%</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── Footer Actions ────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Revert Changes
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-700 transition-colors shadow-soft"
        >
          <i className="fa-solid fa-check text-xs" />
          Save Configuration
        </button>
      </div>
    </div>
  );
}
