"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// fine-pointer-only cursor: instant dot + lagging ring that grows over interactive targets
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnabled(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // runs only after the elements actually mount (enabled flips -> they render)
  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;

    document.documentElement.classList.add("cursor-active");
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const hit = (e.target as Element)?.closest?.("a,button,[data-cursor]");
      gsap.to(ring.current, {
        scale: hit ? 1.8 : 1,
        opacity: hit ? 1 : 0.55,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
