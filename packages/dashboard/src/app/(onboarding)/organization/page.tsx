"use client";

import { useState } from "react";
import Link from "next/link";

interface TeamMember {
  id: string;
  email: string;
  role: "Admin" | "Manager" | "Traveler";
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {[1, 2].map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              step <= current ? "bg-navy-800" : "bg-slate-300"
            }`}
          />
          {step < 2 && (
            <div
              className={`h-0.5 w-8 transition-colors ${
                step < current ? "bg-navy-800" : "bg-slate-300"
              }`}
            />
          )}
        </div>
      ))}
      <span className="ml-2 text-sm font-medium text-slate-600">
        Step {current} of 2 — Organization Setup
      </span>
    </div>
  );
}

export default function OrganizationPage() {
  const [orgName, setOrgName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: crypto.randomUUID(), email: "", role: "Admin" },
  ]);

  function addMember() {
    setTeamMembers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), email: "", role: "Traveler" },
    ]);
  }

  function removeMember(id: string) {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function updateMemberEmail(id: string, email: string) {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, email } : m))
    );
  }

  function updateMemberRole(id: string, role: TeamMember["role"]) {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role } : m))
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm";

  const selectClass =
    "w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm appearance-none cursor-pointer";

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="bg-white rounded-[16px] p-8 shadow-soft border border-slate-200">
        <StepIndicator current={1} />

        <h1 className="text-xl font-semibold text-slate-900 mb-1">
          Organization Setup
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Tell us about your company to configure HNP Protocol for your team.
        </p>

        {/* Organization Name */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Organization Name
          </label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="e.g. TechCorp SAS"
            className={inputClass}
          />
        </div>

        {/* Industry */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Industry
          </label>
          <div className="relative">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={selectClass}
            >
              <option value="">Select industry</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Consulting">Consulting</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Other">Other</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
          </div>
        </div>

        {/* Company Size */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Company Size
          </label>
          <div className="relative">
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className={selectClass}
            >
              <option value="">Select company size</option>
              <option value="1-50">1-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="500+">500+</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">
            Team Members
          </h2>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_160px_48px] gap-3 px-4 py-2.5 bg-slate-50 border-b border-slate-200">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Email
              </span>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Role
              </span>
              <span />
            </div>

            {/* Table rows */}
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-[1fr_160px_48px] gap-3 px-4 py-3 border-b border-slate-100 last:border-b-0 items-center"
              >
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => updateMemberEmail(member.id, e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm"
                />
                <div className="relative">
                  <select
                    value={member.role}
                    onChange={(e) =>
                      updateMemberRole(
                        member.id,
                        e.target.value as TeamMember["role"]
                      )
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors text-sm appearance-none cursor-pointer"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Traveler">Traveler</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />
                </div>
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  disabled={teamMembers.length === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <i className="fa-solid fa-trash-can text-sm" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addMember}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors"
          >
            <i className="fa-solid fa-plus text-xs" />
            Add Another
          </button>
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            Back
          </Link>
          <Link
            href="/setup"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-navy-800 rounded-xl hover:bg-navy-700 transition-colors shadow-sm"
          >
            Next
            <i className="fa-solid fa-arrow-right text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
}
