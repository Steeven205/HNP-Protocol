"use client";

import { useState } from "react";
import Link from "next/link";
import { negotiationDetail } from "@/lib/mock-data";

export default function EscalationPage() {
  const neg = negotiationDetail;

  // Simulate escalation context: the offer exceeded budget
  const targetBudget = neg.budget;
  const latestOffer = 168;
  const gap = latestOffer - targetBudget;

  const [counterRate, setCounterRate] = useState("");
  const [humanMessage, setHumanMessage] = useState("");
  const [internalNote, setInternalNote] = useState("");

  const internalNotes = [
    {
      id: "note-1",
      author: "Marie Dupont",
      time: "10:15 AM",
      text: "This hotel doesn\u2019t usually budge below \u20AC160 for Lyon. We may need to accept or find an alternative.",
    },
    {
      id: "note-2",
      author: "System",
      time: "10:12 AM",
      text: "Agent escalated after 2 rounds. Hotel final offer: \u20AC168/night. Budget cap: \u20AC150/night.",
    },
  ];

  const policyViolations = [
    { label: `Rate \u20AC${latestOffer} exceeds budget \u20AC${targetBudget}`, passed: false },
    { label: "Cancellation 24h free", passed: true },
    { label: "ESG Tier B+", passed: true },
    { label: "Max 2 negotiation rounds reached", passed: false },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <Link href="/negotiations" className="hover:text-navy-800 transition-colors">
          Negotiations
        </Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
        <Link href={`/negotiations/${neg.id}`} className="hover:text-navy-800 transition-colors">
          {neg.id}
        </Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
        <span className="text-slate-900 font-medium">Escalation</span>
      </div>

      {/* Escalation Header Card */}
      <div className="border-l-4 border-l-red-500 bg-white rounded-[16px] p-6 shadow-soft mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1">
                <i className="fa-solid fa-triangle-exclamation text-[10px]" />
                Escalated
              </span>
              <span className="text-sm text-slate-500">
                {neg.id} &middot; {neg.traveler} &middot; {neg.destination}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">Human Decision Required</h1>
            <p className="text-sm text-slate-500">
              The AI agents could not reach an agreement within policy limits after 2 rounds.
            </p>
          </div>
          <div className="text-right space-y-1">
            <div className="text-sm text-slate-500">Hotel latest offer</div>
            <div className="text-2xl font-bold text-red-600">{latestOffer}&nbsp;&euro;<span className="text-sm font-normal text-slate-400">/night</span></div>
          </div>
        </div>

        {/* Gap Summary */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Target Budget</p>
            <p className="text-lg font-semibold text-slate-900">{targetBudget}&nbsp;&euro;</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-arrow-right text-slate-300" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Latest Offer</p>
            <p className="text-lg font-semibold text-red-600">{latestOffer}&nbsp;&euro;</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-arrow-right text-slate-300" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Gap</p>
            <p className="text-lg font-semibold text-red-600">+{gap}&nbsp;&euro;</p>
          </div>
          <div className="ml-auto">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Over Budget</p>
            <p className="text-lg font-semibold text-red-600">
              +{((gap / targetBudget) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Negotiation History (condensed) */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Negotiation History
            </h2>
            <div className="space-y-3 opacity-70 max-h-60 overflow-y-auto pr-2">
              {neg.messages.map((msg) => {
                const isCorporate = msg.agent === "corporate";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isCorporate ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        isCorporate
                          ? "bg-slate-50 border border-slate-200 rounded-xl rounded-tl-none"
                          : "bg-sky-50/70 border border-sky-200/70 rounded-xl rounded-tr-none"
                      } px-3 py-2`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isCorporate ? "text-navy-600" : "text-sky-500"}`}>
                          {isCorporate ? "Corporate" : "Hotel"}
                        </span>
                        <span className="bg-slate-100 text-slate-600 text-[9px] font-bold rounded px-1.5 py-0.5 uppercase">
                          {msg.type.replace(/_/g, " ")}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Human Decision Panel */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Human Decision Panel
            </h2>

            {/* Counter Rate */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Counter Rate (optional)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
                  &euro;
                </span>
                <input
                  type="number"
                  min={0}
                  value={counterRate}
                  onChange={(e) => setCounterRate(e.target.value)}
                  placeholder="155"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Message to Agent (optional)
              </label>
              <textarea
                rows={3}
                value={humanMessage}
                onChange={(e) => setHumanMessage(e.target.value)}
                placeholder="e.g. Accept if they include breakfast, otherwise terminate."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-green-500 text-green-700 text-sm font-semibold hover:bg-green-50 transition-colors">
                <i className="fa-solid fa-check text-xs" />
                Approve Current
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-yellow-500 text-yellow-700 text-sm font-semibold hover:bg-yellow-50 transition-colors">
                <i className="fa-solid fa-circle-info text-xs" />
                Request More Info
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-red-500 text-red-700 text-sm font-semibold hover:bg-red-50 transition-colors">
                <i className="fa-solid fa-ban text-xs" />
                Terminate
              </button>
            </div>

            <button className="w-full bg-navy-800 text-white py-3 rounded-xl font-semibold text-sm hover:bg-navy-700 transition-colors">
              <i className="fa-solid fa-gavel mr-2" />
              Execute Decision
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[360px] shrink-0 space-y-6">
          {/* Assignment */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Assignment
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-600 font-bold text-sm">
                MD
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Marie Dupont</p>
                <p className="text-xs text-slate-500">Travel Manager &middot; TechCorp SAS</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Online
              </span>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Internal Notes
            </h2>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1 mb-4">
              {internalNotes.map((note) => (
                <div key={note.id} className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-700">{note.author}</span>
                    <span className="text-[10px] text-slate-400">{note.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{note.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 rounded-xl border border-slate-200 bg-white py-2 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
              />
              <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-800 text-white hover:bg-navy-700 transition-colors">
                <i className="fa-solid fa-paper-plane text-xs" />
              </button>
            </div>
          </div>

          {/* Policy Context */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Policy Context
            </h2>
            <div className="space-y-2.5">
              {policyViolations.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl ${
                    item.passed ? "bg-slate-50" : "bg-orange-50"
                  }`}
                >
                  {item.passed ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 shrink-0">
                      <i className="fa-solid fa-check text-[10px]" />
                    </span>
                  ) : (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 shrink-0">
                      <i className="fa-solid fa-xmark text-[10px]" />
                    </span>
                  )}
                  <span className={`text-sm ${item.passed ? "text-slate-700" : "text-orange-800 font-medium"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
