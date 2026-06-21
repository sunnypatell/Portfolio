"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// gentle "keep scrolling" cue that fades once you leave the hero.
export function ScrollCue() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500 lg:flex",
        hidden ? "opacity-0" : "opacity-80"
      )}
    >
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
        scroll
      </span>
      <ChevronDown className="h-4 w-4 animate-bounce text-ember" />
    </div>
  );
}
