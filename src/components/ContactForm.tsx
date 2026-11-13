"use client";

import { useState } from "react";

/**
 * Contact form that posts to a Formspree-compatible endpoint configured via
 * NEXT_PUBLIC_CONTACT_FORM_ENDPOINT. The page only renders it when an endpoint exists.
 */
export function ContactForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "") !== "") return; // honeypot
    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const input = "mt-1.5 w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-base text-ink";
  return (
    <form onSubmit={onSubmit} className="card not-prose space-y-4 p-5">
      <div>
        <label htmlFor="c-name" className="text-sm font-medium">
          Name
        </label>
        <input id="c-name" name="name" required maxLength={100} autoComplete="name" className={input} />
      </div>
      <div>
        <label htmlFor="c-email" className="text-sm font-medium">
          Email
        </label>
        <input id="c-email" name="email" type="email" required maxLength={200} autoComplete="email" className={input} />
      </div>
      <div>
        <label htmlFor="c-msg" className="text-sm font-medium">
          Message
        </label>
        <textarea id="c-msg" name="message" required maxLength={5000} rows={6} className={input} />
      </div>
      <div className="hidden" aria-hidden>
        <label htmlFor="c-company">Company</label>
        <input id="c-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" disabled={status === "sending"} className="rounded-lg bg-brand-700 px-4 py-2.5 font-semibold text-white hover:bg-brand-800 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p role="status" className="text-sm">
        {status === "sent" && <span className="text-success">Thanks — your message has been sent.</span>}
        {status === "error" && <span className="text-danger">Sorry, the message could not be sent. Please try again later.</span>}
      </p>
    </form>
  );
}
