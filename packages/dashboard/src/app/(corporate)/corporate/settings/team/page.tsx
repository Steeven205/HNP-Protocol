"use client";

import { useState } from "react";

const teamMembers = [
  { name: "Sophie Martin", email: "s.martin@techcorp.fr", role: "Admin", department: "Sales", roleIcon: "fa-shield-halved", roleBg: "bg-emerald-100 text-emerald-700 border-emerald-200", lastActive: "2h ago", avatar: "SM" },
  { name: "Marie Dupont", email: "m.dupont@techcorp.fr", role: "Admin", department: "Travel Management", roleIcon: "fa-shield-halved", roleBg: "bg-emerald-100 text-emerald-700 border-emerald-200", lastActive: "Just now", avatar: "MD" },
  { name: "Thomas Bernard", email: "t.bernard@techcorp.fr", role: "Traveler", department: "Sales", roleIcon: "fa-suitcase-rolling", roleBg: "bg-slate-100 text-slate-600 border-slate-200", lastActive: "1d ago", avatar: "TB" },
  { name: "Julie Petit", email: "j.petit@techcorp.fr", role: "Traveler", department: "Engineering", roleIcon: "fa-suitcase-rolling", roleBg: "bg-slate-100 text-slate-600 border-slate-200", lastActive: "3h ago", avatar: "JP" },
  { name: "Marc Lefevre", email: "m.lefevre@techcorp.fr", role: "Traveler", department: "Product", roleIcon: "fa-suitcase-rolling", roleBg: "bg-slate-100 text-slate-600 border-slate-200", lastActive: "5h ago", avatar: "ML" },
];

const permissionsMatrix = [
  { name: "Book Travel", admin: "check", manager: "check", traveler: "check" },
  { name: "Approve Bookings", admin: "check", manager: "check", traveler: "x" },
  { name: "View Team Bookings", admin: "check", manager: "check", traveler: "limited" },
  { name: "Edit Policy", admin: "check", manager: "limited", traveler: "x" },
  { name: "View Reports", admin: "check", manager: "check", traveler: "limited" },
  { name: "Manage Integrations", admin: "check", manager: "x", traveler: "x" },
];

function PermIcon({ type }: { type: string }) {
  if (type === "check") return <i className="fa-solid fa-check text-emerald-500 text-lg" />;
  if (type === "limited") return <i className="fa-solid fa-check text-amber-500 text-lg" />;
  return <i className="fa-solid fa-xmark text-red-400 text-lg" />;
}

export default function CorporateTeamPage() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Team Members Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB] flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <i className="fa-solid fa-users text-emerald-600 text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#111827]">Team Members</h3>
              <p className="text-xs text-[#6B7280]">5 active members</p>
            </div>
          </div>
          <button onClick={() => setShowInvite(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
            <i className="fa-solid fa-plus" /> Invite Member
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full data-table text-left border-collapse">
            <thead>
              <tr>
                <th className="pl-6 pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Member</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Department</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Role</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Last Active</th>
                <th className="pr-6 pt-4 pb-3 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((m, i) => (
                <tr key={m.email} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                  <td className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-bold border border-emerald-200">
                        {m.avatar}
                      </div>
                      <div>
                        <div className="text-[#111827] font-medium text-sm">{m.name}</div>
                        <div className="text-xs text-[#6B7280]">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-[#374151]">{m.department}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${m.roleBg}`}>
                      <i className={`fa-solid ${m.roleIcon}`} /> {m.role}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-[#111827]">{m.lastActive}</td>
                  <td className="pr-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-3 py-1.5 rounded text-xs">Edit</button>
                      <button className={`bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded text-xs ${i === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-100"}`} disabled={i === 0}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles & Permissions Matrix */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-table text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827] mb-1">Roles &amp; Permissions Matrix</h3>
            <p className="text-sm text-[#6B7280]">Overview of what each role can access</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="py-4 px-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Permission</th>
                <th className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <i className="fa-solid fa-shield-halved text-lg text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-600 uppercase">Admin</span>
                  </div>
                </th>
                <th className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <i className="fa-solid fa-user-tie text-lg text-amber-600" />
                    <span className="text-xs font-semibold text-amber-600 uppercase">Manager</span>
                  </div>
                </th>
                <th className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <i className="fa-solid fa-suitcase-rolling text-lg text-[#6B7280]" />
                    <span className="text-xs font-semibold text-[#6B7280] uppercase">Traveler</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {permissionsMatrix.map((p) => (
                <tr key={p.name} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-4 text-sm text-[#111827]">{p.name}</td>
                  <td className="py-3 px-4 text-center"><PermIcon type={p.admin} /></td>
                  <td className="py-3 px-4 text-center"><PermIcon type={p.manager} /></td>
                  <td className="py-3 px-4 text-center"><PermIcon type={p.traveler} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-info-circle text-emerald-500 text-lg mt-0.5" />
            <div className="text-sm text-[#374151]">
              <p className="font-medium text-[#111827] mb-1">Permission Legend:</p>
              <ul className="space-y-1 text-xs">
                <li><i className="fa-solid fa-check text-emerald-500 mr-2" />Full access to feature</li>
                <li><i className="fa-solid fa-check text-amber-500 mr-2" />Limited or read-only access</li>
                <li><i className="fa-solid fa-xmark text-red-400 mr-2" />No access to feature</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowInvite(false)}>
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xl max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#E5E7EB]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-1">Invite Team Member</h3>
                  <p className="text-sm text-[#6B7280]">Send an invitation to join your corporate travel team</p>
                </div>
                <button onClick={() => setShowInvite(false)} className="text-[#6B7280] hover:text-[#111827]">
                  <i className="fa-solid fa-xmark text-xl" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Email Address</label>
                <input type="email" placeholder="colleague@techcorp.fr" className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Department</label>
                <input type="text" placeholder="e.g. Engineering, Sales, Product..." className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Role</label>
                <select className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500">
                  <option>Traveler</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Optional Message</label>
                <textarea rows={3} placeholder="Add a personal welcome message..." className="w-full border border-[#E5E7EB] rounded-lg py-3 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 resize-none" />
              </div>
            </div>
            <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
              <button onClick={() => setShowInvite(false)} className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-6 py-2.5 rounded-lg text-sm font-medium">
                Cancel
              </button>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
                <i className="fa-solid fa-paper-plane" /> Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
