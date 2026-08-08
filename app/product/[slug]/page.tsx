"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  PackageCheck,
  ChevronLeft,
} from "lucide-react";
import { getProductBySlug } from "@/lib/data/products";
import ProductGallery from "@/components/product/ProductGallery";
import VariantSelector from "@/components/product/VariantSelector";
import PriceCalculator from "@/components/product/PriceCalculator";
import ProductAccordions from "@/components/product/ProductAccordions";
import { useCartStore } from "@/store/cart-store";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.defaultVariantId,
  );

  const variant = product.variants.find((v) => v.id === selectedVariantId)!;
  const inStock = variant?.inStock ?? false;

  const handleAddToCart = () => {
    addItem(product, selectedVariantId);
    setCartOpen(true);
  };

  return (
    <div className="container-x py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs font-bold text-gray-400">
        <Link href="/" className="hover:text-brand-red">
          خانه
        </Link>
        <ChevronLeft className="h-3 w-3" />
        <Link href={`/category/${product.categorySlug}`} className="hover:text-brand-red">
          {product.category}
        </Link>
        <ChevronLeft className="h-3 w-3" />
        <Link href={`/category/${product.categorySlug}/${product.subcategory}`} className="hover:text-brand-red">
          {product.subcategory}
        </Link>
        <ChevronLeft className="h-3 w-3" />
        <span className="text-brand-dark">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery product={product} />

        <div>
          <p className="text-sm font-bold text-gray-400">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-black leading-9 text-brand-dark sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <b className="text-brand-dark">{product.rating}</b>
            </span>
            <span className="text-gray-400">({product.reviewCount} نظر)</span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1 font-bold text-green-600">
              <PackageCheck className="h-4 w-4" />
              {inStock ? "موجود در انبار دبی" : "ناموجود"}
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            {product.summary}
          </p>

          <div className="mt-6 space-y-6">
            <VariantSelector
              product={product}
              selectedVariantId={selectedVariantId}
              onSelect={setSelectedVariantId}
            />

            <PriceCalculator
              product={product}
              selectedVariantId={selectedVariantId}
            />

            {/* CTA row */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="btn-primary flex-1 py-4 text-base"
              >
                <ShoppingCart className="h-5 w-5" />
                افزودن به سبد خرید
              </button>
              <Link
                href={`/checkout?product=${product.slug}`}
                className="btn-outline flex-1 py-4 text-center text-base"
              >
                خرید فوری
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-100 bg-surface-subtle p-4">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Truck className="h-6 w-6 text-brand-red" />
                <span className="text-[11px] font-bold text-gray-600">
                  ارسال ۲ تا ۴ روز کاری
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <ShieldCheck className="h-6 w-6 text-brand-red" />
                <span className="text-[11px] font-bold text-gray-600">
                  ضمانت اصالت کالا
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <PackageCheck className="h-6 w-6 text-brand-red" />
                <span className="text-[11px] font-bold text-gray-600">
                  بسته‌بندی امن و مهر و موم‌شده
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full description */}
      <section className="mt-10 rounded-2xl border border-gray-100 bg-surface-subtle p-6">
        <h2 className="mb-3 font-extrabold text-brand-dark">توضیحات محصول</h2>
        <p className="text-sm leading-8 text-gray-600">{product.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-red/20 bg-brand-red/5 px-3 py-1 text-[11px] font-bold text-brand-red"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      <ProductAccordions product={product} />
    </div>
  );
}
