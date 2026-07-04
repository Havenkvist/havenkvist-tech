import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/i18n/dictionaries";

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { hero, story, values, contact, cta } = dict.about;

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
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {story.label}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white">
            {story.title}
          </h2>
          <div className="mt-8 flex flex-col gap-5">
            {story.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-black/70 dark:text-white/70"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-zinc-50 py-20 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white">
            {values.title}
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {values.points.map((point) => (
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

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm sm:p-10 dark:border-white/10 dark:bg-white/[0.03]">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
              {contact.title}
            </h2>
            <p className="mt-3 text-black/60 dark:text-white/60">
              {contact.body}
            </p>

            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
                  {contact.emailLabel}
                </dt>
                <dd className="mt-2 text-sm text-black/80 dark:text-white/80">
                  <a
                    href={`mailto:${dict.footer.email}`}
                    className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {dict.footer.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
                  {contact.phoneLabel}
                </dt>
                <dd className="mt-2 text-sm text-black/80 dark:text-white/80">
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
                  {contact.addressLabel}
                </dt>
                <dd className="mt-2 text-sm text-black/80 dark:text-white/80">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="py-4 pb-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-black px-8 py-16 text-center dark:bg-white">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl dark:text-black">
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70 dark:text-black/70">
            {cta.body}
          </p>
          <div className="mt-8">
            <a
              href={`mailto:${dict.footer.email}`}
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/80"
            >
              {cta.button}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
