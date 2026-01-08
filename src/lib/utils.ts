import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | undefined, compact: boolean = false): string {
  if (amount === undefined) return "Unavailable";

  const formatted = amount.toLocaleString('en-US', { notation: compact ? "compact" : "standard" });
  return `$${formatted}`;
}

export function formatPercentage(amount: number | undefined, compact: boolean = false): string {
  return (amount === undefined) ? `--%` : `${amount}%`;
}

export function getPricingForYear(year: number): TierPricing {
  switch (year) {
    case 2025:
      return pricing2025;
    default:
      return pricing2025;
  }
}

export function calculateSemesterCost(totalCredits: number, isPBE: boolean = false, tier: number = 1, year: number = 2025): number {
  const pricing = getPricingForYear(year);

  const pricePerCredit = pricing[tier];

  return (isPBE && totalCredits > 12 ? 12 : totalCredits) * pricePerCredit;
}

export interface TierPricing {
  [tier: number]: number;
}

export const pricing2025: TierPricing = {
  1: 307,
  2: 270,
  3: 232,
  4: 194
};