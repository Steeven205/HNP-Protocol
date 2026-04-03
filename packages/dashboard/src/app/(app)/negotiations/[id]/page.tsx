"use client";

import { useState, useEffect, useRef, Suspense, use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { negotiationDetail, type ChatMessage } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import type { NegotiationStatus } from "@/lib/mock-data";

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

function formatCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) return "00:00";
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const typeLabels: Record<string, string> = {
  TRAVEL_INTENT: "Travel Intent",
  HOTEL_OFFER: "Hotel Offer",
  COUNTER_PROPOSAL: "Counter Proposal",
  CONFIRMATION: "Confirmation",
  SYSTEM: "System",
};

// ─── Types for live session ──────────────────────────────────────────────────

interface LiveSession {
  id: string;
  status: string;
  traveler: string;
  destination: string;
  check_in: string;
  check_out: string;
  nights: number;
  budget: number;
  initial_rate: number | null;
  current_rate: number | null;
  final_rate: number | null;
  savings_pct: number | null;
  rounds: number;
  duration_s: number;
  booking_ref: string | null;
  messages: ChatMessage[];
}

// ─── Wrapper with Suspense ───────────────────────────────────────────────────

export default function NegotiationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-navy-600 mb-4" />
          <p className="text-slate-600 font-medium">Loading negotiation...</p>
        </div>
      </div>
    }>
      <NegotiationDetailInner params={params} />
    </Suspense>
  );
}

function NegotiationDetailInner({ params }: { params: Promise<{ id: string }> }) {
  const { id: negId } = use(params);
  const searchParams = useSearchParams();
  const isLive = searchParams.get("live") === "true";

  // ─── Live mode state ───────────────────────────────────────────────
  const [liveSession, setLiveSession] = useState<LiveSession | null>(null);
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const [sseError, setSseError] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Timer for elapsed time in live mode — stops when negotiation completes
  const liveStatus = liveSession?.status;
  useEffect(() => {
    if (!isLive || !connected) return;
    const isDone = liveStatus === "confirmed" || liveStatus === "escalated" || liveStatus === "error";
    if (isDone) return;
    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      setElapsed(Math.round((Date.now() - startTimeRef.current) / 100) / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [isLive, connected, liveStatus]);

  // SSE connection for live mode — with retry to wait for session creation
  useEffect(() => {
    if (!isLive || !negId) return;
    let cancelled = false;
    let es: EventSource | null = null;

    async function connect() {
      // Retry up to 10 times (5 seconds total) waiting for session to be ready
      for (let attempt = 0; attempt < 10; attempt++) {
        if (cancelled) return;

        const res = await fetch(`/api/negotiate/${negId}/events`);
        const contentType = res.headers.get("content-type") || "";

        if (contentType.includes("text/event-stream")) {
          // Session exists — connect SSE
          break;
        }
        // Session not found yet — wait and retry
        await new Promise((r) => setTimeout(r, 500));
      }

      if (cancelled) return;

      es = new EventSource(`/api/negotiate/${negId}/events`);

      es.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);

          if (payload.type === "init") {
            setLiveSession(payload.session);
            setLiveMessages(payload.session.messages || []);
            setConnected(true);
          } else if (payload.type === "message") {
            const msg = payload.data as ChatMessage;
            setLiveMessages((prev) => [...prev, msg]);
          } else if (payload.type === "update") {
            const patch = payload.data as Partial<LiveSession>;
            setLiveSession((prev) => prev ? { ...prev, ...patch } : prev);
          } else if (payload.type === "done") {
            es?.close();
          }
        } catch {
          // ignore parse errors
        }
      };

      es.onerror = () => {
        es?.close();
        if (!connected) setSseError(true);
      };
    }

    connect();

    return () => {
      cancelled = true;
      es?.close();
    };
  }, [isLive, negId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [liveMessages]);

  // ─── Determine data source ─────────────────────────────────────────
  const isLiveMode = isLive && liveSession;
  const neg = isLiveMode
    ? {
        id: liveSession.id,
        traveler: liveSession.traveler,
        destination: liveSession.destination,
        hotel: "Le Marais Boutique Hotel",
        hotel_id: "LMBH-PARIS-001",
        check_in: liveSession.check_in,
        check_out: liveSession.check_out,
        nights: liveSession.nights,
        status: liveSession.status as NegotiationStatus,
        budget: liveSession.budget,
        initial_rate: liveSession.initial_rate ?? 145,
        final_rate: liveSession.final_rate,
        current_rate: liveSession.current_rate,
        savings_pct: liveSession.savings_pct,
        duration_s: liveSession.duration_s || elapsed,
        esg_tier: "A",
        booking_ref: liveSession.booking_ref,
        rounds: liveSession.rounds,
      }
    : {
        ...negotiationDetail,
        current_rate: null as number | null,
        booking_ref: String(negotiationDetail.messages[negotiationDetail.messages.length - 1]?.data?.booking_ref ?? null),
        rounds: 2,
      };

  const messages = isLiveMode ? liveMessages : negotiationDetail.messages;

  // ─── Countdown timer ───────────────────────────────────────────────
  const [countdown, setCountdown] = useState(15 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timerExpired = countdown <= 0;

  // ─── Computed values ───────────────────────────────────────────────
  const initialRate = neg.initial_rate;
  const currentRate = neg.final_rate ?? neg.current_rate ?? initialRate;
  const savingsVsBudget = ((neg.budget - currentRate) / neg.budget * 100).toFixed(1);

  // Count real negotiation rounds from messages (1 round = 1 HOTEL_OFFER)
  const offerCount = messages.filter((m) => m.type === "HOTEL_OFFER").length;
  const currentRound = Math.max(1, Math.min(offerCount, 2));

  const isInProgress = neg.status === "in_progress" || neg.status === "connecting";
  const isConfirmed = neg.status === "confirmed";

  const policyChecks = [
    { label: `Rate ≤ budget (€${neg.budget})`, passed: currentRate <= neg.budget },
    { label: "Cancellation 24h free", passed: true },
    { label: "ESG Tier B+", passed: neg.esg_tier === "A" || neg.esg_tier === "B" },
  ];

  // ─── Loading / Error state ──────────────────────────────────────────
  if (isLive && !connected) {
    if (sseError) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <i className="fa-solid fa-circle-exclamation text-3xl text-red-500 mb-4" />
            <p className="text-slate-900 font-semibold mb-2">Session not found</p>
            <p className="text-sm text-slate-500 mb-4">The negotiation session {negId} may have expired (server restart).</p>
            <Link href="/negotiations/new" className="px-4 py-2 bg-navy-800 text-white rounded-xl text-sm font-medium hover:bg-navy-700 transition-colors">
              Start a New Negotiation
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-navy-600 mb-4" />
          <p className="text-slate-600 font-medium">Connecting to negotiation...</p>
          <p className="text-sm text-slate-400 mt-1">{negId}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <Link href="/negotiations" className="hover:text-navy-800 transition-colors">
          Negotiations
        </Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
        <span className="text-slate-900 font-medium">{neg.id}</span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Negotiation {neg.id}</h1>
        <StatusBadge status={isInProgress ? "in_progress" : isConfirmed ? "confirmed" : neg.status === "escalated" ? "escalated" : "timeout"} />
        {isLiveMode && isInProgress && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            LIVE
          </span>
        )}
        <Link
          href={`/negotiations/${neg.id}/choose`}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-navy-800 text-white text-sm font-semibold rounded-xl hover:bg-navy-700 transition-colors"
        >
          <i className="fa-solid fa-columns text-xs" />
          Compare Offers
        </Link>
      </div>

      <div className="flex gap-6">
        {/* Left: Chat Area */}
        <div className="flex-1 min-w-0">
          {/* Round Indicator */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-slate-200 shadow-soft">
              <i className="fa-solid fa-rotate text-navy-600 text-sm" />
              <span className="text-sm font-semibold text-slate-900">
                Round {currentRound} of 2
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-slate-200 shadow-soft">
              <i className="fa-solid fa-clock text-slate-400 text-sm" />
              <span className="text-sm text-slate-500">
                {neg.traveler} &middot; {neg.destination} &middot; {neg.nights} night{neg.nights !== 1 ? "s" : ""}
              </span>
            </div>
            {isLiveMode && (
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-slate-200 shadow-soft">
                <i className="fa-solid fa-stopwatch text-navy-600 text-sm" />
                <span className="text-sm font-mono text-slate-700">{elapsed.toFixed(1)}s</span>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 pb-4">
            {messages.map((msg) => {
              const isCorporate = msg.agent === "corporate";
              const isSystem = msg.agent === "system";
              const isHotelOffer = msg.type === "HOTEL_OFFER";

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center">
                    <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-xs font-medium rounded-full px-4 py-1.5">
                      <i className="fa-solid fa-circle-info text-[10px]" />
                      {msg.content}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex ${isCorporate ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] relative ${
                      isCorporate
                        ? "bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm"
                        : "bg-sky-50 border border-sky-200 rounded-2xl rounded-tr-none shadow-sm"
                    } p-4`}
                    style={isHotelOffer && isInProgress ? { boxShadow: "var(--shadow-offer-glow)" } : undefined}
                  >
                    {/* Active Offer Badge */}
                    {isHotelOffer && isInProgress && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 bg-sky text-white text-[10px] font-bold uppercase tracking-wider rounded-full px-3 py-1">
                          <i className="fa-solid fa-bolt text-[8px]" />
                          Active Offer
                        </span>
                        {timerExpired ? (
                          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Expired</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-navy-800">
                            <i className="fa-solid fa-stopwatch text-[8px] text-sky-500" />
                            {formatCountdown(countdown)} remaining
                          </span>
                        )}
                      </div>
                    )}

                    {/* Agent Label + Type */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${isCorporate ? "text-navy-600" : "text-sky-500"}`}>
                        {isCorporate ? "Corporate Agent" : "Hotel Agent"}
                      </span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold rounded px-2.5 py-1 uppercase">
                        {typeLabels[msg.type] ?? msg.type}
                      </span>
                    </div>

                    {/* Content */}
                    <p className="text-sm text-slate-700 leading-relaxed">{msg.content}</p>

                    {/* Data Pills */}
                    {msg.data && (msg.type === "HOTEL_OFFER") && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.data.rate_eur !== undefined && (
                          <span className="inline-flex items-center gap-1 bg-navy-50 text-navy-800 text-xs font-semibold rounded-lg px-2.5 py-1">
                            <i className="fa-solid fa-euro-sign text-[10px]" />
                            {String(msg.data.rate_eur)}/night
                          </span>
                        )}
                        {msg.data.room_type != null && (
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg px-2.5 py-1">
                            <i className="fa-solid fa-bed text-[10px]" />
                            {String(msg.data.room_type)}
                          </span>
                        )}
                        {Array.isArray(msg.data.inclusions) &&
                          (msg.data.inclusions as string[]).map((inc) => (
                            <span key={inc} className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg px-2.5 py-1">
                              <i className="fa-solid fa-check text-[10px]" />
                              {inc.replace(/_/g, " ")}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* Confirmation data */}
                    {msg.data && msg.type === "CONFIRMATION" && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="fa-solid fa-circle-check text-green-600 text-sm" />
                          <span className="text-sm font-semibold text-green-800">Booking Confirmed</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                          {msg.data.booking_ref && <span>Ref: {String(msg.data.booking_ref)}</span>}
                          {msg.data.total && <span>Total: {String(msg.data.total)}&nbsp;&euro;</span>}
                          {msg.data.savings_pct && <span>Savings: {String(msg.data.savings_pct)}%</span>}
                        </div>
                      </div>
                    )}

                    {/* Timestamp */}
                    <p className="mt-2 text-[11px] text-slate-400">{formatTimestamp(msg.timestamp)}</p>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isInProgress && (
              <div className="flex justify-end">
                <div className="bg-sky-50 border border-sky-200 rounded-2xl rounded-tr-none p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-500">
                      {isLiveMode ? "AI Agents" : "Hotel Agent"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="typing-dot h-2 w-2 rounded-full bg-sky-400" />
                    <span className="typing-dot h-2 w-2 rounded-full bg-sky-400" />
                    <span className="typing-dot h-2 w-2 rounded-full bg-sky-400" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Right: Analytics Panel */}
        <div className="w-[360px] shrink-0">
          <div className="sticky top-24 bg-white rounded-[16px] p-6 border border-slate-200 shadow-soft space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {isLiveMode ? "Live Analytics" : "Analytics"}
            </h2>

            {/* Rate Comparison */}
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Rate Evolution</p>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">Initial</p>
                  <p className="text-lg text-slate-400 line-through">{initialRate}&nbsp;&euro;</p>
                </div>
                <i className="fa-solid fa-arrow-right text-slate-300" />
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">Current</p>
                  <p className="text-2xl font-bold text-navy-800">{currentRate}&nbsp;&euro;</p>
                </div>
                {currentRate < neg.budget && (
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg px-2.5 py-1.5">
                      <i className="fa-solid fa-arrow-down text-[10px]" />
                      {savingsVsBudget}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Grid Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Savings</p>
                <p className="text-lg font-bold text-green-600">
                  {neg.savings_pct !== null ? `${neg.savings_pct}%` : `${savingsVsBudget}%`}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Rounds</p>
                <p className="text-lg font-bold text-slate-900">{currentRound}/2</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Duration</p>
                <p className="text-lg font-bold text-slate-900">
                  {isLiveMode ? `${elapsed.toFixed(1)}s` : `${neg.duration_s}s`}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Human</p>
                <p className="text-lg font-bold text-green-600">No</p>
              </div>
            </div>

            {/* Policy Compliance */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Policy Compliance</p>
              <div className="space-y-2.5">
                {policyChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-2.5">
                    {check.passed ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <i className="fa-solid fa-check text-[10px]" />
                      </span>
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <i className="fa-solid fa-xmark text-[10px]" />
                      </span>
                    )}
                    <span className="text-sm text-slate-700">{check.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Ref */}
            {isConfirmed && neg.booking_ref && (
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Booking Reference</p>
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
                  <i className="fa-solid fa-circle-check text-green-600" />
                  <span className="text-sm font-mono font-semibold text-green-800">{neg.booking_ref}</span>
                </div>
              </div>
            )}

            {/* Hotel Info */}
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Hotel</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                  <i className="fa-solid fa-hotel text-sm" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{neg.hotel}</p>
                  <p className="text-xs text-slate-500">{neg.destination} &middot; ESG {neg.esg_tier}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
