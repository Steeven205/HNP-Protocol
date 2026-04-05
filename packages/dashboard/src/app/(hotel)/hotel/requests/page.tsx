"use client";

import { useState } from "react";

/* ── Mock Data ──────────────────────────────────────────────────────────── */

type RequestStatus = "Negotiating" | "Confirmed" | "Expired";

interface IncomingRequest {
  id: string;
  corporate: string;
  traveler: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomType: string;
  budgetHint: number;
  offeredRate: number | null;
  status: RequestStatus;
}

const mockRequests: IncomingRequest[] = [
  { id: "HNP-2026-041", corporate: "TechCorp SAS", traveler: "Marie Dupont", checkIn: "2026-04-08", checkOut: "2026-04-11", nights: 3, roomType: "Superior", budgetHint: 170, offeredRate: 142, status: "Negotiating" },
  { id: "HNP-2026-042", corporate: "Globex Inc", traveler: "Jean Martin", checkIn: "2026-04-09", checkOut: "2026-04-10", nights: 1, roomType: "Standard", budgetHint: 150, offeredRate: 128, status: "Confirmed" },
  { id: "HNP-2026-043", corporate: "Initech Labs", traveler: "Sophie Bernard", checkIn: "2026-04-10", checkOut: "2026-04-13", nights: 3, roomType: "Suite", budgetHint: 300, offeredRate: 285, status: "Negotiating" },
  { id: "HNP-2026-044", corporate: "Acme Corp", traveler: "Pierre Lefebvre", checkIn: "2026-04-12", checkOut: "2026-04-14", nights: 2, roomType: "Standard", budgetHint: 140, offeredRate: 135, status: "Expired" },
  { id: "HNP-2026-045", corporate: "Stark Industries", traveler: "Lucie Moreau", checkIn: "2026-04-14", checkOut: "2026-04-17", nights: 3, roomType: "Superior", budgetHint: 180, offeredRate: 155, status: "Confirmed" },
  { id: "HNP-2026-046", corporate: "Wayne Enterprises", traveler: "Thomas Duval", checkIn: "2026-04-15", checkOut: "2026-04-18", nights: 3, roomType: "Suite", budgetHint: 310, offeredRate: 290, status: "Negotiating" },
  { id: "HNP-2026-047", corporate: "Umbrella Corp", traveler: "Claire Petit", checkIn: "2026-04-16", checkOut: "2026-04-17", nights: 1, roomType: "Standard", budgetHint: 130, offeredRate: null, status: "Expired" },
  { id: "HNP-2026-048", corporate: "Oscorp Industries", traveler: "Marc Rousseau", checkIn: "2026-04-18", checkOut: "2026-04-21", nights: 3, roomType: "Superior", budgetHint: 165, offeredRate: 148, status: "Confirmed" },
];

/* ── Status Badge ───────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: RequestStatus }) {
  const styles: Record<RequestStatus, string> = {
    Negotiating: "bg-amber-50 text-amber-700 border-amber-200",
    Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Expired: "bg-slate-100 text-slate-500 border-slate-200",
  };
  const icons: Record<RequestStatus, string> = {
    Negotiating: "fa-solid fa-comments",
    Confirmed: "fa-solid fa-check",
    Expired: "fa-solid fa-clock",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      <i className={`${icons[status]} text-[9px]`} />
      {status}
    </span>
  );
}

/* ── Date formatter ─────────────────────────────────────────────────────── */

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/* ── Page Component ─────────────────────────────────────────────────────── */

export default function HotelRequestsPage() {
  const [filter, setFilter] = useState<"All" | RequestStatus>("All");

  const filtered =
    filter === "All"
      ? mockRequests
      : mockRequests.filter((r) => r.status === filter);

  const counts = {
    All: mockRequests.length,
    Negotiating: mockRequests.filter((r) => r.status === "Negotiating").length,
    Confirmed: mockRequests.filter((r) => r.status === "Confirmed").length,
    Expired: mockRequests.filter((r) => r.status === "Expired").length,
  };

  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Incoming Requests</h1>
          <p className="mt-1 text-sm text-slate-500">Corporate booking requests received via Rateflow</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            {counts.Negotiating} active
          </span>
        </div>
      </div>

      {/* ── Filter Bar ────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        {(["All", "Negotiating", "Confirmed", "Expired"] as const).map((status) => {
          const isActive = filter === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-navy-800 text-white shadow-soft"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {status}
              <span
                className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {counts[status]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Data Table ────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Request ID</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Corporate</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Traveler</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Dates</th>
              <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Nights</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Room</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Budget Hint</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Offered</th>
              <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4 font-medium text-navy-800">{req.id}</td>
                <td className="px-6 py-4 text-slate-900 font-medium">{req.corporate}</td>
                <td className="px-6 py-4 text-slate-700">{req.traveler}</td>
                <td className="px-6 py-4 text-slate-500">
                  {formatDate(req.checkIn)} &ndash; {formatDate(req.checkOut)}
                </td>
                <td className="px-6 py-4 text-center text-slate-700">{req.nights}</td>
                <td className="px-6 py-4 text-slate-700">{req.roomType}</td>
                <td className="px-6 py-4 text-right text-slate-500">{req.budgetHint}&nbsp;&euro;</td>
                <td className="px-6 py-4 text-right font-semibold text-slate-900">
                  {req.offeredRate !== null ? `${req.offeredRate}\u00A0\u20AC` : "\u2014"}
                </td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    className="text-sm font-medium text-navy-600 hover:text-navy-800 hover:underline transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center text-sm text-slate-400">
                  <i className="fa-solid fa-inbox text-2xl mb-2 block text-slate-300" />
                  No requests matching this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
