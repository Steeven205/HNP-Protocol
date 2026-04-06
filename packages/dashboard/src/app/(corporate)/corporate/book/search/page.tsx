"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* ── Types ────────────────────────────────────────────────────────────── */

interface LiveMessage {
  id: string;
  agent: string;
  type: string;
  timestamp: string;
  content: string;
  data?: Record<string, unknown>;
}

interface HotelOffer {
  id: string;
  hotel_id: string;
  hotel_name: string;
  category: string;
  address: string;
  district: string;
  esg_tier: string;
  rating_google: number;
  rating_booking: number;
  reviews_count: number;
  rate_eur: number;
  base_rate_eur: number;
  savings_vs_budget_pct: number;
  room_type: string;
  inclusions: string[];
  cancellation: string;
  badge: string;
  nights: number;
  policy_compliant: boolean;
  policy_checks: { label: string; passed: boolean }[];
  photo_url?: string;
  website_url?: string;
  distance_office_km?: number;
  transit_min?: number;
}

const steps = [
  { label: "Trip Details" },
  { label: "AI Negotiation" },
  { label: "Compare Offers" },
  { label: "Confirm" },
];

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

/* ── Main Component ───────────────────────────────────────────────────── */

function BookSearchInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const traveler = searchParams.get("traveler") || "Sophie Martin";
  const destination = searchParams.get("destination") || "Paris";
  const checkIn = searchParams.get("check_in") || "2026-05-12";
  const checkOut = searchParams.get("check_out") || "2026-05-15";
  const budget = searchParams.get("budget") || "180";
  const roomType = searchParams.get("room_type") || "Standard";
  const purpose = searchParams.get("purpose") || "";

  const nights = Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));

  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [status, setStatus] = useState<string>("connecting");
  const [elapsed, setElapsed] = useState(0);
  const [offers, setOffers] = useState<HotelOffer[]>([]);
  const [showOffers, setShowOffers] = useState(false);

  const startRef = useRef(Date.now());
  const endRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  // Timer
  useEffect(() => {
    if (showOffers || status === "error") return;
    const i = setInterval(() => setElapsed(Math.round((Date.now() - startRef.current) / 100) / 10), 100);
    return () => clearInterval(i);
  }, [showOffers, status]);

  // Auto-scroll chat
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Start SSE negotiation
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    startRef.current = Date.now();

    async function run() {
      try {
        const res = await fetch("/api/negotiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ traveler, destination, check_in: checkIn, check_out: checkOut, budget, purpose }),
        });

        if (!res.ok || !res.body) {
          setStatus("error");
          setMessages([{ id: "err", agent: "system", type: "SYSTEM", timestamp: new Date().toISOString(), content: `Error: ${res.status}` }]);
          return;
        }

        setStatus("in_progress");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const dataLine = line.replace(/^data: /, "").trim();
            if (!dataLine) continue;

            try {
              const parsed = JSON.parse(dataLine);

              if (parsed.type === "meta") {
                if (parsed.status) setStatus(parsed.status);
                if (parsed.offers) setOffers(parsed.offers as HotelOffer[]);
              } else {
                setMessages((prev) => [...prev, parsed as LiveMessage]);
              }
            } catch {
              // ignore parse errors
            }
          }
        }

        setStatus((s) => s === "in_progress" ? "awaiting_choice" : s);
      } catch (err) {
        setStatus("error");
        setMessages((prev) => [...prev, {
          id: "err-catch", agent: "system", type: "SYSTEM",
          timestamp: new Date().toISOString(),
          content: `Error: ${err instanceof Error ? err.message : String(err)}`,
        }]);
      }
    }

    run();
  }, [traveler, destination, checkIn, checkOut, budget, purpose]);

  // When offers arrive, show them after a short delay
  useEffect(() => {
    if (status === "awaiting_choice" && offers.length > 0 && !showOffers) {
      const t = setTimeout(() => setShowOffers(true), 800);
      return () => clearTimeout(t);
    }
  }, [status, offers, showOffers]);

  const isNegotiating = status === "in_progress" || status === "connecting";

  function handleSelect(offer: HotelOffer) {
    // Store in sessionStorage for the confirm page
    const bookingRequest = sessionStorage.getItem("bookingRequest");
    sessionStorage.setItem("selectedOffer", JSON.stringify({
      id: offer.id,
      hotel_id: offer.hotel_id,
      name: offer.hotel_name,
      stars: offer.category === "5_star" ? 5 : offer.category === "4_star" ? 4 : 3,
      address: offer.address,
      district: offer.district,
      esg_tier: offer.esg_tier,
      rating_google: offer.rating_google,
      base_rate: offer.base_rate_eur,
      negotiated_rate: offer.rate_eur,
      discount_pct: Math.round(((offer.base_rate_eur - offer.rate_eur) / offer.base_rate_eur) * 100),
      amenities: offer.inclusions,
      cancellation_policy: offer.cancellation,
      badge: offer.badge,
      policy_compliant: offer.policy_compliant,
      breakfast_included: offer.inclusions.includes("breakfast"),
      website_url: offer.website_url || "",
      description: "",
    }));
    // Also update bookingRequest with real destination/dates if needed
    if (!bookingRequest) {
      sessionStorage.setItem("bookingRequest", JSON.stringify({
        traveler, destination, checkIn, checkOut, rooms: 1, roomType, purpose, budget: Number(budget),
      }));
    }
    router.push("/corporate/book/confirm");
  }

  /* ── Render ──────────────────────────────────────────────────────────── */

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#222]">Book Travel</h1>
        <p className="text-[#717171] mt-1">Step 2 of 4 — AI Negotiation</p>
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center justify-center gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                i < 1 ? "bg-emerald text-white"
                  : i === 1 ? "bg-[#222] text-white"
                  : "bg-[#F7F7F7] text-[#B0B0B0] border border-[#EBEBEB]"
              }`}>
                {i < 1 ? <i className="fa-solid fa-check text-xs" /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${i <= 1 ? "text-[#222]" : "text-[#B0B0B0]"}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-px mx-3 ${i < 1 ? "bg-emerald" : i === 1 ? "bg-[#222]" : "bg-[#EBEBEB]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Two-column: Chat + Analytics */}
      <div className="flex gap-6">
        {/* Left: Chat timeline */}
        <div className="flex-1 min-w-0">
          {/* Trip context bar */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-2 bg-[#F7F7F7] rounded-lg px-3 py-2 text-sm text-[#484848]">
              <i className="fa-solid fa-user text-[#B0B0B0] text-xs" />
              {traveler}
            </div>
            <div className="flex items-center gap-2 bg-[#F7F7F7] rounded-lg px-3 py-2 text-sm text-[#484848]">
              <i className="fa-solid fa-location-dot text-[#B0B0B0] text-xs" />
              {destination} &middot; {nights} night{nights > 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-2 bg-[#F7F7F7] rounded-lg px-3 py-2 text-sm text-[#484848]">
              <i className="fa-solid fa-stopwatch text-emerald text-xs" />
              <span className="font-mono">{elapsed.toFixed(1)}s</span>
            </div>
            {isNegotiating && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald bg-emerald/10 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse-dot" />
                LIVE
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#F7F7F7] flex items-center gap-2">
              <i className="fa-solid fa-comments text-emerald text-sm" />
              <span className="text-sm font-semibold text-[#222]">AI-to-AI Negotiation</span>
            </div>

            <div className="p-5 space-y-4 max-h-[420px] overflow-y-auto">
              {messages.map((msg) => {
                const isCorp = msg.agent === "corporate";
                const isSys = msg.agent === "system";
                const isHotel = msg.agent === "hotel";

                if (isSys) {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <div className="inline-flex items-center gap-2 bg-[#F7F7F7] text-[#717171] text-xs font-medium rounded-full px-4 py-1.5">
                        <i className="fa-solid fa-circle-info text-[10px]" />
                        {msg.content}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className={`flex ${isCorp ? "justify-start" : "justify-end"} animate-fade-up`}>
                    <div className={`max-w-[85%] rounded-xl p-4 ${
                      isCorp
                        ? "bg-blue-50 border-l-4 border-l-blue"
                        : "bg-emerald-50 border-l-4 border-l-emerald"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isCorp ? "text-blue" : "text-emerald"}`}>
                          {isCorp ? "Corporate Agent" : "Hotel Agent"}
                        </span>
                        <span className="text-[10px] text-[#B0B0B0]">{formatTime(msg.timestamp)}</span>
                      </div>

                      <p className="text-sm text-[#484848] leading-relaxed">{msg.content}</p>

                      {/* Rate/Hotel/Inclusions tags */}
                      {(isHotel || msg.type === "HOTEL_OFFER") && msg.data && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {msg.data.rate_eur != null && (
                            <span className="inline-flex items-center gap-1 bg-white text-[#222] text-[10px] font-semibold rounded px-2 py-0.5 border border-[#EBEBEB]">
                              &euro;{String(msg.data.rate_eur)}/night
                            </span>
                          )}
                          {msg.data.hotel_name != null && (
                            <span className="inline-flex items-center gap-1 bg-white text-[#717171] text-[10px] font-medium rounded px-2 py-0.5 border border-[#EBEBEB]">
                              <i className="fa-solid fa-hotel text-[8px]" />
                              {String(msg.data.hotel_name)}
                            </span>
                          )}
                          {Array.isArray(msg.data.inclusions) && (msg.data.inclusions as string[]).slice(0, 3).map((inc) => (
                            <span key={inc} className="inline-flex items-center gap-1 bg-emerald/10 text-emerald text-[10px] font-medium rounded px-2 py-0.5">
                              <i className="fa-solid fa-check text-[7px]" />
                              {inc}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isNegotiating && (
                <div className="flex justify-end">
                  <div className="bg-emerald-50 rounded-xl p-3 border-l-4 border-l-emerald">
                    <div className="flex items-center gap-1.5">
                      <span className="typing-dot h-2 w-2 rounded-full bg-emerald" />
                      <span className="typing-dot h-2 w-2 rounded-full bg-emerald" />
                      <span className="typing-dot h-2 w-2 rounded-full bg-emerald" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>
          </div>
        </div>

        {/* Right: Analytics sidebar */}
        <div className="w-[300px] shrink-0 hidden lg:block">
          <div className="sticky top-24 space-y-4">
            {/* Trip card */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-5">
              <h3 className="text-xs font-semibold text-[#717171] uppercase tracking-wide mb-3">Trip Details</h3>
              <div className="text-sm text-[#484848] space-y-2">
                <p><i className="fa-solid fa-user text-[#B0B0B0] mr-2 w-4 text-center" />{traveler}</p>
                <p><i className="fa-solid fa-location-dot text-[#B0B0B0] mr-2 w-4 text-center" />{destination}</p>
                <p><i className="fa-solid fa-calendar text-[#B0B0B0] mr-2 w-4 text-center" />{checkIn} &rarr; {checkOut}</p>
                <p><i className="fa-solid fa-moon text-[#B0B0B0] mr-2 w-4 text-center" />{nights} night{nights > 1 ? "s" : ""}</p>
                <p><i className="fa-solid fa-euro-sign text-[#B0B0B0] mr-2 w-4 text-center" />Budget: {budget}&euro;/night</p>
              </div>
            </div>

            {/* Status card */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-5">
              <h3 className="text-xs font-semibold text-[#717171] uppercase tracking-wide mb-3">Status</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F7F7F7] rounded-lg p-3 text-center">
                  <p className="text-[10px] text-[#B0B0B0] uppercase mb-1">Duration</p>
                  <p className="text-lg font-semibold text-[#222] font-mono">{elapsed.toFixed(1)}s</p>
                </div>
                <div className="bg-[#F7F7F7] rounded-lg p-3 text-center">
                  <p className="text-[10px] text-[#B0B0B0] uppercase mb-1">Messages</p>
                  <p className="text-lg font-semibold text-[#222]">{messages.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Offers section (appears after negotiation ends) ─────────── */}
      {showOffers && offers.length > 0 && (
        <div className="mt-10 animate-fade-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#222]">{offers.length} offers negotiated</h2>
              <p className="text-sm text-[#717171] mt-1">
                Select your preferred hotel to continue
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#717171]">
              <i className="fa-solid fa-robot text-emerald" />
              Negotiated in {elapsed.toFixed(1)}s
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => {
              const savingsPct = Math.round(((offer.base_rate_eur - offer.rate_eur) / offer.base_rate_eur) * 100);
              const badgeMap: Record<string, { label: string; color: string }> = {
                best_price: { label: "Best Price", color: "bg-emerald" },
                recommended: { label: "Recommended", color: "bg-[#222]" },
                best_rated: { label: "Best Rated", color: "bg-amber" },
              };
              const badge = badgeMap[offer.badge] || badgeMap.recommended;
              const stars = offer.category === "5_star" ? 5 : offer.category === "4_star" ? 4 : 3;

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
                        {Array.from({ length: stars }).map((_, i) => (
                          <i key={i} className="fa-solid fa-star text-amber text-[9px]" />
                        ))}
                        {offer.rating_google > 0 && (
                          <span className="text-[10px] text-[#717171] ml-1">{offer.rating_google}</span>
                        )}
                      </div>
                      <span className="badge-emerald badge text-[10px]">
                        <i className="fa-solid fa-leaf text-[8px]" />
                        ESG {offer.esg_tier}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[#222] mb-0.5">{offer.hotel_name}</h3>
                    <p className="text-xs text-[#717171] mb-3">{offer.district}, {destination}</p>

                    {/* Inclusions */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {offer.inclusions.slice(0, 4).map((inc) => (
                        <span key={inc} className="inline-flex items-center gap-1 text-[#484848] text-[10px] font-medium bg-[#F7F7F7] rounded-md px-2 py-0.5">
                          <i className="fa-solid fa-check text-emerald text-[7px]" />
                          {inc}
                        </span>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-semibold text-[#222]">&euro;{offer.rate_eur}</span>
                      <span className="text-sm text-[#717171]">/night</span>
                      <span className="text-xs line-through text-[#B0B0B0] ml-auto">&euro;{offer.base_rate_eur}</span>
                      <span className="text-xs font-semibold text-emerald bg-emerald/10 px-2 py-0.5 rounded-full">
                        -{savingsPct}%
                      </span>
                    </div>

                    {/* Select */}
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
