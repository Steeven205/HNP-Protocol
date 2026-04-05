"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type PersonaKey = "traveler" | "travel_manager" | "revenue_manager";

interface Persona {
  key: PersonaKey;
  label: string;
  icon: string;
  screens: DemoScreen[];
}

interface DemoScreen {
  title: string;
  content: React.ReactNode;
}

// ─── Browser Frame ──────────────────────────────────────────────────────────

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] border border-[#E2E6F0] bg-white shadow-card-lg overflow-hidden">
      {/* Browser toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#F6F7F9] border-b border-[#E2E6F0]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28CA42]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white rounded-md border border-[#E2E6F0] text-[11px] text-slate-400 px-4 py-1 font-mono">
            app.rateflow.ai
          </div>
        </div>
      </div>
      {/* Screen content */}
      <div className="min-h-[340px]">{children}</div>
    </div>
  );
}

// ─── Traveler Screens ───────────────────────────────────────────────────────

function TravelerScreen1() {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[340px]">
      <h3 className="font-display font-bold text-lg text-navy-800 mb-4">Book a Hotel</h3>
      <div className="w-full max-w-sm space-y-3">
        <div className="relative">
          <i className="fa-solid fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <div className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E2E6F0] bg-[#FAFBFF] text-sm text-slate-800">
            Paris
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <i className="fa-solid fa-calendar absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <div className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E2E6F0] bg-[#FAFBFF] text-sm text-slate-800">
              May 12
            </div>
          </div>
          <div className="relative">
            <i className="fa-solid fa-calendar-check absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <div className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E2E6F0] bg-[#FAFBFF] text-sm text-slate-800">
              May 15
            </div>
          </div>
        </div>
        <div className="w-full py-2.5 rounded-lg bg-navy-800 text-white text-sm font-semibold text-center">
          <i className="fa-solid fa-magnifying-glass mr-2" />
          Find Hotels
        </div>
      </div>
    </div>
  );
}

function TravelerScreen2() {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[340px]">
      <div className="relative w-14 h-14 mb-5">
        <div className="absolute inset-0 rounded-full border-[3px] border-slate-100" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-navy-800 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fa-solid fa-robot text-navy-800" />
        </div>
      </div>
      <h3 className="font-display font-bold text-lg text-navy-800 mb-2">AI is negotiating...</h3>
      <p className="text-sm text-slate-500 mb-5">Comparing rates across 5 hotels</p>
      <div className="flex flex-col gap-2 w-full max-w-xs">
        {["Checking availability", "Comparing rates", "Negotiating discounts"].map((s, i) => (
          <div key={i} className="flex items-center gap-2.5">
            {i < 2 ? (
              <i className="fa-solid fa-check text-green-500 text-[10px] w-4 text-center" />
            ) : (
              <div className="flex gap-0.5 w-4 justify-center">
                <span className="w-1 h-1 rounded-full bg-navy-800 typing-dot" />
                <span className="w-1 h-1 rounded-full bg-navy-800 typing-dot" />
                <span className="w-1 h-1 rounded-full bg-navy-800 typing-dot" />
              </div>
            )}
            <span className={`text-xs ${i < 2 ? "text-slate-400 line-through" : "text-slate-700 font-medium"}`}>
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TravelerScreen3() {
  const offers = [
    { name: "Bastille Inn", stars: 3, rate: 118, badge: "Best Price", badgeColor: "bg-green-500" },
    { name: "Le Marais Boutique", stars: 4, rate: 132, badge: "Recommended", badgeColor: "bg-navy-800" },
    { name: "Saint-Honore", stars: 4, rate: 145, badge: "Best Rated", badgeColor: "bg-amber-500" },
  ];

  return (
    <div className="p-5 min-h-[340px]">
      <div className="text-xs text-slate-500 mb-3 font-medium">3 offers for Paris &middot; May 12-15</div>
      <div className="grid grid-cols-3 gap-3">
        {offers.map((o) => (
          <div key={o.name} className="rounded-xl border border-[#E2E6F0] p-3 hover:border-navy-200 transition-colors">
            <span className={`inline-block ${o.badgeColor} text-white text-[8px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 mb-2`}>
              {o.badge}
            </span>
            <h4 className="text-xs font-bold text-slate-900 mb-1">{o.name}</h4>
            <div className="flex items-center gap-0.5 mb-2">
              {Array.from({ length: o.stars }).map((_, i) => (
                <i key={i} className="fa-solid fa-star text-amber-400 text-[7px]" />
              ))}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-navy-800">{o.rate}&euro;</span>
              <span className="text-[10px] text-slate-400">/night</span>
            </div>
            <div className="mt-2 w-full py-1.5 rounded-md bg-navy-800 text-white text-[10px] font-semibold text-center">
              Select
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TravelerScreen4() {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[340px]">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <i className="fa-solid fa-circle-check text-green-600 text-2xl" />
      </div>
      <h3 className="font-display font-bold text-lg text-green-800 mb-1">Booking Confirmed</h3>
      <p className="text-sm text-green-600 mb-5">Le Marais Boutique Hotel</p>
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 w-full max-w-xs">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-green-600 font-semibold mb-0.5">Rate</p>
            <p className="font-bold text-green-900">132&euro;/night</p>
          </div>
          <div>
            <p className="text-green-600 font-semibold mb-0.5">Total</p>
            <p className="font-bold text-green-900">396&euro;</p>
          </div>
          <div>
            <p className="text-green-600 font-semibold mb-0.5">Savings</p>
            <p className="font-bold text-green-700">26.7% below budget</p>
          </div>
          <div>
            <p className="text-green-600 font-semibold mb-0.5">Ref</p>
            <p className="font-bold text-green-900 font-mono text-[10px]">BK-LMBH-SC0512</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Travel Manager Screens ─────────────────────────────────────────────────

function ManagerScreen1() {
  const kpis = [
    { label: "Confirmed", value: "142", icon: "fa-circle-check", color: "text-green-600", bg: "bg-green-50" },
    { label: "Avg Savings", value: "18.4%", icon: "fa-piggy-bank", color: "text-navy-800", bg: "bg-navy-50" },
    { label: "In Progress", value: "7", icon: "fa-spinner", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Escalated", value: "2", icon: "fa-triangle-exclamation", color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="p-5 min-h-[340px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-sm text-navy-800">Travel Manager Dashboard</h3>
        <span className="text-[10px] text-slate-400">April 2026</span>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {kpis.map((k) => (
          <div key={k.label} className={`${k.bg} rounded-xl p-3 text-center`}>
            <i className={`fa-solid ${k.icon} ${k.color} text-sm mb-1.5`} />
            <div className={`text-lg font-extrabold ${k.color}`}>{k.value}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>
      {/* Mini table */}
      <div className="rounded-xl border border-[#E2E6F0] overflow-hidden">
        <div className="grid grid-cols-5 gap-0 text-[10px] font-semibold text-slate-500 bg-[#F6F7F9] px-3 py-2 border-b border-[#E2E6F0]">
          <span>Traveler</span><span>Destination</span><span>Hotel</span><span>Rate</span><span>Status</span>
        </div>
        {[
          { t: "S. Chen", d: "Paris", h: "Le Marais", r: "132\u20AC", s: "Confirmed", sc: "text-green-600" },
          { t: "P. Martin", d: "Lyon", h: "Confluences", r: "---", s: "Negotiating", sc: "text-amber-600" },
          { t: "J. Moreau", d: "Berlin", h: "Mitte Hotel", r: "98\u20AC", s: "Confirmed", sc: "text-green-600" },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-5 gap-0 text-[10px] px-3 py-2 border-b border-[#F0F2F7] last:border-0">
            <span className="font-medium text-slate-800">{row.t}</span>
            <span className="text-slate-600">{row.d}</span>
            <span className="text-slate-600">{row.h}</span>
            <span className="font-semibold text-slate-800">{row.r}</span>
            <span className={`font-semibold ${row.sc}`}>{row.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManagerScreen2() {
  const msgs = [
    { agent: "corporate", type: "TRAVEL_INTENT", text: "Booking request: Sophie Chen, Paris, May 12-15. Budget: 180\u20AC/night. Corporate ID: TC-2026-001." },
    { agent: "hotel", type: "HOTEL_OFFER", text: "Offer: 145\u20AC/night, Standard room. WiFi + late checkout. 24h cancellation. ESG Tier A." },
    { agent: "corporate", type: "COUNTER_PROPOSAL", text: "Counter: requesting 130\u20AC/night. Justification: 127 nights YTD, Gold loyalty tier." },
    { agent: "hotel", type: "HOTEL_OFFER", text: "Revised: 132\u20AC/night (-9%). Breakfast Day 1 included. Deal accepted." },
  ];

  return (
    <div className="p-5 min-h-[340px]">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
        <h3 className="font-display font-bold text-sm text-navy-800">Live Negotiation</h3>
        <span className="text-[10px] text-slate-400 ml-auto">NEG-8923</span>
      </div>
      <div className="flex flex-col gap-2">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-3 py-2 rounded-xl text-[11px] leading-relaxed ${
              m.agent === "corporate"
                ? "self-start bg-[rgba(0,0,122,0.05)] border border-[rgba(0,0,122,0.1)]"
                : "self-end bg-[rgba(135,206,250,0.12)] border border-[rgba(135,206,250,0.25)]"
            }`}
          >
            <div className={`text-[9px] font-bold tracking-[0.08em] mb-0.5 ${
              m.agent === "corporate" ? "text-navy-800" : "text-sky-dark"
            }`}>
              {m.type}
            </div>
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function ManagerScreen3() {
  const entries = [
    { ref: "BKG-8923-SC", hash: "8f2a4b...0f3b9c", rate: "132\u20AC", savings: "48\u20AC" },
    { ref: "BKG-8921-SC", hash: "3a7f2c...7b9c1d", rate: "116\u20AC", savings: "64\u20AC" },
    { ref: "BKG-8919-PM", hash: "5b9c1d...8c0d3e", rate: "140\u20AC", savings: "40\u20AC" },
  ];

  return (
    <div className="p-5 min-h-[340px]">
      <div className="flex items-center gap-2 mb-4">
        <i className="fa-solid fa-shield-halved text-navy-800 text-xs" />
        <h3 className="font-display font-bold text-sm text-navy-800">Audit Trail</h3>
      </div>
      <div className="rounded-xl border border-[#E2E6F0] overflow-hidden mb-4">
        <div className="grid grid-cols-4 gap-0 text-[10px] font-semibold text-slate-500 bg-[#F6F7F9] px-3 py-2 border-b border-[#E2E6F0]">
          <span>Booking Ref</span><span>SHA-256</span><span>Final Rate</span><span>Savings</span>
        </div>
        {entries.map((e, i) => (
          <div key={i} className="grid grid-cols-4 gap-0 text-[10px] px-3 py-2.5 border-b border-[#F0F2F7] last:border-0">
            <span className="font-semibold text-slate-800">{e.ref}</span>
            <span className="font-mono text-slate-500">{e.hash}</span>
            <span className="font-semibold text-slate-800">{e.rate}</span>
            <span className="font-semibold text-green-600">{e.savings}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] text-slate-500">
        <i className="fa-solid fa-lock text-green-500" />
        Every transaction is SHA-256 hashed and immutable
      </div>
    </div>
  );
}

function ManagerScreen4() {
  const months = ["Jan", "Feb", "Mar", "Apr"];
  const values = [2100, 3400, 5800, 9400];
  const maxVal = Math.max(...values);

  return (
    <div className="p-5 min-h-[340px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-sm text-navy-800">Shadow Mode Report</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Simulated savings vs. actual bookings</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
          <span className="text-xs font-bold text-green-700">+9,400&euro;</span>
          <span className="text-[10px] text-green-600 ml-1">saved this month</span>
        </div>
      </div>
      {/* Bar chart */}
      <div className="flex items-end gap-4 h-40 mb-3 px-2">
        {months.map((m, i) => (
          <div key={m} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-green-700">{(values[i] / 1000).toFixed(1)}k&euro;</span>
            <div className="w-full rounded-t-lg bg-gradient-to-t from-green-500 to-green-300 transition-all" style={{ height: `${(values[i] / maxVal) * 100}%` }} />
            <span className="text-[10px] text-slate-500">{m}</span>
          </div>
        ))}
      </div>
      <div className="bg-navy-50 rounded-xl p-3 flex items-center gap-3">
        <i className="fa-solid fa-lightbulb text-navy-800 text-sm" />
        <p className="text-[10px] text-slate-700">
          <span className="font-bold">Insight:</span> If live, you would have saved <span className="font-bold text-green-700">9,400&euro;</span> in April alone across 47 bookings.
        </p>
      </div>
    </div>
  );
}

// ─── Revenue Manager Screens ────────────────────────────────────────────────

function RevenueScreen1() {
  const requests = [
    { corp: "TechCorp SAS", dest: "Paris", dates: "May 12-15", rooms: 1, status: "New", sc: "text-blue-600 bg-blue-50" },
    { corp: "ConsultPro EU", dest: "Paris", dates: "May 14-16", rooms: 2, status: "Negotiating", sc: "text-amber-600 bg-amber-50" },
    { corp: "FinanceGrp Ltd", dest: "Paris", dates: "May 20-22", rooms: 1, status: "Confirmed", sc: "text-green-600 bg-green-50" },
  ];

  return (
    <div className="p-5 min-h-[340px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-sm text-navy-800">Incoming Requests</h3>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-navy-800 bg-navy-50 px-2 py-1 rounded-full">
          <i className="fa-solid fa-hotel text-[8px]" />
          Le Marais Boutique Hotel
        </span>
      </div>
      <div className="rounded-xl border border-[#E2E6F0] overflow-hidden">
        <div className="grid grid-cols-5 gap-0 text-[10px] font-semibold text-slate-500 bg-[#F6F7F9] px-3 py-2 border-b border-[#E2E6F0]">
          <span>Corporate</span><span>Destination</span><span>Dates</span><span>Rooms</span><span>Status</span>
        </div>
        {requests.map((r, i) => (
          <div key={i} className="grid grid-cols-5 gap-0 text-[10px] px-3 py-2.5 border-b border-[#F0F2F7] last:border-0 items-center">
            <span className="font-medium text-slate-800">{r.corp}</span>
            <span className="text-slate-600">{r.dest}</span>
            <span className="text-slate-600">{r.dates}</span>
            <span className="text-slate-800">{r.rooms}</span>
            <span className={`inline-block font-semibold text-[9px] px-2 py-0.5 rounded-full ${r.sc}`}>{r.status}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-[10px] text-slate-500">
        <span><i className="fa-solid fa-arrow-trend-up text-green-500 mr-1" />Occupancy: 74%</span>
        <span className="w-px h-3 bg-slate-200" />
        <span><i className="fa-solid fa-bed text-navy-600 mr-1" />Available tonight: 12 rooms</span>
      </div>
    </div>
  );
}

function RevenueScreen2() {
  return (
    <div className="p-5 min-h-[340px]">
      <div className="flex items-center gap-2 mb-5">
        <i className="fa-solid fa-sliders text-navy-800 text-xs" />
        <h3 className="font-display font-bold text-sm text-navy-800">Yield Configuration</h3>
      </div>

      <div className="space-y-5">
        {/* Floor rate slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700">Floor Rate (Standard)</span>
            <span className="text-xs font-bold text-navy-800">120&euro;</span>
          </div>
          <div className="relative h-2 bg-slate-100 rounded-full">
            <div className="absolute left-0 top-0 h-2 bg-navy-800 rounded-full" style={{ width: "55%" }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-navy-800 rounded-full shadow-sm" style={{ left: "calc(55% - 8px)" }} />
          </div>
          <div className="flex justify-between mt-1 text-[9px] text-slate-400">
            <span>80&euro;</span><span>250&euro;</span>
          </div>
        </div>

        {/* Volume discounts */}
        <div className="bg-[#FAFBFF] rounded-xl border border-[#E2E6F0] p-3">
          <span className="text-xs font-semibold text-slate-700 mb-2 block">Volume Discounts</span>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-500 mb-1 block">Threshold (nights/year)</label>
              <div className="bg-white rounded-lg border border-[#E2E6F0] px-3 py-1.5 text-xs font-semibold text-slate-800">50+</div>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 mb-1 block">Discount</label>
              <div className="bg-white rounded-lg border border-[#E2E6F0] px-3 py-1.5 text-xs font-semibold text-slate-800">12%</div>
            </div>
          </div>
        </div>

        {/* Auto inclusions */}
        <div>
          <span className="text-xs font-semibold text-slate-700 mb-2 block">Auto Inclusions</span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "WiFi", checked: true },
              { label: "Breakfast", checked: true },
              { label: "Late Checkout", checked: false },
              { label: "Parking", checked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-1.5 text-xs text-slate-700">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  item.checked ? "bg-navy-800 border-navy-800" : "border-slate-300 bg-white"
                }`}>
                  {item.checked && <i className="fa-solid fa-check text-white text-[7px]" />}
                </div>
                {item.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueScreen3() {
  const data = [
    { label: "Jan", rateflow: 42, ota: 58 },
    { label: "Feb", rateflow: 51, ota: 49 },
    { label: "Mar", rateflow: 63, ota: 37 },
    { label: "Apr", rateflow: 71, ota: 29 },
  ];

  return (
    <div className="p-5 min-h-[340px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-sm text-navy-800">Rateflow vs OTA Bookings</h3>
      </div>
      {/* Stacked bar chart */}
      <div className="flex items-end gap-4 h-36 mb-3 px-2">
        {data.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col rounded-t-lg overflow-hidden" style={{ height: "120px" }}>
              <div className="bg-slate-200 transition-all" style={{ height: `${d.ota}%` }} />
              <div className="bg-gradient-to-t from-navy-800 to-navy-600 transition-all" style={{ height: `${d.rateflow}%` }} />
            </div>
            <span className="text-[10px] text-slate-500">{d.label}</span>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 justify-center mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-navy-800" />
          <span className="text-[10px] text-slate-600">Rateflow (direct)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-200" />
          <span className="text-[10px] text-slate-600">OTA (commission-based)</span>
        </div>
      </div>
      <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2">
        <i className="fa-solid fa-arrow-trend-up text-green-600 text-sm" />
        <p className="text-[10px] text-green-800">
          <span className="font-bold">71%</span> of bookings now through Rateflow — up from 42% in January
        </p>
      </div>
    </div>
  );
}

function RevenueScreen4() {
  return (
    <div className="p-5 min-h-[340px] flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-sm text-navy-800">OTA Commission Savings</h3>
      </div>

      {/* Big number */}
      <div className="text-center mb-5">
        <div className="text-4xl font-display font-extrabold text-green-700 mb-1">4,200&euro;</div>
        <p className="text-xs text-slate-500">OTA commissions saved this month</p>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Rateflow bookings", value: "34", icon: "fa-handshake", bg: "bg-navy-50", color: "text-navy-800" },
          { label: "Avg commission saved", value: "15%", icon: "fa-percent", bg: "bg-green-50", color: "text-green-700" },
          { label: "Direct revenue", value: "82k\u20AC", icon: "fa-coins", bg: "bg-amber-50", color: "text-amber-700" },
        ].map((item) => (
          <div key={item.label} className={`${item.bg} rounded-xl p-3 text-center`}>
            <i className={`fa-solid ${item.icon} ${item.color} text-sm mb-1`} />
            <div className={`text-base font-extrabold ${item.color}`}>{item.value}</div>
            <div className="text-[9px] text-slate-500 mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-navy-50 rounded-xl p-3 flex items-center gap-3 mt-auto">
        <i className="fa-solid fa-lightbulb text-navy-800 text-sm" />
        <p className="text-[10px] text-slate-700">
          <span className="font-bold">No OTA markup.</span> Rateflow connects corporates directly. You keep 100% of the rate.
        </p>
      </div>
    </div>
  );
}

// ─── Persona Data ───────────────────────────────────────────────────────────

const personas: Persona[] = [
  {
    key: "traveler",
    label: "I'm a Traveler",
    icon: "fa-suitcase",
    screens: [
      { title: "Search", content: <TravelerScreen1 /> },
      { title: "Negotiating", content: <TravelerScreen2 /> },
      { title: "Results", content: <TravelerScreen3 /> },
      { title: "Confirmed", content: <TravelerScreen4 /> },
    ],
  },
  {
    key: "travel_manager",
    label: "I'm a Travel Manager",
    icon: "fa-briefcase",
    screens: [
      { title: "Dashboard", content: <ManagerScreen1 /> },
      { title: "Live Negotiation", content: <ManagerScreen2 /> },
      { title: "Audit Trail", content: <ManagerScreen3 /> },
      { title: "Shadow Report", content: <ManagerScreen4 /> },
    ],
  },
  {
    key: "revenue_manager",
    label: "I'm a Revenue Manager",
    icon: "fa-hotel",
    screens: [
      { title: "Requests", content: <RevenueScreen1 /> },
      { title: "Yield Config", content: <RevenueScreen2 /> },
      { title: "Performance", content: <RevenueScreen3 /> },
      { title: "Savings", content: <RevenueScreen4 /> },
    ],
  },
];

// ─── Main Component ─────────────────────────────────────────────────────────

export function InteractiveDemo() {
  const [activePersona, setActivePersona] = useState<PersonaKey>("traveler");
  const [activeScreen, setActiveScreen] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const persona = personas.find((p) => p.key === activePersona)!;
  const screenCount = persona.screens.length;

  const goToScreen = useCallback((index: number) => {
    setActiveScreen(index);
    setAutoPlay(false);
  }, []);

  const goNext = useCallback(() => {
    setActiveScreen((prev) => (prev + 1) % screenCount);
  }, [screenCount]);

  const goPrev = useCallback(() => {
    setActiveScreen((prev) => (prev - 1 + screenCount) % screenCount);
  }, [screenCount]);

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screenCount);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoPlay, screenCount]);

  // Reset screen index when changing persona
  function switchPersona(key: PersonaKey) {
    setActivePersona(key);
    setActiveScreen(0);
    setAutoPlay(true);
  }

  return (
    <div className="w-full max-w-[800px] mx-auto">
      {/* Persona tabs */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {personas.map((p) => (
          <button
            key={p.key}
            onClick={() => switchPersona(p.key)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
              activePersona === p.key
                ? "bg-navy-800 text-white border-navy-800 shadow-card-md"
                : "bg-white text-slate-600 border-[#E2E6F0] hover:border-navy-200 hover:text-navy-800"
            }`}
          >
            <i className={`fa-solid ${p.icon} text-xs`} />
            {p.label}
          </button>
        ))}
      </div>

      {/* Browser frame with content */}
      <BrowserFrame>
        {persona.screens[activeScreen].content}
      </BrowserFrame>

      {/* Navigation controls */}
      <div className="flex items-center justify-between mt-4 px-2">
        {/* Prev */}
        <button
          onClick={() => { goPrev(); setAutoPlay(false); }}
          className="w-9 h-9 rounded-full border border-[#E2E6F0] bg-white flex items-center justify-center text-slate-500 hover:text-navy-800 hover:border-navy-200 transition-all"
        >
          <i className="fa-solid fa-chevron-left text-xs" />
        </button>

        {/* Step dots + label */}
        <div className="flex items-center gap-3">
          {persona.screens.map((s, i) => (
            <button
              key={i}
              onClick={() => goToScreen(i)}
              className="flex items-center gap-1.5 group"
            >
              <span
                className={`block w-2 h-2 rounded-full transition-all ${
                  i === activeScreen
                    ? "bg-navy-800 w-6"
                    : "bg-slate-200 group-hover:bg-slate-400"
                }`}
              />
              {i === activeScreen && (
                <span className="text-[11px] font-semibold text-navy-800">{s.title}</span>
              )}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => { goNext(); setAutoPlay(false); }}
          className="w-9 h-9 rounded-full border border-[#E2E6F0] bg-white flex items-center justify-center text-slate-500 hover:text-navy-800 hover:border-navy-200 transition-all"
        >
          <i className="fa-solid fa-chevron-right text-xs" />
        </button>
      </div>
    </div>
  );
}
