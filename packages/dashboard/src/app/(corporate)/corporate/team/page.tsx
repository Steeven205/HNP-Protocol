"use client";

import { useState } from "react";

const pendingApprovals = [
  { traveler: "Jean Dupont", dept: "Engineering", avatar: "JD", hotel: "Brussels Central", dates: "Jun 18-20", nights: 2, total: 276, issue: "\u26A0\uFE0F \u20AC36 over limit" },
  { traveler: "Clara Dubois", dept: "Marketing", avatar: "CD", hotel: "Amsterdam Centrum", dates: "Jul 12-14", nights: 2, total: 356, issue: "\u26A0\uFE0F Non-EU travel" },
];

const teamBookingsData = [
  { traveler: "Sophie Martin", dept: "Sales", avatar: "SM", hotel: "Le Marais Boutique", city: "Paris, France", dates: "May 12 - May 15, 2026", total: 426, savings: -48, status: "confirmed" as const },
  { traveler: "Jean Dupont", dept: "Engineering", avatar: "JD", hotel: "Brussels Central", city: "Brussels, Belgium", dates: "Jun 18 - Jun 20, 2026", total: 276, savings: -24, status: "pending" as const },
  { traveler: "Marie Bernard", dept: "Marketing", avatar: "MB", hotel: "Lyon Confluence", city: "Lyon, France", dates: "Apr 22 - Apr 25, 2026", total: 384, savings: -36, status: "confirmed" as const },
  { traveler: "Thomas Roux", dept: "Sales", avatar: "TR", hotel: "Madrid Sol", city: "Madrid, Spain", dates: "Mar 10 - Mar 12, 2026", total: 0, savings: 0, status: "cancelled" as const },
];

function StatusBadge({ status }: { status: "confirmed" | "pending" | "cancelled" }) {
  const config = {
    confirmed: { cls: "bg-emerald-50 text-emerald-600 border-emerald-200", label: "Confirmed", icon: "fa-solid fa-check" },
    pending: { cls: "bg-amber-50 text-amber-600 border-amber-200", label: "Pending", icon: "fa-regular fa-clock" },
    cancelled: { cls: "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]", label: "Cancelled", icon: "fa-solid fa-ban" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.cls}`}>
      <i className={c.icon} /> {c.label}
    </span>
  );
}

export default function TeamBookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Analytics Mini-Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider">Out-of-Policy Rate</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <i className="fa-solid fa-triangle-exclamation text-sm" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#111827] mb-1">6.2%</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-red-500 flex items-center gap-1"><i className="fa-solid fa-arrow-up" /> +1.2%</span>
            <span className="text-[#9CA3AF]">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider">Avg Nightly Rate</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <i className="fa-solid fa-bed text-sm" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#111827] mb-1">&euro;148</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-emerald-600 flex items-center gap-1"><i className="fa-solid fa-arrow-down" /> -&euro;12</span>
            <span className="text-[#9CA3AF]">vs RFP average</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider">Total Savings YTD</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <i className="fa-solid fa-piggy-bank text-sm" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#111827] mb-1">&euro;42,850</div>
          {/* Mini sparkline */}
          <div className="w-full h-8 mt-2 flex items-end gap-1">
            {[12, 18, 24, 29, 36, 42.85].map((v, i) => (
              <div key={i} className="flex-1 bg-emerald-500 rounded-t opacity-70" style={{ height: `${(v / 42.85) * 100}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approvals Queue */}
      <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
        <div className="bg-amber-50 px-6 py-4 flex items-center justify-between border-b border-amber-200">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-clock text-amber-500 text-xl" />
            <h2 className="text-xl font-bold text-amber-600">Pending Approvals ({pendingApprovals.length})</h2>
          </div>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">Approve All</button>
        </div>
        <div className="p-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody>
                {pendingApprovals.map((a) => (
                  <tr key={a.traveler} className="group transition-colors border-b border-[#F3F4F6]">
                    <td className="pl-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-xs font-semibold text-[#374151]">
                          {a.avatar}
                        </div>
                        <div>
                          <div className="text-[#111827] font-medium text-sm">{a.traveler}</div>
                          <div className="text-xs text-[#6B7280]">{a.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="text-[#111827] text-sm">{a.hotel}</div>
                      <div className="text-xs text-[#6B7280]">{a.dates} &bull; {a.nights} Nights</div>
                    </td>
                    <td className="py-3">
                      <div className="text-[#111827] font-medium text-sm">&euro;{a.total}</div>
                      <div className="text-xs text-red-500 mt-0.5">{a.issue}</div>
                    </td>
                    <td className="pr-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="border border-[#E5E7EB] px-3 py-1.5 rounded text-xs text-[#374151] hover:bg-[#F9FAFB] transition-colors">Reject</button>
                        <button className="bg-emerald-500 text-white px-3 py-1.5 rounded text-xs hover:bg-emerald-600 transition-colors">Approve</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Global Bookings Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        {/* Table Header & Bulk Actions */}
        <div className="p-4 border-b border-[#E5E7EB] flex flex-col md:flex-row gap-4 items-center justify-between bg-[#F9FAFB]">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <h3 className="text-lg font-bold text-[#111827] whitespace-nowrap">All Team Bookings</h3>
            <div className="h-4 w-px bg-[#E5E7EB] hidden md:block" />
            <div className="flex items-center gap-2">
              <button className="border border-[#E5E7EB] px-3 py-1.5 rounded text-xs flex items-center gap-2 text-[#374151] hover:bg-white transition-colors" disabled>
                <i className="fa-solid fa-file-export" /> Export CSV
              </button>
              <button className="border border-[#E5E7EB] px-3 py-1.5 rounded text-xs flex items-center gap-2 text-[#374151] hover:bg-white transition-colors" disabled>
                <i className="fa-solid fa-file-pdf" /> PDF
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xs" />
              <input
                type="text"
                placeholder="Search traveler, hotel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:border-emerald-500 text-[#111827]"
              />
            </div>
            <div className="relative">
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-white border border-[#E5E7EB] rounded-lg py-1.5 pl-3 pr-8 text-xs appearance-none text-[#374151]"
              >
                <option>Dept: All</option>
                <option>Sales</option>
                <option>Engineering</option>
                <option>Marketing</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[10px] pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-[#E5E7EB] rounded-lg py-1.5 pl-3 pr-8 text-xs appearance-none text-[#374151]"
              >
                <option>Status: All</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[10px] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="pl-6 pt-5 pb-3 w-12">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500" />
                </th>
                <th className="pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Traveler</th>
                <th className="pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Hotel & Location</th>
                <th className="pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Dates</th>
                <th className="pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider text-right">Total</th>
                <th className="pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider text-right">Savings</th>
                <th className="pr-6 pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamBookingsData.map((b) => (
                <tr key={b.traveler + b.hotel} className={`group transition-colors border-b border-[#F3F4F6] hover:bg-[#F9FAFB] ${b.status === "cancelled" ? "opacity-50" : ""}`}>
                  <td className="pl-6 py-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500" />
                  </td>
                  <td className="py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-xs font-semibold text-[#374151]">
                        {b.avatar}
                      </div>
                      <div>
                        <div className="text-[#111827] font-medium text-sm">{b.traveler}</div>
                        <div className="text-xs text-[#6B7280]">{b.dept}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="text-[#111827] text-sm">{b.hotel}</div>
                    <div className="text-xs text-[#6B7280]">{b.city}</div>
                  </td>
                  <td className="py-3">
                    <div className="text-[#111827] text-sm">{b.dates}</div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="font-mono text-[#111827] text-sm font-medium">&euro;{b.total}</div>
                  </td>
                  <td className="py-3 text-right">
                    <div className={`text-sm ${b.savings < 0 ? "text-emerald-600" : "text-[#6B7280]"}`}>
                      {b.savings < 0 ? `-\u20AC${Math.abs(b.savings)}` : "-"}
                    </div>
                  </td>
                  <td className="pr-6 py-3 text-right">
                    <button className="text-[#6B7280] hover:text-[#111827] px-2 py-1 rounded transition-colors text-xs border border-transparent hover:border-[#E5E7EB]">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#E5E7EB] flex items-center justify-between text-sm text-[#6B7280] bg-[#F9FAFB]">
          <span>Showing 1-4 of 42 team bookings</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded border border-[#E5E7EB] flex items-center justify-center hover:bg-white disabled:opacity-50 text-xs" disabled><i className="fa-solid fa-chevron-left" /></button>
            <button className="w-8 h-8 rounded border border-[#E5E7EB] flex items-center justify-center hover:bg-white text-xs bg-[#F3F4F6]"><i className="fa-solid fa-chevron-right" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
