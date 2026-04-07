"use client";

import { useState } from "react";

const cityBreakdown = [
  { city: "Paris, France", tag: "High Volume Route", simulations: 180, avgRFP: 165, avgRateflow: 142, savingsNight: 23, savingsPct: 14, totalPotential: 12420, compliance: 98, complianceColor: "emerald" as const },
  { city: "Brussels, Belgium", tag: "EU HQ Route", simulations: 95, avgRFP: 148, avgRateflow: 132, savingsNight: 16, savingsPct: 11, totalPotential: 4560, compliance: 95, complianceColor: "emerald" as const },
  { city: "Lyon, France", tag: "Regional Route", simulations: 65, avgRFP: 135, avgRateflow: 118, savingsNight: 17, savingsPct: 12, totalPotential: 3315, compliance: 88, complianceColor: "amber" as const },
  { city: "Amsterdam, NL", tag: "Tech Hub Route", simulations: 42, avgRFP: 185, avgRateflow: 155, savingsNight: 30, savingsPct: 16, totalPotential: 3780, compliance: 92, complianceColor: "emerald" as const },
];

const monthlyArchives = [
  { month: "March 2026", simulations: 142, savings: 8200, pct: 24 },
  { month: "February 2026", simulations: 128, savings: 7800, pct: 21 },
  { month: "January 2026", simulations: 95, savings: 5100, pct: 18, dimmed: true },
];

const weeklyData = [
  { week: "W1", rfp: 42, rateflow: 35 },
  { week: "W2", rfp: 45, rateflow: 38 },
  { week: "W3", rfp: 48, rateflow: 39 },
  { week: "W4", rfp: 41, rateflow: 34 },
  { week: "W5", rfp: 50, rateflow: 40 },
  { week: "W6", rfp: 55, rateflow: 44 },
  { week: "W7", rfp: 49, rateflow: 38 },
  { week: "W8", rfp: 52, rateflow: 41 },
  { week: "W9", rfp: 58, rateflow: 45 },
  { week: "W10", rfp: 60, rateflow: 48 },
  { week: "W11", rfp: 55, rateflow: 44 },
  { week: "W12", rfp: 62, rateflow: 49 },
];

export default function ShadowReportsPage() {
  const [cfoApproval, setCfoApproval] = useState(false);
  const [teamTrained, setTeamTrained] = useState(false);

  const canActivate = cfoApproval && teamTrained;
  const maxVal = Math.max(...weeklyData.map((d) => d.rfp));

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      {/* Info Banner */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 flex items-start gap-4">
        <i className="fa-solid fa-circle-info text-blue-500 mt-1 text-lg" />
        <div>
          <h3 className="text-sm font-semibold text-[#111827] mb-1">Shadow Mode Active</h3>
          <p className="text-xs text-[#374151]">
            Shadow Mode simulates Rateflow negotiations on your existing RFP bookings without disrupting contracts. Use this to validate savings before switching to production.{" "}
            <span className="text-emerald-600 cursor-pointer hover:underline">Learn more</span>
          </p>
        </div>
      </div>

      {/* Executive Savings Overview (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Simulations */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#6B7280]">Total Simulations</h3>
            <div className="w-8 h-8 rounded-full bg-[#F9FAFB] flex items-center justify-center text-[#6B7280]">
              <i className="fa-solid fa-flask" />
            </div>
          </div>
          <div className="text-4xl font-bold text-[#111827] mb-2">450</div>
          <div className="text-xs text-[#6B7280]">Bookings (Jan-Apr 2026)</div>
        </div>

        {/* Avg Savings vs RFP */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-emerald-600">Avg Savings vs RFP</h3>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <i className="fa-solid fa-piggy-bank" />
            </div>
          </div>
          <div className="flex items-end gap-3 mb-2">
            <div className="text-4xl font-bold text-emerald-600">22%</div>
            <div className="text-sm font-medium text-emerald-600 mb-1">&euro;32,400 potential</div>
          </div>
          <div className="text-xs text-emerald-500">Consistently exceeding 15% target</div>
        </div>

        {/* Production Readiness */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-medium text-[#6B7280]">Production Readiness</h3>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
              <i className="fa-solid fa-check" />
            </div>
          </div>
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#374151]">Savings &gt;10%</span>
              <i className="fa-solid fa-check text-emerald-500" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#374151]">Win rate &gt;80%</span>
              <i className="fa-solid fa-check text-emerald-500" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#374151]">Compliance 95%</span>
              <i className="fa-solid fa-check text-emerald-500" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E5E7EB] relative z-10">
            <span className="w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-200">
              Ready for Production
            </span>
          </div>
        </div>
      </div>

      {/* Savings Over Time Chart */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F9FAFB]">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-chart-area text-emerald-500 text-xl" />
            <h2 className="text-xl font-bold text-[#111827]">Savings Over Time: RFP vs Rateflow</h2>
          </div>
          <select className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-sm text-[#374151] focus:outline-none focus:border-emerald-500">
            <option>Last 12 Weeks</option>
            <option>Last 6 Months</option>
            <option>Year to Date</option>
          </select>
        </div>
        <div className="p-6">
          <div className="h-[320px] flex items-end gap-3 px-2">
            {weeklyData.map((d) => {
              const rfpH = (d.rfp / maxVal) * 280;
              const rfH = (d.rateflow / maxVal) * 280;
              return (
                <div key={d.week} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center gap-1" style={{ height: "300px" }}>
                    <div
                      className="w-4 rounded-t bg-[#D1D5DB] transition-all hover:opacity-80"
                      style={{ height: `${rfpH}px` }}
                      title={`RFP: \u20AC${d.rfp}K`}
                    />
                    <div
                      className="w-4 rounded-t bg-emerald-500 transition-all hover:opacity-80"
                      style={{ height: `${rfH}px` }}
                      title={`Rateflow: \u20AC${d.rateflow}K`}
                    />
                  </div>
                  <span className="text-[10px] text-[#6B7280]">{d.week}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#E5E7EB]">
            <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D1D5DB]" /> RFP Actual Spend
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Rateflow Simulated
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown by City / Route */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F9FAFB]">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-table-list text-emerald-500 text-xl" />
            <h2 className="text-xl font-bold text-[#111827]">Breakdown by City / Route</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xs" />
              <input type="text" placeholder="Filter cities..." className="bg-white border border-[#E5E7EB] rounded-lg py-1.5 pl-8 pr-3 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 w-48" />
            </div>
            <button className="border border-[#E5E7EB] px-3 py-1.5 rounded-lg text-sm text-[#374151] hover:bg-[#F3F4F6] transition-colors"><i className="fa-solid fa-filter" /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="pl-6 pt-4 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">City / Route</th>
                <th className="pt-4 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Simulations</th>
                <th className="pt-4 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Avg RFP Rate</th>
                <th className="pt-4 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Avg Rateflow</th>
                <th className="pt-4 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Savings/Night</th>
                <th className="pt-4 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Total Potential</th>
                <th className="pr-6 pt-4 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider text-right">Compliance</th>
              </tr>
            </thead>
            <tbody>
              {cityBreakdown.map((c) => (
                <tr key={c.city} className="cursor-pointer hover:bg-[#F9FAFB] transition-colors border-b border-[#F3F4F6]">
                  <td className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#F9FAFB] flex items-center justify-center text-[#6B7280]">
                        <i className="fa-solid fa-city" />
                      </div>
                      <div>
                        <div className="font-medium text-[#111827]">{c.city}</div>
                        <div className="text-xs text-[#6B7280]">{c.tag}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] text-[#374151] text-sm border border-[#E5E7EB]">
                      {c.simulations} bookings
                    </span>
                  </td>
                  <td className="py-4 font-mono text-[#6B7280]">&euro;{c.avgRFP.toFixed(2)}</td>
                  <td className="py-4 font-mono text-emerald-600 font-semibold">&euro;{c.avgRateflow.toFixed(2)}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-200">
                      &euro;{c.savingsNight} ({c.savingsPct}%)
                    </span>
                  </td>
                  <td className="py-4 font-mono text-[#111827]">&euro;{c.totalPotential.toLocaleString()}</td>
                  <td className="pr-6 py-4 text-right">
                    <span className={`text-sm ${c.complianceColor === "emerald" ? "text-emerald-600" : "text-amber-500"}`}>
                      <i className={`fa-solid ${c.complianceColor === "emerald" ? "fa-shield-halved" : "fa-shield-halved"} mr-1`} /> {c.compliance}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Reports & Activation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Reports List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
          <h3 className="text-lg font-bold text-[#111827] mb-4">Monthly Simulation Archives</h3>
          <div className="space-y-3">
            {monthlyArchives.map((m) => (
              <div key={m.month} className={`bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between ${m.dimmed ? "opacity-70" : ""}`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#6B7280]">
                    <i className="fa-solid fa-calendar-days" />
                  </div>
                  <div>
                    <div className="font-medium text-[#111827]">{m.month}</div>
                    <div className="text-xs text-[#6B7280]">{m.simulations} simulations &bull; &euro;{m.savings.toLocaleString()} savings ({m.pct}%)</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[#6B7280] hover:text-[#111827] transition-colors text-sm font-medium">View Details</button>
                  <button className="w-8 h-8 rounded bg-[#F3F4F6] hover:bg-[#E5E7EB] flex items-center justify-center text-[#374151] transition-colors"><i className="fa-solid fa-download" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activation Panel */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <i className="fa-solid fa-rocket text-6xl text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-emerald-700 mb-4 relative z-10">Ready to Go Live?</h3>
          <p className="text-sm text-[#374151] mb-6 relative z-10">Complete the checklist below to transition from Shadow Mode to live automated bookings.</p>

          <div className="space-y-3 mb-8 relative z-10">
            <label className="flex items-center gap-3 text-sm text-[#374151] cursor-pointer opacity-70">
              <input type="checkbox" checked disabled className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500" />
              <span>450 bookings validated</span>
            </label>
            <label className="flex items-center gap-3 text-sm text-[#374151] cursor-pointer opacity-70">
              <input type="checkbox" checked disabled className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500" />
              <span>Savings &gt;10% achieved</span>
            </label>
            <label className="flex items-center gap-3 text-sm text-[#111827] cursor-pointer">
              <input
                type="checkbox"
                checked={cfoApproval}
                onChange={(e) => setCfoApproval(e.target.checked)}
                className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500"
              />
              <span>CFO approval secured</span>
            </label>
            <label className="flex items-center gap-3 text-sm text-[#111827] cursor-pointer">
              <input
                type="checkbox"
                checked={teamTrained}
                onChange={(e) => setTeamTrained(e.target.checked)}
                className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500"
              />
              <span>Team trained on new workflow</span>
            </label>
          </div>

          <button
            disabled={!canActivate}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
              canActivate
                ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
                : "bg-emerald-200 text-emerald-400 cursor-not-allowed opacity-50"
            }`}
          >
            Switch to Production
          </button>
        </div>
      </div>
    </div>
  );
}
