"use client";

import { useEffect, useRef, useState } from "react";

// reads the SAME public Firestore counter the ATS Screener landing animates, so
// this number is genuinely live. the web api key is public by design (it ships in
// every firebase client bundle) and stats/public is unauthenticated-readable.
// note the named database is "default" (not "(default)").
const COUNTER_URL =
  "https://firestore.googleapis.com/v1/projects/ats-screener-app/databases/default/documents/stats/public?key=***REMOVED-SEE-ENV***";

export function LiveUserCount({ fallback = "2,000+" }: { fallback?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [display, setDisplay] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    const ac = new AbortController();
    fetch(COUNTER_URL, { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        const n = Number(j?.fields?.userCount?.integerValue);
        if (Number.isFinite(n) && n > 0) setTarget(n);
        else setFailed(true);
      })
      .catch(() => setFailed(true));
    return () => ac.abort();
  }, []);

  // count from 0 to target on scroll-into-view, easeOutExpo over 2500ms.
  // this is a 1:1 port of the ATS Screener landing's animateCount.
  useEffect(() => {
    if (target == null) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }
    const run = () => {
      if (animated.current) return;
      animated.current = true;
      const duration = 2500;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -12 * progress);
        setDisplay(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    const safety = window.setTimeout(run, 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [target]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {failed ? fallback : display.toLocaleString()}
    </span>
  );
}
