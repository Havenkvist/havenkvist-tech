import { CUSTOMERS_SERVICED, launchOffer } from "@/data/launchOffer";
import { formatText } from "@/lib/format";
import type { Dictionary } from "@/i18n/dictionaries";

export function LaunchOfferStat({ t }: { t: Dictionary["pricing"]["launchOffer"] }) {
  const deliveredLabel = formatText(
    CUSTOMERS_SERVICED === 1 ? t.deliveredOne : t.deliveredOther,
    { count: CUSTOMERS_SERVICED }
  );

  const nextUpLabel = formatText(t.nextUp, { n: launchOffer.customerNumber });

  const spotsLabel = launchOffer.active
    ? formatText(launchOffer.spotsLeft === 1 ? t.spotsOne : t.spotsOther, {
        count: launchOffer.spotsLeft,
      })
    : null;

  return (
    <div className="mx-auto mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm shadow-sm dark:border-white/15 dark:bg-white/[0.04]">
      <span className="font-semibold text-black dark:text-white">{deliveredLabel}</span>
      <span className="text-black/25 dark:text-white/25">·</span>
      <span className="text-black/60 dark:text-white/60">{nextUpLabel}</span>
      {spotsLabel && (
        <>
          <span className="text-black/25 dark:text-white/25">·</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">{spotsLabel}</span>
        </>
      )}
    </div>
  );
}
