import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { mapToProduct, getProducts } from "@/lib/data/db";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

const CATEGORY_TITLES: Record<string, string> = {
  whey: "پروتئین وی",
  beef: "پروتئین بیف",
  isolate: "پروتئین ایزوله",
  hydrolyzed: "پروتئین هیدرولیز",
  casein: "پروتئین کازئین",
  "protein-fat-burner": "پروتئین چربی‌سوز",
  amino: "آمینو",
  eaa: "آمینو EAA",
  "amino-whey": "آمینو وی",
  "amino-beef": "آمینو بیف",
  hmb: "H.M.B",
  pump: "پمپ",
  arginine: "آرژنین",
  "beta-alanine": "بتاآلانین",
  citrulline: "سیترولین",
  glutamine: "گلوتامین",
  bcaa: "BCAA",
  "post-workout": "پس از تمرین",
  gainer: "گینر",
  carbs: "کربوهیدرات",
  creatine: "کراتین مونوهیدرات",
  "creatine-blend": "کراتین ترکیبی",
  "test-booster": "تست بوستر",
  tribulus: "تریبولوس",
  zma: "ZMA",
  "sports-supplements": "مکمل‌های ورزشی",
  "general-health": "مکمل‌های عمومی",
  "weight-loss": "کاهش وزن",
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const title = CATEGORY_TITLES[slug] ?? slug;
  return {
    title,
    description: `خرید انواع ${title} با ضمانت اصالت و قیمت لحظه‌ای.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  let products: Product[] = [];
  try {
    const dbProducts = await prisma.product.findMany({
      where: { categorySlug: slug },
      orderBy: { createdAt: "desc" },
    });
    products = dbProducts.map(mapToProduct);
  } catch (error) {
    console.error("[category] prisma fetch failed, using fallback:", error);
  }

  if (products.length === 0) {
    try {
      products = await getProducts({ categorySlug: slug });
    } catch {
      products = [];
    }
  }

  const title = CATEGORY_TITLES[slug] ?? slug;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <nav
          className="mb-4 flex items-center gap-2 text-sm text-gray-500"
          aria-label="مسیر دسته‌بندی"
        >
          <Link href="/" className="transition-colors hover:text-red-600">
            خانه
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-gray-900">{title}</span>
        </nav>

        <h1 className="mb-6 text-2xl font-black text-gray-900">
          دسته‌بندی: {title}
        </h1>

        {products.length === 0 ? (
          <div className="flex min-h-[45vh] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl font-black text-gray-300">
              ؟
            </div>
            <p className="text-xl font-extrabold text-gray-900">
              محصولی یافت نشد
            </p>
            <p className="text-sm text-gray-500">
              در حال حاضر محصولی در این دسته‌بندی وجود ندارد؛ لطفاً به‌زودی
              دوباره سر بزنید.
            </p>
            <Link
              href="/products"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
            >
              مشاهده همه محصولات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
