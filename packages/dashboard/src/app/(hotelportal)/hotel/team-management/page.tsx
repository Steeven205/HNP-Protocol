"use client";

import { hotelTeamMembers } from "@/lib/demo-data";

const permissionsColor: Record<string, string> = {
  admin: "badge-emerald",
  editor: "badge-blue",
  viewer: "badge-slate",
};

const permissionsIcon: Record<string, string> = {
  admin: "fa-shield",
  editor: "fa-pen",
  viewer: "fa-eye",
};

export default function TeamManagementPage() {
  return (
    <>
      {/* Header */}
      <header className="h-20 border-b border-white/10 glass-panel flex items-center justify-between px-6 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Team Management</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage your team members and permissions</p>
        </div>
        <button className="btn-emerald px-4 py-2 rounded-lg text-sm font-medium">
          <i className="fa-solid fa-user-plus mr-2" />
          Invite Member
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up">
          <div className="glass-card rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center">
              <i className="fa-solid fa-users text-emerald" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Members</p>
              <p className="text-xl font-bold text-white font-mono">{hotelTeamMembers.length}</p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center">
              <i className="fa-solid fa-circle-check text-emerald" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Active</p>
              <p className="text-xl font-bold text-white font-mono">
                {hotelTeamMembers.filter((m) => m.status === "active").length}
              </p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
              <i className="fa-solid fa-shield text-amber" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Admins</p>
              <p className="text-xl font-bold text-white font-mono">
                {hotelTeamMembers.filter((m) => m.permissions === "admin").length}
              </p>
            </div>
          </div>
        </div>

        {/* Team Table */}
        <div className="glass-panel rounded-2xl overflow-hidden animate-fade-up delay-100">
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th>Permissions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotelTeamMembers.map((member) => (
                  <tr key={member.email}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald font-bold text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-white font-medium">{member.name}</span>
                      </div>
                    </td>
                    <td className="text-slate-300">{member.role}</td>
                    <td>
                      <span className="font-mono text-sm text-slate-400">{member.email}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          member.status === "active" ? "badge-emerald" : "badge-slate"
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            member.status === "active" ? "fa-circle" : "fa-circle-xmark"
                          } text-[8px]`}
                        />
                        {member.status}
                      </span>
                    </td>
                    <td className="text-sm text-slate-400">{member.lastActive}</td>
                    <td>
                      <span
                        className={`badge ${permissionsColor[member.permissions] || "badge-slate"}`}
                      >
                        <i
                          className={`fa-solid ${permissionsIcon[member.permissions] || "fa-user"} text-[10px]`}
                        />
                        {member.permissions}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="btn-outline px-3 py-1.5 rounded-md text-xs">
                          <i className="fa-solid fa-pen text-[10px] mr-1" />
                          Edit
                        </button>
                        <button className="px-3 py-1.5 rounded-md text-xs border border-red/20 text-red hover:bg-red/10 transition-colors">
                          <i className="fa-solid fa-trash text-[10px] mr-1" />
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
