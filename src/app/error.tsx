"use client";

import Link from "next/link";
import { Container, ctaClass } from "@/components/ui/primitives";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-dvh items-center pt-32 pb-24">
      <Container>
        <div className="font-mono text-sm text-ember">error</div>
        <h1 className="mt-4 max-w-2xl font-display text-[2.4rem] font-semibold leading-[1.04] tracking-tight text-bone sm:text-5xl">
          Something broke on my end.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-bone-dim">
          A quick retry usually sorts it out. If it keeps happening, the link in
          the footer always works.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className={ctaClass}
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-1 py-3 font-mono text-sm text-muted transition-colors hover:text-bone"
          >
            Back home
          </Link>
        </div>
      </Container>
    </div>
  );
}
