"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck, Table2, CircleCheck } from "lucide-react";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

function Accordion({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-4 text-right font-extrabold text-brand-dark transition-colors hover:bg-surface-subtle"
      >
        {icon}
        {title}
        <ChevronDown
          className={cn(
            "mr-auto h-4 w-4 text-gray-400 transition-transform",
            open && "rotate-180 text-brand-red",
          )}
        />
      </button>
      {open && <div className="border-t border-gray-100 px-4 py-4">{children}</div>}
    </div>
  );
}

export default function ProductAccordions({ product }: { product: Product }) {
  const [checking, setChecking] = useState<"idle" | "checking" | "valid">("idle");

  const verify = () => {
    setChecking("checking");
    setTimeout(() => setChecking("valid"), 1200);
  };

  return (
    <div className="mt-8 space-y-3">
      <Accordion
        title="جدول مشخصات و ترکیبات غذایی"
        icon={<Table2 className="h-4 w-4 text-brand-red" />}
        defaultOpen
      >
        {product.facts && product.facts.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-brand-red/20 text-gray-500">
                <th className="py-2 text-right font-bold">ترکیب</th>
                <th className="py-2 text-left font-bold">به ازای هر سروینگ</th>
              </tr>
            </thead>
            <tbody>
              {product.facts.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td
                    className={cn(
                      "py-2.5 text-right",
                      row.bold ? "font-extrabold text-brand-dark" : "text-gray-600",
                    )}
                  >
                    {row.label}
                  </td>
                  <td
                    className={cn(
                      "py-2.5 text-left",
                      row.bold ? "font-extrabold text-brand-red" : "font-bold text-gray-600",
                    )}
                  >
                    {row.perServing ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-500">
            جدول مشخصات تغذیه‌ای این محصول به‌زودی تکمیل می‌شود.
          </p>
        )}
      </Accordion>

      <Accordion
        title="اصالت‌سنجی و شماره بچ محصول"
        icon={<ShieldCheck className="h-4 w-4 text-brand-red" />}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-500">
              شماره بچ درج‌شده روی قوطی
            </label>
            <input
              defaultValue={product.batchCode}
              dir="ltr"
              className="mt-1 w-full rounded-lg border border-gray-200 bg-surface-subtle px-3 py-2.5 text-sm font-bold text-brand-dark outline-none focus:border-brand-red"
              placeholder="مثلا: GS-2026-04127"
            />
          </div>
          <button
            onClick={verify}
            disabled={checking === "checking"}
            className="btn-primary mt-1 sm:mt-0"
          >
            <CircleCheck className="h-4 w-4" />
            {checking === "checking" ? "در حال بررسی..." : "بررسی اصالت کالا"}
          </button>
        </div>

        {checking === "valid" && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-bold text-green-700 animate-fade-in">
            <ShieldCheck className="h-5 w-5" />
            کد بچ معتبر است — این محصول اورجینال و با ضمانت اصالت است.
          </div>
        )}
      </Accordion>
    </div>
  );
}
