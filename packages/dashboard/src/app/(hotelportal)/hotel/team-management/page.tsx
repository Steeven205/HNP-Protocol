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
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Team Management</h1>
          <p className="text-[#717171] mt-1">Manage your team members and permissions</p>
        </div>
        <button className="btn-emerald px-4 py-2 rounded-lg text-sm font-medium">
          <i className="fa-solid fa-user-plus mr-2" />
          Invite Member
        </button>
      </div>

      <div className="space-y-8">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Total Members</p>
            <p className="text-3xl font-semibold text-[#222] font-mono mt-2">{hotelTeamMembers.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Active</p>
            <p className="text-3xl font-semibold text-[#222] font-mono mt-2">
              {hotelTeamMembers.filter((m) => m.status === "active").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 border-l-4 border-l-amber hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Admins</p>
            <p className="text-3xl font-semibold text-[#222] font-mono mt-2">
              {hotelTeamMembers.filter((m) => m.permissions === "admin").length}
            </p>
          </div>
        </div>

        {/* Team Table */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
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
                        <div className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#222] font-semibold text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-[#222] font-medium">{member.name}</span>
                      </div>
                    </td>
                    <td className="text-[#484848]">{member.role}</td>
                    <td>
                      <span className="font-mono text-sm text-[#717171]">{member.email}</span>
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
                    <td className="text-sm text-[#717171]">{member.lastActive}</td>
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
      </div>
    </div>
  );
}
