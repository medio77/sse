import type { Metadata } from "next";
import { getAllPoems, toPoemEntries } from "@/lib/poems";
import { SortablePoemList } from "@/components/poem/sortable-poem-list";

export const metadata: Metadata = {
  title: "گنجوردهٔ غزل‌ها",
  description: "فهرست کامل غزل‌های ثبت‌شده در آرشیو.",
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

      <div className="py-8">
        <SortablePoemList entries={toPoemEntries(poems)} />
      </div>
    </div>
  );
}
