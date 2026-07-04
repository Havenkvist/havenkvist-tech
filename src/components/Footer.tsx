"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const pathname = usePathname() ?? "";

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/pricing`, label: dict.nav.pricing },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-black/5 bg-white dark:border-white/10 dark:bg-black">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-lg font-semibold tracking-tight text-black dark:text-white">
              Havenkvist<span className="text-blue-600 dark:text-blue-400">Tech</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-black/60 dark:text-white/60">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black dark:text-white">
              {dict.footer.columnsNav}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {links.map((link) => {
                const active =
                  link.href === `/${locale}`
                    ? pathname === link.href
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-sm transition-colors ${
                        active
                          ? "font-semibold text-black dark:text-white"
                          : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-black dark:text-white">
              {dict.footer.columnsContact}
            </p>
            <p className="mt-3 text-sm text-black/60 dark:text-white/60">
              <a
                href={`mailto:${dict.footer.email}`}
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                {dict.footer.email}
              </a>
            </p>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">
              {dict.footer.location}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-black/5 pt-6 text-sm text-black/40 dark:border-white/10 dark:text-white/40">
          © {year} Havenkvist Tech. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
