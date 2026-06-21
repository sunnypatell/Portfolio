// single source of truth. copy is researched against the real repos + live sites
// and fact-checked: portfolio voice, irrejectable, 100% true. no em dashes.

export const profile = {
  name: "Sunny Patel",
  role: "Software Developer",
  location: "Greater Toronto Area, Canada",
  email: "sunnypatel124555@gmail.com",
  phoneDisplay: "(437) 216-1611",
  phoneHref: "+14372161611",
  resume: "/resume",
  resumeFile: "/Sunny-Patel-Resume.pdf",
  socials: {
    github: "https://github.com/sunnypatell",
    linkedin: "https://www.linkedin.com/in/sunny-patel-30b460204/",
    website: "https://www.sunnypatel.net/",
  },
  status: {
    label: "Software Developer Intern",
    org: "IBM",
    note: "watsonx Workshop",
    available: "Open to software roles",
  },
  headline: ["I build the whole stack,", "from the screen to the silicon."],
  intro:
    "I build full-stack software **people actually use**, and I understand it **the whole way down**, to the systems most apps just sit on top of. Give me the hardest problem in your stack, the one that has to hold, and I'll **own it end to end**.",
} as const;

export const about = {
  lead: "I build software at every layer it lives on, from the screen people touch to the systems running quietly underneath.",
  paragraphs: [
    "I'm the developer you hand **the problem you're afraid to break**. Most of what I build is the thing other people lean on, so I learned early to ask the unglamorous question first: what happens when this is under real load, at 3am, with nobody watching. Four years in, I've shipped polished products people actually use and stayed with them long after launch, still cutting updates for tools I built years ago, long after anyone asked me to, because people quietly came to depend on them. **I don't ship and walk away**, because someone is counting on it to still be there next week.",
    "That instinct came from carrying the parts most product developers never touch: the directories, networks, and automation a company quietly assumes will always work. I spent years living in that invisible layer, the one where doing the job perfectly means nobody ever knows you exist, and the only signal you get is silence when it holds and everything on fire the moment it doesn't. I automated the tedious parts until they ran themselves, and I learned what it really costs when that layer gives out and people suddenly can't work. Once you have been on the hook like that, deployment and failure and scale stop being someone else's job further down the line and become how you design from the first line. So when I tell you something will hold, **it isn't optimism**. It's having owned **the layer underneath**, and building everything above it knowing what breaks down there first.",
  ],
  now: [
    "Building full-stack AI features on watsonx Workshop at IBM",
    "Going deeper on low-level systems programming, closer to the hardware",
    "Finishing Honours CS at Ontario Tech (President's List, Dean's Honours)",
  ],
  facts: [
    { k: "Based in", v: "Greater Toronto Area" },
    { k: "Currently", v: "Software Developer Intern at IBM (watsonx Workshop)" },
    { k: "Studying", v: "Honours CS, Ontario Tech" },
    { k: "Focus", v: "Full-stack, cloud, systems" },
  ],
} as const;

export const capabilities = [
  {
    title: "Product engineering",
    body: "Real-time, type-safe web apps people use every day, taken from first pixel to production.",
  },
  {
    title: "Systems & infrastructure",
    body: "Directories, networks, and automation kept reliable at scale, including a 3,000+ object M&A cutover with zero downtime.",
  },
  {
    title: "Cloud & delivery",
    body: "Docker and Kubernetes, CI/CD, and the automation that moves work from my machine to production safely and repeatably.",
  },
] as const;

export type Experience = {
  company: string;
  role: string;
  location: string;
  mode: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    company: "IBM",
    role: "Software Developer Intern",
    location: "Markham, ON",
    mode: "Hybrid",
    start: "Jan 2026",
    end: "Present",
    current: true,
    summary: "Full-stack engineering on watsonx Workshop at IBM.",
    bullets: [
      "Building full-stack features on watsonx Workshop, across the interface and the services behind it.",
    ],
  },
  {
    company: "Canada's Wonderland",
    role: "IT Technician",
    location: "Vaughan, ON",
    mode: "On-site",
    start: "Jun 2023",
    end: "Jan 2026",
    summary:
      "Kept the devices, networks, and accounts running at Canada's largest theme park, and automated the tedious parts.",
    bullets: [
      "Helped migrate 3,000+ directory objects during the Six Flags acquisition (hybrid Azure AD and on-prem), with no service interruption for users.",
      "Wrote 10+ automation scripts that set up new computers and user accounts by themselves.",
      "Managed company-wide accounts, access, and security policies across email, file shares, and internal apps.",
      "Configured the phone and call-center systems, and kept the network healthy day to day.",
    ],
  },
  {
    company: "Mackenzie Health",
    role: "System Support Specialist",
    location: "Richmond Hill, ON",
    mode: "On-site",
    start: "Jan 2023",
    end: "Aug 2023",
    summary: "Rolled out and supported the bedside tablets patients use across the hospital.",
    bullets: [
      "Moved 400+ tablets to secure, centrally-managed iPads across hospital units.",
      "Built an internal admin tool for managing app access and user roles.",
      "Set up real-time voice communication for ER and nursing staff.",
    ],
  },
];

export const education = {
  school: "Ontario Tech University",
  program: "Honours BSc, Computer Science",
  location: "Oshawa, ON",
  start: "2022",
  end: "Present",
  points: ["President's List, Winter 2025", "Dean's Honours List, Fall 2024"],
} as const;

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  oneLiner: string;
  summary: string;
  detail: string;
  highlights: string[];
  stack: string[];
  links: { live?: string; repo?: string; docs?: string };
  image: string;
  featured: boolean;
  year: string;
  team?: string; // shown when the build was genuinely shared. solo projects omit it.
  active?: boolean; // still shipping releases / commits today
  metrics?: { value: string; label: string; href?: string; live?: boolean }[]; // durable traction stats; live pulls the real number
  badges?: { src: string; alt: string; href: string }[]; // live shields.io badges
};

export const projects: Project[] = [
  {
    slug: "ats-screener",
    name: "ATS Screener",
    tagline: "Your resume vs. 6 real enterprise ATS engines",
    oneLiner:
      "A free, open-source resume scanner that shows how Workday, Taleo, iCIMS, Greenhouse, Lever, and SuccessFactors each parse, filter, and score your resume.",
    summary:
      "Most free ATS checkers hand you one invented score and paywall the rest. ATS Screener returns six honest scores from six real enterprise platforms, each modeling that vendor's own parser strictness, keyword strategy, and calibrated thresholds. Your resume is parsed entirely in your browser and never uploaded; only the extracted text is sent for AI scoring. A live counter has tracked 2,000+ people through it.",
    detail: `Most free ATS checkers give you one invented number and lock the rest behind a paywall. ATS Screener does the honest, harder thing: it returns [six separate scores from six real enterprise platforms](https://ats-screener.vercel.app/docs/platforms/overview/), each tuned to how that vendor actually parses, filters, and ranks a resume.

Resumes (PDF or DOCX) are parsed fully client-side in a Web Worker with [\`pdfjs-dist\`](https://github.com/mozilla/pdf.js) and [\`mammoth\`](https://github.com/mwilliamson/mammoth.js), so the file itself never leaves the browser, only the extracted text is sent on. A custom NLP layer (tokenizer, TF-IDF, synonyms, and a multi-industry skills taxonomy) pulls sections, skills, and dates out of raw text.

A deterministic rule engine then scores against all six platform profiles, weighting formatting, keyword match, sections, experience, education, and quantification, plus per-platform quirks, and switching between exact, fuzzy, and semantic keyword matching to mirror how each real system behaves. On top of it sits a cross-provider LLM chain, [Gemma 3 27B](https://ai.google.dev/gemma/docs/core) on Google falling back to [Llama 3.3 70B](https://console.groq.com/docs/models) on Groq, with the rule engine as a final fallback so the app keeps working even when every model provider is down.

Auth and storage adapt to where it runs: Firebase and Firestore for the hosted build, anonymous localStorage for self-hosters, or on-prem LDAP and Active Directory. A live, Firestore-backed counter on the landing page has tracked **more than 2,000 people** through it so far, and the full behavior is written up in its own [documentation site](https://ats-screener.vercel.app/docs).`,
    highlights: [
      "Six platform profiles with [their own weights and thresholds](https://ats-screener.vercel.app/docs/scoring/methodology/); literal matching for Taleo, semantic for Greenhouse and Lever",
      "Web Worker parsing (`pdfjs-dist`, `mammoth`) keeps the file on-device, only the extracted text is sent",
      "Cross-provider AI chain (Gemma 3 27B, Llama 3.3 70B, rule-engine fallback) behind a prompt cache and per-IP rate limiting",
      "Hand-built NLP instead of a paid parser: tokenizer, TF-IDF, synonyms, multi-industry skills taxonomy",
      "One codebase, three zero-cost deploys: Firebase, anonymous localStorage, or on-prem [Active Directory](https://ats-screener.vercel.app/docs/self-hosting/active-directory/)",
    ],
    stack: ["SvelteKit", "TypeScript", "pdfjs-dist", "mammoth", "Custom NLP", "Gemma 3 27B", "Llama 3.3 70B", "Firebase", "Firestore", "Astro Starlight"],
    links: {
      live: "https://ats-screener.vercel.app",
      repo: "https://github.com/sunnypatell/ats-screener",
      docs: "https://ats-screener.vercel.app/docs",
    },
    image: "/assets/shots/ats-screener.webp",
    featured: true,
    year: "2026",
    active: true,
    metrics: [
      { value: "2,000+", label: "users served", href: "https://ats-screener.vercel.app", live: true },
      { value: "6", label: "real ATS engines" },
    ],
  },
  {
    slug: "axelot",
    name: "Axelot",
    tagline: "Conflict-free real-time docs for developers",
    oneLiner:
      "A real-time collaborative writing platform where developers co-edit rich technical documents with live cursors, AI assistance, and one-click publishing.",
    summary:
      "Axelot lets developers co-edit technical documents in real time and publish them as a public portfolio. A full TipTap editor (tables, KaTeX, Mermaid, syntax-highlighted code) is bound to a Yjs CRDT and synced peer-to-peer over WebRTC, with Firestore for durable snapshots. Multi-provider auth, in-editor AI, and a scheduled trending feed round it out.",
    detail: `Most collaborative editors either lock you into one vendor or break the moment two people type at once. Axelot does the hard version: many writers editing the same technical document at the same time, conflict-free, with live presence.

A [TipTap](https://tiptap.dev/docs) rich-text editor is bound to a [Yjs](https://docs.yjs.dev) CRDT so concurrent edits converge on their own. Documents sync directly between browsers over a [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) peer mesh, with Firestore holding durable snapshots and metadata, keeping live editing fast while still persisting state.

The hard part is the seams. NextAuth handles Google, GitHub, and bcrypt-hashed email/password sign-in with Zod validation and enforced email verification, then mints a Firebase custom token server-side into the session so the browser can talk to Firestore securely. A trending feed blends logarithmic view scaling with recency and activity decay, recomputed by a \`CRON_SECRET\`-protected Vercel cron job that prioritizes active documents. AI editing actions stream completions through an [OpenRouter](https://openrouter.ai/docs) proxy.

The result is a production-deployed platform that ships as a multi-stage Docker image. Axelot was a collaborative two-person build, and I owned core parts of the system end to end.`,
    highlights: [
      "Conflict-free concurrent editing: a Yjs CRDT bound to TipTap, synced browser-to-browser over a WebRTC peer mesh",
      "Server-side Firebase custom tokens minted into the NextAuth session, so the browser hits Firestore under real security rules",
      "Trending feed weighting logarithmic views against recency and activity decay, recomputed by a `CRON_SECRET`-guarded cron",
      "In-editor AI streaming token by token through an OpenRouter proxy; tables, KaTeX, Mermaid, and Shiki code",
      "Durable Firestore snapshots behind the live mesh, shipped as a multi-stage Docker image",
    ],
    stack: ["Next.js", "React", "TypeScript", "TipTap", "Yjs (CRDT)", "WebRTC", "Firebase", "NextAuth", "OpenRouter", "Docker"],
    links: { live: "https://www.axelot.io", repo: "https://github.com/sunnypatell/axelot" },
    image: "/assets/shots/axelot.webp",
    featured: false,
    year: "2025",
    team: "Collaborative two-person build",
  },
  {
    slug: "sunnify",
    name: "Sunnify",
    tagline: "Spotify playlists to tagged local audio",
    oneLiner:
      "A cross-platform desktop app that turns Spotify playlists, albums, and tracks into tagged local audio files, no Spotify account or API key required.",
    summary:
      "Sunnify is an open-source desktop app (macOS, Windows, Linux) that saves Spotify playlists as local audio in MP3, M4A, FLAC, Opus, or WAV, embedding cover art and tags for MP3, M4A, and FLAC. It reads track data from Spotify's public embed pages with no login, locates the matching audio via yt-dlp, and transcodes with a bundled FFmpeg. It handles 1000+ track playlists, resumes interrupted runs, and ships signed binaries with full supply-chain provenance. Still actively maintained.",
    detail: `Spotify has no "download my playlist" path, and the usual scripts break once a playlist passes a few hundred tracks or hits a rate limit. Sunnify handles the full pipeline from URL to tagged file.

The hard part is the data layer. Instead of an official API, it parses the \`__NEXT_DATA__\` JSON blob from Spotify's public embed pages, using layered path resolution and recursive fallbacks to survive the structural drift Spotify's A/B tests introduce. Embed pages cap near 100 tracks, so larger playlists fall back to Spotify's internal \`spclient\` API with a short-lived anonymous token to recover canonical order.

Matching is where correctness lives. Each track is scored against YouTube candidates on normalized title, artist, and a duration tolerance, so it grabs the right recording instead of a remix or live cut, with multi-client and query-widening fallbacks when a search comes back empty. Around that: a 4-worker thread pool, 429-aware exponential backoff, an append-only JSONL manifest for resume across sessions, and cooperative cancellation.

The suite runs 160+ pytest cases on every push across a 15-job matrix (3 OSes x Python 3.9-3.13), and releases ship [SLSA Build Level 3](https://slsa.dev) provenance, [CycloneDX](https://cyclonedx.org) SBOMs, and [Sigstore](https://www.sigstore.dev) signatures.`,
    highlights: [
      "No-login track data from Spotify's `__NEXT_DATA__` embed blob, with recursive fallbacks that ride out A/B drift",
      "`spclient` API fallback past the ~100-track embed cap, recovering canonical order on 1000+ track playlists",
      "Right-recording matching on normalized title, artist, and duration tolerance, with query-widening on empty hits",
      "Built for long runs: 4-worker pool, 429-aware backoff, JSONL resume manifest, cooperative cancellation",
      "Release rigor most side projects skip: 160+ tests on 15 jobs, plus [SLSA L3](https://slsa.dev) provenance, [CycloneDX](https://cyclonedx.org) SBOMs, and [Sigstore](https://www.sigstore.dev) signing",
    ],
    stack: ["Python", "PyQt5", "yt-dlp", "FFmpeg", "Mutagen", "pytest", "GitHub Actions", "SLSA / Sigstore", "Homebrew"],
    links: {
      live: "https://sunnify-spotify-downloader.vercel.app/",
      repo: "https://github.com/sunnypatell/sunnify-spotify-downloader",
    },
    image: "/assets/sunnify.webp",
    featured: true,
    year: "2024",
    active: true,
    badges: [
      {
        src: "https://img.shields.io/github/stars/sunnypatell/sunnify-spotify-downloader?style=flat&label=stars&color=d9663d&labelColor=15191c",
        alt: "GitHub stars",
        href: "https://github.com/sunnypatell/sunnify-spotify-downloader/stargazers",
      },
      {
        src: "https://img.shields.io/github/downloads/sunnypatell/sunnify-spotify-downloader/total?style=flat&label=downloads&color=d9663d&labelColor=15191c",
        alt: "Total downloads",
        href: "https://github.com/sunnypatell/sunnify-spotify-downloader/releases",
      },
    ],
  },
  {
    slug: "netdash",
    name: "Netdash",
    tagline: "40+ network tools in one app",
    oneLiner:
      "A cross-platform network engineering workbench: 40+ tools, RFC-correct IP math in the browser, and a native Electron backend for real ping, traceroute, and port scanning.",
    summary:
      "Netdash folds 40+ network engineering utilities into one web and desktop app: subnet and VLSM planning, IPv4/IPv6 calculators, multi-vendor config generation, IP-conflict detection, and DNS-over-HTTPS. Every calculation runs client-side with RFC-correct algorithms; the Electron build adds a Node.js backend for raw ICMP ping, traceroute, and port scanning that browsers can't do. Signed-in users get Firestore project sync with role-based sharing.",
    detail: `Network engineers stitch together a dozen disconnected utilities for routine work: subnetting, VLSM planning, config generation, DNS lookups, conflict detection. Netdash folds 40+ of them into one privacy-first app that runs in the browser or as a native desktop build.

The hard part is correctness. The IP math is RFC-correct, not approximate: bitwise IPv4 subnetting with [RFC 3021](https://www.rfc-editor.org/rfc/rfc3021) /31 point-to-point handling, IPv6 expansion with longest-run zero compression and solicited-node multicast derivation, CIDR summarization with boundary alignment, and a first-fit-descending VLSM allocator that reports utilization and slack.

The DNS engine speaks DNS-over-HTTPS to five providers, parsing both JSON and dns-message wire formats, with a TTL-aware LRU cache and DNSSEC AD-flag checks. RTT testing uses the Performance API for median, p95, and jitter.

Browsers can't send raw ICMP, so the Electron build adds a Node.js backend behind a context-isolated IPC bridge, with hostname and port validation that blocks command injection before any shell call. Firestore rules enforce owner/editor/admin tiers and bar collaborators from changing ownership.`,
    highlights: [
      "RFC-correct IP math: [RFC 3021](https://www.rfc-editor.org/rfc/rfc3021) /31 subnetting, IPv6 zero-compression, CIDR summarization, first-fit-descending VLSM",
      "[DNS-over-HTTPS](https://www.rfc-editor.org/rfc/rfc8484) to 5 providers, JSON and wire-format parsing, TTL-aware LRU cache, [DNSSEC](https://www.rfc-editor.org/rfc/rfc4035) AD-flag checks",
      "Native Electron backend over a context-isolated IPC bridge for real ICMP ping, traceroute, and port scans",
      "Hostname and port validation that blocks command injection before any shell call",
      "Firestore owner/editor/admin tiers; Cisco IOS and Aruba CX config generation; WCAG 2.2 AA",
    ],
    stack: ["TypeScript", "Next.js", "React", "Electron", "Node.js", "Firebase", "Tailwind CSS", "DNS-over-HTTPS"],
    links: {
      live: "https://netdash-toolkit.vercel.app/",
      repo: "https://github.com/sunnypatell/netdash-toolkit",
    },
    image: "/assets/shots/netdash.webp",
    featured: true,
    year: "2025",
    active: true,
  },
  {
    slug: "securebank",
    name: "SecureBank",
    tagline: "A bank built to be hacked",
    oneLiner:
      "A dockerized, deliberately-vulnerable Next.js banking app that teaches SQL injection and broken-access-control through five graded, hands-on challenges.",
    summary:
      "SecureBank CTF is a full-stack banking simulation engineered to be broken on purpose. It behaves like a real app (login, transfers, transaction search, feedback) but hides production-shaped flaws: a double-decode injection bypass, stacked-query privilege escalation, and two access-control backdoors. Five documented challenges each ship a difficulty rating, objective, and full writeup, packaged behind one Docker command.",
    detail: `Most AppSec training is either toy "spot the bug" snippets or sprawling labs nobody can stand up locally. SecureBank CTF lands in between: a believable Next.js / React banking app on a SQLite backend with no ORM, so every query path is hand-written and every vulnerability is deliberate, not accidental.

The engineering is in making the flaws solvable but non-trivial. The login route strips SQL metacharacters with a regex, then URL-decodes the input twice, so a double-encoded payload slips past the filter and injects. The feedback endpoint routes its INSERT through SQLite's multi-statement exec instead of a prepared statement, turning a comment box into stacked-query privilege escalation, while the DELETE path stays parameterized. Two access-control backdoors round it out: an \`x-dev-mode\` header that drops the per-user WHERE clause, and a maintenance route that runs raw SQL only under a debug flag on a specific weekday.

Each challenge ships an objective and full writeup, and the whole lab runs from one multi-stage Docker image with a seed-snapshot database that persists progress across restarts. SecureBank was a five-person university project: I authored the privilege-escalation challenge and was the largest contributor to the application and its Docker packaging, while four teammates each built a graded challenge of their own.`,
    highlights: [
      "Hand-written, ORM-free SQLite query paths (Next.js, React, better-sqlite3) so every flaw is deliberate",
      "Filter-then-double-decode login bypass: a regex strips metacharacters, then double URL-decode reintroduces them",
      "Stacked-query privilege escalation via the feedback INSERT, with the DELETE path left parameterized as a control",
      "Two access-control backdoors: an `x-dev-mode` header and a weekday-gated debug route running raw SQL",
      "Five graded challenges with writeups, one-command multi-stage Docker, seed-snapshot DB that persists progress",
    ],
    stack: ["Next.js", "React", "TypeScript", "SQLite", "better-sqlite3", "Docker"],
    links: { repo: "https://github.com/sunnypatell/securebank-ctf" },
    image: "/assets/shots/securebank.webp",
    featured: false,
    year: "2025",
    team: "Five-person team at Ontario Tech",
  },
  {
    slug: "knifethrow",
    name: "KnifeThrow",
    tagline: "An arcade game, no engine, pure Java",
    oneLiner:
      "A complete 2D knife-throwing arcade game built from scratch on raw Java Swing/AWT, with a hand-rolled game loop, collision, particles, sound, and a persistent shop.",
    summary:
      "KnifeThrow is a 2D arcade game written entirely in Java Swing and AWT with no game engine underneath, every system a player takes for granted, from the game loop to collision to audio, hand-built. I wrote it by hand in grade 12, years before AI could write code. Player profiles persist to disk and gate a knife shop that unlocks at score milestones, and the single-file capstone was later refactored into eight documented classes with generated Javadoc and a UML diagram.",
    detail: `I built KnifeThrow by hand in grade 12, years before AI could write code for you, roughly **5,000 lines of raw Java** with no game engine underneath. Every subsystem a player takes for granted, the game loop, collision, rendering, audio, had to be designed from scratch on [Swing and AWT](https://docs.oracle.com/javase/tutorial/uiswing/).

The core is a fixed-step loop on a 10ms Swing Timer, keeping movement and physics consistent regardless of how fast a machine renders, with antialiased Graphics2D drawing on top. Collision is rectangle-intersection between thrown knives and targets; impacts kick off a particle system and screen shake, and WAV effects play through Java's AudioSystem and Clip. A custom pixel font is loaded at runtime and registered with the local GraphicsEnvironment.

The progression layer is the ambitious part. Player profiles (name, high score, control scheme, selected knife) persist to disk and gate a knife shop that unlocks blades at score milestones. A signature EMP ability charges as you score, then runs a Euclidean proximity check to flip nearby enemy knives back at their source.

After the original single-file build, the game was refactored into eight documented classes under a Maven-style source layout, with generated Javadoc and a UML class diagram.`,
    highlights: [
      "Grade-12 capstone, ~5,000 lines of raw Java [Swing/AWT](https://docs.oracle.com/javase/tutorial/uiswing/), no engine, written before AI could code",
      "Fixed-step 10ms Swing Timer loop for frame-rate-independent physics, antialiased Graphics2D on top",
      "Disk-persistent player profiles gating a knife shop that unlocks blades at score milestones",
      "Signature EMP ability: a Euclidean proximity check flips nearby enemy knives, with particles and screen shake",
      "Refactored from one file into eight documented classes with generated Javadoc and a UML diagram",
    ],
    stack: ["Java SE", "Swing / AWT", "Graphics2D", "javax.sound.sampled", "Javadoc"],
    links: { repo: "https://github.com/sunnypatell/KnifeThrow" },
    image: "/assets/knifethrow.webp",
    featured: false,
    year: "2022",
  },
];

// projects with a public web deploy get a url bar in the window chrome
export const WEB_PROJECTS = ["ats-screener", "axelot", "netdash"];

// display order for the featured projects on the home and projects pages
export const FEATURED_ORDER = ["ats-screener", "sunnify", "netdash"];

export const research = {
  title: "When Semantic Caches Lie",
  subtitle:
    "Why one similarity threshold cannot make an LLM cache both safe and useful across domains",
  byline: "Independent research, sole author",
  year: "2026",
  pages: 21,
  summary:
    "LLM systems increasingly reuse a stored answer whenever a new prompt looks close enough in embedding space, trading a model call for a cheap lookup. This paper asks what the literature mostly skipped: when that closeness test is wrong, what does it cost? I ground cache-equivalence in human-labeled prompt pairs across three domains and six embedding models, then measure how often a cache serves a confident wrong answer, what that false hit costs a downstream QA task, and how to set the similarity threshold so reuse stays safe.",
  findings: [
    "On adversarial near-duplicates even the strongest neural encoder barely beats chance, and a classic lexical baseline quietly outscores all of them",
    "A false hit is nearly as damaging in retrieved context as in the final answer, and a naive fixed threshold can cost several times more than not caching at all",
    "A cost-aware threshold recovers near-baseline cost, but transfers across domains only in the conservative direction",
    "Preregistered and fully reproducible: every number and figure is generated from code, no hand entry, in a Dockerized pipeline",
  ],
  note: "Written, run, and typeset solo, unaffiliated with any institution, including the preregistration, the experiments, and every figure.",
  image: "/assets/research-teaser.webp",
  pdf: "/semantic-cache-reliability-sunny-patel.pdf",
  repo: "https://github.com/sunnypatell/semantic-cache-reliability",
  doi: "https://doi.org/10.5281/zenodo.20532711",
  orcid: "https://orcid.org/0009-0005-3863-7642",
  citation:
    "Patel, S. (2026). When Semantic Caches Lie: False Hits, Downstream Cost, and Calibration in Embedding-Based Caching for Large Language Models. https://doi.org/10.5281/zenodo.20532711",
  bibtex: `@misc{patel2026semanticcaches,
  author = {Patel, Sunny Jayendra},
  title  = {When Semantic Caches Lie: False Hits, Downstream Cost, and
            Calibration in Embedding-Based Caching for Large Language Models},
  year   = {2026},
  doi    = {10.5281/zenodo.20532711},
  url    = {https://doi.org/10.5281/zenodo.20532711},
  note   = {Zenodo}
}`,
} as const;

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["TypeScript", "Python", "Java", "Go", "C++", "C#", "PowerShell"],
  },
  {
    group: "Web & product",
    items: ["React", "Next.js", "Node", "Tailwind", "Three.js", "GraphQL", "Flutter"],
  },
  {
    group: "Backend & data",
    items: ["PostgreSQL", "MongoDB", "Django", "Spring Boot", "Kafka", "Express"],
  },
  {
    group: "Cloud & systems",
    items: ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "Active Directory", "Linux"],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  url?: string;
};

export const certifications: Certification[] = [
  {
    name: "IBM RAG and Agentic AI",
    issuer: "IBM",
    date: "2026",
    url: "https://coursera.org/verify/professional-cert/S9ENFFEVMD37",
  },
  {
    name: "Microsoft Full-Stack Developer",
    issuer: "Microsoft",
    date: "2026",
    url: "https://coursera.org/verify/professional-cert/MSK7DL3J65TJ",
  },
  {
    name: "GH-300: GitHub Copilot",
    issuer: "Microsoft",
    date: "2025",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/sunnypatell/D07D3774894C605?sharingId=6255C292987551EF",
  },
  {
    name: "MongoDB Python Developer",
    issuer: "MongoDB",
    date: "2025",
    url: "https://learn.mongodb.com/c/tf2DSC7hTcyM3NBZjkLPoA",
  },
  {
    name: "GitHub Foundations",
    issuer: "GitHub",
    date: "2024",
    url: "https://www.credly.com/badges/b6f69785-2da8-447e-b02c-3350bf9af803",
  },
  {
    name: "Certified Enterprise Scripting Architect",
    issuer: "ConnectWise Automate",
    date: "2024",
    url: "/assets/Connectwise-Scripting-Certification.pdf",
  },
  {
    name: "IT Automation with Python",
    issuer: "Google",
    date: "2023",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/82SZFUWF4B3T",
  },
];

// no "Contact" here on purpose: the "Get in touch" button in the header already
// goes to /contact, so a second link would be redundant.
export const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
] as const;
