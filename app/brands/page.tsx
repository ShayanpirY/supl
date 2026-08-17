import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBrands } from "@/lib/data/db";

export const metadata = {
  title: "برندها | مکمل",
  description:
    "تمام برندهای معتبر مکمل‌های ورزشی که مستقیماً از دبی وارد می‌کنیم",
};

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-red-600">
            خانه
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-gray-900">برندها</span>
        </nav>

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-gray-900 md:text-4xl">
            برندهای معتبر
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            ما فقط با برندهای اورجینال و معتبر جهانی همکاری می‌کنیم. تمام محصولات
            با ضمانت اصالت و واردات مستقیم از دبی عرضه می‌شوند.
          </p>
        </div>

        {brands.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-xl font-extrabold text-gray-900">
              برندی یافت نشد
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-600/40 hover:shadow-md"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-black text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: brand.logoColor || "#dc2626" }}
                >
                  {brand.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-red-600">
                    {brand.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] font-bold text-gray-500">
                    {brand.tagline}
                  </span>
                </span>
                <ArrowLeft className="mr-auto h-4 w-4 shrink-0 text-gray-300 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-red-600" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}