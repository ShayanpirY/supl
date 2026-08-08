"use client";

import Link from "next/link";
import { Truck, PlayCircle, Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-zinc-950 to-black" />
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-[120px]" />
      <div className="absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-red-900/20 blur-[100px]" />
      <div className="absolute -right-20 top-1/3 h-[300px] w-[300px] rounded-full bg-orange-600/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-32">
        <div className="text-center">
          {/* Floating glassmorphism badge */}
          <div className="mb-6 inline-flex animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <Truck className="h-3.5 w-3.5 text-red-400" />
              ارسال مستقیم از دبی ۲ تا ۴ روز کاری
            </span>
          </div>

          {/* Main headline with glow effect */}
          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            خرید انواع مکمل‌های ورزشی
            <span className="block text-transparent bg-clip-text bg-gradient-to-l from-red-400 to-red-600" style={{ textShadow: "0 0 40px rgba(229,9,20,0.3)" }}>
              و بدنسازی اورجینال
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            ضمانت ۱۰۰٪ اصالت کالا | محاسبه آنلاین قیمت با نرخ روز درهم
          </p>

          {/* Action buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/category/sports-supplements"
              className="group inline-flex items-center gap-2 rounded-full bg-[#e50914] px-8 py-3.5 text-sm font-black text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_35px_rgba(229,9,20,0.7)]"
            >
              <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              مشاهده محصولات
            </Link>
            <Link
              href="/blog/tv"
              className="group inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-transparent px-8 py-3.5 text-sm font-bold text-white backdrop-blur transition-all duration-300 ease-in-out hover:border-red-400 hover:bg-white/5"
            >
              <PlayCircle className="h-4 w-4 text-red-400 transition-transform duration-300 group-hover:scale-110" />
              ویدیوهای آنباکس
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "ضمانت اصالت", icon: "🛡️" },
              { label: "ارسال از دبی", icon: "✈️" },
              { label: "پشتیبانی ۲۴/۷", icon: "💬" },
            ].map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold text-zinc-400 transition-all duration-300 hover:border-white/20 hover:text-white"
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
