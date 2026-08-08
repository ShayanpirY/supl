import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({
  products,
  title,
  seeAllHref,
}: {
  products: Product[];
  title: string;
  seeAllHref?: string;
}) {
  return (
    <section className="bg-white py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="section-title mb-0">{title}</h2>
        {seeAllHref && (
          <a
            href={seeAllHref}
            className="text-sm font-bold text-red-600 hover:underline"
          >
            مشاهده همه ←
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
