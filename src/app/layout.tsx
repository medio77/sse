import type { Metadata, Viewport } from "next";
import { Vazirmatn, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-naskh",
});

export const metadata: Metadata = {
  title: {
    default: "رَوَق — گنجوردهٔ دیوان حافظ",
    template: "%s | رَوَق",
  },
  description:
    "آرشیو پژوهشی غزلیات حافظ: متن کامل غزل‌ها، آماده برای پژوهش متن‌شناختی و نسخه‌شناسی.",
};

export const viewport: Viewport = {
  themeColor: "#faf9f7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${naskh.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          پرش به محتوای اصلی
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
