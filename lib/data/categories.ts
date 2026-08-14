import { NavCategory, Brand } from "../types";

export const NAV_CATEGORIES: NavCategory[] = [
  {
    title: "مکمل‌های ورزشی",
    titleEn: "Sports Supplements",
    href: "/category/sports-supplements",
    icon: "dumbbell",
    children: [
      {
        name: "افزایش حجم و عضله",
        href: "/category/sports-supplements/muscle-gain",
        products: [
          "پروتئین (وی)",
          "پروتئین بیف",
          "پروتئین ایزوله",
          "پروتئین هیدرولیز",
          "پروتئین کازئین",
          "پروتئین چربی‌سوز",
        ],
      },
      {
        name: "آمینو اسید",
        href: "/category/sports-supplements/amino",
        products: [
          "آمینو",
          "آمینو EAA",
          "آمینو وی",
          "آمینو بیف",
          "H.M.B",
        ],
      },
      {
        name: "پیش از تمرین",
        href: "/category/sports-supplements/pre-workout",
        products: ["پمپ", "آرژنین", "بتاآلانین", "سیترولین"],
      },
      {
        name: "ریکاوری",
        href: "/category/sports-supplements/recovery",
        products: ["گلوتامین", "Bcaa", "پس از تمرین"],
      },
      {
        name: "افزایش وزن و حجم",
        href: "/category/sports-supplements/gainers",
        products: ["گینر", "کربوهیدرات"],
      },
      {
        name: "کراتین",
        href: "/category/sports-supplements/creatine",
        products: ["کراتین مونوهیدرات", "کراتین ترکیبی"],
        extraGroups: [
          {
            name: "پاراهورمون",
            href: "/category/sports-supplements/hormones",
            products: ["تست بوستر", "تریبولوس", "ZMA"],
          },
        ],
      },
    ],
  },
  {
    title: "مکمل‌های عمومی",
    titleEn: "General Health",
    href: "/category/general-health",
    icon: "heart",
    children: [
      {
        name: "ویتامین‌ها و مینرال‌ها",
        href: "/category/general-health/vitamins",
        products: ["مولتی‌ویتامین", "مکمل مینرال", "ویتامین ب کمپلکس", "ویتامین دی۳", "ویتامین سی"],
      },
      {
        name: "پوست، مو و ناخن",
        href: "/category/general-health/beauty",
        products: ["کلاژن", "بیوتین", "کراتین مو", "پوست، مو و ناخن"],
      },
      {
        name: "مفاصل و استخوان",
        href: "/category/general-health/joints",
        products: ["سلامت مفاصل", "گلوکزامین", "کندرویتین", "ام‌اس‌ام", "کلاژن نوع ۲"],
      },
      {
        name: "قلب و امگا ۳",
        href: "/category/general-health/omega",
        products: ["امگا ۳", "روغن ماهی", "روغن کریل", "کوآنزیم کیو۱۰"],
      },
      {
        name: "سیستم ایمنی",
        href: "/category/general-health/immunity",
        products: ["تقویت سیستم ایمنی", "روی", "بره‌موم", "شاه‌توت", "اکیناسه"],
      },
    ],
  },
  {
    title: "کاهش وزن",
    titleEn: "Weight Loss",
    href: "/category/weight-loss",
    icon: "flame",
    children: [
      {
        name: "چربی سوزها",
        href: "/category/weight-loss/fat-burners",
        products: ["چربی‌سوز", "ترموژنیک", "سی‌ال‌ای", "ال‌کارنیتین", "قهوه سبز"],
      },
    ],
  },
  {
    title: "تجهیزات ورزشی",
    titleEn: "Sports Gear",
    href: "/category/sports-gear",
    icon: "shirt",
    children: [
      {
        name: "شیکر و قمقمه",
        href: "/category/sports-gear/shakers",
        products: ["شیکر", "شیکر همزن‌دار", "قمقمه"],
      },
      {
        name: "کفش و پوشاک",
        href: "/category/sports-gear/shoes",
        products: ["کفش ورزشی", "پوشاک ورزشی", "دستکش تمرین", "کمربند وزنه‌برداری"],
      },
      {
        name: "لوازم جانبی",
        href: "/category/sports-gear/accessories",
        products: ["بند مچ", "مچ‌بند", "فوم‌رولر", "طناب پرش"],
      },
    ],
  },
  {
    title: "برندها",
    titleEn: "Brands",
    href: "/brands",
    icon: "award",
    children: [
      {
        name: "برندهای پرفروش",
        href: "/brands",
        products: ["آپتیموم نوتریشن", "ماسل‌تک", "ایووجن", "کوین لورون", "اپلاید نوتریشن"],
      },
      {
        name: "برندهای تخصصی",
        href: "/brands",
        products: ["یو‌اس‌ان", "بی‌اس‌ان", "دایماتایز", "نوترکس", "گرناد"],
      },
    ],
  },
  {
    title: "آموزش و ویدیو",
    titleEn: "Blog & Media",
    href: "/blog",
    icon: "play",
    children: [
      {
        name: "مقالات آموزشی",
        href: "/blog",
        products: ["تغذیه", "تمرین", "سلامت عمومی"],
      },
      {
        name: "مکمل TV",
        href: "/blog/tv",
        products: ["ویدیوهای آنباکسینگ", "بررسی محصولات", "مصاحبه با ورزشکاران"],
      },
    ],
  },
];

export const BRANDS: Brand[] = [
  { name: "Optimum Nutrition", slug: "optimum-nutrition", tagline: "استاندارد طلایی", logoColor: "#1A1A1A" },
  { name: "MuscleTech", slug: "muscletech", tagline: "قدرت علمی", logoColor: "#D32F2F" },
  { name: "Evogen", slug: "evogen", tagline: "انفجار تمرین", logoColor: "#111111" },
  { name: "Kevin Levrone", slug: "kevin-levrone", tagline: "اسطوره", logoColor: "#E50914" },
  { name: "Applied Nutrition", slug: "applied-nutrition", tagline: "کیفیت بریتانیا", logoColor: "#005EB8" },
  { name: "USN", slug: "usn", tagline: "علم پیشرفت", logoColor: "#0D0D0D" },
  { name: "BSN", slug: "bsn", tagline: "بهترین طعم", logoColor: "#1A1A1A" },
  { name: "Dymatize", slug: "dymatize", tagline: "ثابت‌شده", logoColor: "#7A0000" },
  { name: "Nutrex", slug: "nutrex", tagline: "قدرت", logoColor: "#E50914" },
  { name: "Grenade", slug: "grenade", tagline: "انفجار", logoColor: "#1A1A1A" },
  { name: "Prosupps", slug: "prosupps", tagline: "برای ورزشکار", logoColor: "#E50914" },
  { name: "BPI Sports", slug: "bpi-sports", tagline: "بهترین", logoColor: "#D32F2F" },
];
