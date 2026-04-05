"use client";

import { hotelKPIs, hotelProperties, hotelNegotiations } from "@/lib/demo-data";

const statusColor: Record<string, string> = {
  in_progress: "badge-amber",
  confirmed: "badge-emerald",
  escalated: "badge-red",
  timeout: "badge-slate",
};

export default function HotelDashboardPage() {
  const kpis: Array<{
    value: string;
    trend: string;
    trendUp: boolean;
    label: string;
    icon: string;
    showCircle?: boolean;
    warning?: boolean;
  }> = [
    { ...hotelKPIs.revpar, icon: "fa-chart-line" },
    { ...hotelKPIs.occupancy, icon: "fa-building", showCircle: true },
    { ...hotelKPIs.adr, icon: "fa-coins" },
    { ...hotelKPIs.corporateRevenue, icon: "fa-briefcase", warning: true },
  ];

  return (
    <>
      {/* Header */}
      <header className="h-16 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Overview &amp; Performance</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors">
            <i className="fa-solid fa-bell text-lg" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald rounded-full" />
          </button>
          <span className="text-sm text-slate-500 font-mono">
            {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
          <a href="/hotel/negotiations" className="btn-emerald px-4 py-2 rounded-lg text-sm font-medium">
            <i className="fa-solid fa-handshake mr-2" />
            Review Negotiations
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up">
          {kpis.map((kpi, i) => (
            <div
              key={kpi.label}
              className={`bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 ${kpi.warning && !kpi.trendUp ? "border-t-4 border-t-amber" : ""} delay-${(i + 1) * 100}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center">
                  <i className={`fa-solid ${kpi.icon} text-emerald`} />
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    kpi.trendUp
                      ? "bg-emerald/10 text-emerald"
                      : kpi.warning
                      ? "bg-amber/10 text-amber"
                      : "bg-emerald/10 text-emerald"
                  }`}
                >
                  {kpi.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 font-mono">{kpi.value}</p>
              <p className="text-xs text-slate-500 mt-1">{kpi.label}</p>

              {/* Circular occupancy indicator */}
              {kpi.showCircle && (
                <div className="mt-3 flex items-center gap-2">
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeDasharray={`${78.2 * 0.942} ${100 * 0.942}`}
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                  <span className="text-xs text-slate-500">of 100% capacity</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Revenue Chart Area */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 animate-fade-up delay-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              <i className="fa-solid fa-chart-area text-emerald mr-2" />
              Evolution Revenus (30 derniers jours)
            </h2>
            <div className="flex gap-2">
              <button className="btn-outline px-3 py-1.5 rounded-md text-xs">7D</button>
              <button className="btn-emerald px-3 py-1.5 rounded-md text-xs">30D</button>
              <button className="btn-outline px-3 py-1.5 rounded-md text-xs">90D</button>
            </div>
          </div>
          <div className="h-56 flex items-end justify-between gap-1 px-4">
            {Array.from({ length: 30 }, (_, i) => {
              const h = 30 + Math.random() * 70;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-emerald/60 hover:bg-emerald transition-colors"
                  style={{ height: `${h}%` }}
                  title={`Day ${i + 1}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500 px-4">
            <span>Mar 7</span>
            <span>Mar 14</span>
            <span>Mar 21</span>
            <span>Mar 28</span>
            <span>Apr 6</span>
          </div>
        </div>

        {/* Two columns: Performance + Active Negotiations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up delay-300">
          {/* Performance Table */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0]">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                <i className="fa-solid fa-ranking-star text-emerald mr-2" />
                Property Performance
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table w-full text-left">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Occupancy</th>
                    <th>ADR</th>
                    <th>RevPAR</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelProperties.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="text-slate-900 font-medium">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.city}</div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-emerald"
                              style={{ width: `${p.occupancy}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-900">{p.occupancy}%</span>
                        </div>
                      </td>
                      <td className="text-slate-900 font-mono">{p.adr}</td>
                      <td className="text-slate-900 font-mono">{p.revpar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Negotiations */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                <i className="fa-solid fa-bolt text-emerald mr-2" />
                Active Negotiations
              </h2>
              <a href="/hotel/negotiations" className="text-sm text-emerald hover:underline">
                View all
              </a>
            </div>
            <div className="p-4 space-y-3">
              {hotelNegotiations.slice(0, 4).map((n) => (
                <a
                  key={n.id}
                  href={`/hotel/negotiations/${n.id}`}
                  className="block bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 hover:border-emerald/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-emerald">{n.id}</span>
                    <span className={`badge ${statusColor[n.status] || "badge-slate"}`}>
                      {n.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-sm text-slate-900 font-medium">{n.corporate}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {n.traveler} &middot; {n.destination} &middot; {n.checkIn} &rarr; {n.checkOut}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-slate-500">
                      Round {n.round}/{n.maxRounds}
                    </span>
                    <span className="text-slate-900 font-mono">
                      {n.initialRate} &rarr; {n.currentRate}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
