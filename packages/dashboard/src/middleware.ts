import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for the HNP Rateflow dashboard.
 *
 * Protects app routes behind Supabase authentication (cookie presence check).
 * Does NOT perform full JWT validation — that is handled server-side in
 * individual route handlers and server components.
 *
 * Route protection:
 *   PROTECTED  /negotiations, /audit, /configuration, /team
 *   PUBLIC     /, /organization, /setup, /api/*
 *   AUTH GATE  /signin (redirects to /negotiations if already signed in)
 *
 * Bypass: append ?demo=true to any URL to skip the auth check entirely.
 *
 * Current mode: PERMISSIVE — the redirect is commented out so the site
 * remains fully accessible during development. Enable enforcement by
 * uncommenting the redirect block below.
 */

const PROTECTED_PREFIXES = [
  "/negotiations",
  "/audit",
  "/configuration",
  "/team",
];

/**
 * Check whether the request carries a Supabase auth-token cookie.
 * Supabase stores the session in a cookie named `sb-<project-ref>-auth-token`.
 * We match any cookie that follows this pattern so the middleware stays
 * independent of the specific Supabase project reference.
 */
function hasSupabaseSession(request: NextRequest): boolean {
  const cookies = request.cookies.getAll();
  return cookies.some((cookie) =>
    /^sb-.+-auth-token/.test(cookie.name),
  );
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ── Bypass: allow unauthenticated demo access via ?demo=true ──
  if (searchParams.get("demo") === "true") {
    return NextResponse.next();
  }

  const hasSession = hasSupabaseSession(request);

  // ── Signin page: redirect authenticated users to the app ──
  if (pathname === "/signin") {
    if (hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/negotiations";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ── Protected routes: redirect unauthenticated users to /signin ──
  if (isProtectedRoute(pathname) && !hasSession) {
    // ---------------------------------------------------------------
    // Enable auth enforcement by uncommenting the redirect below.
    // While commented out the middleware is PERMISSIVE — all requests
    // pass through regardless of authentication state.
    // ---------------------------------------------------------------

    // const url = request.nextUrl.clone();
    // url.pathname = "/signin";
    // url.search = "";
    // return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/negotiations/:path*",
    "/audit/:path*",
    "/configuration/:path*",
    "/team/:path*",
    "/signin",
  ],
};
