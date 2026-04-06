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
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Hotel Portfolio</h1>
          <p className="text-[#717171] mt-1">Manage your properties</p>
        </div>
        <button className="btn-emerald px-4 py-2 rounded-lg text-sm font-medium">
          <i className="fa-solid fa-plus mr-2" />
          Add Hotel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hotelProperties.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow"
          >
            {/* Hotel Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#222]">{hotel.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <i className="fa-solid fa-location-dot text-emerald text-xs" />
                  <span className="text-sm text-[#717171]">{hotel.city}</span>
                  <span className="mx-1 text-[#B0B0B0]">&middot;</span>
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
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171] mb-1">Rooms</p>
                <p className="text-lg font-semibold text-[#222] font-mono">{hotel.rooms}</p>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171] mb-1">Occupancy</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-[#222] font-mono">{hotel.occupancy}%</p>
                  <div className="flex-1 h-1.5 rounded-full bg-[#EBEBEB] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald"
                      style={{ width: `${hotel.occupancy}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171] mb-1">ADR</p>
                <p className="text-lg font-semibold text-[#222] font-mono">{hotel.adr}</p>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171] mb-1">RevPAR</p>
                <p className="text-lg font-semibold text-[#222] font-mono">{hotel.revpar}</p>
              </div>
            </div>

            {/* ESG + Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#717171]">ESG Tier</span>
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
    </div>
  );
}
