"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { negotiations as mockNegotiations, type Negotiation } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { KpiCard } from "@/components/kpi-card";

function formatDateRange(checkIn: string, checkOut: string): string {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const month = start.toLocaleString("en-US", { month: "short" });
  const startDay = start.getDate();
  const endDay = end.getDate();
  if (start.getMonth() === end.getMonth()) {
    return `${month} ${startDay}\u2013${endDay}`;
  }
  const endMonth = end.toLocaleString("en-US", { month: "short" });
  return `${month} ${startDay} \u2013 ${endMonth} ${endDay}`;
}

/** Check whether a negotiation ID matches the mock dataset */
function isMockNegotiation(id: string): boolean {
  return mockNegotiations.some((n) => n.id === id);
}

type SupabaseRow = Record<string, unknown>;

/** Map a Supabase row to the Negotiation shape used by the UI */
function mapRow(row: SupabaseRow): Negotiation {
  return {
    id: String(row.id ?? ""),
    traveler: String(row.traveler ?? ""),
    destination: String(row.destination ?? ""),
    hotel: String(row.hotel ?? ""),
    check_in: String(row.check_in ?? ""),
    check_out: String(row.check_out ?? ""),
    nights: Number(row.nights ?? 0),
    status: (row.status as Negotiation["status"]) ?? "in_progress",
    rounds: Number(row.rounds ?? 0),
    final_rate: row.final_rate != null ? Number(row.final_rate) : null,
    initial_rate: Number(row.initial_rate ?? 0),
    budget: Number(row.budget ?? 0),
    savings_pct: row.savings_pct != null ? Number(row.savings_pct) : null,
    created_at: String(row.created_at ?? ""),
    duration_s: Number(row.duration_s ?? 0),
  };
}

export default function NegotiationsPage() {
  const [data, setData] = useState<Negotiation[]>(mockNegotiations);
  const [source, setSource] = useState<"mock" | "supabase">("mock");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchNegotiations() {
      try {
        const { data: rows, error } = await supabase
          .from("negotiations")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (cancelled) return;

        if (error || !rows || rows.length === 0) {
          // Fall back to mock data
          setData(mockNegotiations);
          setSource("mock");
        } else {
          setData(rows.map(mapRow));
          setSource("supabase");
        }
      } catch {
        if (!cancelled) {
          setData(mockNegotiations);
          setSource("mock");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchNegotiations();
    return () => {
      cancelled = true;
    };
  }, []);

  // KPI computations
  const inProgress = data.filter((n) => n.status === "in_progress").length;
  const confirmed = data.filter((n) => n.status === "confirmed").length;
  const escalated = data.filter((n) => n.status === "escalated").length;
  const withSavings = data.filter((n) => n.savings_pct !== null);
  const avgSavings =
    withSavings.length > 0
      ? (withSavings.reduce((sum, n) => sum + (n.savings_pct ?? 0), 0) / withSavings.length).toFixed(1)
      : "0";

  const destinations = Array.from(new Set(data.map((n) => n.destination)));

  /** Build the correct href for a negotiation row */
  function rowHref(n: Negotiation): string {
    if (source === "mock" || isMockNegotiation(n.id)) {
      return `/negotiations/${n.id}`;
    }
    // Live Supabase row — link to /negotiations/live with query params
    const params = new URLSearchParams({
      id: n.id,
      traveler: n.traveler,
      destination: n.destination,
      hotel: n.hotel,
      check_in: n.check_in,
      check_out: n.check_out,
      status: n.status,
    });
    if (n.final_rate !== null) params.set("final_rate", String(n.final_rate));
    return `/negotiations/live?${params.toString()}`;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Negotiations</h1>
        <Link
          href="/negotiations/new"
          className="inline-flex items-center gap-2 bg-navy-800 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-navy-700 transition-colors"
        >
          <i className="fa-solid fa-plus text-xs" />
          New Negotiation
        </Link>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="In Progress"
          value={String(inProgress)}
          icon="fa-solid fa-spinner"
          trend="+1 today"
          trendUp
        />
        <KpiCard
          title="Confirmed Today"
          value={String(confirmed)}
          icon="fa-solid fa-circle-check"
          trend="+2 this week"
          trendUp
        />
        <KpiCard
          title="Escalated"
          value={String(escalated)}
          icon="fa-solid fa-triangle-exclamation"
          trend="1 pending review"
        />
        <KpiCard
          title="Avg. Savings"
          value={`${avgSavings}%`}
          icon="fa-solid fa-piggy-bank"
          trend="vs 22% last month"
          trendUp
        />
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 mb-6 items-center">
        <div className="relative flex-1 max-w-sm">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search by traveler, hotel, ID..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
        </div>
        <select className="rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-sm text-slate-700 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600">
          <option value="">All Statuses</option>
          <option value="in_progress">In Progress</option>
          <option value="confirmed">Confirmed</option>
          <option value="escalated">Escalated</option>
          <option value="timeout">Timeout</option>
        </select>
        <select className="rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-sm text-slate-700 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600">
          <option value="">All Destinations</option>
          {destinations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <i className="fa-solid fa-spinner fa-spin text-slate-400 text-lg mr-3" />
            <span className="text-sm text-slate-500">Loading negotiations...</span>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Traveler
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Hotel
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Dates
                </th>
                <th className="px-6 py-3 text-center text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Rounds
                </th>
                <th className="px-6 py-3 text-center text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((n) => (
                <Link
                  key={n.id}
                  href={rowHref(n)}
                  className="contents"
                >
                  <tr className="hover:bg-slate-50 cursor-pointer transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-navy-800">
                      {n.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {n.traveler}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      <span className="inline-flex items-center gap-1.5">
                        <i className="fa-solid fa-location-dot text-slate-400 text-xs" />
                        {n.destination}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {n.hotel}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDateRange(n.check_in, n.check_out)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 text-center">
                      {n.rounds}/2
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={n.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-slate-900">
                      {n.final_rate !== null ? `${n.final_rate}\u00A0\u20AC` : "\u2014"}
                    </td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
