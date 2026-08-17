import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-full max-w-md">
        <div className="mb-4 text-8xl font-black text-red-600">۴۰۴</div>
        <h1 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
          صفحه مورد نظر پیدا نشد
        </h1>
        <p className="mb-8 leading-relaxed text-gray-600">
          متأسفانه صفحه‌ای که دنبالش بودید وجود ندارد یا منتقل شده است.
          می‌توانید به صفحه اصلی برگردید یا از منوی بالا استفاده کنید.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
          >
            بازگشت به خانه
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            مشاهده محصولات
          </Link>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="mb-3 text-sm text-gray-500">لینک‌های مفید:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/products" className="text-red-600 hover:underline">
              همه محصولات
            </Link>
            <Link href="/brands" className="text-red-600 hover:underline">
              برندها
            </Link>
            <Link
              href="/category/sports-supplements"
              className="text-red-600 hover:underline"
            >
              مکمل‌های ورزشی
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}