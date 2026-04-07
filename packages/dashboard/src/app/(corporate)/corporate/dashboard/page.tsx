"use client";

import { spendingByMonth } from "@/lib/demo-data";

const savingsData = [
  { month: "Nov", rfp: 9200, rateflow: 7600 },
  { month: "Dec", rfp: 10400, rateflow: 8200 },
  { month: "Jan", rfp: 8800, rateflow: 7100 },
  { month: "Feb", rfp: 11200, rateflow: 8900 },
  { month: "Mar", rfp: 9800, rateflow: 7800 },
  { month: "Apr", rfp: 12450, rateflow: 9600 },
];

const recentTeamBookings = [
  { traveler: "Sophie Martin", dept: "Sales", ref: "BK-456789", hotel: "Le Marais Boutique", city: "Paris, France", dates: "May 12 - 15", nights: 3, total: 426, savings: 48, status: "confirmed" as const, avatar: "SM" },
  { traveler: "Jean Dupont", dept: "Engineering", ref: "BK-456790", hotel: "Brussels Central", city: "Brussels, Belgium", dates: "Jun 18 - 20", nights: 2, total: 276, savings: 24, status: "pending" as const, avatar: "JD" },
  { traveler: "Marie Bernard", dept: "Marketing", ref: "BK-456791", hotel: "Lyon Confluence", city: "Lyon, France", dates: "Apr 22 - 25", nights: 3, total: 384, savings: 36, status: "confirmed" as const, avatar: "MB" },
  { traveler: "Lucas Dubois", dept: "Sales", ref: "BK-456792", hotel: "Amsterdam Centrum", city: "Amsterdam, NL", dates: "Jul 05 - 08", nights: 3, total: 510, savings: 45, status: "confirmed" as const, avatar: "LD" },
  { traveler: "Emma Leroy", dept: "Product", ref: "BK-456793", hotel: "Madrid Sol", city: "Madrid, Spain", dates: "Aug 12 - 14", nights: 2, total: 380, savings: 0, status: "rejected" as const, avatar: "EL" },
];

const topDestinations = [
  { city: "Paris", trips: 24, pct: 100 },
  { city: "Brussels", trips: 18, pct: 75 },
  { city: "Lyon", trips: 12, pct: 50 },
  { city: "Amsterdam", trips: 8, pct: 33 },
];

function StatusBadge({ status }: { status: "confirmed" | "pending" | "rejected" }) {
  const config = {
    confirmed: { cls: "bg-emerald-50 text-emerald-600 border-emerald-200", dot: "bg-emerald-500", label: "Confirmed" },
    pending: { cls: "bg-amber-50 text-amber-600 border-amber-200", dot: "bg-amber-500", label: "Pending Approval" },
    rejected: { cls: "bg-red-50 text-red-600 border-red-200", dot: "bg-red-500", label: "Rejected" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

export default function CorporateDashboardPage() {
  const maxSavings = Math.max(...savingsData.map((d) => d.rfp));

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Alerts & Quick Actions Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Policy Update */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-4 flex items-start gap-4 border-l-4 border-l-amber-400">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 flex-shrink-0 mt-1">
            <i className="fa-solid fa-triangle-exclamation text-sm" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#111827] mb-1">Policy Update</h4>
            <p className="text-xs text-[#6B7280] mb-2">New max rate for Paris is &euro;180/night starting June 1st.</p>
            <a href="/corporate/policy" className="text-xs text-emerald-600 hover:underline no-underline">View Details</a>
          </div>
        </div>

        {/* Approvals Needed */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-4 flex items-start gap-4 border-l-4 border-l-red-400">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0 mt-1">
            <i className="fa-solid fa-clipboard-check text-sm" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#111827] mb-1">Approvals Needed</h4>
            <p className="text-xs text-[#6B7280] mb-2">3 team bookings require your approval today.</p>
            <a href="/corporate/team" className="text-xs text-emerald-600 hover:underline">Review Now</a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-[#111827] mb-1">Quick Actions</h4>
            <p className="text-xs text-[#6B7280]">Manage your workspace</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#111827] transition-colors" title="Invite Team">
              <i className="fa-solid fa-user-plus text-sm" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#111827] transition-colors" title="Download Report">
              <i className="fa-solid fa-download text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1 - Total Savings MTD */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <i className="fa-solid fa-piggy-bank text-4xl text-emerald-500" />
          </div>
          <div className="text-xs text-[#6B7280] font-mono uppercase tracking-wider mb-2">Total Savings MTD</div>
          <div className="text-4xl font-bold text-[#111827] mb-2">&euro;12,450</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-600 font-medium">18.3%</span>
            <span className="text-[#6B7280]">vs RFP contracts</span>
          </div>
          <div className="mt-4 text-xs text-emerald-600 flex items-center gap-1">
            <i className="fa-solid fa-arrow-trend-up" /> +&euro;2,100 vs last month
          </div>
        </div>

        {/* KPI 2 - Bookings This Month */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <i className="fa-solid fa-suitcase text-4xl text-[#374151]" />
          </div>
          <div className="text-xs text-[#6B7280] font-mono uppercase tracking-wider mb-2">Bookings This Month</div>
          <div className="text-4xl font-bold text-[#111827] mb-2">87</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#374151]">3.2 bookings/day avg</span>
          </div>
          <div className="mt-4 text-xs text-emerald-600 flex items-center gap-1">
            <i className="fa-solid fa-arrow-trend-up" /> +12% vs last month
          </div>
        </div>

        {/* KPI 3 - Avg Negotiation Time */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <i className="fa-solid fa-stopwatch text-4xl text-[#374151]" />
          </div>
          <div className="text-xs text-[#6B7280] font-mono uppercase tracking-wider mb-2">Avg Negotiation Time</div>
          <div className="text-4xl font-bold text-[#111827] mb-2">24s</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#374151]">AI-to-AI protocol</span>
          </div>
          <div className="mt-4 text-xs text-emerald-600 flex items-center gap-1">
            <i className="fa-solid fa-bolt" /> vs 40h manual RFP
          </div>
        </div>

        {/* KPI 4 - Policy Compliance */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 relative overflow-hidden group border-t-4 border-t-emerald-500">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <i className="fa-solid fa-shield-halved text-4xl text-emerald-500" />
          </div>
          <div className="text-xs text-[#6B7280] font-mono uppercase tracking-wider mb-2">Policy Compliance</div>
          <div className="text-4xl font-bold text-[#111827] mb-2">94%</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#374151]">In-policy bookings</span>
          </div>
          <div className="mt-4 text-xs text-amber-500 flex items-center gap-1">
            <i className="fa-solid fa-circle-exclamation" /> 6% flagged for review
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Savings Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#111827]">Monthly Savings vs RFP Contracts</h3>
              <p className="text-xs text-[#6B7280] mt-1">Last 6 months performance</p>
            </div>
            <select className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs text-[#374151] px-3 py-1.5 focus:outline-none focus:border-emerald-500">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          {/* Simple bar chart */}
          <div className="h-[280px] flex items-end gap-6 px-2">
            {savingsData.map((d) => {
              const rfpH = (d.rfp / maxSavings) * 240;
              const rfH = (d.rateflow / maxSavings) * 240;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center gap-2" style={{ height: "260px" }}>
                    <div
                      className="w-7 rounded-t bg-[#E5E7EB] transition-all hover:opacity-80"
                      style={{ height: `${rfpH}px` }}
                      title={`RFP: \u20AC${d.rfp.toLocaleString()}`}
                    />
                    <div
                      className="w-7 rounded-t bg-emerald-500 transition-all hover:opacity-80"
                      style={{ height: `${rfH}px` }}
                      title={`Rateflow: \u20AC${d.rateflow.toLocaleString()}`}
                    />
                  </div>
                  <span className="text-xs text-[#6B7280] font-medium">{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#E5E7EB]">
            <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#E5E7EB]" /> RFP Contracts
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Rateflow AI
            </span>
          </div>
        </div>

        {/* Compliance + Top Destinations */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 flex flex-col gap-6">
          {/* Compliance Donut */}
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Compliance Breakdown</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path className="text-[#F3F4F6]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="text-red-500" strokeDasharray="1, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="text-amber-500" strokeDasharray="5, 100" strokeDashoffset="-1" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="text-emerald-500" strokeDasharray="94, 100" strokeDashoffset="-6" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold text-[#111827]">94%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[#374151]">In-policy</span></div>
                <span className="text-[#111827] font-medium">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-[#374151]">Approved Exceptions</span></div>
                <span className="text-[#111827] font-medium">5%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[#374151]">Rejected</span></div>
                <span className="text-[#111827] font-medium">1%</span>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-[#E5E7EB]" />

          {/* Top Destinations */}
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-4 flex justify-between">
              Top Destinations
              <a href="/corporate/bookings" className="text-xs text-emerald-600 font-normal">View All</a>
            </h3>
            <div className="space-y-4">
              {topDestinations.map((d, i) => (
                <div key={d.city}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#374151]">{d.city}</span>
                    <span className="text-[#111827] font-medium">{d.trips} trips</span>
                  </div>
                  <div className="w-full bg-[#F3F4F6] rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${d.pct}%`, opacity: 1 - i * 0.2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Team Bookings Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#111827]">Recent Team Bookings</h3>
            <p className="text-xs text-[#6B7280] mt-1">Live overview of your organization&apos;s travel</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg py-2 px-4 text-xs text-[#374151] hover:bg-[#F3F4F6] transition-colors flex items-center gap-2">
              <i className="fa-solid fa-filter text-[#6B7280]" />
              Filter Status
            </button>
            <a href="/corporate/team" className="border border-[#E5E7EB] rounded-lg px-4 py-2 text-xs font-semibold text-[#374151] hover:bg-[#F9FAFB] transition-colors">View All</a>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Traveler</th>
                <th className="px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Booking Ref</th>
                <th className="px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Destination & Hotel</th>
                <th className="px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Dates</th>
                <th className="px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#374151]">
              {recentTeamBookings.map((b) => (
                <tr key={b.ref} className="transition-colors hover:bg-[#F9FAFB] cursor-pointer border-b border-[#F3F4F6]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-xs font-semibold text-[#374151]">
                        {b.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-[#111827]">{b.traveler}</div>
                        <div className="text-xs text-[#6B7280]">{b.dept}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-emerald-600 text-xs">{b.ref}</td>
                  <td className="px-6 py-4">
                    <div className="text-[#111827]">{b.hotel}</div>
                    <div className="text-xs text-[#6B7280]">{b.city}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{b.dates}</div>
                    <div className="text-xs text-[#6B7280]">{b.nights} nights</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-lg font-semibold text-[#111827]">&euro;{b.total}</div>
                    {b.savings > 0 ? (
                      <div className="text-xs text-emerald-600">Save &euro;{b.savings}</div>
                    ) : b.status === "rejected" ? (
                      <div className="text-xs text-red-500">Policy Exception</div>
                    ) : null}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#6B7280] hover:text-[#111827] p-2">
                      <i className="fa-solid fa-ellipsis-vertical" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
          <div>Showing 1 to 5 of 87 entries</div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center transition-colors disabled:opacity-50" disabled><i className="fa-solid fa-chevron-left text-xs" /></button>
            <button className="w-8 h-8 rounded bg-emerald-500 text-white font-medium flex items-center justify-center text-xs">1</button>
            <button className="w-8 h-8 rounded bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center transition-colors text-xs">2</button>
            <button className="w-8 h-8 rounded bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center transition-colors text-xs">3</button>
            <span className="text-[#6B7280]">...</span>
            <button className="w-8 h-8 rounded bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center transition-colors text-xs"><i className="fa-solid fa-chevron-right" /></button>
          </div>
        </div>
      </div>

      {/* Preferred Hotels */}
      <div>
        <h3 className="text-lg font-semibold text-[#111827] mb-4">Preferred Hotels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Le Marais Boutique", city: "Paris, France", rating: 4.6, avgRate: 142, bookings: 24 },
            { name: "Brussels Central", city: "Brussels, Belgium", rating: 4.5, avgRate: 138, bookings: 18 },
            { name: "Lyon Confluence", city: "Lyon, France", rating: 4.3, avgRate: 128, bookings: 12 },
          ].map((h) => (
            <div key={h.name} className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm group">
              <div className="h-32 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] relative flex items-center justify-center">
                <i className="fa-solid fa-hotel text-3xl text-[#D1D5DB]" />
                <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">{h.rating} <i className="fa-solid fa-star text-[10px]" /></div>
              </div>
              <div className="p-5">
                <h4 className="text-[#111827] font-medium mb-1">{h.name}</h4>
                <p className="text-xs text-[#6B7280] mb-4"><i className="fa-solid fa-location-dot mr-1" /> {h.city}</p>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[#6B7280]">Avg Rate</div>
                    <div className="text-[#111827] font-medium">&euro;{h.avgRate}/night</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280]">Team Bookings</div>
                    <div className="text-[#111827] font-medium">{h.bookings}</div>
                  </div>
                </div>
                <a href="/corporate/book" className="mt-4 w-full border border-[#E5E7EB] py-2 rounded-lg text-xs font-semibold flex justify-center items-center gap-2 text-[#374151] hover:bg-[#F9FAFB] transition-colors">
                  Book Again
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
