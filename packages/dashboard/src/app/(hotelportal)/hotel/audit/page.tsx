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
    <>
      {/* Header */}
      <header className="h-20 border-b border-white/10 glass-panel flex items-center justify-between px-6 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Audit Trail</h1>
          <p className="text-sm text-slate-400 mt-0.5">Immutable SHA-256 Signed Records</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400 font-mono">
            {auditEntries.length} entries
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Info Banner */}
        <div className="glass-card rounded-xl p-5 border-l-4 border-l-blue animate-fade-up">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-shield-halved text-blue text-lg mt-0.5" />
            <div>
              <p className="text-sm text-white font-medium">Cryptographic Integrity</p>
              <p className="text-sm text-slate-400 mt-1">
                Every negotiation event is cryptographically signed with SHA-256 hashing.
                Each entry references the previous hash, forming an immutable chain that
                guarantees audit integrity and prevents retroactive tampering.
              </p>
            </div>
          </div>
        </div>

        {/* Hash Chain Visualization */}
        <div className="glass-panel rounded-2xl p-6 animate-fade-up delay-100">
          <h2 className="font-display text-base font-semibold text-white mb-4">
            <i className="fa-solid fa-link text-emerald mr-2" />
            Hash Chain Visualization
          </h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {auditEntries.slice(0, 4).map((entry, i) => (
              <div key={entry.id} className="flex items-center gap-2 flex-shrink-0">
                <div className="glass-card rounded-lg p-3 min-w-[180px]">
                  <p className="text-xs text-emerald font-mono">{entry.id}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{entry.type}</p>
                  <div className="mt-2 flex items-center gap-1">
                    <i className="fa-solid fa-lock text-emerald text-[10px]" />
                    <span className="text-[10px] text-slate-500 font-mono truncate">
                      {entry.hash}
                    </span>
                  </div>
                </div>
                {i < 3 && (
                  <i className="fa-solid fa-arrow-right text-emerald/50 text-sm flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="glass-panel rounded-xl p-4 flex flex-wrap items-center gap-3 animate-fade-up delay-200">
          <div className="relative flex-1 min-w-[200px]">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search by ID, hash, actor..."
              className="form-input-glass w-full rounded-lg py-2 pl-9 pr-3 text-sm"
            />
          </div>
          <select className="form-input-glass rounded-lg py-2 px-3 text-sm min-w-[160px]">
            <option value="">All Types</option>
            <option value="TRAVEL_INTENT">Travel Intent</option>
            <option value="HOTEL_OFFER">Hotel Offer</option>
            <option value="COUNTER_PROPOSAL">Counter Proposal</option>
            <option value="CONFIRMATION">Confirmation</option>
            <option value="ESCALATION">Escalation</option>
          </select>
          <input type="date" className="form-input-glass rounded-lg py-2 px-3 text-sm" />
          <span className="text-slate-500">to</span>
          <input type="date" className="form-input-glass rounded-lg py-2 px-3 text-sm" />
        </div>

        {/* Audit Table */}
        <div className="glass-panel rounded-2xl overflow-hidden animate-fade-up delay-300">
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
                      <span className="font-mono text-xs text-slate-300">{entry.id}</span>
                    </td>
                    <td>
                      <span className="font-mono text-emerald text-sm">{entry.negotiationId}</span>
                    </td>
                    <td>
                      <span className="text-xs text-slate-400 font-mono">
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
                        className="font-mono text-xs text-slate-500 cursor-help"
                        title={`Full hash: ${entry.hash}`}
                      >
                        {entry.hash}
                      </span>
                    </td>
                    <td className="text-sm text-slate-300">{entry.actor}</td>
                    <td className="text-sm text-white">{entry.property}</td>
                    <td className="text-sm text-slate-300">{entry.corporate}</td>
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
      </main>
    </>
  );
}
