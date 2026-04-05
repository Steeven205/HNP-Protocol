"use client";

import { hotelProperties } from "@/lib/demo-data";

function StarRating({ category }: { category: string }) {
  const count = category === "4_star" ? 4 : category === "5_star" ? 5 : 3;
  return (
    <span className="text-amber">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} className="fa-solid fa-star text-xs" />
      ))}
    </span>
  );
}

export default function HotelPortfolioPage() {
  return (
    <>
      {/* Header */}
      <header className="h-20 border-b border-white/10 glass-panel flex items-center justify-between px-6 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Hotel Portfolio</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage your properties</p>
        </div>
        <button className="btn-emerald px-4 py-2 rounded-lg text-sm font-medium">
          <i className="fa-solid fa-plus mr-2" />
          Add Hotel
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {hotelProperties.map((hotel, i) => (
            <div
              key={hotel.id}
              className={`glass-card rounded-2xl p-6 animate-fade-up delay-${(i + 1) * 100}`}
            >
              {/* Hotel Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{hotel.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <i className="fa-solid fa-location-dot text-emerald text-xs" />
                    <span className="text-sm text-slate-400">{hotel.city}</span>
                    <span className="mx-1 text-slate-600">&middot;</span>
                    <StarRating category={hotel.category} />
                  </div>
                </div>
                <span
                  className={`badge ${hotel.status === "active" ? "badge-emerald" : "badge-amber"}`}
                >
                  <i
                    className={`fa-solid ${
                      hotel.status === "active" ? "fa-circle-check" : "fa-clock"
                    } text-[10px]`}
                  />
                  {hotel.status}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">Rooms</p>
                  <p className="text-lg font-bold text-white font-mono">{hotel.rooms}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">Occupancy</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-white font-mono">{hotel.occupancy}%</p>
                    <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald"
                        style={{ width: `${hotel.occupancy}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">ADR</p>
                  <p className="text-lg font-bold text-white font-mono">{hotel.adr}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">RevPAR</p>
                  <p className="text-lg font-bold text-white font-mono">{hotel.revpar}</p>
                </div>
              </div>

              {/* ESG + Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">ESG Tier</span>
                  <span
                    className={`badge ${
                      hotel.esg === "A" ? "badge-emerald" : "badge-blue"
                    } text-xs`}
                  >
                    <i className="fa-solid fa-leaf text-[10px]" />
                    {hotel.esg}
                  </span>
                </div>
                <button className="btn-outline px-3 py-1.5 rounded-md text-xs">
                  <i className="fa-solid fa-arrow-right mr-1" />
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
