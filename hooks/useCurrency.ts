"use client";

import { useCallback, useEffect, useState } from "react";
import { useCurrencyStore } from "@/store/currency-store";
import { DEFAULT_EXCHANGE_RATE } from "@/lib/currency";

/**
 * Currency conversion hook.
 * Automatically re-fetches the configured AED->IRR rate on an interval
 * (falls back to the default configured rate when no endpoint is set).
 */
export function useCurrency() {
  const rate = useCurrencyStore((s) => s.rate);
  const setRate = useCurrencyStore((s) => s.setRate);
  const isLoading = useCurrencyStore((s) => s.isLoading);

  useEffect(() => {
    const controller = new AbortController();
    let timeout: ReturnType<typeof setTimeout>;

    const fetchRate = async () => {
      try {
        const res = await fetch("/api/exchange-rate", { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          setRate({ ...DEFAULT_EXCHANGE_RATE, ...data });
        }
      } catch {
        // keep default configured rate when the endpoint is unavailable
      }
    };

    fetchRate();
    timeout = setTimeout(fetchRate, rate.refreshInterval);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [rate.refreshInterval, setRate]);

  const toToman = useCallback(
    (priceInAED: number) => Math.round(priceInAED * rate.aedToToman),
    [rate.aedToToman],
  );

  return { rate, toToman, isLoading };
}
