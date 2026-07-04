import { localeDomains, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function professionalServiceJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Havenkvist Tech",
    url: localeDomains[locale],
    email: dict.footer.email,
    telephone: dict.about.contact.phone,
    founder: {
      "@type": "Person",
      name: "Lucas Havenkvist",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Frøgårdsvej 7, 2. th.",
      postalCode: "4690",
      addressLocality: "Haslev",
      addressCountry: "DK",
    },
    areaServed: ["Haslev", "Faxe", "Næstved", "Køge", "Region Sjælland"],
    inLanguage: locale,
  };
}
