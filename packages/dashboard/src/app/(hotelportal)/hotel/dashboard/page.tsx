"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Hotel {
  id: string;
  hotel_id: string;
  name: string;
  city: string | null;
  stars: number;
  rooms_count: number | null;
  base_rate_standard: number | null;
  rating_google: number | null;
  esg_tier: string | null;
  status: string | null;
}

export default function HotelDashboardPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const hotelsRes = await supabase.from("hotels").select("*").eq("status", "active");
      if (hotelsRes.data) setHotels(hotelsRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 animate-pulse">
              <div className="h-3 bg-[#F3F4F6] rounded w-1/2 mb-3" />
              <div className="h-8 bg-[#F3F4F6] rounded w-2/3 mb-3" />
              <div className="h-3 bg-[#F3F4F6] rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* RevPAR */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">RevPAR Reseau</span>
            <i className="fa-solid fa-arrow-trend-up text-emerald-500" />
          </div>
          <div className="text-4xl font-bold text-[#111827] mb-2">€142.50</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-600 font-medium"><i className="fa-solid fa-arrow-up mr-1" />8.3%</span>
            <span className="text-[#6B7280]">vs LY</span>
          </div>
        </div>

        {/* Occupancy */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">Taux d&apos;Occupation Global</span>
            <i className="fa-solid fa-bed text-emerald-500" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-[#111827] mb-2">78.2%</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-emerald-600 font-medium"><i className="fa-solid fa-arrow-up mr-1" />4.1%</span>
                <span className="text-[#6B7280]">vs LY</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "conic-gradient(#10B981 78%, #E5E7EB 0)" }}>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-xs font-bold text-[#111827]">78%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ADR */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">ADR Moyen</span>
            <i className="fa-solid fa-tag text-emerald-500" />
          </div>
          <div className="text-4xl font-bold text-[#111827] mb-2">€182.30</div>
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-medium"><i className="fa-solid fa-arrow-up mr-1" />3.9%</span>
              <span className="text-[#6B7280]">vs LY</span>
            </div>
            <div className="text-[#6B7280] text-xs">vs Budget: <span className="text-emerald-600">+2.1%</span></div>
          </div>
        </div>

        {/* Corporate Revenue - amber warning */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 border-t-4 border-t-amber-500 bg-amber-50/30">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-amber-600 uppercase tracking-wider font-semibold">Revenue Corporate</span>
            <i className="fa-solid fa-triangle-exclamation text-amber-500" />
          </div>
          <div className="text-4xl font-bold text-[#111827] mb-2">€156.80</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-amber-600 font-medium"><i className="fa-solid fa-arrow-down mr-1" />2.1%</span>
            <span className="text-[#6B7280]">vs Budget</span>
          </div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
          <h2 className="text-xl font-bold text-[#111827]">Evolution Revenus (30 derniers jours)</h2>
          <span className="text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer">Voir details &rarr;</span>
        </div>
        <div className="p-6">
          <div className="w-full h-[300px] flex items-end justify-around gap-4 px-4">
            {[120, 135, 125, 145].map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-emerald-100 rounded-t" style={{ height: `${(v / 150) * 250}px` }}>
                  <div className="w-full bg-emerald-500 rounded-t opacity-80" style={{ height: "100%" }} />
                </div>
                <span className="text-xs text-[#6B7280]">S{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column: Performance Table + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
            <h2 className="text-xl font-bold text-[#111827]">Performance par Etablissement</h2>
            <span className="text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer">Rapport complet &rarr;</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full data-table text-left border-collapse whitespace-nowrap">
              <thead>
                <tr>
                  <th className="pl-6 pt-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Etablissement</th>
                  <th className="pt-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Occupancy</th>
                  <th className="pt-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">ADR</th>
                  <th className="pt-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">RevPAR</th>
                  <th className="pr-6 pt-4 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">vs Budget</th>
                </tr>
              </thead>
              <tbody>
                <tr className="cursor-pointer hover:bg-[#F9FAFB] transition-colors border-b border-[#F3F4F6]">
                  <td className="pl-6 py-4">
                    <div className="font-medium text-[#111827]">Le Marais Boutique</div>
                    <div className="text-xs text-[#6B7280]">Paris 3eme, 70 ch</div>
                  </td>
                  <td className="py-4">
                    <div className="text-[#111827] font-medium">82% <span className="text-emerald-600 text-xs ml-1">&uarr;5%</span></div>
                  </td>
                  <td className="py-4 text-[#111827]">€195 <span className="text-emerald-600 text-xs ml-1">&uarr;3%</span></td>
                  <td className="py-4 text-lg text-[#111827]">€159.90</td>
                  <td className="pr-6 py-4 text-right text-emerald-600 font-medium">+8.2%</td>
                </tr>
                <tr className="cursor-pointer hover:bg-[#F9FAFB] transition-colors border-b border-[#F3F4F6]">
                  <td className="pl-6 py-4">
                    <div className="font-medium text-[#111827]">Brussels Central</div>
                    <div className="text-xs text-[#6B7280]">Bruxelles, 120 ch</div>
                  </td>
                  <td className="py-4">
                    <div className="text-[#111827] font-medium">76% <span className="text-emerald-600 text-xs ml-1">&uarr;2%</span></div>
                  </td>
                  <td className="py-4 text-[#111827]">€168 <span className="text-red-500 text-xs ml-1">&darr;1%</span></td>
                  <td className="py-4 text-lg text-[#111827]">€127.68</td>
                  <td className="pr-6 py-4 text-right text-emerald-600 font-medium">+3.1%</td>
                </tr>
                <tr className="cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                  <td className="pl-6 py-4">
                    <div className="font-medium text-[#111827]">Lyon Confluence</div>
                    <div className="text-xs text-[#6B7280]">Lyon 2eme, 95 ch</div>
                  </td>
                  <td className="py-4">
                    <div className="text-[#111827] font-medium">71% <span className="text-red-500 text-xs ml-1">&darr;3%</span></div>
                  </td>
                  <td className="py-4 text-[#111827]">€152 <span className="text-emerald-600 text-xs ml-1">&uarr;4%</span></td>
                  <td className="py-4 text-lg text-[#111827]">€107.92</td>
                  <td className="pr-6 py-4 text-right text-amber-600 font-medium">-2.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Gauge + Alerts */}
        <div className="space-y-6">
          {/* Gauge */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 flex flex-col items-center justify-center">
            <h3 className="text-sm font-medium text-[#6B7280] mb-4 w-full text-left">Taux d&apos;Occupation Reseau</h3>
            <div className="relative w-48 h-48 rounded-full flex items-center justify-center" style={{ background: "conic-gradient(#10B981 78%, #E5E7EB 0)" }}>
              <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-4xl text-[#111827] font-bold">78%</span>
                <span className="text-xs text-[#6B7280] mt-1">Occupe</span>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
            <h3 className="text-sm font-medium text-[#6B7280] mb-4">Alertes Actives (3)</h3>
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border-l-2 border-amber-500 rounded-r-lg text-sm text-[#374151]">
                <i className="fa-solid fa-triangle-exclamation text-amber-500 mr-2" />
                Paris Marais -- Corporate rate -12% vs BAR &rarr; ajuster yield
              </div>
              <div className="p-3 bg-amber-50 border-l-2 border-amber-500 rounded-r-lg text-sm text-[#374151]">
                <i className="fa-solid fa-triangle-exclamation text-amber-500 mr-2" />
                Lyon -- OCC 62% weekend prochain &rarr; activer promotions
              </div>
              <div className="p-3 bg-amber-50 border-l-2 border-amber-500 rounded-r-lg text-sm text-[#374151]">
                <i className="fa-solid fa-triangle-exclamation text-amber-500 mr-2" />
                Amsterdam -- 5 negociations escalated &rarr; review yield rules
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Segments, Booking Window, Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Distribution Segments */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
          <h3 className="text-sm font-medium text-[#6B7280] mb-6">Distribution Segments</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#111827]">Corporate</span>
                <span className="text-[#6B7280]">42%</span>
              </div>
              <div className="w-full bg-[#F3F4F6] rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "42%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#111827]">Leisure</span>
                <span className="text-[#6B7280]">35%</span>
              </div>
              <div className="w-full bg-[#F3F4F6] rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "35%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#111827]">Groups</span>
                <span className="text-[#6B7280]">18%</span>
              </div>
              <div className="w-full bg-[#F3F4F6] rounded-full h-1.5">
                <div className="bg-slate-400 h-1.5 rounded-full" style={{ width: "18%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Booking Window */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
          <h3 className="text-sm font-medium text-[#6B7280] mb-6">Booking Window Moyen</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#F3F4F6]">
              <span className="text-sm text-[#111827]">Corporate</span>
              <span className="text-sm font-medium text-emerald-600">14j</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#F3F4F6]">
              <span className="text-sm text-[#111827]">Leisure</span>
              <span className="text-sm font-medium text-[#374151]">28j</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#F3F4F6]">
              <span className="text-sm text-[#111827]">Groups</span>
              <span className="text-sm font-medium text-[#374151]">42j</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#111827]">Last Minute</span>
              <span className="text-sm font-medium text-amber-600">3j</span>
            </div>
          </div>
        </div>

        {/* Mix Canaux */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
          <h3 className="text-sm font-medium text-[#6B7280] mb-6">Mix Canaux</h3>
          <div className="space-y-4 mb-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#111827]">Direct</span>
                <span className="text-[#6B7280]">38%</span>
              </div>
              <div className="w-full bg-[#F3F4F6] rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "38%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#111827]">OTA</span>
                <span className="text-amber-600">31%</span>
              </div>
              <div className="w-full bg-[#F3F4F6] rounded-full h-1.5">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "31%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#111827]">Corporate RFP</span>
                <span className="text-[#6B7280]">24%</span>
              </div>
              <div className="w-full bg-[#F3F4F6] rounded-full h-1.5">
                <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: "24%" }} />
              </div>
            </div>
          </div>
          <div className="text-xs text-[#6B7280] bg-[#F9FAFB] p-2 rounded flex items-start gap-2">
            <i className="fa-solid fa-lightbulb text-amber-500 mt-0.5" />
            Commission OTA: €6,768 MTD
          </div>
        </div>
      </div>
    </div>
  );
}
