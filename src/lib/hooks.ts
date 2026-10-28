"use client";

import { useEffect, useState, type RefObject } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

// overflow locks drop the styled scrollbar and shift layout, so stop wheel + touch at the overlay
export function useScrollBlock(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;
    const block = (e: Event) => {
      if (!(e.target as Element).closest?.("[data-overlay-scroll]")) e.preventDefault();
    };
    el.addEventListener("wheel", block, { passive: false });
    el.addEventListener("touchmove", block, { passive: false });
    return () => {
      el.removeEventListener("wheel", block);
      el.removeEventListener("touchmove", block);
    };
  }, [ref, active]);
}
