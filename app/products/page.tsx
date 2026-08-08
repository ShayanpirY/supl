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

  return <ProductsView products={products} facets={facets} initialFilters={filters} />;
}
