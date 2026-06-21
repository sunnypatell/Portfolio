import type { Project } from "@/content/site";
import { LiveUserCount } from "@/components/ui/live-user-count";
import { cn } from "@/lib/utils";

// "by the numbers" strip: durable traction metrics + live shields.io badges.
// badges use a plain <img> on purpose (remote, live-updating, no next/image config).
export function ProjectSignals({
  metrics,
  badges,
  className,
}: {
  metrics?: Project["metrics"];
  badges?: Project["badges"];
  className?: string;
}) {
  if (!metrics?.length && !badges?.length) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-x-7 gap-y-4", className)}>
      {metrics?.map((m) => {
        const inner = (
          <>
            <span className="font-display text-2xl font-semibold text-bone transition-colors group-hover/metric:text-ember">
              {m.live ? <LiveUserCount fallback={m.value} /> : m.value}
            </span>
            {m.live && <LiveDot />}
            <span className="font-mono text-xs text-muted">{m.label}</span>
          </>
        );
        return m.href ? (
          <a
            key={m.label}
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/metric flex items-baseline gap-1.5"
          >
            {inner}
          </a>
        ) : (
          <div key={m.label} className="flex items-baseline gap-1.5">
            {inner}
          </div>
        );
      })}
      {badges?.map((b) => (
        <a key={b.alt} href={b.href} target="_blank" rel="noopener noreferrer" className="inline-flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.src} alt={b.alt} className="h-[1.35rem]" />
        </a>
      ))}
    </div>
  );
}

// a single pulsing green status light reads as "live" on its own; the word "LIVE"
// next to "users served" both clutters and misreads as "2,044 live users". dot + tooltip only.
function LiveDot() {
  return (
    <span
      className="relative -ml-0.5 inline-flex h-[7px] w-[7px] self-center"
      title="Live count, updated in real time"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
      <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-400 ring-2 ring-emerald-400/15" />
      <span className="sr-only">live</span>
    </span>
  );
}

// small pulsing dot + label for projects still shipping releases today.
export function ActivePill() {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ember">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
      </span>
      Actively maintained
    </span>
  );
}
