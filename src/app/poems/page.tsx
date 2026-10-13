import type { Metadata } from "next";
import { getAllPoems } from "@/lib/poems";
import { RhymeIndex } from "@/components/poem/rhyme-index";
import { ScrollToPageTopBottom } from "@/components/scroll-buttons";

export const metadata: Metadata = {
  title: "گنجوردهٔ غزل‌ها",
  description: "فهرست کامل غزل‌های ثبت‌شده در آرشیو، فهرست‌شده بر اساس حرف آخر قافیه.",
};

export default function PoemsIndexPage() {
  const poems = getAllPoems();

  return (
    <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
      <header className="border-b border-rule py-12 sm:py-16">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          گنجوردهٔ غزل‌ها
        </h1>
        <p className="tabular-fa mt-4 text-sm leading-8 text-ink-muted">
          {poems.length.toLocaleString("fa-IR")} غزل
        </p>
      </header>

      <RhymeIndex />
      <ScrollToPageTopBottom />
    </div>
  );
}
