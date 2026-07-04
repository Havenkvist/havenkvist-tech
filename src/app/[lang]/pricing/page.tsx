import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/i18n/dictionaries";
import { pathForRoute, urlForRoute } from "@/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/pricing">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const canonical = urlForRoute(lang, "pricing");

  return {
    title: dict.pricing.meta.title,
    description: dict.pricing.meta.description,
    alternates: {
      canonical,
      languages: {
        da: urlForRoute("da", "pricing"),
        en: urlForRoute("en", "pricing"),
        "x-default": urlForRoute("en", "pricing"),
      },
    },
    openGraph: {
      title: dict.pricing.meta.title,
      description: dict.pricing.meta.description,
      url: canonical,
    },
  };
}

export default async function PricingPage({
  params,
}: PageProps<"/[lang]/pricing">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { hero, tiers, note, faq } = dict.pricing;
  const currency = lang === "da" ? "kr." : "$";

  return (
    <>
      <section className="border-b border-black/5 bg-zinc-50 py-20 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {hero.label}
          </span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-white">
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-black/60 dark:text-white/60">
            {hero.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier, index) => {
              const isCustom = index === tiers.length - 1;
              return (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-2xl border p-8 ${
                    tier.highlighted
                      ? "border-blue-600 bg-white shadow-lg ring-1 ring-blue-600 dark:border-blue-400 dark:bg-white/[0.04] dark:ring-blue-400"
                      : "border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white dark:bg-blue-400 dark:text-black">
                      {lang === "da" ? "Mest populær" : "Most popular"}
                    </span>
                  )}

                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                    {tier.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-black dark:text-white">
                      {isCustom
                        ? tier.price
                        : currency === "$"
                          ? `$${tier.price}`
                          : `${tier.price} kr.`}
                    </span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wide text-black/40 dark:text-white/40">
                    {tier.period}
                  </p>

                  <ul className="mt-8 flex flex-1 flex-col gap-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                        >
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`${pathForRoute(lang, "contact")}?plan=${encodeURIComponent(tier.name)}`}
                    className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${
                      tier.highlighted
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-sm text-black/50 dark:text-white/50">
            {note}
          </p>
        </div>
      </section>

      <section className="border-t border-black/5 bg-zinc-50 py-20 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white">
            {faq.title}
          </h2>
          <div className="mt-10 flex flex-col gap-6">
            {faq.items.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <h3 className="font-semibold text-black dark:text-white">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
