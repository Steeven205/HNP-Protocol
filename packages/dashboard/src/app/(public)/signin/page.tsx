"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

/* ──────────────────────────────────────────────────────────────────────────────
   Sign In Page — split-screen with form + decorative right panel
   ────────────────────────────────────────────────────────────────────────────── */

/* Palette for the decorative grid cells */
const GRID_CELLS: {
  bg: string;
  content: React.ReactNode;
}[] = [
  {
    bg: "from-[#1A2942] to-[#0F1E35]",
    content: (
      <div className="flex h-full items-center justify-center">
        <div className="h-16 w-16 rounded-full border-2 border-emerald/30 bg-emerald/5" />
      </div>
    ),
  },
  {
    bg: "from-[#1e1145] to-[#0F1E35]",
    content: (
      <div className="flex h-full items-end justify-end p-4">
        <div className="h-12 w-12 rotate-45 rounded-md bg-purple/20" />
      </div>
    ),
  },
  {
    bg: "from-[#0F1E35] to-[#0c2a3a]",
    content: (
      <div className="flex h-full items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-cyan/30"
            style={{ opacity: 1 - i * 0.25 }}
          />
        ))}
      </div>
    ),
  },
  {
    bg: "from-[#0c2a3a] to-[#1A2942]",
    content: (
      <div className="flex h-full items-center justify-center">
        <div
          className="h-0 w-0"
          style={{
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderBottom: "34px solid rgba(14, 165, 233, 0.2)",
          }}
        />
      </div>
    ),
  },
  {
    bg: "from-[#1A2942] to-[#1e1145]",
    content: (
      <div className="flex h-full items-start justify-start p-4">
        <div className="h-10 w-20 rounded-full bg-gradient-to-r from-emerald/10 to-purple/10" />
      </div>
    ),
  },
  {
    bg: "from-[#0F1E35] to-[#1A2942]",
    content: (
      <div className="flex h-full items-center justify-center">
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-sm bg-white/10"
            />
          ))}
        </div>
      </div>
    ),
  },
];

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("s.martin@techcorp.fr");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      router.push("/corporate/dashboard");
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSSO(provider: string) {
    alert(`${provider} SSO coming soon`);
  }

  const emailHasValue = email.length > 0;
  const passwordHasValue = password.length > 0;

  return (
    <div className="flex min-h-screen bg-navy-deep text-slate-100 font-mono" style={{ background: "radial-gradient(ellipse at center, #1A2942, #0A1628)" }}>
      {/* ================================================================
          LEFT HALF — Sign-in form
      ================================================================ */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo / bolt */}
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2.5 no-underline"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
              <i className="fa-solid fa-bolt text-lg" />
            </div>
          </Link>

          {/* Title */}
          <h1 className="animate-fade-up font-display text-4xl font-bold text-white">
            Welcome back
          </h1>
          <p className="animate-fade-up delay-100 mt-2 text-sm text-white/50">
            Enter your details to access the platform.
          </p>

          {/* ── Form ──────────────────────────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            className="animate-fade-up delay-200 mt-10 flex flex-col gap-6"
          >
            {/* Email field with floating label */}
            <div className="relative">
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="form-input-glass peer w-full rounded-xl py-3.5 pl-11 pr-4 text-sm"
              />
              <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-white/30 transition-colors peer-focus:text-emerald" />
              <label
                htmlFor="email"
                className={`pointer-events-none absolute left-11 text-sm transition-all ${
                  emailFocused || emailHasValue
                    ? "-top-2.5 text-xs text-emerald bg-navy-deep px-1"
                    : "top-1/2 -translate-y-1/2 text-white/30"
                }`}
              >
                Email address
              </label>
            </div>

            {/* Password field with floating label + eye toggle */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="form-input-glass peer w-full rounded-xl py-3.5 pl-11 pr-12 text-sm"
              />
              <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-white/30 transition-colors peer-focus:text-emerald" />
              <label
                htmlFor="password"
                className={`pointer-events-none absolute left-11 text-sm transition-all ${
                  passwordFocused || passwordHasValue
                    ? "-top-2.5 text-xs text-emerald bg-navy-deep px-1"
                    : "top-1/2 -translate-y-1/2 text-white/30"
                }`}
              >
                Password
              </label>
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 border-none bg-transparent text-white/30 hover:text-white/60 transition-colors cursor-pointer"
              >
                <i
                  className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
                />
              </button>
            </div>

            {/* Remember device + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-sm text-white/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-emerald accent-emerald"
                />
                Remember device
              </label>
              <button
                type="button"
                className="border-none bg-transparent text-sm font-medium text-emerald hover:text-emerald-light transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red/20 bg-red/5 px-4 py-3 text-sm text-red">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-emerald flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold"
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* ── Divider ───────────────────────────────────────────────── */}
          <div className="animate-fade-up delay-300 my-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/30">Or continue with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* ── SSO Buttons ───────────────────────────────────────────── */}
          <div className="animate-fade-up delay-300 flex gap-3">
            <button
              type="button"
              onClick={() => handleSSO("Azure AD")}
              className="btn-outline flex flex-1 items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-medium cursor-pointer"
            >
              <i className="fa-brands fa-microsoft" />
              Azure AD / Microsoft
            </button>
            <button
              type="button"
              onClick={() => handleSSO("SAML")}
              className="btn-outline flex flex-1 items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-medium cursor-pointer"
            >
              <i className="fa-solid fa-key" />
              SSO / SAML
            </button>
          </div>

          {/* ── Bottom text ───────────────────────────────────────────── */}
          <p className="animate-fade-up delay-400 mt-8 text-center text-sm text-white/40">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="border-none bg-transparent font-medium text-emerald hover:text-emerald-light transition-colors cursor-pointer"
            >
              Request access
            </button>
          </p>
        </div>
      </div>

      {/* ================================================================
          RIGHT HALF — Decorative geometric panel (hidden on mobile)
      ================================================================ */}
      <div className="hidden w-1/2 flex-col items-center justify-center overflow-hidden lg:flex relative">
        {/* Abstract geometric grid */}
        <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-1 p-1">
          {GRID_CELLS.map((cell, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${cell.bg} rounded-lg relative overflow-hidden`}
            >
              {cell.content}
            </div>
          ))}
        </div>

        {/* Glass overlay card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass-panel rounded-2xl px-8 py-8 text-center max-w-xs">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
              <i className="fa-solid fa-shield-halved text-2xl" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Enterprise Security
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Bank-grade encryption protects every negotiation.
              Immutable audit trails, SOC2 certified, zero-trust
              architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
