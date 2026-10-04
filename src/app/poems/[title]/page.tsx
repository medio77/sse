import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPoems, getPoemByTitle, poemPath } from "@/lib/poems";
import { PoemText } from "@/components/poem/poem-text";

/**
 * The route parameter IS the poem identifier — the exact `title` string,
 * percent-encoded by the browser/Next but otherwise untouched. generateStaticParams
 * feeds the raw titles, and Next decodes them back before they reach the page.
 */
export function generateStaticParams() {
  return getAllPoems().map((poem) => ({ title: poem.title }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>;
}): Promise<Metadata> {
  const { title } = await params;
  const poem = getPoemByTitle(title);
  return {
    title: poem ? poem.title : "غزل یافت نشد",
  };
}

export default async function PoemPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const poem = getPoemByTitle(title);
  if (!poem) notFound();

  const siblings = getAllPoems();
  const index = siblings.findIndex((p) => p.title === poem.title);
  const previous = index > 0 ? siblings[index - 1] : undefined;
  const next = index < siblings.length - 1 ? siblings[index + 1] : undefined;

  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-12 sm:px-8 sm:py-20">
      <Link
        href="/poems"
        className="text-sm text-ink-faint transition-colors hover:text-accent"
      >
        → بازگشت به گنجورده
      </Link>

      <header className="mt-8 border-b border-rule pb-8">
        <h1 className="font-poem text-xl leading-[2] font-semibold tracking-tight text-ink sm:text-2xl sm:leading-[2.1]">
          {poem.title}
        </h1>
        <p className="tabular-fa mt-3 text-xs text-ink-faint">
          شماره {index + 1} از {siblings.length.toLocaleString("fa-IR")} در
          گنجورده
        </p>
      </header>

      {/* The poem itself: a controlled reading column, generous leading. */}
      <div className="py-10 sm:py-14">
        {poem.description.trim().length > 0 ? (
          <PoemText text={poem.description} />
        ) : (
          <p className="font-poem text-lg leading-10 text-ink-faint">
            متنی برای این مدخل در منبع داده ثبت نشده است.
          </p>
        )}
      </div>

      <nav
        aria-label="پیمایش غزل‌ها"
        className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={poemPath(previous.title)}
            className="group bg-surface px-5 py-4 transition-colors hover:bg-accent-soft/60"
          >
            <span className="block text-xs text-ink-faint">غزل پیشین</span>
            <span className="mt-1.5 block truncate font-poem text-sm text-ink transition-colors group-hover:text-accent">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span className="bg-surface px-5 py-4 text-xs text-ink-faint/70">
            نخستین غزل گنجورده
          </span>
        )}

        {next ? (
          <Link
            href={poemPath(next.title)}
            className="group bg-surface px-5 py-4 text-start transition-colors hover:bg-accent-soft/60"
          >
            <span className="block text-xs text-ink-faint">غزل بعدی</span>
            <span className="mt-1.5 block truncate font-poem text-sm text-ink transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        ) : (
          <span className="bg-surface px-5 py-4 text-xs text-ink-faint/70">
            واپسین غزل گنجورده
          </span>
        )}
      </nav>
    </article>
  );
}
