"use client";

import { usePathname } from "next/navigation";
import {
  locales,
  localeDomains,
  pathForRoute,
  routeKeyForPath,
  type Locale,
} from "@/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const currentKey = routeKeyForPath(locale, pathname);

  return (
    <div className="flex items-center rounded-full border border-black/10 bg-black/[0.03] p-0.5 text-sm dark:border-white/10 dark:bg-white/5">
      {locales.map((target) => {
        const active = target === locale;
        const href = active
          ? pathname
          : `${localeDomains[target]}${pathForRoute(target, currentKey)}`;
        return (
          <a
            key={target}
            href={href}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${target};path=/;max-age=31536000`;
            }}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-2.5 py-1 font-medium uppercase tracking-wide transition-colors ${
              active
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
            }`}
          >
            {target}
          </a>
        );
      })}
    </div>
  );
}
