"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathForRoute, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar({
  locale,
  nav,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "";

  const links = [
    { href: pathForRoute(locale, "home"), label: nav.home },
    { href: pathForRoute(locale, "about"), label: nav.about },
    { href: pathForRoute(locale, "services"), label: nav.services },
    { href: pathForRoute(locale, "pricing"), label: nav.pricing },
    { href: pathForRoute(locale, "contact"), label: nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={pathForRoute(locale, "home")}
          className="text-lg font-semibold tracking-tight text-black dark:text-white"
          onClick={() => setOpen(false)}
        >
          Havenkvist<span className="text-blue-600 dark:text-blue-400">Tech</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-black dark:text-white"
                    : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href={pathForRoute(locale, "pricing")}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            {nav.cta}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex items-center justify-center rounded-md p-2 text-black md:hidden dark:text-white"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 px-6 py-4 md:hidden dark:border-white/10">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-black/80 dark:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex items-center justify-between">
            <LanguageSwitcher locale={locale} />
            <Link
              href={pathForRoute(locale, "pricing")}
              onClick={() => setOpen(false)}
              className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
            >
              {nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
