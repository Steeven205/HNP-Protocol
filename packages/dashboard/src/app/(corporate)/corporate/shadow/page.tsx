"use client";

import { shadowReport } from "@/lib/demo-data";

export default function ShadowReportsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Shadow Mode Reports</h1>
          <p className="text-[#717171] mt-1">Simulated savings from AI-powered negotiation</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="form-input rounded-lg px-4 py-2.5 text-sm">
            <option>Q1 2026</option>
            <option>Q4 2025</option>
            <option>Q3 2025</option>
          </select>
          <button className="rounded-lg px-5 py-2.5 text-sm font-semibold border border-[#EBEBEB] text-[#222] hover:bg-[#F7F7F7] transition-colors">
            <i className="fa-solid fa-download mr-1.5" />
            Export
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Hero KPI */}
        <div className="bg-white rounded-xl border border-emerald/20 p-8 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-emerald/10 text-emerald text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <i className="fa-solid fa-flask text-[10px]" />
            Shadow Mode &mdash; {shadowReport.period}
          </div>
          <h2 className="text-5xl font-semibold text-emerald mb-2">
            &euro;{shadowReport.totalSavings.toLocaleString()}
          </h2>
          <p className="text-lg text-[#222] font-medium mb-1">saved with Rateflow AI</p>
          <p className="text-sm text-[#717171]">
            {shadowReport.savingsPct}% average savings vs traditional booking
          </p>
        </div>

        {/* Summary Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Total Bookings</p>
            <p className="mt-2 text-3xl font-semibold text-[#222]">{shadowReport.totalBookings}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Avg. Savings/Booking</p>
            <p className="mt-2 text-3xl font-semibold text-emerald">&euro;{shadowReport.avgSavingsPerBooking.toFixed(0)}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Top Savings City</p>
            <p className="mt-2 text-3xl font-semibold text-[#222]">{shadowReport.topSavingsCity}</p>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-6 py-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#222]">
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
                    <td className="text-[#222] font-medium">
                      <i className="fa-solid fa-location-dot text-emerald mr-2 text-xs" />
                      {row.city}
                    </td>
                    <td className="text-right text-[#484848]">{row.bookings}</td>
                    <td className="text-right text-[#717171]">&euro;{row.actualSpend.toLocaleString()}</td>
                    <td className="text-right text-emerald font-medium">&euro;{row.hnpSpend.toLocaleString()}</td>
                    <td className="text-right text-emerald font-semibold">&euro;{row.savings.toLocaleString()}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-[#F7F7F7] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-emerald"
                            style={{ width: `${row.savingsPct * 4}%` }}
                          />
                        </div>
                        <span className="text-emerald font-semibold text-xs">{row.savingsPct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[#EBEBEB]">
                  <td className="text-[#222] font-semibold pt-4">Total</td>
                  <td className="text-right text-[#222] font-semibold pt-4">{shadowReport.totalBookings}</td>
                  <td className="text-right text-[#484848] font-semibold pt-4">&euro;{shadowReport.totalSpendActual.toLocaleString()}</td>
                  <td className="text-right text-emerald font-semibold pt-4">&euro;{shadowReport.totalSpendHNP.toLocaleString()}</td>
                  <td className="text-right text-emerald font-semibold pt-4">&euro;{shadowReport.totalSavings.toLocaleString()}</td>
                  <td className="text-right text-emerald font-semibold pt-4">{shadowReport.savingsPct}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Monthly Trend Chart Placeholder */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h3 className="text-base font-semibold text-[#222] mb-5">
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
                      className="w-5 rounded-t bg-[#EBEBEB]"
                      style={{ height: `${actualH}px` }}
                    />
                    <div
                      className="w-5 rounded-t bg-emerald"
                      style={{ height: `${hnpH}px` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#717171]">{m.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#EBEBEB]">
            <span className="flex items-center gap-1.5 text-xs text-[#717171]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#EBEBEB]" />
              Actual Spend
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#717171]">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald" />
              HNP Spend (simulated)
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-xl border border-emerald/20 p-8 text-center">
          <h3 className="text-xl font-semibold text-[#222] mb-2">Ready to go live?</h3>
          <p className="text-sm text-[#717171] mb-6 max-w-lg mx-auto">
            Shadow mode has proven &euro;{shadowReport.totalSavings.toLocaleString()} in potential savings this quarter.
            Switch to Live mode to start capturing real savings on every booking.
          </p>
          <button className="bg-[#222] text-white hover:bg-black px-8 py-3 rounded-lg text-sm font-semibold transition-colors">
            <i className="fa-solid fa-rocket mr-2" />
            Switch from Shadow to Live Mode
          </button>
        </div>
      </div>
    </div>
  );
}
