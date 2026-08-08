"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Heart,
  Flame,
  Shirt,
  Award,
  PlaySquare,
} from "lucide-react";
import { NAV_CATEGORIES } from "@/lib/data/categories";

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  dumbbell: <Dumbbell className="h-4 w-4" />,
  heart: <Heart className="h-4 w-4" />,
  flame: <Flame className="h-4 w-4" />,
  shirt: <Shirt className="h-4 w-4" />,
  award: <Award className="h-4 w-4" />,
  play: <PlaySquare className="h-4 w-4" />,
};

export default function MegaMenu() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <nav
      className="relative hidden lg:block"
      onMouseLeave={() => setActive(null)}
      aria-label="دسته‌بندی محصولات"
    >
      <ul className="flex items-stretch">
        {NAV_CATEGORIES.map((cat, idx) => (
          <li
            key={cat.href}
            className="relative"
            onMouseEnter={() => setActive(idx)}
          >
            <Link
              href={cat.href}
              className="flex items-center gap-2 px-4 py-4 text-sm font-bold text-brand-dark transition-colors hover:bg-surface-subtle hover:text-brand-red"
            >
              {CATEGORY_ICONS[cat.icon ?? ""]}
              {cat.title}
              <svg
                className={`h-3 w-3 text-gray-400 transition-transform ${
                  active === idx ? "rotate-180 text-brand-red" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* Dropdown panel */}
            {active === idx && (
              <div className="absolute right-0 top-full z-40 w-full min-w-[720px] rounded-b-2xl border border-t-0 border-gray-100 bg-white shadow-2xl shadow-black/10">
                <div className="flex">
                  {/* Column links */}
                  <div className="grid flex-1 grid-cols-2 gap-6 p-6">
                    {cat.children.map((child) => (
                      <div key={child.name}>
                        <Link
                          href={child.href}
                          className="mb-2 block text-sm font-extrabold text-brand-red hover:underline"
                        >
                          {child.name}
                        </Link>
                        <ul className="space-y-1.5">
                          {child.products.map((name) => (
                            <li key={name}>
                              <Link
                                href={`/search?q=${encodeURIComponent(name)}`}
                                className="block text-sm text-gray-600 transition-colors hover:text-brand-red"
                              >
                                {name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Promo banner inside dropdown */}
                  <div className="hidden w-56 shrink-0 flex-col justify-between bg-brand-red p-5 text-white md:flex">
                    <div>
                      <p className="text-lg font-extrabold leading-snug">
                        {cat.titleEn}
                      </p>
                      <p className="mt-2 text-xs opacity-90">
                        واردات مستقیم از دبی با ضمانت اصالت کالا
                      </p>
                    </div>
                    <Link
                      href={cat.href}
                      className="mt-4 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs font-bold text-brand-red transition-transform hover:scale-105"
                    >
                      مشاهده همه
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
