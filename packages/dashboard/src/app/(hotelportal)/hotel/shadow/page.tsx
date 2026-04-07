"use client";

const cityBreakdown = [
  { city: "Paris", country: "France", bookings: 180, rfpAvg: "€165", rateflowAvg: "€142", savingsNight: "€23", savingsPct: "14%" },
  { city: "Brussels", country: "Belgium", bookings: 95, rfpAvg: "€148", rateflowAvg: "€132", savingsNight: "€16", savingsPct: "11%" },
  { city: "Lyon", country: "France", bookings: 82, rfpAvg: "€138", rateflowAvg: "€115", savingsNight: "€23", savingsPct: "17%" },
  { city: "Amsterdam", country: "Netherlands", bookings: 58, rfpAvg: "€172", rateflowAvg: "€145", savingsNight: "€27", savingsPct: "16%" },
  { city: "Madrid", country: "Spain", bookings: 35, rfpAvg: "€155", rateflowAvg: "€128", savingsNight: "€27", savingsPct: "17%" },
];

const checklist = [
  { label: "450 Bookings Validated", desc: "Sufficient data collected across multiple cities and scenarios", done: true },
  { label: "Savings >10% Threshold", desc: "Average 22% savings meets minimum requirement", done: true },
  { label: "CFO Approval Obtained", desc: "Financial approval for production deployment", done: true },
  { label: "Team Training Completed", desc: "All travel managers trained on Rateflow platform", done: true },
  { label: "D-EDGE Integration Live", desc: "Real-time PMS sync for production bookings", done: false },
];

export default function ShadowReportsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Info Banner */}
      <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-5 bg-blue-50/30">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <i className="fa-solid fa-info-circle text-lg" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Shadow Mode Active</h3>
            <p className="text-sm text-[#374151] leading-relaxed">Shadow Mode simulates Rateflow negotiations on existing RFP bookings without disrupting contracts. This allows you to validate potential savings and system performance before switching to production mode.</p>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="fa-solid fa-flask text-emerald-600 text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
                  <i className="fa-solid fa-check" /> Active
                </span>
                <span className="text-[#6B7280] text-sm">Since Jan 1, 2026</span>
              </div>
              <h3 className="text-xl font-semibold text-[#111827]">Shadow Mode Running</h3>
              <p className="text-xs text-[#6B7280] mt-1">4 months of validation data -- 450 simulations completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider">Total Simulations</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <i className="fa-solid fa-chart-line" />
            </div>
          </div>
          <div className="text-4xl font-bold text-[#111827] mb-2">450</div>
          <div className="text-xs text-[#6B7280]">Jan - Apr 2026 -- Across all cities</div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider">Avg Savings</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <i className="fa-solid fa-piggy-bank" />
            </div>
          </div>
          <div className="text-4xl font-bold text-emerald-600 mb-2">22%</div>
          <div className="text-xs text-emerald-600">€32,400 total potential savings</div>
        </div>

        <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-6 bg-emerald-50/30">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider">Production Ready</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <i className="fa-solid fa-check-double" />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-base px-4 py-1.5 rounded-full font-medium inline-flex items-center gap-1">
              <i className="fa-solid fa-check" /> Ready
            </span>
          </div>
          <div className="text-xs text-[#6B7280]">All criteria met -- Savings validated</div>
        </div>
      </div>

      {/* Monthly Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { month: "March 2026", subtitle: "Latest monthly report", sims: 142, savings: "24%", value: "€8,200" },
          { month: "February 2026", subtitle: "Previous month report", sims: 128, savings: "21%", value: "€7,800" },
        ].map((r) => (
          <div key={r.month} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#111827]">{r.month}</h3>
                  <p className="text-xs text-[#6B7280] mt-1">{r.subtitle}</p>
                </div>
                <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-4 py-2 rounded-lg text-xs flex items-center gap-2">
                  <i className="fa-solid fa-download" /> Download PDF
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="text-[#6B7280] text-xs uppercase tracking-wider mb-2">Simulations</div>
                  <div className="text-3xl font-bold text-[#111827]">{r.sims}</div>
                </div>
                <div>
                  <div className="text-[#6B7280] text-xs uppercase tracking-wider mb-2">Savings</div>
                  <div className="text-3xl font-bold text-emerald-600">{r.savings}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">Total Value</span>
                  <span className="font-mono text-[#111827] font-semibold">{r.value}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RFP vs Rateflow Chart Placeholder */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <h3 className="text-xl font-bold text-[#111827]">RFP vs Rateflow Comparison</h3>
          <p className="text-xs text-[#6B7280] mt-1">12-week trend analysis -- Shaded area shows potential savings</p>
        </div>
        <div className="p-6">
          <div className="h-[300px] flex items-end justify-around gap-3 px-4">
            {["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10","W11","W12"].map((w, i) => {
              const rfp = [28, 29.5, 27.8, 30.2, 31.5, 29.8, 32.1, 30.5, 33.2, 31.8, 34.5, 32.9];
              const rf = [21.8, 23.1, 21.6, 23.5, 24.6, 23.2, 25.1, 23.8, 25.9, 24.8, 26.9, 25.7];
              return (
                <div key={w} className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-full flex gap-0.5" style={{ height: "250px", alignItems: "flex-end" }}>
                    <div className="flex-1 bg-slate-300 rounded-t" style={{ height: `${(rfp[i] / 35) * 250}px` }} title={`RFP: €${rfp[i]}K`} />
                    <div className="flex-1 bg-emerald-500 rounded-t" style={{ height: `${(rf[i] / 35) * 250}px` }} title={`Rateflow: €${rf[i]}K`} />
                  </div>
                  <span className="text-[10px] text-[#6B7280]">{w}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-[#6B7280]">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-300 rounded" /> RFP Contract</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded" /> Rateflow</div>
          </div>
        </div>
      </div>

      {/* Breakdown by City */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <h3 className="text-xl font-bold text-[#111827]">Breakdown by City</h3>
          <p className="text-xs text-[#6B7280] mt-1">Detailed savings analysis per destination</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full data-table text-left border-collapse">
            <thead>
              <tr>
                <th className="pl-6 pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">City</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Bookings</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">RFP Avg</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Rateflow Avg</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Savings/Night</th>
                <th className="pr-6 pt-4 pb-3 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Savings %</th>
              </tr>
            </thead>
            <tbody>
              {cityBreakdown.map((c) => (
                <tr key={c.city} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                  <td className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#F3F4F6] flex items-center justify-center text-[#6B7280] text-xs">
                        <i className="fa-solid fa-building" />
                      </div>
                      <div>
                        <div className="text-[#111827] font-medium text-sm">{c.city}</div>
                        <div className="text-xs text-[#6B7280]">{c.country}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-mono text-[#111827]">{c.bookings}</td>
                  <td className="py-4 font-mono text-[#6B7280]">{c.rfpAvg}</td>
                  <td className="py-4 font-mono text-emerald-600 font-semibold">{c.rateflowAvg}</td>
                  <td className="py-4 font-mono text-emerald-600">{c.savingsNight}</td>
                  <td className="pr-6 py-4 text-right">
                    <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-medium">{c.savingsPct}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ready to Go Live */}
      <div className="bg-white rounded-xl border border-emerald-200 shadow-sm overflow-hidden bg-emerald-50/20">
        <div className="p-6 border-b border-emerald-200 bg-emerald-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="fa-solid fa-rocket text-emerald-600 text-lg" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111827]">Ready to Go Live?</h3>
              <p className="text-xs text-[#6B7280] mt-1">Complete the checklist to activate production mode</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]">
                <input type="checkbox" checked={item.done} readOnly className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 mt-0.5" />
                <div className="flex-1">
                  <div className="text-[#111827] font-medium text-sm mb-1">{item.label}</div>
                  <div className="text-xs text-[#6B7280]">{item.desc}</div>
                </div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                  item.done
                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                    : "bg-amber-100 text-amber-700 border-amber-200"
                }`}>
                  <i className={`fa-solid ${item.done ? "fa-check" : "fa-clock"}`} /> {item.done ? "Complete" : "Pending"}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[#E5E7EB]">
            <button className="bg-emerald-400 text-white w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 cursor-not-allowed opacity-60" disabled>
              <i className="fa-solid fa-rocket" /> Switch to Production Mode
            </button>
            <p className="text-xs text-center text-[#6B7280] mt-3">Complete all checklist items to enable production mode</p>
          </div>
        </div>
      </div>
    </div>
  );
}
