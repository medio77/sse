"use client";

import { cn } from "@/lib/utils";

export type SortKey = "source" | "number-asc" | "number-desc" | "alphabetical";

const OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: "number-asc", label: "شمارهٔ غزل ↑" },
  { key: "number-desc", label: "شمارهٔ غزل ↓" },
];

const DESCRIPTIONS: Record<Extract<SortKey, "number-asc" | "number-desc">, string> = {
  "number-asc": "مرتب‌سازی بر اساس شمارهٔ غزل، از کم به زیاد",
  "number-desc": "مرتب‌سازی بر اساس شمارهٔ غزل، از زیاد به کم",
};

/**
 * A compact segmented control. Deliberately text buttons rather than a select
 * element: short Persian labels read better inline than a dropdown, and the
 * control stays legible at mobile widths.
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
            title={DESCRIPTIONS[option.key as Extract<SortKey, "number-asc" | "number-desc">]}
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
