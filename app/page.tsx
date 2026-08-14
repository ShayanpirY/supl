import Link from "next/link";
import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProductSlider from "@/components/home/ProductSlider";
import PromoBanners from "@/components/home/PromoBanners";
import TopBrands from "@/components/home/TopBrands";
import FlashSale from "@/components/home/FlashSale";
import {
  CategoryGridSkeleton,
  FlashSaleSkeleton,
  ProductSectionSkeleton,
  TopBrandsSkeleton,
} from "@/components/home/skeletons";
import { getProducts } from "@/lib/data/db";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

function SectionHeader({
  title,
  seeAllHref,
}: {
  title: string;
  seeAllHref?: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="section-title mb-0">{title}</h2>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="text-sm font-bold text-red-600 transition-colors hover:text-red-700 hover:underline"
        >
          مشاهده همه ←
        </Link>
      )}
    </div>
  );
}

function ProductSection({
  title,
  seeAllHref,
  products,
}: {
  title: string;
  seeAllHref?: string;
  products: Product[];
}) {
  return (
    <section className="bg-white py-10">
      <SectionHeader title={title} seeAllHref={seeAllHref} />
      <ProductSlider products={products} />
    </section>
  );
}

async function BestsellersSection() {
  const bestSellers = await getProducts({ sort: "bestSelling" });
  return (
    <ProductSection
      title="پرفروش‌ترین مکمل‌ها"
      seeAllHref="/products?sort=bestSelling"
      products={bestSellers.slice(0, 10)}
    />
  );
}

async function NewArrivalsSection() {
  const newest = await getProducts({ sort: "newest" });
  const newArrivals = [
    ...newest.filter((product) => product.isNew),
    ...newest.filter((product) => !product.isNew),
  ].slice(0, 10);
  return (
    <ProductSection
      title="جدیدترین محصولات"
      seeAllHref="/products?sort=newest"
      products={newArrivals}
    />
  );
}

export default async function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <HeroBanner />

      <Suspense fallback={<FlashSaleSkeleton />}>
        <FlashSale />
      </Suspense>

      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategoryGrid />
      </Suspense>

      <Suspense fallback={<ProductSectionSkeleton />}>
        <BestsellersSection />
      </Suspense>

      <PromoBanners />

      <Suspense fallback={<ProductSectionSkeleton />}>
        <NewArrivalsSection />
      </Suspense>

      <Suspense fallback={<TopBrandsSkeleton />}>
        <TopBrands />
      </Suspense>

      <WhyChooseUs />
    </div>
  );
}
