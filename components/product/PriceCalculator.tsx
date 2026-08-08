"use client";

import { Info, TrendingUp } from "lucide-react";
import { Product } from "@/lib/types";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";

export default function PriceCalculator({
  product,
  selectedVariantId,
}: {
  product: Product;
  selectedVariantId: string;
}) {
  const { rate, toToman } = useCurrency();
  const variant = product.variants.find((v) => v.id === selectedVariantId);
  if (!variant) return null;

  const priceInAED = variant.priceInAED;
  const tomanPrice = toToman(priceInAED);
  const oldAED = variant.oldPriceInAED;
  const oldToman = oldAED ? toToman(oldAED) : undefined;
  const discount = oldToman
    ? Math.round(((oldToman - tomanPrice) / oldToman) * 100)
    : 0;

  return (
    <div className="rounded-2xl border border-brand-red/20 bg-gradient-to-b from-brand-red/5 to-white p-5">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-brand-red" />
        <h3 className="text-sm font-extrabold text-brand-dark">
          محاسبه قیمت زنده بر اساس نرخ درهم
        </h3>
        <span className="mr-auto rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
          به‌روزرسانی خودکار
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">قیمت پایه (درهم)</span>
          <span className="font-bold text-gray-700" dir="ltr">
            {priceInAED.toFixed(2)} AED
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">نرخ تبدیل ۱ درهم</span>
          <span className="font-bold text-brand-red" dir="ltr">
            {formatToman(rate.aedToToman)} تومان
          </span>
        </div>

        <div className="border-t border-dashed border-gray-200 pt-3">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <span className="text-sm font-extrabold text-gray-600">
              قیمت نهایی شما
            </span>
            <div className="text-left">
              {oldToman && (
                <p className="text-sm text-gray-400 line-through">
                  {formatToman(oldToman)} تومان
                </p>
              )}
              <p className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-brand-red">
                  {formatToman(tomanPrice)}
                </span>
                <span className="text-sm font-bold text-gray-500">تومان</span>
                {discount > 0 && (
                  <span className="rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-black text-white">
                    ٪{discount}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-1.5 rounded-lg bg-surface-subtle p-3 text-[11px] leading-5 text-gray-500">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" />
        قیمت‌ها به‌صورت خودکار و لحظه‌ای بر اساس نرخ رسمی درهم امارات به تومان
        محاسبه می‌شوند و ممکن است تا لحظه ثبت سفارش تغییر کنند.
      </p>
    </div>
  );
}
