"use client";

import { useEffect, useRef, useState } from "react";

// public firestore counter shared with the ats screener; firebase web key stays in env, not source.
const KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const COUNTER_URL = KEY
  ? `https://firestore.googleapis.com/v1/projects/ats-screener-app/databases/default/documents/stats/public?key=${KEY}`
  : null;

export function LiveUserCount({ fallback = "2,000+" }: { fallback?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [display, setDisplay] = useState(0);
  const animated = useRef(false);

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
        if (Number.isFinite(n) && n > 0) setTarget(n);
        else setFailed(true);
      })
      .catch(() => setFailed(true));
    return () => ac.abort();
  }, []);

  // count 0 to target on scroll-in, easeOutExpo over 2500ms; 1:1 port of the ats screener's animateCount
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
    // animate only when actually scrolled into view, so the count-up always plays
    // for the viewer (a timer would fire it off-screen and they'd miss it)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {failed ? fallback : display.toLocaleString()}
    </span>
  );
}
