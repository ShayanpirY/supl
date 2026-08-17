"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, Maximize2 } from "lucide-react";
import { Product } from "@/lib/types";
import { getProductImage, getProductImages } from "@/lib/product-images";

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const images = getProductImages(product.images);
  const activeImage = images[Math.min(active, images.length - 1)];

  return (
    <div className="flex flex-col gap-4">
      {/* تصویر اصلی / ویدیو */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
        {showVideo ? (
          <div className="flex aspect-square w-full flex-col items-center justify-center gap-4 bg-gray-900">
            <PlayCircle className="h-16 w-16 text-red-600" />
            <p className="text-sm font-bold text-white">
              ویدیوی آنباکسینگ {product.brand} — پس از پردازش نمایش داده می‌شود
            </p>
          </div>
        ) : (
          <div className="relative aspect-square w-full">
            <Image
              src={activeImage.url}
              alt={activeImage.alt ?? product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4"
              unoptimized={activeImage.url.startsWith("data:")}
              priority
            />
          </div>
        )}

        {product.hasUnboxingVideo && (
          <button
            onClick={() => setShowVideo((v) => !v)}
            className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            <PlayCircle className="h-4 w-4" />
            {showVideo ? "بازگشت به تصویر" : "پخش ویدیوی آنباکسینگ"}
          </button>
        )}

        <button
          className="absolute left-4 top-4 rounded-full bg-white/80 p-2 text-gray-900 shadow-md backdrop-blur transition-colors hover:text-red-600"
          aria-label="نمایش بزرگ"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* تصاویر کوچک (Thumbnails) */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={`${img.url}-${i}`}
            onClick={() => {
              setShowVideo(false);
              setActive(i);
            }}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
              active === i
                ? "border-red-600 ring-2 ring-red-600/20"
                : "border-gray-100 hover:border-gray-300"
            }`}
            aria-label={img.alt ?? product.name}
          >
            <div className="relative h-full w-full bg-gray-50">
              <Image
                src={img.url}
                alt={img.alt ?? product.name}
                fill
                sizes="80px"
                className="object-contain p-1"
                unoptimized={img.url.startsWith("data:")}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}