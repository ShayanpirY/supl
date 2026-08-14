"use client";

import { useEffect, useState } from "react";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function toFa(value: string): string {
  return value.replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);
}

export default function FlashSaleCountdown({ hours = 12 }: { hours?: number }) {
  const [end, setEnd] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    setEnd(Date.now() + hours * 60 * 60 * 1000);
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [hours]);

  const remaining = end ? Math.max(0, end - now) : 0;
  const h = Math.floor(remaining / 3_600_000);
  const m = Math.floor((remaining % 3_600_000) / 60_000);
  const s = Math.floor((remaining % 60_000) / 1000);

  const boxes = [
    { label: "ساعت", value: toFa(pad(h)) },
    { label: "دقیقه", value: toFa(pad(m)) },
    { label: "ثانیه", value: toFa(pad(s)) },
  ];

  return (
    <div className="mt-5 flex items-center justify-center gap-2 md:justify-start" dir="ltr">
      {boxes.map((box, index) => (
        <div key={box.label} className="flex items-center gap-2">
          {index > 0 && <span className="text-lg font-black text-white/80">:</span>}
          <div className="flex flex-col items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-lg font-black text-red-600 shadow-md">
              {box.value}
            </span>
            <span className="mt-1 text-[10px] font-bold text-white/85">
              {box.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
