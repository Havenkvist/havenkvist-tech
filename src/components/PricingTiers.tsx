"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { pathForRoute, type Locale } from "@/i18n/config";
import { launchOffer } from "@/data/launchOffer";
import { formatText } from "@/lib/format";
import type { Dictionary } from "@/i18n/dictionaries";

type LaunchOfferText = Dictionary["pricing"]["launchOffer"];

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  details: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  launchOfferEligible: boolean;
};

const FEATURE_PREVIEW_LIMIT = 6;

function CheckIcon() {
  return (
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
  );
}

function parsePriceAmount(price: string): { amount: number; suffix: string } | null {
  const match = price.match(/^([\d.,]+)\s*(.*)$/);
  if (!match) return null;
  const amount = Number(match[1].replace(/[.,]/g, ""));
  if (!Number.isFinite(amount)) return null;
  return { amount, suffix: match[2] };
}

function formatDiscountedPrice(price: string, discountPercent: number): string | null {
  const parsed = parsePriceAmount(price);
  if (!parsed) return null;
  const discounted = Math.round((parsed.amount * (1 - discountPercent / 100)) / 5) * 5;
  return `${new Intl.NumberFormat("da-DK").format(discounted)} ${parsed.suffix}`.trim();
}

function TierPrice({ tier }: { tier: Tier }) {
  const priceInfo = parsePriceAmount(tier.price);
  const isCustomQuote = priceInfo === null;
  const offerApplies = tier.launchOfferEligible && launchOffer.active;

  if (offerApplies && !isCustomQuote) {
    const discounted = formatDiscountedPrice(tier.price, launchOffer.discountPercent);
    return (
      <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-lg font-medium text-black/35 line-through dark:text-white/35">
          {tier.price}
        </span>
        <span className="text-4xl font-semibold tracking-tight text-black dark:text-white">
          {discounted}
        </span>
      </div>
    );
  }

  return (
    <div className="mt-6 flex items-baseline gap-1">
      <span className="text-4xl font-semibold tracking-tight text-black dark:text-white">
        {tier.price}
      </span>
    </div>
  );
}

function TierOfferBadge({ tier, t }: { tier: Tier; t: LaunchOfferText }) {
  if (!(tier.launchOfferEligible && launchOffer.active)) return null;
  const isCustomQuote = parsePriceAmount(tier.price) === null;

  const foundingLabel = formatText(t.founding, { n: launchOffer.customerNumber });
  const discountLabel = formatText(
    isCustomQuote ? t.discountOffCustomQuote : t.discountOff,
    { percent: launchOffer.discountPercent }
  );

  return (
    <div className="mt-4 flex flex-col gap-1 rounded-lg border border-green-600/30 bg-green-600/5 px-3 py-2 dark:border-green-400/30 dark:bg-green-400/10">
      <span className="text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-400">
        {foundingLabel} · {discountLabel}
      </span>
      <span className="text-sm font-medium text-green-800 dark:text-green-300">
        {t.payOnDelivery}
      </span>
    </div>
  );
}

export function PricingTiers({
  tiers,
  lang,
  launchOfferText,
}: {
  tiers: Tier[];
  lang: Locale;
  launchOfferText: LaunchOfferText;
}) {
  const [expandedName, setExpandedName] = useState<string | null>(null);
  const expandedCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (expandedName) {
      expandedCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [expandedName]);

  const ctaHref = (tierName: string) =>
    `${pathForRoute(lang, "contact")}?plan=${encodeURIComponent(tierName)}`;

  const badgeLabel = lang === "da" ? "Mest populær" : "Most popular";
  const seeDetailsLabel = lang === "da" ? "Se hele pakken" : "See full details";
  const showLessLabel = lang === "da" ? "Vis mindre" : "Show less";
  const descriptionLabel = lang === "da" ? "Beskrivelse" : "Description";
  const moreLabel = (n: number) => (lang === "da" ? `+${n} mere` : `+${n} more`);

  const expandedTier = tiers.find((tier) => tier.name === expandedName) ?? null;
  const collapsedTiers = expandedTier
    ? tiers.filter((tier) => tier.name !== expandedTier.name)
    : tiers;

  return (
    <div className="flex flex-col gap-8">
      {expandedTier && (
        <div
          ref={expandedCardRef}
          className={`relative flex scroll-mt-24 flex-col rounded-2xl border p-8 md:p-10 ${
            expandedTier.highlighted
              ? "border-blue-600 bg-white shadow-lg ring-1 ring-blue-600 dark:border-blue-400 dark:bg-white/[0.04] dark:ring-blue-400"
              : "border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
          }`}
        >
          {expandedTier.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white dark:bg-blue-400 dark:text-black">
              {badgeLabel}
            </span>
          )}

          <button
            type="button"
            onClick={() => setExpandedName(null)}
            className="absolute right-6 top-6 text-sm font-medium text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
          >
            {showLessLabel}
          </button>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                {expandedTier.name}
              </h3>
              <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                {expandedTier.description}
              </p>

              <TierPrice tier={expandedTier} />
              <p className="mt-1 text-xs uppercase tracking-wide text-black/40 dark:text-white/40">
                {expandedTier.period}
              </p>
              <TierOfferBadge tier={expandedTier} t={launchOfferText} />

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {expandedTier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70"
                  >
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={ctaHref(expandedTier.name)}
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${
                  expandedTier.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
                }`}
              >
                {expandedTier.cta}
              </Link>
            </div>

            <div className="flex flex-col rounded-xl bg-zinc-50 p-6 dark:bg-white/[0.03]">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {descriptionLabel}
              </h4>
              <p className="mt-3 text-base leading-relaxed text-black/70 dark:text-white/70">
                {expandedTier.details}
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className={`grid gap-8 ${
          expandedTier
            ? "sm:grid-cols-2"
            : collapsedTiers.length <= 2
              ? "mx-auto max-w-3xl sm:grid-cols-2"
              : "lg:grid-cols-3"
        }`}
      >
        {collapsedTiers.map((tier) => {
          const previewFeatures = tier.features.slice(0, FEATURE_PREVIEW_LIMIT);
          const extraCount = tier.features.length - previewFeatures.length;

          return (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-blue-600 bg-white shadow-lg ring-1 ring-blue-600 dark:border-blue-400 dark:bg-white/[0.04] dark:ring-blue-400"
                  : "border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white dark:bg-blue-400 dark:text-black">
                  {badgeLabel}
                </span>
              )}

              <h3 className="text-xl font-semibold text-black dark:text-white">{tier.name}</h3>
              <p className="mt-2 text-sm text-black/60 dark:text-white/60">{tier.description}</p>

              <TierPrice tier={tier} />
              <p className="mt-1 text-xs uppercase tracking-wide text-black/40 dark:text-white/40">
                {tier.period}
              </p>
              <TierOfferBadge tier={tier} t={launchOfferText} />

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {previewFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70"
                  >
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
                {extraCount > 0 && (
                  <li className="text-sm font-medium text-black/50 dark:text-white/50">
                    {moreLabel(extraCount)}
                  </li>
                )}
              </ul>

              <button
                type="button"
                onClick={() => setExpandedName(tier.name)}
                className="mt-6 text-left text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                {seeDetailsLabel}
              </button>

              <Link
                href={ctaHref(tier.name)}
                className={`mt-4 inline-flex items-center justify-center rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
