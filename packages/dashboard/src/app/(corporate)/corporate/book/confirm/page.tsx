"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const steps = [
  { label: "Trip Details", icon: "fa-suitcase" },
  { label: "AI Negotiation", icon: "fa-robot" },
  { label: "Compare Offers", icon: "fa-scale-balanced" },
  { label: "Confirm", icon: "fa-circle-check" },
];

interface SelectedOffer {
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
  address: string;
  breakfast_included: boolean;
}

interface BookingRequest {
  traveler: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  roomType: string;
  purpose: string;
  budget: number;
}

export default function BookConfirmPage() {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const [offer, setOffer] = useState<SelectedOffer | null>(null);
  const [request, setRequest] = useState<BookingRequest | null>(null);

  useEffect(() => {
    try {
      const storedOffer = sessionStorage.getItem("selectedOffer");
      const storedRequest = sessionStorage.getItem("bookingRequest");
      if (storedOffer) setOffer(JSON.parse(storedOffer));
      if (storedRequest) setRequest(JSON.parse(storedRequest));
    } catch {
      // ignore parse errors
    }
  }, []);

  if (!offer || !request) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-xl border border-[#EBEBEB] p-10 text-center">
          <i className="fa-solid fa-circle-exclamation text-[#B0B0B0] text-3xl mb-4" />
          <h2 className="text-xl font-semibold text-[#222] mb-2">No booking in progress</h2>
          <p className="text-sm text-[#717171] mb-6">Start a new booking to continue.</p>
          <Link
            href="/corporate/book"
            className="inline-block bg-[#222] text-white hover:bg-black px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            <i className="fa-solid fa-plus mr-2" />
            Book Travel
          </Link>
        </div>
      </div>
    );
  }

  const nights =
    request.checkIn && request.checkOut
      ? Math.max(1, Math.round((new Date(request.checkOut).getTime() - new Date(request.checkIn).getTime()) / 86400000))
      : 1;

  const totalCost = offer.negotiated_rate * nights;
  const savingsPerNight = offer.base_rate - offer.negotiated_rate;
  const totalSavings = savingsPerNight * nights;
  const savingsPct = Math.round((savingsPerNight / offer.base_rate) * 100);

  // Build inclusions list from amenities
  const inclusions: string[] = [];
  if (offer.amenities?.includes("wifi")) inclusions.push("WiFi");
  if (offer.breakfast_included || offer.amenities?.includes("breakfast")) inclusions.push("Breakfast");
  if (offer.amenities?.includes("gym")) inclusions.push("Gym");
  if (offer.amenities?.includes("parking")) inclusions.push("Parking");
  if (offer.amenities?.includes("bar")) inclusions.push("Bar");
  if (offer.amenities?.includes("spa")) inclusions.push("Spa");
  if (offer.cancellation_policy) inclusions.push("Late checkout");

  const cancellationText = offer.cancellation_policy || "Free cancellation up to 24h before check-in";

  async function handleConfirm() {
    if (!offer || !request) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          traveler: request.traveler,
          destination: request.destination,
          hotel_id: offer.hotel_id,
          hotel_name: offer.name,
          check_in: request.checkIn,
          check_out: request.checkOut,
          nights,
          room_type: request.roomType,
          rack_rate: offer.base_rate,
          negotiated_rate: offer.negotiated_rate,
          total_cost: totalCost,
          inclusions,
          cancellation_policy: cancellationText,
          esg_tier: offer.esg_tier,
          stars: offer.stars,
          address: offer.address,
          district: offer.district || offer.arrondissement,
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert(`Booking failed: ${data.error}`);
        setSubmitting(false);
        return;
      }
      setBookingRef(data.booking_ref || "RF-XXXXX");
      setShowSuccess(true);
    } catch (err) {
      alert(`Booking failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => router.back()} className="w-8 h-8 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:border-[#111827] transition-colors">
          <i className="fa-solid fa-arrow-left text-xs" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Book Travel</h1>
          <p className="text-[#717171] mt-1">Step 4 of 4 — Confirm Booking</p>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                i < 3
                  ? "bg-emerald text-white"
                  : "bg-[#222] text-white"
              }`}>
                {i < 3 ? (
                  <i className="fa-solid fa-check text-xs" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-sm font-medium hidden sm:inline text-[#222]`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-12 h-px mx-3 bg-emerald" />
            )}
          </div>
        ))}
      </div>

      {!showSuccess ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Booking Summary Card */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
            <h2 className="text-lg font-semibold text-[#222] mb-6">Booking Summary</h2>

            <div className="flex items-start gap-6 mb-6">
              {/* Hotel photo placeholder */}
              <div className="w-32 h-24 rounded-xl bg-gradient-to-br from-[#F7F7F7] to-[#EBEBEB] flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-hotel text-2xl text-[#B0B0B0]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#222]">{offer.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: offer.stars }).map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-amber text-[9px]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#717171]">&middot;</span>
                  <span className="text-xs text-[#717171]">{offer.district || offer.arrondissement}, {request.destination}</span>
                  <span className="badge-emerald badge text-[10px] ml-2">
                    <i className="fa-solid fa-leaf text-[8px]" />
                    ESG {offer.esg_tier || "B"}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-[#484848]">
                  <span><i className="fa-solid fa-calendar-days text-emerald mr-1.5" />{request.checkIn} &rarr; {request.checkOut}</span>
                  <span><i className="fa-solid fa-moon text-emerald mr-1.5" />{nights} nights</span>
                  <span><i className="fa-solid fa-bed text-emerald mr-1.5" />{request.roomType}</span>
                </div>
              </div>
            </div>

            {/* Rate Breakdown */}
            <div className="bg-[#F7F7F7] rounded-xl p-5 mb-6">
              <h4 className="text-xs font-medium text-[#717171] uppercase tracking-wide mb-4">Rate Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#717171]">Rack Rate</span>
                  <span className="text-sm text-[#717171] line-through">&euro;{offer.base_rate}/night</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald font-medium">Rateflow Negotiated Rate</span>
                  <span className="text-sm text-emerald font-semibold">&euro;{offer.negotiated_rate}/night</span>
                </div>
                <div className="border-t border-[#EBEBEB] pt-3 flex items-center justify-between">
                  <span className="text-sm text-[#222] font-semibold">Total ({nights} nights)</span>
                  <span className="text-lg text-[#222] font-semibold">&euro;{totalCost}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald">You save</span>
                  <span className="text-sm font-semibold text-emerald">
                    &euro;{totalSavings} ({savingsPct}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <div className="mb-6">
              <h4 className="text-xs font-medium text-[#717171] uppercase tracking-wide mb-3">Inclusions</h4>
              <div className="flex flex-wrap gap-2">
                {inclusions.map((inc) => (
                  <span key={inc} className="inline-flex items-center gap-1.5 bg-emerald/10 text-emerald text-xs font-medium rounded-lg px-3 py-1.5">
                    <i className="fa-solid fa-check text-[8px]" />
                    {inc}
                  </span>
                ))}
              </div>
            </div>

            {/* Cancellation */}
            <div className="flex items-center gap-2 text-sm text-[#484848]">
              <i className="fa-solid fa-shield-halved text-emerald" />
              {cancellationText}
            </div>
          </div>

          {/* Policy Compliance */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
            <h3 className="text-base font-semibold text-[#222] mb-4">
              <i className="fa-solid fa-shield-halved text-emerald mr-2" />
              Policy Compliance
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Rate within budget", detail: `\u20AC${offer.negotiated_rate} < \u20AC${request.budget} max` },
                { label: "Category compliant", detail: `${offer.stars}-star (min 3-star)` },
                { label: "Cancellation policy OK", detail: "24h free cancellation" },
                { label: "ESG requirement met", detail: `Tier ${offer.esg_tier || "B"} (min Tier B)` },
              ].map((check) => (
                <div key={check.label} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-emerald text-[8px]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#222] font-medium">{check.label}</span>
                    <span className="text-[10px] text-[#717171] ml-1.5">{check.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terms + Confirm */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 rounded border border-[#EBEBEB] bg-white accent-emerald"
              />
              <span className="text-sm text-[#717171]">
                I accept the booking terms and corporate travel policy
              </span>
            </label>

            <button
              disabled={!termsAccepted || submitting}
              onClick={handleConfirm}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                termsAccepted && !submitting
                  ? "bg-[#222] text-white hover:bg-black"
                  : "bg-[#F7F7F7] text-[#B0B0B0] cursor-not-allowed"
              }`}
            >
              {submitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2" />
                  Confirming...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-lock mr-2" />
                  Confirm Booking
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Success State */
        <div className="max-w-lg mx-auto animate-fade-up">
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-10 text-center">
            {/* Checkmark */}
            <div className="w-20 h-20 rounded-full bg-emerald/15 flex items-center justify-center mx-auto mb-6">
              <div className="w-14 h-14 rounded-full bg-emerald/25 flex items-center justify-center">
                <i className="fa-solid fa-circle-check text-emerald text-3xl" />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-[#222] mb-2">Booking Confirmed!</h2>
            <p className="text-sm text-[#717171] mb-6">Your reservation has been secured at the AI-negotiated rate</p>

            <div className="bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] p-5 mb-6">
              <p className="text-xs text-[#717171] uppercase tracking-wide mb-1">Booking Reference</p>
              <p className="text-2xl font-semibold text-emerald font-mono">{bookingRef}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div>
                <p className="text-xs text-[#717171]">Hotel</p>
                <p className="text-sm text-[#222] font-medium mt-0.5">{offer.name}</p>
              </div>
              <div>
                <p className="text-xs text-[#717171]">Rate</p>
                <p className="text-sm text-[#222] font-medium mt-0.5">&euro;{offer.negotiated_rate}/night</p>
              </div>
              <div>
                <p className="text-xs text-[#717171]">Savings</p>
                <p className="text-sm text-emerald font-semibold mt-0.5">&euro;{totalSavings} saved</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/corporate/bookings")}
              className="bg-[#222] text-white hover:bg-black px-8 py-3 rounded-lg text-sm font-semibold transition-colors"
            >
              <i className="fa-solid fa-suitcase mr-2" />
              View My Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
