"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="mt-6 text-2xl font-black text-gray-900">
          پرداخت با موفقیت انجام شد
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          سفارش شما ثبت شد و به زودی ارسال خواهد شد.
        </p>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">شماره پیگیری سفارش</p>
          <p className="mt-1 text-lg font-black text-gray-900">#MK-84729</p>
        </div>

        <div className="mt-8">
          <Link href="/">
            <Button size="lg" className="w-full">
              بازگشت به صفحه اصلی
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
