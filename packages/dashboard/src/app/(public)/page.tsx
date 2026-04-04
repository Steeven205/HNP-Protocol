"use client";

import { useState } from "react";
import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";

function L({ k, lang }: { k: keyof typeof t; lang: Lang }) {
  return <>{t[k][lang]}</>;
}

export default function WelcomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const l = (k: keyof typeof t) => t[k][lang];

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-white font-bold text-sm">R</div>
              <span className="text-xl font-bold tracking-tight text-navy-800">Rateflow</span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-navy-600 bg-navy-50 rounded-lg"><L k="nav_welcome" lang={lang} /></Link>
              <Link href="/signin" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"><L k="nav_signin" lang={lang} /></Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <i className="fa-solid fa-globe text-xs" />
              {lang === "en" ? "FR" : "EN"}
            </button>
            <Link href="#demo" className="hidden md:block text-sm font-medium text-slate-600 hover:text-navy-800 transition-colors"><L k="nav_demo" lang={lang} /></Link>
            <Link href="/signin" className="px-5 py-2.5 bg-navy-800 hover:bg-navy-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors">
              <L k="nav_signin_btn" lang={lang} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden" style={{ background: "radial-gradient(circle at 50% 0%, rgba(135,206,250,0.12) 0%, transparent 70%)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-600 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-navy-600 animate-pulse" />
            <L k="hero_badge" lang={lang} />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            <L k="hero_title_1" lang={lang} /><br />
            <span className="bg-gradient-to-r from-navy-800 to-sky-500 bg-clip-text text-transparent">
              <L k="hero_title_2" lang={lang} />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            <L k="hero_subtitle" lang={lang} />
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signin" className="w-full sm:w-auto px-8 py-4 bg-navy-800 hover:bg-navy-700 text-white text-base font-semibold rounded-xl shadow-glow transition-all flex items-center justify-center gap-2">
              <L k="hero_cta_1" lang={lang} />
              <i className="fa-solid fa-arrow-right text-sm" />
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-base font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2">
              <L k="hero_cta_2" lang={lang} />
              <i className="fa-regular fa-circle-play text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Problem ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center"><L k="problem_title" lang={lang} /></h2>
          <p className="text-lg text-slate-500 text-center max-w-2xl mx-auto mb-14"><L k="problem_subtitle" lang={lang} /></p>

          <div className="grid md:grid-cols-2 gap-6">
            {([
              { icon: "fa-calendar-xmark", color: "bg-red-50 text-red-600", title: l("problem_1_title"), text: l("problem_1_text") },
              { icon: "fa-table-cells", color: "bg-orange-50 text-orange-600", title: l("problem_2_title"), text: l("problem_2_text") },
              { icon: "fa-user-clock", color: "bg-amber-50 text-amber-600", title: l("problem_3_title"), text: l("problem_3_text") },
              { icon: "fa-chart-line-down", color: "bg-rose-50 text-rose-600", title: l("problem_4_title"), text: l("problem_4_text") },
            ]).map((item) => (
              <div key={item.icon} className="flex gap-4 p-6 rounded-[16px] border border-slate-200 bg-white shadow-soft">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                  <i className={`fa-solid ${item.icon} text-base`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Visa Analogy ───────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium mb-6">
            <i className="fa-solid fa-lightbulb text-amber-500" />
            <L k="analogy_badge" lang={lang} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"><L k="analogy_title" lang={lang} /></h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12">{l("analogy_text")}</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-[16px] p-6 border border-slate-200 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center text-lg mx-auto mb-4"><i className="fa-solid fa-building" /></div>
              <p className="text-sm font-semibold text-slate-900 mb-1"><L k="analogy_corporate" lang={lang} /></p>
              <p className="text-xs text-slate-500"><L k="analogy_corporate_sub" lang={lang} /></p>
            </div>
            <div className="bg-white rounded-[16px] p-6 border border-navy-200 shadow-soft relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-navy-800 text-white text-[10px] font-bold uppercase rounded-full tracking-wider">Protocol</div>
              <div className="w-12 h-12 rounded-xl bg-navy-800 text-white flex items-center justify-center text-lg mx-auto mb-4"><i className="fa-solid fa-handshake" /></div>
              <p className="text-sm font-semibold text-slate-900 mb-1">Rateflow</p>
              <p className="text-xs text-slate-500"><L k="analogy_protocol_sub" lang={lang} /></p>
            </div>
            <div className="bg-white rounded-[16px] p-6 border border-slate-200 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg mx-auto mb-4"><i className="fa-solid fa-hotel" /></div>
              <p className="text-sm font-semibold text-slate-900 mb-1"><L k="analogy_hotel" lang={lang} /></p>
              <p className="text-xs text-slate-500"><L k="analogy_hotel_sub" lang={lang} /></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits: Two-sided ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4"><L k="benefits_title" lang={lang} /></h2>
          <p className="text-lg text-slate-500 text-center max-w-2xl mx-auto mb-14"><L k="benefits_subtitle" lang={lang} /></p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-[16px] border border-slate-200 bg-white p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center"><i className="fa-solid fa-building text-base" /></div>
                <h3 className="text-xl font-bold text-slate-900"><L k="benefits_corporate" lang={lang} /></h3>
              </div>
              <ul className="space-y-4">
                {([
                  { icon: "fa-piggy-bank", title: l("b_corp_1"), text: l("b_corp_1t") },
                  { icon: "fa-clock", title: l("b_corp_2"), text: l("b_corp_2t") },
                  { icon: "fa-shield-check", title: l("b_corp_3"), text: l("b_corp_3t") },
                  { icon: "fa-chart-pie", title: l("b_corp_4"), text: l("b_corp_4t") },
                  { icon: "fa-arrow-up-right-dots", title: l("b_corp_5"), text: l("b_corp_5t") },
                ]).map((item) => (
                  <li key={item.icon} className="flex gap-3">
                    <i className={`fa-solid ${item.icon} text-navy-600 mt-0.5`} />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[16px] border border-sky-200 bg-sky-50/30 p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center"><i className="fa-solid fa-hotel text-base" /></div>
                <h3 className="text-xl font-bold text-slate-900"><L k="benefits_hotel" lang={lang} /></h3>
              </div>
              <ul className="space-y-4">
                {([
                  { icon: "fa-arrow-trend-up", title: l("b_hotel_1"), text: l("b_hotel_1t") },
                  { icon: "fa-users-gear", title: l("b_hotel_2"), text: l("b_hotel_2t") },
                  { icon: "fa-bullseye", title: l("b_hotel_3"), text: l("b_hotel_3t") },
                  { icon: "fa-handshake", title: l("b_hotel_4"), text: l("b_hotel_4t") },
                  { icon: "fa-plug", title: l("b_hotel_5"), text: l("b_hotel_5t") },
                ]).map((item) => (
                  <li key={item.icon} className="flex gap-3">
                    <i className={`fa-solid ${item.icon} text-sky-600 mt-0.5`} />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How the Protocol Works ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"><L k="how_title" lang={lang} /></h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed"><L k="how_subtitle" lang={lang} /></p>

              <div className="space-y-8">
                {([
                  { step: "1", bg: "bg-navy-800 text-white", title: l("how_1"), desc: l("how_1t") },
                  { step: "2", bg: "bg-sky text-slate-900", title: l("how_2"), desc: l("how_2t") },
                  { step: "3", bg: "bg-amber-400 text-slate-900", title: l("how_3"), desc: l("how_3t") },
                  { step: "4", bg: "bg-green-500 text-white", title: l("how_4"), desc: l("how_4t") },
                ]).map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center font-bold shrink-0 text-sm`}>{item.step}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: live protocol visualization (stays in English — technical) */}
            <div className="flex-1 w-full">
              <div className="bg-white rounded-[16px] border border-slate-200 shadow-xl p-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-navy-800 text-white flex items-center justify-center text-xs"><i className="fa-solid fa-building" /></div>
                    <span className="font-semibold text-sm">Corp Agent</span>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 bg-green-50 text-green-700 rounded-full"><i className="fa-solid fa-circle-check mr-1" />Confirmed</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">Hotel Agent</span>
                    <div className="w-8 h-8 rounded-lg bg-sky text-slate-800 flex items-center justify-center text-xs"><i className="fa-solid fa-hotel" /></div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 w-4/5">
                    <span className="text-navy-600 font-bold text-[11px] block mb-1">TRAVEL_INTENT</span>
                    <span className="text-slate-600">Sophie Chen &middot; Paris &middot; May 8&ndash;10 &middot; Budget: 180&euro;/nt</span>
                  </div>
                  <div className="bg-sky-50 p-3 rounded-xl border border-sky-100 w-4/5 ml-auto text-right">
                    <span className="text-sky-700 font-bold text-[11px] block mb-1">HOTEL_OFFER</span>
                    <span className="text-slate-600">145&euro;/nt &middot; Standard &middot; WiFi + Late checkout &middot; ESG A</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 w-4/5">
                    <span className="text-navy-600 font-bold text-[11px] block mb-1">COUNTER_PROPOSAL</span>
                    <span className="text-slate-600">127 nights YTD leverage &middot; Target: 130&euro;/nt + breakfast</span>
                  </div>
                  <div className="bg-sky-50 p-3 rounded-xl border border-sky-100 w-4/5 ml-auto text-right">
                    <span className="text-sky-700 font-bold text-[11px] block mb-1">REVISED_OFFER</span>
                    <span className="text-slate-600">132&euro;/nt &middot; Breakfast J1 included &middot; 24h cancellation</span>
                  </div>
                  <div className="bg-green-50 p-3 rounded-xl border border-green-200 w-full text-center">
                    <span className="text-green-700 font-bold text-[11px] block mb-1">CONFIRMATION</span>
                    <span className="text-green-700 font-medium">BK-LMBH-SC0508 &middot; 132&euro;/nt &times; 2 = 264&euro; &middot; 26.7% savings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Numbers ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-navy-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12"><L k="stats_title" lang={lang} /></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {([
              { value: "<30s", label: l("stats_1") },
              { value: "15-35%", label: l("stats_2") },
              { value: "0", label: l("stats_3") },
              { value: "SHA-256", label: l("stats_4") },
            ]).map((stat) => (
              <div key={stat.value}>
                <p className="text-4xl font-bold text-sky mb-2">{stat.value}</p>
                <p className="text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Demo ──────────────────────────────────────────────────── */}
      <section id="demo" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[16px] border border-slate-100 bg-slate-50 p-8">
            <h2 className="text-center text-2xl font-bold text-slate-900"><L k="demo_title" lang={lang} /></h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-500"><L k="demo_subtitle" lang={lang} /></p>

            <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4">
              <div className="flex justify-start">
                <div className="max-w-md rounded-[16px] border border-slate-200 bg-white px-5 py-4 shadow-soft">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-navy-50 text-navy-600"><i className="fa-solid fa-building text-xs" /></span>
                    <span className="text-xs font-semibold text-navy-800">Corporate Agent</span>
                    <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Travel Intent</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    Sophie Chen (CTO) &mdash; Paris, Le Marais Boutique Hotel.
                    2 nights, May 8&ndash;10. Budget: 180&euro;/night.
                    Corporate Gold, 127 nights YTD.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-md rounded-[16px] border border-sky-200 bg-sky-50 px-5 py-4 shadow-soft">
                  <div className="mb-2 flex items-center gap-2 justify-end">
                    <span className="text-[10px] uppercase font-bold bg-sky-100 text-sky-700 px-2 py-0.5 rounded">Hotel Offer</span>
                    <span className="text-xs font-semibold text-navy-800">Hotel Agent</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-100 text-sky-600"><i className="fa-solid fa-hotel text-xs" /></span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    145&euro;/nt &rarr; adjusted to <strong>132&euro;/nt</strong> (gold -12%, 2 nights -8%).
                    WiFi + late checkout + breakfast Day 1. 24h free cancellation. ESG Tier A.
                  </p>
                </div>
              </div>
              <div className="flex justify-center pt-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-5 py-2.5 text-sm font-medium text-green-700">
                  <i className="fa-solid fa-circle-check" />
                  Confirmed &mdash; 132&euro;/night &middot; 26.7% savings &middot; 2 rounds &middot; 18.4s &middot; 0 humans
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4"><L k="cta_title" lang={lang} /></h2>
          <p className="text-lg text-slate-600 mb-8"><L k="cta_subtitle" lang={lang} /></p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signin" className="px-8 py-4 bg-navy-800 hover:bg-navy-700 text-white text-base font-semibold rounded-xl shadow-glow transition-all"><L k="cta_btn_1" lang={lang} /></Link>
            <Link href="mailto:steve@kairion.be" className="px-8 py-4 border border-slate-300 hover:border-navy-800 text-slate-700 hover:text-navy-800 text-base font-semibold rounded-xl transition-all"><L k="cta_btn_2" lang={lang} /></Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-white font-bold text-sm">R</div>
                <span className="font-bold text-xl text-slate-900">Rateflow</span>
              </div>
              <p className="text-slate-500 max-w-sm text-sm leading-relaxed">{l("footer_desc")}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 text-sm"><L k="footer_product" lang={lang} /></h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><Link href="/negotiations" className="hover:text-navy-800 transition-colors">Dashboard</Link></li>
                <li><Link href="/audit" className="hover:text-navy-800 transition-colors">Audit Trail</Link></li>
                <li><Link href="/configuration" className="hover:text-navy-800 transition-colors">Configuration</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 text-sm"><L k="footer_company" lang={lang} /></h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><span className="hover:text-navy-800 transition-colors cursor-pointer"><L k="footer_about" lang={lang} /></span></li>
                <li><span className="hover:text-navy-800 transition-colors cursor-pointer"><L k="footer_security" lang={lang} /></span></li>
                <li><span className="hover:text-navy-800 transition-colors cursor-pointer"><L k="footer_privacy" lang={lang} /></span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">&copy; 2026 Kairion &middot; Rateflow. All rights reserved.</p>
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"><i className="fa-brands fa-linkedin-in text-sm" /></span>
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"><i className="fa-brands fa-x-twitter text-sm" /></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
