"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import { ArrowRight } from "lucide-react";
import { ctaClass } from "@/components/ui/primitives";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "sent" | "error";
type Errors = { name?: string; email?: string; message?: string };

const field =
  "w-full rounded-md border border-field bg-surface px-4 py-3 text-bone placeholder:text-muted outline-none transition-colors focus:border-ember aria-[invalid=true]:border-ember";
const label = "font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted";
const errCls = "mt-1.5 block font-mono text-[0.7rem] text-ember";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
    };
  }
}

function validate(d: Record<string, string>): Errors {
  const e: Errors = {};
  if (!d.name?.trim()) e.name = "What should I call you?";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email ?? ""))
    e.email = "A valid email so I can reply.";
  if (!d.message?.trim()) e.message = "Add a line or two.";
  return e;
}

// celebratory burst in the site palette only, never the default rainbow
function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#d9663d", "#e8794e", "#ede8dc", "#b5431f"];
  confetti({ particleCount: 70, spread: 68, startVelocity: 38, scalar: 0.9, ticks: 170, origin: { y: 0.7 }, colors });
  window.setTimeout(
    () => confetti({ particleCount: 30, spread: 90, scalar: 0.8, ticks: 150, origin: { y: 0.75 }, colors }),
    140
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (!SITE_KEY || document.getElementById("recaptcha-v3")) return;
    const s = document.createElement("script");
    s.id = "recaptcha-v3";
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  async function getToken(): Promise<string> {
    if (!SITE_KEY || !window.grecaptcha) return "";
    return new Promise((resolve) =>
      window.grecaptcha!.ready(() =>
        window.grecaptcha!.execute(SITE_KEY, { action: "contact" }).then(resolve)
      )
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const v = validate(data);
    setErrors(v);
    const firstErr = Object.keys(v)[0];
    if (firstErr) {
      setStatus("error");
      setServerError("");
      requestAnimationFrame(() => document.getElementById(firstErr)?.focus());
      return;
    }

    if (data.company) {
      setStatus("sent"); // honeypot tripped: pretend success, send nothing
      form.reset();
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setServerError("Email isn't wired up yet. Reach me at sunnypatel124555@gmail.com.");
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const token = await getToken();
      // superset of common template var names so it maps to any emailjs template
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: data.name,
          from_name: data.name,
          to_name: "Sunny Patel",
          email: data.email,
          from_email: data.email, // the var the actual template reads; without it the email came through empty
          reply_to: data.email,
          user_email: data.email,
          to_email: "sunnypatel124555@gmail.com",
          message: data.message,
          "g-recaptcha-response": token,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("sent");
      form.reset();
      setErrors({});
      celebrate();
    } catch {
      setStatus("error");
      setServerError("Something went wrong. Try email instead.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={field}
            placeholder="Jane Doe"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          {errors.name && (
            <span id="err-name" role="alert" className={errCls}>
              {errors.name}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="jane@company.com"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && (
            <span id="err-email" role="alert" className={errCls}>
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${field} resize-none`}
          placeholder="Hey Sunny, we're hiring and your range stood out."
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {errors.message && (
          <span id="err-message" role="alert" className={errCls}>
            {errors.message}
          </span>
        )}
      </div>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className={`${ctaClass} disabled:opacity-60`}
        >
          {status === "sending"
            ? "Sending"
            : status === "sent"
              ? "Sent, talk soon"
              : "Send message"}
          {status === "idle" && (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>

        <p id="form-status" role="status" aria-live="polite" className="font-mono text-xs">
          {status === "error" && serverError && (
            <span className="text-ember">{serverError}</span>
          )}
          {status === "sent" && (
            <span className="text-muted">Thanks. I&apos;ll get back to you shortly.</span>
          )}
        </p>
      </div>

      {SITE_KEY && (
        <p className="font-mono text-[0.65rem] text-muted">Protected by reCAPTCHA.</p>
      )}
    </form>
  );
}
