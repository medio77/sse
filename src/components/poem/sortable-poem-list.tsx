"use client";

import { useMemo, useState } from "react";
import type { PoemEntry } from "@/lib/poems";
import { PoemList } from "@/components/poem/poem-list";
import { PoemSortControls, type SortKey } from "@/components/poem/poem-sort-controls";

/**
 * Holds the sort state and reorders the list in place.
 *
 * Ordering is applied to lightweight entries only (title + opening line), so no
 * poem body is shipped to the browser. Sorting is view state, not identity: the
 * poem's title remains its identifier regardless of where it sits in the list.
 */
export function SortablePoemList({ entries }: { entries: PoemEntry[] }) {
  const [sort, setSort] = useState<SortKey>("number-asc");

  const sorted = useMemo(() => {
    // Copy first: never mutate the props array.
    const list = entries.slice();

    const direction = sort === "number-asc" ? 1 : -1;
    // Entries without a number (programme announcements) sort last either way.
    list.sort((a, b) => {
      const na = a.number;
      const nb = b.number;
      if (na === null && nb === null) return 0;
      if (na === null) return 1;
      if (nb === null) return -1;
      return (na - nb) * direction;
    });
    return list;
  }, [entries, sort]);

  return (
    <>
      <PoemSortControls value={sort} onChange={setSort} />
      <PoemList entries={sorted} showIndex className="mt-2" />
    </>
  );
}
