"use client";

import Link from "next/link";
import {
  Dumbbell,
  Heart,
  Flame,
  Shirt,
  Award,
  PlaySquare,
  ChevronDown,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";
import type { NavCategory, Brand } from "@/lib/types";

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  dumbbell: <Dumbbell className="h-4 w-4" />,
  heart: <Heart className="h-4 w-4" />,
  flame: <Flame className="h-4 w-4" />,
  shirt: <Shirt className="h-4 w-4" />,
  award: <Award className="h-4 w-4" />,
  play: <PlaySquare className="h-4 w-4" />,
};

const PRODUCT_FA: Record<string, string> = {
  "Whey Protein": "پروتئین وی",
  "Whey Isolate": "وی ایزوله",
  "Whey Hydrolyzed": "وی هیدرولیز",
  Casein: "کازئین",
  "Beef Protein": "پروتئین گاوی",
  Amino: "آمینو",
  EAA: "ای‌ای‌ای",
  "Amino Whey": "آمینو وی",
  BCAA: "بی‌سی‌ای‌ای",
  HMB: "اچ‌ام‌بی",
  Pump: "پامپ",
  Arginine: "آرژینین",
  "Beta-Alanine": "بتا آلانین",
  Citrulline: "سیترولین",
  Glutamine: "گلوتامین",
  Gainers: "گینر",
  Carbohydrates: "کربوهیدرات",
  "Creatine Monohydrate": "کراتین مونوهیدرات",
  "Mixed Creatine": "کراتین ترکیبی",
  "Test Boosters": "افزایش‌دهنده تستوسترون",
  Tribulus: "تریبولوس",
  ZMA: "زد‌ام‌ای",
  Multivitamins: "مولتی‌ویتامین",
  Minerals: "مکمل مینرال",
  "B-Complex": "ویتامین ب کمپلکس",
  "Vitamin D3": "ویتامین دی۳",
  "Vitamin C": "ویتامین سی",
  Collagen: "کلاژن",
  Biotin: "بیوتین",
  Keratin: "کراتین مو",
  "Skin Hair Nails": "پوست، مو و ناخن",
  "Joint Support": "سلامت مفاصل",
  Glucosamine: "گلوکزامین",
  Chondroitin: "کندرویتین",
  MSM: "ام‌اس‌ام",
  "Collagen Type II": "کلاژن نوع ۲",
  "Omega-3": "امگا ۳",
  "Fish Oil": "روغن ماهی",
  "Krill Oil": "روغن کریل",
  CoQ10: "کوآنزیم کیو۱۰",
  "Immunity Support": "تقویت سیستم ایمنی",
  Zinc: "روی",
  Propolis: "بره‌موم",
  Elderberry: "شاه‌توت",
  Echinacea: "اکیناسه",
  "Fat Burners": "چربی‌سوز",
  Thermogenic: "ترموژنیک",
  CLA: "سی‌ال‌ای",
  "L-Carnitine": "ال‌کارنیتین",
  "Green Coffee": "قهوه سبز",
  Shakers: "شیکر",
  "Blender Bottle": "شیکر همزن‌دار",
  "Water Bottles": "قمقمه",
  "Gym Shoes": "کفش ورزشی",
  Activewear: "پوشاک ورزشی",
  "Training Gloves": "دستکش تمرین",
  "Lifting Belt": "کمربند وزنه‌برداری",
  "Lifting Straps": "بند مچ",
  "Wrist Wraps": "مچ‌بند",
  "Foam Rollers": "فوم‌رولر",
  "Jump Ropes": "طناب پرش",
  "Optimum Nutrition": "آپتیموم نوتریشن",
  MuscleTech: "ماسل‌تک",
  Evogen: "ایووجن",
  "Kevin Levrone": "کوین لورون",
  "Applied Nutrition": "اپلاید نوتریشن",
  USN: "یو‌اس‌ان",
  BSN: "بی‌اس‌ان",
  Dymatize: "دایماتایز",
  Nutrex: "نوترکس",
  Grenade: "گرناد",
};

const HOT_ITEMS = new Set([
  "Whey Protein",
  "Creatine Monohydrate",
  "Multivitamins",
  "Fat Burners",
  "Collagen",
  "BCAA",
  "ZMA",
  "Omega-3",
  "Glutamine",
]);

interface MegaMenuProps {
  categories: NavCategory[];
  brands: Brand[];
}

export default function MegaMenu({ categories, brands }: MegaMenuProps) {
  return (
    <nav
      className="relative z-[99999] hidden overflow-visible lg:block"
      aria-label="دسته‌بندی محصولات"
    >
      <div className="flex items-center gap-1 overflow-visible">
        <Link
          href="/"
          className="relative shrink-0 border-b-2 border-transparent px-4 py-3 text-sm font-bold text-gray-800 transition-all duration-300 hover:border-red-600 hover:text-red-600"
        >
          خانه
        </Link>

        {categories.map((cat) => (
          <div key={cat.href} className="group py-2">
            <button
              type="button"
              className="relative flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-4 py-3 text-sm font-bold text-gray-800 transition-all duration-300 group-hover:border-red-600 group-hover:text-red-600"
            >
              {CATEGORY_ICONS[cat.icon ?? ""]}
              {cat.title}
              <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform duration-300 group-hover:rotate-180 group-hover:text-red-600" />
            </button>

            {/* Full-width dropdown panel, anchored to the relative nav */}
            <div className="pointer-events-none absolute top-full left-0 right-0 z-[99999] w-full opacity-0 invisible transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Hover bridge: keeps the menu open while moving the cursor */}
                <div className="pt-2" aria-hidden="true" />
                <div className="rounded-b-2xl border-b border-x border-gray-200 border-t-4 border-red-600 bg-white p-8 shadow-2xl">
                  <div className="grid grid-cols-4 gap-6 text-right" dir="rtl">
                    {/* Columns 1-3: sub-category links */}
                    <div className="col-span-3 grid grid-cols-3 gap-6">
                      {cat.children.length > 0
                        ? cat.children.map((child) => (
                            <div key={child.name}>
                              <Link
                                href={child.href}
                                className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 text-sm font-extrabold text-gray-900 transition-colors hover:text-red-600"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                                {child.name}
                              </Link>
                              {child.products.length > 0 ? (
                                <ul>
                                  {child.products.map((name) => (
                                    <li key={name}>
                                      <Link
                                        href={`/search?q=${encodeURIComponent(name)}`}
                                        className="block py-1.5 text-xs font-bold text-gray-900 transition-all hover:translate-x-[-4px] hover:text-red-600"
                                      >
                                        {PRODUCT_FA[name] ?? name}
                                        {HOT_ITEMS.has(name) && (
                                          <span className="mr-2 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                                            پرفروش
                                          </span>
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <Link
                                  href={child.href}
                                  className="block py-1.5 text-xs font-bold text-gray-900 transition-all hover:translate-x-[-4px] hover:text-red-600"
                                >
                                  مشاهده همه محصولات این دسته
                                </Link>
                              )}
                            </div>
                          ))
                        : categories.map((sub) => (
                            <div key={sub.href}>
                              <Link
                                href={sub.href}
                                className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 text-sm font-extrabold text-gray-900 transition-colors hover:text-red-600"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                                {sub.title}
                              </Link>
                              <Link
                                href={sub.href}
                                className="block py-1.5 text-xs font-bold text-gray-900 transition-all hover:translate-x-[-4px] hover:text-red-600"
                              >
                                مشاهده همه محصولات این دسته
                              </Link>
                            </div>
                          ))}
                    </div>

                    {/* Column 4: Top Brands */}
                    <div className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-5">
                      <p className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-2 text-sm font-extrabold text-red-600">
                        <BadgeCheck className="h-4 w-4" />
                        برندهای برتر
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {brands.map((brand) => (
                          <Link
                            key={brand.slug}
                            href={`/brands/${brand.slug}`}
                            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-extrabold text-gray-900 transition-all hover:-translate-y-0.5 hover:border-red-600/50 hover:shadow-sm"
                          >
                            <span
                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                              style={{ backgroundColor: brand.logoColor }}
                            >
                              {brand.name.charAt(0)}
                            </span>
                            <span className="truncate">{brand.name}</span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/brands"
                        className="mt-4 inline-flex items-center justify-center gap-1 rounded-lg bg-white px-4 py-2 text-xs font-bold text-red-600 shadow-sm transition-transform hover:scale-105"
                      >
                        مشاهده همه برندها
                        <ArrowLeft className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Link
          href="/blog"
          className="relative shrink-0 border-b-2 border-transparent px-4 py-3 text-sm font-bold text-gray-800 transition-all duration-300 hover:border-red-600 hover:text-red-600"
        >
          مجله ورزشی
        </Link>
      </div>
    </nav>
  );
}
