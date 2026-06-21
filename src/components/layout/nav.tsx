"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { navLinks, profile } from "@/content/site";
import { Magnetic } from "@/components/motion/magnetic";

export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(true);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // label the command-menu shortcut for the actual platform
  useEffect(() => setMac(/mac/i.test(navigator.userAgent)), []);

  // close on route change
  useEffect(() => setOpen(false), [pathname]);

  // escape to close, returning focus to the toggle
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // lock background scroll (lenis + native) while the menu is open, move focus in
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => firstLinkRef.current?.focus(), 60);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.clearTimeout(id);
    };
  }, [open, lenis]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        scrolled || open
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="font-mono text-sm text-bone" aria-label="Home">
          sunny<span className="text-ember">.</span>patel
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex items-center gap-1.5 py-1 font-mono text-[0.8rem] transition-colors",
                  active ? "text-bone" : "text-muted hover:text-bone"
                )}
              >
                <span
                  className={cn(
                    "text-[0.62rem] tabular-nums",
                    active ? "text-ember" : "text-muted"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-ember transition-transform duration-300 ease-[var(--ease-premium)]",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("cmdk:open"))}
            aria-label="Open command menu"
            className="hidden items-center gap-1 rounded-md border border-line px-2 py-1.5 font-mono text-[0.68rem] text-muted transition-colors hover:border-ember/40 hover:text-bone md:inline-flex"
          >
            <span aria-hidden suppressHydrationWarning>
              {mac ? "⌘K" : "Ctrl K"}
            </span>
          </button>
          <Link
            href={profile.resume}
            className="hidden font-mono text-[0.8rem] text-muted transition-colors hover:text-bone md:inline-block"
          >
            Résumé
          </Link>
          <Magnetic className="hidden md:inline-block">
            <Link
              href="/contact"
              className="block rounded-md border border-line px-4 py-2 font-mono text-[0.8rem] text-bone transition-colors duration-300 hover:border-ember hover:text-ember"
            >
              Get in touch
            </Link>
          </Magnetic>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative -mr-2 inline-flex h-11 w-11 items-center justify-center text-bone active:text-ember md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobile-menu"
          >
            <span aria-hidden className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[var(--ease-premium)]",
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[var(--ease-premium)]",
                  open ? "bottom-1.5 translate-y-1/2 -rotate-45" : "bottom-0.5"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* tap-outside scrim (keyboard users dismiss via Escape) */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 -z-10 h-screen w-screen cursor-default bg-transparent md:hidden",
          open ? "block" : "hidden"
        )}
      />

      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden border-t bg-ink/95 backdrop-blur-md transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-premium)] md:hidden",
          open
            ? "grid-rows-[1fr] border-line opacity-100"
            : "pointer-events-none grid-rows-[0fr] border-transparent opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col px-6 py-3">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 py-3 font-mono text-sm transition-colors active:text-bone",
                  isActive(link.href) ? "text-bone" : "text-muted hover:text-bone"
                )}
              >
                <span className="text-[0.62rem] tabular-nums text-ember/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            ))}
            <Link
              href={profile.resume}
              className="flex items-center gap-3 py-3 font-mono text-sm text-muted transition-colors hover:text-bone active:text-bone"
            >
              <span className="text-[0.62rem] tabular-nums text-ember/70">
                {String(navLinks.length + 1).padStart(2, "0")}
              </span>
              Résumé
            </Link>
            <Link
              href="/contact"
              className="mt-3 rounded-md border border-ember/50 bg-ember/10 px-4 py-3 text-center font-mono text-sm text-bone transition-colors hover:border-ember hover:bg-ember/20"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
