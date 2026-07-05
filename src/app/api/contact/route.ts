import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "luhavenkvist@yahoo.dk";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { name, email, message, service, website } = body as Record<
    string,
    unknown
  >;

  // Honeypot: real visitors never fill this hidden field, bots often do.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    (service !== undefined && typeof service !== "string") ||
    name.trim().length < 2 ||
    name.length > 200 ||
    !EMAIL_RE.test(email) ||
    email.length > 200 ||
    message.trim().length < 10 ||
    message.length > 5000 ||
    (typeof service === "string" && service.length > 200)
  ) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const resend = new Resend(resendApiKey);

  const serviceLine =
    typeof service === "string" && service.trim() !== ""
      ? `Service: ${service}\n`
      : "";

  const { error } = await resend.emails.send({
    from: `Havenkvist Tech <${CONTACT_FROM_EMAIL}>`,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `From: ${name} <${email}>\n${serviceLine}\n${message}`,
  });

  if (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
