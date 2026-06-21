import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import { about, skills } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Sunny Patel: a software developer who likes the whole problem.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-28">
      <Container>
        <Eyebrow>about</Eyebrow>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="group/portrait relative w-full max-w-[320px]">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-2.5 -z-10 rounded-[1.5rem] bg-gradient-to-tr from-ember/45 via-ember/20 to-ember/5 opacity-80 blur-2xl transition-opacity duration-500 group-hover/portrait:opacity-100"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius)] border border-ember/40">
                <Image
                  src="/assets/portrait.webp"
                  alt="Sunny Patel"
                  fill
                  priority
                  sizes="320px"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <dl className="mt-8 max-w-[320px] border-t border-line font-mono text-sm">
              {about.facts.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                >
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                    {f.k}
                  </dt>
                  <dd className="text-right text-bone">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <RevealText
              as="h1"
              className="max-w-2xl font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-bone sm:text-[2.6rem]"
            >
              {about.lead}
            </RevealText>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-bone-dim">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p>
                    <RichText text={p} />
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-12">
              <Eyebrow>now</Eyebrow>
              <ul className="mt-4 space-y-2.5">
                {about.now.map((n) => (
                  <li
                    key={n}
                    className="flex gap-3 text-[0.97rem] leading-relaxed text-bone-dim"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-ember/60" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-line pt-14">
          <Eyebrow>tools I reach for</Eyebrow>
          <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((g) => (
              <div key={g.group}>
                <h2 className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-bone">
                  <span className="h-px w-4 bg-ember" />
                  {g.group}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2 font-mono text-[0.78rem]">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-sm bg-surface px-2.5 py-1 text-bone-dim"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
