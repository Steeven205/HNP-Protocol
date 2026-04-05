"use client";

import { shadowReport } from "@/lib/demo-data";

export default function ShadowReportsPage() {
  return (
    <div className="flex flex-col h-full">
      {/* ── Header Bar ──────────────────────────────────────────────────── */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 glass-panel flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Shadow Mode Reports</h1>
          <p className="text-xs text-slate-400 mt-0.5">Simulated savings from AI-powered negotiation</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="form-input-glass rounded-lg px-4 py-2 text-xs font-medium">
            <option>Q1 2026</option>
            <option>Q4 2025</option>
            <option>Q3 2025</option>
          </select>
          <button className="btn-outline px-4 py-2 rounded-lg text-xs font-semibold">
            <i className="fa-solid fa-download mr-1.5" />
            Export
          </button>
        </div>
      </header>

      {/* ── Scrollable Content ──────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Hero KPI */}
        <div className="glass-card rounded-2xl p-8 border-emerald/20 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-emerald/10 text-emerald text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <i className="fa-solid fa-flask text-[10px]" />
            Shadow Mode &mdash; {shadowReport.period}
          </div>
          <h2 className="font-display text-5xl font-bold text-emerald mb-2">
            &euro;{shadowReport.totalSavings.toLocaleString()}
          </h2>
          <p className="text-lg text-white font-medium mb-1">saved with Rateflow AI</p>
          <p className="text-sm text-slate-400">
            {shadowReport.savingsPct}% average savings vs traditional booking
          </p>
        </div>

        {/* Summary Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-up delay-100">
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Bookings</p>
                <p className="mt-1 text-2xl font-bold text-white font-display">{shadowReport.totalBookings}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                <i className="fa-solid fa-calendar-check text-blue" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Avg. Savings/Booking</p>
                <p className="mt-1 text-2xl font-bold text-emerald font-display">&euro;{shadowReport.avgSavingsPerBooking.toFixed(0)}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                <i className="fa-solid fa-piggy-bank text-emerald" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Top Savings City</p>
                <p className="mt-1 text-2xl font-bold text-white font-display">{shadowReport.topSavingsCity}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
                <i className="fa-solid fa-trophy text-purple" />
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="glass-panel rounded-2xl overflow-hidden animate-fade-up delay-200">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-white">
              <i className="fa-solid fa-chart-bar text-emerald mr-2" />
              Savings Breakdown by City
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left">
              <thead>
                <tr>
                  <th>City</th>
                  <th className="text-right">Bookings</th>
                  <th className="text-right">Actual Spend</th>
                  <th className="text-right">HNP Spend</th>
                  <th className="text-right">Savings</th>
                  <th className="text-right">Savings %</th>
                </tr>
              </thead>
              <tbody>
                {shadowReport.breakdown.map((row) => (
                  <tr key={row.city}>
                    <td className="text-white font-medium">
                      <i className="fa-solid fa-location-dot text-emerald mr-2 text-xs" />
                      {row.city}
                    </td>
                    <td className="text-right text-slate-300">{row.bookings}</td>
                    <td className="text-right text-slate-400">&euro;{row.actualSpend.toLocaleString()}</td>
                    <td className="text-right text-emerald font-medium">&euro;{row.hnpSpend.toLocaleString()}</td>
                    <td className="text-right text-emerald font-semibold">&euro;{row.savings.toLocaleString()}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-emerald"
                            style={{ width: `${row.savingsPct * 4}%` }}
                          />
                        </div>
                        <span className="text-emerald font-bold text-xs">{row.savingsPct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/10">
                  <td className="text-white font-bold pt-4">Total</td>
                  <td className="text-right text-white font-bold pt-4">{shadowReport.totalBookings}</td>
                  <td className="text-right text-slate-300 font-semibold pt-4">&euro;{shadowReport.totalSpendActual.toLocaleString()}</td>
                  <td className="text-right text-emerald font-semibold pt-4">&euro;{shadowReport.totalSpendHNP.toLocaleString()}</td>
                  <td className="text-right text-emerald font-bold pt-4">&euro;{shadowReport.totalSavings.toLocaleString()}</td>
                  <td className="text-right text-emerald font-bold pt-4">{shadowReport.savingsPct}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Monthly Trend Chart Placeholder */}
        <div className="glass-panel rounded-2xl p-6 animate-fade-up delay-300">
          <h3 className="font-display text-base font-semibold text-white mb-4">
            <i className="fa-solid fa-chart-line text-emerald mr-2" />
            Monthly Savings Trend
          </h3>
          <div className="flex items-end gap-4 h-40">
            {shadowReport.monthlyTrend.map((m) => {
              const maxVal = Math.max(...shadowReport.monthlyTrend.map((t) => t.actual));
              const actualH = (m.actual / maxVal) * 130;
              const hnpH = (m.hnp / maxVal) * 130;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1 w-full justify-center">
                    <div
                      className="w-5 rounded-t bg-white/10"
                      style={{ height: `${actualH}px` }}
                    />
                    <div
                      className="w-5 rounded-t bg-emerald"
                      style={{ height: `${hnpH}px` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{m.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-white/10" />
              Actual Spend
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald" />
              HNP Spend (simulated)
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card rounded-2xl p-8 text-center border-emerald/20 animate-fade-up delay-400">
          <h3 className="font-display text-xl font-bold text-white mb-2">Ready to go live?</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
            Shadow mode has proven &euro;{shadowReport.totalSavings.toLocaleString()} in potential savings this quarter.
            Switch to Live mode to start capturing real savings on every booking.
          </p>
          <button className="btn-emerald px-8 py-3 rounded-xl text-sm font-semibold">
            <i className="fa-solid fa-rocket mr-2" />
            Switch from Shadow to Live Mode
          </button>
        </div>
      </main>
    </div>
  );
}
