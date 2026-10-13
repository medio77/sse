"use client";

import { useEffect, useState } from "react";

/** Threshold in px before the "to top" button appears. */
const THRESHOLD = 300;

/**
 * Two floating action buttons placed near the scroll bar (bottom-right):
 * one scrolls to the top, the other to the bottom. Each appears only when
 * the page is not already at that extreme.
 */
export function ScrollToPageTopBottom() {
  const [visible, setVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const maxScrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight || 0
    );

    const update = () => {
      const scrollTop = window.scrollY;
      const atTop = scrollTop <= THRESHOLD;
      const atBottom = scrollTop + window.innerHeight >= maxScrollHeight - THRESHOLD;
      setShowTop(!atTop);
      setShowBottom(!atBottom);
      setVisible(!atTop || !atBottom);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="بالاتر"
        title="بالاتر"
        className={`flex items-center justify-center w-11 h-11 rounded-full bg-accent text-white shadow-lg hover:bg-accent/80 transition-all ${
          showTop ? "opacity-100" : "opacity-0 -translate-x-4 pointer-events-none"
        }`}
      >
        <span className="text-lg" dir="ltr">
          ↑
        </span>
      </button>
      <button
        onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
        aria-label="پایین‌تر"
        title="پایین‌تر"
        className={`flex items-center justify-center w-11 h-11 rounded-full bg-accent text-white shadow-lg hover:bg-accent/80 transition-all ${
          showBottom ? "opacity-100" : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <span className="text-lg" dir="ltr">
          ↓
        </span>
      </button>
    </div>
  );
}
