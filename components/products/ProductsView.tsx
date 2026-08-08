"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, SearchX } from "lucide-react";
import type { Product } from "@/lib/types";
import type { ProductFacets } from "@/lib/data/db";
import type { ProductFilters, ProductSort } from "@/lib/product-filters";
import { buildProductsUrl } from "@/lib/product-filters";
import ProductCard from "@/components/ProductCard";
import ProductsFilters from "@/components/products/ProductsFilters";

const SORT_LABELS: { value: ProductSort; label: string }[] = [
  { value: "newest", label: "جدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "mostExpensive", label: "گران‌ترین" },
  { value: "bestSelling", label: "پرفروش‌ترین" },
];

interface ProductsViewProps {
  products: Product[];
  facets: ProductFacets;
  initialFilters: ProductFilters;
}

export default function ProductsView({
  products,
  facets,
  initialFilters,
}: ProductsViewProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.brands?.length) count += filters.brands.length;
    if (filters.categorySlug) count += 1;
    if (filters.minPrice != null) count += 1;
    if (filters.maxPrice != null) count += 1;
    if (filters.inStockOnly) count += 1;
    return count;
  }, [filters]);

  const applyFilters = (next: ProductFilters) => {
    setFilters(next);
    router.replace(buildProductsUrl(next), { scroll: false });
  };

  return (
    <div className="container-x py-8">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="transition-colors hover:text-red-600">
          خانه
        </Link>
        <ChevronDown className="h-3 w-3 -rotate-90" />
        <span className="font-bold text-gray-900">محصولات</span>
      </nav>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-gray-900">همه محصولات</h1>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
          <span className="text-xs font-bold text-gray-500">مرتب‌سازی:</span>
          <select
            value={filters.sort ?? "newest"}
            onChange={(event) =>
              applyFilters({
                ...filters,
                sort: event.target.value as ProductSort,
              })
            }
            className="cursor-pointer bg-transparent text-xs font-extrabold text-gray-900 outline-none"
          >
            {SORT_LABELS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ProductsFilters facets={facets} filters={filters} onChange={applyFilters} />
          </div>
        </aside>

        {/* Mobile filter button */}
        <button
          type="button"
          onClick={() => setMobileFiltersOpen((open) => !open)}
          className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-extrabold text-gray-900 shadow-sm lg:hidden"
        >
          فیلترها
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile filters panel */}
      {mobileFiltersOpen && (
        <div className="mb-6 lg:hidden">
          <ProductsFilters facets={facets} filters={filters} onChange={applyFilters} />
        </div>
      )}

      {products.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
          <SearchX className="mb-4 h-14 w-14 text-gray-300" />
          <p className="mb-1 text-lg font-extrabold text-gray-900">
            محصولی یافت نشد
          </p>
          <p className="mb-6 text-sm text-gray-500">
            فیلترهای انتخابی خود را تغییر دهید یا حذف کنید.
          </p>
          <button
            type="button"
            onClick={() => applyFilters({ sort: filters.sort })}
            className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-red-700"
          >
            حذف همه فیلترها
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
