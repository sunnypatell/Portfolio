import { cn } from "@/lib/utils";

// the one ember call-to-action style; import this instead of re-typing the classes
export const ctaClass =
  "group inline-flex items-center gap-2 rounded-md border border-ember/50 bg-ember/10 px-5 py-3 font-mono text-sm text-bone transition-colors duration-300 hover:border-ember hover:bg-ember/20";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-10", className)}>
      {children}
    </div>
  );
}

// mono eyebrow with optional stack-descent index + hairline tick
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted",
        className
      )}
    >
      {index && <span className="text-ember tabular-nums">{index}</span>}
      <span className="h-px w-7 bg-line" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-balance text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-bone sm:text-[2.75rem]",
        className
      )}
    >
      {children}
    </h2>
  );
}
