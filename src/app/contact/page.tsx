import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { RevealText } from "@/components/motion/reveal-text";
import { Magnetic } from "@/components/motion/magnetic";
import { ContactForm } from "@/components/ui/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { profile } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sunny Patel, a software developer at IBM (watsonx Workshop) in the Greater Toronto Area. Email, LinkedIn, or the contact form all reach me directly.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-dvh items-center pt-32 pb-24">
      <Container className="w-full">
        <Eyebrow>contact</Eyebrow>
        <RevealText
          as="h1"
          className="mt-6 font-display text-[3rem] font-semibold leading-[0.95] tracking-[-0.03em] text-bone sm:text-[4.2rem]"
        >
          Let&apos;s build something.
        </RevealText>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="max-w-md text-lg leading-relaxed text-bone-dim">
              Open to new-grad roles and hard problems. The fastest way to reach
              me is right here.
            </p>

            <div className="mt-9">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-3 font-display text-xl text-bone transition-colors hover:text-ember sm:text-2xl"
                >
                  <Mail className="h-5 w-5 text-ember" />
                  {profile.email}
                </a>
              </Magnetic>
            </div>

            <ul className="mt-10 space-y-3 font-mono text-sm">
              <li>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile, opens in a new tab"
                  className="group inline-flex items-center gap-3 text-bone transition-colors hover:text-ember"
                >
                  <GithubIcon className="h-4 w-4 text-muted transition-colors group-hover:text-ember" />
                  github.com/sunnypatell
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile, opens in a new tab"
                  className="group inline-flex items-center gap-3 text-bone transition-colors hover:text-ember"
                >
                  <LinkedinIcon className="h-4 w-4 text-muted transition-colors group-hover:text-ember" />
                  Sunny Patel
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-muted">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </li>
            </ul>

            <div className="mt-12" aria-hidden>
              <Image
                src="/assets/contact-bitmoji.webp"
                alt=""
                width={320}
                height={320}
                className="float-bob w-36 select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)] sm:w-44"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
