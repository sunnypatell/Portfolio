import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { research } from "@/content/site";

// a distinct "paper" card (not a project window): light figure panel + dark copy,
// opens the tailored /research case study. lazy pdf stays one click deeper.
export function ResearchCard() {
  return (
    <Link
      href="/research"
      className="group block overflow-hidden rounded-xl border border-line bg-ink-2 transition-colors hover:bg-surface"
    >
      <div className="grid sm:grid-cols-[0.85fr_1.15fr]">
        <div className="flex items-center justify-center bg-white p-5 sm:p-7">
          <Image
            src={research.image}
            alt="Figure from the paper"
            width={1040}
            height={540}
            sizes="(max-width: 640px) 100vw, 40vw"
            className="w-full"
          />
        </div>
        <div className="p-6 sm:p-8">
          <div className="font-mono text-xs text-ember">
            Independent research · {research.year}
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-bone transition-colors group-hover:text-ember sm:text-2xl">
            {research.title}
          </h3>
          <p className="mt-2 font-mono text-xs text-muted">
            {research.byline} · {research.pages} pages
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-bone-dim">
            {research.subtitle}. A preregistered, fully reproducible study, written,
            run, and typeset solo.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-ember">
            Read the case study
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
