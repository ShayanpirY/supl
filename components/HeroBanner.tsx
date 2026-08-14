"use client";

import Link from "next/link";
import { Truck, PlayCircle, Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-red-50/60 via-white to-white" />
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-100/60 blur-[120px]" />
      <div className="absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-red-50/60 blur-[100px]" />

      <div className="relative z-10 py-16 sm:py-24">
        <div className="text-center">
          <div className="mb-6 inline-flex animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-4 py-2 text-xs font-bold text-red-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <Truck className="h-3.5 w-3.5 text-red-600" />
              ارسال مستقیم از دبی ۲ تا ۴ روز کاری
            </span>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            خرید انواع مکمل‌های ورزشی
            <span className="block text-red-600">
              و بدنسازی اورجینال
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            ضمانت ۱۰۰٪ اصالت کالا | محاسبه آنلاین قیمت با نرخ روز درهم
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/category/sports-supplements"
              className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3.5 text-sm font-black text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-red-700 hover:shadow-lg"
            >
              <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              مشاهده محصولات
            </Link>
            <Link
              href="/blog/tv"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-red-200 bg-white px-8 py-3.5 text-sm font-bold text-red-700 transition-all duration-300 ease-in-out hover:border-red-400 hover:bg-red-50"
            >
              <PlayCircle className="h-4 w-4 text-red-600 transition-transform duration-300 group-hover:scale-110" />
              ویدیوهای آنباکس
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "ضمانت اصالت", icon: "🛡️" },
              { label: "ارسال از دبی", icon: "✈️" },
              { label: "پشتیبانی ۲۴/۷", icon: "💬" },
            ].map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 transition-all duration-300 hover:border-red-200 hover:text-red-700"
              >
                <span>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
