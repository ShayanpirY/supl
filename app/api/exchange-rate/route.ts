import { NextResponse } from "next/server";
import { DEFAULT_AED_TO_TOMAN } from "@/lib/currency";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    aedToToman: DEFAULT_AED_TO_TOMAN,
    currencyCode: "AED",
    updatedAt: new Date().toISOString(),
    source: "پیکربندی سرور (نمونه)",
    refreshInterval: 10 * 60 * 1000,
  });
}
