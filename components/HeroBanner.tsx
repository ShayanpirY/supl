"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Sparkles, Truck } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-gray-950 text-white shadow-xl">
      {/* Placeholder background image for the Whey Protein promo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/categories/whey.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-black" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/30 blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-500/20 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 flex flex-col items-center gap-10 py-14 sm:py-16 lg:flex-row lg:py-20"
      >
        <div className="flex-1 text-center lg:text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300">
            <Sparkles className="h-3.5 w-3.5" />
            پیشنهاد ویژه این هفته
          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
            پروتئین وی اورجینال
            <span className="mt-2 block text-red-500">
              با ضمانت اصالت کالا
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-300 sm:text-base lg:mx-0">
            واردات مستقیم از دبی، قیمت‌گذاری لحظه‌ای بر اساس نرخ درهم و ارسال
            سریع به سراسر کشور.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href="/category/sports-supplements"
              className="group inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-3.5 text-sm font-black text-white shadow-lg shadow-red-600/30 transition-all duration-300 ease-in-out hover:scale-[1.04] hover:bg-red-500 hover:shadow-2xl hover:shadow-red-500/50 active:scale-95"
            >
              خرید الان
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              مشاهده همه محصولات
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-bold text-gray-300 lg:justify-start">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-red-500" />
              ضمانت اصالت کالا
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-red-500" />
              ارسال ۲ تا ۴ روز کاری
            </span>
          </div>
        </div>

        <div className="relative flex justify-center lg:w-2/5">
          <div className="absolute inset-0 m-auto h-56 w-56 rounded-full bg-red-600/25 blur-3xl" />
          <Image
            src="/images/categories/whey.png"
            alt="پروتئین وی اورجینال"
            width={420}
            height={420}
            priority
            className="relative z-10 w-64 object-contain drop-shadow-2xl sm:w-80"
          />
        </div>
      </motion.div>
    </section>
  );
}
