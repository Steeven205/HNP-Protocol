"use client";

import Link from "next/link";
import { negotiationDetail } from "@/lib/demo-data";

const agentStyles: Record<string, { border: string; icon: string; label: string; initials: string; initialsBg: string }> = {
  corporate: {
    border: "border-l-4 border-l-blue",
    icon: "fa-building",
    label: "Corporate Agent",
    initials: "CA",
    initialsBg: "bg-blue-100 text-blue",
  },
  hotel: {
    border: "border-l-4 border-l-emerald",
    icon: "fa-hotel",
    label: "Hotel Agent",
    initials: "HA",
    initialsBg: "bg-emerald-100 text-emerald",
  },
  system: {
    border: "border-l-4 border-l-[#EBEBEB]",
    icon: "fa-gear",
    label: "System",
    initials: "SY",
    initialsBg: "bg-[#F7F7F7] text-[#717171]",
  },
};

const statusBadge: Record<string, string> = {
  in_progress: "badge-amber",
  confirmed: "badge-emerald",
  escalated: "badge-red",
  timeout: "badge-slate",
};

export default function NegotiationDetailPage() {
  const neg = negotiationDetail;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/hotel/negotiations" className="text-[#717171] hover:text-[#222] transition-colors">
            <i className="fa-solid fa-arrow-left mr-2" />
            Negotiations
          </Link>
          <span className="text-[#B0B0B0]">/</span>
          <span className="font-mono text-emerald font-medium">{neg.id}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#222]">Negotiation Detail</h1>
            <p className="text-[#717171] mt-1">{neg.hotel} &middot; {neg.corporate} &middot; {neg.traveler}</p>
          </div>
          <button className="btn-outline px-4 py-2 rounded-lg text-sm">
            <i className="fa-solid fa-file-pdf mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Summary Card */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className={`badge ${statusBadge[neg.status]}`}>
                {neg.status.replace("_", " ")}
              </span>
              <span className="text-sm text-[#717171]">
                {neg.checkIn} &rarr; {neg.checkOut}
              </span>
              <span className="text-[#B0B0B0]">&middot;</span>
              <span className="text-sm text-[#484848] font-mono">{neg.nights} nights</span>
              <span className="text-[#B0B0B0]">&middot;</span>
              <span className="text-sm text-[#484848] font-mono">{neg.roomType}</span>
            </div>
            {/* Countdown Timer */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] px-4 py-2">
              <p className="text-xs text-[#717171]">Expires in</p>
              <p className="text-emerald font-mono font-semibold text-lg">18:42</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: AI-to-AI Transcript (2/3) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EBEBEB]">
              <h2 className="text-lg font-semibold text-[#222]">
                <i className="fa-solid fa-comments text-emerald mr-2" />
                AI-to-AI Transcript
              </h2>
            </div>
            <div className="p-6 space-y-5 max-h-[500px] overflow-y-auto">
              {neg.messages.map((msg) => {
                const style = agentStyles[msg.agent] || agentStyles.system;
                const bgClass = msg.agent === "system" ? "bg-[#F7F7F7]" : "bg-white";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-4 ${bgClass} ${style.border} rounded-r-xl p-4`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${style.initialsBg} flex items-center justify-center flex-shrink-0 text-xs font-semibold`}
                    >
                      {style.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-[#222]">{style.label}</span>
                        <span className="badge badge-slate text-[10px]">{msg.type}</span>
                        <span className="text-xs text-[#B0B0B0] ml-auto font-mono">
                          {new Date(msg.timestamp).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-[#484848] leading-relaxed">{msg.content}</p>
                      {msg.data && (
                        <div className="mt-2 flex gap-2 flex-wrap">
                          {Object.entries(msg.data).map(([key, val]) => (
                            <span key={key} className="badge badge-slate text-[10px]">
                              {key}: {Array.isArray(val) ? val.join(", ") : String(val)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              <div className="flex gap-4 bg-white border-l-4 border-l-blue rounded-r-xl p-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                  CA
                </div>
                <div className="flex items-center gap-1 py-2">
                  <span className="w-2 h-2 bg-blue rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-blue rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-blue rounded-full typing-dot" />
                  <span className="text-xs text-[#717171] ml-2">Corporate Agent is reviewing...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            {/* Rate Tracking */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
              <h3 className="text-base font-semibold text-[#222] mb-4">
                <i className="fa-solid fa-chart-simple text-emerald mr-2" />
                Rate Tracking
              </h3>
              <div className="space-y-3">
                {neg.rateHistory.map((r, i) => {
                  const maxRate = neg.rateHistory[0].rate;
                  const pct = (r.rate / maxRate) * 100;
                  const isLast = i === neg.rateHistory.length - 1;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#717171]">{r.label}</span>
                        <span
                          className={`text-sm font-mono font-semibold ${
                            isLast ? "text-emerald" : "text-[#222]"
                          }`}
                        >
                          {r.rate}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#F7F7F7] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLast ? "bg-emerald" : "bg-[#DDDDDD]"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="mt-3 pt-3 border-t border-[#EBEBEB] flex items-center justify-between">
                  <span className="text-xs text-[#717171]">Savings</span>
                  <span className="text-sm font-mono font-semibold text-emerald">
                    -{Math.round(((neg.initialRate - (neg.rateHistory.at(-1)?.rate ?? neg.initialRate)) / neg.initialRate) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Policy Compliance */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
              <h3 className="text-base font-semibold text-[#222] mb-4">
                <i className="fa-solid fa-shield-check text-emerald mr-2" />
                Policy Compliance
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Under budget (180/night)", ok: true },
                  { label: "24h free cancellation", ok: true },
                  { label: "ESG Tier B minimum", ok: true },
                  { label: "Preferred chain", ok: false, warn: true },
                  { label: "Breakfast included", ok: true },
                ].map((check) => (
                  <div key={check.label} className="flex items-center gap-2">
                    <i
                      className={`fa-solid ${
                        check.ok
                          ? "fa-circle-check text-emerald"
                          : "fa-triangle-exclamation text-amber"
                      } text-sm`}
                    />
                    <span
                      className={`text-sm ${
                        check.ok ? "text-[#484848]" : "text-amber"
                      }`}
                    >
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
              <h3 className="text-base font-semibold text-[#222] mb-4">
                <i className="fa-solid fa-bolt text-emerald mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="btn-emerald w-full py-2.5 rounded-lg text-sm font-medium">
                  <i className="fa-solid fa-check mr-2" />
                  Accept Offer
                </button>
                <button className="btn-outline w-full py-2.5 rounded-lg text-sm font-medium">
                  <i className="fa-solid fa-rotate mr-2" />
                  Counter
                </button>
                <button className="w-full py-2.5 rounded-lg text-sm font-medium border border-red/30 text-red hover:bg-red/10 transition-colors">
                  <i className="fa-solid fa-triangle-exclamation mr-2" />
                  Escalate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
