import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/ui/reveal";
import { ExperienceSpotlight } from "@/components/work/experience-spotlight";
import { education, certifications } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Sunny Patel's experience across product engineering, IT, and infrastructure.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="pt-32">
      <Container>
        <Eyebrow>experience</Eyebrow>
        <RevealText
          as="h1"
          className="mt-6 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.03] tracking-[-0.025em] text-bone sm:text-5xl"
        >
          Building products, and keeping the systems under them alive.
        </RevealText>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
          A few years spread across product engineering, IT, and the
          infrastructure most people never think about.
        </p>
      </Container>

      <Container className="mt-14">
        <h2 className="sr-only">Experience</h2>
        <ExperienceSpotlight />
      </Container>

      <Container className="mt-20 grid gap-12 border-t border-line pt-14 pb-28 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>education</Eyebrow>
          <h2 className="mt-5 font-display text-xl font-semibold text-bone">
            {education.program}
          </h2>
          <p className="mt-1.5 font-mono text-sm text-muted">
            {education.school} · {education.start}–{education.end} ·{" "}
            {education.location}
          </p>
          <ul className="mt-5 space-y-2.5">
            {education.points.map((p) => (
              <li
                key={p}
                className="flex gap-3 text-[0.95rem] leading-relaxed text-bone-dim"
              >
                <span className="mt-2 h-px w-3 shrink-0 bg-ember/60" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.06}>
          <Eyebrow>certifications</Eyebrow>
          <ul className="mt-5 border-t border-line">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3"
              >
                <div className="text-[0.95rem] text-bone">
                  {c.name}
                  <span className="ml-2 font-mono text-xs text-muted">
                    · {c.issuer}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2.5 font-mono text-xs text-muted">
                  {c.date}
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ember transition-colors hover:text-ember-bright"
                      aria-label={`${c.name} credential`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}
