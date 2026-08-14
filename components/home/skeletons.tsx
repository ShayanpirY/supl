export function SectionHeaderSkeleton() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
    </div>
  );
}

export function ProductSectionSkeleton() {
  return (
    <section className="bg-white py-10">
      <SectionHeaderSkeleton />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-[calc((100%-1rem)/2)] shrink-0 sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)] xl:w-[calc((100%-4rem)/5)]"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="aspect-square w-full animate-pulse bg-gray-200" />
              <div className="space-y-2 p-3">
                <div className="h-3 w-16 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="flex items-center justify-between pt-2">
                  <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FlashSaleSkeleton() {
  return (
    <section className="rounded-2xl bg-red-600 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="w-full space-y-3 text-center md:w-72 md:text-right">
          <div className="mx-auto h-4 w-24 animate-pulse rounded-full bg-white/30 md:mx-0" />
          <div className="mx-auto h-8 w-40 animate-pulse rounded-lg bg-white/30 md:mx-0" />
          <div className="mx-auto h-4 w-52 animate-pulse rounded bg-white/30 md:mx-0" />
          <div className="flex justify-center gap-2 pt-2 md:justify-start">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-12 w-12 animate-pulse rounded-xl bg-white/30" />
            ))}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex gap-4 overflow-hidden">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-1/2 shrink-0 md:w-1/3">
                <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
                  <div className="aspect-square w-full animate-pulse bg-gray-200" />
                  <div className="space-y-2 p-3">
                    <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CategoryGridSkeleton() {
  return (
    <section className="w-full bg-white py-12">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex min-h-[200px] flex-col items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 pt-6"
          >
            <div className="flex flex-1 items-center justify-center py-2">
              <div className="h-20 w-20 animate-pulse rounded-2xl bg-gray-200" />
            </div>
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function TopBrandsSkeleton() {
  return (
    <section className="bg-white py-10">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
