"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("m.dupont@techcorp.fr");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        // Supabase may require email confirmation — show a success hint
        setError(null);
        router.push("/negotiations");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }
        router.push("/negotiations");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSSO() {
    alert("Coming soon");
  }

  return (
    <div className="flex min-h-screen">
      {/* -- Left Panel -------------------------------------------------------- */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900 px-12 lg:flex">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome to Rateflow
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            The AI-to-AI negotiation platform that replaces the annual hotel RFP
            with real-time, transaction-level optimization.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {/* Trust card 1 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                  <i className="fa-solid fa-certificate" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">
                    SOC2 Type II Certified
                  </p>
                  <p className="text-xs text-white/50">
                    Enterprise-grade security and compliance
                  </p>
                </div>
              </div>
            </div>

            {/* Trust card 2 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                  <i className="fa-solid fa-shield-halved" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">
                    Immutable Audit Trail
                  </p>
                  <p className="text-xs text-white/50">
                    SHA-256 hashed, every negotiation round logged
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -- Right Panel ------------------------------------------------------- */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo / back link */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-navy-800 transition-colors"
          >
            <i className="fa-solid fa-arrow-left" />
            Back to home
          </Link>

          <h2 className="text-2xl font-bold text-slate-900">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {isSignUp
              ? "Enter your details to get started"
              : "Enter your credentials to access the dashboard"}
          </p>

          {/* -- Form ---------------------------------------------------------- */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-navy-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  placeholder={isSignUp ? "Choose a password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-navy-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 transition"
                />
              </div>
            </div>

            {/* Remember / Forgot (sign-in only) */}
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-slate-300 text-navy-800 focus:ring-navy-600"
                  />
                  Remember me
                </label>
                <span className="cursor-pointer text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors">
                  Forgot password?
                </span>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 block w-full rounded-xl bg-navy-800 py-3 text-center text-sm font-semibold text-white hover:bg-navy-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? (isSignUp ? "Creating account..." : "Signing in...")
                : (isSignUp ? "Sign Up" : "Sign In")}
            </button>
          </form>

          {/* -- Divider -------------------------------------------------------- */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">Or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* -- SSO Buttons ---------------------------------------------------- */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSSO}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              <i className="fa-brands fa-microsoft text-base" />
              Microsoft
            </button>
            <button
              type="button"
              onClick={handleSSO}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              <i className="fa-brands fa-google text-base" />
              Google
            </button>
          </div>

          {/* -- Bottom text ---------------------------------------------------- */}
          <p className="mt-8 text-center text-sm text-slate-500">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setError(null); }}
                  className="font-medium text-navy-600 hover:text-navy-800 transition-colors"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setError(null); }}
                  className="font-medium text-navy-600 hover:text-navy-800 transition-colors"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
