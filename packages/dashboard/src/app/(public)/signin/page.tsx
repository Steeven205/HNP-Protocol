import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      {/* ── Left Panel ───────────────────────────────────────────────────── */}
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

      {/* ── Right Panel ──────────────────────────────────────────────────── */}
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
            Sign in to your account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter your credentials to access the dashboard
          </p>

          {/* ── Form ──────────────────────────────────────────────────────── */}
          <form
            action="/negotiations"
            className="mt-8 flex flex-col gap-5"
          >
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
                  defaultValue="m.dupont@techcorp.fr"
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
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  defaultValue="demo1234"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-navy-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-600/20 transition"
                />
              </div>
            </div>

            {/* Remember / Forgot */}
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

            {/* Submit */}
            <Link
              href="/negotiations"
              className="mt-1 block w-full rounded-xl bg-navy-800 py-3 text-center text-sm font-semibold text-white hover:bg-navy-700 transition-colors"
            >
              Sign In
            </Link>
          </form>

          {/* ── Divider ───────────────────────────────────────────────────── */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">Or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* ── SSO Buttons ───────────────────────────────────────────────── */}
          <div className="flex gap-3">
            <Link
              href="/negotiations"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              <i className="fa-brands fa-microsoft text-base" />
              Microsoft
            </Link>
            <Link
              href="/negotiations"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              <i className="fa-brands fa-google text-base" />
              Google
            </Link>
          </div>

          {/* ── Bottom text ───────────────────────────────────────────────── */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <span className="cursor-pointer font-medium text-navy-600 hover:text-navy-800 transition-colors">
              Contact Sales
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
