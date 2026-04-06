"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const steps = [
  { label: "Trip Details", icon: "fa-suitcase" },
  { label: "AI Negotiation", icon: "fa-robot" },
  { label: "Compare Offers", icon: "fa-scale-balanced" },
  { label: "Confirm", icon: "fa-circle-check" },
];

interface HotelOffer {
  id: string;
  hotel_id: string;
  name: string;
  stars: number;
  district: string;
  arrondissement: string;
  base_rate: number;
  negotiated_rate: number;
  discount_pct: number;
  esg_tier: string;
  amenities: string[];
  cancellation_policy: string;
  badge: string;
  policy_compliant: boolean;
  address: string;
  rating_google: number;
  breakfast_included: boolean;
  website_url: string;
  description: string;
}

const badgeConfig: Record<string, { label: string; color: string }> = {
  best_price: { label: "Best Price", color: "bg-emerald" },
  recommended: { label: "Recommended", color: "bg-[#222]" },
  best_rated: { label: "Best Rated", color: "bg-amber" },
};

function BookSearchInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const destination = searchParams.get("destination") || "Paris";
  const checkIn = searchParams.get("check_in") || "";
  const checkOut = searchParams.get("check_out") || "";
  const roomType = searchParams.get("room_type") || "Standard";
  const budget = searchParams.get("budget") || "180";

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 1;

  const formatDate = (d: string) => {
    if (!d) return "";
    const date = new Date(d + "T00:00:00");
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const [offers, setOffers] = useState<HotelOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic negotiation messages — updated as hotels are fetched
  const [negotiationMessages, setNegotiationMessages] = useState<string[]>([]);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showOffers, setShowOffers] = useState(false);
  const [fetchStartTime] = useState(Date.now());
  const [negotiationTime, setNegotiationTime] = useState("0.0");

  useEffect(() => {
    // Start with generic messages
    const initialMessages = [
      `Checking availability across ${destination}...`,
      `Comparing base rates and corporate discounts...`,
    ];
    setNegotiationMessages(initialMessages);

    // Animate initial messages
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setVisibleMessages(1), 0));
    timers.push(setTimeout(() => setVisibleMessages(2), 800));

    // Fetch real hotels
    const url = `/api/hotels?city=${encodeURIComponent(destination)}&min_stars=3&max_rate=${budget}&room_type=${encodeURIComponent(roomType.toLowerCase())}&limit=3`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }

        const fetchedOffers: HotelOffer[] = data.offers || [];
        setOffers(fetchedOffers);

        // Build hotel-specific negotiation messages
        const hotelMessages = fetchedOffers.map(
          (o: HotelOffer) => `Negotiating with ${o.name}...`
        );
        const finalMessages = [
          ...initialMessages,
          ...hotelMessages,
          `Verifying policy compliance on ${fetchedOffers.length} offers...`,
          `Ranking offers by value score...`,
        ];
        setNegotiationMessages(finalMessages);

        // Animate remaining messages
        const baseDelay = 1600;
        hotelMessages.forEach((_, idx) => {
          timers.push(
            setTimeout(() => setVisibleMessages(3 + idx), baseDelay + idx * 800)
          );
        });

        const complianceDelay = baseDelay + hotelMessages.length * 800;
        timers.push(
          setTimeout(
            () => setVisibleMessages(3 + hotelMessages.length),
            complianceDelay
          )
        );
        timers.push(
          setTimeout(
            () => setVisibleMessages(3 + hotelMessages.length + 1),
            complianceDelay + 800
          )
        );

        // Show offers after all messages
        timers.push(
          setTimeout(() => {
            setNegotiationTime(((Date.now() - fetchStartTime) / 1000).toFixed(1));
            setShowOffers(true);
            setLoading(false);
          }, complianceDelay + 1600)
        );
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch hotels");
        setLoading(false);
      });

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelect(offer: HotelOffer) {
    sessionStorage.setItem("selectedOffer", JSON.stringify(offer));
    router.push("/corporate/book/confirm");
  }

  // Map amenities to display inclusions
  function getInclusions(offer: HotelOffer): string[] {
    const inclusions: string[] = [];
    if (offer.amenities?.includes("wifi")) inclusions.push("WiFi");
    if (offer.breakfast_included || offer.amenities?.includes("breakfast")) inclusions.push("Breakfast");
    if (offer.amenities?.includes("gym")) inclusions.push("Gym");
    if (offer.amenities?.includes("parking")) inclusions.push("Parking");
    if (offer.amenities?.includes("bar")) inclusions.push("Bar");
    if (offer.amenities?.includes("spa")) inclusions.push("Spa");
    if (offer.cancellation_policy) inclusions.push("24h cancellation");
    return inclusions;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#222]">Book Travel</h1>
        <p className="text-[#717171] mt-1">Step 2 of 4 — AI Negotiation &amp; Compare</p>
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                i < 1
                  ? "bg-emerald text-white"
                  : i === 1
                  ? "bg-[#222] text-white"
                  : "bg-[#F7F7F7] text-[#B0B0B0] border border-[#EBEBEB]"
              }`}>
                {i < 1 ? (
                  <i className="fa-solid fa-check text-xs" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${
                i <= 1 ? "text-[#222]" : "text-[#B0B0B0]"
              }`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-px mx-3 ${i < 1 ? "bg-emerald" : i === 1 ? "bg-[#222]" : "bg-[#EBEBEB]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <i className="fa-solid fa-circle-exclamation text-red-400 text-2xl mb-3" />
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={() => router.push("/corporate/book")}
            className="mt-4 px-5 py-2 rounded-lg text-sm font-semibold bg-[#222] text-white hover:bg-black transition-colors"
          >
            Back to Trip Details
          </button>
        </div>
      )}

      {/* Negotiation Status Panel */}
      {!showOffers && !error && (
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-[#EBEBEB] p-8 mb-8 animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-emerald animate-pulse-dot" />
            <h2 className="text-lg font-semibold text-[#222]">AI Agent is negotiating...</h2>
          </div>

          <div className="space-y-3">
            {negotiationMessages.slice(0, visibleMessages).map((msg, i) => (
              <div key={i} className="flex items-center gap-3 animate-fade-up">
                <div className="w-6 h-6 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0">
                  {i < visibleMessages - 1 ? (
                    <i className="fa-solid fa-check text-emerald text-[9px]" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-emerald animate-pulse-dot" />
                  )}
                </div>
                <span className="text-sm text-[#484848]">{msg}</span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-1.5 rounded-full bg-[#F7F7F7] overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald transition-all duration-700 ease-out"
                style={{ width: `${negotiationMessages.length > 0 ? (visibleMessages / negotiationMessages.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Hotel Offer Cards — Airbnb listing style */}
      {showOffers && !error && (
        <div className="animate-fade-up">
          <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
            <div>
              <h2 className="text-xl font-semibold text-[#222]">{offers.length} offers for {destination}</h2>
              <p className="text-sm text-[#717171] mt-1">
                {formatDate(checkIn)} &ndash; {formatDate(checkOut)} &middot; {nights} night{nights > 1 ? "s" : ""} &middot; {roomType} room
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#717171]">
              <i className="fa-solid fa-robot text-emerald" />
              Negotiated by AI in {negotiationTime}s
            </div>
          </div>

          {offers.length === 0 ? (
            <div className="max-w-2xl mx-auto bg-white rounded-xl border border-[#EBEBEB] p-10 text-center">
              <i className="fa-solid fa-hotel text-[#B0B0B0] text-3xl mb-4" />
              <h3 className="text-lg font-semibold text-[#222] mb-2">No hotels found</h3>
              <p className="text-sm text-[#717171] mb-4">No matching hotels in {destination} for your criteria.</p>
              <button
                onClick={() => router.push("/corporate/book")}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#222] text-white hover:bg-black transition-colors"
              >
                Modify Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {offers.map((offer) => {
                const badge = badgeConfig[offer.badge] || badgeConfig.recommended;
                const inclusions = getInclusions(offer);
                return (
                  <div key={offer.id} className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden relative hover:shadow-md transition-shadow">
                    {/* Badge */}
                    <div className={`absolute top-3 left-3 z-10 ${badge.color} text-white text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1`}>
                      {badge.label}
                    </div>

                    {/* Photo placeholder */}
                    <div className="h-40 bg-gradient-to-br from-[#F7F7F7] to-[#EBEBEB] flex items-center justify-center">
                      <i className="fa-solid fa-hotel text-3xl text-[#B0B0B0]" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: offer.stars }).map((_, i) => (
                            <i key={i} className="fa-solid fa-star text-amber text-[9px]" />
                          ))}
                          {offer.rating_google > 0 && (
                            <span className="text-[10px] text-[#717171] ml-1">{offer.rating_google}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="badge-emerald badge text-[10px]">
                            <i className="fa-solid fa-leaf text-[8px]" />
                            ESG {offer.esg_tier || "B"}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base font-semibold text-[#222] mb-0.5">{offer.name}</h3>
                      <p className="text-xs text-[#717171] mb-3">
                        {offer.district || offer.arrondissement || ""}{offer.district && destination ? `, ${destination}` : destination}
                      </p>

                      {/* Inclusions */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {inclusions.map((inc) => (
                          <span key={inc} className="inline-flex items-center gap-1 text-[#484848] text-[10px] font-medium bg-[#F7F7F7] rounded-md px-2 py-0.5">
                            <i className="fa-solid fa-check text-emerald text-[7px]" />
                            {inc}
                          </span>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-xl font-semibold text-[#222]">&euro;{offer.negotiated_rate}</span>
                        <span className="text-sm text-[#717171]">/night</span>
                        <span className="text-xs line-through text-[#B0B0B0] ml-auto">&euro;{offer.base_rate}</span>
                        <span className="text-xs font-semibold text-emerald bg-emerald/10 px-2 py-0.5 rounded-full">
                          -{offer.discount_pct}%
                        </span>
                      </div>

                      {/* Select button */}
                      <button
                        onClick={() => handleSelect(offer)}
                        className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#222] text-white hover:bg-black transition-colors"
                      >
                        Select this hotel
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function BookSearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-emerald border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    }>
      <BookSearchInner />
    </Suspense>
  );
}
