import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, ctaClass } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center pt-32 pb-24">
      <Container className="grid items-center gap-10 sm:grid-cols-[1.3fr_0.7fr] sm:gap-12">
        <div>
          <div className="font-mono text-sm text-ember">404</div>
          <h1 className="mt-4 max-w-2xl font-display text-[2.4rem] font-semibold leading-[1.04] tracking-tight text-bone sm:text-5xl">
            This route isn&apos;t in the build.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-bone-dim">
            The page you wanted moved, or never existed. Let&apos;s get you back to
            something real.
          </p>

          <div className="mt-8 max-w-sm rounded-[var(--radius)] border border-line bg-surface/60 p-4 font-mono text-[0.78rem] leading-relaxed">
            <div className="text-bone">$ cd /requested-page</div>
            <div className="text-muted">bash: no such file or directory</div>
            <div className="text-ember">→ returning home</div>
          </div>

          <Link
            href="/"
            className={`${ctaClass} mt-8`}
          >
            Back home
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="order-first sm:order-last">
          <Image
            src="/assets/thinking-bitmoji.webp"
            alt="Sunny, thinking it over"
            width={300}
            height={300}
            className="mx-auto w-40 select-none sm:w-full sm:max-w-[280px]"
            priority
          />
        </div>
      </Container>
    </div>
  );
}
