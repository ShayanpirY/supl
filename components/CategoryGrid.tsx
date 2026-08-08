import Link from "next/link";
import Image from "next/image";
import { GlassWater } from "lucide-react";
import { getGridCategories } from "@/lib/data/db";

export default async function CategoryGrid() {
  const categories = await getGridCategories();

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative flex min-h-[200px] flex-col items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 pt-6 shadow-sm transition-all duration-300 ease-in-out hover:border-red-600/60 hover:shadow-lg"
            >
              <span className="absolute right-0 left-0 top-0 h-1 rounded-t-2xl bg-red-600 transition-all duration-300 group-hover:h-1.5" />

              <div className="flex w-full flex-1 items-center justify-center py-2">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={180}
                    height={180}
                    className="mx-auto h-32 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-32 w-full items-center justify-center">
                    <GlassWater className="h-16 w-16 text-red-600 transition-transform duration-300 group-hover:scale-105" />
                  </div>
                )}
              </div>

              <span className="text-center text-base font-extrabold text-gray-900 transition-colors group-hover:text-red-600">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
