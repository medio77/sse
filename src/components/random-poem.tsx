"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAllPoems, poemPath } from "@/lib/poems";
import { cn } from "@/lib/utils";

export function RandomPoem() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [fading, setFading] = useState(false);

  const pick = useCallback(() => {
    const poems = getAllPoems();
    const pick = poems[Math.floor(Math.random() * poems.length)].title;
    setSelected(pick);
    setFading(false);
    const t = setTimeout(() => {
      setFading(true);
      setTimeout(() => router.push(poemPath(pick)), 400);
    }, 2000);
    return () => clearTimeout(t);
  }, [router]);

  useEffect(() => {
    return () => setSelected(null);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={pick}
        aria-label="انتخاب تصادفی"
        className="rounded-sm bg-paper border border-rule px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-accent hover:text-accent hover:bg-accent-soft"
      >
        انتخاب تصادفی
      </button>

      {selected && (
        <div
          dir="rtl"
          lang="fa"
          role="dialog"
          aria-label="غزل تصادفی"
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-ink/20 backdrop-blur-sm transition-opacity duration-700",
            fading ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
          onClick={() => router.push(poemPath(selected))}
        >
          <div
            className={cn(
              "max-w-xl mx-6 px-8 py-10 rounded-sm bg-surface border border-rule shadow-xl text-center transition-transform duration-700",
              fading ? "scale-95" : "scale-100",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs text-ink-faint mb-3">غزل تصادفی</p>
            <h2 className="font-vazirmatn text-2xl leading-[2] font-semibold text-ink sm:text-3xl sm:leading-[2.1] mb-6">
              {selected}
            </h2>
            <div className="text-xs text-ink-faint">در حال هدایت…</div>
          </div>
        </div>
      )}
    </>
  );
}
