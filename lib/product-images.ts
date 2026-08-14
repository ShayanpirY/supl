export const PRODUCT_IMAGE_PLACEHOLDER = "/images/placeholder-supplement.png";

export interface ProductImageRef {
  url: string;
  alt?: string;
}

export function getProductImage(images?: ProductImageRef[] | null): string {
  return images?.[0]?.url || PRODUCT_IMAGE_PLACEHOLDER;
}

export function resolveProductImageUrl(url?: string | null): string {
  return url && url.trim() ? url : PRODUCT_IMAGE_PLACEHOLDER;
}
