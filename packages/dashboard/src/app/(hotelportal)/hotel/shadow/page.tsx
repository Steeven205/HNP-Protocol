"use client";

import { hotelShadowReport } from "@/lib/demo-data";

export default function ShadowReportsPage() {
  const report = hotelShadowReport;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Shadow Mode Analytics</h1>
          <p className="text-[#717171] mt-1">
            Compare Rateflow negotiated rates vs OTA channel rates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge badge-blue">
            <i className="fa-solid fa-flask text-[10px]" />
            {report.period}
          </span>
          <button className="btn-outline px-4 py-2 rounded-lg text-sm">
            <i className="fa-solid fa-file-export mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              label: "Total Negotiations",
              value: report.totalNegotiations.toString(),
              icon: "fa-handshake",
              accent: false,
            },
            {
              label: "Win Rate vs OTA",
              value: `${report.winRate}%`,
              icon: "fa-trophy",
              accent: true,
            },
            {
              label: "Avg Rate vs OTA",
              value: `${report.avgRateVsOTA.rateflow} vs ${report.avgRateVsOTA.ota}`,
              icon: "fa-scale-balanced",
              accent: true,
            },
            {
              label: "OTA Commission Saved",
              value: `${report.otaCommissionSaved.toLocaleString("fr-FR")}`,
              icon: "fa-piggy-bank",
              accent: true,
            },
            {
              label: "Revenue Retained",
              value: `${report.revenueRetained.toLocaleString("fr-FR")}`,
              icon: "fa-vault",
              accent: true,
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">{kpi.label}</p>
              <p
                className={`text-3xl font-semibold font-mono mt-2 ${
                  kpi.accent ? "text-emerald" : "text-[#222]"
                }`}
              >
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Chart */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h2 className="text-lg font-semibold text-[#222] mb-6">
            <i className="fa-solid fa-chart-column text-emerald mr-2" />
            OTA Rate vs Rateflow Rate (Monthly)
          </h2>
          <div className="flex items-end justify-center gap-8 h-64 px-8">
            {report.monthlyData.map((m) => {
              const maxRate = 200;
              const otaPct = (m.otaRate / maxRate) * 100;
              const rfPct = (m.rateflowRate / maxRate) * 100;
              return (
                <div key={m.month} className="flex-1 max-w-[120px]">
                  <div className="flex items-end gap-2 justify-center h-48">
                    {/* OTA bar */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-mono text-[#717171]">{m.otaRate}</span>
                      <div
                        className="w-8 rounded-t bg-red/60 transition-all"
                        style={{ height: `${otaPct}%` }}
                      />
                    </div>
                    {/* Rateflow bar */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-mono text-emerald">{m.rateflowRate}</span>
                      <div
                        className="w-8 rounded-t bg-emerald transition-all"
                        style={{ height: `${rfPct}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <p className="text-sm text-[#222]">{m.month}</p>
                    <p className="text-xs text-[#717171]">{m.bookings} bookings</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red/60" />
              <span className="text-xs text-[#717171]">OTA Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald" />
              <span className="text-xs text-[#717171]">Rateflow Rate</span>
            </div>
          </div>
        </div>

        {/* Win Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Win breakdown */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
            <h2 className="text-lg font-semibold text-[#222] mb-4">
              <i className="fa-solid fa-chart-pie text-emerald mr-2" />
              Negotiation Outcomes
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#484848]">Won vs OTA</span>
                  <span className="text-sm font-mono text-emerald font-semibold">
                    {report.wonVsOTA} / {report.totalNegotiations}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F7F7F7] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald"
                    style={{ width: `${report.winRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#484848]">Lost to OTA</span>
                  <span className="text-sm font-mono text-red font-semibold">
                    {report.totalNegotiations - report.wonVsOTA} / {report.totalNegotiations}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F7F7F7] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-red/60"
                    style={{ width: `${100 - report.winRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rate comparison */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
            <h2 className="text-lg font-semibold text-[#222] mb-4">
              <i className="fa-solid fa-scale-balanced text-emerald mr-2" />
              Average Rate Comparison
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm text-[#717171]">OTA Avg</div>
                <div className="flex-1 h-8 rounded-lg bg-[#F7F7F7] overflow-hidden relative">
                  <div
                    className="h-full bg-red/30 rounded-lg flex items-center px-3"
                    style={{ width: "100%" }}
                  >
                    <span className="text-sm font-mono text-[#222] font-semibold">
                      {report.avgRateVsOTA.ota}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm text-[#717171]">Rateflow</div>
                <div className="flex-1 h-8 rounded-lg bg-[#F7F7F7] overflow-hidden relative">
                  <div
                    className="h-full bg-emerald/30 rounded-lg flex items-center px-3"
                    style={{
                      width: `${(report.avgRateVsOTA.rateflow / report.avgRateVsOTA.ota) * 100}%`,
                    }}
                  >
                    <span className="text-sm font-mono text-[#222] font-semibold">
                      {report.avgRateVsOTA.rateflow}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#EBEBEB] text-center">
                <span className="text-emerald font-mono font-semibold text-lg">
                  -{report.avgRateVsOTA.savings}/night
                </span>
                <p className="text-xs text-[#717171] mt-1">average savings per booking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-lightbulb text-emerald text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#222]">Shadow Mode Insight</h3>
              <p className="text-sm text-[#484848] mt-2 leading-relaxed">
                Rateflow achieves{" "}
                <span className="text-emerald font-semibold">
                  {Math.round(
                    ((report.avgRateVsOTA.ota - report.avgRateVsOTA.rateflow) /
                      report.avgRateVsOTA.ota) *
                      100
                  )}
                  % lower rates
                </span>{" "}
                than OTA channels while retaining{" "}
                <span className="text-emerald font-semibold">
                  {report.revenueRetained.toLocaleString("fr-FR")}
                </span>{" "}
                more in direct revenue for hotels. Over {report.period},{" "}
                <span className="text-emerald font-semibold">
                  {report.otaCommissionSaved.toLocaleString("fr-FR")}
                </span>{" "}
                in OTA commissions were avoided through direct AI-negotiated bookings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
