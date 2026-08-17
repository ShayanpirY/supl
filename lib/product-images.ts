/**
 * مدیریت تصاویر محصولات
 * - اگر تصویر واقعی وجود داشت → همان را نشان می‌دهد
 * - اگر نداشت → یک placeholder تمیز و حرفه‌ای (نه باکس قرمز خالی)
 */

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Cpath fill='%23d1d5db' d='M160 140h80a20 20 0 0120 20v20h20a20 20 0 0120 20v80a20 20 0 01-20 20H140a20 20 0 01-20-20v-80a20 20 0 0120-20h20v-20a20 20 0 0120-20z'/%3E%3Ccircle fill='%23d1d5db' cx='200' cy='230' r='28'/%3E%3C/svg%3E";

export type ProductImage = {
  url: string;
  alt?: string;
};

/**
 * بهترین تصویر موجود محصول را برمی‌گرداند
 */
export function getProductImage(
  images?: ProductImage[] | string[] | null,
  fallback?: string,
): string {
  if (!images || images.length === 0) {
    return fallback || PLACEHOLDER;
  }

  const first = images[0];

  if (typeof first === "string") {
    return first.trim() || PLACEHOLDER;
  }

  if (first && typeof first === "object" && "url" in first) {
    const url = (first as ProductImage).url?.trim();
    return url || PLACEHOLDER;
  }

  return PLACEHOLDER;
}

/**
 * تمام تصاویر معتبر را برای گالری برمی‌گرداند
 */
export function getProductImages(
  images?: ProductImage[] | string[] | null,
): ProductImage[] {
  if (!images || images.length === 0) {
    return [{ url: PLACEHOLDER, alt: "بدون تصویر" }];
  }

  return images
    .map((img) => {
      if (typeof img === "string") {
        return { url: img.trim() || PLACEHOLDER, alt: "" };
      }
      return {
        url: img.url?.trim() || PLACEHOLDER,
        alt: img.alt || "",
      };
    })
    .filter((img) => img.url);
}