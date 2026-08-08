"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Flame } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NAV_CATEGORIES } from "@/lib/data/categories";
import { useState } from "react";

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 group">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#e50914] text-xl font-black text-white shadow-[0_0_15px_rgba(229,9,20,0.5)] transition-shadow duration-300 group-hover:shadow-[0_0_25px_rgba(229,9,20,0.8)]">
        م
      </div>
      <div className="">
        <span className="block text-xl font-black tracking-tight text-white">
          مکمل
        </span>
        <span className="block text-[10px] font-bold text-zinc-500">
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
    <header className="sticky top-4 z-50 mx-auto max-w-7xl rounded-2xl shadow-2xl shadow-red-900/20 backdrop-blur-xl bg-black/80 border border-white/10">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Main header row */}
        <div className="flex h-16 items-center justify-between gap-4">
          <button
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white lg:hidden"
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
                className="w-full rounded-xl border-white/10 bg-white/5 pr-10 text-sm text-zinc-300 placeholder:text-zinc-500 focus:border-[#e50914] focus:ring-2 focus:ring-[#e50914]/50"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Auth */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAuthModalOpen(true)}
              className="hidden items-center gap-2 text-zinc-400 hover:bg-white/5 hover:text-white sm:flex"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">ورود / ثبت‌نام</span>
            </Button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 rounded-xl bg-white/5 px-3.5 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-[#e50914] hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]"
              aria-label="سبد خرید"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">سبد خرید</span>
              {totalItems > 0 && (
                <span className="absolute -left-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e50914] px-1 text-[11px] font-black text-white ring-2 ring-[#0a0a0a]">
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
            className="shrink-0 px-4 py-3 text-sm font-bold text-zinc-300 transition-all duration-300 hover:bg-white/5 hover:text-white relative after:absolute after:bottom-0 after:right-4 after:left-4 after:h-0.5 after:bg-[#e50914] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
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
                className={`shrink-0 flex items-center gap-1.5 px-4 py-3 text-sm font-bold transition-all duration-300 relative after:absolute after:bottom-0 after:right-4 after:left-4 after:h-0.5 after:bg-[#e50914] after:scale-x-0 after:transition-transform after:duration-300 hover:bg-white/5 hover:text-white ${
                  activeCategory === idx ? "text-white after:scale-x-100" : "text-zinc-400"
                }`}
              >
                {cat.title}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeCategory === idx ? "rotate-180 text-[#e50914]" : ""}`} />
              </button>

              {/* Dropdown panel */}
              {activeCategory === idx && (
                <div className="absolute top-full right-0 z-40 w-[720px] rounded-b-2xl border border-t-0 border-white/10 bg-zinc-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 animate-fade-in">
                  <div className="flex">
                    <div className="grid flex-1 grid-cols-2 gap-6 p-6">
                      {cat.children.map((child) => (
                        <div key={child.name}>
                          <Link
                            href={child.href}
                            className="mb-2 flex items-center gap-2 text-sm font-extrabold text-[#e50914] hover:underline"
                          >
                            {child.name}
                          </Link>
                          <ul className="space-y-1.5">
                            {child.products.map((name) => (
                              <li key={name}>
                                <Link
                                  href={`/search?q=${encodeURIComponent(name)}`}
                                  className="flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-300 hover:text-white hover:translate-x-[-4px]"
                                >
                                  <span className="h-1 w-1 rounded-full bg-zinc-600 transition-colors duration-300 group-hover:bg-[#e50914]" />
                                  {name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Promo banner inside dropdown */}
                    <div className="hidden w-56 shrink-0 flex-col justify-between bg-gradient-to-b from-[#e50914] to-[#B70910] p-5 text-white md:flex rounded-br-2xl">
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
                        className="mt-4 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#e50914] transition-transform hover:scale-105"
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
            className="shrink-0 px-4 py-3 text-sm font-bold text-zinc-400 transition-all duration-300 hover:bg-white/5 hover:text-white relative after:absolute after:bottom-0 after:right-4 after:left-4 after:h-0.5 after:bg-[#e50914] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            مجله ورزشی
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-black/90 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6 lg:px-8">
            <div className="relative mb-3">
              <Input
                type="search"
                placeholder="جستجو در محصولات..."
                className="w-full rounded-xl border-white/10 bg-white/5 pr-10 text-sm text-zinc-300 placeholder:text-zinc-500"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/category/sports-supplements"
                className="rounded-xl bg-[#e50914] px-4 py-3 text-center text-sm font-bold text-white"
              >
                مکمل‌های ورزشی
              </Link>
              <Link
                href="/category/general-health"
                className="rounded-xl bg-white/5 px-4 py-3 text-center text-sm font-bold text-zinc-300"
              >
                مکمل‌های عمومی
              </Link>
              <Link
                href="/category/weight-loss"
                className="rounded-xl bg-white/5 px-4 py-3 text-center text-sm font-bold text-zinc-300"
              >
                کاهش وزن
              </Link>
              <Link
                href="/brands"
                className="rounded-xl bg-white/5 px-4 py-3 text-center text-sm font-bold text-zinc-300"
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
