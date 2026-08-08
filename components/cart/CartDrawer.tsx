"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingCart, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";

export default function CartDrawer() {
  const { items, isOpen, setOpen, updateQuantity, removeItem } = useCartStore();
  const { toToman } = useCurrency();

  const total = items.reduce(
    (acc, item) =>
      acc +
      toToman(
        item.product.variants.find((v) => v.id === item.variantId)?.priceInAED ??
          0,
      ) * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <aside className="absolute left-0 top-0 flex h-full w-full max-w-md animate-slide-up flex-col bg-white shadow-2xl border-r border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 bg-red-600 px-5 py-4 text-white">
          <h2 className="flex items-center gap-2 font-extrabold">
            <ShoppingCart className="h-5 w-5" />
            سبد خرید
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {items.length} کالا
            </span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 transition-colors hover:bg-white/20"
            aria-label="بستن سبد خرید"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 border border-gray-200">
              <ShoppingCart className="h-9 w-9 text-gray-400" />
            </div>
            <p className="font-extrabold text-gray-900">سبد خرید شما خالی است</p>
            <p className="text-sm text-gray-500">
              برای دیدن محصولات به فروشگاه بروید
            </p>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
            >
              مشاهده محصولات
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {items.map((item) => {
                const variant = item.product.variants.find(
                  (v) => v.id === item.variantId,
                )!;
                const price = toToman(variant?.priceInAED ?? 0);
                return (
                  <div
                    key={`${item.product.id}-${item.variantId}`}
                    className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3"
                  >
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white text-xl font-black text-gray-300 border border-gray-100"
                    >
                      {item.product.brand.charAt(0)}
                    </div>

                    <div className="flex flex-1 flex-col">
                      <p className="text-sm font-extrabold leading-5 text-gray-900">
                        {item.product.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-500">
                        {variant?.label}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-1 py-0.5">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.variantId,
                                item.quantity + 1,
                              )
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full text-red-600 transition-colors hover:bg-red-50"
                            aria-label="افزایش تعداد"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-black text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.variantId,
                                item.quantity - 1,
                              )
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full text-red-600 transition-colors hover:bg-red-50"
                            aria-label="کاهش تعداد"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-black text-red-600">
                          {formatToman(price * item.quantity)} تومان
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id, item.variantId)}
                      className="self-start rounded-lg p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      aria-label="حذف کالا"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-gray-900">جمع کل</span>
                <p className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-red-600">
                    {formatToman(total)}
                  </span>
                  <span className="text-sm font-bold text-gray-500">تومان</span>
                </p>
              </div>
              <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-gray-500">
                <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                قیمت بر اساس نرخ لحظه‌ای درهم؛ در صورت تغییر، قیمت نهایی در پرداخت
                اعمال می‌شود.
              </p>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
              >
                ثبت سفارش و پرداخت
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
