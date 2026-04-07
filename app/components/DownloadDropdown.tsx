"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const options = [
  {
    icon: "🤖",
    label: "Google Play",
    description: "Download from the Play Store",
    tag: "recommended",
    href: "#",
  },
  {
    icon: "📦",
    label: "Download APK",
    description: "Android — manual install",
    tag: null,
    href: "#",
  },
  {
    icon: "🍎",
    label: "Download IPA",
    description: "iOS — manual install",
    tag: null,
    href: "#",
  },
];

interface DownloadDropdownProps {
  className?: string;
}

export default function DownloadDropdown({ className }: DownloadDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function handleClickOutside(e: MouseEvent) {
      const target = e.target;
      if (target instanceof Element && target.closest('[data-mobile-modal="true"]')) {
        return;
      }
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const menuOptionsNodes = options.map((opt) => (
    <a
      key={opt.label}
      href={opt.href}
      className="flex items-center gap-3 px-3.5 py-3 rounded-lg no-underline text-text-primary transition-colors duration-200 hover:bg-card-secondary"
      role="menuitem"
      onClick={() => setOpen(false)}
    >
      <span className="text-2xl shrink-0 w-9 h-9 flex items-center justify-center">
        {opt.icon}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-[0.9375rem] flex flex-col items-start">
          {opt.label}
          {opt.tag && (
            <span className="text-[0.6875rem] font-medium text-lime bg-lime-dim px-2 py-0.5 rounded-full uppercase tracking-wide">
              {opt.tag}
            </span>
          )}
        </span>
        <span className="text-[0.8125rem] text-text-secondary">
          {opt.description}
        </span>
      </div>
    </a>
  ));

  return (
    <div ref={ref} className={`relative inline-flex ${className ?? ""}`}>
      <button
        className="btn-shimmer relative overflow-hidden inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-orange text-white font-semibold text-sm md:text-base cursor-pointer border-none transition-all duration-200 ease-(--ease-out-expo) hover:bg-orange-hover hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(255,85,38,0.35)] active:translate-y-0"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        id="download-button"
      >
        Download
        <span
          className={`inline-block transition-transform duration-200 text-[0.75rem] md:text-sm ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {/* Desktop Dropdown */}
      <div
        className={`hidden md:block absolute top-[calc(100%+8px)] right-0 min-w-[280px] bg-card rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] p-1.5 z-50 transition-all duration-200 ease-(--ease-out-expo) ${open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        role="menu"
      >
        {menuOptionsNodes}
      </div>

      {/* Mobile Modal */}
      {mounted && createPortal(
        <div className="md:hidden" data-mobile-modal="true">
          <div 
            className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
              open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setOpen(false)}
          />
          <div
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[320px] bg-card rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] p-1.5 z-[101] transition-all duration-200 ease-(--ease-out-expo) ${open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
              }`}
            role="menu"
          >
            {menuOptionsNodes}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
