"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NAV_CATEGORIES } from "@/lib/data/categories";
import { useState } from "react";

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 group">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-xl font-black text-white">
        م
      </div>
      <div className="leading-snug">
        <span className="block text-xl font-black tracking-tight text-gray-800">
          مکمل
        </span>
        <span className="block text-[10px] font-bold text-gray-500">
          فروشگاه مکمل‌های ورزشی
        </span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());
  const setCartOpen = useCartStore((s) => s.setOpen);
  const { setAuthModalOpen, setSearchOpen, mobileMenuOpen, setMobileMenuOpen } =
    useUIStore();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main header row */}
        <div className="flex h-16 items-center justify-between gap-4">
          <button
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-red-600 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="منوی موبایل"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Logo />

          {/* Search bar */}
          <div className="hidden flex-1 md:flex lg:max-w-xl">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="جستجو در بیش از ۲۰۰۰ محصول..."
                className="w-full rounded-lg border border-gray-300 bg-gray-100 pr-10 text-sm text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Auth */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAuthModalOpen(true)}
              className="hidden items-center gap-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 sm:flex font-bold"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">ورود / ثبت‌نام</span>
            </Button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-bold text-gray-800 transition-all duration-300 hover:border-red-600 hover:text-red-600"
              aria-label="سبد خرید"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">سبد خرید</span>
              {totalItems > 0 && (
                <span className="absolute -left-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-black text-white ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu line */}
        <nav
          className="hidden lg:flex items-center gap-1 overflow-x-auto"
          aria-label="دسته‌بندی محصولات"
        >
          <Link
            href="/"
            className="shrink-0 px-4 py-3 text-sm font-bold text-gray-800 transition-all duration-300 hover:text-red-600 relative border-b-2 border-transparent hover:border-red-600"
          >
            خانه
          </Link>

          {NAV_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.href}
              className="relative"
              onMouseEnter={() => setActiveCategory(idx)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button
                className={`shrink-0 flex items-center gap-1.5 px-4 py-3 text-sm font-bold transition-all duration-300 relative border-b-2 ${
                  activeCategory === idx
                    ? "text-red-600 border-red-600"
                    : "text-gray-800 border-transparent hover:text-red-600 hover:border-red-600"
                }`}
              >
                {cat.title}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeCategory === idx ? "rotate-180 text-red-600" : ""}`} />
              </button>

              {/* Dropdown panel */}
              {activeCategory === idx && (
                <div className="absolute top-full right-0 left-0 z-[100] w-full rounded-b-2xl border border-t-2 border-red-600 bg-white text-gray-800 shadow-2xl p-8 animate-fade-in">
                  <div className="mx-auto max-w-7xl flex">
                    <div className="grid flex-1 grid-cols-2 gap-8">
                      {cat.children.map((child) => (
                        <div key={child.name}>
                          <Link
                            href={child.href}
                            className="mb-3 block text-sm font-extrabold text-red-600 border-b border-gray-100 pb-2 hover:underline"
                          >
                            {child.name}
                          </Link>
                          <ul className="space-y-2">
                            {child.products.map((name) => (
                              <li key={name}>
                                <Link
                                  href={`/search?q=${encodeURIComponent(name)}`}
                                  className="flex items-center gap-2 text-sm text-gray-600 transition-all duration-300 hover:text-red-600 hover:translate-x-[-4px]"
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
                    <div className="hidden w-64 shrink-0 flex-col justify-between bg-red-600 p-6 text-white md:flex rounded-xl">
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
                        className="mt-4 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs font-bold text-red-600 transition-transform hover:scale-105"
                      >
                        مشاهده همه
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <Link
            href="/blog"
            className="shrink-0 px-4 py-3 text-sm font-bold text-gray-800 transition-all duration-300 hover:text-red-600 relative border-b-2 border-transparent hover:border-red-600"
          >
            مجله ورزشی
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6 lg:px-8">
            <div className="relative mb-3">
              <Input
                type="search"
                placeholder="جستجو در محصولات..."
                className="w-full rounded-lg border border-gray-300 bg-gray-100 pr-10 text-sm text-gray-900 placeholder:text-gray-500"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/category/sports-supplements"
                className="rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-bold text-white"
              >
                مکمل‌های ورزشی
              </Link>
              <Link
                href="/category/general-health"
                className="rounded-lg bg-gray-100 px-4 py-3 text-center text-sm font-bold text-gray-800"
              >
                مکمل‌های عمومی
              </Link>
              <Link
                href="/category/weight-loss"
                className="rounded-lg bg-gray-100 px-4 py-3 text-center text-sm font-bold text-gray-800"
              >
                کاهش وزن
              </Link>
              <Link
                href="/brands"
                className="rounded-lg bg-gray-100 px-4 py-3 text-center text-sm font-bold text-gray-800"
              >
                برندها
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
