"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { KpiCard } from "@/components/kpi-card";
import {
  auditEntries as mockAuditEntries,
  auditMetrics as mockAuditMetrics,
  type AuditEntry,
} from "@/lib/mock-data";
import { supabase } from "@/lib/supabase";

function truncateHash(hash: string): string {
  return hash.slice(0, 12) + "\u2026";
}

interface AuditMetrics {
  totalTransactions: number;
  totalSavingsEur: number;
  avgNegotiationTime: number;
  policyCompliance: number;
}

function computeMetrics(entries: AuditEntry[]): AuditMetrics {
  if (entries.length === 0) return mockAuditMetrics;

  const totalTransactions = entries.length;
  const totalSavingsEur = entries.reduce((sum, e) => sum + (e.savings ?? 0), 0);
  // avg negotiation time: not available in audit_entries rows, use mock fallback
  const avgNegotiationTime = mockAuditMetrics.avgNegotiationTime;
  // compliance: count entries with savings >= 0 (i.e. final_rate <= budget)
  const compliant = entries.filter((e) => e.savings >= 0).length;
  const policyCompliance =
    totalTransactions > 0
      ? Math.round((compliant / totalTransactions) * 1000) / 10
      : 100;

  return { totalTransactions, totalSavingsEur, avgNegotiationTime, policyCompliance };
}

export default function AuditPage() {
  const [entries, setEntries] = useState<AuditEntry[]>(mockAuditEntries);
  const [metrics, setMetrics] = useState<AuditMetrics>(mockAuditMetrics);
  const [loading, setLoading] = useState(true);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  /* ── Fetch from Supabase on mount ───────────────────────────────────── */
  useEffect(() => {
    async function fetchAudit() {
      try {
        const { data, error } = await supabase
          .from("audit_entries")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (error || !data || data.length === 0) {
          // Fallback to mock data — already set as initial state
          return;
        }

        // Map Supabase rows to AuditEntry shape
        const mapped: AuditEntry[] = data.map((row) => ({
          id: row.id ?? row.audit_id ?? "",
          ref: row.ref ?? row.booking_ref ?? "",
          date: row.date ?? (row.created_at ? row.created_at.slice(0, 10) : ""),
          account: row.account ?? row.corporate_name ?? "",
          hotel: row.hotel ?? row.hotel_name ?? "",
          location: row.location ?? row.city ?? "",
          final_rate: row.final_rate ?? 0,
          currency: row.currency ?? "EUR",
          savings: row.savings ?? 0,
          audit_hash: row.audit_hash ?? "",
          negotiation_id: row.negotiation_id ?? "",
        }));

        setEntries(mapped);
        setMetrics(computeMetrics(mapped));
      } finally {
        setLoading(false);
      }
    }

    fetchAudit();
  }, []);

  /* ── Copy hash to clipboard ─────────────────────────────────────────── */
  const copyHash = useCallback((hash: string) => {
    navigator.clipboard.writeText(hash).then(() => {
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(null), 1500);
    });
  }, []);

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Audit Trail</h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <i className="fa-solid fa-file-export text-xs" />
          Export
        </button>
      </div>

      {/* ── KPI Row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Total Transactions"
          value={metrics.totalTransactions.toString()}
          icon="fa-solid fa-receipt"
          trend="+12 this month"
          trendUp
        />
        <KpiCard
          title="Total Savings YTD"
          value={`${metrics.totalSavingsEur.toLocaleString("fr-FR")}\u00A0\u20AC`}
          icon="fa-solid fa-piggy-bank"
          trend="+18% vs last quarter"
          trendUp
        />
        <KpiCard
          title="Avg. Negotiation Time"
          value={`${metrics.avgNegotiationTime}s`}
          icon="fa-solid fa-clock"
          trend="-2.1s vs last month"
          trendUp
        />
        <KpiCard
          title="Policy Compliance"
          value={`${metrics.policyCompliance}%`}
          icon="fa-solid fa-shield-halved"
          trend="Above 95% target"
          trendUp
        />
      </div>

      {/* ── Filter Bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by ref, hotel, account..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors"
          />
        </div>

        <div className="relative">
          <select className="appearance-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 pr-9 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
          <i className="fa-solid fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />
        </div>

        <div className="relative">
          <select className="appearance-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 pr-9 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors cursor-pointer">
            <option>All Accounts</option>
            <option>TechCorp SAS</option>
          </select>
          <i className="fa-solid fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />
        </div>

        <div className="relative">
          <select className="appearance-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 pr-9 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 focus:border-navy-600 transition-colors cursor-pointer">
            <option>All Destinations</option>
            <option>Paris</option>
            <option>Lyon</option>
            <option>Bordeaux</option>
          </select>
          <i className="fa-solid fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />
        </div>

        <button
          type="button"
          className="text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors whitespace-nowrap"
        >
          Clear Filters
        </button>
      </div>

      {/* ── Data Table ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Ref / Date
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Account
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Hotel &amp; Location
              </th>
              <th className="px-6 py-3.5 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
                Final Rate
              </th>
              <th className="px-6 py-3.5 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
                Savings
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Audit Hash
              </th>
              <th className="px-6 py-3.5 text-center text-xs font-medium uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                {/* Ref / Date */}
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{entry.ref}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{entry.date}</p>
                </td>

                {/* Account */}
                <td className="px-6 py-4 text-slate-700">{entry.account}</td>

                {/* Hotel & Location */}
                <td className="px-6 py-4">
                  <p className="text-slate-900">{entry.hotel}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {entry.location}
                  </p>
                </td>

                {/* Final Rate */}
                <td className="px-6 py-4 text-right font-medium text-slate-900">
                  {entry.final_rate}&nbsp;&euro;
                </td>

                {/* Savings */}
                <td className="px-6 py-4 text-right font-medium text-green-600">
                  +{entry.savings}&nbsp;&euro;
                </td>

                {/* Audit Hash */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5">
                    <code className="font-mono text-xs bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700">
                      {truncateHash(entry.audit_hash)}
                    </code>
                    <button
                      type="button"
                      title={copiedHash === entry.audit_hash ? "Copied!" : "Copy hash"}
                      onClick={() => copyHash(entry.audit_hash)}
                      className="text-slate-400 hover:text-navy-600 transition-colors"
                    >
                      <i
                        className={
                          copiedHash === entry.audit_hash
                            ? "fa-solid fa-check text-xs text-green-600"
                            : "fa-regular fa-copy text-xs"
                        }
                      />
                    </button>
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-center">
                  <Link
                    href={`/audit/${entry.id}`}
                    className="text-sm font-medium text-navy-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
