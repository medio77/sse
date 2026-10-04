/**
 * Renders a poem's raw description exactly as provided.
 *
 * Deliberately does nothing "helpful": no normalization, no trimming, no
 * paragraph rebuilding, no emoji/metadata stripping. The string is emitted as a
 * single text node with `whitespace-pre-wrap`, so every line break and blank
 * line in the source survives byte-for-byte into the rendered HTML.
 */
export function PoemText({ text }: { text: string }) {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="whitespace-pre-wrap font-poem text-ink text-[1.0625rem] leading-[2.35] tracking-normal sm:text-xl sm:leading-[2.4]"
    >
      {text}
    </div>
  );
}
