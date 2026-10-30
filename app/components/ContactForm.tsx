"use client";

import { useState } from "react";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-card-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all duration-200 disabled:opacity-50";
const labelClass = "text-xs font-semibold text-text-secondary uppercase tracking-wider";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!message.trim()) {
      setError("Please write a message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setName("");
      setEmail("");
      setMessage("");
      setSent(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to send. Please check your connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8" role="status">
        <p className="font-semibold text-text-primary mb-1">Thanks, your message is on its way.</p>
        <p className="text-text-secondary text-[0.9375rem] leading-relaxed">
          I&apos;ll reply to the email address you gave me.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4"
      id="contact-form"
    >
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg" role="alert">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          maxLength={100}
          disabled={isSubmitting}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. John Doe"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className={labelClass}>
          Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          required
          maxLength={100}
          disabled={isSubmitting}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. john@example.com"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={6}
          maxLength={5000}
          disabled={isSubmitting}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-shimmer relative overflow-hidden w-full py-3.5 mt-2 rounded-xl bg-orange hover:bg-orange-hover text-white font-semibold text-base transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[0_4px_20px_rgba(255,85,38,0.35)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
