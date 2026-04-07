"use client";

import { useState } from "react";

const connectedIntegrations = [
  {
    name: "Supabase",
    icon: "fa-database",
    desc: "Real-time database and authentication backend",
    lastSync: "2 min ago",
    detail: "All negotiation data synced",
    dataSync: ["Bookings", "Negotiations", "Audit Trail", "User Profiles"],
  },
  {
    name: "Google Workspace",
    icon: "fa-calendar",
    desc: "Calendar sync for travel schedule management",
    lastSync: "5 min ago",
    detail: "Calendar events synced",
    dataSync: ["Calendar Events", "Travel Dates", "Meeting Locations"],
  },
  {
    name: "Slack",
    icon: "fa-bell",
    desc: "Booking notifications and approval workflows",
    lastSync: "Just now",
    detail: "#travel-bookings channel",
    dataSync: ["Booking Alerts", "Approval Requests", "Weekly Summaries"],
  },
];

const availableIntegrations = [
  {
    name: "SAP Concur",
    icon: "fa-file-invoice-dollar",
    desc: "Expense management and travel reconciliation",
    features: ["Auto-expense reports", "Receipt matching", "Policy compliance"],
  },
  {
    name: "Microsoft Teams",
    icon: "fa-comments",
    desc: "Team collaboration and booking notifications",
    features: ["Channel notifications", "Approval bots", "Travel cards"],
  },
  {
    name: "BambooHR",
    icon: "fa-user-group",
    desc: "HRIS integration for traveler profiles and org data",
    features: ["Employee sync", "Department mapping", "Auto-provisioning"],
  },
  {
    name: "Navan",
    icon: "fa-plane",
    desc: "Travel management platform integration",
    features: ["Itinerary sync", "Policy alignment", "Spend analytics"],
  },
];

export default function CorporateIntegrationsPage() {
  const [syncFreq, setSyncFreq] = useState("Real-time");

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Connected Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectedIntegrations.map((integration) => (
          <div key={integration.name} className="bg-white rounded-xl border-2 border-emerald-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <i className={`fa-solid ${integration.icon} text-emerald-600 text-xl`} />
              </div>
              <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
                <i className="fa-solid fa-check" /> Connected
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#111827] mb-2">{integration.name}</h3>
            <p className="text-xs text-[#6B7280] mb-4">{integration.desc}</p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Last sync</span>
                <span className="text-emerald-600 font-mono">{integration.lastSync}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Status</span>
                <span className="text-[#111827] font-mono">{integration.detail}</span>
              </div>
            </div>
            <div className="bg-[#F9FAFB] rounded-lg p-3 mb-4 border border-[#E5E7EB]">
              <div className="text-xs font-semibold text-[#6B7280] mb-2">Data Synced:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {integration.dataSync.map((d) => (
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
        ))}
      </div>

      {/* Available Integrations */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <i className="fa-solid fa-puzzle-piece text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827]">Available Integrations</h3>
            <p className="text-xs text-[#6B7280]">Connect additional tools to streamline your travel operations</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {availableIntegrations.map((integration) => (
            <div key={integration.name} className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                  <i className={`fa-solid ${integration.icon} text-[#6B7280] text-xl`} />
                </div>
                <span className="bg-slate-100 text-slate-600 border border-slate-200 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
                  <i className="fa-regular fa-circle" /> Available
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">{integration.name}</h3>
              <p className="text-xs text-[#6B7280] mb-4">{integration.desc}</p>
              <div className="space-y-2 mb-6">
                {integration.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                    <i className="fa-solid fa-bolt text-emerald-500" /> <span>{f}</span>
                  </div>
                ))}
              </div>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-medium w-full flex items-center justify-center gap-2">
                <i className="fa-solid fa-plug" /> Connect
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
              <i className="fa-solid fa-info-circle text-emerald-500 mr-1" /> Real-time recommended for booking accuracy
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-[#374151] mb-3 block">Data Scope</label>
            <div className="space-y-2">
              {["Bookings & Reservations", "Traveler Profiles", "Expense Data", "Calendar Events"].map((item, i) => (
                <label key={item} className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 3} className="w-4 h-4 rounded border-[#D1D5DB] text-emerald-500 focus:ring-emerald-500" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#374151] mb-3 block">Notification Channel</label>
            <div className="space-y-2">
              {["Slack", "Email", "Microsoft Teams"].map((opt, i) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                  <input type="radio" name="notifChannel" defaultChecked={i === 0} className="w-4 h-4 text-emerald-500 border-[#D1D5DB] focus:ring-emerald-500" />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              <i className="fa-solid fa-info-circle text-emerald-500 mr-1" /> Sync errors will be reported here
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
    </div>
  );
}
