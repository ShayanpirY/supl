import Link from "next/link";
import { BRANDS } from "@/lib/data/categories";

export default function BrandCarousel() {
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section className="border-y border-white/10 bg-[#0f0f0f] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-5 text-center text-sm font-extrabold text-zinc-400">
          برندهای معتبر جهانی که مستقیماً از دبی وارد می‌کنیم
        </p>
        <div className="relative overflow-hidden">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-l from-transparent to-[#0f0f0f]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-r from-transparent to-[#0f0f0f]" />

          <div className="flex w-max animate-marquee items-center gap-4">
            {doubled.map((brand, i) => (
              <Link
                key={`${brand.slug}-${i}`}
                href={`/brands/${brand.slug}`}
                className="flex h-20 w-40 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e50914]/50"
              >
                <span
                  className="text-base font-black tracking-tight text-zinc-300"
                >
                  {brand.name}
                </span>
                <span className="text-[10px] font-bold text-zinc-500">
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
