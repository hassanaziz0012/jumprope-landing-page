import DownloadDropdown from "./DownloadDropdown";
import { GITHUB_REPO_URL } from "../constants";

export default function FinalCTA() {
  return (
    <section
      className="py-[clamp(5rem,10vh,8rem)] relative"
      id="final-cta"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(255,85,38,0.06)_0%,transparent_65%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 text-center relative z-10">
        <h2 className="text-[clamp(2.5rem,4vw+0.5rem,3.5rem)] font-bold leading-tight tracking-tight mb-5">
          Ready to jump?
        </h2>
        <p className="text-text-secondary text-[clamp(1rem,1.2vw+0.25rem,1.25rem)] mb-10 max-w-[500px] mx-auto">
          Free. Offline. No accounts. Just you and your rope.
        </p>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          <DownloadDropdown />
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-secondary text-[0.9375rem] font-medium no-underline transition-colors duration-200 hover:text-text-primary"
          >
            ⭐ Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
