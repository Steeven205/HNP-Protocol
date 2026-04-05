"use client";

import { useState } from "react";
import { myBookings } from "@/lib/demo-data";

type FilterTab = "all" | "upcoming" | "completed" | "cancelled";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    upcoming: "badge-emerald",
    completed: "badge-slate",
    cancelled: "badge-red",
  };
  return (
    <span className={`badge ${map[status] ?? "badge-slate"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function MyBookingsPage() {
  const [filter, setFilter] = useState<FilterTab>("all");

  const filtered = filter === "all"
    ? myBookings
    : myBookings.filter((b) => b.status === filter);

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: myBookings.length },
    { key: "upcoming", label: "Upcoming", count: myBookings.filter((b) => b.status === "upcoming").length },
    { key: "completed", label: "Completed", count: myBookings.filter((b) => b.status === "completed").length },
    { key: "cancelled", label: "Cancelled", count: myBookings.filter((b) => b.status === "cancelled").length },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* ── Header Bar ──────────────────────────────────────────────────── */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 glass-panel flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">My Bookings</h1>
          <p className="text-xs text-slate-400 mt-0.5">{myBookings.length} total bookings</p>
        </div>
        <button className="btn-emerald px-4 py-2 rounded-lg text-xs font-semibold">
          <i className="fa-solid fa-plus mr-1.5" />
          New Booking
        </button>
      </header>

      {/* ── Scrollable Content ──────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                filter === tab.key
                  ? "bg-emerald/10 text-emerald border border-emerald/20"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 bg-white/10 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        <div className="space-y-4">
          {filtered.map((booking) => (
            <div key={booking.id} className="glass-panel rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-bold text-white">{booking.hotel}</h3>
                    <StatusBadge status={booking.status} />
                    <span className="badge-emerald badge text-[10px]">
                      <i className="fa-solid fa-leaf text-[8px]" />
                      ESG {booking.esg}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <i className="fa-solid fa-location-dot text-emerald text-xs" />
                    <span className="text-sm text-slate-300">{booking.destination}</span>
                    <span className="text-slate-500 mx-1">&middot;</span>
                    <span className="text-xs text-slate-400">{booking.address}</span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    <span>
                      <i className="fa-solid fa-calendar-days text-slate-500 mr-1.5" />
                      {booking.checkIn} &rarr; {booking.checkOut}
                    </span>
                    <span>
                      <i className="fa-solid fa-moon text-slate-500 mr-1.5" />
                      {booking.nights} nights
                    </span>
                    <span>
                      <i className="fa-solid fa-bed text-slate-500 mr-1.5" />
                      {booking.roomType}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      <i className="fa-solid fa-hashtag text-slate-600 mr-1" />
                      {booking.confirmation}
                    </span>
                  </div>
                </div>

                <div className="text-right ml-6">
                  <p className="text-2xl font-bold text-white">&euro;{booking.rate}</p>
                  <p className="text-xs text-slate-500">/night</p>
                  <p className="text-sm text-slate-400 mt-1">Total: &euro;{booking.totalCost}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className={`fa-solid fa-star text-[9px] ${i < Math.floor(booking.rating) ? "text-amber" : "text-white/10"}`} />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">{booking.rating}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <button className="btn-outline px-4 py-2 rounded-lg text-xs font-semibold">
                  <i className="fa-solid fa-eye mr-1.5" />
                  View Details
                </button>
                {booking.status === "upcoming" && (
                  <button className="px-4 py-2 rounded-lg text-xs font-semibold border border-red-400/20 text-red-400 hover:bg-red-400/5 transition-colors">
                    <i className="fa-solid fa-xmark mr-1.5" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
