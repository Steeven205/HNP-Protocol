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
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Billing & Subscription</h1>
          <p className="text-[#717171] mt-1">Manage your plan and invoices</p>
        </div>
        <span className="text-sm text-[#717171] font-mono">
          Next billing: {billing.nextBilling}
        </span>
      </div>

      <div className="space-y-8">
        {/* Current Plan Card */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center">
                <i className="fa-solid fa-crown text-emerald text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-[#222]">{billing.plan} Plan</h2>
                  <span className="badge badge-emerald">Active</span>
                </div>
                <p className="text-sm text-[#717171] mt-1">
                  Full access to AI negotiation engine, audit trail, and analytics
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-[#222] font-mono">
                <span className="text-emerald">{billing.monthlyFee}</span>
                <span className="text-sm text-[#717171] ml-1">/month</span>
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
              <div key={f.label} className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171]">{f.label}</p>
                <p className="text-sm text-[#222] font-medium mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage This Month */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h2 className="text-lg font-semibold text-[#222] mb-4">
            <i className="fa-solid fa-chart-bar text-emerald mr-2" />
            Usage This Month
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
              <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Negotiations</p>
              <p className="text-3xl font-semibold text-[#222] font-mono mt-2">
                {billing.usageThisMonth.negotiations}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
              <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Confirmed Bookings</p>
              <p className="text-3xl font-semibold text-[#222] font-mono mt-2">
                {billing.usageThisMonth.confirmedBookings}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
              <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">Total Revenue</p>
              <p className="text-3xl font-semibold text-[#222] font-mono mt-2">
                {billing.usageThisMonth.totalRevenue.toLocaleString("fr-FR")}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow">
              <p className="text-xs font-medium text-[#717171] uppercase tracking-wide">
                Platform Fee ({billing.usageThisMonth.feePct}%)
              </p>
              <p className="text-3xl font-semibold text-emerald font-mono mt-2">
                {billing.usageThisMonth.platformFee.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EBEBEB]">
            <h2 className="text-lg font-semibold text-[#222]">
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
                    <td className="text-[#222]">
                      {new Date(inv.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="font-mono text-[#222] font-semibold">
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
      </div>
    </div>
  );
}
