"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import type { Dictionary } from "@/i18n/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({
  dict,
  services,
  defaultMessage,
}: {
  dict: Dictionary["contact"]["form"];
  services: Dictionary["services"]["list"];
  defaultMessage?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          service: data.get("service"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      if (!res.ok) throw new Error("request_failed");

      track("contact_form_submitted", {
        service: (data.get("service") as string) || "general",
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-center text-black/70 dark:text-white/70">
        {dict.success}
      </p>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-black placeholder:text-black/40 outline-none transition-colors focus:border-blue-600 dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/40 dark:focus:border-blue-400";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label
          htmlFor="name"
          className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40"
        >
          {dict.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={200}
          placeholder={dict.namePlaceholder}
          className={`mt-2 ${inputClasses}`}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40"
        >
          {dict.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          placeholder={dict.emailPlaceholder}
          className={`mt-2 ${inputClasses}`}
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40"
        >
          {dict.serviceLabel}
        </label>
        <select
          id="service"
          name="service"
          defaultValue=""
          className={`mt-2 ${inputClasses}`}
        >
          <option
            value=""
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            {dict.serviceOptionGeneral}
          </option>
          {services.map((service) => (
            <option
              key={service.id}
              value={service.title}
              className="bg-white text-black dark:bg-zinc-900 dark:text-white"
            >
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40"
        >
          {dict.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          defaultValue={defaultMessage}
          placeholder={dict.messagePlaceholder}
          className={`mt-2 resize-none ${inputClasses}`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
      >
        {status === "sending" ? dict.sending : dict.submit}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {dict.error}
        </p>
      )}
    </form>
  );
}
