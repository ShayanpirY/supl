"use client";

import { BadgeDollarSign, ShieldCheck, Truck } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";

export default function TopBar() {
  const { rate } = useCurrency();

  return (
    <div className="bg-brand-red text-white">
      <div className="container-x flex h-10 items-center justify-between text-xs font-medium">
        <p className="flex items-center gap-2">
          <BadgeDollarSign className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">نرخ درهم:</span>
          <span className="font-extrabold" dir="ltr">
            {formatToman(rate.aedToToman)}
          </span>
          <span>تومان</span>
        </p>

        <p className="hidden items-center gap-1.5 md:flex">
          <ShieldCheck className="h-4 w-4" />
          همه قیمت‌ها بر اساس نرخ لحظه‌ای درهم محاسبه می‌شوند
        </p>

        <p className="flex items-center gap-1.5">
          <Truck className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">واردات مستقیم از دبی —</span>
          ارسال ۲ تا ۴ روز کاری
        </p>
      </div>
    </div>
  );
}
