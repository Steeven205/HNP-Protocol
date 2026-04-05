"use client";

import { corporateKPIs, recentBookings } from "@/lib/demo-data";

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
    <div className="flex flex-col h-full">
      {/* ── Header Bar ──────────────────────────────────────────────────── */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 glass-panel flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">Overview &amp; Savings</p>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs text-slate-400 font-mono">
            <i className="fa-regular fa-calendar mr-1.5" />
            April 6, 2026
          </span>
          <button className="relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <i className="fa-regular fa-bell text-slate-300 text-sm" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald text-navy-deep text-[9px] font-bold flex items-center justify-center">3</span>
          </button>
        </div>
      </header>

      {/* ── Scrollable Content ──────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {kpiCards.map((kpi) => (
            <div key={kpi.label} className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{kpi.label}</p>
                  <p className="mt-2 text-3xl font-bold text-white font-display">{kpi.value}</p>
                  <p className={`mt-1 text-xs font-medium flex items-center gap-1 ${kpi.trendUp ? "text-emerald" : "text-red-400"}`}>
                    <i className={`fa-solid ${kpi.trendUp ? "fa-arrow-up" : "fa-arrow-down"} text-[9px]`} />
                    {kpi.trend} vs last quarter
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                  <i className={`${kpi.icon} text-emerald`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spending Chart Placeholder */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-white">Monthly Spend vs Budget</h2>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald" />
                Actual Spend
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-white/20" />
                Budget
              </span>
            </div>
          </div>
          <div id="chart" className="h-48 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
            <p className="text-sm text-slate-500">Chart placeholder</p>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-white">Recent Bookings</h2>
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
                    <td className="text-white font-medium">{b.traveler}</td>
                    <td className="text-slate-300">{b.destination}</td>
                    <td className="text-slate-300">{b.hotel}</td>
                    <td className="text-slate-400 text-xs">
                      {b.checkIn} &rarr; {b.checkOut}
                    </td>
                    <td className="text-right text-white font-semibold">&euro;{b.rate}/n</td>
                    <td className="text-center">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="text-right">
                      {b.savings > 0 ? (
                        <span className="text-emerald font-semibold">&euro;{b.savings}</span>
                      ) : (
                        <span className="text-slate-500">&mdash;</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
