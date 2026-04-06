"use client";

import { yieldConfig, hotelProperties } from "@/lib/demo-data";

export default function YieldConfigPage() {
  const cfg = yieldConfig;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">AI-Powered Yield Configuration</h1>
          <p className="text-[#717171] mt-1">Natural language strategy to automated rules</p>
        </div>
        <button className="btn-emerald px-4 py-2 rounded-lg text-sm font-medium">
          <i className="fa-solid fa-save mr-2" />
          Save Configuration
        </button>
      </div>

      <div className="space-y-8">
        {/* Property Selector */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 flex items-center gap-4">
          <label className="text-sm text-[#717171]">Property</label>
          <select className="form-input rounded-lg py-2 px-3 text-sm flex-1 max-w-md">
            {hotelProperties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.city})
              </option>
            ))}
          </select>
        </div>

        {/* Two Column: NL Rules + Generated Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Natural Language Rules */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
            <h2 className="text-lg font-semibold text-[#222] mb-4">
              <i className="fa-solid fa-wand-magic-sparkles text-emerald mr-2" />
              Natural Language Rules
            </h2>
            <p className="text-sm text-[#717171] mb-4">
              Describe your pricing strategy in plain language. Claude AI will translate
              into automated yield rules.
            </p>
            <textarea
              className="form-input w-full rounded-xl border border-[#EBEBEB] p-4 text-sm h-32 resize-none focus:border-[#222] focus:ring-0 transition-colors"
              placeholder="e.g. Fill Monday and Tuesday rooms as priority. Reward loyal corporate accounts with 50+ nights per year..."
            />
            <div className="mt-4 space-y-2">
              {cfg.nlRules.map((rule, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white rounded-xl border border-[#EBEBEB] p-3"
                >
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-robot text-emerald text-xs" />
                    <span className="text-sm text-[#484848]">{rule}</span>
                  </div>
                  <button className="text-[#B0B0B0] hover:text-[#222] transition-colors">
                    <i className="fa-solid fa-xmark text-xs" />
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-emerald px-4 py-2 rounded-lg text-sm font-medium mt-4">
              <i className="fa-solid fa-bolt mr-2" />
              Generate Rules
            </button>
          </div>

          {/* Right: Generated Rules Preview */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
            <h2 className="text-lg font-semibold text-[#222] mb-4">
              <i className="fa-solid fa-code text-emerald mr-2" />
              Generated Rules Preview
            </h2>
            <div className="space-y-3">
              {[
                { rule: "Monday/Tuesday priority fill", condition: "day_of_week IN (1,2)", action: "-10% on base rate", source: "NL Rule #1" },
                { rule: "Loyalty volume bonus", condition: "nights_ytd >= 50", action: "-8% discount", source: "NL Rule #2" },
                { rule: "New account protection", condition: "account_age < 90d", action: "Block non-refundable", source: "NL Rule #3" },
              ].map((g, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#EBEBEB] p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#222]">{g.rule}</span>
                    <span className="badge badge-emerald text-[10px]">{g.source}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#717171]">Condition:</span>
                      <p className="text-[#484848] font-mono mt-0.5">{g.condition}</p>
                    </div>
                    <div>
                      <span className="text-[#717171]">Action:</span>
                      <p className="text-emerald font-mono mt-0.5">{g.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floor Rates */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h2 className="text-lg font-semibold text-[#222] mb-6">
            <i className="fa-solid fa-shield text-emerald mr-2" />
            Floor Rates (Minimum Thresholds)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.entries(cfg.floorRate) as [string, number][]).map(([type, rate]) => (
              <div key={type} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#484848] capitalize">{type}</span>
                  <span className="text-lg font-mono font-semibold text-emerald">{rate}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={400}
                  defaultValue={rate}
                  className="w-full accent-emerald"
                />
                <div className="flex justify-between text-xs text-[#B0B0B0]">
                  <span>50</span>
                  <span>400</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Season Rules */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EBEBEB]">
            <h2 className="text-lg font-semibold text-[#222]">
              <i className="fa-solid fa-calendar-days text-emerald mr-2" />
              Season Rules
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left">
              <thead>
                <tr>
                  <th>Season</th>
                  <th>Months</th>
                  <th>Adjustment</th>
                </tr>
              </thead>
              <tbody>
                {cfg.seasonRules.map((s) => {
                  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  return (
                    <tr key={s.name}>
                      <td>
                        <span className="text-[#222] font-medium">{s.name}</span>
                      </td>
                      <td>
                        <div className="flex gap-1 flex-wrap">
                          {s.months.map((m) => (
                            <span key={m} className="badge badge-slate text-[10px]">
                              {monthNames[m - 1]}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`font-mono font-semibold ${
                            s.adjustment.startsWith("+")
                              ? "text-amber"
                              : s.adjustment.startsWith("-")
                              ? "text-emerald"
                              : "text-[#484848]"
                          }`}
                        >
                          {s.adjustment}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Volume Discounts */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EBEBEB]">
            <h2 className="text-lg font-semibold text-[#222]">
              <i className="fa-solid fa-percent text-emerald mr-2" />
              Volume Discounts
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left">
              <thead>
                <tr>
                  <th>Threshold (nights/year)</th>
                  <th>Discount</th>
                </tr>
              </thead>
              <tbody>
                {cfg.volumeDiscounts.map((v) => (
                  <tr key={v.threshold}>
                    <td>
                      <span className="text-[#222] font-mono">{v.threshold}+</span>
                      <span className="text-[#717171] ml-1 text-xs">nights</span>
                    </td>
                    <td>
                      <span className="text-emerald font-mono font-semibold">-{v.discount}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Auto-inclusions */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h2 className="text-lg font-semibold text-[#222] mb-4">
            <i className="fa-solid fa-gift text-emerald mr-2" />
            Auto-Inclusions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {(Object.entries(cfg.autoInclusions) as [string, boolean][]).map(([key, enabled]) => {
              const labels: Record<string, { label: string; icon: string }> = {
                wifi: { label: "WiFi", icon: "fa-wifi" },
                breakfast: { label: "Breakfast", icon: "fa-utensils" },
                parking: { label: "Parking", icon: "fa-square-parking" },
                lateCheckout: { label: "Late Checkout", icon: "fa-clock" },
                airportShuttle: { label: "Airport Shuttle", icon: "fa-van-shuttle" },
              };
              const info = labels[key] || { label: key, icon: "fa-box" };
              return (
                <label
                  key={key}
                  className={`bg-white rounded-xl border p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-md transition-shadow ${
                    enabled ? "border-emerald bg-emerald-50" : "border-[#EBEBEB]"
                  }`}
                >
                  <i className={`fa-solid ${info.icon} text-xl ${enabled ? "text-emerald" : "text-[#717171]"}`} />
                  <span className={`text-sm ${enabled ? "text-[#222]" : "text-[#717171]"}`}>
                    {info.label}
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked={enabled}
                    className="w-4 h-4 accent-emerald"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Occupancy-based Rules */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h2 className="text-lg font-semibold text-[#222] mb-4">
            <i className="fa-solid fa-building text-emerald mr-2" />
            Occupancy-based Rules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cfg.occupancyRules.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#EBEBEB] p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-xs text-[#717171] mb-1">
                  {"above" in r ? `Above ${r.above}%` : `Below ${r.below}%`}
                </div>
                <div
                  className={`text-lg font-mono font-semibold ${
                    r.adjustment.startsWith("+")
                      ? "text-amber"
                      : r.adjustment.startsWith("-")
                      ? "text-emerald"
                      : "text-[#484848]"
                  }`}
                >
                  {r.adjustment}
                </div>
                <div className="mt-2 w-full h-2 rounded-full bg-[#F7F7F7] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      r.adjustment.startsWith("+") ? "bg-amber" : r.adjustment.startsWith("-") ? "bg-emerald" : "bg-[#DDDDDD]"
                    }`}
                    style={{ width: `${"above" in r ? r.above : r.below}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
