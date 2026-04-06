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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Travel Policy</h1>
          <p className="text-[#717171] mt-1">TechCorp SAS — Corporate Travel Rules</p>
        </div>
        <button className="bg-[#222] text-white hover:bg-black rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors">
          <i className="fa-solid fa-floppy-disk mr-1.5" />
          Save Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Rate Limits Section */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-6 py-5">
            <h2 className="text-lg font-semibold text-[#222]">
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
                    <td className="text-[#222] font-medium">{cr.city}</td>
                    <td className="text-right">
                      <span className="text-emerald font-semibold">&euro;{cr.max}</span>
                    </td>
                    <td className="text-right text-[#484848]">&euro;{cr.avg}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-[#F7F7F7] overflow-hidden">
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
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
            <h3 className="text-base font-semibold text-[#222] mb-5">
              <i className="fa-solid fa-building text-emerald mr-2" />
              Category &amp; ESG Requirements
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#222] mb-1.5">
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
                <label className="block text-sm font-medium text-[#222] mb-1.5">
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
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
            <h3 className="text-base font-semibold text-[#222] mb-5">
              <i className="fa-solid fa-shield-halved text-emerald mr-2" />
              Cancellation &amp; Approval
            </h3>

            <div className="space-y-5">
              {/* Cancellation toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#222] font-medium">24h Free Cancellation Required</p>
                  <p className="text-xs text-[#717171] mt-0.5">All bookings must include free cancellation</p>
                </div>
                <button
                  onClick={() => setCancellationRequired(!cancellationRequired)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    cancellationRequired ? "bg-[#222]" : "bg-[#EBEBEB]"
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
                <label className="block text-sm font-medium text-[#222] mb-1.5">
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
                    className="flex-1 accent-[#222]"
                  />
                  <span className="text-lg font-semibold text-[#222] w-20 text-right">&euro;{approvalThreshold}</span>
                </div>
                <p className="text-xs text-[#717171] mt-1">Bookings above this rate require manager approval</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferred Chains */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h3 className="text-base font-semibold text-[#222] mb-2">
            <i className="fa-solid fa-heart text-emerald mr-2" />
            Preferred Hotel Chains
          </h3>
          <p className="text-sm text-[#717171] mb-5">Hotels from preferred chains are prioritized during negotiation</p>

          <div className="flex flex-wrap gap-2">
            {chains.map((chain) => (
              <span
                key={chain}
                className="inline-flex items-center gap-2 bg-[#F7F7F7] text-[#222] text-sm font-medium rounded-full px-4 py-2 border border-[#EBEBEB]"
              >
                {chain}
                <button
                  onClick={() => setChains(chains.filter((c) => c !== chain))}
                  className="w-4 h-4 rounded-full bg-[#EBEBEB] flex items-center justify-center hover:bg-[#B0B0B0] transition-colors"
                >
                  <i className="fa-solid fa-xmark text-[8px] text-[#484848]" />
                </button>
              </span>
            ))}
            <button className="inline-flex items-center gap-1.5 text-[#717171] text-sm font-medium rounded-full px-4 py-2 border border-dashed border-[#EBEBEB] hover:border-[#222] hover:text-[#222] transition-colors">
              <i className="fa-solid fa-plus text-xs" />
              Add Chain
            </button>
          </div>
        </div>

        {/* Additional Settings Summary */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h3 className="text-base font-semibold text-[#222] mb-5">
            <i className="fa-solid fa-gear text-emerald mr-2" />
            Additional Settings
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <p className="text-xs text-[#717171] mb-1">Max Stay</p>
              <p className="text-sm text-[#222] font-medium">{travelPolicy.maxNights} nights</p>
            </div>
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <p className="text-xs text-[#717171] mb-1">Meal Policy</p>
              <p className="text-sm text-[#222] font-medium">{travelPolicy.mealPolicy}</p>
            </div>
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <p className="text-xs text-[#717171] mb-1">Loyalty Program</p>
              <p className="text-sm text-[#222] font-medium">{travelPolicy.loyaltyProgram}</p>
            </div>
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <p className="text-xs text-[#717171] mb-1">Negotiation Timeout</p>
              <p className="text-sm text-[#222] font-medium">30 seconds max per round</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
