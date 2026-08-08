"use client";

import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  PhoneCall,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";
import MegaMenu from "@/components/layout/MegaMenu";

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red text-xl font-black text-white">
        S
      </div>
      <div className="leading-tight">
        <span className="block text-xl font-black tracking-tight text-brand-dark">
          Supply<span className="text-brand-red">X</span>
        </span>
        <span className="block text-[10px] font-bold text-gray-400">
          مکمل‌های ورزشی اورجینال
        </span>
      </div>
    </Link>
  );
}

export default function Header() {
  const totalItems = useCartStore((s) => s.totalItems());
  const setCartOpen = useCartStore((s) => s.setOpen);
  const { setAuthModalOpen, setSearchOpen, mobileMenuOpen, setMobileMenuOpen } =
    useUIStore();
  const { rate } = useCurrency();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <button
          className="rounded-lg p-2 text-brand-dark hover:bg-surface-subtle lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="منوی موبایل"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Logo />

        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden flex-1 items-center gap-3 rounded-full border border-gray-200 bg-surface-subtle px-5 py-2.5 text-right text-sm text-gray-500 transition-colors hover:border-brand-red md:flex lg:max-w-xl"
        >
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <span>جستجو در بیش از ۲۰۰۰ محصول... (مثلا: وی پروتئین، کراتین)</span>
          <kbd className="mr-auto rounded border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-400">
            ↵
          </kbd>
        </button>

        <div className="flex shrink-0 items-center gap-2">
          {/* Live AED badge */}
          <div className="hidden items-center gap-1 rounded-lg border border-brand-red/20 bg-brand-red/5 px-3 py-1.5 lg:flex">
            <span className="text-[10px] font-bold text-gray-500">۱ درهم ≈</span>
            <span className="text-xs font-extrabold text-brand-red">
              {formatToman(rate.aedToToman)} تومان
            </span>
          </div>

          {/* Auth */}
          <button
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-brand-dark transition-colors hover:bg-surface-subtle hover:text-brand-red"
          >
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">ورود / ثبت‌نام</span>
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 rounded-lg bg-brand-dark px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-red"
            aria-label="سبد خرید"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">سبد خرید</span>
            {totalItems > 0 && (
              <span className="absolute -left-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-black text-white ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Nav bar */}
      <div className="hidden border-t border-gray-100 lg:block">
        <div className="container-x flex items-center justify-between">
          <MegaMenu />
          <a
            href="tel:02191004500"
            className="flex shrink-0 items-center gap-2 text-sm font-bold text-gray-500 transition-colors hover:text-brand-red"
          >
            <PhoneCall className="h-4 w-4 text-brand-red" />
            ۰۲۱-۹۱۰۰۴۵۰۰
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <div className="container-x space-y-1 py-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-surface-subtle px-4 py-2.5 text-sm text-gray-500"
            >
              <Search className="h-4 w-4" />
              جستجو در محصولات...
            </button>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/category/sports-supplements"
                className="rounded-lg bg-brand-red px-4 py-3 text-center text-sm font-bold text-white"
              >
                مکمل‌های ورزشی
              </Link>
              <Link
                href="/category/general-health"
                className="rounded-lg bg-surface-subtle px-4 py-3 text-center text-sm font-bold"
              >
                مکمل‌های عمومی
              </Link>
              <Link
                href="/category/weight-loss"
                className="rounded-lg bg-surface-subtle px-4 py-3 text-center text-sm font-bold"
              >
                کاهش وزن
              </Link>
              <Link
                href="/brands"
                className="rounded-lg bg-surface-subtle px-4 py-3 text-center text-sm font-bold"
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
