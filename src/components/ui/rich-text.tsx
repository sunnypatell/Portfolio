import { Fragment } from "react";

// minimal inline markup for copy: `code` spans, [label](url) links, and
// **emphasis** (an intentional ember highlight on a key phrase, like "silicon").
const TOKEN = /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;

export function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded bg-ember/10 px-1.5 py-0.5 font-mono text-[0.82em] text-ember-bright"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
          return (
            <em key={i} className="font-medium not-italic text-ember">
              {part.slice(2, -2)}
            </em>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const label = link[1];
          // a [`code`](url) link renders as a clickable ember code chip
          const isCode = label.length > 2 && label.startsWith("`") && label.endsWith("`");
          return (
            <a
              key={i}
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              className={
                isCode
                  ? "rounded bg-ember/10 px-1.5 py-0.5 font-mono text-[0.82em] text-ember-bright underline decoration-ember/40 underline-offset-2 transition-colors hover:decoration-ember"
                  : "font-medium text-bone underline decoration-ember/50 underline-offset-[3px] transition-colors hover:decoration-ember"
              }
            >
              {isCode ? label.slice(1, -1) : label}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
