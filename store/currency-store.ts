"use client";

import { create } from "zustand";
import { ExchangeRate } from "../lib/types";
import { DEFAULT_EXCHANGE_RATE } from "../lib/currency";

interface CurrencyState {
  rate: ExchangeRate;
  isLoading: boolean;
  /** Sets a rate fetched from an API/config source */
  setRate: (rate: ExchangeRate) => void;
  /** Returns the latest configured AED->Toman rate */
  getRate: () => number;
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  rate: DEFAULT_EXCHANGE_RATE,
  isLoading: false,
  setRate: (rate) => set({ rate, isLoading: false }),
  getRate: () => get().rate.aedToToman,
}));
