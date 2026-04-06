"use client";

import { auditEntries } from "@/lib/demo-data";

const typeColor: Record<string, string> = {
  TRAVEL_INTENT: "badge-blue",
  HOTEL_OFFER: "badge-emerald",
  COUNTER_PROPOSAL: "badge-amber",
  CONFIRMATION: "badge-emerald",
  ESCALATION: "badge-red",
};

export default function AuditTrailPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Audit Trail</h1>
          <p className="text-[#717171] mt-1">Immutable SHA-256 Signed Records</p>
        </div>
        <span className="text-sm text-[#717171] font-mono">
          {auditEntries.length} entries
        </span>
      </div>

      <div className="space-y-8">
        {/* Info Banner */}
        <div className="bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl p-4">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-shield-halved text-[#484848] text-lg mt-0.5" />
            <div>
              <p className="text-sm text-[#222] font-medium">Cryptographic Integrity</p>
              <p className="text-sm text-[#717171] mt-1">
                Every negotiation event is cryptographically signed with SHA-256 hashing.
                Each entry references the previous hash, forming an immutable chain that
                guarantees audit integrity and prevents retroactive tampering.
              </p>
            </div>
          </div>
        </div>

        {/* Hash Chain Visualization */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h2 className="text-base font-semibold text-[#222] mb-4">
            <i className="fa-solid fa-link text-emerald mr-2" />
            Hash Chain Visualization
          </h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {auditEntries.slice(0, 4).map((entry, i) => (
              <div key={entry.id} className="flex items-center gap-2 flex-shrink-0">
                <div className="bg-white border border-[#EBEBEB] rounded-xl p-3 min-w-[180px] hover:shadow-md transition-shadow">
                  <p className="text-xs text-emerald font-mono">{entry.id}</p>
                  <p className="text-[10px] text-[#717171] mt-1">{entry.type}</p>
                  <div className="mt-2 flex items-center gap-1">
                    <i className="fa-solid fa-lock text-emerald text-[10px]" />
                    <span className="text-[10px] text-[#484848] font-mono truncate">
                      {entry.hash}
                    </span>
                  </div>
                </div>
                {i < 3 && (
                  <div className="w-8 border-t border-[#DDDDDD] flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0] text-sm" />
            <input
              type="text"
              placeholder="Search by ID, hash, actor..."
              className="form-input w-full rounded-lg py-2 pl-9 pr-3 text-sm"
            />
          </div>
          <select className="form-input rounded-lg py-2 px-3 text-sm min-w-[160px]">
            <option value="">All Types</option>
            <option value="TRAVEL_INTENT">Travel Intent</option>
            <option value="HOTEL_OFFER">Hotel Offer</option>
            <option value="COUNTER_PROPOSAL">Counter Proposal</option>
            <option value="CONFIRMATION">Confirmation</option>
            <option value="ESCALATION">Escalation</option>
          </select>
          <input type="date" className="form-input rounded-lg py-2 px-3 text-sm" />
          <span className="text-[#717171]">to</span>
          <input type="date" className="form-input rounded-lg py-2 px-3 text-sm" />
        </div>

        {/* Audit Table */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Negotiation</th>
                  <th>Timestamp</th>
                  <th>Type</th>
                  <th>SHA-256 Hash</th>
                  <th>Actor</th>
                  <th>Property</th>
                  <th>Corporate</th>
                  <th>Verify</th>
                </tr>
              </thead>
              <tbody>
                {auditEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <span className="font-mono text-xs text-[#484848]">{entry.id}</span>
                    </td>
                    <td>
                      <span className="font-mono text-emerald text-sm">{entry.negotiationId}</span>
                    </td>
                    <td>
                      <span className="text-xs text-[#717171] font-mono">
                        {new Date(entry.timestamp).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${typeColor[entry.type] || "badge-slate"} text-xs`}>
                        {entry.type.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      <span
                        className="font-mono text-xs text-[#484848] cursor-help"
                        title={`Full hash: ${entry.hash}`}
                      >
                        {entry.hash}
                      </span>
                    </td>
                    <td className="text-sm text-[#484848]">{entry.actor}</td>
                    <td className="text-sm text-[#222]">{entry.property}</td>
                    <td className="text-sm text-[#484848]">{entry.corporate}</td>
                    <td>
                      <span className="w-7 h-7 rounded-full bg-emerald/10 flex items-center justify-center">
                        <i className="fa-solid fa-circle-check text-emerald text-sm" />
                      </span>
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
