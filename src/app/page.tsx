
import Link from "next/link";
import { RandomPoem } from "@/components/random-poem";
import { getAllPoems } from "@/lib/poems";

export default function HomePage() {
  const poems = getAllPoems();

  return (
    <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      <section className="border-b border-rule py-16 sm:py-24">
        <p className="text-sm text-accent">
          آرشیو دیجیتال صدای سخن عشق
        </p>

        <h1 className="mt-4 max-w-2xl text-3xl leading-[1.7] font-semibold tracking-tight text-ink sm:text-4xl sm:leading-[1.6]">
          دفتر سخن
        </h1>

        <p className="mt-4 text-lg leading-9 text-ink-muted sm:text-xl">
          از شنیدن تا خواندن
        </p>

        <div className="mt-10 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink">
            دربارهٔ دفتر سخن
          </h2>

          <div className="mt-5 space-y-5 text-base leading-9 text-ink-muted text-justify sm:text-lg sm:leading-10">
            <p>
              دفتر سخن، آرشیوی دیجیتال و مستقل از محتوای پادکست
              «صدای سخن عشق» است؛ تلاشی از سوی یکی از علاقه‌مندان
              این مجموعه برای گردآوری، نگهداری و دسترس‌پذیر کردن
              اشعار و متون آن در قالبی منظم و قابل جست‌وجو.
            </p>

            <p>
              اشعار این مجموعه عیناً بر اساس تصحیح و روایت
              «صدای سخن عشق» ثبت شده‌اند تا مخاطبان بتوانند
              در کنار شنیدن پادکست، به متن اشعار نیز دسترسی
              داشته باشند و در آن‌ها جست‌وجو و مطالعه کنند.
            </p>

            <p>
              این پروژه مستقل و غیررسمی، با رویکردی{' '}
              <Link
                href="https://github.com/medio77/sse"
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                متن‌باز
              </Link>{' '}
              توسعه پیدا می‌کند و از مشارکت علاقه‌مندان برای
              تکمیل، اصلاح و بهبود آرشیو استقبال می‌کند.
            </p>

            <p className="mt-2 text-xs text-ink-faint">
              مشارکت:{' '}
              <Link
                href="https://github.com/medio77/sse"
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/medio77/sse
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <span className="rounded-sm border border-rule px-3 py-1.5 text-xs text-ink-muted">
            متن‌باز
          </span>
          <span className="rounded-sm border border-rule px-3 py-1.5 text-xs text-ink-muted">
            مستقل و غیررسمی
          </span>
          <span className="rounded-sm border border-rule px-3 py-1.5 text-xs text-ink-muted">
            مبتنی بر تصحیح صدای سخن عشق
          </span>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/poems"
            className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            ورود به آرشیو
          </Link>

          <RandomPoem />

          <span className="tabular-fa text-sm text-ink-faint">
            {poems.length.toLocaleString("fa-IR")} غزل
          </span>
        </div>
      </section>
    </div>
  );
}
