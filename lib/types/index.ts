export interface ExchangeRate {
  /** AED to IRR (Toman) rate. e.g. 52,500 means 1 AED = 52,500 Toman */
  aedToToman: number;
  /** ISO currency code */
  currencyCode: string;
  /** Last time the rate was refreshed */
  updatedAt: string;
  /** Live source label shown in the UI */
  source: string;
  /** How often to re-fetch (ms) */
  refreshInterval: number;
}

export interface ProductVariant {
  id: string;
  /** e.g. Chocolate / 900g / 30 servings */
  label: string;
  /** Base price of this variant in AED */
  priceInAED: number;
  /** Optional old price in AED for showing discounts */
  oldPriceInAED?: number;
  inStock: boolean;
}

export interface SupplementFactsRow {
  label: string;
  perServing?: string;
  dailyValue?: string;
  bold?: boolean;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  summary: string;
  description: string;
  images: ProductImage[];
  /** Featured flag for the home page */
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  hasUnboxingVideo?: boolean;
  unboxingVideoUrl?: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  defaultVariantId: string;
  variants: ProductVariant[];
  facts?: SupplementFactsRow[];
  batchCode?: string;
}

export interface CategoryChild {
  name: string;
  href: string;
  products: string[];
}

export interface NavCategory {
  title: string;
  titleEn: string;
  href: string;
  icon?: string;
  children: CategoryChild[];
}

export interface Brand {
  name: string;
  slug: string;
  tagline: string;
  logoColor: string;
}

export interface CartItem {
  product: Product;
  variantId: string;
  quantity: number;
}
