"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

/* ──────────────────────────────────────────────────────────────────────────────
   Sign In Page — Split-screen: light form left, geometric art right
   Font: Plus Jakarta Sans (via globals.css)
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
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* ── Main Content ─────────────────────────────────────────────── */}
      <main className="flex-grow flex items-center justify-center w-full max-w-[1440px] mx-auto p-4 lg:p-8">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row rounded-[24px] overflow-hidden border border-[#E5E7EB] shadow-2xl">

          {/* ── Left Column: Form ──────────────────────────────────── */}
          <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto">
              {/* Logo */}
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 no-underline mb-8"
              >
                <div className="w-12 h-12 rounded-xl bg-[#111827] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                  </svg>
                </div>
              </Link>

              {/* Headings */}
              <h1 className="text-3xl font-bold text-[#111827] mb-2">
                Welcome back
              </h1>
              <p className="text-[#6B7280] text-sm mb-10">
                Enter your details to access your workspace.
              </p>

              {/* ── Form ─────────────────────────────────────────── */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-[#374151] mb-1.5"
                  >
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border-[1.5px] border-[#E5E7EB] rounded-xl py-3.5 px-4 text-[#111827] text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:outline-none placeholder:text-[#9CA3AF]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-[#374151] mb-1.5"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border-[1.5px] border-[#E5E7EB] rounded-xl py-3.5 px-4 pr-12 text-[#111827] text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:outline-none placeholder:text-[#9CA3AF]"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 border-none bg-transparent text-[#9CA3AF] hover:text-[#111827] transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember device + Forgot password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="h-4 w-4 rounded border-[#E5E7EB] bg-white text-emerald-500 accent-emerald-500"
                    />
                    <span className="text-xs text-[#6B7280] group-hover:text-[#111827] transition-colors">
                      Remember device
                    </span>
                  </label>
                  <button
                    type="button"
                    className="border-none bg-transparent text-xs text-emerald-600 font-medium hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#111827] text-white rounded-xl py-3.5 text-sm font-semibold transition-all hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-[#E5E7EB]" />
                  <span className="flex-shrink-0 mx-4 text-xs text-[#9CA3AF]">
                    Or continue with
                  </span>
                  <div className="flex-grow border-t border-[#E5E7EB]" />
                </div>

                {/* SSO Buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => handleSSO("Azure AD")}
                    className="w-full bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
                      <path d="M11 0H0v11h11V0z" fill="#F25022" />
                      <path d="M23 0H12v11h11V0z" fill="#7FBA00" />
                      <path d="M11 12H0v11h11V12z" fill="#00A4EF" />
                      <path d="M23 12H12v11h11V12z" fill="#FFB900" />
                    </svg>
                    Azure AD / Microsoft
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSSO("SAML")}
                    className="w-full bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                    </svg>
                    SSO / SAML
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-4 text-xs text-[#6B7280]">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="border-none bg-transparent text-emerald-600 font-medium hover:underline transition-colors cursor-pointer"
                  >
                    Request access
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ── Right Column: Abstract Geometric Art ───────────────── */}
          <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#0A1628] border-l border-[#1A2942]">
            {/* Geometric Grid Pattern */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-0 opacity-80">
              {/* Top Left */}
              <div className="bg-[#1A2942] relative overflow-hidden border-b border-r border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A2942] to-[#1e1b4b] opacity-50" />
                <div className="absolute w-full h-full border-2 border-[#312e81] rounded-full scale-150 -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* Top Right */}
              <div className="bg-[#0A1628] relative overflow-hidden border-b border-white/5 p-8 flex flex-col justify-center">
                <div className="flex gap-2 mb-6">
                  <div className="w-4 h-4 bg-[#F59E0B] rotate-45" />
                  <div className="w-4 h-4 bg-emerald-500 rotate-45" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-[#0ea5e9]" />
                  <div className="h-4 w-full flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="w-1 h-full bg-white/80" />
                    ))}
                  </div>
                  <div className="h-2 w-2/3 bg-[#4f46e5]" />
                </div>
              </div>

              {/* Middle Left */}
              <div className="bg-[#0A1628] relative overflow-hidden border-b border-r border-white/5 p-8">
                <div className="flex flex-col gap-2 absolute top-8 left-8">
                  <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-[#3b82f6]" />
                  <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-[#3b82f6]" />
                </div>
                <div className="absolute bottom-1/4 right-1/4">
                  <div className="w-12 h-12 bg-[#F59E0B] rounded-sm rotate-45 flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#0A1628] rotate-45" />
                  </div>
                </div>
              </div>

              {/* Middle Right */}
              <div className="bg-[#1e1b4b] relative overflow-hidden border-b border-white/5">
                <div className="absolute -right-20 -top-20 w-64 h-64 border-[40px] border-[#0A1628] rounded-full" />
                <div className="absolute bottom-10 left-10 flex gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-white/20" />
                  ))}
                </div>
              </div>

              {/* Bottom Left */}
              <div className="bg-[#312e81] relative overflow-hidden border-r border-white/5">
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#4c1d95] opacity-80" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border border-white/20 rounded-tr-full" />
              </div>

              {/* Bottom Right */}
              <div className="bg-[#0A1628] relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#0ea5e9] rounded-tl-[100px]" />
                <div className="absolute bottom-8 right-8 grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  ))}
                </div>
              </div>
            </div>

            {/* Overlay Card */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-center z-10 bg-[#0A1628]/40 backdrop-blur-[2px]">
              <div className="bg-white/90 backdrop-blur-sm shadow-lg p-8 rounded-2xl border border-white/20 max-w-md">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-4">
                  Enterprise Security
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Access to the Rateflow protocol is secured with bank-grade encryption.
                  All negotiations are cryptographically signed and stored in an immutable
                  audit trail.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="w-full py-8 border-t border-[#E5E7EB] mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <div>&copy; 2026 Rateflow Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Support
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            System Status: Operational
          </div>
        </div>
      </footer>
    </div>
  );
}
