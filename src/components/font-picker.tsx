"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type FontKey = "nastaliq" | "vazirmatn";

const OPTIONS: { key: FontKey; label: string; var: string }[] = [
  { key: "nastaliq", label: "نستعلیق", var: "var(--font-irannastaliq)" },
  { key: "vazirmatn", label: "وزیرمتن", var: "var(--font-vazirmatn)" },
];

export function FontPicker() {
  const [active, setActive] = useState<FontKey>("nastaliq");

  useEffect(() => {
    document.body.setAttribute("data-font", active);
  }, [active]);

  return (
    <div role="group" aria-label="انتخاب قلم غزل" className="flex items-center gap-1 text-xs">
      <span className="text-ink-faint ms-1">قلم:</span>
      {OPTIONS.map((opt) => {
        const on = opt.key === active;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => setActive(opt.key)}
            aria-pressed={on}
            className={cn(
              "rounded-sm px-2 py-1 transition-colors",
              on ? "bg-accent-soft text-accent font-medium" : "text-ink-muted hover:text-ink-faint",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
