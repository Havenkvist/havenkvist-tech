import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import {
  defaultLocale,
  localeDomains,
  localeForHostname,
  pathForRoute,
  routeKeys,
  type Locale,
} from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host") ?? "";
  const locale = localeForHostname(host) ?? defaultLocale;
  const domain = localeDomains[locale];
  const otherLocale: Locale = locale === "da" ? "en" : "da";

  return routeKeys
    .filter((key) => key !== "services")
    .map((key) => ({
      url: `${domain}${pathForRoute(locale, key)}`,
      lastModified: new Date(),
      changeFrequency: key === "home" ? "weekly" : "monthly",
      priority: key === "home" ? 1 : 0.8,
      alternates: {
        languages: {
          [locale]: `${domain}${pathForRoute(locale, key)}`,
          [otherLocale]: `${localeDomains[otherLocale]}${pathForRoute(otherLocale, key)}`,
        },
      },
    }));
}
