export const locales = ["da", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "da";

export const localeNames: Record<Locale, string> = {
  da: "Dansk",
  en: "English",
};

// havenkvist-tech.dk serves Danish, havenkvist-tech.com serves English.
// Each domain is the canonical host for its locale (see proxy.ts).
export const localeDomains: Record<Locale, string> = {
  da: "https://havenkvist-tech.dk",
  en: "https://havenkvist-tech.com",
};

export const routeKeys = ["home", "about", "services", "portfolio", "pricing", "contact"] as const;

export type RouteKey = (typeof routeKeys)[number];

// Localized URL slugs per route. Empty string means the domain root.
export const routeSlugs: Record<RouteKey, Record<Locale, string>> = {
  home: { da: "", en: "" },
  about: { da: "om-mig", en: "about" },
  services: { da: "ydelser", en: "services" },
  portfolio: { da: "projekter", en: "projects" },
  pricing: { da: "priser", en: "pricing" },
  contact: { da: "kontakt", en: "contact" },
};

export function localeForHostname(hostname: string): Locale | undefined {
  const host = hostname.split(":")[0]?.toLowerCase() ?? "";
  if (host.endsWith(".dk")) return "da";
  if (host.endsWith(".com")) return "en";
  return undefined;
}

// The externally visible path for a route in a given locale, e.g. "/priser".
export function pathForRoute(locale: Locale, key: RouteKey): string {
  const slug = routeSlugs[key][locale];
  return slug ? `/${slug}` : "/";
}

// The internal Next.js route (file-system path under app/[lang]) a locale/route maps to.
export function internalPathForRoute(locale: Locale, key: RouteKey): string {
  return key === "home" ? `/${locale}` : `/${locale}/${key}`;
}

export function routeKeyForPath(locale: Locale, pathname: string): RouteKey {
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  return routeKeys.find((key) => routeSlugs[key][locale] === slug) ?? "home";
}

// Fully qualified, canonical URL for a route in a given locale.
export function urlForRoute(locale: Locale, key: RouteKey): string {
  return `${localeDomains[locale]}${pathForRoute(locale, key)}`;
}
