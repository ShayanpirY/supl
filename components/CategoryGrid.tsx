import Link from "next/link";
import {
  Dumbbell,
  Zap,
  TrendingUp,
  Dna,
  Flame,
  GlassWater,
  Package,
  type LucideIcon,
} from "lucide-react";
import { getGridCategories } from "@/lib/data/db";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  whey: Dumbbell,
  creatine: Zap,
  gainers: TrendingUp,
  amino: Dna,
  "fat-burners": Flame,
  shakers: GlassWater,
};

function getCategoryIcon(href: string): LucideIcon {
  const slug = href.replace(/^\/category\//, "").split("/")[0];
  return CATEGORY_ICONS[slug] ?? Package;
}

export default async function CategoryGrid() {
  const categories = await getGridCategories();

  return (
    <section className="w-full bg-white py-12">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.href);
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative flex min-h-[200px] flex-col items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 pt-6 shadow-sm transition-all duration-300 ease-in-out hover:border-red-600/60 hover:shadow-lg"
            >
              <span className="absolute right-0 left-0 top-0 h-1 rounded-t-2xl bg-red-600 transition-all duration-300 group-hover:h-1.5" />

              <div className="flex w-full flex-1 items-center justify-center py-2">
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
                  <Icon className="h-10 w-10" strokeWidth={1.75} />
                </span>
              </div>

              <span className="text-center text-base font-extrabold text-gray-900 transition-colors group-hover:text-red-600">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
