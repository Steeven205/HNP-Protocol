"use client";

import { useState } from "react";
import { travelPolicy } from "@/lib/demo-data";

const cityRates = [
  { city: "Paris", max: travelPolicy.maxRates.paris, avg: 142, compliance: 96 },
  { city: "Lyon", max: travelPolicy.maxRates.lyon, avg: 125, compliance: 98 },
  { city: "Berlin", max: travelPolicy.maxRates.berlin, avg: 112, compliance: 94 },
  { city: "Amsterdam", max: travelPolicy.maxRates.amsterdam, avg: 148, compliance: 91 },
  { city: "London", max: travelPolicy.maxRates.london, avg: 178, compliance: 89 },
  { city: "Default", max: travelPolicy.maxRates.default, avg: 108, compliance: 97 },
];

export default function TravelPolicyPage() {
  const [approvalThreshold, setApprovalThreshold] = useState(travelPolicy.approvalAbove);
  const [cancellationRequired, setCancellationRequired] = useState(true);
  const [minCategory, setMinCategory] = useState(travelPolicy.minCategory);
  const [esgRequirement, setEsgRequirement] = useState(travelPolicy.esgRequirement);
  const [chains, setChains] = useState(travelPolicy.preferredChains);

  return (
    <div className="flex flex-col h-full">
      {/* ── Header Bar ──────────────────────────────────────────────────── */}
      <header className="h-16 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Travel Policy Configuration</h1>
          <p className="text-xs text-slate-500 mt-0.5">TechCorp SAS &mdash; Corporate Travel Rules</p>
        </div>
        <button className="btn-emerald px-5 py-2.5 rounded-lg text-xs font-semibold">
          <i className="fa-solid fa-floppy-disk mr-1.5" />
          Save Changes
        </button>
      </header>

      {/* ── Scrollable Content ──────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Rate Limits Section */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E2E8F0]">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              <i className="fa-solid fa-euro-sign text-emerald mr-2" />
              Rate Limits by City
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left">
              <thead>
                <tr>
                  <th>City</th>
                  <th className="text-right">Max Rate/Night</th>
                  <th className="text-right">Current Avg</th>
                  <th className="text-right">Compliance</th>
                </tr>
              </thead>
              <tbody>
                {cityRates.map((cr) => (
                  <tr key={cr.city}>
                    <td className="text-slate-900 font-medium">{cr.city}</td>
                    <td className="text-right">
                      <span className="text-emerald font-semibold">&euro;{cr.max}</span>
                    </td>
                    <td className="text-right text-slate-600">&euro;{cr.avg}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${cr.compliance >= 95 ? "bg-emerald" : cr.compliance >= 90 ? "bg-amber" : "bg-red"}`}
                            style={{ width: `${cr.compliance}%` }}
                          />
                        </div>
                        <span className={`text-xs font-semibold ${cr.compliance >= 95 ? "text-emerald" : cr.compliance >= 90 ? "text-amber" : "text-red"}`}>
                          {cr.compliance}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category & ESG */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
            <h3 className="font-display text-base font-semibold text-slate-900 mb-5">
              <i className="fa-solid fa-building text-emerald mr-2" />
              Category &amp; ESG Requirements
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Minimum Hotel Category
                </label>
                <select
                  value={minCategory}
                  onChange={(e) => setMinCategory(e.target.value)}
                  className="form-input w-full rounded-lg px-4 py-3 text-sm"
                >
                  <option value="2_star">2-Star</option>
                  <option value="3_star">3-Star</option>
                  <option value="4_star">4-Star</option>
                  <option value="5_star">5-Star</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  ESG Requirement
                </label>
                <select
                  value={esgRequirement}
                  onChange={(e) => setEsgRequirement(e.target.value)}
                  className="form-input w-full rounded-lg px-4 py-3 text-sm"
                >
                  <option value="none">No Requirement</option>
                  <option value="tier_C_minimum">Tier C Minimum</option>
                  <option value="tier_B_minimum">Tier B Minimum</option>
                  <option value="tier_A_minimum">Tier A Minimum</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cancellation Rules */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
            <h3 className="font-display text-base font-semibold text-slate-900 mb-5">
              <i className="fa-solid fa-shield-halved text-emerald mr-2" />
              Cancellation &amp; Approval
            </h3>

            <div className="space-y-5">
              {/* Cancellation toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-900 font-medium">24h Free Cancellation Required</p>
                  <p className="text-xs text-slate-500 mt-0.5">All bookings must include free cancellation</p>
                </div>
                <button
                  onClick={() => setCancellationRequired(!cancellationRequired)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    cancellationRequired ? "bg-emerald" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      cancellationRequired ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Approval threshold */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Approval Required Above
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={100}
                    max={500}
                    step={10}
                    value={approvalThreshold}
                    onChange={(e) => setApprovalThreshold(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-lg font-bold text-emerald w-20 text-right">&euro;{approvalThreshold}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Bookings above this rate require manager approval</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferred Chains */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
          <h3 className="font-display text-base font-semibold text-slate-900 mb-4">
            <i className="fa-solid fa-heart text-emerald mr-2" />
            Preferred Hotel Chains
          </h3>
          <p className="text-xs text-slate-500 mb-4">Hotels from preferred chains are prioritized during negotiation</p>

          <div className="flex flex-wrap gap-2">
            {chains.map((chain) => (
              <span
                key={chain}
                className="inline-flex items-center gap-2 bg-emerald/10 text-emerald text-sm font-medium rounded-lg px-4 py-2 border border-emerald/20"
              >
                {chain}
                <button
                  onClick={() => setChains(chains.filter((c) => c !== chain))}
                  className="w-4 h-4 rounded-full bg-emerald/20 flex items-center justify-center hover:bg-emerald/40 transition-colors"
                >
                  <i className="fa-solid fa-xmark text-[8px]" />
                </button>
              </span>
            ))}
            <button className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-500 text-sm font-medium rounded-lg px-4 py-2 border border-[#E2E8F0] hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <i className="fa-solid fa-plus text-xs" />
              Add Chain
            </button>
          </div>
        </div>

        {/* Additional Settings Summary */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
          <h3 className="font-display text-base font-semibold text-slate-900 mb-4">
            <i className="fa-solid fa-gear text-emerald mr-2" />
            Additional Settings
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl border border-[#F1F5F9] p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Max Stay</p>
              <p className="text-sm text-slate-900 font-medium">{travelPolicy.maxNights} nights</p>
            </div>
            <div className="bg-slate-50 rounded-xl border border-[#F1F5F9] p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Meal Policy</p>
              <p className="text-sm text-slate-900 font-medium">{travelPolicy.mealPolicy}</p>
            </div>
            <div className="bg-slate-50 rounded-xl border border-[#F1F5F9] p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Loyalty Program</p>
              <p className="text-sm text-slate-900 font-medium">{travelPolicy.loyaltyProgram}</p>
            </div>
            <div className="bg-slate-50 rounded-xl border border-[#F1F5F9] p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Negotiation Timeout</p>
              <p className="text-sm text-slate-900 font-medium">30 seconds max per round</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
