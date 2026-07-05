import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/i18n/dictionaries";
import { pathForRoute, urlForRoute } from "@/i18n/config";
import CodeBackdrop from "@/components/CodeBackdrop";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const canonical = urlForRoute(lang, "home");

  return {
    alternates: {
      canonical,
      languages: {
        da: urlForRoute("da", "home"),
        en: urlForRoute("en", "home"),
        "x-default": urlForRoute("en", "home"),
      },
    },
    openGraph: { url: canonical },
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { hero, intro, cta } = dict.home;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-zinc-950">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-zinc-950 to-zinc-950"
        />
        <CodeBackdrop />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[68%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-950 blur-[60px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-zinc-950"
        />
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
              {hero.badge}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              {hero.title}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {hero.titleHighlight}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
              {hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={pathForRoute(lang, "pricing")}
                className="w-full rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition-colors hover:bg-white/90 sm:w-auto"
              >
                {hero.ctaPrimary}
              </Link>
              <Link
                href={pathForRoute(lang, "services")}
                className="w-full rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <dl className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-3xl font-semibold text-white">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-white/50">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-black/5 bg-zinc-50 py-24 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {intro.label}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white">
              {intro.title}
            </h2>
            <p className="mt-4 text-black/60 dark:text-white/60">{intro.body}</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {intro.points.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              >
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-black px-8 py-16 text-center dark:bg-white">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl dark:text-black">
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70 dark:text-black/70">
            {cta.body}
          </p>
          <div className="mt-8">
            <Link
              href={pathForRoute(lang, "contact")}
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/80"
            >
              {cta.button}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
