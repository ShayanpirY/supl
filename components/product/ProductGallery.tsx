"use client";

import { useState } from "react";
import { PlayCircle, Maximize2 } from "lucide-react";
import { Product } from "@/lib/types";

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image / video placeholder */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-surface-subtle">
        {showVideo ? (
          <div className="flex aspect-square w-full flex-col items-center justify-center gap-4 bg-brand-dark">
            <PlayCircle className="h-16 w-16 text-brand-red" />
            <p className="text-sm font-bold text-white">
              ویدیوی آنباکسینگ {product.brand} — پس از پردازش نمایش داده می‌شود
            </p>
          </div>
        ) : (
          <div
            className="flex aspect-square w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, hsl(${product.id.charCodeAt(0) % 360} 45% 94%), hsl(${product.id.charCodeAt(0) % 360} 55% 86%))`,
            }}
          >
            <span className="select-none text-7xl font-black text-white drop-shadow-lg">
              {product.brand.charAt(0)}
            </span>
          </div>
        )}

        {product.hasUnboxingVideo && (
          <button
            onClick={() => setShowVideo((v) => !v)}
            className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-brand-red px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            <PlayCircle className="h-4 w-4" />
            {showVideo ? "بازگشت به تصویر" : "پخش ویدیوی آنباکسینگ"}
          </button>
        )}

        <button
          className="absolute top-4 left-4 rounded-full bg-white/80 p-2 text-brand-dark shadow-md backdrop-blur transition-colors hover:text-brand-red"
          aria-label="نمایش بزرگ"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {product.images.map((img, i) => (
          <button
            key={img.url}
            onClick={() => {
              setShowVideo(false);
              setActive(i);
            }}
            className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
              active === i
                ? "border-brand-red ring-2 ring-brand-red/20"
                : "border-gray-100 hover:border-gray-300"
            }`}
            aria-label={img.alt}
          >
            <div
              className="flex h-full w-full items-center justify-center text-lg font-black text-white"
              style={{
                background: `linear-gradient(135deg, hsl(${(product.id.charCodeAt(0) + i * 40) % 360} 45% 90%), hsl(${(product.id.charCodeAt(0) + i * 40) % 360} 55% 80%))`,
              }}
            >
              {i + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
