import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { Container, Eyebrow, ctaClass } from "@/components/ui/primitives";
import { profile } from "@/content/site";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Sunny Patel's resume: software developer at IBM, with full-stack, systems, and cloud work plus shipped projects. View it here or download the PDF.",
  alternates: { canonical: "/resume" },
};

// rendered page images, so it reads perfectly on every device (mobile inline-pdf
// is unreliable). the real pdf is one tap away, named so shares show the right file.
const PAGES = ["/assets/resume-1.webp", "/assets/resume-2.webp"];

export default function ResumePage() {
  return (
    <div className="pt-32 pb-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>résumé</Eyebrow>
            <h1 className="mt-6 font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.03em] text-bone sm:text-5xl">
              Sunny Patel
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-bone-dim">
              Software developer across the full stack. The full document is below,
              and the PDF is one tap away.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 font-mono text-sm">
            <a
              href={profile.resumeFile}
              download
              className={ctaClass}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <a
              href={profile.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-bone"
            >
              Open in new tab
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-[840px] flex-col gap-8">
          {PAGES.map((src, i) => (
            <div
              key={src}
              className="overflow-hidden rounded-lg border border-line bg-white shadow-float"
            >
              <Image
                src={src}
                alt={`Sunny Patel resume, page ${i + 1}`}
                width={1428}
                height={1848}
                sizes="(max-width: 880px) 100vw, 840px"
                className="w-full"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
