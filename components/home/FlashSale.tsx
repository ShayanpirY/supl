import Link from "next/link";
import { ArrowLeft, Timer, Zap } from "lucide-react";
import { getProducts } from "@/lib/data/db";
import type { Product } from "@/lib/types";
import FlashSaleSlider from "./FlashSaleSlider";
import FlashSaleCountdown from "./FlashSaleCountdown";

function discountPercent(product: Product): number {
  const variant =
    product.variants.find((v) => v.id === product.defaultVariantId) ??
    product.variants[0];
  if (!variant?.oldPriceInAED || variant.priceInAED >= variant.oldPriceInAED) {
    return 0;
  }
  return Math.round(
    ((variant.oldPriceInAED - variant.priceInAED) / variant.oldPriceInAED) * 100,
  );
}

export default async function FlashSale() {
  const products = await getProducts({});
  const discounted = products
    .filter((product) => discountPercent(product) > 0)
    .sort((a, b) => discountPercent(b) - discountPercent(a))
    .slice(0, 10);

  if (discounted.length === 0) return null;

  return (
    <section className="rounded-2xl bg-red-600 p-6 shadow-xl shadow-red-600/25">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
        <div className="w-full text-center md:w-72 md:shrink-0 md:text-right">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-black text-white">
            <Zap className="h-3.5 w-3.5 fill-current" />
            پیشنهاد ویژه
          </span>
          <h2 className="mt-3 text-2xl font-black text-white">
            پیشنهاد شگفت‌انگیز
          </h2>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-white/85 md:justify-start">
            <Timer className="h-4 w-4" />
            تا پایان تخفیف‌های شگفت‌انگیز، همراه ما باشید
          </p>
          <FlashSaleCountdown hours={12} />
          <Link
            href="/products"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-red-600 shadow-md transition-all duration-300 hover:bg-red-50 hover:shadow-lg active:scale-95"
          >
            مشاهده همه
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="min-w-0 flex-1">
          <FlashSaleSlider products={discounted} />
        </div>
      </div>
    </section>
  );
}
