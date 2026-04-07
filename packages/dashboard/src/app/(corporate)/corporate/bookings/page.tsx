"use client";

import { useState, useEffect } from "react";

type FilterTab = "upcoming" | "past" | "cancelled";

interface Booking {
  id: string;
  booking_ref: string;
  traveler: string;
  destination: string;
  hotel_name: string;
  address: string;
  check_in: string;
  check_out: string;
  nights: number;
  negotiated_rate: number;
  rack_rate: number;
  total_cost: number;
  status: string;
  room_type: string;
  esg_tier: string;
  stars: number;
  savings_eur: number;
  savings_pct: number;
  district: string;
  created_at: string;
}

// Fallback demo data matching design file
const demoBookings = [
  {
    ref: "BK-456789",
    hotel: "Le Marais Boutique",
    city: "Paris, France",
    checkIn: "May 12 - May 15, 2026",
    nights: 3,
    rooms: 1,
    total: 426,
    savingsPct: 10,
    status: "confirmed" as const,
    roomType: "Superior Room",
    inclusions: "Breakfast Included, Free WiFi",
    checkInTime: "After 15:00",
    checkOutTime: "Late checkout until 14:00",
  },
  {
    ref: "BK-456790",
    hotel: "Brussels Central Hotel",
    city: "Brussels, Belgium",
    checkIn: "Jun 18 - Jun 20, 2026",
    nights: 2,
    rooms: 1,
    total: 276,
    savingsPct: 0,
    status: "pending" as const,
    roomType: "Standard Room",
    inclusions: "Free WiFi",
    checkInTime: "After 14:00",
    checkOutTime: "Before 11:00",
  },
  {
    ref: "BK-456791",
    hotel: "Lyon Confluence",
    city: "Lyon, France",
    checkIn: "Jul 05 - Jul 08, 2026",
    nights: 3,
    rooms: 1,
    total: 384,
    savingsPct: 0,
    status: "confirmed" as const,
    roomType: "Standard Room",
    inclusions: "Free WiFi, Parking",
    checkInTime: "After 15:00",
    checkOutTime: "Before 12:00",
  },
];

function StatusBadge({ status }: { status: "confirmed" | "pending" | "cancelled" }) {
  const config = {
    confirmed: { cls: "bg-emerald-50 text-emerald-600 border-emerald-200", label: "Confirmed", icon: "fa-solid fa-check" },
    pending: { cls: "bg-amber-50 text-amber-600 border-amber-200", label: "Pending Approval", icon: "fa-regular fa-clock" },
    cancelled: { cls: "bg-red-50 text-red-600 border-red-200", label: "Cancelled", icon: "fa-solid fa-xmark" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.cls}`}>
      <i className={c.icon} /> {c.label}
    </span>
  );
}

export default function MyBookingsPage() {
  const [filter, setFilter] = useState<FilterTab>("upcoming");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "upcoming", label: "Upcoming", count: 3 },
    { key: "past", label: "Past Trips", count: 0 },
    { key: "cancelled", label: "Cancelled", count: 0 },
  ];

  const selectedDemo = demoBookings.find((b) => b.ref === selectedBooking);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Filters & Controls Bar */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex border-b border-[#E5E7EB] w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  filter === tab.key
                    ? "text-emerald-600 border-emerald-500"
                    : "text-[#6B7280] border-transparent hover:text-[#111827]"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm" />
            <input
              type="text"
              placeholder="Search by hotel, city, ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-emerald-500 text-[#111827]"
            />
          </div>
          <div className="relative hidden sm:block">
            <select className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg py-2 pl-3 pr-8 text-sm appearance-none text-[#374151]">
              <option>Status: All</option>
              <option>Confirmed</option>
              <option>Pending Approval</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xs pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="pl-6 pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Ref</th>
                <th className="pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Hotel & Location</th>
                <th className="pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Dates</th>
                <th className="pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider text-right">Total</th>
                <th className="pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="pr-6 pt-5 pb-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoBookings.map((b) => (
                <tr
                  key={b.ref}
                  onClick={() => setSelectedBooking(b.ref)}
                  className={`group cursor-pointer transition-colors border-b border-[#F3F4F6] hover:bg-[#F9FAFB] ${
                    b.status === "pending" ? "border-l-2 border-l-amber-400" : ""
                  }`}
                >
                  <td className="pl-6 py-4">
                    <span className="font-mono text-[#111827] font-medium group-hover:text-emerald-600 transition-colors text-sm">{b.ref}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-[#F3F4F6] flex-shrink-0 flex items-center justify-center text-[#9CA3AF]">
                        <i className="fa-solid fa-hotel text-lg" />
                      </div>
                      <div>
                        <div className="text-[#111827] font-medium text-sm">{b.hotel}</div>
                        <div className="text-xs text-[#6B7280]"><i className="fa-solid fa-location-dot mr-1" />{b.city}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-[#111827] text-sm">{b.checkIn}</div>
                    <div className="text-xs text-[#6B7280]">{b.nights} Nights &bull; {b.rooms} Room</div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="font-bold text-[#111827] text-lg">&euro;{b.total}</div>
                    {b.savingsPct > 0 && (
                      <div className="text-xs text-emerald-600"><i className="fa-solid fa-arrow-down mr-1" />{b.savingsPct}% vs RFP</div>
                    )}
                  </td>
                  <td className="py-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="pr-6 py-4 text-right">
                    <button className="text-[#9CA3AF] hover:text-[#111827] px-2 py-1 rounded transition-colors">
                      <i className="fa-solid fa-chevron-right" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#E5E7EB] flex items-center justify-between text-sm text-[#6B7280]">
          <span>Showing 3 upcoming trips</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F9FAFB] disabled:opacity-50 text-xs" disabled><i className="fa-solid fa-chevron-left" /></button>
            <button className="w-8 h-8 rounded border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F9FAFB] disabled:opacity-50 text-xs" disabled><i className="fa-solid fa-chevron-right" /></button>
          </div>
        </div>
      </div>

      {/* Side Panel Overlay */}
      {selectedBooking && selectedDemo && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSelectedBooking(null)} />
          <div className="fixed top-0 right-0 w-full max-w-md h-screen bg-white shadow-2xl z-50 flex flex-col border-l border-[#E5E7EB]">
            {/* Panel Header */}
            <div className="h-20 border-b border-[#E5E7EB] flex items-center justify-between px-6 flex-shrink-0 bg-[#F9FAFB]">
              <div>
                <h2 className="text-xl font-bold text-[#111827]">Booking Details</h2>
                <div className="font-mono text-xs text-emerald-600">{selectedDemo.ref}</div>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] flex items-center justify-center text-[#374151] transition-colors"
              >
                <i className="fa-solid fa-times" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Status Header */}
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-lg">
                    <i className="fa-solid fa-check" />
                  </div>
                  <div>
                    <div className="text-[#111827] font-bold">Confirmed</div>
                    <div className="text-xs text-emerald-600">Auto-approved by policy</div>
                  </div>
                </div>
                <button className="border border-[#E5E7EB] px-3 py-1.5 rounded text-xs flex items-center gap-2 text-[#374151] hover:bg-[#F9FAFB]">
                  <i className="fa-solid fa-download" /> Voucher
                </button>
              </div>

              {/* Hotel Info */}
              <div className="space-y-4">
                <div className="h-48 rounded-xl overflow-hidden relative bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] flex items-center justify-center">
                  <i className="fa-solid fa-hotel text-4xl text-[#D1D5DB]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827]">{selectedDemo.hotel}</h3>
                  <p className="text-sm text-[#6B7280] mt-1 flex items-start gap-2">
                    <i className="fa-solid fa-location-dot mt-0.5" />
                    <span>{selectedDemo.city}</span>
                  </p>
                </div>
              </div>

              {/* Itinerary Timeline */}
              <div>
                <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4 border-b border-[#E5E7EB] pb-2">Itinerary Details</h4>
                <div className="relative pl-6 space-y-6">
                  <div className="absolute top-2 bottom-2 left-[11px] w-px bg-[#E5E7EB]" />
                  <div className="relative">
                    <div className="absolute -left-[29px] w-[18px] h-[18px] rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    </div>
                    <div className="text-xs text-[#6B7280] uppercase">Check-in</div>
                    <div className="text-[#111827] font-medium mt-1">{selectedDemo.checkIn.split(" - ")[0]}</div>
                    <div className="text-sm text-[#6B7280]">{selectedDemo.checkInTime}</div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[29px] w-[18px] h-[18px] rounded-full bg-white border-2 border-[#9CA3AF]" />
                    <div className="text-xs text-[#6B7280] uppercase">Room</div>
                    <div className="text-[#111827] font-medium mt-1">1x {selectedDemo.roomType}</div>
                    <div className="text-sm text-[#6B7280]">{selectedDemo.inclusions}</div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[29px] w-[18px] h-[18px] rounded-full bg-white border-2 border-amber-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    </div>
                    <div className="text-xs text-[#6B7280] uppercase">Check-out</div>
                    <div className="text-[#111827] font-medium mt-1">{selectedDemo.checkIn.split(" - ")[1]}</div>
                    <div className="text-sm text-[#6B7280]">{selectedDemo.checkOutTime}</div>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4 border-b border-[#E5E7EB] pb-2">Payment Summary</h4>
                <div className="bg-[#F9FAFB] rounded-xl p-4 border border-[#F3F4F6] space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#374151]">Room Rate ({selectedDemo.nights} nights)</span>
                    <span className="text-[#111827] font-mono">&euro;{selectedDemo.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#374151]">Taxes & Fees</span>
                    <span className="text-[#111827] font-mono">Included</span>
                  </div>
                  <div className="pt-3 border-t border-[#E5E7EB] flex justify-between items-center">
                    <span className="text-[#111827] font-medium">Total Billed</span>
                    <span className="text-2xl font-bold text-[#111827]">&euro;{selectedDemo.total}</span>
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-xs text-[#6B7280]">
                    <i className="fa-brands fa-cc-amex text-lg" />
                    <span>Billed to Corporate Card &bull;&bull;&bull;&bull; 4242</span>
                  </div>
                </div>
              </div>

              {/* Audit Snippet */}
              <div>
                <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">HNP Protocol Audit</h4>
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 font-mono text-[10px] text-[#9CA3AF] overflow-x-auto">
                  <div>&gt; Negotiation ID: REQ-8924</div>
                  <div>&gt; Duration: 24.2s (2 rounds)</div>
                  <div>&gt; Final Hash: e4c8a1f29b3...</div>
                  <div className="text-emerald-600 mt-1">OK Cryptographically verified</div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-6 border-t border-[#E5E7EB] bg-[#F9FAFB] mt-auto flex gap-3">
              <button className="flex-1 border border-[#E5E7EB] py-2.5 rounded-lg text-sm font-medium text-[#374151] hover:bg-white transition-colors">
                Modify
              </button>
              <button className="flex-1 bg-red-50 border border-red-200 text-red-600 py-2.5 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                Cancel Trip
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
