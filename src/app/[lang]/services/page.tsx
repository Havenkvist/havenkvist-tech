import { notFound, permanentRedirect } from "next/navigation";
import { hasLocale } from "@/i18n/dictionaries";
import { pathForRoute } from "@/i18n/config";

export default async function ServicesPage({
  params,
}: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  permanentRedirect(pathForRoute(lang, "pricing"));
}
