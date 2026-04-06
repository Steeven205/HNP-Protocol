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
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Dashboard</h1>
          <p className="text-[#717171] mt-1">Overview & Performance</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#717171] font-mono">
            {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
          <a href="/hotel/negotiations" className="btn-emerald px-4 py-2 rounded-lg text-sm font-medium">
            <i className="fa-solid fa-handshake mr-2" />
            Review Negotiations
          </a>
        </div>
      </div>

      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className={`bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow ${kpi.warning && !kpi.trendUp ? "border-l-4 border-l-amber" : ""}`}
            >
              <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">{kpi.label}</p>
              <p className="text-3xl font-semibold text-[#222] font-mono mt-2">{kpi.value}</p>
              <div className="flex items-center justify-between mt-3">
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

              {/* Circular occupancy indicator */}
              {kpi.showCircle && (
                <div className="mt-3 flex items-center gap-2">
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#EBEBEB" strokeWidth="3" />
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
                  <span className="text-xs text-[#717171]">of 100% capacity</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Revenue Chart Area */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#222]">
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
          <div className="flex justify-between mt-2 text-xs text-[#717171] px-4">
            <span>Mar 7</span>
            <span>Mar 14</span>
            <span>Mar 21</span>
            <span>Mar 28</span>
            <span>Apr 6</span>
          </div>
        </div>

        {/* Two columns: Performance + Active Negotiations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Table */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EBEBEB]">
              <h2 className="text-lg font-semibold text-[#222]">
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
                        <div className="text-[#222] font-medium">{p.name}</div>
                        <div className="text-xs text-[#717171]">{p.city}</div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-[#F7F7F7] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-emerald"
                              style={{ width: `${p.occupancy}%` }}
                            />
                          </div>
                          <span className="text-sm text-[#222]">{p.occupancy}%</span>
                        </div>
                      </td>
                      <td className="text-[#222] font-mono">{p.adr}</td>
                      <td className="text-[#222] font-mono">{p.revpar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Negotiations */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EBEBEB] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#222]">
                <i className="fa-solid fa-bolt text-emerald mr-2" />
                Active Negotiations
              </h2>
              <a href="/hotel/negotiations" className="text-sm text-emerald hover:underline">
                View all
              </a>
            </div>
            <div className="p-6 space-y-4">
              {hotelNegotiations.slice(0, 4).map((n) => (
                <a
                  key={n.id}
                  href={`/hotel/negotiations/${n.id}`}
                  className="block bg-white rounded-xl border border-[#EBEBEB] p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-emerald">{n.id}</span>
                    <span className={`badge ${statusColor[n.status] || "badge-slate"}`}>
                      {n.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-sm text-[#222] font-medium">{n.corporate}</div>
                  <div className="text-xs text-[#717171] mt-1">
                    {n.traveler} &middot; {n.destination} &middot; {n.checkIn} &rarr; {n.checkOut}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-[#717171]">
                      Round {n.round}/{n.maxRounds}
                    </span>
                    <span className="text-[#222] font-mono">
                      {n.initialRate} &rarr; {n.currentRate}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
