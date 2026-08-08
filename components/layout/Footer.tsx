import Link from "next/link";
import { BRANDS } from "@/lib/data/categories";
import {
  Instagram,
  Send,
  Youtube,
  PhoneCall,
  Mail,
  MapPin,
} from "lucide-react";

const COLUMNS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "دسترسی سریع",
    links: [
      { label: "پروتئین وی", href: "/category/sports-supplements/whey" },
      { label: "کراتین", href: "/category/sports-supplements/creatine" },
      { label: "چربی سوز", href: "/category/weight-loss/fat-burners" },
      { label: "شیکر و تجهیزات", href: "/category/sports-gear/shakers" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { label: "پرسش‌های متداول", href: "/faq" },
      { label: "پیگیری سفارش", href: "/track-order" },
      { label: "شرایط بازگشت کالا", href: "/returns" },
      { label: "راهنمای خرید", href: "/help" },
    ],
  },
  {
    title: "درباره ما",
    links: [
      { label: "درباره مکمل", href: "/about" },
      { label: "ضمانت اصالت کالا", href: "/authenticity" },
      { label: "تماس با ما", href: "/contact" },
      { label: "فرصت‌های همکاری", href: "/careers" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl grid gap-10 py-12 px-4 sm:px-6 lg:px-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand block */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-xl font-black text-white">
              م
            </div>
            <span className="text-xl font-black text-gray-900">
              مکمل
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-gray-600">
            واردات مستقیم و تضمینی مکمل‌های ورزشی اورجینال از شعبه دبی. تمام
            محصولات دارای ضمانت اصالت کالا و ویدیوی آنباکسینگ اختصاصی هستند.
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 border border-gray-200 transition-all duration-300 hover:border-red-600 hover:text-red-600"
              aria-label="اینستاگرام"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 border border-gray-200 transition-all duration-300 hover:border-red-600 hover:text-red-600"
              aria-label="تلگرام"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 border border-gray-200 transition-all duration-300 hover:border-red-600 hover:text-red-600"
              aria-label="یوتیوب"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-extrabold text-gray-900">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-red-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Brands strip */}
      <div className="border-t border-gray-200 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-bold text-gray-500">برندهای مطرح:</p>
          <div className="flex flex-wrap gap-2">
            {BRANDS.slice(0, 8).map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-bold text-gray-700 transition-all duration-300 hover:border-red-600 hover:text-red-600"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-3 py-5 px-4 text-xs text-gray-500 sm:px-6 lg:px-8 md:flex-row">
          <p>© ۱۴۰۴ مکمل — تمامی حقوق محفوظ است.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="h-3.5 w-3.5 text-red-600" />
              ۰۲۱-۹۱۰۰۴۵۰۰
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-red-600" />
              support@mokamel.ir
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-red-600" />
              تهران، خیابان ولیعصر
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
