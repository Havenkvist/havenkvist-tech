// Bump this by 1 each time you close a new customer, then redeploy.
// The offer logic below derives everything else from this single number.
export const CUSTOMERS_SERVICED: number = 0;

const DISCOUNTED_SPOTS = 3;

export type LaunchOfferStatus = {
  /** Whether the *next* customer still gets a launch discount. */
  active: boolean;
  /** The "customer #N" the next person to sign would be. */
  customerNumber: number;
  discountPercent: number;
  /** "delivery" = 100% due on delivery, nothing upfront. "standard" = 50/50 split. */
  paymentTerms: "delivery" | "standard";
  spotsLeft: number;
};

export function getLaunchOfferStatus(
  customersServiced: number = CUSTOMERS_SERVICED
): LaunchOfferStatus {
  const customerNumber = customersServiced + 1;
  const discountPercent =
    customerNumber === 1 ? 50 : customerNumber <= DISCOUNTED_SPOTS ? 30 : 0;

  return {
    active: discountPercent > 0,
    customerNumber,
    discountPercent,
    paymentTerms: discountPercent > 0 ? "delivery" : "standard",
    spotsLeft: Math.max(0, DISCOUNTED_SPOTS - customersServiced),
  };
}

export const launchOffer = getLaunchOfferStatus();
