"use client";

import { useState } from "react";

const connectionCards = [
  {
    name: "D-EDGE",
    icon: "fa-server",
    status: "connected",
    desc: "Premium PMS integration for European hotels",
    lastSync: "2 min ago",
    properties: "5 connected",
    dataSync: ["Availability", "Rates", "Restrictions", "Reservations"],
  },
  {
    name: "SiteMinder",
    icon: "fa-hotel",
    status: "available",
    desc: "Global PMS platform with 40,000+ hotels",
    features: ["Global reach", "Real-time sync", "Enterprise security"],
    authNote: "OAuth 2.0 authentication required",
  },
  {
    name: "Mews",
    icon: "fa-building",
    status: "coming",
    desc: "Modern cloud-based PMS for boutique hotels",
    features: ["Cloud-native", "Mobile-first", "Advanced analytics"],
    comingDate: "Q3 2026",
  },
];

const syncLogs = [
  { time: "22:14:32", date: "Apr 5, 2026", system: "D-EDGE", action: "Sync Availability", status: "Success", details: "70 rooms updated" },
  { time: "22:12:18", date: "Apr 5, 2026", system: "D-EDGE", action: "Sync Rates", status: "Success", details: "12 rate plans updated" },
  { time: "22:10:05", date: "Apr 5, 2026", system: "D-EDGE", action: "Push Reservation", status: "Success", details: "REQ-8924 synced" },
  { time: "21:58:42", date: "Apr 5, 2026", system: "D-EDGE", action: "Sync Restrictions", status: "Warning", details: "2 conflicts detected" },
  { time: "21:45:18", date: "Apr 5, 2026", system: "D-EDGE", action: "Sync Availability", status: "Success", details: "70 rooms updated" },
];

export default function IntegrationsPage() {
  const [syncFreq, setSyncFreq] = useState("Real-time");

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* D-EDGE - Connected */}
        <div className="bg-white rounded-xl border-2 border-emerald-200 shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <i className="fa-solid fa-server text-emerald-600 text-xl" />
            </div>
            <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
              <i className="fa-solid fa-check" /> Connected
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#111827] mb-2">D-EDGE</h3>
          <p className="text-xs text-[#6B7280] mb-4">Premium PMS integration for European hotels</p>
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B7280]">Last sync</span>
              <span className="text-emerald-600 font-mono">2 min ago</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B7280]">Properties</span>
              <span className="text-[#111827] font-mono">5 connected</span>
            </div>
          </div>
          <div className="bg-[#F9FAFB] rounded-lg p-3 mb-4 border border-[#E5E7EB]">
            <div className="text-xs font-semibold text-[#6B7280] mb-2">Data Synced:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {["Availability", "Rates", "Restrictions", "Reservations"].map((d) => (
                <div key={d} className="flex items-center gap-1 text-emerald-600">
                  <i className="fa-solid fa-check" /> <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-4 py-2 rounded-lg text-xs font-medium flex-1">
              <i className="fa-solid fa-cog mr-1" /> Settings
            </button>
            <button className="bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-xs font-medium flex-1">
              <i className="fa-solid fa-unlink mr-1" /> Disconnect
            </button>
          </div>
        </div>

        {/* SiteMinder - Available */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
              <i className="fa-solid fa-hotel text-[#6B7280] text-xl" />
            </div>
            <span className="bg-slate-100 text-slate-600 border border-slate-200 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
              <i className="fa-regular fa-circle" /> Not connected
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#111827] mb-2">SiteMinder</h3>
          <p className="text-xs text-[#6B7280] mb-4">Global PMS platform with 40,000+ hotels</p>
          <div className="space-y-2 mb-6">
            {["Global reach", "Real-time sync", "Enterprise security"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                <i className="fa-solid fa-bolt text-emerald-500" /> <span>{f}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#F9FAFB] rounded-lg p-3 mb-4 border border-[#E5E7EB]">
            <div className="text-xs text-[#6B7280]">
              <i className="fa-solid fa-info-circle text-emerald-500 mr-1" /> OAuth 2.0 authentication required
            </div>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-medium w-full flex items-center justify-center gap-2">
            <i className="fa-solid fa-plug" /> Connect via OAuth
          </button>
        </div>

        {/* Mews - Coming */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 opacity-75">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
              <i className="fa-solid fa-building text-[#6B7280] text-xl" />
            </div>
            <span className="bg-amber-100 text-amber-700 border border-amber-200 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
              <i className="fa-regular fa-clock" /> Coming Q3 2026
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#111827] mb-2">Mews</h3>
          <p className="text-xs text-[#6B7280] mb-4">Modern cloud-based PMS for boutique hotels</p>
          <div className="space-y-2 mb-6">
            {["Cloud-native", "Mobile-first", "Advanced analytics"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                <i className="fa-solid fa-cloud text-[#9CA3AF]" /> <span>{f}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#F9FAFB] rounded-lg p-3 mb-4 border border-[#E5E7EB]">
            <div className="text-xs text-[#6B7280]">
              <i className="fa-solid fa-calendar text-amber-500 mr-1" /> Expected release: Q3 2026
            </div>
          </div>
          <button className="border border-[#E5E7EB] text-[#6B7280] px-6 py-3 rounded-lg text-sm font-medium w-full flex items-center justify-center gap-2 cursor-not-allowed" disabled>
            <i className="fa-solid fa-envelope" /> Request Early Access
          </button>
        </div>
      </div>

      {/* Sync Settings */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-arrows-rotate text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827] mb-1">Sync Settings</h3>
            <p className="text-sm text-[#6B7280]">Configure synchronization frequency and data scope</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-[#374151] mb-3 block">Sync Frequency</label>
            <select
              value={syncFreq}
              onChange={(e) => setSyncFreq(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500"
            >
              <option>Real-time</option>
              <option>Every 5 minutes</option>
              <option>Every 15 minutes</option>
              <option>Every 30 minutes</option>
              <option>Manual only</option>
            </select>
            <p className="text-xs text-[#6B7280] mt-2">
              <i className="fa-solid fa-info-circle text-emerald-500 mr-1" /> Real-time recommended for best accuracy
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-[#374151] mb-3 block">Data Scope</label>
            <div className="space-y-2">
              {["Availability", "Rates", "Restrictions", "Reservations"].map((item, i) => (
                <label key={item} className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 3} className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#374151] mb-3 block">Conflict Resolution</label>
            <div className="space-y-2">
              {["Trust PMS", "Trust Rateflow", "Manual review"].map((opt, i) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                  <input type="radio" name="conflict" defaultChecked={i === 0} className="w-4 h-4 text-emerald-500 border-[#D1D5DB] focus:ring-emerald-500" />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              <i className="fa-solid fa-triangle-exclamation text-amber-500 mr-1" /> Manual review may delay updates
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-[#E5E7EB]">
          <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-6 py-2.5 rounded-lg text-sm font-medium">
            Reset to Default
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium">
            <i className="fa-solid fa-save mr-2" /> Save Settings
          </button>
        </div>
      </div>

      {/* Connection Logs */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <i className="fa-solid fa-list text-emerald-600 text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111827]">Connection Logs</h3>
                <p className="text-xs text-[#6B7280]">Last 10 synchronization events</p>
              </div>
            </div>
            <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2">
              <i className="fa-solid fa-download" /> Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full data-table text-left border-collapse">
            <thead>
              <tr>
                <th className="pl-6 pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Timestamp</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">System</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Action</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="pr-6 pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody>
              {syncLogs.map((log, i) => (
                <tr key={i} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                  <td className="pl-6 py-4">
                    <div className="font-mono text-sm text-[#111827]">{log.time}</div>
                    <div className="text-xs text-[#6B7280]">{log.date}</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-server text-emerald-500" />
                      <span className="text-[#111827] font-medium">{log.system}</span>
                    </div>
                  </td>
                  <td className="py-4 text-[#374151] text-sm">{log.action}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                      log.status === "Success" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-amber-100 text-amber-700 border-amber-200"
                    }`}>
                      <i className={`fa-solid ${log.status === "Success" ? "fa-check" : "fa-triangle-exclamation"}`} /> {log.status}
                    </span>
                  </td>
                  <td className="pr-6 py-4 text-xs text-[#6B7280]">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
