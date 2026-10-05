"use client";

import { cn } from "@/lib/utils";

export type SortKey = "source" | "number-asc" | "number-desc" | "alphabetical";

const OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: "source", label: "ترتیب منبع" },
  { key: "number-asc", label: "شمارهٔ غزل ↑" },
  { key: "number-desc", label: "شمارهٔ غزل ↓" },
  { key: "alphabetical", label: "الفبا" },
];

const DESCRIPTIONS: Record<SortKey, string> = {
  source: "مرتب‌سازی بر اساس ترتیب دادهٔ منبع",
  "number-asc": "مرتب‌سازی بر اساس شمارهٔ غزل، از کم به زیاد",
  "number-desc": "مرتب‌سازی بر اساس شمارهٔ غزل، از زیاد به کم",
  alphabetical: "مرتب‌سازی بر اساس حروف الفبا",
};

/**
 * A compact segmented control. Deliberately text buttons rather than a select
 * element: four short Persian labels read better inline than a dropdown, and
 * the control stays legible at mobile widths.
 */
export function PoemSortControls({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  return (
    <div
      role="group"
      aria-label="ترتیب نمایش غزل‌ها"
      className="flex flex-wrap items-center gap-x-1 gap-y-2"
    >
      <span className="me-2 text-xs text-ink-faint">ترتیب:</span>
      {OPTIONS.map((option) => {
        const active = option.key === value;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            aria-pressed={active}
            title={DESCRIPTIONS[option.key]}
            className={cn(
              "rounded-sm px-2.5 py-1.5 text-xs transition-colors",
              active
                ? "bg-accent-soft text-accent"
                : "text-ink-muted hover:bg-accent-soft/60 hover:text-accent",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
