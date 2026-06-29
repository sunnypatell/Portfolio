import { ArrowLeft, ArrowRight } from "lucide-react";

// member of the Ontario Tech University student webring. prev/next hop to the
// neighbouring member sites; the ring keys off this site's registered domain, so
// `from` is hardcoded (no client JS, works server-rendered).
const RING = "https://otu-ring.com";
const FROM = "sunnypatel.net";

export function OtuWebring() {
  return (
    <div className="flex items-center gap-2.5 font-mono text-[0.7rem] text-muted">
      <a
        href={`${RING}/prev.html?from=${FROM}`}
        aria-label="Previous site in the Ontario Tech webring"
        className="group inline-flex px-1 transition-colors hover:text-ember"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
      </a>

      <a
        href={RING}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ontario Tech University student webring"
        title="Ontario Tech University student webring"
        className="inline-flex items-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/otu-ring.svg"
          alt=""
          className="h-4.5 w-auto opacity-55 transition-opacity hover:opacity-100"
        />
      </a>

      <a
        href={`${RING}/next.html?from=${FROM}`}
        aria-label="Next site in the Ontario Tech webring"
        className="group inline-flex px-1 transition-colors hover:text-ember"
      >
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
