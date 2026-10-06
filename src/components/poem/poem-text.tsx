/**
 * Renders a ghazal in couplet pairs — two half-lines (hemistichs) side by side,
 * separated by a tab. The source text is never rewritten; only blank separator
 * lines between couplets are dropped (spacing comes from CSS gap instead).
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
        <div key={idx} className="flex items-baseline gap-1 sm:gap-2 py-2 sm:py-3" dir="rtl">
          <span className="min-w-0 flex-1 whitespace-pre-wrap text-left">{pair[0]}</span>
          {pair[1] ? (
            <>
              <span aria-hidden="true" className="text-ink-faint select-none whitespace-pre">{"\t"}</span>
              <span className="min-w-0 flex-1 whitespace-pre-wrap text-right">{pair[1]}</span>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
