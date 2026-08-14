"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MegaMenu from "@/components/layout/MegaMenu";
import type { NavCategory, Brand } from "@/lib/types";

interface NavbarProps {
  megaMenuCategories: NavCategory[];
  megaMenuBrands: Brand[];
}

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

export default function Navbar({
  megaMenuCategories,
  megaMenuBrands,
}: NavbarProps) {
  const totalItems = useCartStore((s) => s.totalItems());
  const setCartOpen = useCartStore((s) => s.setOpen);
  const { setAuthModalOpen, setSearchOpen, mobileMenuOpen, setMobileMenuOpen } =
    useUIStore();

  return (
    <header className="sticky top-0 z-[100] w-full overflow-visible border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl overflow-visible px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Full-width red mega menu bar */}
      <MegaMenu categories={megaMenuCategories} brands={megaMenuBrands} />

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
