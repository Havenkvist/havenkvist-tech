import type { Testimonial, TestimonialSource } from "@/data/testimonials";
import type { Locale } from "@/i18n/config";

export function Testimonials({
  testimonials,
  locale,
  title,
  sourceLabels,
}: {
  testimonials: Testimonial[];
  locale: Locale;
  title: string;
  sourceLabels: Record<TestimonialSource, string>;
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-black/5 bg-zinc-50 py-20 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white">
          {title}
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => {
            const content = testimonial.content[locale];
            return (
              <figure
                key={testimonial.id}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              >
                {testimonial.rating !== undefined && (
                  <div aria-hidden className="text-sm text-blue-600 dark:text-blue-400">
                    {"★".repeat(testimonial.rating)}
                    {"☆".repeat(5 - testimonial.rating)}
                  </div>
                )}
                <blockquote className="mt-3 text-sm text-black/70 dark:text-white/70">
                  &ldquo;{content.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-black dark:text-white">
                    {testimonial.authorName}
                  </span>
                  {content.authorRole && (
                    <span className="text-black/50 dark:text-white/50"> · {content.authorRole}</span>
                  )}
                  <span className="ml-2 text-xs uppercase tracking-wide text-black/40 dark:text-white/40">
                    {sourceLabels[testimonial.source]}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
