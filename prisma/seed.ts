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
];

const CATEGORIES = [
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
    image: "/images/categories/shaker.png",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  let brandCount = 0;
  for (const brand of BRANDS) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
    brandCount += 1;
  }
  console.log(`✔ Seeded ${brandCount} brands`);

  let categoryCount = 0;
  for (const category of CATEGORIES) {
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
  console.log(`✔ Seeded ${categoryCount} categories`);
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
