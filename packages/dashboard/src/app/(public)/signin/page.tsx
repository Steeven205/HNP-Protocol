"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

/* ──────────────────────────────────────────────────────────────────────────────
   Sign In Page — Airbnb-inspired centered card on clean white background
   ────────────────────────────────────────────────────────────────────────────── */

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("s.martin@techcorp.fr");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full mx-auto">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] shadow-lg p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 no-underline"
            >
              <img src="/logo.svg" alt="Rateflow" className="w-9 h-9" />
              <span className="text-xl font-semibold text-[#222]">
                Rateflow
              </span>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-[#222] text-center">
            Welcome back
          </h1>
          <p className="text-[#717171] text-sm text-center mt-1.5 mb-8">
            Sign in to access the platform.
          </p>

          {/* ── Form ──────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#222] mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#DDDDDD] rounded-lg py-3 px-4 text-[#222] text-sm transition-colors focus:border-[#222] focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[#222] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#DDDDDD] rounded-lg py-3 px-4 pr-12 text-[#222] text-sm transition-colors focus:border-[#222] focus:ring-0 focus:outline-none"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 border-none bg-transparent text-[#717171] hover:text-[#222] transition-colors cursor-pointer text-xs font-semibold underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember device + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[#222] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="h-4 w-4 rounded border-[#DDDDDD] bg-white text-emerald accent-emerald"
                />
                Remember device
              </label>
              <button
                type="button"
                className="border-none bg-transparent text-sm font-semibold text-[#222] underline hover:text-black transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-[#FDE8E8] text-[#9B1C1C] border border-[#FCA5A5] rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#222] text-white rounded-lg py-3 text-sm font-semibold transition-colors hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <div className="spinner" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* ── Divider ───────────────────────────────────────────────── */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#DDDDDD]" />
            <span className="text-xs text-[#717171]">or</span>
            <div className="h-px flex-1 bg-[#DDDDDD]" />
          </div>

          {/* ── SSO Buttons ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSSO("Azure AD")}
              className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-[#DDDDDD] bg-white py-3 text-sm font-medium text-[#222] transition-colors hover:bg-[#F7F7F7] cursor-pointer"
            >
              <i className="fa-brands fa-microsoft" />
              Continue with Microsoft
            </button>
            <button
              type="button"
              onClick={() => handleSSO("SAML")}
              className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-[#DDDDDD] bg-white py-3 text-sm font-medium text-[#222] transition-colors hover:bg-[#F7F7F7] cursor-pointer"
            >
              <i className="fa-solid fa-key" />
              Continue with SSO / SAML
            </button>
          </div>

          {/* ── Bottom text ───────────────────────────────────────────── */}
          <p className="mt-6 text-center text-sm text-[#717171]">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="border-none bg-transparent font-semibold text-[#222] underline hover:text-black transition-colors cursor-pointer"
            >
              Request access
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
