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