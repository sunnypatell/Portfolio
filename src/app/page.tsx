import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Container, Eyebrow, SectionHeading, ctaClass } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ProjectWindow } from "@/components/ui/project-window";
import { ActivePill } from "@/components/ui/project-signals";
import { Magnetic } from "@/components/motion/magnetic";
import { projects, capabilities, experiences } from "@/content/site";

const WEB = ["ats-screener", "axelot", "netdash"];
const FEATURED_ORDER = ["ats-screener", "sunnify", "netdash"];

export default function Home() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => FEATURED_ORDER.indexOf(a.slug) - FEATURED_ORDER.indexOf(b.slug));
  return (
    <>
      <Hero />

      <section className="border-t border-line/60 py-24 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>selected work</Eyebrow>
              <SectionHeading className="mt-5 max-w-xl">
                Things people actually use.
              </SectionHeading>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-ember"
            >
              All projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/projects/${p.slug}`} className="group block">
                  <ProjectWindow
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    url={WEB.includes(p.slug) ? p.links.live : undefined}
                  />
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-bone transition-colors group-hover:text-ember">
                      {p.name}
                    </h3>
                    <span className="font-mono text-xs text-muted">{p.year}</span>
                  </div>
                  <p className="mt-1 text-bone-dim">{p.tagline}</p>
                  {p.active && (
                    <div className="mt-2.5">
                      <ActivePill />
                    </div>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line/60 py-24 sm:py-32">
        <Container>
          <Eyebrow>what I do</Eyebrow>
          <div className="mt-10 border-t border-line">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="grid gap-3 border-b border-line py-7 md:grid-cols-[1fr_1.8fr] md:gap-10">
                  <h2 className="flex items-baseline gap-3 font-display text-lg font-semibold text-bone">
                    <span className="font-mono text-xs text-ember tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c.title}
                  </h2>
                  <p className="text-[0.97rem] leading-relaxed text-bone-dim">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line/60 py-24 sm:py-32">
        <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>currently</Eyebrow>
            <h2 className="mt-5 max-w-xl font-display text-2xl font-semibold tracking-tight text-bone sm:text-3xl">
              {experiences[0].role} at {experiences[0].company}.
            </h2>
            <p className="mt-3 max-w-md text-bone-dim">{experiences[0].summary}</p>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-ember"
          >
            See the full path
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Container>
      </section>

      <section className="border-t border-line/60 py-28 sm:py-36">
        <Container className="text-center">
          <Reveal>
            <SectionHeading className="mx-auto max-w-2xl">
              Have something worth building?
            </SectionHeading>
          </Reveal>
          <p className="mx-auto mt-5 max-w-md text-bone-dim">
            Open to new-grad roles and problems worth the effort.
          </p>
          <div className="mt-9 flex justify-center">
            <Magnetic>
              <Link
                href="/contact"
                className={ctaClass}
              >
                Get in touch
              </Link>
            </Magnetic>
          </div>
        </Container>
      </section>
    </>
  );
}
