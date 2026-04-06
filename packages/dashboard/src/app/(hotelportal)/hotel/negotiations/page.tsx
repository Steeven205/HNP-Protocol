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
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Negotiations Tracker</h1>
          <p className="text-[#717171] mt-1">Real-time AI negotiation monitoring</p>
        </div>
        <span className="text-sm text-[#717171] font-mono">
          {hotelNegotiations.length} total
        </span>
      </div>

      <div className="space-y-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0] text-sm" />
            <input
              type="text"
              placeholder="Search by ID, corporate, traveler..."
              className="form-input w-full rounded-lg py-2 pl-9 pr-3 text-sm"
            />
          </div>
          <select className="form-input rounded-lg py-2 px-3 text-sm min-w-[160px]">
            <option value="">All Properties</option>
            {hotelProperties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select className="form-input rounded-lg py-2 px-3 text-sm min-w-[140px]">
            <option value="">All Statuses</option>
            <option value="in_progress">In Progress</option>
            <option value="confirmed">Confirmed</option>
            <option value="escalated">Escalated</option>
            <option value="timeout">Timeout</option>
          </select>
          <input
            type="date"
            className="form-input rounded-lg py-2 px-3 text-sm"
          />
          <span className="text-[#717171]">to</span>
          <input
            type="date"
            className="form-input rounded-lg py-2 px-3 text-sm"
          />
          <button className="btn-outline px-4 py-2 rounded-lg text-sm">
            <i className="fa-solid fa-file-export mr-2" />
            Export
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
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
                    <td className="text-[#222]">{n.corporate}</td>
                    <td className="text-[#484848]">{n.traveler}</td>
                    <td>
                      <div className="text-[#222]">{n.hotel}</div>
                      <div className="text-xs text-[#717171]">{n.destination}</div>
                    </td>
                    <td>
                      <div className="text-sm text-[#222]">{n.checkIn}</div>
                      <div className="text-xs text-[#717171]">{n.checkOut}</div>
                    </td>
                    <td className="text-center text-[#222]">{n.rooms}</td>
                    <td className="font-mono text-[#717171]">{n.initialRate}</td>
                    <td className="font-mono text-[#222] font-bold">{n.currentRate}</td>
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
                    <td className="text-center text-[#484848]">
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
      </div>
    </div>
  );
}
