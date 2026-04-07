"use client";

import { useState } from "react";
import Link from "next/link";

const auditRows = [
  {
    timestamp: "2026-04-05 14:32:28",
    hotel: "Le Marais",
    reqId: "REQ-8924",
    actor: "System",
    actorBadge: "bg-slate-100 text-slate-600 border-slate-200",
    actorIcon: "fa-server",
    msgType: "CONFIRMATION",
    typeBadge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    summary: "Booking confirmed, payment processed, voucher sent...",
    hash: "e4c8a1f2...",
    fullHash: "e4c8a1f2d9b3e7a5c2f8d1b4e9c7a3f5d2b8e4c1a9f7d3b5e2c8a4f1d9b7e5c3",
    prevHash: "d7b2e9c4...",
    chainPos: "#1,247",
    json: `{
  "messageId": "MSG-8924-004",
  "requestId": "REQ-8924",
  "timestamp": "2026-04-05T14:32:28.142Z",
  "actor": "system",
  "messageType": "CONFIRMATION",
  "payload": {
    "bookingId": "BK-456789",
    "status": "confirmed",
    "totalAmount": 456.00,
    "currency": "EUR"
  }
}`,
  },
  {
    timestamp: "2026-04-05 14:32:05",
    hotel: "Le Marais",
    reqId: "REQ-8924",
    actor: "Hotel Agent",
    actorBadge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    actorIcon: "fa-hotel",
    msgType: "HOTEL_OFFER",
    typeBadge: "bg-amber-100 text-amber-700 border-amber-200",
    summary: "Final offer €152 + breakfast + late checkout...",
    hash: "d7b2e9c4...",
    fullHash: "d7b2e9c4a3f8b1e5c9a7d2f4b8e3c1a6f9d5b2e8c4a1f7d3b9e6c2a5f8d1b4e7",
    prevHash: "c1a9f8b3...",
    chainPos: "#1,246",
    json: `{
  "messageId": "MSG-8924-003",
  "requestId": "REQ-8924",
  "actor": "hotel_agent",
  "messageType": "HOTEL_OFFER",
  "payload": {
    "rate": 152.00,
    "inclusions": ["breakfast", "wifi", "late_checkout_14h"],
    "cancellationPolicy": "24h_free"
  }
}`,
  },
  {
    timestamp: "2026-04-05 14:31:18",
    hotel: "Le Marais",
    reqId: "REQ-8924",
    actor: "Corporate Agent",
    actorBadge: "bg-blue-100 text-blue-700 border-blue-200",
    actorIcon: "fa-building",
    msgType: "COUNTER_PROPOSAL",
    typeBadge: "bg-amber-100 text-amber-700 border-amber-200",
    summary: "Rate accepted, requesting late checkout 14:00...",
    hash: "c1a9f8b3...",
    fullHash: "c1a9f8b3e5d2a7c4f9b6e1d8a3c5f2b9e7d4a1c8f6b3e9d5a2c7f4b1e8d6a3c9",
    prevHash: "b5e2d7c1...",
    chainPos: "#1,245",
    json: `{
  "messageId": "MSG-8924-002",
  "requestId": "REQ-8924",
  "actor": "corporate_agent",
  "messageType": "COUNTER_PROPOSAL",
  "payload": {
    "acceptRate": true,
    "requestedModifications": ["late_checkout_14h"],
    "justification": "Gold tier, 58 nights YTD"
  }
}`,
  },
  {
    timestamp: "2026-04-05 14:30:45",
    hotel: "Le Marais",
    reqId: "REQ-8924",
    actor: "Hotel Agent",
    actorBadge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    actorIcon: "fa-hotel",
    msgType: "HOTEL_OFFER",
    typeBadge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    summary: "Initial offer €152/night, breakfast + WiFi included...",
    hash: "b5e2d7c1...",
    fullHash: "b5e2d7c1a8f4b9e3d6c2a5f8b1e7d4c9a3f6b2e5d8c1a7f3b9e6d2c4a8f5b1e3",
    prevHash: "a2c5e8f1...",
    chainPos: "#1,244",
    json: `{
  "messageId": "MSG-8924-001",
  "requestId": "REQ-8924",
  "actor": "hotel_agent",
  "messageType": "HOTEL_OFFER",
  "payload": {
    "rate": 152.00,
    "inclusions": ["breakfast", "wifi"],
    "cancellationPolicy": "24h_free"
  }
}`,
  },
];

export default function AuditTrailPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 border-l-4 border-l-blue-500 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-lock text-blue-600 text-lg" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#111827] mb-2">Immutable Audit Trail</h3>
            <p className="text-sm text-[#374151] leading-relaxed">All HNP Protocol messages are cryptographically signed with SHA-256 hashes. This log cannot be altered or deleted. Each message references the previous message hash, creating an immutable blockchain-style chain of custody.</p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex flex-wrap items-center gap-3 flex-1 w-full">
            <div className="relative flex-1 min-w-[280px]">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xs" />
              <input type="text" placeholder="Request ID, Actor, Action..." className="w-full border border-[#E5E7EB] rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#111827] focus:outline-none focus:border-emerald-500" />
            </div>
            <select className="border border-[#E5E7EB] rounded-lg py-2.5 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 min-w-[160px]">
              <option>Property: All</option>
              <option>Le Marais Boutique</option>
              <option>Brussels Central</option>
              <option>Lyon Confluence</option>
            </select>
            <select className="border border-[#E5E7EB] rounded-lg py-2.5 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 min-w-[160px]">
              <option>Date: Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
            <select className="border border-[#E5E7EB] rounded-lg py-2.5 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500 min-w-[140px]">
              <option>Actor: All</option>
              <option>Hotel Agent</option>
              <option>Corporate Agent</option>
              <option>System</option>
            </select>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap">
              <i className="fa-solid fa-file-pdf" /> Export Compliance Report
            </button>
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full data-table text-left border-collapse">
            <thead>
              <tr>
                <th className="pl-6 pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Timestamp</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Hotel</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Request ID</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actor</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Message Type</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Action Summary</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Hash (SHA-256)</th>
                <th className="pr-6 pt-4 pb-3 text-center text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Verify</th>
              </tr>
            </thead>
            <tbody>
              {auditRows.map((row, i) => (
                <>
                  <tr
                    key={`row-${i}`}
                    className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                  >
                    <td className="pl-6 py-4">
                      <div className="font-mono text-xs text-[#374151]">{row.timestamp}</div>
                    </td>
                    <td className="py-4 text-sm text-[#111827]">{row.hotel}</td>
                    <td className="py-4">
                      <Link href={`/hotel/negotiations/${row.reqId.replace("REQ-", "")}`} className="font-mono text-emerald-600 hover:underline font-medium text-sm">
                        {row.reqId}
                      </Link>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${row.actorBadge}`}>
                        <i className={`fa-solid ${row.actorIcon}`} /> {row.actor}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${row.typeBadge}`}>
                        {row.msgType}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="text-[#374151] text-sm truncate max-w-[300px]">{row.summary}</div>
                    </td>
                    <td className="py-4">
                      <span className="text-emerald-600 font-mono text-xs">{row.hash}</span>
                    </td>
                    <td className="pr-6 py-4 text-center">
                      <i className="fa-solid fa-check-circle text-emerald-500 hover:text-emerald-600 cursor-pointer text-lg" />
                    </td>
                  </tr>
                  {expandedRow === i && (
                    <tr key={`expanded-${i}`}>
                      <td colSpan={8} className="p-0">
                        <div className="m-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">Message Details</h4>
                              <div className="space-y-2 text-sm">
                                <div><span className="text-[#6B7280]">Timestamp:</span> <span className="text-[#111827] font-mono">{row.timestamp} UTC</span></div>
                                <div><span className="text-[#6B7280]">Actor:</span> <span className="text-[#111827]">{row.actor}</span></div>
                                <div><span className="text-[#6B7280]">Message Type:</span> <span className="text-emerald-600">{row.msgType}</span></div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">Cryptographic Chain</h4>
                              <div className="space-y-2 text-sm">
                                <div><span className="text-[#6B7280]">Current Hash:</span> <span className="text-emerald-600 font-mono text-xs">{row.hash}</span></div>
                                <div><span className="text-[#6B7280]">Previous Hash:</span> <span className="text-amber-600 font-mono text-xs">{row.prevHash}</span></div>
                                <div><span className="text-[#6B7280]">Chain Position:</span> <span className="text-[#111827]">Message {row.chainPos}</span></div>
                              </div>
                            </div>
                          </div>
                          <h4 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">Full JSON Message</h4>
                          <pre className="bg-white border border-[#E5E7EB] rounded-lg p-3 text-xs font-mono text-[#374151] overflow-x-auto">
                            {row.json}
                          </pre>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
