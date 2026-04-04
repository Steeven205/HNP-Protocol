"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";

interface LiveMessage {
  id: string;
  agent: string;
  type: string;
  timestamp: string;
  content: string;
  data?: Record<string, unknown>;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

export default function LiveNegotiationPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-navy-800 mb-4" />
      </div>
    }>
      <LiveNegotiationInner />
    </Suspense>
  );
}

function LiveNegotiationInner() {
  const searchParams = useSearchParams();
  const traveler = searchParams.get("traveler") ?? "Paul Martin";
  const destination = searchParams.get("destination") ?? "Paris";
  const check_in = searchParams.get("check_in") ?? "2026-05-12";
  const check_out = searchParams.get("check_out") ?? "2026-05-15";
  const budget = searchParams.get("budget") ?? "180";
  const purpose = searchParams.get("purpose") ?? "";

  const nights = Math.ceil(
    (new Date(check_out).getTime() - new Date(check_in).getTime()) / 86400000,
  );

  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [status, setStatus] = useState<string>("connecting");
  const [negId, setNegId] = useState<string>("");
  const [finalRate, setFinalRate] = useState<number | null>(null);
  const [savingsPct, setSavingsPct] = useState<number | null>(null);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [initialRate, setInitialRate] = useState<number | null>(null);

  const startRef = useRef(Date.now());
  const endRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  // Timer
  useEffect(() => {
    if (status === "confirmed" || status === "error") return;
    const i = setInterval(() => setElapsed(Math.round((Date.now() - startRef.current) / 100) / 10), 100);
    return () => clearInterval(i);
  }, [status]);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Start negotiation (once)
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    startRef.current = Date.now();

    async function run() {
      try {
        const res = await fetch("/api/negotiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ traveler, destination, check_in, check_out, budget, purpose }),
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
                if (parsed.negotiation_id) setNegId(parsed.negotiation_id);
                if (parsed.status) setStatus(parsed.status);
                if (parsed.final_rate) setFinalRate(parsed.final_rate);
                if (parsed.savings_pct) setSavingsPct(parsed.savings_pct);
                if (parsed.booking_ref) setBookingRef(parsed.booking_ref);
              } else {
                // It's a message
                const msg = parsed as LiveMessage;
                setMessages((prev) => [...prev, msg]);

                // Track initial rate from first hotel offer
                if (msg.type === "HOTEL_OFFER" && msg.data?.rate_eur) {
                  setInitialRate((prev) => prev ?? (msg.data!.rate_eur as number));
                }
              }
            } catch {
              // ignore parse errors
            }
          }
        }

        // Stream ended
        setStatus((s) => s === "in_progress" ? "confirmed" : s);
      } catch (err) {
        setStatus("error");
        setMessages((prev) => [...prev, {
          id: "err-catch",
          agent: "system",
          type: "SYSTEM",
          timestamp: new Date().toISOString(),
          content: `Error: ${err instanceof Error ? err.message : String(err)}`,
        }]);
      }
    }

    run();
  }, [traveler, destination, check_in, check_out, budget, purpose]);

  const currentRate = finalRate ?? initialRate ?? Number(budget);
  const savingsDisplay = savingsPct ?? (initialRate ? Math.round(((Number(budget) - initialRate) / Number(budget)) * 1000) / 10 : 0);
  const isInProgress = status === "in_progress" || status === "connecting";
  const isConfirmed = status === "confirmed";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <Link href="/negotiations" className="hover:text-navy-800 transition-colors">Negotiations</Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
        <span className="text-slate-900 font-medium">{negId || "Live"}</span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Live Negotiation</h1>
        <StatusBadge status={isConfirmed ? "confirmed" : isInProgress ? "in_progress" : "timeout"} />
        {isInProgress && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            LIVE
          </span>
        )}
      </div>

      <div className="flex gap-6">
        {/* Left: Chat */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-slate-200 shadow-soft">
              <i className="fa-solid fa-clock text-slate-400 text-sm" />
              <span className="text-sm text-slate-500">{traveler} &middot; {destination} &middot; {nights} night{nights !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-slate-200 shadow-soft">
              <i className="fa-solid fa-stopwatch text-navy-800 text-sm" />
              <span className="text-sm font-mono text-slate-700">{elapsed.toFixed(1)}s</span>
            </div>
          </div>

          <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 pb-4">
            {messages.map((msg) => {
              const isCorp = msg.agent === "corporate";
              const isSys = msg.agent === "system";
              const isOffer = msg.type === "HOTEL_OFFER";

              if (isSys) {
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
                <div key={msg.id} className={`flex ${isCorp ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] p-4 ${
                    isCorp
                      ? "bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm"
                      : "bg-sky-50 border border-sky-200 rounded-2xl rounded-tr-none shadow-sm"
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${isCorp ? "text-navy-800" : "text-sky-500"}`}>
                        {isCorp ? "Corporate Agent" : "Hotel Agent"}
                      </span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold rounded px-2.5 py-1 uppercase">
                        {msg.type.replace(/_/g, " ")}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{msg.content}</p>

                    {isOffer && msg.data && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.data.rate_eur != null && (
                          <span className="inline-flex items-center gap-1 bg-navy-50 text-navy-800 text-xs font-semibold rounded-lg px-2.5 py-1">
                            <i className="fa-solid fa-euro-sign text-[10px]" />
                            {String(msg.data.rate_eur)}/night
                          </span>
                        )}
                        {msg.data.hotel_name != null && (
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg px-2.5 py-1">
                            <i className="fa-solid fa-hotel text-[10px]" />
                            {String(msg.data.hotel_name)}
                          </span>
                        )}
                        {Array.isArray(msg.data.inclusions) && (msg.data.inclusions as string[]).map((inc) => (
                          <span key={inc} className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg px-2.5 py-1">
                            <i className="fa-solid fa-check text-[10px]" />
                            {inc.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                    )}

                    {msg.type === "CONFIRMATION" && msg.data && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="fa-solid fa-circle-check text-green-600 text-sm" />
                          <span className="text-sm font-semibold text-green-800">Booking Confirmed</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                          {msg.data.booking_ref != null && <span>Ref: {String(msg.data.booking_ref)}</span>}
                          {msg.data.total != null && <span>Total: {String(msg.data.total)}&nbsp;&euro;</span>}
                          {msg.data.savings_pct != null && <span>Savings: {String(msg.data.savings_pct)}%</span>}
                        </div>
                      </div>
                    )}

                    <p className="mt-2 text-[11px] text-slate-400">{formatTime(msg.timestamp)}</p>
                  </div>
                </div>
              );
            })}

            {isInProgress && (
              <div className="flex justify-end">
                <div className="bg-sky-50 border border-sky-200 rounded-2xl rounded-tr-none p-4 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-500 mb-2 block">AI Agents</span>
                  <div className="flex items-center gap-1.5">
                    <span className="typing-dot h-2 w-2 rounded-full bg-sky-400" />
                    <span className="typing-dot h-2 w-2 rounded-full bg-sky-400" />
                    <span className="typing-dot h-2 w-2 rounded-full bg-sky-400" />
                  </div>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>
        </div>

        {/* Right: Analytics */}
        <div className="w-[360px] shrink-0">
          <div className="sticky top-24 bg-white rounded-[16px] p-6 border border-slate-200 shadow-soft space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">Live Analytics</h2>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Rate</p>
              <div className="flex items-center gap-3">
                {initialRate && (
                  <>
                    <div className="text-center">
                      <p className="text-xs text-slate-400 mb-1">Base</p>
                      <p className="text-lg text-slate-400 line-through">{initialRate}&nbsp;&euro;</p>
                    </div>
                    <i className="fa-solid fa-arrow-right text-slate-300" />
                  </>
                )}
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">Current</p>
                  <p className="text-2xl font-bold text-navy-800">{currentRate}&nbsp;&euro;</p>
                </div>
                {savingsDisplay > 0 && (
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg px-2.5 py-1.5">
                      <i className="fa-solid fa-arrow-down text-[10px]" />
                      {savingsDisplay}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Duration</p>
                <p className="text-lg font-bold text-slate-900">{elapsed.toFixed(1)}s</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Human</p>
                <p className="text-lg font-bold text-green-600">No</p>
              </div>
            </div>

            {bookingRef && (
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Booking Reference</p>
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
                  <i className="fa-solid fa-circle-check text-green-600" />
                  <span className="text-sm font-mono font-semibold text-green-800">{bookingRef}</span>
                </div>
              </div>
            )}

            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Trip</p>
              <div className="text-sm text-slate-700 space-y-1">
                <p><i className="fa-solid fa-user text-slate-400 mr-2 w-4 text-center" />{traveler}</p>
                <p><i className="fa-solid fa-location-dot text-slate-400 mr-2 w-4 text-center" />{destination}</p>
                <p><i className="fa-solid fa-calendar text-slate-400 mr-2 w-4 text-center" />{check_in} → {check_out}</p>
                <p><i className="fa-solid fa-euro-sign text-slate-400 mr-2 w-4 text-center" />Budget: {budget}€/night</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
