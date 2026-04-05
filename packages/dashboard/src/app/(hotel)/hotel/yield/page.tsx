"use client";

import { useState, useCallback } from "react";

/* ── Inclusions config ──────────────────────────────────────────────────── */

interface Inclusion {
  id: string;
  label: string;
  icon: string;
  checked: boolean;
}

const defaultInclusions: Inclusion[] = [
  { id: "wifi", label: "WiFi", icon: "fa-solid fa-wifi", checked: true },
  { id: "breakfast", label: "Breakfast", icon: "fa-solid fa-mug-saucer", checked: true },
  { id: "late-checkout", label: "Late Checkout", icon: "fa-solid fa-clock", checked: false },
  { id: "parking", label: "Parking", icon: "fa-solid fa-square-parking", checked: false },
  { id: "gym", label: "Gym Access", icon: "fa-solid fa-dumbbell", checked: true },
];

/* ── Page Component ─────────────────────────────────────────────────────── */

export default function HotelYieldPage() {
  /* Floor Rate */
  const [floorRate, setFloorRate] = useState(120);

  /* Volume Discounts */
  const [volumeThreshold, setVolumeThreshold] = useState(50);
  const [volumeDiscount, setVolumeDiscount] = useState(12);

  /* Auto-Inclusions */
  const [inclusions, setInclusions] = useState<Inclusion[]>(defaultInclusions);
  const [minNightsForInclusions, setMinNightsForInclusions] = useState(2);

  /* Natural Language */
  const [nlPrompt, setNlPrompt] = useState("");

  /* Save state */
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toggleInclusion = useCallback((id: string) => {
    setInclusions((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, checked: !inc.checked } : inc)),
    );
  }, []);

  const handleSave = useCallback(() => {
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      setToast("Yield configuration saved successfully.");
      setTimeout(() => setToast(null), 3000);
    }, 800);
  }, []);

  const handleApplyNL = useCallback(() => {
    alert("Coming soon \u2014 Natural language configuration will be available with the Hotel Agent AI upgrade.");
  }, []);

  const inputClass =
    "w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm";

  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">Yield Configuration</h1>
        <p className="mt-1 text-sm text-slate-500">Le Marais Boutique Hotel &mdash; Set your pricing rules</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* ── Left Column ─────────────────────────────────────────────────── */}
        <div className="space-y-6">
          {/* Floor Rate */}
          <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <div className="flex items-center gap-2 mb-1">
              <i className="fa-solid fa-shield-halved text-navy-600 text-sm" />
              <h2 className="font-display text-base font-semibold text-slate-900">Floor Rate</h2>
            </div>
            <p className="text-xs text-slate-500 mb-5">I never go below this rate &mdash; my absolute minimum.</p>

            {/* Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400">80&euro;</span>
                <span className="text-2xl font-bold text-navy-800">{floorRate}&nbsp;&euro;</span>
                <span className="text-xs text-slate-400">200&euro;</span>
              </div>
              <input
                type="range"
                min={80}
                max={200}
                step={5}
                value={floorRate}
                onChange={(e) => setFloorRate(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-navy-800"
                style={{
                  background: `linear-gradient(to right, #00007A ${((floorRate - 80) / 120) * 100}%, #e2e8f0 ${((floorRate - 80) / 120) * 100}%)`,
                }}
              />
            </div>

            {/* Visual indicator */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <i className="fa-solid fa-triangle-exclamation text-amber-600 text-sm" />
              <p className="text-xs text-amber-700">
                Your Hotel Agent will <strong>never</strong> accept a rate below {floorRate}&euro;/night, regardless of negotiation pressure.
              </p>
            </div>
          </section>

          {/* Volume Discounts */}
          <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <div className="flex items-center gap-2 mb-1">
              <i className="fa-solid fa-chart-simple text-navy-600 text-sm" />
              <h2 className="font-display text-base font-semibold text-slate-900">Volume Discounts</h2>
            </div>
            <p className="text-xs text-slate-500 mb-5">Reward corporate accounts that bring consistent volume.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Minimum nights per year to qualify
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={volumeThreshold}
                    onChange={(e) => setVolumeThreshold(Number(e.target.value))}
                    min={1}
                    className={inputClass}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                    nights/year
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Discount percentage applied
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={volumeDiscount}
                    onChange={(e) => setVolumeDiscount(Number(e.target.value))}
                    min={1}
                    max={30}
                    className={inputClass}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                    %
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-600">
                  <i className="fa-solid fa-calculator text-slate-400 mr-1.5" />
                  Example: A corporate with {volumeThreshold}+ nights/year gets <strong className="text-green-600">-{volumeDiscount}%</strong> on base rate.
                  Standard room at 145&euro; &rarr; <strong>{Math.round(145 * (1 - volumeDiscount / 100))}&euro;</strong>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ── Right Column ────────────────────────────────────────────────── */}
        <div className="space-y-6">
          {/* Auto-Inclusions */}
          <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <div className="flex items-center gap-2 mb-1">
              <i className="fa-solid fa-gift text-navy-600 text-sm" />
              <h2 className="font-display text-base font-semibold text-slate-900">Auto-Inclusions</h2>
            </div>
            <p className="text-xs text-slate-500 mb-5">Automatically include these amenities for qualifying stays.</p>

            <div className="space-y-2 mb-5">
              {inclusions.map((inc) => (
                <label
                  key={inc.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    inc.checked
                      ? "border-navy-600/30 bg-navy-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={inc.checked}
                    onChange={() => toggleInclusion(inc.id)}
                    className="sr-only"
                  />
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors ${
                      inc.checked
                        ? "border-navy-800 bg-navy-800 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {inc.checked && <i className="fa-solid fa-check text-[10px]" />}
                  </div>
                  <i className={`${inc.icon} w-5 text-center text-sm ${inc.checked ? "text-navy-600" : "text-slate-400"}`} />
                  <span className={`text-sm font-medium ${inc.checked ? "text-slate-900" : "text-slate-600"}`}>
                    {inc.label}
                  </span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Minimum stay to qualify
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={minNightsForInclusions}
                  onChange={(e) => setMinNightsForInclusions(Number(e.target.value))}
                  min={1}
                  max={14}
                  className={inputClass}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                  nights
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-400">
                Selected inclusions auto-apply for stays of {minNightsForInclusions}+ nights.
              </p>
            </div>
          </section>

          {/* Natural Language Config */}
          <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6 relative overflow-hidden">
            {/* Premium badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                <i className="fa-solid fa-sparkles text-[8px]" />
                AI-Powered
              </span>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <i className="fa-solid fa-wand-magic-sparkles text-purple-500 text-sm" />
              <h2 className="font-display text-base font-semibold text-slate-900">Natural Language Config</h2>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Tell your Hotel Agent what you want in plain language. It will translate your instructions into pricing rules.
            </p>

            <textarea
              value={nlPrompt}
              onChange={(e) => setNlPrompt(e.target.value)}
              placeholder={"Tell your Hotel Agent what you want...\n\nExamples:\n\u2022 \"Fill my Monday/Tuesday rooms first\"\n\u2022 \"Reward accounts with 50+ nights/year\"\n\u2022 \"No non-refundable for new accounts\""}
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 transition-colors text-sm resize-none placeholder:text-slate-400"
            />

            <button
              type="button"
              onClick={handleApplyNL}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:from-purple-700 hover:to-indigo-700 transition-all shadow-soft"
            >
              <i className="fa-solid fa-wand-magic-sparkles text-xs" />
              Apply with AI
            </button>
          </section>
        </div>
      </div>

      {/* ── Footer Actions ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
        {toast && (
          <p className="mr-auto text-sm font-medium text-green-600">
            <i className="fa-solid fa-check-circle mr-1" />
            {toast}
          </p>
        )}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Revert Changes
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-700 transition-colors shadow-soft disabled:opacity-60"
        >
          {saving ? (
            <>
              <i className="fa-solid fa-spinner fa-spin text-xs" />
              Saving...
            </>
          ) : (
            <>
              <i className="fa-solid fa-check text-xs" />
              Save Configuration
            </>
          )}
        </button>
      </div>
    </div>
  );
}
