"use client";

import { useState } from "react";
import { experiences } from "@/content/site";
import { cn } from "@/lib/utils";

// hovering a role brings it forward and quiets the rest (no layout shift).
export function ExperienceSpotlight() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div onMouseLeave={() => setActive(null)} className="border-t border-line">
      {experiences.map((e, i) => (
        <article
          key={e.company + e.start}
          onMouseEnter={() => setActive(i)}
          className={cn(
            "grid gap-5 border-b border-line py-9 transition-[opacity,transform] duration-300 ease-[var(--ease-premium)] md:grid-cols-[210px_1fr] md:gap-10",
            active !== null && active !== i ? "opacity-40" : "opacity-100",
            active === i && "md:translate-x-1.5"
          )}
        >
          <div className="font-mono text-xs">
            <div className="flex items-center gap-2 text-bone">
              {e.current && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
                </span>
              )}
              {e.start} – {e.end}
            </div>
            <div className="mt-2 uppercase tracking-[0.15em] text-muted">
              {e.location}
            </div>
            <div className="mt-0.5 uppercase tracking-[0.15em] text-muted">
              {e.mode}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-bone sm:text-2xl">
              {e.role}
              <span className="text-muted"> · {e.company}</span>
            </h3>
            <p className="mt-2 text-[0.97rem] text-bone-dim">{e.summary}</p>
            <ul className="mt-4 space-y-2.5">
              {e.bullets.map((b, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-muted"
                >
                  <span className="mt-2 h-px w-3 shrink-0 bg-ember/60" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
