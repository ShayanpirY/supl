import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BRANDS = [
  {
    name: "Optimum Nutrition",
    slug: "optimum-nutrition",
    tagline: "استاندارد طلایی",
    logoColor: "#1A1A1A",
  },
  {
    name: "MuscleTech",
    slug: "muscletech",
    tagline: "قدرت علمی",
    logoColor: "#D32F2F",
  },
  {
    name: "Evogen",
    slug: "evogen",
    tagline: "انفجار تمرین",
    logoColor: "#111111",
  },
  {
    name: "Kevin Levrone",
    slug: "kevin-levrone",
    tagline: "اسطوره",
    logoColor: "#E50914",
  },
  {
    name: "Applied Nutrition",
    slug: "applied-nutrition",
    tagline: "کیفیت بریتانیا",
    logoColor: "#005EB8",
  },
  {
    name: "USN",
    slug: "usn",
    tagline: "علم پیشرفت",
    logoColor: "#0D0D0D",
  },
  {
    name: "Dymatize",
    slug: "dymatize",
    tagline: "ثابت‌شده",
    logoColor: "#7A0000",
  },
  {
    name: "BSN",
    slug: "bsn",
    tagline: "بهترین طعم",
    logoColor: "#1A1A1A",
  },
  {
    name: "Scivation",
    slug: "scivation",
    tagline: "علمی و تخصصی",
    logoColor: "#0D0D0D",
  },
  {
    name: "BPI Sports",
    slug: "bpi-sports",
    tagline: "بهترین",
    logoColor: "#D32F2F",
  },
];

const GRID_CATEGORIES = [
  {
    title: "پروتئین وی",
    slug: "whey-protein",
    image: "/images/categories/whey.png",
  },
  {
    title: "کراتین",
    slug: "creatine",
    image: "/images/categories/creatine.png",
  },
  {
    title: "گینر",
    slug: "gainer",
    image: "/images/categories/gainer.png",
  },
  {
    title: "آمینو اسید",
    slug: "amino-acid",
    image: "/images/categories/amino.png",
  },
  {
    title: "چربی‌سوز",
    slug: "fat-burner",
    image: "/images/categories/fat-burner.png",
  },
  {
    title: "شیکر و لوازم",
    slug: "accessories",
    image: null,
  },
];

const MEGA_SLUG_TITLES: Record<string, string> = {
  whey: "پروتئین وی",
  beef: "پروتئین بیف",
  isolate: "پروتئین ایزوله",
  hydrolyzed: "پروتئین هیدرولیز",
  casein: "پروتئین کازئین",
  "protein-fat-burner": "پروتئین چربی‌سوز",
  amino: "آمینو",
  eaa: "آمینو EAA",
  "amino-whey": "آمینو وی",
  "amino-beef": "آمینو بیف",
  hmb: "H.M.B",
  pump: "پمپ",
  arginine: "آرژنین",
  "beta-alanine": "بتاآلانین",
  citrulline: "سیترولین",
  glutamine: "گلوتامین",
  bcaa: "BCAA",
  "post-workout": "پس از تمرین",
  gainer: "گینر",
  carbs: "کربوهیدرات",
  creatine: "کراتین مونوهیدرات",
  "creatine-blend": "کراتین ترکیبی",
  "test-booster": "تست بوستر",
  tribulus: "تریبولوس",
  zma: "ZMA",
  "sports-supplements": "مکمل‌های ورزشی",
  "general-health": "مکمل‌های عمومی",
  "weight-loss": "کاهش وزن",
  "sports-gear": "تجهیزات ورزشی",
};

const u = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&auto=format&fit=crop&q=80`;

interface SeedProduct {
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  summary: string;
  description: string;
  imageId: string;
  imageAlt: string;
  tags: string[];
  variants: {
    id: string;
    label: string;
    priceInAED: number;
    oldPriceInAED?: number;
    inStock: boolean;
  }[];
  facts?: { label: string; perServing?: string; dailyValue?: string; bold?: boolean }[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  hasUnboxingVideo?: boolean;
  unboxingVideoUrl?: string;
  batchCode?: string;
}

const PRODUCTS: SeedProduct[] = [
  {
    slug: "optimum-nutrition-gold-standard-whey",
    name: "پروتئین وی گلد استاندارد",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "whey",
    subcategory: "مکمل‌های عضله و حجم (Whey)",
    summary: "محبوب‌ترین وی پروتئین جهان با ۲۴ گرم پروتئین در هر سروینگ.",
    description:
      "گلد استاندارد وی از ایزوله و کنسانتره وی با کیفیت بالا ساخته شده است. هر سروینگ حاوی ۲۴ گرم پروتئین، ۵.۵ گرم BCAA و ۴ گرم گلوتامین است. محصول اورجینال وارداتی از دبی با ضمانت اصالت کالا.",
    imageId: "photo-1593095948071-474c5cc2989d",
    imageAlt: "Gold Standard Whey protein powder scoop",
    tags: ["پرفروش", "اصالت‌سنجی"],
    variants: [
      { id: "v-900", label: "۹۰۰ گرم — ۳۰ سروینگ — شکلات", priceInAED: 98, oldPriceInAED: 115, inStock: true },
      { id: "v-2000", label: "۲.۲۷ کیلوگرم — ۷۵ سروینگ — شکلات", priceInAED: 185, oldPriceInAED: 210, inStock: true },
      { id: "v-900-van", label: "۹۰۰ گرم — ۳۰ سروینگ — وانیل", priceInAED: 96, inStock: true },
      { id: "v-900-straw", label: "۹۰۰ گرم — ۳۰ سروینگ — توت‌فرنگی", priceInAED: 97, inStock: false },
    ],
    facts: [
      { label: "پروتئین", perServing: "24 g", bold: true },
      { label: "کربوهیدرات", perServing: "3 g" },
      { label: "چربی", perServing: "1.5 g" },
      { label: "BCAA", perServing: "5.5 g" },
      { label: "گلوتامین", perServing: "4 g" },
      { label: "کالری", perServing: "120 kcal" },
    ],
    rating: 4.9,
    reviewCount: 1284,
    featured: true,
    bestSeller: true,
    hasUnboxingVideo: true,
    unboxingVideoUrl: "https://www.youtube.com/watch?v=xxxx",
    batchCode: "GS-2026-04127",
  },
  {
    slug: "dymatize-iso100-hydrolyzed-whey",
    name: "وی ایزوله هیدرولایز ISO 100",
    brand: "Dymatize",
    category: "مکمل‌های ورزشی",
    categorySlug: "isolate",
    subcategory: "مکمل‌های عضله و حجم (Whey)",
    summary: "پروتئین ایزوله و هیدرولایز شده با جذب فوق‌العاده سریع.",
    description:
      "ISO 100 یکی از خالص‌ترین وی پروتئین‌های ایزوله در بازار است که با آنزیم‌های هیدرولایز شده برای جذب سریع‌تر ساخته می‌شود. مناسب برای دوره کات و افراد حساس به لاکتوز.",
    imageId: "photo-1579722820308-d74e571900a9",
    imageAlt: "Dymatize ISO 100 whey protein isolate",
    tags: ["ایزوله"],
    variants: [
      { id: "iso-2100", label: "۲.۱ کیلوگرم — ۶۸ سروینگ — کوکی", priceInAED: 165, oldPriceInAED: 190, inStock: true },
      { id: "iso-3200", label: "۳.۲ کیلوگرم — ۹۸ سروینگ — کره بادام‌زمینی", priceInAED: 225, inStock: true },
    ],
    facts: [
      { label: "پروتئین", perServing: "25 g", bold: true },
      { label: "کربوهیدرات", perServing: "1 g" },
      { label: "چربی", perServing: "0.5 g" },
      { label: "BCAA", perServing: "5.5 g" },
      { label: "کالری", perServing: "110 kcal" },
    ],
    rating: 4.8,
    reviewCount: 856,
    featured: true,
    hasUnboxingVideo: true,
    unboxingVideoUrl: "https://www.youtube.com/watch?v=yyyy",
    batchCode: "DYM-ISO-2026-8812",
  },
  {
    slug: "dymatize-hydrolyzed-whey",
    name: "وی هیدرولیزه Dymatize",
    brand: "Dymatize",
    category: "مکمل‌های ورزشی",
    categorySlug: "hydrolyzed",
    subcategory: "مکمل‌های عضله و حجم (Whey)",
    summary: "پروتئین هیدرولیزه با جذب سریع‌تر از ایزوله.",
    description:
      "وی هیدرولیزه با پیش‌هضم آنزیمی، سریع‌ترین سرعت جذب را دارد و برای بلافاصله بعد از تمرین ایده‌آل است. بدون لاکتوز و چربی تقریباً صفر.",
    imageId: "photo-1517838277536-f5f99be501cd",
    imageAlt: "athlete lifting barbell after workout",
    tags: ["هیدرولیز"],
    variants: [
      { id: "hyd-1kg", label: "۱ کیلوگرم — شکلات", priceInAED: 145, inStock: true },
    ],
    facts: [
      { label: "پروتئین", perServing: "27 g", bold: true },
      { label: "کربوهیدرات", perServing: "0 g" },
      { label: "چربی", perServing: "0 g" },
    ],
    rating: 4.7,
    reviewCount: 402,
    isNew: true,
    batchCode: "DYM-HYD-2026-102",
  },
  {
    slug: "optimum-nutrition-beef-protein",
    name: "پروتئین بیف ایزوله",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "beef",
    subcategory: "مکمل‌های عضله و حجم (Whey)",
    summary: "پروتئین خالص گاوی برای افراد حساس به وی و لاکتوز.",
    description:
      "پروتئین ایزوله گوشت گاو از هیدرولیز کلاژن و بافت‌های گوشت به دست می‌آید و جایگزین مناسبی برای افرادی است که به پروتئین وی حساسیت دارند.",
    imageId: "photo-1534438327276-14e5300c3a48",
    imageAlt: "dumbbell rack in gym",
    tags: ["بیف"],
    variants: [
      { id: "beef-900", label: "۹۰۰ گرم — شکلات", priceInAED: 110, oldPriceInAED: 125, inStock: true },
    ],
    facts: [
      { label: "پروتئین", perServing: "26 g", bold: true },
      { label: "کربوهیدرات", perServing: "0 g" },
      { label: "چربی", perServing: "1 g" },
    ],
    rating: 4.5,
    reviewCount: 218,
    batchCode: "ON-BEEF-2026-77",
  },
  {
    slug: "muscletech-phase8-casein",
    name: "پروتئین کازیین Phase 8",
    brand: "MuscleTech",
    category: "مکمل‌های ورزشی",
    categorySlug: "casein",
    subcategory: "مکمل‌های عضله و حجم (Whey)",
    summary: "کازیین چند مرحله‌ای برای ریکاوری شبانه.",
    description:
      "Phase 8 ترکیبی از ۸ منبع پروتئینی با سرعت جذب متفاوت برای تامین پایدار آمینواسیدها طی ۸ ساعت. بهترین گزینه قبل از خواب.",
    imageId: "photo-1517836357463-d25dfeac3438",
    imageAlt: "athlete performing dumbbell curl",
    tags: ["کازیین"],
    variants: [
      { id: "ph8-4lb", label: "۴.۵ پوند — ۵۱ سروینگ — شکلات", priceInAED: 78, oldPriceInAED: 92, inStock: true },
      { id: "ph8-2lb", label: "۲.۲ پوند — ۲۶ سروینگ — وانیل", priceInAED: 45, inStock: false },
    ],
    facts: [
      { label: "پروتئین", perServing: "26 g", bold: true },
      { label: "کازئین", perServing: "17.5 g" },
      { label: "وی ایزوله", perServing: "5.5 g" },
      { label: "کالری", perServing: "150 kcal" },
    ],
    rating: 4.7,
    reviewCount: 521,
    batchCode: "MT-PH8-2026-334",
  },
  {
    slug: "optimum-nutrition-lean-whey",
    name: "پروتئین چربی‌سوز Lean Whey",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "protein-fat-burner",
    subcategory: "مکمل‌های عضله و حجم (Whey)",
    summary: "وی پروتئین همراه با L-Carnitine برای حمایت از کات.",
    description:
      "ترکیب وی ایزوله کم‌چرب با ال-کارنیتین برای حفظ عضله در دوران چربی‌سوزی. گزینه ایده‌آل برای دوره کات.",
    imageId: "photo-1517963879433-6ad2b056d712",
    imageAlt: "gym interior with weights",
    tags: ["کات", "چربی‌سوز"],
    variants: [
      { id: "lw-900", label: "۹۰۰ گرم — شکلات", priceInAED: 88, inStock: true },
    ],
    facts: [
      { label: "پروتئین", perServing: "23 g", bold: true },
      { label: "L-Carnitine", perServing: "1000 mg" },
      { label: "کربوهیدرات", perServing: "1 g" },
    ],
    rating: 4.4,
    reviewCount: 187,
    isNew: true,
    batchCode: "ON-LW-2026-56",
  },
  {
    slug: "optimum-nutrition-amino-energy",
    name: "آمینو انرژی",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "amino",
    subcategory: "آمینو اسیدها",
    summary: "آمینو اسیدهای ضروری به همراه انرژی و الکترولیت.",
    description:
      "مکمل آمینو انرژی حاوی ۵ گرم آمینو اسید ضروری در هر سروینگ همراه با کافئین طبیعی از چای سبز و الکترولیت‌ها برای تمرینات طولانی.",
    imageId: "photo-1571019613454-1cb2f99b2d8b",
    imageAlt: "athlete training with resistance band",
    tags: ["آمینو", "انرژی"],
    variants: [
      { id: "ae-60", label: "۶۰ سروینگ — توت‌فرنگی", priceInAED: 42, oldPriceInAED: 50, inStock: true },
      { id: "ae-30", label: "۳۰ سروینگ — لیمو", priceInAED: 24, inStock: true },
    ],
    facts: [
      { label: "EAA", perServing: "5 g", bold: true },
      { label: "کافئین", perServing: "100 mg" },
      { label: "الکترولیت", perServing: "300 mg" },
    ],
    rating: 4.6,
    reviewCount: 342,
    batchCode: "ON-AE-2026-90",
  },
  {
    slug: "scivation-extend-eaa",
    name: "آمینو EAA Extend",
    brand: "Scivation",
    category: "مکمل‌های ورزشی",
    categorySlug: "eaa",
    subcategory: "آمینو اسیدها",
    summary: "آمینو اسیدهای ضروری کامل برای حفظ عضله در تمرین.",
    description:
      "Extend حاوی ۹ آمینو اسید ضروری در نسبت بهینه ۲:۱:۱ برای کاهش کاتابولیسم و افزایش ریکاوری در طول تمرین.",
    imageId: "photo-1518611012118-696072aa579a",
    imageAlt: "woman training with dumbbell",
    tags: ["EAA"],
    variants: [
      { id: "ext-90", label: "۹۰ سروینگ — آبمیوه", priceInAED: 55, oldPriceInAED: 65, inStock: true },
    ],
    facts: [
      { label: "EAA", perServing: "7 g", bold: true },
      { label: "BCAA", perServing: "5 g" },
      { label: "کالری", perServing: "10 kcal" },
    ],
    rating: 4.7,
    reviewCount: 298,
    batchCode: "SCV-EXT-2026-41",
  },
  {
    slug: "optimum-nutrition-amino-whey",
    name: "آمینو وی",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "amino-whey",
    subcategory: "آمینو اسیدها",
    summary: "آمینو اسیدهای مشتق از وی پروتئین هیدرولیزه.",
    description:
      "آمینو وی از هیدرولیز وی پروتئین به دست می‌آید و حاوی دی‌پپتیدها و تری‌پپتیدها برای جذب فوق‌سریع حین تمرین است.",
    imageId: "photo-1583454110551-21f2fa2afe61",
    imageAlt: "woman doing battle ropes workout",
    tags: ["آمینو", "وی"],
    variants: [
      { id: "aw-90", label: "۹۰ سروینگ — بلو رز", priceInAED: 48, inStock: true },
    ],
    facts: [
      { label: "پروتئین هیدرولیزه", perServing: "5 g", bold: true },
      { label: "کالری", perServing: "0 kcal" },
    ],
    rating: 4.5,
    reviewCount: 176,
    batchCode: "ON-AW-2026-12",
  },
  {
    slug: "muscletech-hmb",
    name: "HMB MuscleTech",
    brand: "MuscleTech",
    category: "مکمل‌های ورزشی",
    categorySlug: "hmb",
    subcategory: "آمینو اسیدها",
    summary: "HMB برای جلوگیری از تجزیه عضله در دوره کات.",
    description:
      "بتا-هیدروکسی بتا-متیل بوتیرات (HMB) به کاهش تجزیه پروتئین عضله کمک کرده و برای ورزشکاران دوره کات و مبتدیان مناسب است.",
    imageId: "photo-1541534741688-6078c6bfb5c5",
    imageAlt: "athlete doing box jumps",
    tags: ["HMB"],
    variants: [
      { id: "hmb-90", label: "۹۰ کپسول", priceInAED: 38, oldPriceInAED: 45, inStock: true },
    ],
    facts: [
      { label: "HMB", perServing: "1000 mg", bold: true },
      { label: "کلسیم", perServing: "120 mg" },
    ],
    rating: 4.3,
    reviewCount: 143,
    batchCode: "MT-HMB-2026-9",
  },
  {
    slug: "bsn-noxplode-preworkout",
    name: "پری‌ورک‌اوت N.O.-XPLODE",
    brand: "BSN",
    category: "مکمل‌های ورزشی",
    categorySlug: "pump",
    subcategory: "قبل از تمرین (Pre-Workout)",
    summary: "انرژی و پمپ شدید قبل از تمرین با کافئین و نیتریک اکساید.",
    description:
      "N.O.-XPLODE ترکیبی از کافئین، سیترولین و بتا-آلانین برای پمپ، استقامت و تمرکز حداکثری در تمرین.",
    imageId: "photo-1540497077202-7c8a3999166f",
    imageAlt: "man training in gym",
    tags: ["پری‌ورک‌اوت"],
    variants: [
      { id: "nox-60", label: "۶۰ سروینگ — پانچ میوه", priceInAED: 72, oldPriceInAED: 85, inStock: true },
    ],
    facts: [
      { label: "کافئین", perServing: "240 mg", bold: true },
      { label: "بتا-آلانین", perServing: "1.5 g" },
      { label: "سیترولین", perServing: "1.5 g" },
      { label: "کالری", perServing: "0 kcal" },
    ],
    rating: 4.6,
    reviewCount: 612,
    bestSeller: true,
    hasUnboxingVideo: true,
    unboxingVideoUrl: "https://www.youtube.com/watch?v=zzzz",
    batchCode: "BSN-NOX-2026-901",
  },
  {
    slug: "evogen-evp-x-preworkout",
    name: "پری‌ورک‌اوت EVP X",
    brand: "Evogen",
    category: "مکمل‌های ورزشی",
    categorySlug: "pump",
    subcategory: "قبل از تمرین (Pre-Workout)",
    summary: "انرژی شدید و تمرکز در سطح مسابقه.",
    description:
      "EVP X از برند Evogen (همایون جعفری) با دوز قدرتمند کافئین، سیترولین و تایروزین برای تمرین‌های سنگین.",
    imageId: "photo-1571902943202-507ec2618e8f",
    imageAlt: "athlete training with kettlebell",
    tags: ["پری‌ورک‌اوت", "پرفروش"],
    variants: [
      { id: "evp-42", label: "۴۲ سروینگ — بلو رز", priceInAED: 88, oldPriceInAED: 102, inStock: true },
    ],
    facts: [
      { label: "کافئین", perServing: "400 mg", bold: true },
      { label: "سیترولین", perServing: "6 g" },
      { label: "کالری", perServing: "5 kcal" },
    ],
    rating: 4.8,
    reviewCount: 402,
    batchCode: "EVG-EVP-2026-78",
  },
  {
    slug: "optimum-nutrition-arginine",
    name: "ال-آرژنین ۱۰۰۰",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "arginine",
    subcategory: "قبل از تمرین (Pre-Workout)",
    summary: "آرژنین برای افزایش نیتریک اکساید و پمپ عضلانی.",
    description:
      "ال-آرژنین آلفا کتوگلوتارات (AAKG) به افزایش نیتریک اکساید کمک کرده و پمپ و جریان خون به عضلات را بهبود می‌دهد.",
    imageId: "photo-1434682881908-b43d0467b798",
    imageAlt: "athlete doing push ups",
    tags: ["آرژنین", "پمپ"],
    variants: [
      { id: "arg-90", label: "۹۰ کپسول", priceInAED: 30, inStock: true },
      { id: "arg-180", label: "۱۸۰ کپسول", priceInAED: 52, oldPriceInAED: 60, inStock: true },
    ],
    facts: [
      { label: "ال-آرژنین", perServing: "1000 mg", bold: true },
      { label: "AAKG", perServing: "1000 mg" },
    ],
    rating: 4.5,
    reviewCount: 231,
    batchCode: "ON-ARG-2026-33",
  },
  {
    slug: "optimum-nutrition-beta-alanine",
    name: "بتا-آلانین",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "beta-alanine",
    subcategory: "قبل از تمرین (Pre-Workout)",
    summary: "بتا-آلانین برای افزایش استقامت و تاخیر در خستگی.",
    description:
      "بتا-آلانین با افزایش کارنوزین عضلانی به تاخیر در خستگی و بهبود عملکرد در تمرینات با شدت بالا کمک می‌کند.",
    imageId: "photo-1476480862126-209bfaa8edc8",
    imageAlt: "man running outdoors",
    tags: ["استقامت"],
    variants: [
      { id: "ba-200", label: "۲۰۰ گرم پودر", priceInAED: 22, oldPriceInAED: 28, inStock: true },
    ],
    facts: [
      { label: "بتا-آلانین", perServing: "3.2 g", bold: true },
    ],
    rating: 4.4,
    reviewCount: 198,
    batchCode: "ON-BA-2026-5",
  },
  {
    slug: "optimum-nutrition-glutamine",
    name: "ال-گلوتامین",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "glutamine",
    subcategory: "ریکاوری",
    summary: "گلوتامین برای ریکاوری و سلامت روده.",
    description:
      "ال-گلوتامین پرکاربردترین آمینو اسید بدن است که به ریکاوری عضلات، تقویت سیستم ایمنی و سلامت گوارش کمک می‌کند.",
    imageId: "photo-1532029837206-abbe2b7620e3",
    imageAlt: "woman doing core workout",
    tags: ["ریکاوری"],
    variants: [
      { id: "glut-500", label: "۵۰۰ گرم پودر", priceInAED: 34, inStock: true },
    ],
    facts: [
      { label: "ال-گلوتامین", perServing: "5 g", bold: true },
      { label: "کالری", perServing: "20 kcal" },
    ],
    rating: 4.6,
    reviewCount: 264,
    batchCode: "ON-GLU-2026-28",
  },
  {
    slug: "optimum-nutrition-bcaa",
    name: "BCAA 1000",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "bcaa",
    subcategory: "ریکاوری",
    summary: "BCAA با نسبت ۲:۱:۱ برای کاهش کاتابولیسم.",
    description:
      "BCAA 1000 با نسبت استاندارد لوسین، ایزولوسین و والین به حفظ عضله در طول تمرین و کاهش خستگی کمک می‌کند.",
    imageId: "photo-1550345332-09e3ac987658",
    imageAlt: "woman running on road",
    tags: ["BCAA", "ریکاوری"],
    variants: [
      { id: "bcaa-100", label: "۱۰۰ کپسول", priceInAED: 26, oldPriceInAED: 32, inStock: true },
      { id: "bcaa-200", label: "۲۰۰ کپسول", priceInAED: 45, inStock: true },
    ],
    facts: [
      { label: "BCAA", perServing: "1000 mg", bold: true },
      { label: "لوسین", perServing: "500 mg" },
    ],
    rating: 4.7,
    reviewCount: 389,
    batchCode: "ON-BCAA-2026-61",
  },
  {
    slug: "applied-nutrition-recovery",
    name: "پودر ریکاوری پس از تمرین",
    brand: "Applied Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "post-workout",
    subcategory: "ریکاوری",
    summary: "ترکیب کربوهیدرات، پروتئین و الکترولیت برای بعد از تمرین.",
    description:
      "پودر ریکاوری اپلاید با ۲۰ گرم کربوهیدرات و ۱۰ گرم پروتئین به جبران گلیکوژن و بازسازی عضلات بلافاصله بعد از تمرین کمک می‌کند.",
    imageId: "photo-1526506118085-60ce8714f8c5",
    imageAlt: "man lifting barbell",
    tags: ["ریکاوری", "پس از تمرین"],
    variants: [
      { id: "rec-2kg", label: "۲ کیلوگرم — شکلات", priceInAED: 65, oldPriceInAED: 75, inStock: true },
    ],
    facts: [
      { label: "کربوهیدرات", perServing: "20 g", bold: true },
      { label: "پروتئین", perServing: "10 g" },
      { label: "الکترولیت", perServing: "200 mg" },
    ],
    rating: 4.5,
    reviewCount: 187,
    isNew: true,
    batchCode: "AN-REC-2026-14",
  },
  {
    slug: "applied-nutrition-critical-mass-gainer",
    name: "مکمل افزایش وزن Critical Mass",
    brand: "Applied Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "gainer",
    subcategory: "ریکاوری و افزایش وزن",
    summary: "گینر پرکالری برای افزایش وزن اصولی.",
    description:
      "گینر Critical Mass با ۱۲۵۰ کالری در هر سروینگ برای افرادی که به سختی وزن اضافه می‌کنند. حاوی کربوهیدرات‌های پیچیده و پروتئین با کیفیت.",
    imageId: "photo-1490645935967-10de6ba17061",
    imageAlt: "healthy high calorie meal bowl",
    tags: ["گینر"],
    variants: [
      { id: "gm-5kg", label: "۵ کیلوگرم — شکلات", priceInAED: 145, oldPriceInAED: 165, inStock: true },
      { id: "gm-3kg", label: "۳ کیلوگرم — وانیل", priceInAED: 95, inStock: true },
    ],
    facts: [
      { label: "کالری", perServing: "1250 kcal", bold: true },
      { label: "کربوهیدرات", perServing: "215 g" },
      { label: "پروتئین", perServing: "50 g" },
    ],
    rating: 4.5,
    reviewCount: 348,
    featured: true,
    batchCode: "AN-CM-2026-45",
  },
  {
    slug: "optimum-nutrition-carb-powder",
    name: "کربوهیدرات پیچیده پودری",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "carbs",
    subcategory: "افزایش وزن و حجم",
    summary: "کربوهیدرات با زنجیره‌های متفاوت برای انرژی پایدار.",
    description:
      "مکمل کربوهیدرات با ترکیب مالتودکسترین و واکسی مایز برای تامین سریع و پایدار انرژی در تمرینات استقامتی و سنگین.",
    imageId: "photo-1546069901-ba9599a7e63c",
    imageAlt: "healthy carbohydrate food bowl",
    tags: ["کربوهیدرات", "انرژی"],
    variants: [
      { id: "carb-2kg", label: "۲ کیلوگرم پودر", priceInAED: 58, inStock: true },
    ],
    facts: [
      { label: "کربوهیدرات", perServing: "25 g", bold: true },
      { label: "کالری", perServing: "100 kcal" },
    ],
    rating: 4.4,
    reviewCount: 154,
    batchCode: "ON-CARB-2026-3",
  },
  {
    slug: "optimum-nutrition-micronized-creatine",
    name: "کراتین مونوهیدرات میکرونیزه",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "creatine",
    subcategory: "کراتین و هورمون‌ها",
    summary: "کراتین میکرونیزه خالص ۱۰۰٪ برای افزایش قدرت و حجم.",
    description:
      "کراتین مونوهیدرات میکرونیزه ON با ذرات ریزتر برای حل‌شدن بهتر. هر سروینگ ۳ گرم کراتین خالص و بدون هیچ افزودنی.",
    imageId: "photo-1512621776951-a57141f2eefd",
    imageAlt: "healthy protein rich food",
    tags: ["کراتین"],
    variants: [
      { id: "cr-317", label: "۳۱۷ گرم — ۱۰۵ سروینگ", priceInAED: 32, inStock: true },
      { id: "cr-635", label: "۶۳۵ گرم — ۲۱۰ سروینگ", priceInAED: 52, oldPriceInAED: 60, inStock: true },
    ],
    facts: [
      { label: "کراتین مونوهیدرات", perServing: "3 g", bold: true },
      { label: "کالری", perServing: "0 kcal" },
    ],
    rating: 4.9,
    reviewCount: 934,
    featured: true,
    bestSeller: true,
    batchCode: "ON-CRE-2026-112",
  },
  {
    slug: "usn-creatine-blend",
    name: "کراتین ترکیبی X-TREND",
    brand: "USN",
    category: "مکمل‌های ورزشی",
    categorySlug: "creatine-blend",
    subcategory: "کراتین و هورمون‌ها",
    summary: "ترکیب انواع کراتین برای حداکثر جذب و قدرت.",
    description:
      "X-TREND ترکیبی از کراتین مونوهیدرات، هیدروکلراید و اتیل استر برای بهبود جذب، کاهش نفخ و افزایش قدرت.",
    imageId: "photo-1498837167922-ddd27525d352",
    imageAlt: "fresh vegetables and healthy food",
    tags: ["کراتین"],
    variants: [
      { id: "xt-600", label: "۶۰۰ گرم — ۱۲۰ سروینگ", priceInAED: 62, oldPriceInAED: 70, inStock: true },
    ],
    facts: [
      { label: "کراتین ترکیبی", perServing: "3 g", bold: true },
      { label: "کالری", perServing: "5 kcal" },
    ],
    rating: 4.6,
    reviewCount: 287,
    isNew: true,
    batchCode: "USN-XT-2026-22",
  },
  {
    slug: "kevin-levrone-test-booster",
    name: "تست بوستر Kevin Levrone",
    brand: "Kevin Levrone",
    category: "مکمل‌های ورزشی",
    categorySlug: "test-booster",
    subcategory: "پاراهورمون",
    summary: "بوستر طبیعی تستوسترون با ترکیبات گیاهی.",
    description:
      "تست بوستر لوورون با ترکیب تریبولوس، فنوگریک و ویتامین دی به افزایش طبیعی سطح تستوسترون و بهبود عملکرد کمک می‌کند.",
    imageId: "photo-1517838277536-f5f99be501cd",
    imageAlt: "athlete lifting heavy barbell",
    tags: ["تستوسترون"],
    variants: [
      { id: "tb-90", label: "۹۰ کپسول", priceInAED: 48, inStock: true },
    ],
    facts: [
      { label: "تریبولوس", perServing: "750 mg", bold: true },
      { label: "فنوگریک", perServing: "500 mg" },
      { label: "ویتامین دی", perServing: "1000 IU" },
    ],
    rating: 4.2,
    reviewCount: 167,
    batchCode: "KL-TB-2026-7",
  },
  {
    slug: "evogen-tribulus",
    name: "تریبولوس ترستریس",
    brand: "Evogen",
    category: "مکمل‌های ورزشی",
    categorySlug: "tribulus",
    subcategory: "پاراهورمون",
    summary: "عصاره استاندارد تریبولوس برای قدرت و انرژی.",
    description:
      "تریبولوس ترستریس استاندارد شده با ۴۵٪ ساپونین برای افزایش قدرت، انرژی و حمایت از سطح تستوسترون.",
    imageId: "photo-1534438327276-14e5300c3a48",
    imageAlt: "gym dumbbells rack",
    tags: ["تریبولوس"],
    variants: [
      { id: "tri-90", label: "۹۰ کپسول", priceInAED: 35, oldPriceInAED: 42, inStock: true },
    ],
    facts: [
      { label: "تریبولوس", perServing: "1000 mg", bold: true },
      { label: "ساپونین", perServing: "450 mg" },
    ],
    rating: 4.3,
    reviewCount: 129,
    batchCode: "EVG-TRI-2026-15",
  },
  {
    slug: "optimum-nutrition-zma",
    name: "ZMA",
    brand: "Optimum Nutrition",
    category: "مکمل‌های ورزشی",
    categorySlug: "zma",
    subcategory: "پاراهورمون",
    summary: "ترکیب روی، منیزیم و ویتامین ب۶ برای خواب و ریکاوری.",
    description:
      "ZMA با ترکیب روی، منیزیم و ویتامین ب۶ به بهبود کیفیت خواب، افزایش سطح تستوسترون و ریکاوری عمیق کمک می‌کند.",
    imageId: "photo-1598266663439-2056e6900339",
    imageAlt: "zinc and magnesium supplements",
    tags: ["ZMA", "خواب"],
    variants: [
      { id: "zma-90", label: "۹۰ کپسول", priceInAED: 30, inStock: true },
    ],
    facts: [
      { label: "روی", perServing: "30 mg", bold: true },
      { label: "منیزیم", perServing: "450 mg" },
      { label: "ویتامین ب۶", perServing: "10 mg" },
    ],
    rating: 4.6,
    reviewCount: 244,
    batchCode: "ON-ZMA-2026-18",
  },
  {
    slug: "usn-gucafix-fat-burner",
    name: "چربی سوز GucaFix",
    brand: "USN",
    category: "کاهش وزن",
    categorySlug: "weight-loss",
    subcategory: "چربی سوزها",
    summary: "چربی سوز با CLA و L-Carnitine برای کات.",
    description:
      "GucaFix ترکیبی از ال-کارنیتین، CLA و کروم برای کنترل قند خون و افزایش سوخت چربی.",
    imageId: "photo-1517963879433-6ad2b056d712",
    imageAlt: "gym equipment for weight loss training",
    tags: ["چربی سوز"],
    variants: [
      { id: "guca-120", label: "۱۲۰ کپسول", priceInAED: 42, inStock: true },
    ],
    facts: [
      { label: "L-Carnitine", perServing: "500 mg", bold: true },
      { label: "CLA", perServing: "1000 mg" },
      { label: "کروم", perServing: "100 mcg" },
    ],
    rating: 4.4,
    reviewCount: 189,
    isNew: true,
    batchCode: "USN-GF-2026-19",
  },
  {
    slug: "nutrex-l-carnitine-3000",
    name: "ال-کارنیتین ۳۰۰۰ مایع",
    brand: "USN",
    category: "کاهش وزن",
    categorySlug: "weight-loss",
    subcategory: "چربی سوزها",
    summary: "ال-کارنیتین مایع با جذب بالا قبل از کاردیو.",
    description:
      "ال-کارنیتین مایع ۳۰۰۰ میلی‌گرمی برای کمک به حمل چربی به میتوکندری و اکسیداسیون چربی در طول تمرین.",
    imageId: "photo-1476480862126-209bfaa8edc8",
    imageAlt: "runner doing cardio workout",
    tags: ["کاهش وزن"],
    variants: [
      { id: "car-3000", label: "۳۰ آمپول", priceInAED: 35, inStock: true },
    ],
    facts: [
      { label: "L-Carnitine", perServing: "3000 mg", bold: true },
      { label: "کالری", perServing: "10 kcal" },
    ],
    rating: 4.5,
    reviewCount: 154,
    isNew: true,
    batchCode: "USN-LC-2026-8",
  },
  {
    slug: "optimum-nutrition-fish-oil",
    name: "امگا ۳ ماهی",
    brand: "Optimum Nutrition",
    category: "مکمل‌های عمومی",
    categorySlug: "general-health",
    subcategory: "قلب و امگا ۳",
    summary: "اسیدهای چرب امگا ۳ برای سلامت قلب و مفاصل.",
    description:
      "امگا ۳ خالص با EPA و DHA بالا برای سلامت قلب، مغز و مفاصل. هر کپسول ژلاتینی کوچک و آسان برای بلع.",
    imageId: "photo-1490645935967-10de6ba17061",
    imageAlt: "healthy omega 3 rich meal",
    tags: ["عمومی", "امگا ۳"],
    variants: [
      { id: "fo-100", label: "۱۰۰ کپسول", priceInAED: 28, inStock: true },
      { id: "fo-200", label: "۲۰۰ کپسول", priceInAED: 48, oldPriceInAED: 55, inStock: true },
    ],
    facts: [
      { label: "EPA", perServing: "350 mg", bold: true },
      { label: "DHA", perServing: "250 mg" },
      { label: "کل امگا ۳", perServing: "750 mg" },
    ],
    rating: 4.7,
    reviewCount: 276,
    batchCode: "ON-FO-2026-203",
  },
  {
    slug: "bpi-sports-blender-shaker",
    name: "شیکر BPI Sports 700ml",
    brand: "BPI Sports",
    category: "تجهیزات ورزشی",
    categorySlug: "sports-gear",
    subcategory: "شیکر و قمقمه",
    summary: "شیکر بدون BPA با توپ همزن استیل.",
    description:
      "شیکر ۷۰۰ میلی‌لیتری BPI با بدنه بدون BPA و توپ همزن استیل ضدزنگ برای محلول‌سازی کامل پودرها.",
    imageId: "photo-1526506118085-60ce8714f8c5",
    imageAlt: "athlete holding workout gear",
    tags: ["شیکر"],
    variants: [
      { id: "shk-700", label: "۷۰۰ میلی‌لیتر — مشکی/قرمز", priceInAED: 12, inStock: true },
      { id: "shk-700-w", label: "۷۰۰ میلی‌لیتر — سفید", priceInAED: 12, inStock: false },
    ],
    rating: 4.8,
    reviewCount: 421,
    featured: true,
    batchCode: "BPI-SHK-2026-1",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  const brandSlugByIndex = new Map<string, string>();
  for (const brand of BRANDS) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
    brandSlugByIndex.set(brand.name, brand.slug);
  }
  console.log(`✔ Seeded ${BRANDS.length} brands`);

  const gridHrefs = new Set(GRID_CATEGORIES.map((c) => `/category/${c.slug}`));
  let categoryCount = 0;
  for (const category of GRID_CATEGORIES) {
    const href = `/category/${category.slug}`;
    await prisma.category.upsert({
      where: { href },
      update: { title: category.title, slug: category.slug, image: category.image },
      create: {
        title: category.title,
        slug: category.slug,
        image: category.image,
        href,
      },
    });
    categoryCount += 1;
  }
  for (const [slug, title] of Object.entries(MEGA_SLUG_TITLES)) {
    const href = `/category/${slug}`;
    if (gridHrefs.has(href)) continue;
    await prisma.category.upsert({
      where: { href },
      update: { title, slug },
      create: { title, slug, href, image: null },
    });
    categoryCount += 1;
  }
  console.log(`✔ Seeded ${categoryCount} categories`);

  const brands = await prisma.brand.findMany();
  const brandIdByName = new Map(brands.map((b) => [b.name, b.id]));
  const categories = await prisma.category.findMany();
  const categoryIdByHref = new Map(categories.map((c) => [c.href, c.id]));

  let productCount = 0;
  for (const product of PRODUCTS) {
    const brandId = brandIdByName.get(product.brand) ?? null;
    const categoryId = categoryIdByHref.get(`/category/${product.categorySlug}`) ?? null;

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        brand: product.brand,
        category: product.category,
        categorySlug: product.categorySlug,
        subcategory: product.subcategory,
        summary: product.summary,
        description: product.description,
        images: [{ url: u(product.imageId), alt: product.imageAlt }],
        tags: product.tags,
        variants: product.variants,
        facts: product.facts ?? [],
        rating: product.rating,
        reviewCount: product.reviewCount,
        featured: product.featured ?? false,
        bestSeller: product.bestSeller ?? false,
        isNew: product.isNew ?? false,
        hasUnboxingVideo: product.hasUnboxingVideo ?? false,
        unboxingVideoUrl: product.unboxingVideoUrl ?? null,
        batchCode: product.batchCode ?? null,
        brandId,
        categoryId,
      },
      create: {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        category: product.category,
        categorySlug: product.categorySlug,
        subcategory: product.subcategory,
        summary: product.summary,
        description: product.description,
        images: [{ url: u(product.imageId), alt: product.imageAlt }],
        tags: product.tags,
        variants: product.variants,
        facts: product.facts ?? [],
        rating: product.rating,
        reviewCount: product.reviewCount,
        featured: product.featured ?? false,
        bestSeller: product.bestSeller ?? false,
        isNew: product.isNew ?? false,
        hasUnboxingVideo: product.hasUnboxingVideo ?? false,
        unboxingVideoUrl: product.unboxingVideoUrl ?? null,
        batchCode: product.batchCode ?? null,
        brandId,
        categoryId,
      },
    });
    productCount += 1;
  }
  console.log(`✔ Seeded ${productCount} products`);
}

main()
  .then(async () => {
    console.log("✅ Seed completed successfully.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });