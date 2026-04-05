"use client";

import { hotelShadowReport } from "@/lib/demo-data";

export default function ShadowReportsPage() {
  const report = hotelShadowReport;

  return (
    <>
      {/* Header */}
      <header className="h-16 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Shadow Mode Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">
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
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-up">
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
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              className={`bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 delay-${(i + 1) * 100}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-emerald/10 flex items-center justify-center">
                  <i className={`fa-solid ${kpi.icon} text-emerald text-sm`} />
                </div>
              </div>
              <p
                className={`text-xl font-bold font-mono ${
                  kpi.accent ? "text-emerald" : "text-slate-900"
                }`}
              >
                {kpi.value}
              </p>
              <p className="text-xs text-slate-500 mt-1">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Comparison Chart */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 animate-fade-up delay-200">
          <h2 className="font-display text-lg font-semibold text-slate-900 mb-6">
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
                      <span className="text-xs font-mono text-slate-500">{m.otaRate}</span>
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
                    <p className="text-sm text-slate-900">{m.month}</p>
                    <p className="text-xs text-slate-500">{m.bookings} bookings</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red/60" />
              <span className="text-xs text-slate-500">OTA Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald" />
              <span className="text-xs text-slate-500">Rateflow Rate</span>
            </div>
          </div>
        </div>

        {/* Win Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up delay-300">
          {/* Win breakdown */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
            <h2 className="font-display text-lg font-semibold text-slate-900 mb-4">
              <i className="fa-solid fa-chart-pie text-emerald mr-2" />
              Negotiation Outcomes
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Won vs OTA</span>
                  <span className="text-sm font-mono text-emerald font-bold">
                    {report.wonVsOTA} / {report.totalNegotiations}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald"
                    style={{ width: `${report.winRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Lost to OTA</span>
                  <span className="text-sm font-mono text-red font-bold">
                    {report.totalNegotiations - report.wonVsOTA} / {report.totalNegotiations}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-red/60"
                    style={{ width: `${100 - report.winRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rate comparison */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
            <h2 className="font-display text-lg font-semibold text-slate-900 mb-4">
              <i className="fa-solid fa-scale-balanced text-emerald mr-2" />
              Average Rate Comparison
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm text-slate-500">OTA Avg</div>
                <div className="flex-1 h-8 rounded-lg bg-slate-50 overflow-hidden relative">
                  <div
                    className="h-full bg-red/30 rounded-lg flex items-center px-3"
                    style={{ width: "100%" }}
                  >
                    <span className="text-sm font-mono text-slate-900 font-bold">
                      {report.avgRateVsOTA.ota}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm text-slate-500">Rateflow</div>
                <div className="flex-1 h-8 rounded-lg bg-slate-50 overflow-hidden relative">
                  <div
                    className="h-full bg-emerald/30 rounded-lg flex items-center px-3"
                    style={{
                      width: `${(report.avgRateVsOTA.rateflow / report.avgRateVsOTA.ota) * 100}%`,
                    }}
                  >
                    <span className="text-sm font-mono text-slate-900 font-bold">
                      {report.avgRateVsOTA.rateflow}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E2E8F0] text-center">
                <span className="text-emerald font-mono font-bold text-lg">
                  -{report.avgRateVsOTA.savings}/night
                </span>
                <p className="text-xs text-slate-500 mt-1">average savings per booking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 border-emerald/20 animate-fade-up delay-400">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-lightbulb text-emerald text-xl" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">Shadow Mode Insight</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Rateflow achieves{" "}
                <span className="text-emerald font-bold">
                  {Math.round(
                    ((report.avgRateVsOTA.ota - report.avgRateVsOTA.rateflow) /
                      report.avgRateVsOTA.ota) *
                      100
                  )}
                  % lower rates
                </span>{" "}
                than OTA channels while retaining{" "}
                <span className="text-emerald font-bold">
                  {report.revenueRetained.toLocaleString("fr-FR")}
                </span>{" "}
                more in direct revenue for hotels. Over {report.period},{" "}
                <span className="text-emerald font-bold">
                  {report.otaCommissionSaved.toLocaleString("fr-FR")}
                </span>{" "}
                in OTA commissions were avoided through direct AI-negotiated bookings.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
