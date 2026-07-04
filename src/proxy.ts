import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  locales,
  defaultLocale,
  localeForHostname,
  routeKeys,
  routeSlugs,
  internalPathForRoute,
  type Locale,
} from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

// Only reached when the host isn't a recognized production domain (e.g. localhost
// during development), so we can still preview both locales via the cookie.
function devLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const locale = localeForHostname(host) ?? devLocale(request);

  const { pathname } = request.nextUrl;
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  const key = routeKeys.find((candidate) => routeSlugs[candidate][locale] === slug);
  if (!key) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = internalPathForRoute(locale, key);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
