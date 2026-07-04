import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/i18n/dictionaries";
import { ContactForm } from "@/components/ContactForm";

export default async function ContactPage({
  params,
  searchParams,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { hero, form } = dict.contact;

  const sp = await searchParams;
  const plan = typeof sp.plan === "string" ? sp.plan : undefined;
  const defaultMessage = plan
    ? `${form.planPrefix} ${plan} ${form.planSuffix}`
    : undefined;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {hero.label}
          </span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-white">
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-black/60 dark:text-white/60">
            {hero.subtitle}
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-black/5 bg-white p-8 shadow-sm sm:p-10 dark:border-white/10 dark:bg-white/[0.03]">
          <ContactForm dict={form} defaultMessage={defaultMessage} />
        </div>
      </div>
    </section>
  );
}
