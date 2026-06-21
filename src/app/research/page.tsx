import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { RevealText } from "@/components/motion/reveal-text";
import { Reveal } from "@/components/ui/reveal";
import { GithubIcon, OrcidIcon } from "@/components/ui/icons";
import { CopyButton } from "@/components/ui/copy-button";
import { research } from "@/content/site";

export const metadata: Metadata = {
  title: research.title,
  description:
    "An independent research paper by Sunny Patel on the reliability of semantic caches for large language models: false hits, downstream cost, and calibration.",
  alternates: { canonical: "/research" },
  openGraph: {
    type: "article",
    title: `${research.title} · Sunny Patel`,
    description:
      "An independent, DOI-published research paper on the reliability of semantic caches for large language models.",
    url: "/research",
    images: [{ url: research.image, alt: research.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${research.title} · Sunny Patel`,
    images: [research.image],
  },
};

export default function ResearchPage() {
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
          <span className="text-ember tabular-nums">{research.year}</span>
          <span className="h-px w-6 bg-line" />
          <span className="text-muted">{research.byline}</span>
          <span className="h-px w-6 bg-line" />
          <span className="text-muted">{research.pages} pages</span>
        </div>

        <RevealText
          as="h1"
          className="mt-4 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.0] tracking-[-0.03em] text-bone sm:text-6xl"
        >
          {research.title}
        </RevealText>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim sm:text-xl">
          {research.subtitle}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-6 font-mono text-sm">
          <a
            href={research.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-ember transition-colors hover:text-ember-bright"
          >
            Read the paper
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href={research.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-bone"
          >
            <GithubIcon className="h-4 w-4" />
            Code and data
          </a>
        </div>
      </Container>

      <Container className="mt-14">
        <Reveal>
          <figure className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-line bg-white shadow-float">
            <div className="p-6 sm:p-8">
              <Image
                src={research.image}
                alt="Figure from the paper: cosine similarity cannot see meaning, and where a false hit is born"
                width={1040}
                height={540}
                sizes="(max-width: 1024px) 100vw, 56rem"
                className="w-full"
                priority
              />
            </div>
            <figcaption className="border-t border-black/10 px-6 py-3 font-mono text-[0.7rem] leading-relaxed text-black/55 sm:px-8">
              A figure from the paper, generated from code: a cache reuses an answer
              when two prompts look close, and a false hit is born when they look
              close but mean different things.
            </figcaption>
          </figure>
        </Reveal>
      </Container>

      <Container className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>abstract</Eyebrow>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-bone-dim">
            {research.summary}
          </p>
          <p className="mt-5 text-[0.97rem] leading-relaxed text-muted">
            {research.note}
          </p>
        </div>

        <div className="lg:border-l lg:border-line lg:pl-12">
          <Eyebrow>key findings</Eyebrow>
          <ul className="mt-5 space-y-3">
            {research.findings.map((f, i) => (
              <li
                key={i}
                className="flex gap-3 text-[0.95rem] leading-relaxed text-bone-dim"
              >
                <span className="mt-2 h-px w-3 shrink-0 bg-ember/60" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="mt-16">
        <div className="rounded-xl border border-line bg-surface/40 p-6 sm:p-8">
          <Eyebrow>cite this work</Eyebrow>

          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-line bg-ink/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                  APA
                </span>
                <CopyButton text={research.citation} label="Copy" />
              </div>
              <p className="mt-2.5 select-all font-mono text-[0.8rem] leading-relaxed text-bone-dim">
                {research.citation}
              </p>
            </div>

            <div className="rounded-lg border border-line bg-ink/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                  BibTeX
                </span>
                <CopyButton text={research.bibtex} label="Copy" />
              </div>
              <pre className="mt-2.5 select-all overflow-x-auto font-mono text-[0.72rem] leading-relaxed text-bone-dim">
                {research.bibtex}
              </pre>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
            <a
              href={research.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-ember transition-colors hover:text-ember-bright"
            >
              DOI: 10.5281/zenodo.20532711
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={research.orcid}
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

      <Container className="mt-24 border-t border-line pt-10">
        <Link
          href="/projects"
          className="group flex items-center justify-between gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Back to
          </span>
          <span className="inline-flex items-center gap-2 font-display text-xl font-semibold text-bone transition-colors group-hover:text-ember sm:text-2xl">
            All projects
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </Container>
    </div>
  );
}
