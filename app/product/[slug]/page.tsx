import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Home } from "lucide-react";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/data/db";
import ProductInteractiveUI from "@/components/product/ProductInteractiveUI";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "محصول یافت نشد | مکمل" };

  return {
    title: `${product.name} | مکمل`,
    description: product.summary || product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="container-x py-8">
      {/* Breadcrumb */}
      <nav
        className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-bold text-gray-400"
        aria-label="مسیر راهنما"
      >
        <Link
          href="/"
          className="flex items-center gap-1 transition-colors hover:text-red-600"
        >
          <Home className="h-3.5 w-3.5" />
          خانه
        </Link>
        <ChevronLeft className="h-3 w-3 text-gray-300" />
        <Link
          href={`/category/${product.categorySlug}`}
          className="transition-colors hover:text-red-600"
        >
          {product.category}
        </Link>
        <ChevronLeft className="h-3 w-3 text-gray-300" />
        <Link
          href={`/category/${product.categorySlug}/${product.subcategory}`}
          className="transition-colors hover:text-red-600"
        >
          {product.subcategory}
        </Link>
        <ChevronLeft className="h-3 w-3 text-gray-300" />
        <span className="text-gray-700">{product.name}</span>
      </nav>

      {/* Main grid: images (right in RTL) + info (left) + tabs */}
      <ProductInteractiveUI product={product} />
    </div>
  );
}
