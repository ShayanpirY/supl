"use client";

import { useMemo, useState } from "react";
import {
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  CreditCard,
  Minus,
  Plus,
  BadgeCheck,
  Check,
  Flame,
  PackageCheck,
  FileText,
  Table2,
  MessagesSquare,
  Send,
  CircleCheck,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { useCurrency } from "@/hooks/useCurrency";
import { formatToman } from "@/lib/currency";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import ProductGallery from "@/components/product/ProductGallery";

const FLAVOR_KEYWORDS = [
  "کره بادام‌زمینی",
  "توت‌فرنگی",
  "بلوبری",
  "شکلات",
  "وانیل",
  "کوکی",
  "فاج",
  "موز",
  "پرتقال",
  "لیمو",
  "کولا",
  "کارامل",
  "پسته",
  "دارچین",
  "قهوه",
  "کره",
];

const WEIGHT_UNIT_RE = /گرم|کیلوگرم|میلی‌لیتر|لیتر|پوند|قرص|کپسول|عدد|سروینگ/;

function getFlavor(label: string): string | null {
  const hit = FLAVOR_KEYWORDS.find((keyword) => label.includes(keyword));
  return hit ?? null;
}

function getWeight(label: string): string {
  const segments = label
    .split("—")
    .map((segment) => segment.trim())
    .filter(Boolean);
  return segments.find((segment) => WEIGHT_UNIT_RE.test(segment)) ?? segments[0] ?? label;
}

type TabId = "description" | "nutrition" | "reviews";

const TABS: Array<{ id: TabId; label: string; icon: typeof FileText }> = [
  { id: "description", label: "توضیحات محصول", icon: FileText },
  { id: "nutrition", label: "جدول ارزش غذایی", icon: Table2 },
  { id: "reviews", label: "نظرات", icon: MessagesSquare },
];

export default function ProductInteractiveUI({ product }: { product: Product }) {
  const { toToman } = useCurrency();
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);

  const defaultVariant =
    product.variants.find((v) => v.id === product.defaultVariantId) ??
    product.variants[0];

  const flavors = useMemo(() => {
    const set = new Set<string>();
    for (const variant of product.variants) {
      const flavor = getFlavor(variant.label);
      if (flavor) set.add(flavor);
    }
    return Array.from(set);
  }, [product]);

  const weights = useMemo(() => {
    const set = new Set<string>();
    for (const variant of product.variants) set.add(getWeight(variant.label));
    return Array.from(set);
  }, [product]);

  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(() => {
    const initial = getFlavor(defaultVariant?.label ?? "");
    return flavors.includes(initial!) ? initial : (flavors[0] ?? null);
  });
  const [selectedWeight, setSelectedWeight] = useState<string>(() =>
    getWeight(defaultVariant?.label ?? ""),
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const variant = useMemo(() => {
    const byWeight = (w: string) => product.variants.filter((v) => getWeight(v.label) === w);
    const byFlavor = (f: string | null) =>
      f ? product.variants.filter((v) => getFlavor(v.label) === f) : product.variants;

    const candidates = byFlavor(selectedFlavor).filter((v) => byWeight(selectedWeight).includes(v));
    return (
      candidates.find((v) => v.inStock) ??
      candidates[0] ??
      byWeight(selectedWeight).find((v) => v.inStock) ??
      byWeight(selectedWeight)[0] ??
      product.variants.find((v) => v.inStock) ??
      product.variants[0]
    );
  }, [product, selectedFlavor, selectedWeight]);

  const inStock = variant?.inStock ?? false;
  const price = toToman(variant?.priceInAED ?? 0);
  const oldPrice = variant?.oldPriceInAED ? toToman(variant.oldPriceInAED) : undefined;
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  const weightsForFlavor = (flavor: string | null) =>
    new Set(
      product.variants
        .filter((v) => (flavor ? getFlavor(v.label) === flavor : true))
        .map((v) => getWeight(v.label)),
    );

  const handleFlavorSelect = (flavor: string) => {
    setSelectedFlavor(flavor);
    if (!weightsForFlavor(flavor).has(selectedWeight)) {
      setSelectedWeight(Array.from(weightsForFlavor(flavor))[0] ?? selectedWeight);
    }
  };

  const handleAddToCart = () => {
    if (!variant) return;
    addItem(product, variant.id, quantity);
    setCartOpen(true);
  };

  const priceBlock = (
    <div>
      {oldPrice && (
        <p className="text-sm text-gray-400 line-through" dir="rtl">
          {formatToman(oldPrice)} تومان
        </p>
      )}
      <p className="flex flex-wrap items-baseline gap-1.5">
        <span className={cn("text-3xl font-black", inStock ? "text-red-600" : "text-gray-400")}>
          {formatToman(price)}
        </span>
        <span className="text-sm font-bold text-gray-500">تومان</span>
        {discount > 0 && (
          <span className="rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-black text-white">
            ٪{discount} تخفیف
          </span>
        )}
      </p>
    </div>
  );

  return (
    <div>
      {/* Main grid: images (right in RTL) + info (left) */}
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery product={product} />

        <div className="pb-24 lg:pb-0">
          {/* Brand badge + stock */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-black text-red-700">
              <BadgeCheck className="h-3.5 w-3.5" />
              {product.brand}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
                inStock ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500",
              )}
            >
              <PackageCheck className="h-3.5 w-3.5" />
              {inStock ? "موجود در انبار دبی" : "ناموجود"}
            </span>
            {product.bestSeller && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-2.5 py-1 text-[11px] font-bold text-white">
                <Flame className="h-3 w-3" />
                پرفروش
              </span>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-black leading-9 text-gray-900 sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <b className="text-gray-800">{product.rating}</b>
            </span>
            <span className="text-gray-400">({product.reviewCount} نظر)</span>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-500">{product.category}</span>
          </div>

          <p className="mt-4 text-sm leading-7 text-gray-600">{product.summary}</p>

          {/* Price */}
          <div className="mt-5 rounded-2xl border border-red-600/15 bg-red-50/40 p-4">
            {priceBlock}
          </div>

          {/* Flavor selector */}
          {flavors.length > 1 && (
            <div className="mt-5">
              <label className="text-xs font-extrabold text-gray-600">طعم</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {flavors.map((flavor) => (
                  <button
                    key={flavor}
                    type="button"
                    onClick={() => handleFlavorSelect(flavor)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all duration-200",
                      selectedFlavor === flavor
                        ? "border-red-600 bg-red-600 text-white shadow-md shadow-red-600/20"
                        : "border-gray-200 bg-white text-gray-700 hover:border-red-600/50 hover:text-red-600",
                    )}
                  >
                    {selectedFlavor === flavor && <Check className="h-3.5 w-3.5" />}
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Weight selector */}
          {weights.length > 1 && (
            <div className="mt-5">
              <label className="text-xs font-extrabold text-gray-600">وزن / اندازه</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {weights.map((weight) => {
                  const available = Array.from(weightsForFlavor(selectedFlavor)).includes(weight);
                  return (
                    <button
                      key={weight}
                      type="button"
                      onClick={() => available && setSelectedWeight(weight)}
                      disabled={!available}
                      className={cn(
                        "rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all duration-200",
                        selectedWeight === weight
                          ? "border-red-600 bg-red-50 text-red-700 shadow-sm"
                          : "border-gray-200 bg-white text-gray-700 hover:border-red-600/50",
                        !available && "cursor-not-allowed opacity-40",
                      )}
                    >
                      {weight}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-5">
            <label className="text-xs font-extrabold text-gray-600">تعداد</label>
            <div className="mt-2 inline-flex items-center overflow-hidden rounded-xl border-2 border-gray-200 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                disabled={!inStock || quantity >= 10}
                className="flex h-11 w-11 items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="افزایش تعداد"
              >
                <Plus className="h-4 w-4" />
              </button>
              <span className="flex h-11 w-14 items-center justify-center border-x-2 border-gray-200 text-sm font-black text-gray-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={!inStock || quantity <= 1}
                className="flex h-11 w-11 items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="کاهش تعداد"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="mt-6 hidden lg:block">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock}
              className="btn-primary w-full py-4 text-base"
            >
              <ShoppingCart className="h-5 w-5" />
              افزودن به سبد خرید
            </button>
          </div>

          {/* Trust row */}
          <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldCheck className="h-6 w-6 text-red-600" />
              <span className="text-[11px] font-bold text-gray-600">ضمانت اصالت کالا</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Truck className="h-6 w-6 text-red-600" />
              <span className="text-[11px] font-bold text-gray-600">ارسال ۲ تا ۴ روز کاری</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <CreditCard className="h-6 w-6 text-red-600" />
              <span className="text-[11px] font-bold text-gray-600">پرداخت امن</span>
            </div>
          </div>

          {/* Sticky mobile CTA */}
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
            <div className="mx-auto flex w-full max-w-7xl items-center gap-4">
              <div className="min-w-0 shrink-0">
                {oldPrice && (
                  <p className="text-[11px] text-gray-400 line-through">
                    {formatToman(oldPrice)} تومان
                  </p>
                )}
                <p className="flex items-baseline gap-1">
                  <span className={cn("text-lg font-black", inStock ? "text-red-600" : "text-gray-400")}>
                    {formatToman(price)}
                  </span>
                  <span className="text-[11px] font-bold text-gray-500">تومان</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className="btn-primary flex-1 py-3.5 text-sm"
              >
                <ShoppingCart className="h-5 w-5" />
                {inStock ? "افزودن به سبد خرید" : "ناموجود"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: description / nutrition / reviews */}
      <section className="mt-10">
        <div className="flex gap-1 overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-extrabold transition-all duration-200",
                activeTab === tab.id
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "text-gray-600 hover:bg-gray-50 hover:text-red-600",
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Description */}
        {activeTab === "description" && (
          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm leading-8 text-gray-600">{product.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-red-600/20 bg-red-50 px-3 py-1 text-[11px] font-bold text-red-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition facts */}
        {activeTab === "nutrition" && (
          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            {product.facts && product.facts.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-red-600/20 text-gray-500">
                    <th className="py-2 text-right font-bold">ترکیب</th>
                    <th className="py-2 text-left font-bold">به ازای هر سروینگ</th>
                  </tr>
                </thead>
                <tbody>
                  {product.facts.map((row) => (
                    <tr key={row.label} className="border-b border-gray-50 last:border-0">
                      <td
                        className={cn(
                          "py-2.5 text-right",
                          row.bold ? "font-extrabold text-gray-900" : "text-gray-600",
                        )}
                      >
                        {row.label}
                      </td>
                      <td
                        className={cn(
                          "py-2.5 text-left",
                          row.bold ? "font-extrabold text-red-600" : "font-bold text-gray-600",
                        )}
                      >
                        {row.perServing ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <Table2 className="h-4 w-4 text-red-600" />
                جدول مشخصات تغذیه‌ای این محصول به‌زودی تکمیل می‌شود.
              </p>
            )}
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center sm:flex-row sm:justify-center sm:gap-8 sm:text-right">
              <div className="flex items-center gap-3">
                <span className="text-5xl font-black text-gray-900">{product.rating}</span>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i <= Math.round(product.rating)
                            ? "fill-amber-500 text-amber-500"
                            : "text-gray-300",
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs font-bold text-gray-500">
                    بر اساس {product.reviewCount} نظر ثبت‌شده
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-gray-600">
              <MessagesSquare className="h-4 w-4 shrink-0 text-amber-600" />
              هنوز نظری ثبت نشده است؛ اولین نفری باشید که تجربه خود را با دیگران
              به اشتراک می‌گذارد.
            </div>

            {reviewSubmitted ? (
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700">
                <CircleCheck className="h-5 w-5" />
                نظر شما با موفقیت ثبت شد و پس از بررسی نمایش داده می‌شود.
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setReviewSubmitted(true);
                }}
              >
                <div>
                  <label className="text-xs font-extrabold text-gray-600">نام شما</label>
                  <input
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="مثلا: علی رضایی"
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-gray-600">
                    تجربه شما از این محصول
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="کیفیت محصول، اصالت کالا، سرعت ارسال..."
                    className="mt-1.5 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-red-600"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-3.5">
                  <Send className="h-4 w-4" />
                  ثبت نظر
                </button>
                <p className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                  نظرات فقط پس از تایید خرید نمایش داده می‌شوند.
                </p>
              </form>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
