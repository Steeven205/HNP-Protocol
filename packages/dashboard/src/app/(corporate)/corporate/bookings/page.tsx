"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type FilterTab = "all" | "confirmed" | "completed" | "cancelled";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: "badge-emerald",
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

interface Booking {
  id: string;
  booking_ref: string;
  traveler: string;
  destination: string;
  hotel_name: string;
  address: string;
  check_in: string;
  check_out: string;
  nights: number;
  negotiated_rate: number;
  rack_rate: number;
  total_cost: number;
  status: string;
  room_type: string;
  esg_tier: string;
  stars: number;
  savings_eur: number;
  savings_pct: number;
  district: string;
  created_at: string;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>("all");

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings || []);
      })
      .catch(() => {
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: bookings.length },
    { key: "confirmed", label: "Confirmed", count: bookings.filter((b) => b.status === "confirmed").length },
    { key: "completed", label: "Completed", count: bookings.filter((b) => b.status === "completed").length },
    { key: "cancelled", label: "Cancelled", count: bookings.filter((b) => b.status === "cancelled").length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">My Bookings</h1>
          <p className="text-[#717171] mt-1">
            {loading ? "Loading..." : `${bookings.length} total booking${bookings.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link
          href="/corporate/book"
          className="bg-[#222] text-white hover:bg-black rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          <i className="fa-solid fa-plus mr-1.5" />
          New Booking
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-emerald border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && bookings.length === 0 && (
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-10 text-center max-w-lg mx-auto">
          <i className="fa-solid fa-suitcase text-[#B0B0B0] text-3xl mb-4" />
          <h3 className="text-lg font-semibold text-[#222] mb-2">No bookings yet</h3>
          <p className="text-sm text-[#717171] mb-6">Book your first AI-negotiated hotel stay.</p>
          <Link
            href="/corporate/book"
            className="inline-block bg-[#222] text-white hover:bg-black px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            <i className="fa-solid fa-plus mr-2" />
            Book Travel
          </Link>
        </div>
      )}

      {/* Filter Tabs + Cards */}
      {!loading && bookings.length > 0 && (
        <>
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
              <div key={booking.id || booking.booking_ref} className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-5">
                    {/* Photo placeholder */}
                    <div className="w-28 h-20 rounded-lg bg-gradient-to-br from-[#F7F7F7] to-[#EBEBEB] flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-hotel text-xl text-[#B0B0B0]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-base font-semibold text-[#222]">{booking.hotel_name}</h3>
                        <StatusBadge status={booking.status} />
                        {booking.esg_tier && (
                          <span className="badge-emerald badge text-[10px]">
                            <i className="fa-solid fa-leaf text-[8px]" />
                            ESG {booking.esg_tier}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mb-2">
                        <i className="fa-solid fa-location-dot text-[#717171] text-xs" />
                        <span className="text-sm text-[#484848]">{booking.destination}</span>
                        {booking.address && (
                          <>
                            <span className="text-[#B0B0B0] mx-1">&middot;</span>
                            <span className="text-xs text-[#717171]">{booking.address}</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-5 text-sm text-[#717171]">
                        <span>
                          <i className="fa-solid fa-calendar-days mr-1.5" />
                          {booking.check_in} &rarr; {booking.check_out}
                        </span>
                        <span>
                          <i className="fa-solid fa-moon mr-1.5" />
                          {booking.nights} night{booking.nights !== 1 ? "s" : ""}
                        </span>
                        <span>
                          <i className="fa-solid fa-bed mr-1.5" />
                          {booking.room_type}
                        </span>
                        <span className="font-mono text-xs text-[#B0B0B0]">
                          {booking.booking_ref}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-6">
                    <p className="text-xl font-semibold text-[#222]">&euro;{booking.negotiated_rate}<span className="text-sm font-normal text-[#717171]">/night</span></p>
                    <p className="text-sm text-[#717171] mt-0.5">Total: &euro;{booking.total_cost}</p>
                    {booking.savings_eur > 0 && (
                      <p className="text-xs font-semibold text-emerald mt-1">
                        <i className="fa-solid fa-arrow-down mr-1" />
                        &euro;{booking.savings_eur} saved ({booking.savings_pct}%)
                      </p>
                    )}
                    {booking.stars > 0 && (
                      <div className="flex items-center justify-end gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i key={i} className={`fa-solid fa-star text-[9px] ${i < booking.stars ? "text-amber" : "text-[#EBEBEB]"}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#EBEBEB]">
                  <button className="rounded-lg px-5 py-2.5 text-sm font-semibold border border-[#222] text-[#222] hover:bg-[#F7F7F7] transition-colors">
                    <i className="fa-solid fa-eye mr-1.5" />
                    View Details
                  </button>
                  {(booking.status === "confirmed" || booking.status === "upcoming") && (
                    <button className="rounded-lg px-5 py-2.5 text-sm font-semibold border border-red-300 text-red-500 hover:bg-red-50 transition-colors">
                      <i className="fa-solid fa-xmark mr-1.5" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
