import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { profile } from "@/content/site";
import "./globals.css";

// geist for display + mono, hanken for body warmth
const display = Geist({
  variable: "--font-display-src",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-src",
  subsets: ["latin"],
  display: "swap",
});

const body = Hanken_Grotesk({
  variable: "--font-body-src",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.sunnypatel.net";
const description =
  "Sunny Patel is a software developer who works the whole stack, from real-time web apps to the systems and infrastructure underneath. Honours CS at Ontario Tech.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sunny Patel · Software Developer",
    template: "%s · Sunny Patel",
  },
  description,
  keywords: [
    "Sunny Patel",
    "Sunny Jayendra Patel",
    "Sunny J Patel",
    "Software Developer",
    "Full-stack",
    "Systems",
    "Cloud",
    "React",
    "Three.js",
    "Ontario Tech",
  ],
  authors: [{ name: "Sunny Patel", url: siteUrl }],
  creator: "Sunny Patel",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "en_US",
    title: "Sunny Patel · Software Developer",
    description:
      "A developer across the whole stack, from real-time web to the infrastructure underneath.",
    siteName: "Sunny Patel",
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
    title: "Sunny Patel · Software Developer",
    description:
      "A developer across the whole stack, from real-time web to the infrastructure underneath.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0f",
  colorScheme: "dark",
};

// structured data so an already-indexed personal brand can surface a rich result
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Sunny Patel",
      alternateName: ["Sunny Jayendra Patel", "Sunny J Patel"],
      url: siteUrl,
      jobTitle: "Software Developer",
      email: profile.email,
      description,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Ontario Tech University",
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Ontario",
        addressCountry: "CA",
      },
      image: `${siteUrl}/assets/portrait.jpg`,
      sameAs: [profile.socials.github, profile.socials.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Sunny Patel",
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      style={{ backgroundColor: "#0b0d0f" }}
      className={`${display.variable} ${mono.variable} ${body.variable}`}
    >
      <body className="min-h-dvh font-body antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
