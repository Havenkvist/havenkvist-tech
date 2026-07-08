import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/i18n/dictionaries";
import { pathForRoute, urlForRoute } from "@/i18n/config";
import { ServiceIcon } from "@/components/ServiceIcon";
import { PricingTiers } from "@/components/PricingTiers";
import { LaunchOfferStat } from "@/components/LaunchOfferStat";

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
  const { hero, launchOffer, servicesTitle, tiers, note, faq, cta } = dict.pricing;
  const { list, process } = dict.services;

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
          <LaunchOfferStat t={launchOffer} />
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <PricingTiers tiers={tiers} lang={lang} launchOfferText={launchOffer} />

          <p className="mt-10 text-center text-sm text-black/50 dark:text-white/50">
            {note}
          </p>
        </div>
      </section>

      <section className="border-t border-black/5 bg-zinc-50 py-20 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white">
            {process.title}
          </h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white">
            {servicesTitle}
          </h2>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {list.map((service) => (
              <div
                key={service.title}
                className="flex flex-col rounded-2xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-black dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-black/60 dark:text-white/60">
                  {service.description}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {service.features.map((feature) => (
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

                {service.addon && (
                  <div className="mt-6 rounded-xl border border-blue-600/20 bg-blue-600/5 p-4 dark:border-blue-400/20 dark:bg-blue-400/10">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                      {service.addon.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-black dark:text-white">
                      {service.addon.price}{" "}
                      <span className="font-normal text-black/60 dark:text-white/60">
                        / {service.addon.period}
                      </span>
                    </p>
                    <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                      {service.addon.body}
                    </p>
                    <p className="mt-2 text-xs text-black/50 dark:text-white/50">
                      {service.addon.note}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
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

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white">
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-black/60 dark:text-white/60">
            {cta.body}
          </p>
          <div className="mt-8">
            <Link
              href={pathForRoute(lang, "contact")}
              className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              {cta.button}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
