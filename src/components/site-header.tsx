import Link from "next/link";
import { FontPicker } from "@/components/font-picker";

const NAV = [{ href: "/poems", label: "غزل‌ها" }];

export function SiteHeader() {
  return (
    <header className="border-b border-rule bg-paper/85 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5 text-ink transition-colors hover:text-accent"
          >
            <span className="text-lg font-semibold tracking-tight">رَوَق</span>
            <span className="hidden text-xs text-ink-faint sm:inline">
              گنجوردهٔ دیوان حافظ
            </span>
          </Link>

          <nav aria-label="ناوبری اصلی">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-sm px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-accent-soft hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <FontPicker />
        </div>
      </div>
    </header>
  );
}
