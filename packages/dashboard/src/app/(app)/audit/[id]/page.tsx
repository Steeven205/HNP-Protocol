import Link from "next/link";
import { auditEntries } from "@/lib/mock-data";

/** Static detail data matching audit entry aud-1 (BKG-8923-SC). */
const detail = {
  ref: "BKG-8923-SC",
  corporateEntity: "TechCorp SAS",
  corporateId: "TC-2026-001",
  hotelProperty: "Le Marais Boutique Hotel",
  hotelId: "LMBH-PARIS-001",
  traveler: "Sophie Chen (CTO)",
  dates: "May 8 \u2013 May 10, 2026 (2 nights)",
  negotiationId: "NEG-8923",
  agentsCorporate: "Claude Corporate Agent v1.0",
  agentsHotel: "MCP Hotel Agent v1.0",
  roomCategory: "Standard",
  inclusions: ["WiFi", "Late checkout 12h", "Breakfast J1"],
  cancellation: "24h free cancellation",
  auditHash:
    "8f2a4b6c9d1e3f5a7b8c0d2e4f6a8b0c3d5e7f9a1b3c5d7e9f0a2b4c6d8e0f3b9c",
  hashValid: true,
  finalRate: 132,
  publicRate: 145,
  nights: 2,
  totalSavings: 48,
  savingsPct: 26.7,
  rounds: 2,
  durationS: 18.4,
  humanIntervention: "None",
};

export default async function AuditDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  /* Resolve the entry (fallback to first if unknown). */
  const entry = auditEntries.find((e) => e.id === id) ?? auditEntries[0];
  const ref = entry?.ref ?? detail.ref;

  const total = detail.finalRate * detail.nights;

  return (
    <div>
      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link
          href="/audit"
          className="hover:text-navy-600 transition-colors"
        >
          Audit Trail
        </Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
        <span className="font-medium text-slate-900">{ref}</span>
      </nav>

      {/* ── Verified badge ────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-8">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600">
          <i className="fa-solid fa-check text-xs" />
        </span>
        <span className="text-sm font-medium text-green-700">
          Verified Transaction
        </span>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────────── */}
      <div className="flex gap-8">
        {/* Left column */}
        <div className="flex-1 space-y-8">
          {/* Core Transaction Details */}
          <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
              Core Transaction Details
            </h2>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-5 text-sm">
              <div>
                <dt className="text-slate-500">Corporate Entity</dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {detail.corporateEntity}
                  <span className="ml-2 text-xs text-slate-400">
                    {detail.corporateId}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Hotel Property</dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {detail.hotelProperty}
                  <span className="ml-2 text-xs text-slate-400">
                    {detail.hotelId}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Traveler</dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {detail.traveler}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Dates</dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {detail.dates}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Negotiation Thread</dt>
                <dd className="mt-0.5">
                  <Link
                    href={`/negotiations/${detail.negotiationId}`}
                    className="font-medium text-navy-600 hover:underline"
                  >
                    {detail.negotiationId}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Agents Involved</dt>
                <dd className="mt-0.5 text-slate-900">
                  <p className="font-medium">{detail.agentsCorporate}</p>
                  <p className="font-medium">{detail.agentsHotel}</p>
                </dd>
              </div>
            </dl>
          </section>

          {/* Final Negotiated Terms */}
          <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
              Final Negotiated Terms
            </h2>

            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-slate-500 mb-2">Room Category</p>
                <p className="font-medium text-slate-900">
                  {detail.roomCategory}
                </p>
              </div>
              <div>
                <p className="text-slate-500 mb-2">Inclusions</p>
                <ul className="space-y-1">
                  {detail.inclusions.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-900">
                      <i className="fa-solid fa-check text-green-500 text-[10px]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-slate-500 mb-2">Cancellation</p>
                <p className="font-medium text-slate-900">
                  {detail.cancellation}
                </p>
              </div>
            </div>
          </section>

          {/* Audit Hash */}
          <section className="bg-slate-900 text-white rounded-[16px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                Transaction Audit Hash
              </h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-1 text-xs font-medium text-green-400">
                <i className="fa-solid fa-circle-check text-[10px]" />
                Valid
              </span>
            </div>

            <div className="flex items-center gap-3">
              <code className="flex-1 break-all font-mono text-sm leading-relaxed text-slate-200">
                {detail.auditHash}
              </code>
              <button
                type="button"
                title="Copy hash"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <i className="fa-regular fa-copy text-sm" />
              </button>
            </div>
          </section>
        </div>

        {/* Right column (w-80) */}
        <div className="w-80 shrink-0 space-y-6">
          {/* Financial Impact */}
          <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
              Financial Impact
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Final Rate</span>
                <span className="font-semibold text-slate-900">
                  {detail.finalRate}&nbsp;&euro;/night
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Public Rate</span>
                <span className="text-slate-400 line-through">
                  {detail.publicRate}&nbsp;&euro;/night
                </span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-slate-500">
                  Total ({detail.nights} nights)
                </span>
                <span className="font-semibold text-slate-900">
                  {total}&nbsp;&euro;
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-green-50 border border-green-200 p-4 text-center">
              <p className="text-xs text-green-600 mb-1">Total Savings</p>
              <p className="text-xl font-bold text-green-700">
                {detail.totalSavings}&nbsp;&euro;
                <span className="ml-1 text-sm font-medium">
                  ({detail.savingsPct}%)
                </span>
              </p>
            </div>
          </section>

          {/* Negotiation Efficiency */}
          <section className="bg-white rounded-[16px] border border-slate-200 shadow-soft p-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
              Negotiation Efficiency
            </h2>

            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Rounds</dt>
                <dd className="font-medium text-slate-900">{detail.rounds}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Duration</dt>
                <dd className="font-medium text-slate-900">
                  {detail.durationS}s
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Human Intervention</dt>
                <dd className="font-medium text-slate-900">
                  {detail.humanIntervention}
                </dd>
              </div>
            </dl>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-soft"
            >
              <i className="fa-solid fa-print text-xs" />
              Print Record
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-700 transition-colors shadow-soft"
            >
              <i className="fa-solid fa-file-pdf text-xs" />
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
