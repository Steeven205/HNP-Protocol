"use client";

import { useState } from "react";

export default function CorporateBillingPage() {
  const [showPricing, setShowPricing] = useState(false);

  const planFeatures = [
    { icon: "fa-users", title: "Up to 200 Travelers", desc: "Manage travel for your growing team" },
    { icon: "fa-layer-group", title: "5 Hotel Offers per Booking", desc: "Compare multiple negotiated rates" },
    { icon: "fa-clock", title: "60min Decision Timeout", desc: "Extended time to review and choose" },
    { icon: "fa-headset", title: "Priority Support", desc: "Dedicated support via email & chat" },
    { icon: "fa-ghost", title: "Shadow Mode Included", desc: "Track savings without disrupting workflows" },
    { icon: "fa-code", title: "API Access", desc: "Full REST API for custom integrations" },
  ];

  const usageMetrics = [
    { label: "Bookings This Month", value: "87", icon: "fa-calendar-check", color: "text-emerald-600" },
    { label: "Total Spend", value: "€47,820", icon: "fa-euro-sign", color: "text-[#111827]" },
    { label: "Platform Fee", value: "1.5%", icon: "fa-percent", color: "text-[#111827]" },
    { label: "Savings Generated", value: "€12,450", icon: "fa-piggy-bank", color: "text-emerald-600" },
  ];

  const invoices = [
    { date: "April 1, 2026", id: "INV-CORP-2026-004", amount: "€499", status: "Paid" },
    { date: "March 1, 2026", id: "INV-CORP-2026-003", amount: "€499", status: "Paid" },
    { date: "February 1, 2026", id: "INV-CORP-2026-002", amount: "€499", status: "Paid" },
    { date: "January 1, 2026", id: "INV-CORP-2026-001", amount: "€499", status: "Paid" },
  ];

  const pricingRows = [
    { feature: "Travelers", starter: "50", business: "200", enterprise: "Unlimited" },
    { feature: "Hotel Offers per Booking", starter: "3", business: "5", enterprise: "10" },
    { feature: "Decision Timeout", starter: "30 min", business: "60 min", enterprise: "2 hours" },
    { feature: "Shadow Mode", starter: true, business: true, enterprise: true },
    { feature: "API Access", starter: false, business: true, enterprise: true },
    { feature: "Auto-confirm Mode", starter: false, business: false, enterprise: true },
    { feature: "Priority Support", starter: false, business: true, enterprise: true },
    { feature: "Custom Integrations", starter: false, business: false, enterprise: true },
    { feature: "SSO / SAML", starter: false, business: false, enterprise: true },
    { feature: "Dedicated Account Manager", starter: false, business: false, enterprise: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E5E7EB] bg-emerald-50/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-[#111827]">Business Plan</h3>
                  <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
                    <i className="fa-solid fa-star" /> Current Plan
                  </span>
                </div>
                <p className="text-[#374151] text-sm">Optimized for mid-size corporate travel teams</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600">€499</div>
                <div className="text-xs text-[#6B7280]">/month</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {planFeatures.map((f) => (
                <div key={f.title} className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <i className={`fa-solid ${f.icon} text-emerald-600`} />
                    </div>
                    <span className="text-sm font-medium text-[#111827]">{f.title}</span>
                  </div>
                  <p className="text-xs text-[#6B7280]">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E5E7EB] pt-4 mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[#6B7280]">Next billing date:</span>
                <span className="text-[#111827] font-medium">May 1, 2026</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Payment method:</span>
                <div className="flex items-center gap-2">
                  <i className="fa-brands fa-cc-visa text-xl text-[#6B7280]" />
                  <span className="text-[#111827] font-mono">&bull;&bull;&bull;&bull; 4242</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
                <i className="fa-solid fa-arrow-up" /> Upgrade to Enterprise
              </button>
              <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-6 py-2.5 rounded-lg text-sm font-medium">
                Change Plan
              </button>
              <button className="bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 px-6 py-2.5 rounded-lg text-sm font-medium">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Usage This Month */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-chart-bar text-emerald-600 text-lg" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111827] mb-1">Usage This Month</h3>
              <p className="text-xs text-[#6B7280]">April 2026</p>
            </div>
          </div>

          <div className="space-y-4">
            {usageMetrics.map((m) => (
              <div key={m.label} className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <i className={`fa-solid ${m.icon} text-emerald-500 text-sm`} />
                    <span className="text-sm text-[#374151]">{m.label}</span>
                  </div>
                  <span className={`text-xl font-bold ${m.color}`}>{m.value}</span>
                </div>
              </div>
            ))}

            <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#111827]">Savings Rate</span>
                <span className="text-3xl font-bold text-emerald-600">26%</span>
              </div>
              <p className="text-xs text-emerald-700">€12,450 saved vs. standard rack rates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Comparison */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between cursor-pointer" onClick={() => setShowPricing(!showPricing)}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <i className="fa-solid fa-layer-group text-emerald-600 text-lg" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111827]">Pricing Plans Comparison</h3>
              <p className="text-xs text-[#6B7280]">Compare features across all corporate plans</p>
            </div>
          </div>
          <i className={`fa-solid fa-chevron-down text-[#6B7280] text-lg transition-transform ${showPricing ? "rotate-180" : ""}`} />
        </div>

        {showPricing && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB]">Feature</th>
                  <th className="text-center p-4 border-b border-[#E5E7EB]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold text-[#6B7280] uppercase">Starter</span>
                      <span className="text-lg font-bold text-[#111827]">€199</span>
                      <span className="text-xs text-[#6B7280]">/month</span>
                    </div>
                  </th>
                  <th className="text-center p-4 border-b border-[#E5E7EB] bg-emerald-50 border-l-2 border-r-2 border-l-emerald-500 border-r-emerald-500">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold text-emerald-600 uppercase">Business</span>
                      <span className="text-lg font-bold text-[#111827]">€499</span>
                      <span className="text-xs text-[#6B7280]">/month</span>
                      <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] px-2 py-0.5 rounded-full mt-1">Current</span>
                    </div>
                  </th>
                  <th className="text-center p-4 border-b border-[#E5E7EB]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold text-[#6B7280] uppercase">Enterprise</span>
                      <span className="text-lg font-bold text-[#111827]">€999</span>
                      <span className="text-xs text-[#6B7280]">/month</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.feature} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB]">
                    <td className="p-4 text-sm text-[#111827] font-medium">{row.feature}</td>
                    <td className="p-4 text-center text-sm text-[#374151]">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? <i className="fa-solid fa-check text-emerald-500" /> : <i className="fa-solid fa-xmark text-red-400" />
                      ) : row.starter}
                    </td>
                    <td className="p-4 text-center text-sm text-emerald-600 bg-emerald-50/50 border-l-2 border-r-2 border-l-emerald-500 border-r-emerald-500">
                      {typeof row.business === "boolean" ? (
                        row.business ? <i className="fa-solid fa-check text-emerald-500" /> : <i className="fa-solid fa-xmark text-red-400" />
                      ) : row.business}
                    </td>
                    <td className="p-4 text-center text-sm text-[#374151]">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? <i className="fa-solid fa-check text-emerald-500" /> : <i className="fa-solid fa-xmark text-red-400" />
                      ) : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <i className="fa-solid fa-file-invoice text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827]">Invoice History</h3>
            <p className="text-xs text-[#6B7280]">Download past invoices</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full data-table text-left border-collapse">
            <thead>
              <tr>
                <th className="pl-6 pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Date</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Invoice #</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Amount</th>
                <th className="pt-4 pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="pr-6 pt-4 pb-3 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                  <td className="pl-6 py-4 text-sm text-[#111827]">{inv.date}</td>
                  <td className="py-4 font-mono text-sm text-[#6B7280]">{inv.id}</td>
                  <td className="py-4 text-lg font-bold text-[#111827]">{inv.amount}</td>
                  <td className="py-4">
                    <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
                      <i className="fa-solid fa-check" /> {inv.status}
                    </span>
                  </td>
                  <td className="pr-6 py-4 text-right">
                    <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-4 py-1.5 rounded text-xs flex items-center gap-2 ml-auto">
                      <i className="fa-solid fa-download" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[#E5E7EB] text-sm text-[#6B7280] bg-[#F9FAFB]">
          Showing 1-4 of 4 invoices
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-credit-card text-emerald-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827] mb-1">Payment Method</h3>
            <p className="text-xs text-[#6B7280]">Manage your payment details</p>
          </div>
        </div>
        <div className="bg-[#F9FAFB] rounded-lg p-6 border border-[#E5E7EB] mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center border border-[#E5E7EB]">
                <i className="fa-brands fa-cc-visa text-3xl text-[#6B7280]" />
              </div>
              <div>
                <div className="text-[#111827] font-medium mb-1">Visa ending in 4242</div>
                <div className="text-sm text-[#6B7280]">Expires 12/2028</div>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
              <i className="fa-solid fa-check" /> Active
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-4">
            <i className="fa-solid fa-shield-halved text-emerald-500" />
            <span>Your payment information is encrypted and secure</span>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
            <i className="fa-solid fa-credit-card" /> Update Card
          </button>
        </div>
      </div>
    </div>
  );
}
