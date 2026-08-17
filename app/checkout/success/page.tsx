"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2, Home, Package } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  // بعد از پرداخت موفق، سبد را خالی کن
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="mb-3 text-2xl font-black text-gray-900">
          سفارش شما با موفقیت ثبت شد
        </h1>

        <p className="mb-8 leading-relaxed text-gray-600">
          از خرید شما متشکریم. به زودی از طریق پیامک یا تماس با شما هماهنگ
          خواهیم کرد.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition-colors hover:bg-red-700"
          >
            <Home className="h-4 w-4" />
            بازگشت به خانه
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Package className="h-4 w-4" />
            ادامه خرید
          </Link>
        </div>
      </div>
    </div>
  );
}