"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, TrendingUp, ArrowLeft } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { useCurrency } from "@/hooks/useCurrency";
import { useDebounce } from "@/hooks/useDebounce";
import { formatToman } from "@/lib/currency";
import { PRODUCTS } from "@/lib/data/products";

const QUICK_SUGGESTIONS = [
  "وی پروتئین",
  "کراتین",
  "پری‌ورک‌اوت",
  "چربی سوز",
  "ایزوله",
  "آمینو",
  "BCAA",
  "گینر",
];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUIStore();
  const { toToman } = useCurrency();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);

  const results = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) return [];
    const lower = q.toLowerCase();
    return PRODUCTS.filter((p) =>
      [
        p.name,
        p.brand,
        p.category,
        p.subcategory,
        p.summary,
        ...p.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(lower),
    ).slice(0, 8);
  }, [debouncedQuery]);

  if (!searchOpen) return null;

  const close = () => {
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <div className="fixed inset-0 z-[65] animate-fade-in">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />

      <div className="mx-auto mt-20 w-full max-w-2xl animate-slide-up px-4">
        <div className="overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
            <Search className="h-5 w-5 shrink-0 text-red-600" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو در بیش از ۲۰۰۰ محصول... (مثلا: وی پروتئین، کراتین)"
              className="flex-1 bg-transparent text-sm font-bold text-gray-900 outline-none placeholder:font-normal placeholder:text-gray-500"
            />
            <button
              onClick={close}
              className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600"
              aria-label="بستن جستجو"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!debouncedQuery.trim() && (
            <div className="p-5">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-bold text-gray-500">
                <TrendingUp className="h-3.5 w-3.5 text-red-600" />
                جستجوهای پرطرفدار
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-bold text-gray-700 transition-all duration-300 hover:border-red-600 hover:text-red-600"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {debouncedQuery.trim() && (
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="p-6 text-center text-sm text-gray-500">
                  محصولی با عبارت «{debouncedQuery}» پیدا نشد.
                </p>
              ) : (
                results.map((p) => {
                  const v = p.variants.find((x) => x.id === p.defaultVariantId)!;
                  return (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={close}
                      className="flex items-center gap-3 rounded-xl p-3 transition-colors duration-300 hover:bg-gray-50"
                    >
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg font-black text-gray-400"
                      >
                        {p.brand.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold text-gray-900">
                          {p.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {p.brand} — {p.subcategory}
                        </p>
                      </div>
                      <div className="shrink-0 text-left">
                        <p className="text-sm font-black text-red-600">
                          {formatToman(toToman(v?.priceInAED ?? 0))}
                        </p>
                        <p className="text-[10px] font-bold text-gray-500">
                          تومان
                        </p>
                      </div>
                      <ArrowLeft className="h-4 w-4 shrink-0 text-gray-400" />
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
