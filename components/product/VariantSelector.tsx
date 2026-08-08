"use client";

import { Check } from "lucide-react";
import { Product, ProductVariant } from "@/lib/types";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";
import { cn } from "@/lib/utils";

export default function VariantSelector({
  product,
  selectedVariantId,
  onSelect,
}: {
  product: Product;
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
}) {
  const { toToman } = useCurrency();
  const selected = product.variants.find((v) => v.id === selectedVariantId);

  const renderVariant = (variant: ProductVariant) => {
    const active = variant.id === selectedVariantId;
    return (
      <button
        key={variant.id}
        onClick={() => variant.inStock && onSelect(variant.id)}
        disabled={!variant.inStock}
        className={cn(
          "relative flex flex-1 flex-col gap-1 rounded-xl border-2 p-3 text-right transition-all",
          active
            ? "border-brand-red bg-brand-red/5 shadow-md shadow-brand-red/10"
            : "border-gray-200 bg-white hover:border-gray-400",
          !variant.inStock && "cursor-not-allowed opacity-50",
        )}
      >
        {active && (
          <span className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-white">
            <Check className="h-3 w-3" />
          </span>
        )}
        <span className="text-xs font-extrabold text-brand-dark">
          {variant.label}
        </span>
        <span className="text-[11px] font-bold text-gray-500">
          {formatToman(toToman(variant.priceInAED))} تومان
        </span>
        {variant.oldPriceInAED && (
          <span className="text-[10px] text-gray-400 line-through">
            {formatToman(toToman(variant.oldPriceInAED))} تومان
          </span>
        )}
        {!variant.inStock && (
          <span className="text-[10px] font-bold text-gray-400">ناموجود</span>
        )}
      </button>
    );
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-extrabold text-gray-500">
          انتخاب طعم / وزن / سروینگ
        </label>
        <span className="text-[10px] font-bold text-gray-400">
          {selected?.label}
        </span>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {product.variants.map(renderVariant)}
      </div>
    </div>
  );
}
