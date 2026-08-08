import Link from "next/link";
import { getBrands } from "@/lib/data/db";

export default async function BrandCarousel() {
  const brands = await getBrands();
  const doubled = [...brands, ...brands];

  return (
    <section className="border-y border-gray-200 bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-5 text-center text-sm font-extrabold text-gray-600">
          برندهای معتبر جهانی که مستقیماً از دبی وارد می‌کنیم
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-l from-transparent to-gray-50" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-r from-transparent to-gray-50" />

          <div className="flex w-max animate-marquee items-center gap-4">
            {doubled.map((brand, i) => (
              <Link
                key={`${brand.slug}-${i}`}
                href={`/brands/${brand.slug}`}
                className="flex h-16 w-44 shrink-0 flex-col items-center justify-center gap-1 rounded-full border border-gray-200 bg-white px-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-600/50 hover:shadow-md"
              >
                <span
                  className="text-base font-black tracking-tight text-gray-800"
                >
                  {brand.name}
                </span>
                <span className="text-[10px] font-bold text-gray-500">
                  {brand.tagline}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
