import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { defaultLocale, localeDomains, localeForHostname } from "@/i18n/config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  const locale = localeForHostname(host) ?? defaultLocale;
  const domain = localeDomains[locale];

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
