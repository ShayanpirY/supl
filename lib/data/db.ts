import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NAV_CATEGORIES, BRANDS } from "@/lib/data/categories";
import { PRODUCTS } from "@/lib/data/products";
import type { ProductFilters } from "@/lib/product-filters";
import type {
  NavCategory,
  Brand,
  Product,
  ProductVariant,
  ProductImage,
  SupplementFactsRow,
} from "@/lib/types";

export interface GridCategory {
  name: string;
  href: string;
  image: string | null;
}

const FALLBACK_GRID_CATEGORIES: GridCategory[] = [
  {
    name: "پروتئین وی",
    href: "/category/sports-supplements/whey",
    image: "/images/categories/whey.png",
  },
  {
    name: "کراتین",
    href: "/category/sports-supplements/creatine",
    image: "/images/categories/creatine.png",
  },
  {
    name: "گینر",
    href: "/category/sports-supplements/gainers",
    image: "/images/categories/gainer.png",
  },
  {
    name: "آمینو اسید",
    href: "/category/sports-supplements/amino",
    image: "/images/categories/amino.png",
  },
  {
    name: "چربی‌سوز",
    href: "/category/weight-loss/fat-burners",
    image: "/images/categories/fat-burner.png",
  },
  {
    name: "شیکر",
    href: "/category/sports-gear/shakers",
    image: null,
  },
];

function mapToNavCategory(cat: {
  id: string;
  title: string;
  titleEn: string | null;
  href: string;
  icon: string | null;
  children: { id: string; title: string; href: string }[];
}): NavCategory {
  return {
    title: cat.title,
    titleEn: cat.titleEn ?? "",
    href: cat.href,
    icon: cat.icon ?? undefined,
    children: cat.children.map((child) => ({
      name: child.title,
      href: child.href,
      products: [],
    })),
  };
}

function mapToBrand(brand: {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  logoColor: string | null;
}): Brand {
  return {
    name: brand.name,
    slug: brand.slug,
    tagline: brand.tagline ?? "",
    logoColor: brand.logoColor ?? "#111111",
  };
}

export async function getGridCategories(): Promise<GridCategory[]> {
  try {
    const dbCategories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    });
    if (dbCategories.length === 0) return FALLBACK_GRID_CATEGORIES;
    return dbCategories.map((cat) => ({
      name: cat.title,
      href: cat.href,
      image: cat.image ?? null,
    }));
  } catch (error) {
    console.error("[db] getGridCategories failed, using fallback data:", error);
    return FALLBACK_GRID_CATEGORIES;
  }
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const dbBrands = await prisma.brand.findMany({
      orderBy: { name: "asc" },
    });
    if (dbBrands.length === 0) return BRANDS;
    return dbBrands.map(mapToBrand);
  } catch (error) {
    console.error("[db] getBrands failed, using fallback data:", error);
    return BRANDS;
  }
}

export async function getMegaMenuData(): Promise<{
  categories: NavCategory[];
  brands: Brand[];
}> {
  try {
    const [dbCategories, dbBrands] = await Promise.all([
      prisma.category.findMany({
        orderBy: { createdAt: "asc" },
        include: { children: true },
      }),
      prisma.brand.findMany({ orderBy: { name: "asc" } }),
    ]);

    if (dbCategories.length === 0 && dbBrands.length === 0) {
      return { categories: NAV_CATEGORIES, brands: BRANDS };
    }

    return {
      categories:
        dbCategories.length > 0
          ? dbCategories.map(mapToNavCategory)
          : NAV_CATEGORIES,
      brands: dbBrands.length > 0 ? dbBrands.map(mapToBrand) : BRANDS,
    };
  } catch (error) {
    console.error("[db] getMegaMenuData failed, using fallback data:", error);
    return { categories: NAV_CATEGORIES, brands: BRANDS };
  }
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export interface ProductFacets {
  categories: { slug: string; name: string; count: number }[];
  brands: { name: string; count: number }[];
  minPrice: number;
  maxPrice: number;
}

const BRAND_SLUG_TO_NAME: Record<string, string> = {};
for (const brand of BRANDS) BRAND_SLUG_TO_NAME[brand.slug] = brand.name;

const KNOWN_CATEGORY_SLUGS = new Set<string>();
const CHILD_SLUG_TO_PARENT = new Map<string, string>();
for (const category of NAV_CATEGORIES) {
  const parentSlug = category.href.replace(/^\/category\//, "");
  KNOWN_CATEGORY_SLUGS.add(parentSlug);
  for (const child of category.children) {
    const childSlug = child.href.replace(/^\/category\//, "");
    KNOWN_CATEGORY_SLUGS.add(childSlug);
    CHILD_SLUG_TO_PARENT.set(childSlug, parentSlug);
  }
}

function mapToProduct(product: {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  summary: string | null;
  description: string | null;
  images: Prisma.JsonValue;
  tags: Prisma.JsonValue;
  variants: Prisma.JsonValue;
  facts: Prisma.JsonValue;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestSeller: boolean;
  isNew: boolean;
  hasUnboxingVideo: boolean;
  unboxingVideoUrl: string | null;
  batchCode: string | null;
}): Product {
  const variants = (product.variants as unknown as ProductVariant[]) ?? [];
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    categorySlug: product.categorySlug,
    subcategory: product.subcategory,
    summary: product.summary ?? "",
    description: product.description ?? "",
    images: (product.images as unknown as ProductImage[]) ?? [],
    tags: (product.tags as unknown as string[]) ?? [],
    variants,
    facts: (product.facts as unknown as SupplementFactsRow[]) ?? undefined,
    rating: product.rating,
    reviewCount: product.reviewCount,
    featured: product.featured,
    bestSeller: product.bestSeller,
    isNew: product.isNew,
    hasUnboxingVideo: product.hasUnboxingVideo,
    unboxingVideoUrl: product.unboxingVideoUrl ?? undefined,
    batchCode: product.batchCode ?? undefined,
    defaultVariantId: variants[0]?.id ?? "",
  };
}

export function getProductMinPrice(product: Product): number {
  if (product.variants.length === 0) return 0;
  return Math.min(...product.variants.map((variant) => variant.priceInAED));
}

function matchesCategory(product: Product, categorySlug: string): boolean {
  return (
    product.categorySlug === categorySlug ||
    product.category === categorySlug ||
    product.subcategory === categorySlug
  );
}

function applyFiltersInMemory(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  let result = products;

  if (filters.brands && filters.brands.length > 0) {
    const brandNames = new Set(
      filters.brands.map((slug) => BRAND_SLUG_TO_NAME[slug] ?? slug),
    );
    result = result.filter((product) => brandNames.has(product.brand));
  }

  if (filters.categorySlug) {
    result = result.filter((product) =>
      matchesCategory(product, filters.categorySlug!),
    );
  }

  if (filters.inStockOnly) {
    result = result.filter((product) =>
      product.variants.some((variant) => variant.inStock),
    );
  }

  if (filters.minPrice != null || filters.maxPrice != null) {
    const min = filters.minPrice ?? 0;
    const max = filters.maxPrice ?? Number.POSITIVE_INFINITY;
    result = result.filter((product) => {
      const price = getProductMinPrice(product);
      return price >= min && price <= max;
    });
  }

  switch (filters.sort) {
    case "cheapest":
      result = [...result].sort(
        (a, b) => getProductMinPrice(a) - getProductMinPrice(b),
      );
      break;
    case "mostExpensive":
      result = [...result].sort(
        (a, b) => getProductMinPrice(b) - getProductMinPrice(a),
      );
      break;
    case "bestSelling":
      result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "newest":
    default:
      break;
  }

  return result;
}

async function fetchAllProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbProducts.length > 0) return dbProducts.map(mapToProduct);
    return PRODUCTS;
  } catch (error) {
    console.error("[db] fetchAllProducts failed, using fallback data:", error);
    return PRODUCTS;
  }
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<Product[]> {
  let products: Product[] = [];
  try {
    const where: Prisma.ProductWhereInput = {};
    if (filters.brands && filters.brands.length > 0) {
      const brandNames = filters.brands.map(
        (slug) => BRAND_SLUG_TO_NAME[slug] ?? slug,
      );
      where.brand = { in: brandNames };
    }

    const dbProducts = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    products = dbProducts.length > 0 ? dbProducts.map(mapToProduct) : PRODUCTS;
  } catch (error) {
    console.error("[db] getProducts failed, using fallback data:", error);
    products = PRODUCTS;
  }

  return applyFiltersInMemory(products, filters);
}

export async function getProductFacets(): Promise<ProductFacets> {
  const products = await fetchAllProducts();

  const categoryMap = new Map<string, { slug: string; name: string; count: number }>();
  for (const product of products) {
    const current = categoryMap.get(product.categorySlug);
    if (current) {
      current.count += 1;
    } else {
      categoryMap.set(product.categorySlug, {
        slug: product.categorySlug,
        name: product.category,
        count: 1,
      });
    }
  }

  const brandMap = new Map<string, number>();
  for (const product of products) {
    brandMap.set(product.brand, (brandMap.get(product.brand) ?? 0) + 1);
  }

  const prices = products.map(getProductMinPrice);
  const minPrice = prices.length > 0 ? Math.floor(Math.min(...prices)) : 0;
  const maxPrice = prices.length > 0 ? Math.ceil(Math.max(...prices)) : 100;

  return {
    categories: Array.from(categoryMap.values()).sort((a, b) => b.count - a.count),
    brands: Array.from(brandMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name, "fa")),
    minPrice,
    maxPrice,
  };
}

export function resolveProductRouteSegments(
  segments: string[],
): ProductFilters | null {
  if (!segments || segments.length === 0) return null;

  const filters: ProductFilters = {};
  let recognized = 0;

  for (const segment of segments) {
    if (BRAND_SLUG_TO_NAME[segment]) {
      filters.brands = [...(filters.brands ?? []), segment];
      recognized += 1;
    } else if (KNOWN_CATEGORY_SLUGS.has(segment)) {
      filters.categorySlug = CHILD_SLUG_TO_PARENT.get(segment) ?? segment;
      recognized += 1;
    }
  }

  return recognized > 0 ? filters : null;
}

