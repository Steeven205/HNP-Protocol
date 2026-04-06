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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">My Bookings</h1>
          <p className="text-[#717171] mt-1">{myBookings.length} total bookings</p>
        </div>
        <button className="bg-[#222] text-white hover:bg-black rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors">
          <i className="fa-solid fa-plus mr-1.5" />
          New Booking
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === tab.key
                ? "bg-[#222] text-white"
                : "bg-[#F7F7F7] text-[#717171] hover:bg-[#EBEBEB] hover:text-[#222]"
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-xs ${filter === tab.key ? "text-white/70" : "text-[#B0B0B0]"}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {filtered.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex gap-5">
                {/* Photo placeholder */}
                <div className="w-28 h-20 rounded-lg bg-gradient-to-br from-[#F7F7F7] to-[#EBEBEB] flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-hotel text-xl text-[#B0B0B0]" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-[#222]">{booking.hotel}</h3>
                    <StatusBadge status={booking.status} />
                    <span className="badge-emerald badge text-[10px]">
                      <i className="fa-solid fa-leaf text-[8px]" />
                      ESG {booking.esg}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <i className="fa-solid fa-location-dot text-[#717171] text-xs" />
                    <span className="text-sm text-[#484848]">{booking.destination}</span>
                    <span className="text-[#B0B0B0] mx-1">&middot;</span>
                    <span className="text-xs text-[#717171]">{booking.address}</span>
                  </div>

                  <div className="flex items-center gap-5 text-sm text-[#717171]">
                    <span>
                      <i className="fa-solid fa-calendar-days mr-1.5" />
                      {booking.checkIn} &rarr; {booking.checkOut}
                    </span>
                    <span>
                      <i className="fa-solid fa-moon mr-1.5" />
                      {booking.nights} nights
                    </span>
                    <span>
                      <i className="fa-solid fa-bed mr-1.5" />
                      {booking.roomType}
                    </span>
                    <span className="font-mono text-xs text-[#B0B0B0]">
                      {booking.confirmation}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right ml-6">
                <p className="text-xl font-semibold text-[#222]">&euro;{booking.rate}<span className="text-sm font-normal text-[#717171]">/night</span></p>
                <p className="text-sm text-[#717171] mt-0.5">Total: &euro;{booking.totalCost}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={`fa-solid fa-star text-[9px] ${i < Math.floor(booking.rating) ? "text-amber" : "text-[#EBEBEB]"}`} />
                  ))}
                  <span className="text-xs text-[#717171] ml-1">{booking.rating}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#EBEBEB]">
              <button className="rounded-lg px-5 py-2.5 text-sm font-semibold border border-[#222] text-[#222] hover:bg-[#F7F7F7] transition-colors">
                <i className="fa-solid fa-eye mr-1.5" />
                View Details
              </button>
              {booking.status === "upcoming" && (
                <button className="rounded-lg px-5 py-2.5 text-sm font-semibold border border-red-300 text-red-500 hover:bg-red-50 transition-colors">
                  <i className="fa-solid fa-xmark mr-1.5" />
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
