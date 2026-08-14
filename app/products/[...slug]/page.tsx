import { notFound } from "next/navigation";
import ProductsView from "@/components/products/ProductsView";
import { getProducts, getProductFacets, resolveProductRouteSegments } from "@/lib/data/db";

export const dynamic = "force-dynamic";

export default async function ProductsSlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const filters = resolveProductRouteSegments(params.slug);
  if (!filters) notFound();

  const [products, facets] = await Promise.all([
    getProducts(filters),
    getProductFacets(),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ProductsView
        products={products}
        facets={facets}
        initialFilters={filters}
      />
    </div>
  );
}
