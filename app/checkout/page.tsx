"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";
import { getProductImage } from "@/lib/product-images";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const SHIPPING_COST = 50000;

export default function CheckoutPage() {
  const { items } = useCartStore();
  const { toToman } = useCurrency();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    province: "",
    city: "",
    address: "",
  });

  const subtotal = items.reduce((acc, item) => {
    const variant = item.product.variants.find((v) => v.id === item.variantId);
    const price = toToman(variant?.priceInAED ?? 0);
    return acc + price * item.quantity;
  }, 0);

  const total = subtotal + (subtotal > 0 ? SHIPPING_COST : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    router.push("/payment");
  };

  const updateField = (field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-red-600">
            خانه
          </Link>
          <span>/</span>
          <span className="font-bold text-gray-900">تکمیل سفارش</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* فرم اطلاعات ارسال */}
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>اطلاعات ارسال</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-gray-700">
                      نام و نام خانوادگی
                    </label>
                    <Input
                      placeholder="مثلا: علی محمدی"
                      value={form.fullName}
                      onChange={updateField("fullName")}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-gray-700">
                      شماره تماس
                    </label>
                    <Input
                      type="tel"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={form.phone}
                      onChange={updateField("phone")}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-gray-700">
                        استان
                      </label>
                      <Input
                        placeholder="تهران"
                        value={form.province}
                        onChange={updateField("province")}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-gray-700">
                        شهر
                      </label>
                      <Input
                        placeholder="تهران"
                        value={form.city}
                        onChange={updateField("city")}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-gray-700">
                      آدرس کامل
                    </label>
                    <Input
                      placeholder="خیابان، پلاک، طبقه، واحد..."
                      value={form.address}
                      onChange={updateField("address")}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* خلاصه سفارش */}
            <div className="w-full lg:w-[420px]">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>خلاصه سفارش</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[320px] space-y-3 overflow-y-auto">
                    {items.length === 0 ? (
                      <p className="text-center text-sm text-gray-500">
                        سبد خرید شما خالی است.
                      </p>
                    ) : (
                      items.map((item) => {
                        const variant = item.product.variants.find(
                          (v) => v.id === item.variantId,
                        );
                        const linePrice =
                          toToman(variant?.priceInAED ?? 0) * item.quantity;
                        const imageUrl = getProductImage(item.product.images);

                        return (
                          <div
                            key={`${item.product.id}-${item.variantId}`}
                            className="flex items-center gap-3"
                          >
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white">
                              <Image
                                src={imageUrl}
                                alt={item.product.name}
                                fill
                                sizes="56px"
                                className="object-contain p-1"
                                unoptimized={imageUrl.startsWith("data:")}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="line-clamp-1 text-sm font-bold text-gray-900">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {variant?.label} × {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-black text-red-600">
                              {formatToman(linePrice)}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">جمع کالاها</span>
                      <span className="font-bold text-gray-900">
                        {formatToman(subtotal)} تومان
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">هزینه ارسال</span>
                      <span className="font-bold text-gray-900">
                        {subtotal > 0 ? formatToman(SHIPPING_COST) : "۰"} تومان
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-base">
                      <span className="font-extrabold text-gray-900">جمع کل</span>
                      <span className="text-lg font-black text-red-600">
                        {formatToman(total)} تومان
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={items.length === 0}
                  >
                    تایید و پرداخت
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}