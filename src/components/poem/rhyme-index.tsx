"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAllPoems, poemPath, ghazalNumber } from "@/lib/poems";
import { useEffect, useState } from "react";

/** Full Persian alphabet, in dictionary order. */
const ALPHA = "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی";

/**
 * The rhyme is the last word of the first hemistich — which is exactly the
 * poem's title. Return the final letter of that word.
 */
function rhymeEndingLetter(title: string): string | null {
  const words = title.trim().split(/\s+/);
  if (words.length === 0) return null;
  let word = words[words.length - 1];
  // Drop trailing tatweel / punctuation so "کجا؟" becomes "کجا".
  word = word.replace(/[\u0640؟،.!?؛]+$/g, "");
  if (word.length === 0) return null;
  let letter = word[word.length - 1];
  // Arabic ي -> Persian ی for uniform grouping.
  if (letter === "ي") letter = "ی";
  if (!ALPHA.includes(letter)) return null;
  return letter;
}

type Poem = ReturnType<typeof getAllPoems>[number];

function groupByRhymeLetter(poems: Poem[]): Record<string, Poem[]> {
  const groups: Record<string, Poem[]> = {};
  for (const poem of poems) {
    const letter = rhymeEndingLetter(poem.title);
    if (!letter) continue;
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(poem);
  }
  // Each letter group is ordered by ghazal number.
  for (const key in groups) {
    groups[key].sort(
      (a, b) => (ghazalNumber(a.sequence) ?? 0) - (ghazalNumber(b.sequence) ?? 0)
    );
  }
  return groups;
}

/**
 * A Ganjoor-style alphabetical index by the last letter of the rhyme.
 * The heading and letter bar are at the top; clicking a letter scrolls to
 * the corresponding poem group.
 */
export function RhymeIndex() {
  const poems = getAllPoems();
  const groups = groupByRhymeLetter(poems);
  const letters = ALPHA.split("").filter((l) => groups[l]?.length);
  const [active, setActive] = useState(letters[0]);

  useEffect(() => {
    const sections = letters.map((l) => document.getElementById(l));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    for (const section of sections) {
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [letters]);

  return (
    <section id="rhyme-index" className="border-b border-rule py-12 sm:py-16">
      <h2 className="text-xl font-semibold tracking-tight">حرف آخر قافیه</h2>
      <div role="group" className="flex flex-wrap items-center gap-1.5 py-3">
        {letters.map((letter) => {
          const displayName = letter === "ا" ? "الف" : letter;
          return (
            <a
              key={letter}
              href={`#${displayName}`}
              aria-current={active === displayName ? "true" : undefined}
              className={cn(
                "rounded-sm px-2.5 py-1.5 text-xs transition-colors",
                active === displayName
                  ? "bg-accent-soft text-accent"
                  : "text-ink-muted hover:bg-accent-soft/60 hover:text-accent"
              )}
            >
              {displayName}
            </a>
          );
        })}
      </div>
      <div className="mt-8 space-y-12">
        {letters.map((letter) => {
          const displayName = letter === "ا" ? "الف" : letter;
          return (
            <div key={letter} id={displayName} className="poem-group">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-accent">
                {displayName}
              </h3>
            <ol className="border-t border-rule">
              {groups[letter].map((poem) => (
                <li key={poem.title} className="border-b border-rule">
                  <Link
                    href={poemPath(poem.title)}
                    className={cn(
                      "group flex items-baseline gap-4 py-5 transition-colors",
                      "hover:bg-accent-soft/60 sm:gap-6 sm:px-3"
                    )}
                  >
                    <span className="tabular-fa shrink-0 whitespace-nowrap text-sm text-ink-faint">
                      غزل نمره{" "}
                      {ghazalNumber(poem.sequence)?.toLocaleString("fa-IR") ??
                        ""}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-poem text-base leading-9 text-ink transition-colors group-hover:text-accent sm:text-lg">
                        {poem.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        );})}
      </div>
    </section>
  );
}
