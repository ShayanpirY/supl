"use client";

import Link from "next/link";
import { Star, ShoppingCart, Video, BadgeCheck, Flame } from "lucide-react";
import { Product } from "@/lib/types";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function PlaceholderImage({ product }: { product: Product }) {
  const hue = product.id.charCodeAt(0) % 360;
  return (
    <div
      className="flex aspect-square w-full items-center justify-center"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 45% 15%), hsl(${hue} 55% 8%))`,
      }}
    >
      <span className="select-none text-4xl font-black text-white/20 drop-shadow-md">
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
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#e50914]/50 hover:shadow-[0_0_30px_rgba(229,9,20,0.15)]">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block">
          <PlaceholderImage product={product} />
        </Link>

        {/* Badges */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e50914] px-2.5 py-1 text-[11px] font-black text-white shadow-md shadow-red-900/50">
              <Flame className="h-3 w-3" />
              ٪{discount} تخفیف
            </span>
          )}
          {product.bestSeller && (
            <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-[11px] font-bold text-white border border-white/10">
              پرفروش
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-red-600/20 border border-red-500/30 px-2.5 py-1 text-[11px] font-bold text-red-400">
              جدید
            </span>
          )}
        </div>

        {/* Unboxing video badge */}
        {product.hasUnboxingVideo && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2 py-1 text-[10px] font-bold text-white border border-white/10">
            <Video className="h-3 w-3 text-[#e50914]" />
            ویدیوی آنباکسینگ
          </span>
        )}

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="rounded-full bg-zinc-800 px-4 py-1.5 text-xs font-bold text-white border border-white/10">
              ناموجود
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold text-zinc-500">{product.brand}</p>
        <Link
          href={`/product/${product.slug}`}
          className="mt-1 line-clamp-2 text-sm font-extrabold leading-6 text-zinc-200 transition-colors duration-300 hover:text-[#e50914]"
        >
          {product.name}
        </Link>

        <div className="mt-1.5 flex items-center gap-1 text-xs text-zinc-500">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          <span className="font-bold text-zinc-300">{product.rating}</span>
          <span>({product.reviewCount} نظر)</span>
        </div>

        {/* Weight / flavor badge */}
        <div className="mt-2">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-zinc-400">
            {variant.label}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-white/5 p-4 pt-3">
        <div>
          {oldPrice && (
            <p className="text-xs text-zinc-600 line-through" dir="rtl">
              {formatToman(oldPrice)} تومان
            </p>
          )}
          <p className="flex items-baseline gap-1">
            <span className={cn("text-lg font-black", inStock ? "text-[#e50914]" : "text-zinc-600")}>
              {formatToman(price)}
            </span>
            <span className="text-xs font-bold text-zinc-500">تومان</span>
          </p>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!inStock}
          size="sm"
          className="h-10 gap-2 rounded-xl font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">افزودن به سبد خرید</span>
          <span className="sm:hidden">افزودن</span>
        </Button>
      </div>

      <div className="flex items-center gap-1 border-t border-white/5 px-4 py-2.5 text-[10px] font-bold text-zinc-500">
        <BadgeCheck className="h-3.5 w-3.5 text-green-500" />
        ضمانت اصالت کالا — واردات مستقیم از دبی
      </div>
    </div>
  );
}
