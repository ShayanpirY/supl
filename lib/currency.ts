import { ExchangeRate } from "./types";

export const DEFAULT_AED_TO_TOMAN = 52_500;

export const DEFAULT_EXCHANGE_RATE: ExchangeRate = {
  aedToToman: DEFAULT_AED_TO_TOMAN,
  currencyCode: "AED",
  updatedAt: new Date().toISOString(),
  source: "متاباع مرکزی ایران",
  refreshInterval: 10 * 60 * 1000,
};

export function formatToman(amount: number): string {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function tomanFromAED(priceInAED: number, rate: number): number {
  return Math.round(priceInAED * rate);
}
