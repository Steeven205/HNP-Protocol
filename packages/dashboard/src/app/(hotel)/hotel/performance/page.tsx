"use client";

/* ── Mock Data ──────────────────────────────────────────────────────────── */

const kpis = [
  { title: "Total Bookings (Rateflow)", value: "47", icon: "fa-solid fa-calendar-check", trend: "+8 this month", trendUp: true },
  { title: "Revenue via Rateflow", value: "18,450\u00A0\u20AC", icon: "fa-solid fa-coins", trend: "+22% vs last month", trendUp: true },
  { title: "Avg Negotiated Rate", value: "134\u00A0\u20AC", icon: "fa-solid fa-euro-sign", trend: "+6\u20AC vs last month", trendUp: true },
  { title: "OTA Commission Saved", value: "4,200\u00A0\u20AC", icon: "fa-solid fa-piggy-bank", trend: "15-25% per booking", trendUp: true },
];

const topAccounts = [
  { company: "TechCorp SAS", nightsYtd: 124, avgRate: 138, totalRevenue: 17112, tier: "Gold" as const },
  { company: "Globex Inc", nightsYtd: 87, avgRate: 131, totalRevenue: 11397, tier: "Gold" as const },
  { company: "Initech Labs", nightsYtd: 62, avgRate: 142, totalRevenue: 8804, tier: "Silver" as const },
  { company: "Stark Industries", nightsYtd: 45, avgRate: 155, totalRevenue: 6975, tier: "Silver" as const },
  { company: "Acme Corp", nightsYtd: 34, avgRate: 128, totalRevenue: 4352, tier: "Silver" as const },
];

const monthlyTrend = [
  { month: "Nov", rateflow: 22, ota: 118 },
  { month: "Dec", rateflow: 28, ota: 125 },
  { month: "Jan", rateflow: 31, ota: 121 },
  { month: "Feb", rateflow: 35, ota: 130 },
  { month: "Mar", rateflow: 41, ota: 128 },
  { month: "Apr", rateflow: 47, ota: 126 },
];

const maxBookings = 150;

/* ── Tier Badge ─────────────────────────────────────────────────────────── */

function TierBadge({ tier }: { tier: "Gold" | "Silver" }) {
  const styles = {
    Gold: "bg-amber-50 text-amber-700 border-amber-200",
    Silver: "bg-slate-100 text-slate-600 border-slate-200",
  };
  const icons = {
    Gold: "fa-solid fa-crown",
    Silver: "fa-solid fa-medal",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[tier]}`}>
      <i className={`${icons[tier]} text-[9px]`} />
      {tier}
    </span>
  );
}

/* ── Page Component ─────────────────────────────────────────────────────── */

export default function HotelPerformancePage() {
  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Performance Analytics</h1>
          <p className="mt-1 text-sm text-slate-500">Le Marais Boutique Hotel &mdash; Rateflow channel performance</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <i className="fa-solid fa-file-export text-xs" />
          Export Report
        </button>
      </div>

      {/* ── KPI Grid ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="bg-white p-6 rounded-[16px] border border-slate-200 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{kpi.title}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{kpi.value}</p>
                <p className={`mt-1 text-xs font-medium ${kpi.trendUp ? "text-green-600" : "text-red-500"}`}>
                  {kpi.trend}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-dark">
                <i className={kpi.icon} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bookings by Source ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
          <h2 className="font-display text-base font-semibold text-slate-900 mb-1">Bookings by Source</h2>
          <p className="text-xs text-slate-500 mb-6">Rateflow direct vs OTA channel comparison</p>

          <div className="space-y-5">
            {/* Rateflow bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-gradient-to-r from-navy-800 to-sky-dark" />
                  <span className="text-sm font-medium text-slate-700">Rateflow Direct</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">47 bookings</span>
              </div>
              <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-navy-800 to-sky-dark rounded-lg flex items-center justify-end pr-3 transition-all"
                  style={{ width: `${(47 / 175) * 100}%` }}
                >
                  <span className="text-[11px] font-semibold text-white">27%</span>
                </div>
              </div>
            </div>

            {/* OTA bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-slate-300" />
                  <span className="text-sm font-medium text-slate-700">OTA Channels</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">128 bookings</span>
              </div>
              <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-slate-300 rounded-lg flex items-center justify-end pr-3 transition-all"
                  style={{ width: `${(128 / 175) * 100}%` }}
                >
                  <span className="text-[11px] font-semibold text-slate-600">73%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insight card */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
            <div className="flex items-start gap-3">
              <i className="fa-solid fa-lightbulb text-emerald-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-emerald-800">Commission savings insight</p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Rateflow saves you <strong>15-25%</strong> in OTA commissions on every corporate booking.
                  Growing your Rateflow share from 27% to 40% would save an additional <strong>~2,800&euro;/month</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
          <h2 className="font-display text-base font-semibold text-slate-900 mb-1">Monthly Trend</h2>
          <p className="text-xs text-slate-500 mb-6">Rateflow bookings growth over the last 6 months</p>

          <div className="flex items-end gap-4 h-52">
            {monthlyTrend.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[11px] font-semibold text-navy-800">{m.rateflow}</span>
                <div className="w-full flex flex-col gap-1 items-stretch">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-navy-800 to-sky-dark transition-all"
                    style={{ height: `${(m.rateflow / maxBookings) * 180}px` }}
                  />
                  <div
                    className="w-full rounded-b-md bg-slate-200 transition-all"
                    style={{ height: `${(m.ota / maxBookings) * 180}px` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5">{m.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5 mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-navy-800 to-sky-dark" />
              <span className="text-[11px] text-slate-500">Rateflow</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" />
              <span className="text-[11px] text-slate-500">OTA Channels</span>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <i className="fa-solid fa-arrow-trend-up text-green-600 text-xs" />
              <span className="text-xs font-medium text-green-600">+114% growth (6m)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Top Corporate Accounts ─────────────────────────────────────────── */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-display text-base font-semibold text-slate-900">Top Corporate Accounts</h2>
          <p className="text-xs text-slate-500 mt-0.5">Ranked by nights booked via Rateflow this year</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Rank</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Company</th>
              <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Nights YTD</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Rate</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Total Revenue</th>
              <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {topAccounts.map((account, index) => (
              <tr key={account.company} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                    index === 0
                      ? "bg-amber-100 text-amber-700"
                      : index === 1
                        ? "bg-slate-200 text-slate-600"
                        : "bg-slate-100 text-slate-500"
                  }`}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{account.company}</td>
                <td className="px-6 py-4 text-center text-slate-700">
                  <span className="font-semibold">{account.nightsYtd}</span>
                  <span className="text-slate-400 text-xs ml-1">nights</span>
                </td>
                <td className="px-6 py-4 text-right text-slate-700">{account.avgRate}&nbsp;&euro;</td>
                <td className="px-6 py-4 text-right font-semibold text-slate-900">
                  {account.totalRevenue.toLocaleString("fr-FR")}&nbsp;&euro;
                </td>
                <td className="px-6 py-4 text-center">
                  <TierBadge tier={account.tier} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
