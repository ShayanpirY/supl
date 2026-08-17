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

  const subtotal = items.reduce(
    (acc, item) =>
      acc +
      toToman(
        item.product.variants.find((v) => v.id === item.variantId)?.priceInAED ??
          0,
      ) *
        item.quantity,
    0,
  );

  const total = subtotal + (subtotal > 0 ? SHIPPING_COST : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    router.push("/payment");
  };

  const updateField =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
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
                        placeholder="