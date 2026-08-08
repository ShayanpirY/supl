"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Truck, PlayCircle } from "lucide-react";

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  accent: string;
  gradient: string;
}

const SLIDES: Slide[] = [
  {
    title: "واردات مستقیم از شعبه دبی",
    subtitle: "ارسال ۲ تا ۴ روز کاری به سراسر ایران، با ضمانت اصالت کالا",
    cta: "مشاهده محصولات",
    href: "/category/sports-supplements",
    accent: "#FFC107",
    gradient: "from-brand-red via-brand-redDark to-red-900",
  },
  {
    title: "تخفیف ویژه وی پروتئین‌ها",
    subtitle: "تا ۳۵٪ تخفیف روی ایزوله و هیدرولایز بهترین برندهای دنیا",
    cta: "خرید وی پروتئین",
    href: "/category/sports-supplements/whey",
    accent: "#FFFFFF",
    gradient: "from-brand-dark via-brand-dark to-black",
  },
  {
    title: "قیمت‌گذاری لحظه‌ای بر اساس نرخ درهم",
    subtitle: "قیمت‌ها همیشه با نرخ روز درهم امارات محاسبه و به‌روزرسانی می‌شوند",
    cta: "قیمت‌ها چگونه محاسبه می‌شوند؟",
    href: "/pricing",
    accent: "#FFC107",
    gradient: "from-[#7A0000] via-brand-redDark to-brand-red",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const go = useCallback(
    (dir: 1 | -1) =>
      setCurrent((c) => (c + dir + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [go]);

  const slide = SLIDES[current];

  return (
    <section className="relative overflow-hidden">
      <div
        className={`relative flex h-[440px] items-center justify-center bg-gradient-to-l text-center ${slide.gradient}`}
      >
        {/* Decorative shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-white blur-3xl" />
        </div>

        <div className="container-x relative z-10 px-6">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur">
            <Truck className="h-3.5 w-3.5" />
            تحویل سریع از دبی — ۲ تا ۴ روز کاری
          </span>
          <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            {slide.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            {slide.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-black text-brand-red transition-all hover:scale-105 hover:shadow-2xl"
            >
              {slide.cta}
            </Link>
            <Link
              href="/blog/tv"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              <PlayCircle className="h-4 w-4" />
              ویدیوی آنباکسینگ
            </Link>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={() => go(-1)}
          className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/15 p-2 text-white backdrop-blur transition-colors hover:bg-white/30 sm:block"
          aria-label="اسلاید قبلی"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/15 p-2 text-white backdrop-blur transition-colors hover:bg-white/30 sm:block"
          aria-label="اسلاید بعدی"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.href}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`اسلاید ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
