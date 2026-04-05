"use client";

import { billingData } from "@/lib/demo-data";

const statusColor: Record<string, string> = {
  paid: "badge-emerald",
  pending: "badge-amber",
  overdue: "badge-red",
};

export default function BillingPage() {
  const billing = billingData;

  return (
    <>
      {/* Header */}
      <header className="h-16 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Billing &amp; Subscription</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage your plan and invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 font-mono">
            Next billing: {billing.nextBilling}
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Current Plan Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 border-emerald/20 animate-fade-up">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center">
                <i className="fa-solid fa-crown text-emerald text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-xl font-bold text-slate-900">{billing.plan} Plan</h2>
                  <span className="badge badge-emerald">Active</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Full access to AI negotiation engine, audit trail, and analytics
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-slate-900 font-mono">
                <span className="text-emerald">{billing.monthlyFee}</span>
                <span className="text-sm text-slate-500 ml-1">/month</span>
              </p>
              <button className="btn-outline px-4 py-1.5 rounded-lg text-xs mt-2">
                <i className="fa-solid fa-arrow-up-right mr-1" />
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Plan features */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "AI Negotiations", value: "Unlimited" },
              { label: "Properties", value: "Up to 10" },
              { label: "Team Members", value: "Up to 10" },
              { label: "Audit Trail", value: "12 months" },
            ].map((f) => (
              <div key={f.label} className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">{f.label}</p>
                <p className="text-sm text-slate-900 font-medium mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage This Month */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 animate-fade-up delay-100">
          <h2 className="font-display text-lg font-semibold text-slate-900 mb-4">
            <i className="fa-solid fa-chart-bar text-emerald mr-2" />
            Usage This Month
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="fa-solid fa-handshake text-emerald text-sm" />
                <span className="text-xs text-slate-500">Negotiations</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 font-mono">
                {billing.usageThisMonth.negotiations}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="fa-solid fa-check-double text-emerald text-sm" />
                <span className="text-xs text-slate-500">Confirmed Bookings</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 font-mono">
                {billing.usageThisMonth.confirmedBookings}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="fa-solid fa-coins text-emerald text-sm" />
                <span className="text-xs text-slate-500">Total Revenue</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 font-mono">
                {billing.usageThisMonth.totalRevenue.toLocaleString("fr-FR")}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="fa-solid fa-receipt text-emerald text-sm" />
                <span className="text-xs text-slate-500">
                  Platform Fee ({billing.usageThisMonth.feePct}%)
                </span>
              </div>
              <p className="text-2xl font-bold text-emerald font-mono">
                {billing.usageThisMonth.platformFee.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden animate-fade-up delay-200">
          <div className="px-6 py-4 border-b border-[#E2E8F0]">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              <i className="fa-solid fa-file-invoice text-emerald mr-2" />
              Invoice History
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {billing.invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <span className="font-mono text-emerald text-sm">{inv.id}</span>
                    </td>
                    <td className="text-slate-900">
                      {new Date(inv.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="font-mono text-slate-900 font-bold">
                      {inv.amount.toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge ${statusColor[inv.status] || "badge-slate"}`}>
                        <i
                          className={`fa-solid ${
                            inv.status === "paid" ? "fa-check" : "fa-clock"
                          } text-[10px]`}
                        />
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-outline px-3 py-1.5 rounded-md text-xs">
                        <i className="fa-solid fa-download mr-1" />
                        PDF
                      </button>
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
