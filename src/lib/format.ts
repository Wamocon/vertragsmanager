/**
 * German number formatting utilities.
 * Uses Trennpunkt (.) for thousands and comma (,) for decimals.
 * Example: 1.234,56 €
 */

/**
 * Format a number as currency (EUR) in German locale.
 * 1234.56 → "1.234,56 €"
 */
export function formatCurrency(amount: number, locale: string = 'de'): string {
  const formatter = new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
}

/**
 * Format a number with German locale grouping.
 * 1234.56 → "1.234,56"
 */
export function formatNumber(value: number, locale: string = 'de', decimals: number = 2): string {
  const formatter = new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return formatter.format(value);
}

/**
 * Format a number as a percentage in locale-appropriate format.
 * 19 → "19,00 %" (de) or "19.00%" (en)
 */
export function formatPercent(value: number, locale: string = 'de'): string {
  const formatter = new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatter.format(value / 100);
}

/**
 * Compute monthly cost from a contract's amount + payment interval.
 */
export function computeMonthlyAmount(amount: number, interval: string): number {
  switch (interval) {
    case 'monthly': return amount;
    case 'quarterly': return amount / 3;
    case 'yearly': return amount / 12;
    case 'one_time': return 0;
    default: return 0;
  }
}

/**
 * Convert net amount to gross (add tax).
 */
export function netToGross(netAmount: number, taxRate: number): number {
  return netAmount * (1 + taxRate / 100);
}

/**
 * Convert gross amount to net (remove tax).
 */
export function grossToNet(grossAmount: number, taxRate: number): number {
  return grossAmount / (1 + taxRate / 100);
}

/**
 * Compute projected total lifetime cost for a contract.
 * For one-time: just the amount.
 * For recurring: monthly cost × months remaining (or from start to end).
 */
export function computeProjectedTotalCost(
  amount: number,
  interval: string,
  startDate: string,
  endDate: string | null,
  autoRenew: boolean,
  renewalCount: number = 0,
  maxRenewals: number | null = null,
): number {
  if (interval === 'one_time') return amount;

  const monthly = computeMonthlyAmount(amount, interval);
  const start = new Date(startDate);
  const now = new Date();

  if (endDate) {
    const end = new Date(endDate);
    // If auto-renew, project additional renewal periods
    if (autoRenew && maxRenewals !== null && maxRenewals > renewalCount) {
      const periodMonths = monthsBetween(start, end);
      const remainingRenewals = maxRenewals - renewalCount;
      const totalMonths = monthsBetween(start > now ? start : now, end) + (periodMonths * remainingRenewals);
      return monthly * Math.max(totalMonths, 0);
    }
    const months = monthsBetween(start > now ? start : now, end);
    return monthly * Math.max(months, 0);
  }

  // No end date: project 12 months from now
  return monthly * 12;
}

function monthsBetween(a: Date, b: Date): number {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
}
