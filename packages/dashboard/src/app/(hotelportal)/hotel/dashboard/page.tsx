"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Hotel {
  id: string;
  hotel_id: string;
  name: string;
  city: string | null;
  stars: number;
  rooms_count: number | null;
  base_rate_standard: number | null;
  rating_google: number | null;
  esg_tier: string | null;
  status: string | null;
}

interface Booking {
  id: string;
  booking_ref: string;
  traveler: string;
  destination: string;
  hotel_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  room_type: string | null;
  negotiated_rate: number;
  total_cost: number;
  status: string | null;
  savings_eur: number | null;
  savings_pct: number | null;
  created_at: string | null;
}

const statusColor: Record<string, string> = {
  upcoming: "badge-amber",
  confirmed: "badge-emerald",
  completed: "badge-emerald",
  escalated: "badge-red",
  cancelled: "badge-slate",
  timeout: "badge-slate",
};

export default function HotelDashboardPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [hotelsRes, bookingsRes] = await Promise.all([
        supabase.from("hotels").select("*").eq("status", "active"),
        supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      if (hotelsRes.data) setHotels(hotelsRes.data);
      if (bookingsRes.data) setBookings(bookingsRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Compute KPIs from real data
  const totalProperties = hotels.length;

  const avgRate =
    hotels.length > 0
      ? hotels.reduce((sum, h) => sum + (Number(h.base_rate_standard) || 0), 0) / hotels.length
      : 0;

  const totalBookings = bookings.length;

  const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.total_cost), 0);

  const kpis = [
    {
      value: String(totalProperties),
      trend: `${totalProperties} active`,
      trendUp: true,
      label: "Total Properties",
      icon: "fa-building",
    },
    {
      value: `\u20AC${avgRate.toFixed(0)}`,
      trend: "avg standard",
      trendUp: true,
      label: "Avg Rate",
      icon: "fa-coins",
    },
    {
      value: String(totalBookings),
      trend: "recent",
      trendUp: true,
      label: "Total Bookings",
      icon: "fa-calendar-check",
    },
    {
      value: `\u20AC${totalRevenue.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      trend: "total cost",
      trendUp: true,
      label: "Revenue",
      icon: "fa-chart-line",
    },
  ];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#222]">Dashboard</h1>
          <p className="text-[#717171] mt-1">Overview & Performance</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#EBEBEB] p-6 animate-pulse"
            >
              <div className="h-3 bg-[#F7F7F7] rounded w-1/2 mb-3" />
              <div className="h-8 bg-[#F7F7F7] rounded w-2/3 mb-3" />
              <div className="h-3 bg-[#F7F7F7] rounded w-1/3" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 animate-pulse h-64" />
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 animate-pulse h-64" />
        </div>
      </div>
    );
  }

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
              className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">
                <i className={`fa-solid ${kpi.icon} text-emerald mr-1.5`} />
                {kpi.label}
              </p>
              <p className="text-3xl font-semibold text-[#222] font-mono mt-2">{kpi.value}</p>
              <div className="flex items-center justify-between mt-3">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    kpi.trendUp ? "bg-emerald/10 text-emerald" : "bg-amber/10 text-amber"
                  }`}
                >
                  {kpi.trend}
                </span>
              </div>
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

        {/* Two columns: Performance + Recent Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hotels Performance Table */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EBEBEB]">
              <h2 className="text-lg font-semibold text-[#222]">
                <i className="fa-solid fa-ranking-star text-emerald mr-2" />
                Hotels Performance
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table w-full text-left">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Stars</th>
                    <th>Rating</th>
                    <th>Std Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.slice(0, 8).map((h) => (
                    <tr key={h.id}>
                      <td>
                        <div className="text-[#222] font-medium">{h.name}</div>
                        <div className="text-xs text-[#717171]">{h.city || "Paris"}</div>
                      </td>
                      <td>
                        <span className="text-amber">
                          {Array.from({ length: h.stars }, (_, i) => (
                            <i key={i} className="fa-solid fa-star text-[10px]" />
                          ))}
                        </span>
                      </td>
                      <td>
                        {h.rating_google ? (
                          <div className="flex items-center gap-1">
                            <i className="fa-solid fa-star text-amber text-[10px]" />
                            <span className="text-sm text-[#222]">
                              {Number(h.rating_google).toFixed(1)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-[#B0B0B0]">-</span>
                        )}
                      </td>
                      <td className="text-[#222] font-mono">
                        {h.base_rate_standard
                          ? `\u20AC${Number(h.base_rate_standard)}`
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EBEBEB] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#222]">
                <i className="fa-solid fa-bolt text-emerald mr-2" />
                Recent Bookings
              </h2>
              <span className="text-xs text-[#717171]">{bookings.length} shown</span>
            </div>
            <div className="p-6 space-y-4">
              {bookings.length === 0 ? (
                <p className="text-sm text-[#717171] text-center py-8">No bookings yet</p>
              ) : (
                bookings.slice(0, 6).map((b) => (
                  <div
                    key={b.id}
                    className="block bg-white rounded-xl border border-[#EBEBEB] p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono text-emerald">{b.booking_ref}</span>
                      <span className={`badge ${statusColor[b.status || ""] || "badge-slate"}`}>
                        {(b.status || "unknown").replace("_", " ")}
                      </span>
                    </div>
                    <div className="text-sm text-[#222] font-medium">{b.hotel_name}</div>
                    <div className="text-xs text-[#717171] mt-1">
                      {b.traveler} &middot; {b.destination} &middot; {b.check_in} &rarr; {b.check_out}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-[#717171]">
                        {b.nights} night{b.nights !== 1 ? "s" : ""} &middot; {b.room_type || "Standard"}
                      </span>
                      <span className="text-[#222] font-mono">
                        {`\u20AC${Number(b.negotiated_rate)}/n`} &middot; Total {`\u20AC${Number(b.total_cost)}`}
                      </span>
                    </div>
                    {b.savings_eur && Number(b.savings_eur) > 0 && (
                      <div className="mt-2">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald/10 text-emerald">
                          Saved {`\u20AC${Number(b.savings_eur)}`} ({b.savings_pct}%)
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
