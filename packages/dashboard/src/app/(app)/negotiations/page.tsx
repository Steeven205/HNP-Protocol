import Link from "next/link";
import { negotiations } from "@/lib/mock-data";
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

export default function NegotiationsPage() {
  const inProgress = negotiations.filter((n) => n.status === "in_progress").length;
  const confirmed = negotiations.filter((n) => n.status === "confirmed").length;
  const escalated = negotiations.filter((n) => n.status === "escalated").length;
  const withSavings = negotiations.filter((n) => n.savings_pct !== null);
  const avgSavings =
    withSavings.length > 0
      ? (withSavings.reduce((sum, n) => sum + (n.savings_pct ?? 0), 0) / withSavings.length).toFixed(1)
      : "0";

  const destinations = Array.from(new Set(negotiations.map((n) => n.destination)));

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
            {negotiations.map((n) => (
              <Link
                key={n.id}
                href={`/negotiations/${n.id}`}
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
      </div>
    </div>
  );
}
