"use client";

import { useState } from "react";
import { teamBookings } from "@/lib/demo-data";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    pending_approval: { cls: "badge-amber", label: "Pending Approval" },
    confirmed: { cls: "badge-emerald", label: "Confirmed" },
    escalated: { cls: "badge-red", label: "Escalated" },
    cancelled: { cls: "badge-slate", label: "Cancelled" },
  };
  const info = map[status] ?? { cls: "badge-slate", label: status };
  return <span className={`badge ${info.cls}`}>{info.label}</span>;
}

export default function TeamBookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const pendingCount = teamBookings.filter((b) => b.status === "pending_approval").length;
  const activeCount = teamBookings.filter((b) => b.status === "confirmed").length;
  const monthlySpend = teamBookings.reduce((sum, b) => sum + b.rate * b.nights, 0);

  const filtered = searchTerm
    ? teamBookings.filter(
        (b) =>
          b.traveler.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.hotel.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : teamBookings;

  return (
    <div className="flex flex-col h-full">
      {/* ── Header Bar ──────────────────────────────────────────────────── */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 glass-panel flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Team Bookings</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage and approve team travel</p>
        </div>
      </header>

      {/* ── Scrollable Content ──────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Mini KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Pending Approvals</p>
                <p className="mt-1 text-2xl font-bold text-amber font-display">{pendingCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
                <i className="fa-solid fa-clock text-amber" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Trips</p>
                <p className="mt-1 text-2xl font-bold text-emerald font-display">{activeCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                <i className="fa-solid fa-plane text-emerald" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Monthly Spend</p>
                <p className="mt-1 text-2xl font-bold text-white font-display">&euro;{monthlySpend.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                <i className="fa-solid fa-wallet text-blue" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
            <input
              type="text"
              placeholder="Search by traveler, destination, or hotel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input-glass w-full rounded-lg pl-11 pr-4 py-2.5 text-sm"
            />
          </div>
          <button className="btn-outline px-4 py-2.5 rounded-lg text-xs font-semibold">
            <i className="fa-solid fa-filter mr-1.5" />
            Filters
          </button>
        </div>

        {/* Data Table */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left">
              <thead>
                <tr>
                  <th>Traveler</th>
                  <th>Department</th>
                  <th>Destination</th>
                  <th>Hotel</th>
                  <th>Dates</th>
                  <th className="text-right">Rate</th>
                  <th className="text-center">Status</th>
                  <th>Purpose</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald/20 flex items-center justify-center text-emerald text-[10px] font-bold flex-shrink-0">
                          {b.traveler.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-white font-medium text-sm">{b.traveler}</span>
                      </div>
                    </td>
                    <td className="text-slate-400 text-xs">{b.department}</td>
                    <td className="text-slate-300">{b.destination}</td>
                    <td className="text-slate-300 text-sm">{b.hotel}</td>
                    <td className="text-slate-400 text-xs whitespace-nowrap">
                      {b.checkIn} &rarr; {b.checkOut}
                    </td>
                    <td className="text-right text-white font-semibold">&euro;{b.rate}/n</td>
                    <td className="text-center">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="text-slate-400 text-xs">{b.purpose}</td>
                    <td className="text-center">
                      {b.status === "pending_approval" ? (
                        <div className="flex items-center justify-center gap-2">
                          <button className="btn-emerald px-3 py-1.5 rounded-md text-[10px] font-semibold">
                            <i className="fa-solid fa-check mr-1" />
                            Approve
                          </button>
                          <button className="px-3 py-1.5 rounded-md text-[10px] font-semibold border border-red-400/20 text-red-400 hover:bg-red-400/5 transition-colors">
                            <i className="fa-solid fa-xmark mr-1" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button className="btn-outline px-3 py-1.5 rounded-md text-[10px] font-semibold">
                          <i className="fa-solid fa-eye mr-1" />
                          View
                        </button>
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
