import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined) return "Unavailable";

  const formatted = amount.toLocaleString('en-US');
  return `$${formatted}`;
}

export function getPricingForYear(year: number): TierPricing {
  switch (year) {
    case 2025:
      return pricing2025;
    default:
      return pricing2025;
  }
}

export function calculateSpecializationCost(totalCredits: number, tier: number, year: number = 2025): number {
  const pricing = getPricingForYear(year);

  const pricePerCredit = pricing[tier] ?? pricing[1];

  return totalCredits * pricePerCredit;
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