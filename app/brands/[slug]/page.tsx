import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrands, getProducts } from "@/lib/data/db";
import ProductCard from "@/components/ProductCard";

interface BrandPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BrandPageProps) {
  const brands = await getBrands();
  const brand = brands.find((b) => b.slug === params.slug);
  if (!brand) return { title: "برند یافت نشد | مکمل" };

  return {
    title: `${brand.name} | مکمل`,
    description: brand.tagline || `محصولات برند ${brand.name}`,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const brands = await getBrands();
  const brand = brands.find((b) => b.slug === params.slug);

  if (!brand) notFound();

  // محصولات این برند
  const products = await getProducts({ brands: [brand.slug] });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-red-600">
            خانه
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/brands" className="transition-colors hover:text-red-600">
            برندها
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-gray-900">{brand.name}</span>
        </nav>

        {/* هدر برند */}
        <div className="mb-10 flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:flex-row sm:text-right">
          <span
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-3xl font-black text-white shadow-md"
            style={{ backgroundColor: brand.logoColor || "#dc2626" }}
          >
            {brand.name.charAt(0)}
          </span>
          <div>
            <h1 className="text-3xl font-black text-gray-900">{brand.name}</h1>
            {brand.tagline && (
              <p className="mt-1 text-gray-500">{brand.tagline}</p>
            )}
            <p className="mt-2 text-sm text-gray-400">
              {products.length} محصول موجود
            </p>
          </div>
        </div>

        {/* محصولات */}
        {products.length === 0 ? (
          <div className="flex min-h-[30vh] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-lg font-extrabold text-gray-900">
              محصولی از این برند یافت نشد
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
            >
              مشاهده همه محصولات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}