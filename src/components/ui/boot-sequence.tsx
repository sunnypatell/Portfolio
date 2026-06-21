"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

const SCRIPT = [
  { t: "$ boot --profile sunny", c: "text-bone" },
  { t: "  interface ............. ok", c: "text-muted" },
  { t: "  application ........... ok", c: "text-muted" },
  { t: "  systems ............... ok", c: "text-muted" },
  { t: "  infrastructure ........ ok", c: "text-muted" },
  { t: "→ all layers online", c: "text-ember" },
];
const STARTS = SCRIPT.reduce<number[]>((arr, l, i) => {
  arr.push(i === 0 ? 0 : arr[i - 1] + SCRIPT[i - 1].t.length);
  return arr;
}, []);
const TOTAL = STARTS[STARTS.length - 1] + SCRIPT[SCRIPT.length - 1].t.length;

// a looping typewriter. all rows are always present (reserved height) so the
// animation never shifts page layout. decorative -> aria-hidden.
export function BootSequence() {
  const reduce = usePrefersReducedMotion();
  const [typed, setTyped] = useState(reduce ? TOTAL : 0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) {
      setTyped(TOTAL);
      return;
    }
    let n = 0;
    setTyped(0);
    let restart: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= TOTAL) {
        clearInterval(id);
        restart = setTimeout(() => setCycle((c) => c + 1), 2800);
      }
    }, 34);
    return () => {
      clearInterval(id);
      clearTimeout(restart);
    };
  }, [reduce, cycle]);

  return (
    <div
      aria-hidden
      className="grain w-full max-w-sm rounded-[var(--radius)] border border-line bg-surface/60 p-4 font-mono text-[0.72rem] leading-relaxed shadow-panel backdrop-blur-sm"
    >
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#262b30]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#262b30]" />
        <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
        <span className="ml-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted">
          session
        </span>
      </div>
      <div className="overflow-hidden">
        {SCRIPT.map((line, i) => {
          const start = STARTS[i];
          const vis = Math.max(0, Math.min(typed - start, line.t.length));
          const active = typed >= start && typed <= start + line.t.length;
          return (
            <div
              key={i}
              className={cn(
                "h-[1.45em] overflow-hidden whitespace-pre leading-[1.45em]",
                line.c
              )}
            >
              {line.t.slice(0, vis)}
              {active && vis < TOTAL && (
                <span className="ml-px inline-block h-3 w-[0.5ch] animate-pulse bg-ember align-middle" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
