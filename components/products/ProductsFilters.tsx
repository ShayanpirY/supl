"use client";

import { Package, Trash2 } from "lucide-react";
import type { ProductFacets } from "@/lib/data/db";
import type { ProductFilters } from "@/lib/product-filters";
import { BRANDS } from "@/lib/data/categories";
import PriceSlider from "@/components/products/PriceSlider";

const NAME_TO_SLUG = Object.fromEntries(
  BRANDS.map((brand) => [brand.name, brand.slug]),
) as Record<string, string>;

interface ProductsFiltersProps {
  facets: ProductFacets;
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
}

export default function ProductsFilters({
  facets,
  filters,
  onChange,
}: ProductsFiltersProps) {
  const activeBrands = filters.brands ?? [];
  const activeCategory = filters.categorySlug;

  const toggleBrand = (slug: string) => {
    const next = activeBrands.includes(slug)
      ? activeBrands.filter((item) => item !== slug)
      : [...activeBrands, slug];
    onChange({ ...filters, brands: next.length > 0 ? next : undefined });
  };

  const toggleCategory = (slug: string) => {
    onChange({ ...filters, categorySlug: activeCategory === slug ? undefined : slug });
  };

  const hasActiveFilters =
    activeBrands.length > 0 ||
    activeCategory != null ||
    filters.minPrice != null ||
    filters.maxPrice != null ||
    filters.inStockOnly === true;

  return (
    <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="flex items-center gap-2 text-sm font-extrabold text-gray-900">
          <Package className="h-4 w-4 text-red-600" />
          فیلترها
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => onChange({ sort: filters.sort })}
            className="flex items-center gap-1 text-[11px] font-bold text-red-600 transition-colors hover:text-red-700"
          >
            <Trash2 className="h-3.5 w-3.5" />
            حذف فیلترها
          </button>
        )}
      </div>

      {/* Category filter */}
      <div>
        <h3 className="mb-3 text-xs font-extrabold text-gray-900">دسته‌بندی‌ها</h3>
        <ul className="space-y-1">
          {facets.categories.map((category) => {
            const active = activeCategory === category.slug;
            return (
              <li key={category.slug}>
                <button
                  type="button"
                  onClick={() => toggleCategory(category.slug)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-right text-xs font-bold transition-colors ${
                    active
                      ? "bg-red-600 text-white"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  <span>{category.name}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Brand filter */}
      <div>
        <h3 className="mb-3 text-xs font-extrabold text-gray-900">برندها</h3>
        <ul className="space-y-2">
          {facets.brands.map((brand) => {
            const slug = NAME_TO_SLUG[brand.name] ?? brand.name;
            const checked = activeBrands.includes(slug);
            return (
              <li key={brand.name}>
                <label className="flex cursor-pointer items-center gap-2.5 text-xs font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleBrand(slug)}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-red-600"
                  />
                  <span className="flex-1">{brand.name}</span>
                  <span className="text-[10px] font-bold text-gray-400">
                    {brand.count}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price filter */}
      <div>
        <h3 className="mb-3 text-xs font-extrabold text-gray-900">محدوده قیمت</h3>
        <PriceSlider
          min={facets.minPrice}
          max={facets.maxPrice}
          valueMin={filters.minPrice}
          valueMax={filters.maxPrice}
          onCommit={(minPrice, maxPrice) =>
            onChange({
              ...filters,
              minPrice,
              maxPrice,
            })
          }
        />
      </div>

      {/* Stock status */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs font-extrabold text-gray-900">
          فقط کالاهای موجود
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={filters.inStockOnly === true}
          onClick={() =>
            onChange({ ...filters, inStockOnly: !filters.inStockOnly })
          }
          className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
            filters.inStockOnly ? "bg-red-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
              filters.inStockOnly ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
