import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Flame, Zap } from "lucide-react";

const PROMOS = [
  {
    href: "/category/sports-supplements/gainers",
    image: "/images/categories/gainer.png",
    tag: "افزایش حجم",
    title: "تخفیف گینرها",
    subtitle: "تا ٪۲۰ تخفیف روی گینرهای پرکالری",
    cta: "مشاهده گینرها",
    icon: Zap,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    href: "/category/weight-loss/fat-burners",
    image: "/images/categories/fat-burner.png",
    tag: "کاهش وزن",
    title: "چربی‌سوزهای حرفه‌ای",
    subtitle: "محصولات کات اورجینال با ضمانت اصالت",
    cta: "مشاهده چربی‌سوزها",
    icon: Flame,
    gradient: "from-red-600 to-rose-700",
  },
];

export default function PromoBanners() {
  return (
    <section className="bg-white py-10">
      <div className="grid gap-4 sm:grid-cols-2">
        {PROMOS.map((promo) => (
          <Link
            key={promo.href}
            href={promo.href}
            className={`group relative flex min-h-[190px] items-center overflow-hidden rounded-2xl bg-gradient-to-l ${promo.gradient} p-6 text-white shadow-sm transition-all duration-300 hover:shadow-lg`}
          >
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-black/10 blur-2xl" />

            <div className="relative z-10 max-w-[58%]">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold">
                <promo.icon className="h-3.5 w-3.5" />
                {promo.tag}
              </span>
              <h3 className="mt-3 text-xl font-black leading-8 sm:text-2xl">
                {promo.title}
              </h3>
              <p className="mt-1 text-xs font-bold text-white/85">
                {promo.subtitle}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-black text-gray-900 transition-transform duration-300 group-hover:-translate-x-1">
                {promo.cta}
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="relative z-10 mr-auto flex h-full items-center overflow-hidden pr-2">
              <Image
                src={promo.image}
                alt={promo.title}
                width={220}
                height={220}
                className="h-36 w-36 object-contain drop-shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 sm:h-44 sm:w-44"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
