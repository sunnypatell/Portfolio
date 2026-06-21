"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// public firestore counter shared with the ats screener; firebase web key stays in env, not source.
const KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const COUNTER_URL = KEY
  ? `https://firestore.googleapis.com/v1/projects/ats-screener-app/databases/default/documents/stats/public?key=${KEY}`
  : null;

export function LiveUserCount({ fallback = "2,000+" }: { fallback?: string }) {
  const pathname = usePathname();
  const ref = useRef<HTMLSpanElement>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [display, setDisplay] = useState(0);
  const targetRef = useRef<number | null>(null);
  const inView = useRef(false);
  const animated = useRef(false);

  // count 0 -> target once, but only after BOTH the value is fetched and the element
  // has scrolled into view. decoupled (refs, no deps) so it fires in any order, which
  // is what makes it work on client-side nav + scroll, not just a fresh reload-in-view.
  const maybeAnimate = useCallback(() => {
    const t = targetRef.current;
    if (animated.current || t == null || !inView.current) return;
    animated.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(t);
      return;
    }
    const duration = 2500;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -12 * progress); // easeOutExpo
      setDisplay(Math.floor(eased * t));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!COUNTER_URL) {
      setFailed(true);
      return;
    }
    const ac = new AbortController();
    fetch(COUNTER_URL, { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        const n = Number(j?.fields?.userCount?.integerValue);
        if (Number.isFinite(n) && n > 0) {
          targetRef.current = n;
          setTarget(n);
          setFailed(false);
          maybeAnimate();
        } else setFailed(true);
      })
      // a client-side nav unmount aborts the in-flight fetch; that's not a real
      // failure, so don't poison the counter into the static fallback for it
      .catch((e) => {
        if (e?.name !== "AbortError") setFailed(true);
      });
    return () => ac.abort();
  }, [maybeAnimate]);

  // re-arm on every route change so the count-up replays when you navigate back
  // into view, not just on a hard reload. next reuses the page subtree on client
  // nav (and across [slug] params), so the refs survive and the guard never resets
  // on its own. keyed on pathname to mirror a fresh mount, like the ats screener.
  useEffect(() => {
    animated.current = false;
    inView.current = false;
    setDisplay(0);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          inView.current = true;
          maybeAnimate();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pathname, maybeAnimate]);

  const shown = failed ? fallback : display.toLocaleString();
  // reserve the final width (tabular figures) so the count-up never reflows the dot + label
  const reserve = failed ? fallback : target != null ? target.toLocaleString() : fallback;

  return (
    <span
      ref={ref}
      suppressHydrationWarning
      className="relative inline-block [font-variant-numeric:tabular-nums]"
    >
      <span aria-hidden className="invisible">
        {reserve}
      </span>
      <span className="absolute inset-0">{shown}</span>
    </span>
  );
}
