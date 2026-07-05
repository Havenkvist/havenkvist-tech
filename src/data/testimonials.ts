import type { Locale } from "@/i18n/config";

export type TestimonialSource = "trustpilot" | "google" | "linkedin" | "direct";

export interface TestimonialLocalizedContent {
  quote: string;
  authorRole?: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  source: TestimonialSource;
  sourceUrl?: string;
  date?: string;
  content: Record<Locale, TestimonialLocalizedContent>;
}

// Empty until real client reviews come in (e.g. from Trustpilot/Google).
// The portfolio page hides the testimonials section automatically while
// this stays empty, so no page/routing changes are needed to add one later —
// just append an entry here with the same shape as the commented example.
//
// {
//   id: "acme-webshop",
//   authorName: "Jane Doe",
//   rating: 5,
//   source: "trustpilot",
//   sourceUrl: "https://www.trustpilot.com/reviews/...",
//   date: "2026-08-01",
//   content: {
//     en: { quote: "Great to work with.", authorRole: "Owner, Acme ApS" },
//     da: { quote: "Fantastisk at arbejde med.", authorRole: "Ejer, Acme ApS" },
//   },
// },
export const testimonials: Testimonial[] = [];
