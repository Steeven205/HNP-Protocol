"use client";

import Link from "next/link";
import { negotiationDetail } from "@/lib/demo-data";

const agentStyles: Record<string, { bg: string; border: string; icon: string; label: string; iconBg: string }> = {
  corporate: {
    bg: "bg-blue/5",
    border: "border-l-blue",
    icon: "fa-building",
    label: "Corporate Agent",
    iconBg: "bg-blue/20 text-blue",
  },
  hotel: {
    bg: "bg-emerald/5",
    border: "border-l-emerald",
    icon: "fa-hotel",
    label: "Hotel Agent",
    iconBg: "bg-emerald/20 text-emerald",
  },
  system: {
    bg: "bg-slate-500/5",
    border: "border-l-slate-500",
    icon: "fa-gear",
    label: "System",
    iconBg: "bg-white/10 text-slate-400",
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
    <>
      {/* Header */}
      <header className="h-20 border-b border-white/10 glass-panel flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/hotel/negotiations" className="text-slate-400 hover:text-white transition-colors">
            <i className="fa-solid fa-arrow-left mr-2" />
            Negotiations
          </Link>
          <span className="text-slate-600">/</span>
          <span className="font-mono text-emerald font-medium">{neg.id}</span>
          <h1 className="font-display text-xl font-bold text-white ml-2">Negotiation Detail</h1>
        </div>
        <button className="btn-outline px-4 py-2 rounded-lg text-sm">
          <i className="fa-solid fa-file-pdf mr-2" />
          Export PDF
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Summary Card */}
        <div className="glass-panel rounded-2xl p-6 animate-fade-up">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center">
                <i className="fa-solid fa-handshake text-emerald text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-xl font-bold text-white">{neg.id}</h2>
                  <span className={`badge ${statusBadge[neg.status]}`}>
                    {neg.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  <i className="fa-solid fa-hotel text-emerald mr-1" />
                  {neg.hotel}
                  <span className="mx-2 text-slate-600">&middot;</span>
                  <i className="fa-solid fa-building text-blue mr-1" />
                  {neg.corporate}
                  <span className="mx-2 text-slate-600">&middot;</span>
                  <i className="fa-solid fa-user text-slate-400 mr-1" />
                  {neg.traveler}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="text-xs text-slate-400">Trip</p>
                <p className="text-white font-mono">
                  {neg.checkIn} &rarr; {neg.checkOut}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400">Nights</p>
                <p className="text-white font-mono">{neg.nights}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400">Room</p>
                <p className="text-white font-mono">{neg.roomType}</p>
              </div>
              {/* Countdown Timer */}
              <div className="glass-card rounded-lg px-4 py-2 border-emerald/30">
                <p className="text-xs text-slate-400">Expires in</p>
                <p className="text-emerald font-mono font-bold text-lg">18:42</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: AI-to-AI Transcript (2/3) */}
          <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden animate-fade-up delay-100">
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="font-display text-lg font-semibold text-white">
                <i className="fa-solid fa-comments text-emerald mr-2" />
                AI-to-AI Transcript
              </h2>
            </div>
            <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
              {neg.messages.map((msg) => {
                const style = agentStyles[msg.agent] || agentStyles.system;
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-4 ${style.bg} border-l-4 ${style.border} rounded-r-xl p-4`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${style.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <i className={`fa-solid ${style.icon} text-sm`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{style.label}</span>
                        <span className="badge badge-slate text-[10px]">{msg.type}</span>
                        <span className="text-xs text-slate-500 ml-auto font-mono">
                          {new Date(msg.timestamp).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{msg.content}</p>
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
              <div className="flex gap-4 bg-amber/5 border-l-4 border-l-amber rounded-r-xl p-4">
                <div className="w-10 h-10 rounded-full bg-amber/20 text-amber flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-building text-sm" />
                </div>
                <div className="flex items-center gap-1 py-2">
                  <span className="w-2 h-2 bg-amber rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-amber rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-amber rounded-full typing-dot" />
                  <span className="text-xs text-slate-400 ml-2">Corporate Agent is reviewing...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            {/* Rate Tracking */}
            <div className="glass-panel rounded-2xl p-6 animate-fade-up delay-200">
              <h3 className="font-display text-base font-semibold text-white mb-4">
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
                        <span className="text-xs text-slate-400">{r.label}</span>
                        <span
                          className={`text-sm font-mono font-bold ${
                            isLast ? "text-emerald" : "text-white"
                          }`}
                        >
                          {r.rate}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLast ? "bg-emerald" : "bg-white/30"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Savings</span>
                  <span className="text-sm font-mono font-bold text-emerald">
                    -{Math.round(((neg.initialRate - (neg.rateHistory.at(-1)?.rate ?? neg.initialRate)) / neg.initialRate) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Policy Compliance */}
            <div className="glass-panel rounded-2xl p-6 animate-fade-up delay-300">
              <h3 className="font-display text-base font-semibold text-white mb-4">
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
                        check.ok ? "text-slate-300" : "text-amber"
                      }`}
                    >
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-panel rounded-2xl p-6 animate-fade-up delay-400">
              <h3 className="font-display text-base font-semibold text-white mb-4">
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
      </main>
    </>
  );
}
