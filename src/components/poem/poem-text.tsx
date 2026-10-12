/**
 * Renders a ghazal in couplet pairs — two half-lines (hemistichs).
 *
 * Desktop (sm and up): the two hemistichs of each bayt sit side by side,
 * spaced by the original tab character while ● (U+25CF BULLET BLACK) is
 * overlaid, centered in the middle of that space.
 *
 * Mobile: each hemistich stacks on its own line, with a dashed divider between
 * couplets (the divider is skipped after the last couplet). The source text is
 * never rewritten.
 */
export function PoemText({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => l.trim().length > 0);

  const pairs: string[][] = [];
  for (let i = 0; i < lines.length; i += 2) {
    pairs.push(lines.slice(i, i + 2));
  }

  return (
    <div dir="rtl" lang="fa" className="font-poem text-ink text-[1.0625rem] leading-[2.35] tracking-normal sm:text-xl sm:leading-[2.4]">
      {pairs.map((pair, idx) => (
        <>
          {/* Mobile: stacked hemistichs with a dashed divider between couplets. */}
          <div className="sm:hidden flex flex-col py-2" dir="rtl">
            <span className="whitespace-pre-wrap text-center">{pair[0]}</span>
            {pair[1] && (
              <>
                <span className="whitespace-pre-wrap text-center">{pair[1]}</span>
                {idx < pairs.length - 1 && (
                  <div
                    key={idx}
                    className="w-full border-b border-dashed border-ink-faint"
                    aria-hidden
                  />
                )}
              </>
            )}
          </div>

          {/* Desktop: side-by-side hemistichs with the ● separator. */}
          <div className="hidden sm:flex items-baseline gap-2 py-2 sm:gap-3 sm:py-3 w-full" dir="rtl">
            <span className="min-w-0 flex-1 whitespace-pre-wrap text-left">{pair[0]}</span>
            {pair[1] ? (
              <>
                <div
                  className="relative inline-block whitespace-pre select-none"
                  aria-hidden
                >
                  <span className="text-transparent whitespace-pre select-none">{"\t"}</span>
                  <span
                    className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center text-accent select-none whitespace-nowrap"
                  >
                    {"●"}
                  </span>
                </div>
                <span className="min-w-0 flex-1 whitespace-pre-wrap text-right">{pair[1]}</span>
              </>
            ) : null}
          </div>
        </>
      ))}
    </div>
  );
}
