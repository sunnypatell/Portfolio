import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/motion/parallax";
import { ProjectWindow } from "@/components/ui/project-window";
import { RichText } from "@/components/ui/rich-text";
import { ProjectSignals, ActivePill } from "@/components/ui/project-signals";
import { GithubIcon, OrcidIcon } from "@/components/ui/icons";
import { CopyButton } from "@/components/ui/copy-button";
import { projects } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.oneLiner,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      type: "article",
      title: `${p.name} · Sunny Patel`,
      description: p.oneLiner,
      url: `/projects/${p.slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 2560,
          height: 1280,
          alt: "Sunny Patel, I build the whole stack, from the screen to the silicon",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} · Sunny Patel`,
      description: p.oneLiner,
      images: ["/og-image.png"],
    },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const paras = p.detail.split(/\n\n+/);

  return (
    <div className="pt-28 pb-28">
      <Container>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-bone"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          All projects
        </Link>

        <div className="mt-9 flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="text-ember tabular-nums">{p.year}</span>
          <span className="h-px w-6 bg-line" />
          <span className="text-muted">{p.tagline}</span>
          {p.active && (
            <>
              <span className="h-px w-6 bg-line" />
              <ActivePill />
            </>
          )}
        </div>

        <RevealText
          as="h1"
          className="mt-4 font-display text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.03em] text-bone sm:text-6xl"
        >
          {p.name}
        </RevealText>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim sm:text-xl">
          {p.oneLiner}
        </p>

        <div className="mt-7 flex items-center gap-6 font-mono text-sm">
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-ember transition-colors hover:text-ember-bright"
            >
              Live
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
          {p.links.repo && (
            <a
              href={p.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={
                p.links.live
                  ? "inline-flex items-center gap-1.5 text-muted transition-colors hover:text-bone"
                  : "inline-flex items-center gap-1.5 text-ember transition-colors hover:text-ember-bright"
              }
            >
              <GithubIcon className="h-4 w-4" />
              Source
            </a>
          )}
          {p.links.docs && (
            <a
              href={p.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-bone"
            >
              Docs
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>

        <ProjectSignals metrics={p.metrics} badges={p.badges} className="mt-9" />
      </Container>

      <Container className="mt-14">
        <div className="mx-auto max-w-[980px]">
          <Reveal>
            <Parallax speed={0.96}>
              <ProjectWindow
                src={p.image}
                alt={`${p.name} screenshot`}
                url={
                  ["ats-screener", "axelot", "netdash"].includes(p.slug)
                    ? p.links.live
                    : undefined
                }
                objectPosition={p.slug === "knifethrow" ? "object-center" : undefined}
                glow
                priority
              />
            </Parallax>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-16 grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        <div className="space-y-5 text-[1.05rem] leading-relaxed text-bone-dim">
          {paras.map((para, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <p>
                <RichText text={para} />
              </p>
            </Reveal>
          ))}
        </div>

        <div className="lg:border-l lg:border-line lg:pl-12">
          <Eyebrow>highlights</Eyebrow>
          <ul className="mt-5 space-y-3">
            {p.highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-3 text-[0.95rem] leading-relaxed text-bone-dim"
              >
                <span className="mt-2 h-px w-3 shrink-0 bg-ember/60" />
                <span>
                  <RichText text={h} />
                </span>
              </li>
            ))}
          </ul>

          <Eyebrow className="mt-10">built with</Eyebrow>
          <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[0.78rem]">
            {p.stack.map((s) => (
              <li
                key={s}
                className="rounded-sm bg-surface px-2.5 py-1 text-bone-dim"
              >
                {s}
              </li>
            ))}
          </ul>

          {p.team && (
            <>
              <Eyebrow className="mt-10">team</Eyebrow>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-bone-dim">
                {p.team}
              </p>
            </>
          )}
        </div>
      </Container>

      {p.cite && (
        <Container className="mt-16">
          <div className="rounded-xl border border-line bg-surface/40 p-6 sm:p-8">
            <Eyebrow>cite this work</Eyebrow>

            <div className="mt-5 space-y-4">
              <div className="rounded-lg border border-line bg-ink/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                    APA
                  </span>
                  <CopyButton text={p.cite.apa} label="Copy" />
                </div>
                <p className="mt-2.5 select-all break-words font-mono text-[0.8rem] leading-relaxed text-bone-dim">
                  {p.cite.apa}
                </p>
              </div>

              <div className="rounded-lg border border-line bg-ink/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                    BibTeX
                  </span>
                  <CopyButton text={p.cite.bibtex} label="Copy" />
                </div>
                <pre className="mt-2.5 select-all overflow-x-auto font-mono text-[0.72rem] leading-relaxed text-bone-dim">
                  {p.cite.bibtex}
                </pre>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
              <a
                href={p.cite.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-ember transition-colors hover:text-ember-bright"
              >
                DOI: {p.cite.doiLabel}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={p.cite.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-bone"
              >
                <OrcidIcon className="h-4 w-4" />
                ORCID
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Container>
      )}

      <Container className="mt-24 border-t border-line pt-10">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-center justify-between gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Next project
          </span>
          <span className="inline-flex items-center gap-2 font-display text-xl font-semibold text-bone transition-colors group-hover:text-ember sm:text-2xl">
            {next.name}
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </Container>
    </div>
  );
}
