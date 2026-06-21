"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { profile, research } from "@/content/site";

type Cmd = {
  id: string;
  group: string;
  label: string;
  keywords?: string;
  run: () => void;
};

// branded command menu; opens on cmd/ctrl+k or a "cmdk:open" window event from the nav
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    restoreRef.current?.focus?.();
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  const ext = useCallback(
    (href: string) => {
      window.open(href, "_blank", "noopener,noreferrer");
      close();
    },
    [close]
  );

  const commands = useMemo<Cmd[]>(
    () => [
      { id: "home", group: "Go to", label: "Home", run: () => go("/") },
      { id: "work", group: "Go to", label: "Work", run: () => go("/work") },
      { id: "projects", group: "Go to", label: "Projects", run: () => go("/projects") },
      { id: "about", group: "Go to", label: "About", run: () => go("/about") },
      { id: "research", group: "Go to", label: "Research paper", keywords: "doi semantic cache llm", run: () => go("/research") },
      { id: "resume", group: "Go to", label: "Résumé", keywords: "resume cv", run: () => go("/resume") },
      { id: "contact", group: "Go to", label: "Contact", run: () => go("/contact") },
      { id: "github", group: "Links", label: "GitHub", keywords: "code source repos", run: () => ext(profile.socials.github) },
      { id: "linkedin", group: "Links", label: "LinkedIn", run: () => ext(profile.socials.linkedin) },
      { id: "doi", group: "Links", label: "Research DOI on Zenodo", keywords: "paper citation", run: () => ext(research.doi) },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        keywords: "contact mail",
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
          } catch {}
          close();
        },
      },
      { id: "download-resume", group: "Actions", label: "Download résumé (PDF)", keywords: "cv", run: () => ext(profile.resumeFile) },
    ],
    [go, ext, close]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      (c.label + " " + (c.keywords ?? "")).toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => setActive(0), [query]);

  // open shortcut + nav trigger
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        restoreRef.current = document.activeElement as HTMLElement;
        setOpen((o) => !o);
      }
    };
    const onOpen = () => {
      restoreRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", onOpen);
    };
  }, []);

  // lock scroll + focus the input while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(id);
    };
  }, [open]);

  // keep the active option in view
  useEffect(() => {
    if (!open) return;
    const el = document.getElementById(`cmdk-${filtered[active]?.id}`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active, filtered, open]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[16vh]"
    >
      <button
        type="button"
        aria-label="Close command menu"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 -z-10 bg-ink/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-float"
      >
        <div className="flex items-center gap-2.5 border-b border-line px-4">
          <span aria-hidden className="font-mono text-sm text-ember">
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-autocomplete="list"
            aria-activedescendant={filtered[active] ? `cmdk-${filtered[active].id}` : undefined}
            placeholder="Jump to a page, link, or action..."
            className="w-full bg-transparent py-3.5 font-mono text-sm text-bone outline-none placeholder:text-muted"
          />
        </div>

        <div id="cmdk-list" role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-center font-mono text-xs text-muted">
              No matches.
            </div>
          )}
          {filtered.map((c, i) => {
            const showHeader = i === 0 || filtered[i - 1].group !== c.group;
            const isActive = i === active;
            return (
              <div key={c.id}>
                {showHeader && (
                  <div className="px-3 pb-1 pt-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                    {c.group}
                  </div>
                )}
                <button
                  type="button"
                  id={`cmdk-${c.id}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseMove={() => setActive(i)}
                  onClick={() => c.run()}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-mono text-sm transition-colors",
                    isActive ? "bg-ember/15 text-bone" : "text-bone-dim"
                  )}
                >
                  <span>{c.label}</span>
                  {isActive && (
                    <span aria-hidden className="text-[0.7rem] text-ember">
                      &#9166;
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[0.62rem] text-muted [&_kbd]:rounded [&_kbd]:border [&_kbd]:border-line [&_kbd]:px-1 [&_kbd]:py-0.5">
          <span>
            <kbd>&uarr;</kbd> <kbd>&darr;</kbd> navigate
          </span>
          <span>
            <kbd>&#9166;</kbd> select
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
