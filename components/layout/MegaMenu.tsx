"use client";

import { useState } from "react";
import Link from "next/link";
import { Dumbbell, ChevronDown, BadgeCheck, ArrowLeft } from "lucide-react";
import type { NavCategory, Brand } from "@/lib/types";

const MEGA_MENU_DATA = [
  {
    title: "افزایش حجم و عضله",
    items: [
      "پروتئین (وی)",
      "پروتئین بیف",
      "پروتئین ایزوله",
      "پروتئین هیدرولیز",
      "پروتئین کازئین",
      "پروتئین چربی‌سوز",
    ],
  },
  {
    title: "آمینو اسید",
    items: ["آمینو", "آمینو EAA", "آمینو وی", "آمینو بیف", "H.M.B"],
  },
  {
    title: "پیش از تمرین",
    items: ["پمپ", "آرژنین", "بتاآلانین", "سیترولین"],
  },
  {
    title: "ریکاوری",
    items: ["گلوتامین", "Bcaa", "پس از تمرین"],
  },
  {
    title: "افزایش وزن و حجم",
    items: ["گینر", "کربوهیدرات"],
  },
  {
    title: "کراتین و پارهورمون",
    items: [
      "کراتین مونوهیدرات",
      "کراتین ترکیبی",
      "تست بوستر",
      "تریبولوس",
      "ZMA",
    ],
  },
];

const ITEM_SLUGS: Record<string, string> = {
  "پروتئین (وی)": "whey",
  "پروتئین وی": "whey",
  "پروتئین بیف": "beef",
  "پروتئین ایزوله": "isolate",
  "پروتئین هیدرولیز": "hydrolyzed",
  "پروتئین کازئین": "casein",
  "پروتئین چربی‌سوز": "protein-fat-burner",
  "آمینو": "amino",
  "آمینو EAA": "eaa",
  "آمینو وی": "amino-whey",
  "آمینو بیف": "amino-beef",
  "H.M.B": "hmb",
  "پمپ": "pump",
  "آرژنین": "arginine",
  "بتاآلانین": "beta-alanine",
  "سیترولین": "citrulline",
  "گلوتامین": "glutamine",
  "Bcaa": "bcaa",
  "BCAA": "bcaa",
  "پس از تمرین": "post-workout",
  "گینر": "gainer",
  "کربوهیدرات": "carbs",
  "کراتین مونوهیدرات": "creatine",
  "کراتین ترکیبی": "creatine-blend",
  "تست بوستر": "test-booster",
  "تریبولوس": "tribulus",
  "ZMA": "zma",
};

const toCategorySlug = (item: string): string =>
  ITEM_SLUGS[item] ??
  item
    .replace(/\(|\)/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "");

const NAV_LINK_CLASSES =
  "flex items-center gap-1 cursor-pointer rounded-t-lg px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700";

const COLUMN_HEADER_CLASSES =
  "mb-3 block border-b border-gray-100 pb-1 text-sm font-extrabold text-gray-900";

const SUB_LINK_CLASSES =
  "block py-1 text-xs font-medium text-gray-600 transition-colors hover:text-red-600";

const SUPPLEMENTS_HREF = "/category/sports-supplements";

const isSupplementsCategory = (cat: NavCategory) =>
  cat.title === "مکمل‌های ورزشی" ||
  cat.href === SUPPLEMENTS_HREF ||
  cat.href.startsWith(`${SUPPLEMENTS_HREF}/`);

const isDedicatedLink = (cat: NavCategory) =>
  cat.href === "/brands" || cat.href === "/blog" || cat.href.startsWith("/blog/");

interface MegaMenuProps {
  categories: NavCategory[];
  brands: Brand[];
}

export default function MegaMenu({ categories, brands }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const open = activeMenu === "supplements";

  const otherCategories = categories.filter(
    (cat) => !isSupplementsCategory(cat) && !isDedicatedLink(cat),
  );

  return (
    <nav
      className="relative z-[99999] hidden overflow-visible bg-red-600 lg:block"
      aria-label="دسته‌بندی محصولات"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-visible px-4 sm:px-6 lg:px-8">
        <Link href="/" className={NAV_LINK_CLASSES}>
          خانه
        </Link>

        {/* مکمل‌های ورزشی — the ONLY trigger for the 6-column mega panel */}
        <div
          onMouseEnter={() => setActiveMenu("supplements")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button
            type="button"
            className={NAV_LINK_CLASSES}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <Dumbbell className="h-4 w-4" />
            مکمل‌های ورزشی
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div
              className="pointer-events-auto absolute left-0 right-0 top-full z-[99999] w-full"
              onMouseEnter={() => setActiveMenu("supplements")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {/* Hover bridge: keeps the menu open while moving the cursor */}
              <div className="pt-2" aria-hidden="true" />

              <div
                className="mx-auto grid w-full max-w-7xl grid-cols-6 gap-6 rounded-b-2xl border-t-4 border-red-600 bg-white p-6 text-right shadow-2xl"
                dir="rtl"
              >
                {MEGA_MENU_DATA.map((col) => (
                  <div key={col.title}>
                    <h4 className={COLUMN_HEADER_CLASSES}>{col.title}</h4>
                    <ul>
                      {col.items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/category/${toCategorySlug(item)}`}
                            className={SUB_LINK_CLASSES}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Top brands strip */}
                <div className="col-span-6 mt-4 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
                  <p className="flex shrink-0 items-center gap-1.5 text-sm font-extrabold text-red-600">
                    <BadgeCheck className="h-4 w-4" />
                    برندهای برتر
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {brands.map((brand) => (
                      <Link
                        key={brand.slug}
                        href={`/brands/${brand.slug}`}
                        className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-extrabold text-gray-900 transition-all hover:-translate-y-0.5 hover:border-red-600/50 hover:shadow-sm"
                      >
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                          style={{ backgroundColor: brand.logoColor }}
                        >
                          {brand.name.charAt(0)}
                        </span>
                        {brand.name}
                      </Link>
                    ))}
                    <Link
                      href="/brands"
                      className="flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-extrabold text-white transition-colors hover:bg-red-700"
                    >
                      همه برندها
                      <ArrowLeft className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Other nav items — plain links, never the mega panel */}
        {otherCategories.map((cat) => (
          <Link key={cat.href} href={cat.href} className={NAV_LINK_CLASSES}>
            {cat.title}
          </Link>
        ))}

        {/* Brands dropdown */}
        <div className="relative group">
          <Link href="/brands" className={NAV_LINK_CLASSES}>
            برندها
            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300" />
          </Link>
          <div className="invisible absolute right-0 top-full z-[99999] w-56 rounded-b-lg bg-white shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
            <div className="border-t-4 border-red-600 py-2 text-right">
              <Link
                href="/category?brand=evogen"
                className="block px-4 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
              >
                Evogen
              </Link>
              <Link
                href="/category?brand=optimum-nutrition"
                className="block px-4 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
              >
                Optimum Nutrition
              </Link>
              <Link
                href="/category?brand=muscletech"
                className="block px-4 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
              >
                MuscleTech
              </Link>
              <Link
                href="/category?brand=kevin-levrone"
                className="block px-4 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
              >
                Kevin Levrone
              </Link>
              <Link
                href="/category?brand=applied-nutrition"
                className="block px-4 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
              >
                Applied Nutrition
              </Link>
              <Link
                href="/category?brand=bpi-sports"
                className="block px-4 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
              >
                BPI Sports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
