"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Container, ctaClass } from "@/components/ui/primitives";
import { reloadOnStaleChunk } from "@/lib/chunk-reload";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => reloadOnStaleChunk(error), [error]);

  return (
    <div className="flex min-h-dvh items-center pt-32 pb-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="font-mono text-sm text-ember">error</div>
            <h1 className="mt-4 max-w-2xl font-display text-[2.4rem] font-semibold leading-[1.04] tracking-tight text-bone sm:text-5xl">
              Something broke on my end.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-bone-dim">
              A quick retry usually sorts it out. If it keeps happening, the link
              in the footer always works.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => retry()} className={ctaClass}>
                Try again
              </button>
              <Link
                href="/"
                className="px-1 py-3 font-mono text-sm text-muted transition-colors hover:text-bone"
              >
                Back home
              </Link>
            </div>
          </div>
          <div className="order-first flex justify-center lg:order-none lg:justify-end">
            <Image
              src="/assets/error-bitmoji.webp"
              alt=""
              aria-hidden
              width={697}
              height={587}
              priority
              className="float-bob h-auto w-52 select-none drop-shadow-[0_14px_34px_rgba(0,0,0,0.5)] sm:w-64"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
