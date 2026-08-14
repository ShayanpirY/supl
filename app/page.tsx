import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import BrandCarousel from "@/components/home/BrandCarousel";
import ProductGrid from "@/components/home/ProductGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { getFeaturedProducts, getBestSellers, getNewArrivals } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <HeroBanner />
      <CategoryGrid />
      <BrandCarousel />
      <ProductGrid
        title="محصولات پرفروش"
        products={bestSellers.length > 0 ? bestSellers : featured}
        seeAllHref="/category/sports-supplements"
      />
      <ProductGrid title="پیشنهاد ویژه" products={featured} />
      {newArrivals.length > 0 && (
        <ProductGrid
          title="جدیدترین محصولات"
          products={newArrivals}
          seeAllHref="/category/weight-loss"
        />
      )}
      <WhyChooseUs />
    </div>
  );
}
