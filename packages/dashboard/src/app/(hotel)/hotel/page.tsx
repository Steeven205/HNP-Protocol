"use client";

import { useState } from "react";

/* ── Mock Data ──────────────────────────────────────────────────────────── */

const kpis = [
  { title: "Today's Requests", value: "8", icon: "fa-solid fa-envelope-open-text", trend: "+3 vs yesterday", trendUp: true },
  { title: "Confirmed Today", value: "5", icon: "fa-solid fa-circle-check", trend: "+2 vs yesterday", trendUp: true },
  { title: "Avg Rate Negotiated", value: "132\u00A0\u20AC", icon: "fa-solid fa-euro-sign", trend: "+4\u20AC vs last week", trendUp: true },
  { title: "RevPAR Impact", value: "+12%", icon: "fa-solid fa-arrow-trend-up", trend: "vs same period last year", trendUp: true },
];

const activeNegotiations = [
  { id: "HNP-2026-041", corporate: "TechCorp SAS", traveler: "Marie Dupont", dates: "Apr 8\u201311", roomType: "Superior", status: "Negotiating" as const, offeredRate: 142 },
  { id: "HNP-2026-042", corporate: "Globex Inc", traveler: "Jean Martin", dates: "Apr 9\u201310", roomType: "Standard", status: "Confirmed" as const, offeredRate: 128 },
  { id: "HNP-2026-043", corporate: "Initech Labs", traveler: "Sophie Bernard", dates: "Apr 10\u201313", roomType: "Suite", status: "Negotiating" as const, offeredRate: 285 },
  { id: "HNP-2026-044", corporate: "Acme Corp", traveler: "Pierre Lefebvre", dates: "Apr 12\u201314", roomType: "Standard", status: "Expired" as const, offeredRate: 135 },
  { id: "HNP-2026-045", corporate: "Stark Industries", traveler: "Lucie Moreau", dates: "Apr 14\u201317", roomType: "Superior", status: "Confirmed" as const, offeredRate: 155 },
];

const monthlyRates = [
  { month: "Nov", rate: 118, occupancy: 62 },
  { month: "Dec", rate: 145, occupancy: 78 },
  { month: "Jan", rate: 112, occupancy: 55 },
  { month: "Feb", rate: 125, occupancy: 68 },
  { month: "Mar", rate: 132, occupancy: 74 },
  { month: "Apr", rate: 138, occupancy: 81 },
];

const maxRate = 160;

/* ── Status Badge ───────────────────────────────────────────────────────── */

function NegotiationStatusBadge({ status }: { status: "Negotiating" | "Confirmed" | "Expired" }) {
  const classes = {
    Negotiating: "bg-amber-50 text-amber-700 border-amber-200",
    Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Expired: "bg-slate-100 text-slate-500 border-slate-200",
  };
  const icons = {
    Negotiating: "fa-solid fa-comments",
    Confirmed: "fa-solid fa-check",
    Expired: "fa-solid fa-clock",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${classes[status]}`}>
      <i className={`${icons[status]} text-[9px]`} />
      {status}
    </span>
  );
}

/* ── Page Component ─────────────────────────────────────────────────────── */

export default function HotelDashboardPage() {
  const [_] = useState(false); // placeholder for future interactivity

  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">Revenue Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Le Marais Boutique Hotel &mdash; Paris 3e</p>
      </div>

      {/* ── KPI Grid ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="bg-white p-6 rounded-[16px] border border-slate-200 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{kpi.title}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{kpi.value}</p>
                <p className={`mt-1 text-xs font-medium ${kpi.trendUp ? "text-green-600" : "text-red-500"}`}>
                  {kpi.trend}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-dark">
                <i className={kpi.icon} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Two-column layout: Table + Chart ──────────────────────────────── */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Active Negotiations Table */}
        <div className="col-span-2 bg-white rounded-[16px] border border-slate-200 shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-slate-900">Active Negotiations</h2>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                Live
              </span>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">Corporate</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">Traveler</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">Dates</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">Room</th>
                <th className="px-6 py-3 text-center text-xs uppercase tracking-wider text-slate-500 font-semibold">Status</th>
                <th className="px-6 py-3 text-right text-xs uppercase tracking-wider text-slate-500 font-semibold">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeNegotiations.map((neg) => (
                <tr key={neg.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-3.5">
                    <p className="font-medium text-slate-900">{neg.corporate}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{neg.id}</p>
                  </td>
                  <td className="px-6 py-3.5 text-slate-700">{neg.traveler}</td>
                  <td className="px-6 py-3.5 text-slate-500">{neg.dates}</td>
                  <td className="px-6 py-3.5 text-slate-700">{neg.roomType}</td>
                  <td className="px-6 py-3.5 text-center">
                    <NegotiationStatusBadge status={neg.status} />
                  </td>
                  <td className="px-6 py-3.5 text-right font-semibold text-slate-900">
                    {neg.offeredRate}&nbsp;&euro;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rate Performance Chart */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
          <h2 className="font-display text-base font-semibold text-slate-900 mb-1">Rate Performance</h2>
          <p className="text-xs text-slate-500 mb-5">Average negotiated rate by month</p>

          <div className="flex items-end gap-3 h-44">
            {monthlyRates.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-medium text-slate-700">{m.rate}&euro;</span>
                <div className="w-full flex flex-col gap-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-navy-800 to-sky-dark transition-all"
                    style={{ height: `${(m.rate / maxRate) * 120}px` }}
                  />
                  <div
                    className="w-full rounded-b-md bg-slate-200"
                    style={{ height: `${(m.occupancy / 100) * 40}px` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400">{m.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-navy-800 to-sky-dark" />
              <span className="text-[11px] text-slate-500">Avg Rate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" />
              <span className="text-[11px] text-slate-500">Occupancy</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── OTA Commission Savings Card ────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-navy-800 to-sky-dark rounded-[16px] p-6 text-white shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <i className="fa-solid fa-piggy-bank text-white/80" />
              <h2 className="font-display text-base font-semibold">OTA Commission Savings</h2>
            </div>
            <p className="text-sm text-white/70">
              Direct corporate bookings via Rateflow save you 15-25% in OTA commissions.
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">4,200&nbsp;&euro;</p>
            <p className="text-sm text-white/70 mt-0.5">saved this month</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <div className="flex-1 bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div className="bg-white rounded-full h-full" style={{ width: "68%" }} />
          </div>
          <span className="text-sm font-medium text-white/90">68% of target</span>
        </div>
      </div>
    </div>
  );
}
