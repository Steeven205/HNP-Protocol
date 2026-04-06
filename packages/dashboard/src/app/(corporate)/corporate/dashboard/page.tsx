"use client";

import { corporateKPIs, recentBookings, spendingByMonth } from "@/lib/demo-data";

const kpiCards = [
  { ...corporateKPIs.totalSpend, icon: "fa-solid fa-wallet" },
  { ...corporateKPIs.avgRate, icon: "fa-solid fa-bed" },
  { ...corporateKPIs.bookingsCount, icon: "fa-solid fa-calendar-check" },
  { ...corporateKPIs.savings, icon: "fa-solid fa-piggy-bank" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: "badge-emerald",
    in_progress: "badge-amber",
    escalated: "badge-red",
    cancelled: "badge-slate",
  };
  const labelMap: Record<string, string> = {
    confirmed: "Confirmed",
    in_progress: "In Progress",
    escalated: "Escalated",
    cancelled: "Cancelled",
  };
  return (
    <span className={`badge ${map[status] ?? "badge-slate"}`}>
      {labelMap[status] ?? status}
    </span>
  );
}

export default function CorporateDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#222]">Dashboard</h1>
        <p className="text-[#717171] mt-1">Overview &amp; Savings</p>
      </div>

      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
              <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">{kpi.label}</p>
              <p className="mt-2 text-3xl font-semibold text-[#222]">{kpi.value}</p>
              <p className={`mt-1.5 text-xs font-medium flex items-center gap-1 ${kpi.trendUp ? "text-emerald" : "text-red-400"}`}>
                <i className={`fa-solid ${kpi.trendUp ? "fa-arrow-up" : "fa-arrow-down"} text-[9px]`} />
                {kpi.trend} vs last quarter
              </p>
            </div>
          ))}
        </div>

        {/* Spending Chart Placeholder */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#222]">Monthly Spend vs Budget</h2>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-[#717171]">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald" />
                Actual Spend
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#717171]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#EBEBEB]" />
                Budget
              </span>
            </div>
          </div>
          {/* Bar chart */}
          <div className="h-48 flex items-end gap-4 px-2">
            {spendingByMonth.map((m) => {
              const maxVal = Math.max(...spendingByMonth.map((d) => Math.max(d.spend, d.budget)));
              const spendH = (m.spend / maxVal) * 100;
              const budgetH = (m.budget / maxVal) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-1.5" style={{ height: "140px" }}>
                    <div
                      className="w-5 rounded-t bg-emerald transition-all hover:opacity-80"
                      style={{ height: `${spendH}%` }}
                      title={`€${m.spend.toLocaleString()}`}
                    />
                    <div
                      className="w-5 rounded-t bg-[#EBEBEB] transition-all hover:opacity-80"
                      style={{ height: `${budgetH}%` }}
                      title={`€${m.budget.toLocaleString()}`}
                    />
                  </div>
                  <span className="text-[11px] text-[#717171] font-medium">{m.month}</span>
                </div>
              );
            })}
          </div>
          {/* Values below */}
          <div className="flex gap-4 px-2 mt-2">
            {spendingByMonth.map((m) => (
              <div key={m.month} className="flex-1 text-center">
                <span className="text-[10px] text-[#B0B0B0]">&euro;{(m.spend / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-6 py-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#222]">Recent Bookings</h2>
            <span className="flex items-center gap-1.5 text-xs text-emerald">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse-dot" />
              Live
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Traveler</th>
                  <th>Destination</th>
                  <th>Hotel</th>
                  <th>Dates</th>
                  <th className="text-right">Rate</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Savings</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="font-mono text-emerald text-xs">{b.id}</td>
                    <td className="text-[#222] font-medium">{b.traveler}</td>
                    <td className="text-[#484848]">{b.destination}</td>
                    <td className="text-[#484848]">{b.hotel}</td>
                    <td className="text-[#717171] text-xs">
                      {b.checkIn} &rarr; {b.checkOut}
                    </td>
                    <td className="text-right text-[#222] font-semibold">&euro;{b.rate}/n</td>
                    <td className="text-center">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="text-right">
                      {b.savings > 0 ? (
                        <span className="text-emerald font-semibold">&euro;{b.savings}</span>
                      ) : (
                        <span className="text-[#B0B0B0]">&mdash;</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
