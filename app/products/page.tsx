import ProductsView from "@/components/products/ProductsView";
import { getProducts, getProductFacets } from "@/lib/data/db";
import { parseProductFilters } from "@/lib/product-filters";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters = parseProductFilters(searchParams);
  const [products, facets] = await Promise.all([
    getProducts(filters),
    getProductFacets(),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ProductsView products={products} facets={facets} initialFilters={filters} />
    </div>
  );
}
