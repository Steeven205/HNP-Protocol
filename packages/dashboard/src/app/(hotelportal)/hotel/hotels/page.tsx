"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Hotel {
  id: string;
  hotel_id: string;
  name: string;
  category: string;
  stars: number;
  address: string;
  arrondissement: string;
  district: string;
  city: string | null;
  country: string | null;
  rooms_count: number | null;
  description: string | null;
  esg_tier: string | null;
  base_rate_standard: number | null;
  base_rate_superior: number | null;
  base_rate_suite: number | null;
  amenities: string[] | null;
  rating_google: number | null;
  reviews_count: number | null;
  status: string | null;
  independent: boolean | null;
  chain_name: string | null;
  photo_url: string | null;
}

function StarRating({ count }: { count: number }) {
  return (
    <span className="text-amber">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} className="fa-solid fa-star text-xs" />
      ))}
    </span>
  );
}

export default function HotelPortfolioPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotels() {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .order("stars", { ascending: false });

      if (!error && data) {
        setHotels(data);
      }
      setLoading(false);
    }
    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#222]">Hotel Portfolio</h1>
          <p className="text-[#717171] mt-1">Manage your properties</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#EBEBEB] p-6 animate-pulse"
            >
              <div className="h-5 bg-[#F7F7F7] rounded w-3/4 mb-3" />
              <div className="h-4 bg-[#F7F7F7] rounded w-1/2 mb-4" />
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="h-16 bg-[#F7F7F7] rounded-lg" />
                <div className="h-16 bg-[#F7F7F7] rounded-lg" />
                <div className="h-16 bg-[#F7F7F7] rounded-lg" />
                <div className="h-16 bg-[#F7F7F7] rounded-lg" />
              </div>
              <div className="h-4 bg-[#F7F7F7] rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Hotel Portfolio</h1>
          <p className="text-[#717171] mt-1">
            Manage your properties &middot; {hotels.length} hotel{hotels.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button className="btn-emerald px-4 py-2 rounded-lg text-sm font-medium">
          <i className="fa-solid fa-plus mr-2" />
          Add Hotel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow"
          >
            {/* Hotel Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-[#222] truncate">{hotel.name}</h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <i className="fa-solid fa-location-dot text-emerald text-xs" />
                  <span className="text-sm text-[#717171]">
                    {hotel.arrondissement}, {hotel.city || "Paris"}
                  </span>
                  <span className="mx-1 text-[#B0B0B0]">&middot;</span>
                  <StarRating count={hotel.stars} />
                </div>
              </div>
              <span
                className={`badge ${hotel.status === "active" ? "badge-emerald" : "badge-amber"} ml-2 flex-shrink-0`}
              >
                <i
                  className={`fa-solid ${
                    hotel.status === "active" ? "fa-circle-check" : "fa-clock"
                  } text-[10px]`}
                />
                {hotel.status || "active"}
              </span>
            </div>

            {/* Description */}
            {hotel.description && (
              <p className="text-xs text-[#717171] mb-3 line-clamp-2">{hotel.description}</p>
            )}

            {/* Google Rating */}
            {hotel.rating_google && (
              <div className="flex items-center gap-1.5 mb-3">
                <i className="fa-solid fa-star text-amber text-xs" />
                <span className="text-sm font-semibold text-[#222]">
                  {Number(hotel.rating_google).toFixed(1)}
                </span>
                {hotel.reviews_count && (
                  <span className="text-xs text-[#717171]">
                    ({hotel.reviews_count.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Address */}
            <div className="flex items-start gap-1.5 mb-3">
              <i className="fa-solid fa-map-pin text-[#B0B0B0] text-xs mt-0.5" />
              <span className="text-xs text-[#717171]">{hotel.address}</span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171] mb-1">Rooms</p>
                <p className="text-lg font-semibold text-[#222] font-mono">
                  {hotel.rooms_count ?? "-"}
                </p>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171] mb-1">Standard</p>
                <p className="text-lg font-semibold text-[#222] font-mono">
                  {hotel.base_rate_standard ? `\u20AC${Number(hotel.base_rate_standard)}` : "-"}
                </p>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171] mb-1">Superior</p>
                <p className="text-lg font-semibold text-[#222] font-mono">
                  {hotel.base_rate_superior ? `\u20AC${Number(hotel.base_rate_superior)}` : "-"}
                </p>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171] mb-1">Suite</p>
                <p className="text-lg font-semibold text-[#222] font-mono">
                  {hotel.base_rate_suite ? `\u20AC${Number(hotel.base_rate_suite)}` : "-"}
                </p>
              </div>
            </div>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {hotel.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F7F7F7] text-[#717171] border border-[#EBEBEB]"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            )}

            {/* ESG + Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#717171]">ESG Tier</span>
                <span
                  className={`badge ${
                    hotel.esg_tier === "A" ? "badge-emerald" : "badge-blue"
                  } text-xs`}
                >
                  <i className="fa-solid fa-leaf text-[10px]" />
                  {hotel.esg_tier || "-"}
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
