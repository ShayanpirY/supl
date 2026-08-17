"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Product } from "@/lib/types";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";
import { useCartStore } from "@/store/cart-store";
import { getProductImage } from "@/lib/product-images";

function SliderCard({ product }: { product: Product }) {
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md">
      <div className="relative overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`} className="block">
          <div className="relative aspect-square w-full">
            <Image
              src={imageUrl}
              alt={product.images?.[0]?.alt ?? product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-contain p-3 transition-transform duration-300 ease-in-out group-hover:scale-105"
              unoptimized={imageUrl.startsWith("data:")}
            />
          </div>
        </Link>

        {discount > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-[10px] font-black text-white shadow-md">
            ٪{discount} تخفیف
          </span>
        )}

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <span className="rounded-full bg-gray-800 px-3 py-1 text-[11px] font-bold text-white">
              ناموجود
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 min-h-10 text-sm font-extrabold leading-5 text-gray-900 transition-colors duration-300 hover:text-red-600"
        >
          {product.name}
        </Link>

        <div className="mt-auto pt-3">
          <p className="truncate text-[11px] font-bold text-gray-500">
            {product.brand}
          </p>

          <div className="mt-1.5 flex items-end justify-between gap-2">
            <div>
              {oldPrice && (
                <p className="text-[11px] text-gray-400 line-through">
                  {formatToman(oldPrice)}
                </p>
              )}
              <p className="flex items-baseline gap-1">
                <span className="text-sm font-black text-red-600">
                  {formatToman(price)}
                </span>
                <span className="text-[10px] font-bold text-gray-500">تومان</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock}
              aria-label="افزودن به سبد خرید"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white shadow-sm transition-all duration-300 hover:bg-red-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

interface ProductSliderProps {
  products: Product[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
  if (products.length === 0) return null;

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={2}
        spaceBetween={12}
        loop={products.length > 5}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
          1280: { slidesPerView: 5, spaceBetween: 16 },
        }}
        className="product-slider !pb-9"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <SliderCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}