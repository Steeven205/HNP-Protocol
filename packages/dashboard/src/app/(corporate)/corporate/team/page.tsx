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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#222]">Team Bookings</h1>
        <p className="text-[#717171] mt-1">Manage and approve team travel</p>
      </div>

      <div className="space-y-8">
        {/* Mini KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Pending Approvals</p>
            <p className="mt-2 text-3xl font-semibold text-amber">{pendingCount}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Active Trips</p>
            <p className="mt-2 text-3xl font-semibold text-emerald">{activeCount}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Monthly Spend</p>
            <p className="mt-2 text-3xl font-semibold text-[#222]">&euro;{monthlySpend.toLocaleString()}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B0B0] text-sm" />
            <input
              type="text"
              placeholder="Search by traveler, destination, or hotel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input w-full rounded-lg pl-11 pr-4 py-2.5 text-sm"
            />
          </div>
          <button className="rounded-lg px-5 py-2.5 text-sm font-semibold border border-[#EBEBEB] text-[#222] hover:bg-[#F7F7F7] transition-colors">
            <i className="fa-solid fa-filter mr-1.5" />
            Filters
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
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
                        <div className="w-8 h-8 rounded-full bg-[#F7F7F7] border border-[#EBEBEB] flex items-center justify-center text-[#484848] text-xs font-semibold flex-shrink-0">
                          {b.traveler.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-[#222] font-medium text-sm">{b.traveler}</span>
                      </div>
                    </td>
                    <td className="text-[#717171] text-xs">{b.department}</td>
                    <td className="text-[#484848]">{b.destination}</td>
                    <td className="text-[#484848] text-sm">{b.hotel}</td>
                    <td className="text-[#717171] text-xs whitespace-nowrap">
                      {b.checkIn} &rarr; {b.checkOut}
                    </td>
                    <td className="text-right text-[#222] font-semibold">&euro;{b.rate}/n</td>
                    <td className="text-center">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="text-[#717171] text-xs">{b.purpose}</td>
                    <td className="text-center">
                      {b.status === "pending_approval" ? (
                        <div className="flex items-center justify-center gap-2">
                          <button className="bg-[#222] text-white hover:bg-black px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-colors">
                            <i className="fa-solid fa-check mr-1" />
                            Approve
                          </button>
                          <button className="px-3 py-1.5 rounded-lg text-[10px] font-semibold border border-red-300 text-red-500 hover:bg-red-50 transition-colors">
                            <i className="fa-solid fa-xmark mr-1" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button className="px-3 py-1.5 rounded-lg text-[10px] font-semibold border border-[#EBEBEB] text-[#484848] hover:bg-[#F7F7F7] transition-colors">
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
      </div>
    </div>
  );
}
