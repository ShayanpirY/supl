import { NavCategory, Brand } from "../types";

export const NAV_CATEGORIES: NavCategory[] = [
  {
    title: "مکمل‌های ورزشی",
    titleEn: "Sports Supplements",
    href: "/category/sports-supplements",
    icon: "dumbbell",
    children: [
      {
        name: "مکمل‌های عضله و حجم (Whey)",
        href: "/category/sports-supplements/whey",
        products: ["Whey Protein", "Whey Isolate", "Whey Hydrolyzed", "Casein", "Beef Protein"],
      },
      {
        name: "آمینو اسیدها",
        href: "/category/sports-supplements/amino",
        products: ["Amino", "EAA", "Amino Whey", "BCAA", "HMB"],
      },
      {
        name: "قبل از تمرین (Pre-Workout)",
        href: "/category/sports-supplements/pre-workout",
        products: ["Pump", "Arginine", "Beta-Alanine", "Citrulline"],
      },
      {
        name: "ریکاوری و افزایش وزن",
        href: "/category/sports-supplements/recovery",
        products: ["Glutamine", "Gainers", "Carbohydrates"],
      },
      {
        name: "کراتین و هورمون‌ها",
        href: "/category/sports-supplements/creatine",
        products: ["Creatine Monohydrate", "Mixed Creatine", "Test Boosters", "Tribulus", "ZMA"],
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
        products: ["Multivitamins", "Minerals", "B-Complex", "Vitamin D3", "Vitamin C"],
      },
      {
        name: "پوست، مو و ناخن",
        href: "/category/general-health/beauty",
        products: ["Collagen", "Biotin", "Keratin", "Skin Hair Nails"],
      },
      {
        name: "مفاصل و استخوان",
        href: "/category/general-health/joints",
        products: ["Joint Support", "Glucosamine", "Chondroitin", "MSM", "Collagen Type II"],
      },
      {
        name: "قلب و امگا ۳",
        href: "/category/general-health/omega",
        products: ["Omega-3", "Fish Oil", "Krill Oil", "CoQ10"],
      },
      {
        name: "سیستم ایمنی",
        href: "/category/general-health/immunity",
        products: ["Immunity Support", "Zinc", "Propolis", "Elderberry", "Echinacea"],
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
        products: ["Fat Burners", "Thermogenic", "CLA", "L-Carnitine", "Green Coffee"],
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
        products: ["Shakers", "Blender Bottle", "Water Bottles"],
      },
      {
        name: "کفش و پوشاک",
        href: "/category/sports-gear/shoes",
        products: ["Gym Shoes", "Activewear", "Training Gloves", "Lifting Belt"],
      },
      {
        name: "لوازم جانبی",
        href: "/category/sports-gear/accessories",
        products: ["Lifting Straps", "Wrist Wraps", "Foam Rollers", "Jump Ropes"],
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
        products: ["Optimum Nutrition", "MuscleTech", "Evogen", "Kevin Levrone", "Applied Nutrition"],
      },
      {
        name: "برندهای تخصصی",
        href: "/brands",
        products: ["USN", "BSN", "Dymatize", "Nutrex", "Grenade"],
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
