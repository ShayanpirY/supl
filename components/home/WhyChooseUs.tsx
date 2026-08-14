import {
  ShieldCheck,
  Video,
  Plane,
  BadgePercent,
  Headset,
  Boxes,
} from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "۱۰۰٪ ضمانت اصالت کالا",
    desc: "تمام محصولات دارای کد اصالت‌سنجی و تاییدیه از نمایندگی رسمی هستند.",
  },
  {
    icon: Video,
    title: "ویدیوی آنباکسینگ اختصاصی",
    desc: "قبل از ارسال، ویدیوی باز کردن و بررسی محصول برای شما ارسال می‌شود.",
  },
  {
    icon: Plane,
    title: "واردات مستقیم از دبی",
    desc: "بدون واسطه از شعبه دبی خرید و به‌صورت مستقیم برای شما ارسال می‌کنیم.",
  },
  {
    icon: BadgePercent,
    title: "قیمت بر اساس نرخ درهم",
    desc: "قیمت‌ها لحظه‌ای بر اساس نرخ درهم محاسبه و همیشه شفاف نمایش داده می‌شوند.",
  },
  {
    icon: Headset,
    title: "پشتیبانی تخصصی",
    desc: "مشاوره رایگان انتخاب مکمل توسط کارشناسان تغذیه و بدنسازی.",
  },
  {
    icon: Boxes,
    title: "ارسال سریع و امن",
    desc: "ارسال به سراسر کشور در بازه ۲ تا ۴ روز کاری با بسته‌بندی ایمن.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-12">
      <h2 className="section-title">چرا مکمل؟</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-600/30 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-gray-600">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}
