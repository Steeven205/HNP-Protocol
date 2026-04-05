"use client";

import Link from "next/link";
import { hotelNegotiations, hotelProperties } from "@/lib/demo-data";

const statusColor: Record<string, string> = {
  in_progress: "badge-amber",
  confirmed: "badge-emerald",
  escalated: "badge-red",
  timeout: "badge-slate",
};

export default function NegotiationsListPage() {
  return (
    <>
      {/* Header */}
      <header className="h-20 border-b border-white/10 glass-panel flex items-center justify-between px-6 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Negotiations Tracker</h1>
          <p className="text-sm text-slate-400 mt-0.5">Real-time AI negotiation monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400 font-mono">
            {hotelNegotiations.length} total
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Filter Bar */}
        <div className="glass-panel rounded-xl p-4 flex flex-wrap items-center gap-3 animate-fade-up">
          <div className="relative flex-1 min-w-[200px]">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search by ID, corporate, traveler..."
              className="form-input-glass w-full rounded-lg py-2 pl-9 pr-3 text-sm"
            />
          </div>
          <select className="form-input-glass rounded-lg py-2 px-3 text-sm min-w-[160px]">
            <option value="">All Properties</option>
            {hotelProperties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select className="form-input-glass rounded-lg py-2 px-3 text-sm min-w-[140px]">
            <option value="">All Statuses</option>
            <option value="in_progress">In Progress</option>
            <option value="confirmed">Confirmed</option>
            <option value="escalated">Escalated</option>
            <option value="timeout">Timeout</option>
          </select>
          <input
            type="date"
            className="form-input-glass rounded-lg py-2 px-3 text-sm"
          />
          <span className="text-slate-500">to</span>
          <input
            type="date"
            className="form-input-glass rounded-lg py-2 px-3 text-sm"
          />
          <button className="btn-outline px-4 py-2 rounded-lg text-sm">
            <i className="fa-solid fa-file-export mr-2" />
            Export
          </button>
        </div>

        {/* Data Table */}
        <div className="glass-panel rounded-2xl overflow-hidden animate-fade-up delay-100">
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Corporate</th>
                  <th>Traveler</th>
                  <th>Property</th>
                  <th>Dates</th>
                  <th>Rooms</th>
                  <th>Initial</th>
                  <th>Current</th>
                  <th>Status</th>
                  <th>Round</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotelNegotiations.map((n) => (
                  <tr key={n.id}>
                    <td>
                      <span className="font-mono text-emerald">{n.id}</span>
                    </td>
                    <td className="text-white">{n.corporate}</td>
                    <td className="text-slate-300">{n.traveler}</td>
                    <td>
                      <div className="text-white">{n.hotel}</div>
                      <div className="text-xs text-slate-500">{n.destination}</div>
                    </td>
                    <td>
                      <div className="text-sm text-white">{n.checkIn}</div>
                      <div className="text-xs text-slate-500">{n.checkOut}</div>
                    </td>
                    <td className="text-center text-white">{n.rooms}</td>
                    <td className="font-mono text-slate-400">{n.initialRate}</td>
                    <td className="font-mono text-white font-bold">{n.currentRate}</td>
                    <td>
                      <span className={`badge ${statusColor[n.status] || "badge-slate"}`}>
                        <i
                          className={`fa-solid ${
                            n.status === "confirmed"
                              ? "fa-check"
                              : n.status === "in_progress"
                              ? "fa-spinner fa-spin"
                              : n.status === "escalated"
                              ? "fa-triangle-exclamation"
                              : "fa-clock"
                          } text-[10px]`}
                        />
                        {n.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="text-center text-slate-300">
                      {n.round}/{n.maxRounds}
                    </td>
                    <td>
                      <Link
                        href={`/hotel/negotiations/${n.id}`}
                        className="btn-outline px-3 py-1.5 rounded-md text-xs inline-flex items-center gap-1"
                      >
                        <i className="fa-solid fa-eye text-[10px]" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
