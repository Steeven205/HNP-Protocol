"use client";

import { useState } from "react";
import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";

type TKey = keyof typeof t;

function T({ k, lang }: { k: TKey; lang: Lang }) {
  return <>{t[k][lang]}</>;
}

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const l = (k: TKey) => t[k][lang];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ================================================================
          NAV
      ================================================================ */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[68px] flex items-center justify-between px-6 bg-white/90 backdrop-blur-[20px] border-b border-[#E2E6F0]">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 bg-navy-800 rounded-[10px] flex items-center justify-center text-white font-display font-extrabold text-lg">R</div>
          <span className="font-display font-bold text-lg text-navy-800">Rateflow.ai</span>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          {(
            [
              { href: "#features", label: "nav_features" },
              { href: "#protocol", label: "nav_protocol" },
              { href: "#shadow", label: "nav_shadow" },
              { href: "#connectors", label: "nav_integrations" },
              { href: "#audit", label: "nav_security" },
            ] as const
          ).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#4A5568] px-3.5 py-2 rounded-lg hover:text-navy-800 hover:bg-[#F0F2F7] transition-all no-underline"
            >
              {l(item.label)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <div className="flex bg-[#F0F2F7] rounded-full p-[3px] gap-0.5">
            <button
              onClick={() => setLang("en")}
              className={`text-xs font-semibold px-3 py-[5px] rounded-full border-none cursor-pointer transition-all ${
                lang === "en"
                  ? "bg-white text-navy-800 shadow-card"
                  : "bg-transparent text-[#8892AA]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`text-xs font-semibold px-3 py-[5px] rounded-full border-none cursor-pointer transition-all ${
                lang === "fr"
                  ? "bg-white text-navy-800 shadow-card"
                  : "bg-transparent text-[#8892AA]"
              }`}
            >
              FR
            </button>
          </div>
          <a
            href="#cta"
            className="hidden sm:inline-flex items-center gap-2 bg-navy-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl border-none cursor-pointer no-underline hover:bg-navy-dark hover:-translate-y-px transition-all"
          >
            <i className="fa-solid fa-calendar" />
            {l("nav_request_demo")}
          </a>
        </div>
      </nav>

      {/* ================================================================
          HERO
      ================================================================ */}
      <section
        className="pt-[140px] pb-20 overflow-hidden relative"
        style={{
          background: "linear-gradient(160deg, #FAFBFF 0%, #EEF3FF 40%, #E8F5FF 100%)",
        }}
      >
        {/* decorative radial */}
        <div className="absolute -top-[100px] -right-[200px] w-[600px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(135,206,250,0.2) 0%, transparent 70%)" }} />

        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy-800 bg-[rgba(0,0,122,0.06)] border border-[rgba(0,0,122,0.12)] px-3.5 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse-dot" />
              <T k="hero_badge" lang={lang} />
            </div>

            <h1 className="font-display font-extrabold text-[clamp(2.4rem,5vw,4rem)] leading-[1.15] mb-6">
              <T k="hero_title" lang={lang} />
            </h1>

            <p className="text-lg text-[#4A5568] mb-9 leading-[1.7] max-w-[480px]">
              <T k="hero_subtitle" lang={lang} />
            </p>

            <div className="flex gap-3.5 flex-wrap mb-12">
              <a
                href="#cta"
                className="inline-flex items-center gap-2.5 bg-navy-800 text-white text-[15px] font-medium px-7 py-3.5 rounded-xl border-none cursor-pointer no-underline hover:bg-navy-dark hover:-translate-y-0.5 hover:shadow-card-md transition-all"
              >
                {l("hero_cta_pilot")}
                <i className="fa-solid fa-arrow-right" />
              </a>
              <a
                href="#protocol"
                className="inline-flex items-center gap-2.5 bg-white text-navy-800 text-[15px] font-medium px-7 py-3.5 rounded-xl border-[1.5px] border-[#E2E6F0] cursor-pointer no-underline hover:border-navy-800 hover:bg-off-white hover:-translate-y-px transition-all"
              >
                <i className="fa-solid fa-play" />
                {l("hero_cta_action")}
              </a>
            </div>

            <div className="flex gap-8">
              {[
                { val: "<30s", label: "hero_stat_1_label" as TKey },
                { val: "15\u201335%", label: "hero_stat_2_label" as TKey },
                { val: "0", label: "hero_stat_3_label" as TKey },
              ].map((s) => (
                <div key={s.val}>
                  <div className="font-display text-[26px] font-extrabold text-navy-800">{s.val}</div>
                  <div className="text-[13px] text-[#8892AA] mt-0.5">{l(s.label)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Negotiation Widget */}
          <div className="bg-white rounded-[32px] border-[1.5px] border-[#E2E6F0] shadow-card-lg overflow-hidden">
            {/* Widget header */}
            <div className="bg-navy-800 px-5 py-4 flex items-center justify-between">
              <span className="text-white text-[13px] font-semibold tracking-[0.04em]">{l("widget_title")}</span>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-sky">
                <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse-dot" />
                {l("widget_status")}
              </span>
            </div>

            {/* Widget body */}
            <div className="p-5">
              {/* Agent badges */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[rgba(0,0,122,0.06)] border border-[rgba(0,0,122,0.12)]">
                  <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-white text-sm"><i className="fa-solid fa-building" /></div>
                  <div>
                    <div className="text-xs font-semibold">{l("widget_corp_agent")}</div>
                    <div className="text-[10px] text-[#8892AA] mt-px">TechCorp SAS — Travel AI</div>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-[#F0F2F7] rounded-full text-[10px] font-bold text-[#4A5568] tracking-[0.06em] whitespace-nowrap">
                  HNP Protocol
                </div>
                <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[rgba(135,206,250,0.12)] border border-[rgba(135,206,250,0.25)]">
                  <div className="w-8 h-8 rounded-lg bg-sky-dark flex items-center justify-center text-white text-sm"><i className="fa-solid fa-hotel" /></div>
                  <div>
                    <div className="text-xs font-semibold">{l("widget_hotel_agent")}</div>
                    <div className="text-[10px] text-[#8892AA] mt-px">Le Marais — Revenue AI</div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-2.5 mb-4">
                <div className="max-w-[85%] self-start px-3.5 py-2.5 rounded-xl bg-[rgba(0,0,122,0.05)] border border-[rgba(0,0,122,0.1)] text-xs leading-relaxed">
                  <div className="text-[10px] font-bold tracking-[0.08em] text-navy-800 mb-1">TRAVEL_INTENT</div>
                  {l("widget_msg_intent")}
                </div>
                <div className="max-w-[85%] self-end px-3.5 py-2.5 rounded-xl bg-[rgba(135,206,250,0.12)] border border-[rgba(135,206,250,0.25)] text-xs leading-relaxed">
                  <div className="text-[10px] font-bold tracking-[0.08em] text-sky-dark mb-1">HOTEL_OFFER</div>
                  {l("widget_msg_offer")}
                </div>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] border border-[#A7F3D0] rounded-xl px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#065F46]">{l("widget_confirmed")}</span>
                  <span className="font-display text-lg font-extrabold text-[#059669]">{"\u20AC"}116/night</span>
                </div>
                <div className="flex gap-4 mt-2">
                  {[
                    { icon: "fa-clock", text: "26.6s" },
                    { icon: "fa-arrow-trend-down", text: "-35.6% " + l("widget_vs_budget") },
                    { icon: "fa-user-slash", text: l("widget_humans") },
                    { icon: "fa-shield", text: "SHA-256" },
                  ].map((m) => (
                    <span key={m.icon} className="text-[10px] text-[#059669] flex items-center gap-1">
                      <i className={`fa-solid ${m.icon}`} />
                      {m.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROBLEM
      ================================================================ */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-[#f87171] bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] px-3.5 py-1.5 rounded-full mb-5">
              <i className="fa-solid fa-triangle-exclamation" />
              <T k="problem_badge" lang={lang} />
            </div>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white mb-4">
              <T k="problem_title" lang={lang} />
            </h2>
            <p className="text-lg text-[#94A3B8] max-w-[560px] mx-auto">
              <T k="problem_subtitle" lang={lang} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.06)] rounded-[20px] overflow-hidden">
            {(
              [
                { emoji: "\uD83D\uDCC5", titleK: "problem_1_title" as TKey, textK: "problem_1_text" as TKey },
                { emoji: "\uD83D\uDCCA", titleK: "problem_2_title" as TKey, textK: "problem_2_text" as TKey },
                { emoji: "\uD83D\uDEA7", titleK: "problem_3_title" as TKey, textK: "problem_3_text" as TKey },
                { emoji: "\uD83D\uDCB8", titleK: "problem_4_title" as TKey, textK: "problem_4_text" as TKey },
              ]
            ).map((c) => (
              <div key={c.titleK} className="bg-gray-900 p-7 hover:bg-[#1a1d30] transition-colors">
                <div className="text-2xl mb-5">{c.emoji}</div>
                <h4 className="font-display text-base font-semibold text-white mb-2.5">{l(c.titleK)}</h4>
                <p className="text-sm text-[#64748B] leading-[1.65]">{l(c.textK)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          VISA ANALOGY
      ================================================================ */}
      <section className="py-24 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-[#0A6699] bg-[rgba(135,206,250,0.15)] border border-[rgba(135,206,250,0.3)] px-3.5 py-1.5 rounded-full mb-5">
              <i className="fa-solid fa-lightbulb" />
              <T k="analogy_badge" lang={lang} />
            </div>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] mb-4">
              <T k="analogy_title" lang={lang} />
            </h2>
            <p className="text-lg text-[#4A5568] max-w-[560px] mx-auto">
              <T k="analogy_subtitle" lang={lang} />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-center max-w-[880px] mx-auto">
            {/* Corporate side */}
            <div className="bg-white border-[1.5px] border-[#E2E6F0] rounded-[20px] p-8 shadow-card">
              <div className="w-14 h-14 rounded-xl bg-[rgba(0,0,122,0.08)] text-navy-800 flex items-center justify-center text-2xl mb-4">
                <i className="fa-solid fa-building" />
              </div>
              <h4 className="font-display font-bold mb-2">{l("analogy_corp_title")}</h4>
              <p className="text-[13px] text-[#8892AA]">{l("analogy_corp_text")}</p>
            </div>

            {/* Center protocol */}
            <div className="px-8 py-6 lg:py-0 text-center">
              <div className="text-[#E2E6F0] text-xl mb-2 hidden lg:block">{"\u2190"}</div>
              <div className="bg-navy-800 text-white px-6 py-7 rounded-[20px] min-w-[160px]">
                <h4 className="font-display text-lg font-extrabold text-sky mb-2">HNP Protocol</h4>
                <p className="text-[11px] text-white/60">{l("analogy_protocol_sub")}</p>
                <div className="mt-4 flex flex-col gap-1.5">
                  {["TRAVEL_INTENT", "HOTEL_OFFER", "COUNTER_PROPOSAL", "CONFIRMATION"].map((p) => (
                    <div key={p} className="text-[11px] bg-white/[0.08] px-2.5 py-[5px] rounded-md text-white/70">
                      {p}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[#E2E6F0] text-xl mt-2 hidden lg:block">{"\u2192"}</div>
            </div>

            {/* Hotel side */}
            <div className="bg-white border-[1.5px] border-[#E2E6F0] rounded-[20px] p-8 shadow-card">
              <div className="w-14 h-14 rounded-xl bg-[rgba(135,206,250,0.2)] text-sky-dark flex items-center justify-center text-2xl mb-4">
                <i className="fa-solid fa-hotel" />
              </div>
              <h4 className="font-display font-bold mb-2">{l("analogy_hotel_title")}</h4>
              <p className="text-[13px] text-[#8892AA]">{l("analogy_hotel_text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          BENEFITS TWO-SIDED
      ================================================================ */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy-800 bg-[rgba(0,0,122,0.06)] border border-[rgba(0,0,122,0.12)] px-3.5 py-1.5 rounded-full mb-5">
              <i className="fa-solid fa-users" />
              <T k="benefits_badge" lang={lang} />
            </div>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] mb-4">
              <T k="benefits_title" lang={lang} />
            </h2>
            <p className="text-lg text-[#4A5568] max-w-[560px] mx-auto">
              <T k="benefits_subtitle" lang={lang} />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Corporate card */}
            <div className="rounded-[32px] overflow-hidden border-[1.5px] border-[#E2E6F0]">
              <div className="p-8 bg-gradient-to-br from-navy-800 to-[#2244AA]">
                <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center text-2xl text-white mb-4">
                  <i className="fa-solid fa-briefcase" />
                </div>
                <h3 className="font-display text-[22px] font-semibold text-white mb-1.5">{l("benefits_corp_title")}</h3>
                <p className="text-sm text-white/65">{l("benefits_corp_sub")}</p>
              </div>
              <div className="bg-white p-7">
                <ul className="flex flex-col gap-[18px] list-none">
                  {(
                    [
                      { k: "b_corp_1", kt: "b_corp_1t" },
                      { k: "b_corp_2", kt: "b_corp_2t" },
                      { k: "b_corp_3", kt: "b_corp_3t" },
                      { k: "b_corp_4", kt: "b_corp_4t" },
                      { k: "b_corp_5", kt: "b_corp_5t" },
                    ] as { k: TKey; kt: TKey }[]
                  ).map((item) => (
                    <li key={item.k} className="flex gap-3.5 items-start">
                      <div className="w-6 h-6 rounded-full bg-[rgba(0,0,122,0.08)] text-navy-800 flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                        <i className="fa-solid fa-check" />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold mb-1">{l(item.k)}</h5>
                        <p className="text-[13px] text-[#8892AA] leading-[1.55]">{l(item.kt)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hotel card */}
            <div className="rounded-[32px] overflow-hidden border-[1.5px] border-[#E2E6F0]">
              <div className="p-8 bg-gradient-to-br from-[#0A6699] to-sky-dark">
                <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center text-2xl text-white mb-4">
                  <i className="fa-solid fa-hotel" />
                </div>
                <h3 className="font-display text-[22px] font-semibold text-white mb-1.5">{l("benefits_hotel_title")}</h3>
                <p className="text-sm text-white/65">{l("benefits_hotel_sub")}</p>
              </div>
              <div className="bg-white p-7">
                <ul className="flex flex-col gap-[18px] list-none">
                  {(
                    [
                      { k: "b_hotel_1", kt: "b_hotel_1t" },
                      { k: "b_hotel_2", kt: "b_hotel_2t" },
                      { k: "b_hotel_3", kt: "b_hotel_3t" },
                      { k: "b_hotel_4", kt: "b_hotel_4t" },
                      { k: "b_hotel_5", kt: "b_hotel_5t" },
                    ] as { k: TKey; kt: TKey }[]
                  ).map((item) => (
                    <li key={item.k} className="flex gap-3.5 items-start">
                      <div className="w-6 h-6 rounded-full bg-[rgba(135,206,250,0.2)] text-sky-dark flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                        <i className="fa-solid fa-check" />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold mb-1">{l(item.k)}</h5>
                        <p className="text-[13px] text-[#8892AA] leading-[1.55]">{l(item.kt)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROTOCOL STEPS
      ================================================================ */}
      <section id="protocol" className="py-24 bg-navy-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-sky bg-[rgba(135,206,250,0.12)] border border-[rgba(135,206,250,0.25)] px-3.5 py-1.5 rounded-full mb-5">
              <i className="fa-solid fa-diagram-project" />
              <T k="protocol_badge" lang={lang} />
            </div>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white mb-4">
              <T k="protocol_title" lang={lang} />
            </h2>
            <p className="text-lg text-white/60 max-w-[560px] mx-auto">
              <T k="protocol_subtitle" lang={lang} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5">
            {(
              [
                { num: "01", tag: "CORPORATE \u2192 HOTEL", tagClass: "bg-[rgba(0,0,122,0.4)] text-sky border border-[rgba(135,206,250,0.2)]", title: "TRAVEL_INTENT", textK: "protocol_1_text" as TKey },
                { num: "02", tag: "HOTEL \u2192 CORPORATE", tagClass: "bg-[rgba(135,206,250,0.12)] text-sky border border-[rgba(135,206,250,0.2)]", title: "HOTEL_OFFER", textK: "protocol_2_text" as TKey },
                { num: "03", tag: "CORPORATE \u2192 HOTEL", tagClass: "bg-[rgba(0,0,122,0.4)] text-sky border border-[rgba(135,206,250,0.2)]", title: "COUNTER_PROPOSAL", textK: "protocol_3_text" as TKey },
                { num: "04", tag: "BOTH PARTIES", tagClass: "bg-[rgba(52,211,153,0.12)] text-[#6EE7B7] border border-[rgba(52,211,153,0.2)]", title: "CONFIRMATION", textK: "protocol_4_text" as TKey },
              ]
            ).map((step) => (
              <div key={step.num} className="bg-white/[0.04] border border-white/[0.08] rounded-[20px] p-6">
                <div className="font-display text-5xl font-extrabold text-white/[0.06] leading-none mb-4">{step.num}</div>
                <span className={`inline-block text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded mb-3 ${step.tagClass}`}>
                  {step.tag}
                </span>
                <h4 className="font-display text-base font-bold text-white mb-2.5">{step.title}</h4>
                <p className="text-[13px] text-white/50 leading-[1.65]">{l(step.textK)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          OTA COMMISSION OFFSET
      ================================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-[#0A6699] bg-[rgba(135,206,250,0.15)] border border-[rgba(135,206,250,0.3)] px-3.5 py-1.5 rounded-full mb-5">
              <i className="fa-solid fa-rotate" />
              <T k="ota_badge" lang={lang} />
            </div>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] mb-4">
              <T k="ota_title" lang={lang} />
            </h2>
            <p className="text-lg text-[#4A5568] max-w-[560px] mx-auto">
              <T k="ota_subtitle" lang={lang} />
            </p>
          </div>

          <div className="max-w-[900px] mx-auto">
            {/* Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-start mb-10">
              {/* OTA side */}
              <div className="bg-off-white border-[1.5px] border-[#E2E6F0] rounded-[20px] p-7">
                <div className="font-display text-sm font-bold mb-5 flex items-center gap-2">
                  <i className="fa-solid fa-xmark text-[#DC2626]" />
                  {l("ota_via_ota")}
                </div>
                <div className="text-[13px] text-[#8892AA] mb-1.5">{l("ota_public_rate")}</div>
                <div className="font-display text-4xl font-extrabold text-[#DC2626] my-2">
                  {"\u20AC"}150<span className="text-base font-normal">/night</span>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex justify-between items-center text-[13px] py-1.5 border-b border-black/[0.06]">
                    <span className="text-[#4A5568]">{l("ota_commission")}</span>
                    <span className="font-semibold text-[#DC2626]">-{"\u20AC"}30</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] py-1.5 border-b border-black/[0.06]">
                    <span className="text-[#4A5568]">{l("ota_hotel_net")}</span>
                    <span className="font-semibold text-gray-900">{"\u20AC"}120</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] py-1.5">
                    <span className="text-[#4A5568]">{l("ota_corp_pays")}</span>
                    <span className="font-semibold text-gray-900">{"\u20AC"}150</span>
                  </div>
                </div>
              </div>

              {/* VS pill */}
              <div className="flex items-center justify-center">
                <div className="bg-navy-800 text-white font-display text-[13px] font-bold px-4 py-2.5 rounded-full">VS</div>
              </div>

              {/* Rateflow side */}
              <div className="bg-gradient-to-br from-[#EEFFEE] to-[#D1FAE5] border-[1.5px] border-[#A7F3D0] rounded-[20px] p-7">
                <div className="font-display text-sm font-bold mb-5 flex items-center gap-2">
                  <i className="fa-solid fa-check text-[#059669]" />
                  {l("ota_via_rateflow")}
                </div>
                <div className="text-[13px] text-[#065F46] mb-1.5">{l("ota_negotiated_rate")}</div>
                <div className="font-display text-4xl font-extrabold text-[#059669] my-2">
                  {"\u20AC"}128<span className="text-base font-normal text-[#059669]">/night</span>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex justify-between items-center text-[13px] py-1.5 border-b border-black/[0.06]">
                    <span className="text-[#4A5568]">{l("ota_commission_zero")}</span>
                    <span className="font-semibold text-[#059669]">{"\u20AC"}0</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] py-1.5 border-b border-black/[0.06]">
                    <span className="text-[#4A5568]">{l("ota_rateflow_fee")}</span>
                    <span className="font-semibold text-[#92400E]">-{"\u20AC"}5</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] py-1.5 border-b border-black/[0.06]">
                    <span className="text-[#4A5568]">{l("ota_hotel_net")}</span>
                    <span className="font-semibold text-[#059669]">{"\u20AC"}123 (+{"\u20AC"}3)</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] py-1.5">
                    <span className="text-[#4A5568]">{l("ota_corp_pays")}</span>
                    <span className="font-semibold text-[#059669]">{"\u20AC"}128 (-{"\u20AC"}22)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Callout */}
            <div className="bg-gradient-to-br from-navy-800 to-[#1a3aaa] rounded-[20px] p-8 text-white flex items-center gap-6">
              <div className="text-[40px] opacity-80 shrink-0">{"\uD83D\uDCA1"}</div>
              <div>
                <h4 className="font-display text-xl font-bold text-sky mb-2">{l("ota_callout_title")}</h4>
                <p className="text-sm text-white/70 leading-[1.65]">{l("ota_callout_text")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ONBOARDING
      ================================================================ */}
      <section className="py-24 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy-800 bg-[rgba(0,0,122,0.06)] border border-[rgba(0,0,122,0.12)] px-3.5 py-1.5 rounded-full mb-5">
              <i className="fa-solid fa-rocket" />
              <T k="onboarding_badge" lang={lang} />
            </div>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] mb-4">
              <T k="onboarding_title" lang={lang} />
            </h2>
            <p className="text-lg text-[#4A5568] max-w-[560px] mx-auto">
              <T k="onboarding_subtitle" lang={lang} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(
              [
                {
                  num: "1",
                  time: "5 min",
                  titleK: "onboard_1_title" as TKey,
                  textK: "onboard_1_text" as TKey,
                  items: ["onboard_1_a", "onboard_1_b", "onboard_1_c"] as TKey[],
                },
                {
                  num: "2",
                  time: "10 min",
                  titleK: "onboard_2_title" as TKey,
                  textK: "onboard_2_text" as TKey,
                  items: ["onboard_2_a", "onboard_2_b", "onboard_2_c"] as TKey[],
                },
                {
                  num: "3",
                  time: "5 min",
                  titleK: "onboard_3_title" as TKey,
                  textK: "onboard_3_text" as TKey,
                  items: ["onboard_3_a", "onboard_3_b", "onboard_3_c"] as TKey[],
                },
              ]
            ).map((card) => (
              <div key={card.num} className="bg-white rounded-[20px] p-8 border-[1.5px] border-[#E2E6F0] shadow-card relative">
                <div className="w-12 h-12 bg-navy-800 text-white rounded-full flex items-center justify-center font-display text-xl font-extrabold mb-5">
                  {card.num}
                </div>
                <div className="absolute top-7 right-7 text-xs font-semibold text-sky-dark bg-[rgba(135,206,250,0.12)] px-2.5 py-1 rounded-full">
                  {card.time}
                </div>
                <h4 className="font-display text-lg font-bold mb-2.5">{l(card.titleK)}</h4>
                <p className="text-sm text-[#8892AA] mb-5 leading-relaxed">{l(card.textK)}</p>
                <div className="flex flex-col gap-2">
                  {card.items.map((ik) => (
                    <div key={ik} className="flex items-center gap-2.5 text-[13px] text-[#4A5568]">
                      <i className="fa-solid fa-check text-[#059669] text-xs" />
                      {l(ik)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SHADOW MODE
      ================================================================ */}
      <section id="shadow" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy-800 bg-[rgba(0,0,122,0.06)] border border-[rgba(0,0,122,0.12)] px-3.5 py-1.5 rounded-full mb-5">
              <i className="fa-regular fa-eye-slash" />
              <T k="shadow_badge" lang={lang} />
            </div>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] mb-4">
              <T k="shadow_title" lang={lang} />
            </h2>
            <p className="text-lg text-[#4A5568] max-w-[560px] mx-auto">
              <T k="shadow_subtitle" lang={lang} />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual chart */}
            <div className="bg-gray-900 rounded-[32px] p-8 overflow-hidden">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] bg-[rgba(251,191,36,0.12)] text-[#FCD34D] border border-[rgba(251,191,36,0.2)] px-3 py-[5px] rounded-full mb-5">
                <i className="fa-regular fa-eye-slash" />
                SHADOW MODE
              </div>
              <div className="text-[13px] text-white/40 mb-5">{l("shadow_sim_label")}</div>

              {/* Legend */}
              <div className="flex gap-2 mb-2 text-[11px]">
                <span className="w-9" />
                <span className="text-white/25">{l("shadow_paid")}</span>
                <span className="ml-auto text-[#6EE7B7]">{l("shadow_via_rateflow")}</span>
              </div>

              {/* Bars */}
              {[
                { label: "Jan", amount: "\u20AC4,200", saving: "-\u20AC630", width: "100%", type: "paid" },
                { label: "Feb", amount: "\u20AC3,800", saving: "-\u20AC570", width: "100%", type: "paid" },
                { label: "Mar", amount: "\u20AC5,100", saving: "-\u20AC765", width: "100%", type: "paid" },
                { label: lang === "fr" ? "Avr" : "Apr", amount: "\u20AC3,690", saving: "-\u20AC810", width: "82%", type: "hnp" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-white/40 w-9">{row.label}</span>
                  <div className="flex-1 h-7 bg-white/[0.04] rounded-md overflow-hidden relative">
                    <div
                      className={`h-full rounded-md flex items-center px-2.5 ${
                        row.type === "paid"
                          ? "bg-[rgba(100,116,139,0.3)]"
                          : "bg-gradient-to-r from-[rgba(52,211,153,0.5)] to-[rgba(52,211,153,0.3)]"
                      }`}
                      style={{ width: row.width }}
                    >
                      <span
                        className={`text-[11px] font-semibold ${
                          row.type === "paid" ? "text-white/50" : "text-[#6EE7B7]"
                        }`}
                      >
                        {row.amount}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-[#6EE7B7]">{row.saving}</span>
                  </div>
                </div>
              ))}

              {/* Q1 total */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex justify-between items-center">
                <span className="text-xs text-white/35">{l("shadow_q1_label")}</span>
                <span className="font-display text-2xl font-extrabold text-[#6EE7B7]">{"\u20AC"}2,775</span>
              </div>
            </div>

            {/* Right text */}
            <div>
              <div className="font-display text-[56px] font-extrabold text-navy-800 leading-none my-4">
                <span className="text-[#059669]">{"\u20AC"}2,775</span>
                <br />
                saved in Q1
              </div>
              <p className="text-[15px] text-[#8892AA] mb-8">{l("shadow_big_text")}</p>

              {(
                [
                  { icon: "fa-shield-halved", titleK: "shadow_bullet_1_title" as TKey, textK: "shadow_bullet_1_text" as TKey },
                  { icon: "fa-chart-line", titleK: "shadow_bullet_2_title" as TKey, textK: "shadow_bullet_2_text" as TKey },
                  { icon: "fa-bolt", titleK: "shadow_bullet_3_title" as TKey, textK: "shadow_bullet_3_text" as TKey },
                ]
              ).map((bullet) => (
                <div key={bullet.icon} className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-[rgba(0,0,122,0.06)] rounded-lg flex items-center justify-center text-sm text-navy-800 shrink-0">
                    <i className={`fa-solid ${bullet.icon}`} />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold mb-1">{l(bullet.titleK)}</h5>
                    <p className="text-[13px] text-[#8892AA] leading-[1.55]">{l(bullet.textK)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CONNECTORS
      ================================================================ */}
      <section id="connectors" className="py-24 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy-800 bg-[rgba(0,0,122,0.06)] border border-[rgba(0,0,122,0.12)] px-3.5 py-1.5 rounded-full mb-5">
              <i className="fa-solid fa-plug" />
              <T k="connectors_badge" lang={lang} />
            </div>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] mb-4">
              <T k="connectors_title" lang={lang} />
            </h2>
            <p className="text-lg text-[#4A5568] max-w-[560px] mx-auto">
              <T k="connectors_subtitle" lang={lang} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {(
              [
                {
                  priorityK: "conn_1_priority" as TKey,
                  logoLetter: "D",
                  logoBg: "bg-[#003087]",
                  name: "D-EDGE",
                  countK: "conn_1_count" as TKey,
                  textK: "conn_1_text" as TKey,
                  tags: ["Channel Manager", "CRS", "Booking Engine", "REST API"],
                },
                {
                  priorityK: "conn_2_priority" as TKey,
                  logoLetter: "S",
                  logoBg: "bg-[#E8140A]",
                  name: "SiteMinder",
                  countK: "conn_2_count" as TKey,
                  textK: "conn_2_text" as TKey,
                  tags: ["Channel Manager", "GDS", "450+ channels", "REST API"],
                },
                {
                  priorityK: "conn_3_priority" as TKey,
                  logoLetter: "M",
                  logoBg: "bg-[#1A1A1A]",
                  name: "Mews",
                  countK: "conn_3_count" as TKey,
                  textK: "conn_3_text" as TKey,
                  tags: ["PMS Direct", "Rate Plans", "Real-time", "Validated"],
                },
              ]
            ).map((card) => (
              <div key={card.name} className="bg-white border-[1.5px] border-[#E2E6F0] rounded-[20px] p-7 shadow-card">
                <div className="inline-block text-[11px] font-bold tracking-[0.08em] text-navy-800 bg-[rgba(0,0,122,0.06)] border border-[rgba(0,0,122,0.12)] px-2.5 py-1 rounded-full mb-4">
                  {l(card.priorityK)}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${card.logoBg} text-white flex items-center justify-center font-display font-extrabold text-lg`}>
                    {card.logoLetter}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg">{card.name}</h4>
                    <div className="text-[13px] text-[#8892AA]">{l(card.countK)}</div>
                  </div>
                </div>
                <p className="text-[13px] text-[#8892AA] mb-4 leading-relaxed">{l(card.textK)}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {card.tags.map((tag) => (
                    <span key={tag} className="text-[11px] bg-[#F0F2F7] text-[#4A5568] px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-[#8892AA] text-sm">
            <i className="fa-solid fa-circle-info mr-2" />
            {l("connectors_more")}
          </div>
        </div>
      </section>

      {/* ================================================================
          STATS
      ================================================================ */}
      <section className="py-24 bg-navy-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] rounded-[32px] overflow-hidden">
            {(
              [
                { num: "<30s", textK: "stats_1" as TKey },
                { num: "15\u201335%", textK: "stats_2" as TKey },
                { num: "0", textK: "stats_3" as TKey },
                { num: "~\u20AC500B", textK: "stats_4" as TKey },
              ]
            ).map((stat) => (
              <div key={stat.num} className="bg-navy-800 px-8 py-10 text-center hover:bg-white/[0.04] transition-colors">
                <div className="font-display text-5xl font-extrabold text-sky leading-none mb-3">{stat.num}</div>
                <div className="text-sm text-white/55 leading-relaxed">{l(stat.textK)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          AUDIT TRAIL
      ================================================================ */}
      <section id="audit" className="py-24 bg-gray-900">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-sky bg-[rgba(135,206,250,0.12)] border border-[rgba(135,206,250,0.25)] px-3.5 py-1.5 rounded-full mb-5">
              <i className="fa-solid fa-shield-halved" />
              <T k="audit_badge" lang={lang} />
            </div>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white mb-4">
              <T k="audit_title" lang={lang} />
            </h2>
            <p className="text-lg text-white/55 max-w-[560px] mx-auto">
              <T k="audit_subtitle" lang={lang} />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Audit trail demo */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-[20px] overflow-hidden">
              <div className="bg-white/[0.04] px-5 py-4 flex items-center justify-between border-b border-white/[0.06]">
                <span className="text-[13px] font-semibold text-white">{l("audit_trail_label")}</span>
                <span className="text-[11px] text-[#6EE7B7] font-semibold">{"\u2713"} VERIFIED</span>
              </div>

              {(
                [
                  { type: "TRAVEL_INTENT", color: "#60A5FA", hash: "sha256:3fc00244f2ae...", time: "09:00:00.181" },
                  { type: "HOTEL_OFFER", color: "#34D399", hash: "sha256:60e07ce81fdd...", time: "09:00:06.656" },
                  { type: "COUNTER_PROPOSAL", color: "#FBBF24", hash: "sha256:a4b1c8d3e9f2...", time: "09:00:11.903" },
                  { type: "CONFIRMATION", color: "#6EE7B7", hash: "sha256:70f3c36e56fb...", time: "09:00:16.638" },
                ]
              ).map((entry) => (
                <div key={entry.type} className="flex items-center gap-3.5 px-5 py-3.5 border-b border-white/[0.04] last:border-b-0">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: entry.color }} />
                  <span className="text-[11px] font-bold tracking-[0.06em] w-[130px] shrink-0" style={{ color: entry.color }}>
                    {entry.type}
                  </span>
                  <span className="font-mono text-[11px] text-white/30">{entry.hash}</span>
                  <span className="text-[11px] text-white/25 ml-auto whitespace-nowrap">{entry.time}</span>
                </div>
              ))}

              <div className="px-5 py-4 border-t border-white/[0.06]">
                <div className="text-[11px] text-white/30 mb-1.5">{l("audit_session_hash")}</div>
                <div className="font-mono text-[11px] text-white/40">sha256:8cf0f1e439a90e4b920c2b88d7f3...</div>
              </div>
            </div>

            {/* Audit benefits */}
            <div className="flex flex-col gap-5">
              {(
                [
                  { icon: "fa-lock", bg: "rgba(96,165,250,0.1)", color: "#60A5FA", titleK: "audit_b1_title" as TKey, textK: "audit_b1_text" as TKey },
                  { icon: "fa-file-invoice", bg: "rgba(52,211,153,0.1)", color: "#34D399", titleK: "audit_b2_title" as TKey, textK: "audit_b2_text" as TKey },
                  { icon: "fa-chart-bar", bg: "rgba(251,191,36,0.1)", color: "#FBBF24", titleK: "audit_b3_title" as TKey, textK: "audit_b3_text" as TKey },
                  { icon: "fa-user-shield", bg: "rgba(167,139,250,0.1)", color: "#A78BFA", titleK: "audit_b4_title" as TKey, textK: "audit_b4_text" as TKey },
                ]
              ).map((benefit) => (
                <div key={benefit.icon} className="flex gap-4 p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center text-base shrink-0"
                    style={{ background: benefit.bg, color: benefit.color }}
                  >
                    <i className={`fa-solid ${benefit.icon}`} />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-1.5">{l(benefit.titleK)}</h5>
                    <p className="text-[13px] text-white/45 leading-[1.55]">{l(benefit.textK)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
      ================================================================ */}
      <section
        id="cta"
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #00007A 0%, #0A2870 100%)" }}
      >
        <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(135,206,250,0.15) 0%, transparent 70%)" }} />

        <div className="max-w-[1200px] mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-sky bg-[rgba(135,206,250,0.12)] border border-[rgba(135,206,250,0.25)] px-3.5 py-1.5 rounded-full mb-5">
            <i className="fa-solid fa-handshake" />
            <T k="cta_badge" lang={lang} />
          </div>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white mb-4">
            <T k="cta_title" lang={lang} />
          </h2>
          <p className="text-lg text-white/65 max-w-[520px] mx-auto mb-10">
            <T k="cta_subtitle" lang={lang} />
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:hello@rateflow.ai" className="inline-flex items-center gap-2.5 bg-white text-navy-800 text-[15px] font-medium px-7 py-3.5 rounded-xl border-none cursor-pointer no-underline hover:bg-sky-light transition-all">
              <i className="fa-solid fa-hotel" />
              {l("cta_hotel")}
            </a>
            <a href="mailto:hello@rateflow.ai" className="inline-flex items-center gap-2.5 bg-white text-navy-800 text-[15px] font-medium px-7 py-3.5 rounded-xl border-none cursor-pointer no-underline hover:bg-sky-light transition-all">
              <i className="fa-solid fa-briefcase" />
              {l("cta_corporate")}
            </a>
            <a href="mailto:hello@rateflow.ai" className="inline-flex items-center gap-2.5 bg-transparent text-white text-[15px] font-medium px-7 py-3.5 rounded-xl border-[1.5px] border-white/35 cursor-pointer no-underline hover:bg-white/10 hover:border-white transition-all">
              <i className="fa-solid fa-chart-line" />
              {l("cta_investor")}
            </a>
          </div>
          <p className="text-white/35 text-[13px] mt-6">{l("cta_built_by")}</p>
        </div>
      </section>

      {/* ================================================================
          FOOTER
      ================================================================ */}
      <footer className="bg-gray-900 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
            {/* Brand col */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-navy-800 rounded-lg flex items-center justify-center text-white font-display font-extrabold text-base">R</div>
                <span className="font-display text-base font-bold text-white">Rateflow.ai</span>
              </div>
              <p className="text-[13px] text-white/35 leading-[1.7] mb-5">{l("footer_desc")}</p>
              <div className="flex gap-2.5">
                {["fa-linkedin-in", "fa-x-twitter", "fa-github"].map((icon) => (
                  <a key={icon} href="#" className="w-8 h-8 bg-white/[0.06] rounded-lg flex items-center justify-center text-white/40 text-[13px] no-underline hover:bg-white/10 hover:text-white transition-all">
                    <i className={`fa-brands ${icon}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Product col */}
            <div>
              <h5 className="font-display text-sm font-bold text-white mb-4">{l("footer_product")}</h5>
              <ul className="list-none flex flex-col gap-2.5">
                {(
                  [
                    { href: "#features", k: "footer_for_corporates" as TKey },
                    { href: "#features", k: "footer_for_hotels" as TKey },
                    { href: "#protocol", k: "footer_hnp_protocol" as TKey },
                    { href: "#shadow", k: "footer_shadow_mode" as TKey },
                    { href: "#connectors", k: "footer_integrations" as TKey },
                  ]
                ).map((link) => (
                  <li key={link.k}>
                    <a href={link.href} className="text-[13px] text-white/40 no-underline hover:text-white transition-colors">
                      {l(link.k)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company col */}
            <div>
              <h5 className="font-display text-sm font-bold text-white mb-4">{l("footer_company")}</h5>
              <ul className="list-none flex flex-col gap-2.5">
                {(
                  [
                    { k: "footer_about" as TKey },
                    { k: "footer_minddesk" as TKey },
                    { k: "footer_xenia" as TKey },
                    { k: "footer_contact" as TKey },
                  ]
                ).map((link) => (
                  <li key={link.k}>
                    <a href="#" className="text-[13px] text-white/40 no-underline hover:text-white transition-colors">
                      {l(link.k)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal col */}
            <div>
              <h5 className="font-display text-sm font-bold text-white mb-4">{l("footer_legal")}</h5>
              <ul className="list-none flex flex-col gap-2.5">
                {(
                  [
                    { href: "#", k: "footer_terms" as TKey },
                    { href: "#", k: "footer_privacy" as TKey },
                    { href: "#", k: "footer_gdpr" as TKey },
                    { href: "#audit", k: "footer_security" as TKey },
                  ]
                ).map((link) => (
                  <li key={link.k}>
                    <a href={link.href} className="text-[13px] text-white/40 no-underline hover:text-white transition-colors">
                      {l(link.k)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.08] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">{"\u00A9"} 2026 Rateflow.ai {"\u00B7"} Kairion SRL {"\u00B7"} Brussels, Belgium</p>
            <p className="text-xs text-white/25">{l("footer_ecosystem")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
