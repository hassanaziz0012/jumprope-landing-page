import Image from "next/image";

const socials = [
  { label: "Twitter/X", href: "https://x.com/nothassanaziz" },
  { label: "YouTube", href: "https://youtube.com/@itshassanaziz" },
  { label: "GitHub", href: "https://github.com/hassanaziz0012" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border pt-10 pb-8" id="footer">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Top row */}
        <div className="flex items-start justify-between flex-wrap gap-8 mb-8">
          {/* Left: brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/icon.png"
                alt="Jumprope Tracker"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="font-bold text-base">Jumprope Tracker</span>
            </div>
            <p className="text-text-secondary text-sm">
              Built with ❤️ by Hassan
            </p>
          </div>

          {/* Right: social links */}
          <div className="flex items-center gap-4">
            {socials.map((link, i) => (
              <span key={link.label} className="flex items-center gap-4">
                {i > 0 && <span className="text-text-muted">·</span>}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary text-sm font-medium no-underline hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 text-text-muted text-xs text-center">
          © {new Date().getFullYear()} Jumprope Tracker ·{" "}
          <a
            href="https://www.hassandev.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-secondary transition-colors duration-200 no-underline"
          >
            hassandev.me
          </a>
        </div>
      </div>
    </footer>
  );
}
