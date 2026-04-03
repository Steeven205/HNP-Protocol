"use client";

import { useState } from "react";
import Link from "next/link";

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {[1, 2].map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              step <= current ? "bg-navy-800" : "bg-slate-300"
            }`}
          />
          {step < 2 && (
            <div
              className={`h-0.5 w-8 transition-colors ${
                step < current ? "bg-navy-800" : "bg-slate-300"
              }`}
            />
          )}
        </div>
      ))}
      <span className="ml-2 text-sm font-medium text-slate-600">
        Step {current} of 2 — Baseline Configuration
      </span>
    </div>
  );
}

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-navy-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function TagInput({
  tags,
  onChange,
  placeholder,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState("");

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput("");
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  return (
    <div className="flex flex-wrap items-center gap-2 w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-navy-600/20 focus-within:border-navy-600 transition-colors min-h-[42px]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-navy-50 text-navy-800 rounded-lg"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-navy-600/60 hover:text-navy-800 transition-colors"
          >
            <i className="fa-solid fa-xmark text-[10px]" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

export default function SetupPage() {
  // Corporate Policy state
  const [maxRate, setMaxRate] = useState(180);
  const [minCategory, setMinCategory] = useState("4 Stars");
  const [esgEnabled, setEsgEnabled] = useState(true);
  const [preferredChains, setPreferredChains] = useState([
    "Accor ALL",
    "Marriott Bonvoy",
  ]);

  // Hotel Yield Rules state
  const [baseRate, setBaseRate] = useState(145);
  const [floorRate, setFloorRate] = useState(110);
  const [seasonalMultiplier, setSeasonalMultiplier] = useState(true);
  const [cancellation, setCancellation] = useState({
    free24h: true,
    free48h: false,
    nonRefundable: false,
  });

  const inputClass =
    "w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm";

  const selectClass =
    "w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm appearance-none cursor-pointer";

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <div className="bg-white rounded-[16px] p-8 shadow-soft border border-slate-200">
        <StepIndicator current={2} />

        <h1 className="text-xl font-semibold text-slate-900 mb-1">
          Baseline Configuration
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Set the initial negotiation parameters for both sides of the protocol.
        </p>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Corporate Policy */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                <i className="fa-solid fa-building text-sm" />
              </div>
              <h2 className="text-base font-semibold text-slate-800">
                Corporate Policy
              </h2>
            </div>

            {/* Default Max Rate */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Default Max Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={maxRate}
                  onChange={(e) => setMaxRate(Number(e.target.value))}
                  className={inputClass + " pr-10"}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
                  &euro;
                </span>
              </div>
            </div>

            {/* Min Hotel Category */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Min Hotel Category
              </label>
              <div className="relative">
                <select
                  value={minCategory}
                  onChange={(e) => setMinCategory(e.target.value)}
                  className={selectClass}
                >
                  <option value="3 Stars">3 Stars</option>
                  <option value="4 Stars">4 Stars</option>
                  <option value="5 Stars">5 Stars</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
              </div>
            </div>

            {/* ESG Requirement */}
            <div className="mb-5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  ESG Requirement
                </label>
                <Toggle enabled={esgEnabled} onChange={setEsgEnabled} />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Require Tier B minimum ESG certification
              </p>
            </div>

            {/* Preferred Chains */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Preferred Chains
              </label>
              <TagInput
                tags={preferredChains}
                onChange={setPreferredChains}
                placeholder="Type and press Enter to add"
              />
            </div>
          </div>

          {/* Right: Hotel Yield Rules */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-500">
                <i className="fa-solid fa-hotel text-sm" />
              </div>
              <h2 className="text-base font-semibold text-slate-800">
                Hotel Yield Rules
              </h2>
            </div>

            {/* Base Rate */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Base Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={baseRate}
                  onChange={(e) => setBaseRate(Number(e.target.value))}
                  className={inputClass + " pr-10"}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
                  &euro;
                </span>
              </div>
            </div>

            {/* Floor Rate */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Floor Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={floorRate}
                  onChange={(e) => setFloorRate(Number(e.target.value))}
                  className={inputClass + " pr-10"}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
                  &euro;
                </span>
              </div>
            </div>

            {/* Seasonal Multiplier */}
            <div className="mb-5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Seasonal Multiplier
                </label>
                <Toggle
                  enabled={seasonalMultiplier}
                  onChange={setSeasonalMultiplier}
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Adjust rates for peak seasons automatically
              </p>
            </div>

            {/* Cancellation Policy */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Cancellation Policy
              </label>
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={cancellation.free24h}
                    onChange={(e) =>
                      setCancellation((prev) => ({
                        ...prev,
                        free24h: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-slate-300 text-navy-600 focus:ring-navy-600/20"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                    24h Free
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={cancellation.free48h}
                    onChange={(e) =>
                      setCancellation((prev) => ({
                        ...prev,
                        free48h: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-slate-300 text-navy-600 focus:ring-navy-600/20"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                    48h Free
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={cancellation.nonRefundable}
                    onChange={(e) =>
                      setCancellation((prev) => ({
                        ...prev,
                        nonRefundable: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-slate-300 text-navy-600 focus:ring-navy-600/20"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                    Non-Refundable
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
          <Link
            href="/organization"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            Back
          </Link>
          <Link
            href="/negotiations"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-navy-800 rounded-xl hover:bg-navy-700 transition-colors shadow-sm"
          >
            Launch Dashboard
            <i className="fa-solid fa-rocket text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
}
