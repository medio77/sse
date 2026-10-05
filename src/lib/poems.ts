import episodes from "@/data/episodes.json";

/**
 * The poem is the canonical entity of this archive.
 *
 * Identity rule: a poem IS its `title` string, taken verbatim from the source
 * JSON. No surrogate ID, no slug, no normalization, no transliteration. The
 * same exact string is used for identification, display and the URL.
 */
export type Poem = {
  /** The poem's identifier, and the only identifier that exists. */
  readonly title: string;
  /** Raw source text, preserved exactly as provided. */
  readonly description: string;
};

type RawEpisode = {
  title?: unknown;
  description?: unknown;
};

function toPoem(raw: RawEpisode): Poem {
  return {
    title: typeof raw.title === "string" ? raw.title : "",
    description: typeof raw.description === "string" ? raw.description : "",
  };
}

/** All poems, in source order. Stable across builds. */
export function getAllPoems(): Poem[] {
  return (episodes as RawEpisode[]).map(toPoem);
}

/**
 * Look up a poem by its exact title. Returns undefined when absent.
 *
 * The route parameter may arrive percent-encoded depending on the Next.js
 * version and rendering phase, so an exact match is tried first and a decoded
 * match second. Both paths resolve to the identical `Poem` object from the JSON
 * — the identifier is never rewritten, only decoded.
 */
export function getPoemByTitle(title: string): Poem | undefined {
  const poems = getAllPoems();

  const exact = poems.find((poem) => poem.title === title);
  if (exact) return exact;

  let decoded: string;
  try {
    decoded = decodeURIComponent(title);
  } catch {
    return undefined;
  }
  return poems.find((poem) => poem.title === decoded);
}

/**
 * A lightweight view of a poem for listings.
 *
 * List pages ship only these fields to the client. Poem bodies stay on the
 * server/static side, which keeps the index page's payload small even when
 * sorting reorders the whole collection in the browser.
 */
export type PoemEntry = {
  title: string;
  /** The poem's opening line, used as a subtitle in listings. */
  opening: string;
};

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/**
 * The ghazal number encoded in a title, or null when the title has none
 * (a few entries are programme announcements rather than ghazals).
 *
 * This is derived for display and sorting only. It is never used as an
 * identifier and never written back into the title.
 */
const DIGIT_MAP: Record<string, string> = Object.fromEntries(
  [...PERSIAN_DIGITS, ...ARABIC_DIGITS].map((char, i) => [char, String(i % 10)]),
);

export function ghazalNumber(title: string): number | null {
  const match = /([۰-۹٠-٩0-9]+)\s*$/.exec(title);
  if (!match) return null;

  const digits = match[1]
    .split("")
    .map((char) => DIGIT_MAP[char] ?? char)
    .join("");
  const value = Number.parseInt(digits, 10);
  return Number.isNaN(value) ? null : value;
}

const NUMBERED_LINE = /^غزل\s+نمره/;

/** The first meaningful line of a poem: its opening hemistich. */
function openingLine(description: string): string {
  const line = description
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.length > 0 && !NUMBERED_LINE.test(l));
  return line ?? "";
}

/** Projects poems down to their listing fields. */
export function toPoemEntries(poems: Poem[]): PoemEntry[] {
  return poems.map((poem) => ({
    title: poem.title,
    opening: openingLine(poem.description),
  }));
}

/**
 * The canonical path for a poem.
 *
 * The title is passed through verbatim; only percent-encoding is applied, as
 * required for a valid URL. The identifier itself is never modified, so
 * decoding this path yields the exact title again.
 */
export function poemPath(title: string): string {
  return `/poems/${encodeURIComponent(title)}`;
}
