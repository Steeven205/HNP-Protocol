"use client";

import { useState } from "react";

export default function CorporateSettingsPage() {
  const [language, setLanguage] = useState("EN");
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    slack: true,
    bookingConfirmations: true,
    approvalReminders: true,
    weeklyReports: false,
  });

  const apiKey = "sk-hnp-corp-tc2026001-a8f3e2d1c4b5";

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Company Profile */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-building text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827] mb-1">Company Profile</h3>
            <p className="text-sm text-[#6B7280]">Your organization details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Company Name</label>
            <input type="text" defaultValue="TechCorp SAS" className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Corporate ID</label>
            <input type="text" defaultValue="TC-2026-001" readOnly className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#6B7280] bg-[#F9FAFB] cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Industry</label>
            <select defaultValue="Technology" className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500">
              <option>Technology</option>
              <option>Consulting</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Manufacturing</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Company Size</label>
            <select defaultValue="201-500" className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500">
              <option value="1-50">1-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-address-card text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827] mb-1">Contact Information</h3>
            <p className="text-sm text-[#6B7280]">Primary contact for your corporate account</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Primary Contact</label>
            <input type="text" defaultValue="Marie Dupont" className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Email</label>
            <input type="email" defaultValue="m.dupont@techcorp.fr" className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Phone</label>
            <input type="tel" defaultValue="+33 1 42 68 53 00" className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500" />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-sliders text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827] mb-1">Preferences</h3>
            <p className="text-sm text-[#6B7280]">Customize your platform experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Language</label>
            <div className="flex rounded-lg border border-[#E5E7EB] overflow-hidden">
              <button
                onClick={() => setLanguage("EN")}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  language === "EN"
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-[#374151] hover:bg-[#F9FAFB]"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("FR")}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-l border-[#E5E7EB] ${
                  language === "FR"
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-[#374151] hover:bg-[#F9FAFB]"
                }`}
              >
                FR
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Currency</label>
            <select defaultValue="EUR" className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500">
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CHF">CHF (CHF)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Timezone</label>
            <select defaultValue="Europe/Paris" className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500">
              <option value="Europe/Paris">Europe/Paris (CET)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Europe/Brussels">Europe/Brussels (CET)</option>
              <option value="America/New_York">America/New York (EST)</option>
              <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Date Format</label>
            <select defaultValue="DD/MM/YYYY" className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-bell text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827] mb-1">Notifications</h3>
            <p className="text-sm text-[#6B7280]">Control how you receive updates</p>
          </div>
        </div>

        <div className="space-y-1">
          {[
            { key: "email" as const, label: "Email Notifications", desc: "Receive booking updates and summaries via email", icon: "fa-envelope" },
            { key: "slack" as const, label: "Slack Notifications", desc: "Get real-time alerts in your Slack workspace", icon: "fa-hashtag" },
            { key: "bookingConfirmations" as const, label: "Booking Confirmations", desc: "Instant notification when a booking is confirmed", icon: "fa-circle-check" },
            { key: "approvalReminders" as const, label: "Approval Reminders", desc: "Reminders for pending booking approvals", icon: "fa-clock" },
            { key: "weeklyReports" as const, label: "Weekly Reports", desc: "Receive a weekly travel spend summary every Monday", icon: "fa-chart-pie" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-4 border-b border-[#F3F4F6] last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                  <i className={`fa-solid ${item.icon} text-[#6B7280]`} />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#111827]">{item.label}</div>
                  <div className="text-xs text-[#6B7280]">{item.desc}</div>
                </div>
              </div>
              <button
                onClick={() => toggleNotification(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[item.key] ? "bg-emerald-500" : "bg-[#D1D5DB]"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                    notifications[item.key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* API Settings */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-code text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827] mb-1">API Settings</h3>
            <p className="text-sm text-[#6B7280]">Manage your API access and webhook configuration</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">API Key</label>
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  readOnly
                  className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm font-mono text-[#111827] bg-[#F9FAFB] focus:outline-none"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827]"
                >
                  <i className={`fa-solid ${showApiKey ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
              <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
                <i className="fa-solid fa-copy" /> Copy
              </button>
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              <i className="fa-solid fa-shield-halved text-emerald-500 mr-1" /> Keep your API key secure. Do not share it publicly.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">Webhook URL</label>
            <input
              type="url"
              placeholder="https://your-app.com/api/webhooks/hnp"
              defaultValue="https://api.techcorp.fr/webhooks/hnp-bookings"
              className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500"
            />
            <p className="text-xs text-[#6B7280] mt-2">
              <i className="fa-solid fa-info-circle text-emerald-500 mr-1" /> We will send booking events to this URL via POST requests
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
              <i className="fa-solid fa-rotate" /> Regenerate Key
            </button>
            <p className="text-xs text-[#6B7280]">This will invalidate your current API key immediately</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-6 py-2.5 rounded-lg text-sm font-medium">
          Discard Changes
        </button>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
          <i className="fa-solid fa-save" /> Save Changes
        </button>
      </div>
    </div>
  );
}
