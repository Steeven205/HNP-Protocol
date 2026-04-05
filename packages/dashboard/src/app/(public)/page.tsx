"use client";

import { useState } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────────────
   Welcome & Workspace Selector
   ────────────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Integrations", href: "#integrations" },
  { label: "Security", href: "#security" },
] as const;

const HOTEL_FEATURES = [
  "AI Yield Configuration",
  "Real-time Negotiations",
  "PMS Integrations",
] as const;

const CORPORATE_FEATURES = [
  "Self-service Booking",
  "Automated Policy Enforcement",
  "Savings Analytics",
] as const;

const TRUST_ITEMS = [
  { icon: "fa-solid fa-certificate", label: "SOC2 Certified" },
  { icon: "fa-solid fa-link", label: "Immutable Audit Trail" },
  { icon: "fa-solid fa-signal", label: "99.9% Uptime" },
  { icon: "fa-solid fa-plug", label: "PMS & HRIS Integrations" },
] as const;

export default function WelcomePage() {
  const [domain, setDomain] = useState("");

  return (
    <div className="min-h-screen font-mono">
      {/* ================================================================
          HEADER / NAV
      ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
              <i className="fa-solid fa-bolt text-lg" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              Rateflow
            </span>
          </Link>

          {/* Nav links — hidden on mobile */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white no-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="text-sm font-medium text-white/60 transition-colors hover:text-white no-underline"
            >
              Sign In
            </Link>
            <a
              href="#demo"
              className="btn-emerald rounded-xl px-5 py-2.5 text-sm font-semibold no-underline"
            >
              Request Demo
            </a>
          </div>
        </div>
      </header>

      {/* ================================================================
          HERO
      ================================================================ */}
      <section className="flex flex-col items-center px-6 pt-36 pb-12 text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald animate-pulse-dot" />
          AI-Powered Negotiation Protocol
        </div>

        {/* Title */}
        <h1 className="animate-fade-up delay-100 mt-8 max-w-3xl font-display text-5xl font-bold leading-tight text-white md:text-6xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-emerald to-emerald-light bg-clip-text text-transparent">
            Rateflow
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up delay-200 mt-5 max-w-xl text-base leading-relaxed text-white/50">
          Select your workspace to begin. Two AI agents, one protocol
          &mdash; optimizing hotel rates in real time so you don&apos;t
          have to.
        </p>
      </section>

      {/* ================================================================
          WORKSPACE CARDS
      ================================================================ */}
      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-2">
        {/* Hotel Agent Card */}
        <div className="animate-fade-up delay-200 glass-card rounded-2xl p-8">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
            <i className="fa-solid fa-hotel text-2xl" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            Hotel Agent
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            For Revenue Managers &mdash; configure yield strategies,
            manage real-time negotiations, and connect your PMS.
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {HOTEL_FEATURES.map((feat) => (
              <li
                key={feat}
                className="flex items-center gap-3 text-sm text-white/70"
              >
                <i className="fa-solid fa-check text-emerald text-xs" />
                {feat}
              </li>
            ))}
          </ul>

          <Link
            href="/hotel/dashboard"
            className="btn-emerald mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold no-underline"
          >
            Enter Hotel Workspace
            <i className="fa-solid fa-arrow-right text-xs" />
          </Link>
        </div>

        {/* Corporate Agent Card */}
        <div className="animate-fade-up delay-300 glass-card rounded-2xl p-8">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
            <i className="fa-solid fa-building text-2xl" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            Corporate Agent
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            For Travel Managers &mdash; book hotels, enforce travel
            policy automatically, and track savings across your
            organization.
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {CORPORATE_FEATURES.map((feat) => (
              <li
                key={feat}
                className="flex items-center gap-3 text-sm text-white/70"
              >
                <i className="fa-solid fa-check text-emerald text-xs" />
                {feat}
              </li>
            ))}
          </ul>

          <Link
            href="/corporate/dashboard"
            className="btn-emerald mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold no-underline"
          >
            Enter Corporate Workspace
            <i className="fa-solid fa-arrow-right text-xs" />
          </Link>
        </div>
      </section>

      {/* ================================================================
          SSO SECTION
      ================================================================ */}
      <section className="mx-auto max-w-2xl px-6 pb-16">
        <div className="animate-fade-up delay-300 glass-panel rounded-2xl p-8 text-center">
          <h3 className="font-display text-xl font-bold text-white">
            Enterprise Single Sign-On
          </h3>
          <p className="mt-2 text-sm text-white/50">
            Access your workspace through your company&apos;s identity
            provider.
          </p>

          {/* Domain input */}
          <div className="mx-auto mt-6 flex max-w-md gap-3">
            <div className="relative flex-1">
              <i className="fa-solid fa-globe absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="yourcompany.com"
                className="form-input-glass w-full rounded-xl py-3 pl-10 pr-4 text-sm"
              />
            </div>
            <button
              type="button"
              className="btn-emerald shrink-0 rounded-xl px-6 py-3 text-sm font-semibold"
            >
              Continue with SSO
            </button>
          </div>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/30">
            <i className="fa-solid fa-lock" />
            Secure authentication via SAML / OAuth 2.0
          </p>
        </div>
      </section>

      {/* ================================================================
          TRUST BAR
      ================================================================ */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="animate-fade-up delay-400 grid grid-cols-2 gap-4 md:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] py-5 text-center"
            >
              <i className={`${item.icon} text-lg text-white/40`} />
              <span className="text-xs font-medium text-white/50">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          FOOTER
      ================================================================ */}
      <footer className="border-t border-white/5 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <span className="text-xs text-white/30">
            &copy; 2026 Rateflow Inc.
          </span>

          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-xs text-white/30 hover:text-white/60 transition-colors no-underline"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="text-xs text-white/30 hover:text-white/60 transition-colors no-underline"
            >
              Terms
            </a>
            <a
              href="#support"
              className="text-xs text-white/30 hover:text-white/60 transition-colors no-underline"
            >
              Support
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/30">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald animate-pulse-dot" />
            System Status: Operational
          </div>
        </div>
      </footer>
    </div>
  );
}
