"use client";

import Link from "next/link";
import { negotiationDetail } from "@/lib/demo-data";

export default function NegotiationDetailPage() {
  const neg = negotiationDetail;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
        <Link href="/hotel/negotiations" className="hover:text-emerald-600 transition-colors">Negotiations</Link>
        <span>/</span>
        <span className="text-[#374151]">{neg.id}</span>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full lg:w-auto">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-[#111827]">{neg.id}</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-amber-100 text-amber-700 border-amber-200">
                <i className="fa-solid fa-hourglass-half" /> In Progress -- Round {neg.round}/{neg.maxRounds}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#374151]">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-hotel text-[#6B7280]" />
                <span>{neg.hotel}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-building text-[#6B7280]" />
                <span>{neg.corporate}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] text-emerald-700 font-bold">SM</div>
                <span>{neg.traveler}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto bg-[#F9FAFB] rounded-xl p-4 border border-[#E5E7EB]">
          <div>
            <div className="text-xs text-[#6B7280] mb-1 uppercase tracking-wider">Trip Details</div>
            <div className="text-sm text-[#111827] font-medium">12-15 May 2026 ({neg.nights} nights)</div>
            <div className="text-xs text-[#374151]">{neg.rooms}&times; {neg.roomType} rooms</div>
          </div>
          <div className="h-10 w-px bg-[#E5E7EB] hidden sm:block" />
          <div className="text-center sm:text-right w-full sm:w-auto">
            <div className="text-xs text-amber-600 mb-1 uppercase tracking-wider font-semibold">Offer expires in</div>
            <div className="font-mono text-2xl font-bold text-amber-600">18:42</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Chat + Actions */}
        <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
          {/* Timeline Panel */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm flex flex-col flex-1 min-h-[500px]">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
              <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
                <i className="fa-solid fa-comments text-emerald-500" /> AI-to-AI Transcript
              </h3>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* Corporate Message 1 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-200">
                  <i className="fa-solid fa-robot text-blue-600 text-sm" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-[#374151]">Corporate Agent</span>
                    <span className="text-xs text-[#6B7280]">14:30:12</span>
                    <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] px-2 py-0.5 rounded-full ml-2">TRAVEL_INTENT</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-sm text-[#374151] leading-relaxed max-w-2xl">
                    3&times; Superior rooms, 12-15 May 2026. Budget: €160/night max. Requirements: breakfast included, 24h free cancellation.
                  </div>
                </div>
              </div>

              {/* Hotel Message 2 */}
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                  <i className="fa-solid fa-bolt text-emerald-600 text-sm" />
                </div>
                <div className="flex-1 flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] px-2 py-0.5 rounded-full mr-2">HOTEL_OFFER</span>
                    <span className="text-xs text-[#6B7280]">14:30:45</span>
                    <span className="text-sm font-medium text-emerald-700">Hotel Agent</span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-sm text-[#374151] leading-relaxed max-w-2xl">
                    <div className="mb-3">
                      Offer: <span className="text-xl font-bold text-[#111827]">€152</span>/night per room
                    </div>
                    <ul className="space-y-1 mb-3">
                      <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500 text-xs" /> Breakfast included</li>
                      <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500 text-xs" /> Free WiFi</li>
                      <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500 text-xs" /> 24h free cancellation</li>
                    </ul>
                    <div className="text-xs text-emerald-700 bg-emerald-100 p-2 rounded border border-emerald-200 inline-block">
                      <i className="fa-solid fa-clock mr-1" /> Valid until 15:00
                    </div>
                  </div>
                </div>
              </div>

              {/* Corporate Counter */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-200">
                  <i className="fa-solid fa-robot text-blue-600 text-sm" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-[#374151]">Corporate Agent</span>
                    <span className="text-xs text-[#6B7280]">14:31:18</span>
                    <span className="bg-amber-100 text-amber-700 border border-amber-200 text-[10px] px-2 py-0.5 rounded-full ml-2">COUNTER_PROPOSAL</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-sm text-[#374151] leading-relaxed max-w-2xl">
                    Rate accepted (€152). Additional request: Late checkout until 14:00.<br /><br />
                    <span className="text-xs text-[#6B7280]">Justification: Gold loyalty tier (58 nights YTD with your group).</span>
                  </div>
                </div>
              </div>

              {/* Hotel Final Offer */}
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                  <i className="fa-solid fa-bolt text-emerald-600 text-sm" />
                </div>
                <div className="flex-1 flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] px-2 py-0.5 rounded-full mr-2">HOTEL_OFFER (Final)</span>
                    <span className="text-xs text-[#6B7280]">14:32:05</span>
                    <span className="text-sm font-medium text-emerald-700">Hotel Agent</span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-sm text-[#374151] leading-relaxed max-w-2xl">
                    <div className="mb-3">
                      Final offer: <span className="text-xl font-bold text-[#111827]">€152</span>/night
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-[#F3F4F6] rounded text-xs border border-[#E5E7EB]">+ Breakfast</span>
                      <span className="px-2 py-1 bg-[#F3F4F6] rounded text-xs border border-[#E5E7EB]">+ Late checkout 14:00</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                      <i className="fa-solid fa-circle-notch fa-spin" /> Awaiting Corporate Agent confirmation...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-4 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-sm">
                <i className="fa-solid fa-check mr-2" /> Accept Offer Immediately
              </button>
              <button className="border border-amber-300 text-amber-700 hover:bg-amber-50 px-6 py-2.5 rounded-lg text-sm font-medium">
                <i className="fa-solid fa-hand mr-2" /> Override &amp; Intervene Manually
              </button>
            </div>
            <button className="bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-lg text-sm font-medium">
              <i className="fa-solid fa-triangle-exclamation mr-2" /> Escalate to Human
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Yield Engine Reasoning */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <h3 className="text-lg font-bold text-[#111827]">Yield Engine Reasoning</h3>
            </div>
            <div className="p-4 space-y-2">
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                <div className="flex items-center gap-3 text-sm text-[#374151]">
                  <i className="fa-solid fa-chart-bar text-[#6B7280] w-4" />
                  <span>Occupancy Analysis</span>
                </div>
                <div className="mt-2 text-xs text-emerald-600 pl-7">68% projected &rarr; discount viable</div>
              </div>
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                <div className="flex items-center gap-3 text-sm text-[#374151]">
                  <i className="fa-solid fa-trophy text-amber-500 w-4" />
                  <span>Loyalty Signal</span>
                </div>
                <div className="mt-2 text-xs text-amber-600 pl-7">Gold tier, 58 nights YTD &rarr; strong leverage</div>
              </div>
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                <div className="flex items-center gap-3 text-sm text-[#374151]">
                  <i className="fa-solid fa-money-bill text-[#6B7280] w-4" />
                  <span>Cost Analysis</span>
                </div>
                <div className="mt-2 text-xs text-[#6B7280] pl-7">Late checkout cost: €0 (housekeeping buffer exists)</div>
              </div>
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                <span className="text-emerald-700 text-sm font-medium"><i className="fa-solid fa-check-circle mr-2" />Recommendation: Accept €152 + late checkout</span>
              </div>
            </div>
          </div>

          {/* Deal Value Analysis */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <h3 className="text-lg font-bold text-[#111827]">Deal Value Analysis</h3>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-end mb-4 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <div className="text-xs text-[#6B7280] mb-1">Total Value (3 nights)</div>
                  <div className="text-3xl font-bold text-[#111827]">€456</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#6B7280] mb-1">Rate</div>
                  <div className="text-lg text-[#374151]">€152/night</div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#6B7280]"><span>BAR rate (€185/night)</span><span>€555</span></div>
                <div className="flex justify-between text-emerald-600"><span>Corporate saves (17.8%)</span><span>-€99</span></div>
                <div className="h-px bg-[#E5E7EB] my-2" />
                <div className="flex justify-between text-[#6B7280]"><span>If sold via OTA (18% comm.)</span><span>Net €157/night</span></div>
                <div className="flex justify-between text-[#374151]"><span>OTA commission avoided</span><span>+€99</span></div>
                <div className="flex justify-between text-[#6B7280]"><span>Rateflow fee (3.5%)</span><span>-€16</span></div>
                <div className="flex justify-between font-medium text-emerald-600 pt-2 border-t border-[#E5E7EB]"><span>Net gain vs OTA</span><span>+€83</span></div>
              </div>
            </div>
          </div>

          {/* Corporate Profile */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            <div className="p-5 flex items-center gap-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <div className="w-12 h-12 rounded bg-[#F3F4F6] flex items-center justify-center border border-[#E5E7EB]">
                <i className="fa-solid fa-building text-xl text-[#6B7280]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111827]">TechCorp SAS</h3>
                <div className="text-xs text-amber-600 font-medium"><i className="fa-solid fa-trophy mr-1" /> Gold Tier</div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4 text-sm">
              <div><div className="text-xs text-[#6B7280] mb-1">Nights YTD</div><div className="font-medium text-[#111827]">58</div></div>
              <div><div className="text-xs text-[#6B7280] mb-1">Spend YTD</div><div className="font-medium text-[#111827]">€8,240</div></div>
              <div><div className="text-xs text-[#6B7280] mb-1">Avg Rate</div><div className="font-medium text-[#111827]">€142</div></div>
              <div><div className="text-xs text-[#6B7280] mb-1">Policy Max</div><div className="font-medium text-[#111827]">€180 (Paris)</div></div>
            </div>
          </div>

          {/* Audit Snippet */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]"><i className="fa-solid fa-shield-halved mr-2 text-emerald-500" />Cryptographic Audit</h4>
              <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] px-2 py-0.5 rounded-full">Verified</span>
            </div>
            <div className="font-mono text-[10px] text-[#6B7280] break-all bg-[#F9FAFB] p-2 rounded border border-[#E5E7EB]">
              Hash: d7b2e9c4f8a1...<br />
              Chain: Valid
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
