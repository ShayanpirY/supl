import type { Metadata } from "next";
import "./globals.css";
import HeaderTop from "@/components/HeaderTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthModal from "@/components/auth/AuthModal";
import SearchOverlay from "@/components/search/SearchOverlay";
import { getMegaMenuData } from "@/lib/data/db";
import { Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";

const vazir = Vazirmatn({ 
  subsets: ["arabic"], 
  variable: "--font-vazir",
  weight: ["300","400","500","600","700","800","900"]
});

export const metadata: Metadata = {
  title: {
    default: "مکمل | فروشگاه مکمل‌های ورزشی",
    template: "%s | مکمل",
  },
  description:
    "فروشگاه اینترنتی مکمل‌های ورزشی با واردات مستقیم از دبی، ضمانت اصالت کالا و قیمت‌گذاری لحظه‌ای بر اساس نرخ درهم.",
  };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const megaMenuData = await getMegaMenuData();

  return (
    <html lang="fa" dir="rtl" className={cn("font-sans", vazir.variable)}>
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 font-vazir antialiased">
        <HeaderTop />
        <Navbar
          megaMenuCategories={megaMenuData.categories}
          megaMenuBrands={megaMenuData.brands}
        />
        <main className="flex min-h-screen w-full flex-col bg-gray-50 text-gray-900">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <AuthModal />
        <SearchOverlay />
      </body>
    </html>
  );
}
