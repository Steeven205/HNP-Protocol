"use client";

import { useState } from "react";

const connectedIntegrations = [
  {
    name: "Google Calendar",
    icon: "fa-calendar",
    color: "text-blue-600",
    bg: "bg-blue-100",
    desc: "Automatic travel detection from calendar events. When a meeting is scheduled in another city, Rateflow proposes a booking.",
    lastSync: "5 min ago",
    detail: "12 upcoming trips detected",
    dataSync: ["Calendar Events", "Meeting Locations", "Travel Dates", "Attendees"],
  },
  {
    name: "Slack",
    icon: "fa-hashtag",
    color: "text-purple-600",
    bg: "bg-purple-100",
    desc: "Real-time booking notifications, approval workflows, and weekly travel reports in your Slack workspace.",
    lastSync: "Just now",
    detail: "#travel-bookings channel",
    dataSync: ["Booking Confirmations", "Approval Requests", "Price Alerts", "Weekly Digests"],
  },
];

const availableIntegrations = [
  {
    name: "D-EDGE",
    icon: "fa-server",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    desc: "Access 17,000+ European hotels in real-time. D-EDGE is the leading distribution platform for independent hotels in France and Belgium.",
    features: ["17,000+ hotels FR/BE", "Real-time rates & availability", "Direct booking — no OTA commission"],
    tag: "Recommended",
    tagColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    name: "SiteMinder",
    icon: "fa-globe",
    color: "text-blue-600",
    bg: "bg-blue-100",
    desc: "Global channel manager connecting 40,000+ hotels across 150 countries. The largest hotel distribution platform worldwide.",
    features: ["40,000+ hotels worldwide", "150 countries covered", "Channel+ API — pull-based rates"],
    tag: "Global",
    tagColor: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    name: "Mews PMS",
    icon: "fa-building",
    color: "text-cyan-600",
    bg: "bg-cyan-100",
    desc: "Cloud-native property management system. Direct connection to hotel inventory, rates, and booking engine.",
    features: ["Cloud-based PMS", "Real-time inventory sync", "Sandbox available for testing"],
    tag: "Coming Q3",
    tagColor: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    name: "Cloudbeds",
    icon: "fa-cloud",
    color: "text-sky-600",
    bg: "bg-sky-100",
    desc: "All-in-one hospitality platform for independent hotels. Property management, channel management, and booking engine.",
    features: ["All-in-one platform", "Independent hotels focus", "Revenue management tools"],
    tag: "Coming Q4",
    tagColor: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    name: "SAP Concur",
    icon: "fa-file-invoice-dollar",
    color: "text-orange-600",
    bg: "bg-orange-100",
    desc: "Automatic expense reconciliation. Rateflow bookings sync directly to Concur for seamless travel expense management.",
    features: ["Auto-expense reports", "Receipt matching", "Policy compliance audit"],
    tag: "Available",
    tagColor: "bg-slate-100 text-slate-600 border-slate-200",
  },
  {
    name: "Microsoft Teams",
    icon: "fa-comments",
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    desc: "Alternative to Slack for organizations using Microsoft 365. Booking notifications and approval workflows.",
    features: ["Channel notifications", "Approval bots", "Booking cards"],
    tag: "Available",
    tagColor: "bg-slate-100 text-slate-600 border-slate-200",
  },
];

export default function CorporateIntegrationsPage() {
  const [syncFreq, setSyncFreq] = useState("Real-time");

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Integrations</h1>
        <p className="text-sm text-[#6B7280] mt-1">Connect hotel distribution platforms and productivity tools</p>
      </div>

      {/* Info banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <i className="fa-solid fa-plug text-emerald-600 text-sm" />
        </div>
        <div>
          <p className="text-sm font-medium text-emerald-800">Hotel supply via connectors</p>
          <p className="text-xs text-emerald-700 mt-0.5">Rateflow connects to hotel distribution platforms (D-EDGE, SiteMinder) to access real-time rates and availability from thousands of hotels — no individual contracts needed.</p>
        </div>
      </div>

      {/* Connected Integrations */}
      <div>
        <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Connected</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {connectedIntegrations.map((integration) => (
            <div key={integration.name} className="bg-white rounded-xl border-2 border-emerald-200 shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${integration.bg} flex items-center justify-center`}>
                  <i className={`fa-solid ${integration.icon} ${integration.color} text-xl`} />
                </div>
                <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
                  <i className="fa-solid fa-check text-[9px]" /> Connected
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-1">{integration.name}</h3>
              <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">{integration.desc}</p>
              <div className="flex items-center gap-4 text-xs text-[#6B7280] mb-4">
                <span className="flex items-center gap-1"><i className="fa-solid fa-clock text-emerald-500" /> {integration.lastSync}</span>
                <span className="flex items-center gap-1"><i className="fa-solid fa-circle-check text-emerald-500" /> {integration.detail}</span>
              </div>
              <div className="bg-[#F9FAFB] rounded-lg p-3 mb-4 border border-[#F3F4F6]">
                <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Synced data</div>
                <div className="flex flex-wrap gap-1.5">
                  {integration.dataSync.map((d) => (
                    <span key={d} className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <i className="fa-solid fa-check text-[7px]" /> {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-4 py-2 rounded-lg text-xs font-medium flex-1 transition-colors">
                  <i className="fa-solid fa-cog mr-1" /> Settings
                </button>
                <button className="bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-xs font-medium flex-1 transition-colors">
                  <i className="fa-solid fa-unlink mr-1" /> Disconnect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotel Supply Connectors */}
      <div>
        <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Hotel Supply &amp; Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableIntegrations.slice(0, 4).map((integration) => (
            <div key={integration.name} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${integration.bg} flex items-center justify-center`}>
                  <i className={`fa-solid ${integration.icon} ${integration.color} text-xl`} />
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium border ${integration.tagColor}`}>
                  {integration.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-1">{integration.name}</h3>
              <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">{integration.desc}</p>
              <div className="space-y-2 mb-6">
                {integration.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                    <i className="fa-solid fa-check text-emerald-500 text-[10px]" /> <span>{f}</span>
                  </div>
                ))}
              </div>
              {integration.tag.startsWith("Coming") ? (
                <button className="w-full border border-[#E5E7EB] text-[#6B7280] px-6 py-3 rounded-lg text-sm font-medium cursor-not-allowed opacity-60">
                  <i className="fa-regular fa-clock mr-2" /> {integration.tag}
                </button>
              ) : integration.tag === "Recommended" ? (
                <button className="w-full bg-[#111827] hover:bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors">
                  <i className="fa-solid fa-plug mr-2" /> Connect D-EDGE
                </button>
              ) : (
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors">
                  <i className="fa-solid fa-plug mr-2" /> Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Productivity Tools */}
      <div>
        <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Productivity &amp; Expense</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableIntegrations.slice(4).map((integration) => (
            <div key={integration.name} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${integration.bg} flex items-center justify-center`}>
                  <i className={`fa-solid ${integration.icon} ${integration.color} text-xl`} />
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium border ${integration.tagColor}`}>
                  {integration.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-1">{integration.name}</h3>
              <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">{integration.desc}</p>
              <div className="space-y-2 mb-6">
                {integration.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                    <i className="fa-solid fa-check text-emerald-500 text-[10px]" /> <span>{f}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors">
                <i className="fa-solid fa-plug mr-2" /> Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sync Settings */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-arrows-rotate text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827] mb-1">Sync Settings</h3>
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
              <option>Manual only</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[#374151] mb-3 block">Data Scope</label>
            <div className="space-y-2">
              {["Bookings & Reservations", "Traveler Profiles", "Calendar Events", "Expense Reports"].map((item, i) => (
                <label key={item} className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 3} className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 accent-emerald-500" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#374151] mb-3 block">Notifications</label>
            <div className="space-y-2">
              {["Slack channel", "Email digest", "In-app only"].map((opt, i) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                  <input type="radio" name="notifChannel" defaultChecked={i === 0} className="w-4 h-4 text-emerald-500 border-[#D1D5DB] accent-emerald-500" />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-[#F3F4F6]">
          <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Reset
          </button>
          <button className="bg-[#111827] hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
