"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Video, BadgeCheck, Flame } from "lucide-react";
import { Product } from "@/lib/types";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getProductImage } from "@/lib/product-images";

export default function ProductCard({ product }: { product: Product }) {
  const { toToman } = useCurrency();
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);

  const variant =
    product.variants.find((v) => v.id === product.defaultVariantId) ??
    product.variants[0];

  const inStock = variant?.inStock ?? false;
  const price = toToman(variant?.priceInAED ?? 0);
  const oldPrice = variant?.oldPriceInAED
    ? toToman(variant.oldPriceInAED)
    : undefined;
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  const imageUrl = getProductImage(product.images);

  const handleAddToCart = () => {
    if (!variant) return;
    addItem(product, variant.id);
    setCartOpen(true);
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md">
      {/* تصویر محصول */}
      <div className="relative overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`} className="block">
          <div className="relative aspect-square w-full">
            <Image
              src={imageUrl}
              alt={product.images?.[0]?.alt ?? product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-3 transition-transform duration-300 ease-in-out group-hover:scale-105"
              unoptimized={imageUrl.startsWith("data:")}
            />
          </div>
        </Link>

        {/* بج‌ها */}
        <div className="absolute right-2 top-2 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-black text-white shadow-md">
              <Flame className="h-3 w-3" />
              ٪{discount} تخفیف
            </span>
          )}
          {product.bestSeller && (
            <span className="rounded-full bg-gray-800 px-2.5 py-1 text-[11px] font-bold text-white">
              پرفروش
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full border border-red-200 bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-700">
              جدید
            </span>
          )}
        </div>

        {product.hasUnboxingVideo && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-gray-200 bg-white/90 px-2 py-1 text-[10px] font-bold text-gray-800 shadow-sm">
            <Video className="h-3 w-3 text-red-600" />
            ویدیوی آنباکسینگ
          </span>
        )}

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <span className="rounded-full bg-gray-800 px-4 py-1.5 text-xs font-bold text-white">
              ناموجود
            </span>
          </div>
        )}
      </div>

      {/* اطلاعات */}
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-sm font-extrabold leading-6 text-gray-900 transition-colors duration-300 hover:text-red-600"
        >
          {product.name}
        </Link>

        <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-500">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          <span className="font-bold text-gray-800">{product.rating}</span>
          <span>({product.reviewCount} نظر)</span>
        </div>

        {variant?.label && (
          <div className="mt-2">
            <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-bold text-gray-600">
              {variant.label}
            </span>
          </div>
        )}

        <div className="mt-auto pt-3">
          <p className="truncate text-[11px] font-bold text-gray-500">
            {product.brand}
          </p>
        </div>
      </div>

      {/* قیمت + دکمه */}
      <div className="flex items-end justify-between border-t border-gray-100 p-4 pt-3">
        <div>
          {oldPrice && (
            <p className="text-xs text-gray-400 line-through" dir="rtl">
              {formatToman(oldPrice)} تومان
            </p>
          )}
          <p className="flex items-baseline gap-1">
            <span
              className={cn(
                "text-lg font-black",
                inStock ? "text-red-600" : "text-gray-400",
              )}
            >
              {formatToman(price)}
            </span>
            <span className="text-xs font-bold text-gray-500">تومان</span>
          </p>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!inStock}
          size="sm"
          className="h-10 gap-2 rounded-xl font-bold transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">افزودن</span>
        </Button>
      </div>

      <div className="flex items-center gap-1 border-t border-gray-100 px-4 py-2.5 text-[10px] font-bold text-gray-500">
        <BadgeCheck className="h-3.5 w-3.5 text-green-600" />
        ضمانت اصالت کالا — واردات مستقیم از دبی
      </div>
    </div>
  );
}