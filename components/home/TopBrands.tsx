import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBrands } from "@/lib/data/db";

export default async function TopBrands() {
  const brands = await getBrands();
  if (brands.length === 0) return null;

  return (
    <section className="bg-white py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="section-title mb-0">برندهای برتر</h2>
        <Link
          href="/brands"
          className="text-sm font-bold text-red-600 transition-colors hover:text-red-700 hover:underline"
        >
          مشاهده همه ←
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-600/40 hover:shadow-md"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-black text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: brand.logoColor }}
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
    </section>
  );
}
