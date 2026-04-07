"use client";

import { useState } from "react";

const cityRates = [
  { city: "Paris", max: 180, currency: "EUR" },
  { city: "Brussels", max: 150, currency: "EUR" },
  { city: "Lyon", max: 130, currency: "EUR" },
  { city: "Default (Other Cities)", max: 120, currency: "EUR", isDefault: true },
];

export default function TravelPolicyPage() {
  const [minCategory, setMinCategory] = useState("3-Star Minimum");
  const [esgRequirement, setEsgRequirement] = useState("Tier B (Advanced)");
  const [cancellation24h, setCancellation24h] = useState(true);
  const [breakfastIncluded, setBreakfastIncluded] = useState(false);
  const [freeWifi, setFreeWifi] = useState(false);

  const [rateExceedsBudget, setRateExceedsBudget] = useState(true);
  const [trip7Nights, setTrip7Nights] = useState(true);
  const [internationalTravel, setInternationalTravel] = useState(true);
  const [lastMinute, setLastMinute] = useState(false);

  // Simulator state
  const [simCity, setSimCity] = useState("Paris");
  const [simNights, setSimNights] = useState(3);
  const [simRate, setSimRate] = useState(165);

  const cityLimits: Record<string, number> = { Paris: 180, Brussels: 150, Lyon: 130, London: 120 };
  const limit = cityLimits[simCity] ?? 120;
  const isApproved = simRate <= limit && simNights <= 7 && simCity !== "London";

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Policy Builder (2/3 width) */}
        <div className="w-full lg:w-2/3 space-y-6">

          {/* Rate Limits Section */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB] cursor-pointer hover:bg-[#F3F4F6] transition-colors">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-grip-vertical text-[#D1D5DB] cursor-grab" />
                <i className="fa-solid fa-coins text-emerald-500" />
                <h2 className="text-xl font-bold text-[#111827]">Rate Limits by City</h2>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs text-[#6B7280]">Active</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500" />
                </label>
                <i className="fa-solid fa-chevron-up text-[#9CA3AF] text-sm" />
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">City</th>
                      <th className="pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Max Rate/Night</th>
                      <th className="pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Currency</th>
                      <th className="pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cityRates.map((cr) => (
                      <tr key={cr.city} className="border-b border-[#F3F4F6]">
                        <td className="py-3">
                          {cr.isDefault ? (
                            <span className="text-[#6B7280] italic text-sm">{cr.city}</span>
                          ) : (
                            <input type="text" defaultValue={cr.city} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded px-3 py-1.5 text-sm w-32 text-[#111827] focus:outline-none focus:border-emerald-500" />
                          )}
                        </td>
                        <td className="py-3">
                          <div className="relative w-24">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm">&euro;</span>
                            <input type="number" defaultValue={cr.max} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded pl-7 pr-3 py-1.5 text-sm w-full text-[#111827] focus:outline-none focus:border-emerald-500" />
                          </div>
                        </td>
                        <td className="py-3">
                          <select defaultValue={cr.currency} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded px-3 py-1.5 text-sm text-[#374151]">
                            <option>EUR</option>
                            <option>USD</option>
                            <option>GBP</option>
                          </select>
                        </td>
                        <td className="py-3 text-right">
                          {!cr.isDefault && (
                            <button className="text-[#9CA3AF] hover:text-red-500 transition-colors"><i className="fa-solid fa-trash" /></button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 text-emerald-600 text-sm font-medium flex items-center gap-2 hover:text-emerald-700 transition-colors">
                <i className="fa-solid fa-plus" /> Add City Exception
              </button>
            </div>
          </div>

          {/* Hotel Preferences Section */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB] cursor-pointer hover:bg-[#F3F4F6] transition-colors">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-grip-vertical text-[#D1D5DB] cursor-grab" />
                <i className="fa-solid fa-building text-emerald-500" />
                <h2 className="text-xl font-bold text-[#111827]">Hotel Preferences & Requirements</h2>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs text-[#6B7280]">Active</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500" />
                </label>
                <i className="fa-solid fa-chevron-up text-[#9CA3AF] text-sm" />
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#6B7280] mb-1.5">Minimum Category</label>
                  <select
                    value={minCategory}
                    onChange={(e) => setMinCategory(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#111827] focus:outline-none focus:border-emerald-500"
                  >
                    <option>3-Star Minimum</option>
                    <option>4-Star Minimum</option>
                    <option>No Minimum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#6B7280] mb-1.5">ESG Requirement</label>
                  <select
                    value={esgRequirement}
                    onChange={(e) => setEsgRequirement(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#111827] focus:outline-none focus:border-emerald-500"
                  >
                    <option>No Requirement</option>
                    <option>Tier C (Basic)</option>
                    <option>Tier B (Advanced)</option>
                    <option>Tier A (Leader)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#6B7280] mb-1.5">Mandatory Inclusions</label>
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center gap-3 text-sm text-[#111827] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cancellation24h}
                        onChange={(e) => setCancellation24h(e.target.checked)}
                        className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500"
                      />
                      24h Free Cancellation
                    </label>
                    <label className="flex items-center gap-3 text-sm text-[#111827] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={breakfastIncluded}
                        onChange={(e) => setBreakfastIncluded(e.target.checked)}
                        className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500"
                      />
                      Breakfast Included
                    </label>
                    <label className="flex items-center gap-3 text-sm text-[#111827] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={freeWifi}
                        onChange={(e) => setFreeWifi(e.target.checked)}
                        className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500"
                      />
                      Free WiFi
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Approval Workflow Section */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB] cursor-pointer hover:bg-[#F3F4F6] transition-colors">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-grip-vertical text-[#D1D5DB] cursor-grab" />
                <i className="fa-solid fa-code-branch text-emerald-500" />
                <h2 className="text-xl font-bold text-[#111827]">Approval Workflow & Exceptions</h2>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs text-[#6B7280]">Active</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500" />
                </label>
                <i className="fa-solid fa-chevron-up text-[#9CA3AF] text-sm" />
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Trigger Conditions */}
              <div>
                <h3 className="text-sm font-semibold text-[#111827] mb-3">Require manual approval if:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { label: "Rate exceeds budget", desc: "Any amount over city limit", state: rateExceedsBudget, set: setRateExceedsBudget },
                    { label: "Trip > 7 nights", desc: "Extended stay requires review", state: trip7Nights, set: setTrip7Nights },
                    { label: "International Travel", desc: "Outside of EU zone", state: internationalTravel, set: setInternationalTravel },
                    { label: "Last-minute booking", desc: "< 48h before check-in", state: lastMinute, set: setLastMinute },
                  ].map((rule) => (
                    <label key={rule.label} className="bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-lg flex items-start gap-3 cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                      <input
                        type="checkbox"
                        checked={rule.state}
                        onChange={(e) => rule.set(e.target.checked)}
                        className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500 mt-0.5"
                      />
                      <div>
                        <div className="text-sm text-[#111827] font-medium">{rule.label}</div>
                        <div className="text-xs text-[#6B7280] mt-0.5">{rule.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-[#E5E7EB]" />

              {/* Approval Chain */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[#111827]">Approval Chain</h3>
                  <button className="text-emerald-600 text-xs font-medium hover:text-emerald-700 transition-colors">+ Add Step</button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 bg-[#F9FAFB] p-2 rounded-lg border border-[#E5E7EB]">
                    <div className="w-6 h-6 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xs font-bold text-[#6B7280]">1</div>
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-sm text-[#111827]">Travel Manager</span>
                      <span className="text-xs text-[#6B7280]">(Marie Dupont)</span>
                    </div>
                    <i className="fa-solid fa-ellipsis-vertical text-[#9CA3AF] px-2 cursor-pointer" />
                  </div>
                  <div className="flex flex-col items-center justify-center py-1">
                    <div className="w-px h-4 bg-[#E5E7EB]" />
                    <i className="fa-solid fa-chevron-down text-[#D1D5DB] text-[10px] -mt-1" />
                  </div>
                  <div className="flex items-center gap-3 bg-[#F9FAFB] p-2 rounded-lg border border-[#E5E7EB] opacity-70">
                    <div className="w-6 h-6 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xs font-bold text-[#6B7280]">2</div>
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-sm text-[#111827]">CFO</span>
                      <span className="text-xs text-[#6B7280]">(Only if &gt; &euro;500 over limit)</span>
                    </div>
                    <i className="fa-solid fa-ellipsis-vertical text-[#9CA3AF] px-2 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Trip Simulator (1/3 width) */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-6">
            <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden">
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-200 flex items-center gap-3">
                <i className="fa-solid fa-flask text-emerald-500" />
                <h2 className="text-lg font-bold text-emerald-700">Live Trip Simulator</h2>
              </div>

              <div className="p-5 space-y-5">
                <p className="text-xs text-[#6B7280]">Test how your current policy rules apply to a hypothetical booking request.</p>

                {/* Simulator Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-[#6B7280] mb-1">Destination</label>
                    <select
                      value={simCity}
                      onChange={(e) => setSimCity(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded px-3 py-1.5 text-sm text-[#111827] focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Paris">Paris, France</option>
                      <option value="Brussels">Brussels, Belgium</option>
                      <option value="Lyon">Lyon, France</option>
                      <option value="London">London, UK</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-1">Nights</label>
                      <input
                        type="number"
                        value={simNights}
                        onChange={(e) => setSimNights(Number(e.target.value))}
                        className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded px-3 py-1.5 text-sm text-[#111827] focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-1">Rate Found</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xs">&euro;</span>
                        <input
                          type="number"
                          value={simRate}
                          onChange={(e) => setSimRate(Number(e.target.value))}
                          className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded pl-6 pr-3 py-1.5 text-sm text-[#111827] focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-[#E5E7EB]" />

                {/* Simulator Results */}
                <div className="bg-[#F9FAFB] rounded-xl p-4 border border-[#F3F4F6]">
                  {isApproved ? (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-full text-center inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium border border-emerald-200">
                          <i className="fa-solid fa-check-circle" /> Auto-Approved
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs font-mono">
                        <li className="flex justify-between items-center text-emerald-600">
                          <span>Budget check ({simCity}):</span>
                          <span>&euro;{simRate} &le; &euro;{limit} OK</span>
                        </li>
                        <li className="flex justify-between items-center text-emerald-600">
                          <span>Duration check:</span>
                          <span>{simNights} nights &le; 7 OK</span>
                        </li>
                        {simCity !== "London" && (
                          <li className="flex justify-between items-center text-emerald-600">
                            <span>Location check:</span>
                            <span>EU Zone OK</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-full text-center inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-medium border border-amber-200">
                          <i className="fa-solid fa-triangle-exclamation" /> Requires Approval
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs font-mono">
                        {simRate > limit ? (
                          <li className="flex justify-between items-center text-red-500">
                            <span>Budget check ({simCity}):</span>
                            <span>&euro;{simRate} &gt; &euro;{limit} X</span>
                          </li>
                        ) : (
                          <li className="flex justify-between items-center text-emerald-600">
                            <span>Budget check ({simCity}):</span>
                            <span>&euro;{simRate} &le; &euro;{limit} OK</span>
                          </li>
                        )}
                        {simNights > 7 ? (
                          <li className="flex justify-between items-center text-red-500">
                            <span>Duration check:</span>
                            <span>{simNights} nights &gt; 7 X</span>
                          </li>
                        ) : (
                          <li className="flex justify-between items-center text-emerald-600">
                            <span>Duration check:</span>
                            <span>{simNights} nights &le; 7 OK</span>
                          </li>
                        )}
                        {simCity === "London" && (
                          <li className="flex justify-between items-center text-red-500">
                            <span>Location check:</span>
                            <span>Non-EU Zone X</span>
                          </li>
                        )}
                      </ul>
                      <div className="mt-3 pt-3 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
                        Routes to: <strong className="text-[#111827]">Marie Dupont (Travel Manager)</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
