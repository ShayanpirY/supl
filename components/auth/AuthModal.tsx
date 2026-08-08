"use client";

import { useState } from "react";
import { X, Smartphone, KeyRound, ArrowLeft, ShieldCheck } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

type Step = "phone" | "otp";

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen } = useUIStore();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  if (!authModalOpen) return null;

  const close = () => {
    setAuthModalOpen(false);
    setTimeout(() => {
      setStep("phone");
      setPhone("");
      setOtp("");
      setError("");
      setSent(false);
    }, 300);
  };

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره موبایل معتبر وارد کنید (مثال: 09123456789)");
      return;
    }
    setError("");
    setSent(true);
    setStep("otp");
  };

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 5) {
      setError("کد تایید ۵ رقمی را وارد کنید");
      return;
    }
    setError("");
    close();
  };

  return (
    <div className="fixed inset-0 z-[70] flex animate-fade-in items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative w-full max-w-md animate-slide-up rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-2xl shadow-black/50 p-8">
        <button
          onClick={close}
          className="absolute left-4 top-4 rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/5 hover:text-[#e50914]"
          aria-label="بستن"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914]">
            {step === "phone" ? (
              <Smartphone className="h-7 w-7" />
            ) : (
              <KeyRound className="h-7 w-7" />
            )}
          </div>
          <h2 className="text-xl font-black text-white">
            {step === "phone" ? "ورود / ثبت‌نام" : "کد تایید"}
          </h2>
          <p className="mt-1.5 text-sm text-zinc-400">
            {step === "phone"
              ? "برای ادامه، شماره موبایل خود را وارد کنید"
              : `کد تایید به شماره ${phone} ارسال شد`}
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-xs font-bold text-zinc-400">
                +98
              </span>
              <input
                type="tel"
                dir="ltr"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="9123456789"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-4 pr-20 text-sm font-bold text-white outline-none transition-colors focus:border-[#e50914] focus:ring-2 focus:ring-[#e50914]/50"
              />
            </div>
            {error && (
              <p className="text-xs font-bold text-[#e50914]">{error}</p>
            )}
            <button type="submit" className="w-full rounded-xl bg-[#e50914] py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#ff1f2c] hover:shadow-[0_0_25px_rgba(229,9,20,0.5)]">
              دریافت کد تایید
            </button>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
              <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
              اطلاعات شما محرمانه می‌ماند
            </p>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <input
              type="text"
              dir="ltr"
              inputMode="numeric"
              maxLength={5}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="•••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 text-center text-2xl font-black tracking-[0.5em] text-white outline-none transition-colors focus:border-[#e50914] focus:ring-2 focus:ring-[#e50914]/50"
              autoFocus
            />
            {error && (
              <p className="text-xs font-bold text-[#e50914]">{error}</p>
            )}
            <button type="submit" className="w-full rounded-xl bg-[#e50914] py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#ff1f2c] hover:shadow-[0_0_25px_rgba(229,9,20,0.5)]">
              تایید و ورود
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setError("");
              }}
              className="mx-auto flex items-center gap-1.5 text-xs font-bold text-zinc-500 transition-colors hover:text-[#e50914]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {sent ? "ارسال مجدد کد" : "ویرایش شماره موبایل"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
