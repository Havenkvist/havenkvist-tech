import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/i18n/dictionaries";
import { pathForRoute, urlForRoute } from "@/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const canonical = urlForRoute(lang, "services");

  return {
    title: dict.services.meta.title,
    description: dict.services.meta.description,
    alternates: {
      canonical,
      languages: {
        da: urlForRoute("da", "services"),
        en: urlForRoute("en", "services"),
        "x-default": urlForRoute("en", "services"),
      },
    },
    openGraph: {
      title: dict.services.meta.title,
      description: dict.services.meta.description,
      url: canonical,
    },
  };
}

function ServiceIcon({ icon }: { icon: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "code":
      return (
        <svg {...common}>
          <path d="M8 6 2 12l6 6M16 6l6 6-6 6M14 4l-4 16" />
        </svg>
      );
    case "maintenance":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 1 5.4-5.4l-3-3 2-2a5 5 0 0 1 4 4l-2 2-3-3Z" />
        </svg>
      );
    case "performance":
      return (
        <svg {...common}>
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default async function ServicesPage({
  params,
}: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { hero, list, process, cta } = dict.services;

  return (
    <>
      <section className="border-b border-black/5 bg-zinc-50 py-20 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 text-center">
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
              </div>
            ))}
          </div>
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
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white">
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-black/60 dark:text-white/60">
            {cta.body}
          </p>
          <div className="mt-8">
            <Link
              href={pathForRoute(lang, "pricing")}
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
