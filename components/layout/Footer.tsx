import Link from "next/link";
import {
  Instagram,
  Send,
  Youtube,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  CreditCard,
  Headset,
  Truck,
} from "lucide-react";

const SERVICES: Array<{ label: string; href: string }> = [
  { label: "پرسش‌های متداول", href: "/faq" },
  { label: "پیگیری سفارش", href: "/track-order" },
  { label: "شرایط بازگشت کالا", href: "/returns" },
  { label: "راهنمای خرید", href: "/help" },
];

const QUICK_LINKS: Array<{ label: string; href: string }> = [
  { label: "پروتئین وی", href: "/category/sports-supplements/whey" },
  { label: "کراتین", href: "/category/sports-supplements/creatine" },
  { label: "چربی سوز", href: "/category/weight-loss/fat-burners" },
  { label: "شیکر و تجهیزات", href: "/category/sports-gear/shakers" },
];

const TRUST_BADGES: Array<{ label: string; desc: string; icon: typeof ShieldCheck }> = [
  { label: "ضمانت اصالت کالا", desc: "اورجینال و تضمینی", icon: ShieldCheck },
  { label: "پرداخت امن", desc: "درگاه معتبر بانکی", icon: CreditCard },
  { label: "پشتیبانی ۲۴ ساعته", desc: "هر روز هفته", icon: Headset },
  { label: "ارسال سریع", desc: "به سراسر کشور", icon: Truck },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-100 text-gray-700">
      {/* Trust badges */}
      <div className="border-b border-gray-200">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                <badge.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-extrabold text-gray-900">
                  {badge.label}
                </span>
                <span className="mt-0.5 block text-xs font-bold text-gray-500">
                  {badge.desc}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:px-8 md:grid-cols-2 lg:grid-cols-4">
        {/* درباره مکمل */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-xl font-black text-white">
              م
            </div>
            <span className="text-xl font-black text-gray-900">مکمل</span>
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
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 border border-gray-200 transition-all duration-300 hover:border-red-600 hover:text-red-600"
              aria-label="اینستاگرام"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 border border-gray-200 transition-all duration-300 hover:border-red-600 hover:text-red-600"
              aria-label="تلگرام"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 border border-gray-200 transition-all duration-300 hover:border-red-600 hover:text-red-600"
              aria-label="یوتیوب"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* خدمات مشتریان */}
        <div>
          <h4 className="mb-4 font-extrabold text-gray-900">خدمات مشتریان</h4>
          <ul className="space-y-2.5">
            {SERVICES.map((link) => (
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

        {/* لینک‌های سریع */}
        <div>
          <h4 className="mb-4 font-extrabold text-gray-900">لینک‌های سریع</h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((link) => (
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

        {/* خبرنامه */}
        <div>
          <h4 className="mb-4 font-extrabold text-gray-900">خبرنامه</h4>
          <p className="text-sm leading-6 text-gray-600">
            از تخفیف‌ها و محصولات جدید زودتر از بقیه باخبر شوید.
          </p>
          <form
            className="mt-4 flex overflow-hidden rounded-xl border border-gray-200 bg-white focus-within:border-red-600"
          >
            <input
              type="email"
              required
              placeholder="ایمیل خود را وارد کنید"
              className="w-full bg-transparent px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="shrink-0 bg-red-600 px-4 text-sm font-black text-white transition-colors duration-300 hover:bg-red-700"
            >
              عضویت
            </button>
          </form>
          <p className="mt-3 text-[11px] text-gray-500">
            با ثبت ایمیل، قوانین حریم خصوصی را می‌پذیرید.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-gray-500 sm:px-6 lg:px-8 md:flex-row">
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
