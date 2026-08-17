"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv2, setCvv2] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handlePay = () => {
    if (!cardNumber || !cvv2 || !expMonth || !expYear) return;
    setIsProcessing(true);
    setTimeout(() => {
      router.push("/checkout/success");
    }, 1800);
  };

  const handleCancel = () => {
    router.push("/checkout");
  };

  const isFormValid =
    cardNumber.replace(/\s/g, "").length === 16 &&
    cvv2.length >= 3 &&
    expMonth.length === 2 &&
    expYear.length === 2;

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Gateway Header */}
      <div className="bg-gradient-to-b from-slate-700 to-slate-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-white">درگاه پرداخت زرین‌پال</p>
              <p className="text-xs text-slate-300">پرداخت امن اینترنتی</p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1">
            <Lock className="h-3.5 w-3.5 text-green-300" />
            <span className="text-xs font-bold text-green-200">SSL</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-lg">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-xl">
            <div className="border-b border-gray-100 px-5 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-gray-900">پرداخت کارت به کارت</h2>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 text-sm font-bold text-gray-500 transition-colors hover:text-red-600"
                >
                  <ArrowLeft className="h-4 w-4" />
                  بازگشت
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                لطفا اطلاعات کارت بانکی خود را وارد کنید.
              </p>
            </div>

            <div className="space-y-4 px-5 py-6">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-gray-700">
                  شماره کارت
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="۶۰۳۷ ۹۹۹۹ ۹۹۹۹ ۹۹۹۹"
                  value={cardNumber}
                  onChange={handleCardChange}
                  maxLength={19}
                  className="text-left tracking-widest"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-700">
                    انقضا (ماه/سال)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM"
                      value={expMonth}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                        setExpMonth(val);
                      }}
                      maxLength={2}
                      dir="ltr"
                    />
                    <span className="flex items-center text-gray-400">/</span>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="YY"
                      value={expYear}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                        setExpYear(val);
                      }}
                      maxLength={2}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-700">
                    CVV2
                  </label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="۰۰۰۰"
                    value={cvv2}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setCvv2(val);
                    }}
                    maxLength={4}
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-gray-700">
                  رمز پویا (OTP)
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="کد ارسال شده به موبایل"
                    dir="ltr"
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" className="shrink-0">
                    ارسال رمز
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  انصراف
                </Button>
                <Button
                  type="button"
                  onClick={handlePay}
                  disabled={!isFormValid || isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? "در حال پردازش..." : "پرداخت"}
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">
            پردازش تراکنش توسط سیستم امن زرین‌پال انجام می‌شود.
          </p>
        </div>
      </div>

      {/* Processing overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8 shadow-2xl">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />
            <p className="text-sm font-bold text-gray-700">در حال پردازش پرداخت...</p>
          </div>
        </div>
      )}
    </div>
  );
}
