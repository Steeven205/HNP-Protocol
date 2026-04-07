"use client";

import Link from "next/link";

const negotiations = [
  { status: "in-progress", id: "REQ-8924", hotel: "Le Marais Boutique", corporate: "TechCorp SAS", dates: "12 May - 15 May", rooms: "3x Superior", rate: "€152", badge: "Round 2/2", badgeClass: "bg-amber-100 text-amber-700 border-amber-200", timer: "18:42 left", timerClass: "text-amber-600" },
  { status: "confirmed", id: "REQ-8923", hotel: "Brussels Central", corporate: "Pharma Co", dates: "18 Jun - 20 Jun", rooms: "2x Standard", rate: "€138", badge: "Confirmed", badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200", timer: "--", timerClass: "text-[#9CA3AF]" },
  { status: "escalated", id: "REQ-8922", hotel: "Lyon Confluence", corporate: "Consulting XY", dates: "22 Jul - 25 Jul", rooms: "5x Suite", rate: "€245", badge: "Escalated", badgeClass: "bg-red-100 text-red-600 border-red-200", timer: "--", timerClass: "text-[#9CA3AF]" },
  { status: "timeout", id: "REQ-8921", hotel: "Amsterdam Centrum", corporate: "Tech StartupY", dates: "01 Aug - 03 Aug", rooms: "1x Superior", rate: "--", badge: "Timeout", badgeClass: "bg-slate-100 text-slate-600 border-slate-200", timer: "--", timerClass: "text-[#9CA3AF]" },
  { status: "confirmed", id: "REQ-8920", hotel: "Madrid Sol", corporate: "Pharma Co", dates: "15 May - 18 May", rooms: "2x Superior", rate: "€158", badge: "Confirmed", badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200", timer: "--", timerClass: "text-[#9CA3AF]" },
  { status: "in-progress", id: "REQ-8919", hotel: "Le Marais Boutique", corporate: "TechCorp SAS", dates: "20 May - 22 May", rooms: "1x Standard", rate: "€142", badge: "Round 1/2", badgeClass: "bg-amber-100 text-amber-700 border-amber-200", timer: "24:15 left", timerClass: "text-amber-600" },
];

const statusDotClass: Record<string, string> = {
  "in-progress": "bg-amber-500",
  confirmed: "bg-emerald-500",
  escalated: "bg-red-500",
  timeout: "bg-slate-400",
};

export default function NegotiationsListPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex flex-wrap items-center gap-3 flex-1 w-full">
            <div className="relative flex-1 min-w-[280px]">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xs" />
              <input type="text" placeholder="Request ID, Corporate name, Hotel..." className="w-full border border-[#E5E7EB] rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#111827] focus:outline-none focus:border-emerald-500" />
            </div>
            <select className="border border-[#E5E7EB] rounded-lg py-2.5 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 min-w-[160px]">
              <option>Property: All</option>
              <option>Le Marais Boutique</option>
              <option>Brussels Central</option>
              <option>Lyon Confluence</option>
              <option>Amsterdam Centrum</option>
              <option>Madrid Sol</option>
            </select>
            <select className="border border-[#E5E7EB] rounded-lg py-2.5 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 min-w-[160px]">
              <option>Status: All</option>
              <option>In Progress</option>
              <option>Confirmed</option>
              <option>Escalated</option>
              <option>Timeout</option>
            </select>
            <select className="border border-[#E5E7EB] rounded-lg py-2.5 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 min-w-[140px]">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <select className="border border-[#E5E7EB] rounded-lg py-2.5 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 min-w-[140px]">
              <option>Sort: Newest</option>
              <option>Oldest</option>
              <option>Highest value</option>
              <option>Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Negotiations Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full data-table text-left border-collapse">
            <thead>
              <tr>
                <th className="pl-6 pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  <div className="flex items-center gap-2">Status <i className="fa-solid fa-sort text-[10px]" /></div>
                </th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  <div className="flex items-center gap-2">Request ID <i className="fa-solid fa-sort text-[10px]" /></div>
                </th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  <div className="flex items-center gap-2">Hotel <i className="fa-solid fa-sort text-[10px]" /></div>
                </th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  <div className="flex items-center gap-2">Corporate <i className="fa-solid fa-sort text-[10px]" /></div>
                </th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  <div className="flex items-center gap-2">Dates <i className="fa-solid fa-sort text-[10px]" /></div>
                </th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Rooms</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Rate</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Timer</th>
                <th className="pr-6 pt-4 pb-3 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {negotiations.map((n) => (
                <tr key={n.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                  <td className="pl-6 py-4">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${statusDotClass[n.status]}`} />
                  </td>
                  <td className="py-4">
                    <Link href={`/hotel/negotiations/${n.id.replace("REQ-", "")}`} className="font-mono text-emerald-600 hover:underline font-medium">
                      {n.id}
                    </Link>
                  </td>
                  <td className="py-4 text-sm text-[#111827]">{n.hotel}</td>
                  <td className="py-4 text-sm text-[#111827]">{n.corporate}</td>
                  <td className="py-4 text-sm text-[#111827] font-mono">{n.dates}</td>
                  <td className="py-4 text-sm text-[#111827]">{n.rooms}</td>
                  <td className="py-4 font-mono text-[#111827] font-medium">{n.rate}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${n.badgeClass}`}>
                      {n.badge.includes("Round") && <i className="fa-regular fa-clock" />}
                      {n.badge === "Confirmed" && <i className="fa-solid fa-check" />}
                      {n.badge === "Escalated" && <i className="fa-solid fa-triangle-exclamation" />}
                      {n.badge === "Timeout" && <i className="fa-regular fa-clock" />}
                      {n.badge}
                    </span>
                  </td>
                  <td className={`py-4 text-sm font-mono ${n.timerClass}`}>{n.timer}</td>
                  <td className="pr-6 py-4 text-right">
                    <button className="text-[#9CA3AF] hover:text-[#111827]">
                      <i className="fa-solid fa-ellipsis-vertical" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
