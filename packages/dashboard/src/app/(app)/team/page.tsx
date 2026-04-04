"use client";

import { useState, useEffect } from "react";
import { teamMembers as mockTeamMembers, corporate } from "@/lib/mock-data";
import { supabase } from "@/lib/supabase";

type Tab = "profile" | "members" | "api" | "notifications";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "profile", label: "Organization Profile", icon: "fa-building" },
  { id: "members", label: "Team Members", icon: "fa-users" },
  { id: "api", label: "API Keys", icon: "fa-key" },
  { id: "notifications", label: "Notifications", icon: "fa-bell" },
];

interface TeamMember {
  name: string;
  email: string;
  role: string;
  status: "active" | "pending";
}

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  /* ── Team members from Supabase (fallback to mock) ──────────────────── */
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [membersLoading, setMembersLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: true });

        if (!error && data && data.length > 0) {
          setTeamMembers(
            data.map((p: Record<string, string>) => ({
              name: p.full_name || p.name || p.email || "Unknown",
              email: p.email || "",
              role: p.role || "Traveler",
              status: (p.status === "active" ? "active" : "pending") as "active" | "pending",
            })),
          );
        }
        // If no data or error, keep mock data
      } catch {
        // Keep mock data on failure
      } finally {
        setMembersLoading(false);
      }
    }
    fetchProfiles();
  }, []);

  /* ── Form state ─────────────────────────────────────────────────────── */
  const [companyName, setCompanyName] = useState(corporate.company);
  const [registrationId] = useState(corporate.corporate_id);
  const [email, setEmail] = useState(corporate.travel_manager.email);
  const [currency] = useState("EUR");
  const [timezone] = useState("UTC+01:00 Paris");

  const inputClass =
    "w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm";

  const readOnlyInputClass =
    "w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-100 text-slate-500 text-sm cursor-not-allowed";

  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <h1 className="text-2xl font-bold text-slate-900 mb-8">
        Team &amp; Account
      </h1>

      {/* ── Two-column layout ─────────────────────────────────────────── */}
      <div className="flex gap-8">
        {/* Left nav sidebar */}
        <nav className="w-56 shrink-0">
          <ul className="space-y-1">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors text-left ${
                    activeTab === tab.id
                      ? "bg-brand-50 text-brand-600 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <i
                    className={`fa-solid ${tab.icon} w-4 text-center text-xs`}
                  />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right content area */}
        <div className="flex-1 space-y-8">
          {/* ── Organization Profile ─────────────────────────────────── */}
          {activeTab === "profile" && (
            <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
                Organization
              </h2>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Registration ID
                  </label>
                  <input
                    type="text"
                    value={registrationId}
                    readOnly
                    className={readOnlyInputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={currency}
                    readOnly
                    className={readOnlyInputClass}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Time Zone
                  </label>
                  <input
                    type="text"
                    value={timezone}
                    readOnly
                    className={readOnlyInputClass}
                  />
                </div>
              </div>
            </section>
          )}

          {/* ── Team Members (always visible on profile tab, dedicated on members tab) ── */}
          {(activeTab === "profile" || activeTab === "members") && (
            <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Team Members
                </h2>
                <span className="text-xs text-slate-400">
                  {teamMembers.length} members
                </span>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teamMembers.map((member) => (
                    <tr
                      key={member.email}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {member.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {member.status === "active" ? (
                          <span className="inline-flex items-center gap-1.5 text-sm text-green-600">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-sm text-amber-600">
                            <i className="fa-regular fa-clock text-xs" />
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-6 py-4 border-t border-slate-100">
                {!showInviteForm ? (
                  <button
                    type="button"
                    onClick={() => setShowInviteForm(true)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors"
                  >
                    <i className="fa-solid fa-user-plus text-xs" />
                    Invite Member
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <input
                      type="email"
                      placeholder="colleague@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm"
                    />
                    <a
                      href={`mailto:${inviteEmail}?subject=${encodeURIComponent("Join our team on Rateflow")}&body=${encodeURIComponent("You've been invited to join our Rateflow team. Sign up at https://rateflow.co to get started.")}`}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                        inviteEmail
                          ? "bg-navy-800 text-white hover:bg-navy-700"
                          : "bg-slate-100 text-slate-400 pointer-events-none"
                      }`}
                    >
                      <i className="fa-solid fa-paper-plane text-xs" />
                      Send Invite
                    </a>
                    <button
                      type="button"
                      onClick={() => { setShowInviteForm(false); setInviteEmail(""); }}
                      className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── API Keys ─────────────────────────────────────────────── */}
          {(activeTab === "profile" || activeTab === "api") && (
            <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
                API Keys
              </h2>

              <div className="p-4 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-700">
                    Production API Key
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <code className="flex-1 font-mono text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
                    &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;3a8a
                  </code>
                  <button
                    type="button"
                    title="Copy key"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-500 hover:text-navy-600 hover:border-navy-600 transition-colors"
                  >
                    <i className="fa-regular fa-copy text-sm" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <i className="fa-solid fa-rotate text-[10px]" />
                    Revoke
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ── Notifications (placeholder) ──────────────────────────── */}
          {activeTab === "notifications" && (
            <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {[
                  {
                    label: "Negotiation Completed",
                    desc: "Get notified when a negotiation is confirmed",
                    on: true,
                  },
                  {
                    label: "Escalation Alerts",
                    desc: "Immediate alert when a negotiation is escalated",
                    on: true,
                  },
                  {
                    label: "Weekly Digest",
                    desc: "Summary of all negotiations and savings",
                    on: false,
                  },
                  {
                    label: "Policy Violations",
                    desc: "Alert when a booking exceeds policy thresholds",
                    on: true,
                  },
                ].map((pref) => (
                  <NotificationToggle
                    key={pref.label}
                    label={pref.label}
                    description={pref.desc}
                    defaultOn={pref.on}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ── Save button ──────────────────────────────────────────── */}
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-700 transition-colors shadow-soft"
            >
              <i className="fa-solid fa-check text-xs" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Notification toggle sub-component ────────────────────────────────── */

function NotificationToggle({
  label,
  description,
  defaultOn,
}: {
  label: string;
  description: string;
  defaultOn: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultOn);

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-brand-300 transition-colors">
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          enabled ? "bg-navy-800" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
