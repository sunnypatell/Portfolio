import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.email(),
  message: z.string().min(1).max(5000),
  company: z.string().optional(), // honeypot — real users never fill this
  token: z.string().optional(), // recaptcha v3 token (if configured)
});

// simple in-memory rate limit (per server instance): 5 requests / 10 min / ip
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW });
    return false;
  }
  rec.count += 1;
  return rec.count > LIMIT;
}

async function humanVerified(token?: string) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return true; // not configured: rely on honeypot + rate limit
  if (!token) return false;
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  });
  const data = await res.json();
  return data.success === true && (data.score === undefined || data.score >= 0.5);
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages right now. Try again in a bit." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field with a valid email." },
      { status: 400 }
    );
  }

  if (parsed.data.company) return NextResponse.json({ ok: true }); // honeypot tripped

  if (!(await humanVerified(parsed.data.token))) {
    return NextResponse.json(
      { ok: false, error: "Couldn't verify you're human. Please try again." },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "sunnypatel124555@gmail.com";

  if (key) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to,
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\nfrom ${name} <${email}>`,
      }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Could not send right now." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  }

  console.log(`[contact] ${name} <${email}>: ${message}`);
  return NextResponse.json({ ok: true, simulated: true });
}
