"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DownloadDropdown from "./DownloadDropdown";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 py-3.5 bg-bg/75 backdrop-blur-xl transition-[border-color] duration-200 border-b ${scrolled ? "border-border" : "border-transparent"
        }`}
      id="navbar"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2.5 no-underline text-text-primary"
          aria-label="Jumprope Tracker Home"
        >
          <Image
            src="/images/icon.png"
            alt="Jumprope Tracker icon"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            Jumprope Tracker
          </span>
        </a>

        <DownloadDropdown />
      </div>
    </nav>
  );
}
