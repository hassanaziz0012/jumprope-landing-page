"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  apkUrl: string;
}

export default function LeadCaptureModal({ isOpen, onClose, apkUrl }: LeadCaptureModalProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  if (!mounted || !isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!source.trim()) {
      setError("Please tell us how you heard about us.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: source.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // Success: open APK download link in a new tab
      const newTab = window.open(apkUrl, "_blank");
      
      // Fallback in case pop-up blocker prevents window.open
      if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
        window.location.href = apkUrl;
      }

      // Reset form fields
      setName("");
      setEmail("");
      setSource("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to submit form. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node) &&
      !isSubmitting
    ) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 md:p-8 transition-all duration-300 transform scale-100 opacity-100 flex flex-col gap-5"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-1.5 rounded-full text-text-muted hover:text-text-primary hover:bg-card-secondary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <h2
            id="modal-title"
            className="text-2xl font-bold text-text-primary tracking-tight"
          >
            Download Direct APK
          </h2>
          <p className="text-[0.9375rem] text-text-secondary leading-relaxed">
            Enter your details to access the direct download link instantly.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-name" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Name
            </label>
            <input
              id="lead-name"
              type="text"
              required
              disabled={isSubmitting}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 rounded-xl bg-card-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all duration-200 disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-email" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Email Address
            </label>
            <input
              id="lead-email"
              type="email"
              required
              disabled={isSubmitting}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="w-full px-4 py-3 rounded-xl bg-card-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all duration-200 disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-source" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              How did you hear about us?
            </label>
            <input
              id="lead-source"
              type="text"
              required
              disabled={isSubmitting}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. Twitter, Friend, Search engine"
              className="w-full px-4 py-3 rounded-xl bg-card-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all duration-200 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-shimmer relative overflow-hidden w-full py-3.5 mt-2 rounded-xl bg-orange hover:bg-orange-hover text-white font-semibold text-base transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[0_4px_20px_rgba(255,85,38,0.35)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Get Download Link"
            )}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
