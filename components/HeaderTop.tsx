"use client";

import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";

export default function HeaderTop() {
  const { rate } = useCurrency();

  return (
    <div className="w-full bg-red-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-bold sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          نرخ روز درهم امارات: {formatToman(rate.aedToToman)} تومان | تمامی قیمت‌ها بر اساس نرخ روز درهم محاسبه می‌شوند.
        </span>
      </div>
    </div>
  );
}
