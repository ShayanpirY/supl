"use client";

import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";

export default function HeaderTop() {
  const { rate } = useCurrency();

  return (
    <div className="w-full bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-medium text-red-400 sm:px-6 lg:px-8" style={{ textShadow: "0 0 8px rgba(229,9,20,0.5)" }}>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          نرخ روز درهم امارات: {formatToman(rate.aedToToman)} تومان | تمامی قیمت‌ها بر اساس نرخ روز درهم محاسبه می‌شوند.
        </span>
      </div>
    </div>
  );
}
