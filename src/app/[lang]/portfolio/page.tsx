import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/i18n/dictionaries";
import { pathForRoute, urlForRoute } from "@/i18n/config";
import { projects, getProjectContent } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { Testimonials } from "@/components/Testimonials";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/portfolio">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const canonical = urlForRoute(lang, "portfolio");

  return {
    title: dict.portfolio.meta.title,
    description: dict.portfolio.meta.description,
    alternates: {
      canonical,
      languages: {
        da: urlForRoute("da", "portfolio"),
        en: urlForRoute("en", "portfolio"),
        "x-default": urlForRoute("en", "portfolio"),
      },
    },
    openGraph: {
      title: dict.portfolio.meta.title,
      description: dict.portfolio.meta.description,
      url: canonical,
    },
  };
}

export default async function PortfolioPage({
  params,
}: PageProps<"/[lang]/portfolio">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { hero, labels, cta, testimonials: testimonialsDict, sourceLabels } = dict.portfolio;

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
            {projects.map((project) => {
              const content = getProjectContent(project, lang);
              return (
                <div
                  key={project.id}
                  className="flex flex-col rounded-2xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
                      {content.company}
                    </span>
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-medium text-black/60 dark:bg-white/10 dark:text-white/60">
                      {labels.types[project.type]}
                    </span>
                    {project.current && (
                      <span className="rounded-full bg-blue-600/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                        {labels.current}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-black dark:text-white">
                    {content.title}
                  </h3>

                  <p className="mt-3 text-sm text-black/60 dark:text-white/60">
                    <span className="font-semibold text-black/80 dark:text-white/80">
                      {labels.role}:
                    </span>{" "}
                    {content.role}
                  </p>

                  <p className="mt-4 text-sm text-black/70 dark:text-white/70">
                    {content.description}
                  </p>

                  <div className="mt-6 flex flex-1 flex-col justify-end gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
                      {labels.technologies}
                    </span>
                    <ul className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-400/10 dark:text-blue-300"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials
        testimonials={testimonials}
        locale={lang}
        title={testimonialsDict.title}
        sourceLabels={sourceLabels}
      />

      <section className="py-20">
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
