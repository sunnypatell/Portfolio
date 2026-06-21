import Image from "next/image";
import { cn } from "@/lib/utils";

// a floating macOS/ScreenStudio-style window: traffic lights + url bar, deep
// soft shadow, optional ember pedestal glow so the shot reads as a hero object.
export function ProjectWindow({
  src,
  alt,
  url,
  className,
  priority,
  glow,
  objectPosition = "object-top",
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  priority?: boolean;
  glow?: boolean;
  objectPosition?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-ember/20 via-ember/5 to-transparent blur-3xl"
        />
      )}
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-float">
        <div className="flex items-center gap-1.5 border-b border-line bg-ink/50 px-3.5 py-2.5">
          <span aria-hidden className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
            <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
            <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
          </span>
          {url && (
            <span className="ml-3 truncate font-mono text-[0.65rem] text-muted">
              {url.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
            className={cn(
              "object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
              objectPosition
            )}
          />
        </div>
      </div>
    </div>
  );
}
