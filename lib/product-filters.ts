export type ProductSort =
  | "newest"
  | "cheapest"
  | "mostExpensive"
  | "bestSelling";

export interface ProductFilters {
  brands?: string[];
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: ProductSort;
}

export type SearchParamsLike = Record<string, string | string[] | undefined>;

const SORTS: ProductSort[] = [
  "newest",
  "cheapest",
  "mostExpensive",
  "bestSelling",
];

export function parseProductFilters(
  searchParams: SearchParamsLike,
): ProductFilters {
  const toArray = (value: string | string[] | undefined): string[] =>
    typeof value === "string" ? [value] : Array.isArray(value) ? value : [];

  const sortParam =
    typeof searchParams.sort === "string" ? searchParams.sort : "newest";
  const sort: ProductSort = SORTS.includes(sortParam as ProductSort)
    ? (sortParam as ProductSort)
    : "newest";

  const minPrice =
    typeof searchParams.minPrice === "string" && searchParams.minPrice !== ""
      ? Number(searchParams.minPrice)
      : undefined;
  const maxPrice =
    typeof searchParams.maxPrice === "string" && searchParams.maxPrice !== ""
      ? Number(searchParams.maxPrice)
      : undefined;

  const categorySlug =
    typeof searchParams.category === "string" && searchParams.category !== ""
      ? searchParams.category
      : undefined;

  const inStockOnly =
    searchParams.inStock === "1" || searchParams.inStock === "true";

  return {
    brands: toArray(searchParams.brand),
    categorySlug,
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    inStockOnly,
    sort,
  };
}

export function buildProductsUrl(filters: ProductFilters): string {
  const params = new URLSearchParams();

  if (filters.brands?.length) {
    for (const brand of filters.brands) params.append("brand", brand);
  }
  if (filters.categorySlug) params.set("category", filters.categorySlug);
  if (filters.minPrice != null) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice != null) params.set("maxPrice", String(filters.maxPrice));
  if (filters.inStockOnly) params.set("inStock", "1");
  if (filters.sort && filters.sort !== "newest") params.set("sort", filters.sort);

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}
