import Link from "next/link";
import { getAllPoems, toPoemEntries } from "@/lib/poems";
import { PoemList } from "@/components/poem/poem-list";

const FEATURED = 6;

export default function HomePage() {
  const poems = getAllPoems();
  const featured = toPoemEntries(poems.slice(0, FEATURED));

  return (
    <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      {/* Introductory statement: literary, calm, no ornament. */}
      <section className="border-b border-rule py-16 sm:py-24">
        <p className="text-sm text-accent">آرشیو دیجیتال غزلیات</p>
        <h1 className="mt-4 max-w-2xl text-3xl leading-[1.7] font-semibold tracking-tight text-ink sm:text-4xl sm:leading-[1.6]">
          رَوَق
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-9 text-ink-muted sm:text-lg sm:leading-10">
          گنجورده‌ای از غزل‌های حافظ برای پژوهش متن‌شناختی. در این نسخه، هر غزل
          با متن کامل و بی‌واسطهٔ خود، همان‌گونه که در منبع آمده، ثبت شده است —
          بدون ویرایش، یکسان‌سازی یا حذفِ هیچ بخشی.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/poems"
            className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            ورود به گنجوردهٔ غزل‌ها
          </Link>
          <span className="tabular-fa text-sm text-ink-faint">
            {poems.length.toLocaleString("fa-IR")} غزل
          </span>
        </div>
      </section>

      {/* A short selection. The full archive lives at /poems. */}
      <section className="py-14 sm:py-16">
        <div className="flex items-baseline justify-between gap-4 pb-6">
          <h2 className="text-lg font-semibold tracking-tight">
            گزیدهٔ غزل‌ها
          </h2>
          <Link
            href="/poems"
            className="text-sm text-accent transition-colors hover:opacity-75"
          >
            همهٔ غزل‌ها ←
          </Link>
        </div>

        <PoemList entries={featured} />

        {poems.length > FEATURED ? (
          <p className="pt-8 text-sm text-ink-faint">
            و{" "}
            <span className="tabular-fa">
              {(poems.length - FEATURED).toLocaleString("fa-IR")}
            </span>{" "}
            غزل دیگر در گنجورده.
          </p>
        ) : null}
      </section>
    </div>
  );
}
