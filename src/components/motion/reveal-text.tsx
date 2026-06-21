"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  children: React.ReactNode;
  stagger?: number;
  start?: string;
};

// per-line mask reveal: lines rise from behind a clip edge, staggered.
// font-aware (waits for fonts) and reduced-motion safe.
export function RevealText({
  as = "p",
  className,
  children,
  stagger = 0.08,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let split: SplitText | undefined;
      const run = () => {
        split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          linesClass: "reveal-line",
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger,
              scrollTrigger: { trigger: el, start, once: true },
            }),
        });
      };

      if (document.fonts?.status === "loaded") run();
      else document.fonts.ready.then(run);

      return () => split?.revert();
    },
    { scope: ref }
  );

  return React.createElement(as, { ref, className }, children);
}
