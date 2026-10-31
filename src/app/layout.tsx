import type { Metadata, Viewport } from "next";
import { irannastaliq, vazirmatn } from "@/lib/font-local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";


export const metadata: Metadata = {
  title: {
    default: "دفترِ سخن — از شنیدن تا خواندن",
    template: "%s | دفترِ سخن",
  },
  description:
    "دفتر سخن، آرشیوی دیجیتال و مستقل از محتوای پادکست صدای سخن عشق؛ مجموعه‌ای از اشعار بر اساس تصحیح این پادکست، با امکان جست‌وجو و مشارکت علاقه‌مندان.",
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
      className={`${vazirmatn.variable} ${irannastaliq.variable}`}
    >
      <body className="min-h-dvh flex flex-col" data-font="nastaliq">
        <style>{`
          body[data-font="nastaliq"] { --font-poem: var(--font-irannastaliq), var(--font-vazirmatn), serif; }
          body[data-font="vazirmatn"] { --font-poem: var(--font-vazirmatn), serif; }
        `}</style>
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
