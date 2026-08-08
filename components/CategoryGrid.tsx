"use client";

import Link from "next/link";
import Image from "next/image";
import { GlassWater } from "lucide-react";

const CATEGORIES = [
  {
    name: "پروتئین وی",
    href: "/category/sports-supplements/whey",
    image: "/images/categories/whey.png.png",
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]",
  },
  {
    name: "کراتین",
    href: "/category/sports-supplements/creatine",
    image: "/images/categories/creatine.png.png",
    glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]",
  },
  {
    name: "گینر",
    href: "/category/sports-supplements/gainers",
    image: "/images/categories/gainer.png.png",
    glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]",
  },
  {
    name: "آمینو اسید",
    href: "/category/sports-supplements/amino",
    image: "/images/categories/amino.png.png",
    glow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]",
  },
  {
    name: "چربی‌سوز",
    href: "/category/weight-loss/fat-burners",
    image: "/images/categories/fat-burner.png.png",
    glow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]",
  },
  {
    name: "شیکر",
    href: "/category/sports-gear/shakers",
    fallbackIcon: GlassWater,
    glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]",
  },
];

export default function CategoryGrid() {
  return (
    <section className="w-full bg-[#0a0a0a] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group flex flex-col items-center justify-between min-h-[220px] rounded-2xl border bg-[#18181c] p-5 transition-all duration-300 ease-in-out hover:scale-105 hover:border-red-600/60 hover:shadow-[0_0_25px_rgba(229,9,20,0.25)] ${cat.glow}`}
            >
              <div className="flex flex-1 items-center justify-center py-2">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={180}
                    height={180}
                    className="h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(229,9,20,0.4)]"
                  />
                ) : (
                  <div className="flex h-32 w-full items-center justify-center">
                    {cat.fallbackIcon && (
                      <cat.fallbackIcon className="h-16 w-16 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </div>
                )}
              </div>

              <span className="text-center font-extrabold text-base text-zinc-100 transition-colors group-hover:text-red-500">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
