"use client";

import Link from "next/link";
import { Star, ShoppingCart, Video, BadgeCheck } from "lucide-react";
import { Product } from "@/lib/types";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

function PlaceholderImage({ product }: { product: Product }) {
  const hue = product.id.charCodeAt(0) % 360;
  return (
    <div
      className="flex aspect-square w-full items-center justify-center"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 45% 92%), hsl(${hue} 55% 84%))`,
      }}
    >
      <span className="select-none text-4xl font-black text-white drop-shadow-md">
        {product.brand.charAt(0)}
      </span>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { toToman } = useCurrency();
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const variant = product.variants.find((v) => v.id === product.defaultVariantId)!;
  const inStock = variant?.inStock;
  const price = toToman(variant?.priceInAED ?? 0);
  const oldPrice = variant?.oldPriceInAED
    ? toToman(variant.oldPriceInAED)
    : undefined;
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, product.defaultVariantId);
    setCartOpen(true);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-red/10">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block">
          <PlaceholderImage product={product} />
        </Link>

        {/* Badges */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-brand-red px-2.5 py-1 text-[11px] font-black text-white shadow-md">
              ٪{discount} تخفیف
            </span>
          )}
          {product.bestSeller && (
            <span className="rounded-full bg-brand-dark px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
              پرفروش
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
              جدید
            </span>
          )}
        </div>

        {/* Unboxing video badge */}
        {product.hasUnboxingVideo && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-brand-dark shadow-md backdrop-blur">
            <Video className="h-3 w-3 text-brand-red" />
            ویدیوی آنباکسینگ
          </span>
        )}

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <span className="rounded-full bg-brand-dark px-4 py-1.5 text-xs font-bold text-white">
              ناموجود
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold text-gray-400">{product.brand}</p>
        <Link
          href={`/product/${product.slug}`}
          className="mt-1 line-clamp-2 text-sm font-extrabold leading-6 text-brand-dark transition-colors hover:text-brand-red"
        >
          {product.name}
        </Link>

        <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-brand-dark">{product.rating}</span>
          <span>({product.reviewCount} نظر)</span>
        </div>

        <div className="mt-3 flex items-end justify-between border-t border-gray-50 pt-3">
          <div>
            {oldPrice && (
              <p className="text-xs text-gray-400 line-through" dir="rtl">
                {formatToman(oldPrice)} تومان
              </p>
            )}
            <p className="flex items-baseline gap-1">
              <span className={cn("text-lg font-black", inStock ? "text-brand-red" : "text-gray-400")}>
                {formatToman(price)}
              </span>
              <span className="text-xs font-bold text-gray-500">تومان</span>
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white transition-all hover:bg-brand-red active:scale-90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            aria-label="افزودن به سبد خرید"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
          </button>
        </div>

        <p className="mt-2 flex items-center gap-1 text-[10px] font-bold text-gray-400">
          <BadgeCheck className="h-3.5 w-3.5 text-green-600" />
          ضمانت اصالت کالا — واردات مستقیم از دبی
        </p>
      </div>
    </div>
  );
}
