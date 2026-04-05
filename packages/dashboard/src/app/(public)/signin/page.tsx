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
    <div className="flex min-h-screen bg-white">
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
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald text-white">
              <i className="fa-solid fa-bolt text-lg" />
            </div>
          </Link>

          {/* Title */}
          <h1 className="animate-fade-up font-display text-4xl font-bold text-slate-900">
            Welcome back
          </h1>
          <p className="animate-fade-up delay-100 mt-2 text-sm text-slate-500">
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
                className="peer w-full rounded-xl border border-[#E2E8F0] bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald focus:ring-2 focus:ring-emerald/10 focus:outline-none"
              />
              <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 transition-colors peer-focus:text-emerald" />
              <label
                htmlFor="email"
                className={`pointer-events-none absolute left-11 text-sm transition-all ${
                  emailFocused || emailHasValue
                    ? "-top-2.5 text-xs text-emerald bg-white px-1"
                    : "top-1/2 -translate-y-1/2 text-slate-400"
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
                className="peer w-full rounded-xl border border-[#E2E8F0] bg-white py-3.5 pl-11 pr-12 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald focus:ring-2 focus:ring-emerald/10 focus:outline-none"
              />
              <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 transition-colors peer-focus:text-emerald" />
              <label
                htmlFor="password"
                className={`pointer-events-none absolute left-11 text-sm transition-all ${
                  passwordFocused || passwordHasValue
                    ? "-top-2.5 text-xs text-emerald bg-white px-1"
                    : "top-1/2 -translate-y-1/2 text-slate-400"
                }`}
              >
                Password
              </label>
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 border-none bg-transparent text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <i
                  className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
                />
              </button>
            </div>

            {/* Remember device + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 bg-white text-emerald accent-emerald"
                />
                Remember device
              </label>
              <button
                type="button"
                className="border-none bg-transparent text-sm font-medium text-emerald hover:text-emerald-dark transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-dark hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
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
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">Or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* ── SSO Buttons ───────────────────────────────────────────── */}
          <div className="animate-fade-up delay-300 flex gap-3">
            <button
              type="button"
              onClick={() => handleSSO("Azure AD")}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-[#E2E8F0] bg-white py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-emerald cursor-pointer"
            >
              <i className="fa-brands fa-microsoft" />
              Azure AD / Microsoft
            </button>
            <button
              type="button"
              onClick={() => handleSSO("SAML")}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-[#E2E8F0] bg-white py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-emerald cursor-pointer"
            >
              <i className="fa-solid fa-key" />
              SSO / SAML
            </button>
          </div>

          {/* ── Bottom text ───────────────────────────────────────────── */}
          <p className="animate-fade-up delay-400 mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="border-none bg-transparent font-medium text-emerald hover:text-emerald-dark transition-colors cursor-pointer"
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
          <div className="rounded-2xl bg-white/90 backdrop-blur-sm px-8 py-8 text-center max-w-xs shadow-lg">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
              <i className="fa-solid fa-shield-halved text-2xl" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              Enterprise Security
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
