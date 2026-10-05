import Link from "next/link";
import { cn } from "@/lib/utils";
import { poemPath, type PoemEntry } from "@/lib/poems";

/**
 * A typographic list of poems, not a card grid. Each row is a hairline-divided
 * entry showing the poem's exact title with its opening line as quiet metadata.
 */
export function PoemList({
  entries,
  showIndex = false,
  className,
}: {
  entries: PoemEntry[];
  showIndex?: boolean;
  className?: string;
}) {
  return (
    <ol className={cn("border-t border-rule", className)}>
      {entries.map((entry, i) => (
        <li key={entry.title} className="border-b border-rule">
          <Link
            href={poemPath(entry.title)}
            className={cn(
              "group flex items-baseline gap-4 py-5 transition-colors",
              "hover:bg-accent-soft/60 sm:gap-6 sm:px-3",
            )}
          >
            {showIndex ? (
              <span className="tabular-fa w-10 shrink-0 text-sm text-ink-faint">
                {(i + 1).toLocaleString("fa-IR")}
              </span>
            ) : null}

            <span className="min-w-0 flex-1">
              <span className="block font-poem text-base leading-9 text-ink transition-colors group-hover:text-accent sm:text-lg">
                {entry.title}
              </span>
              {entry.opening && entry.opening !== entry.title ? (
                <span className="mt-1 block truncate text-sm text-ink-faint">
                  {entry.opening}
                </span>
              ) : null}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
