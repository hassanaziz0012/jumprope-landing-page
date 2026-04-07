import Image from "next/image";
import DownloadDropdown from "./DownloadDropdown";
import { GITHUB_REPO_URL } from "../constants";

const floatingBadges = [
  { text: "🔥 47-day streak", cls: "top-[5%] left-[-5%] float-delay-1" },
  { text: "⚡ 182 skips/min", cls: "bottom-[15%] right-[-8%] float-delay-2" },
  { text: "✅ Daily goal hit", cls: "top-[60%] left-[-10%] float-delay-3" },
];

export default function Hero() {
  return (
    <section
      className="relative pt-[calc(80px+clamp(4rem,8vh,7rem))] pb-[clamp(4rem,8vh,7rem)] min-h-screen flex items-center"
      id="hero"
    >
      {/* Background glow */}
      <div
        className="absolute top-[30%] right-[15%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,85,38,0.08)_0%,rgba(204,250,83,0.05)_40%,transparent_70%)] pointer-events-none blur-[60px]"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-2 gap-16 items-center max-[900px]:grid-cols-1 max-[900px]:gap-12 max-[900px]:text-center">
        {/* Left: Text + CTA */}
        <div className="relative z-20 flex flex-col items-start gap-6 hero-stagger max-[900px]:items-center">
          <span className="animate-hero-fade inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-lime-dim text-lime">
            🔥 Track every jump. Build every streak.
          </span>

          <h1 className="animate-hero-fade text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-bold leading-[1.08] tracking-tight">
            Your Jump Rope Journey, Beautifully Tracked.
          </h1>

          <p className="animate-hero-fade text-[clamp(1rem,1vw+0.25rem,1.125rem)] text-text-secondary leading-relaxed max-w-[480px] max-[900px]:max-w-[560px]">
            Log workouts, crush goals, and build unstoppable streaks — all
            offline, all on your device.
          </p>

          <div className="animate-hero-fade flex items-center gap-6 flex-wrap pt-2 max-[900px]:justify-center">
            <DownloadDropdown />
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-text-secondary text-[0.9375rem] font-medium no-underline transition-colors duration-200 hover:text-text-primary"
            >
              View on GitHub →
            </a>
          </div>
        </div>

        {/* Right: Phone mockups */}
        <div className="relative flex justify-center items-center min-h-[500px] max-[900px]:min-h-[400px] max-[480px]:min-h-0">
          {/* Floating badges */}
          <div className="absolute inset-0 z-10 pointer-events-none max-[900px]:hidden" aria-hidden="true">
            {floatingBadges.map((badge) => (
              <div
                key={badge.text}
                className={`absolute animate-float bg-card border border-border rounded-full px-4 py-2 text-[0.8125rem] font-semibold text-text-primary whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${badge.cls}`}
              >
                {badge.text}
              </div>
            ))}
          </div>

          {/* Phone stack */}
          <div className="relative flex items-center justify-center w-full max-w-[500px] max-[900px]:max-w-[320px] max-[480px]:max-w-[260px]">
            {/* Left phone */}
            <div className="absolute z-[1] w-[45%] opacity-85 left-[-5%] -rotate-6 translate-y-5 animate-phone-entrance [animation-delay:0.5s] hover:opacity-100 transition-opacity duration-300 max-[900px]:hidden">
              <div className="phone-frame">
                <Image
                  src="/images/goals-page.jpg"
                  alt="Goals tracking page"
                  width={260}
                  height={563}
                  priority
                />
              </div>
            </div>

            {/* Center phone */}
            <div className="relative z-[3] w-[55%] animate-phone-entrance [animation-delay:0.3s] max-[900px]:w-[85%]">
              <div className="phone-frame">
                <Image
                  src="/images/home.jpg"
                  alt="Jumprope Tracker home screen"
                  width={280}
                  height={607}
                  priority
                />
              </div>
            </div>

            {/* Right phone */}
            <div className="absolute z-[1] w-[45%] opacity-85 right-[-5%] rotate-6 translate-y-5 animate-phone-entrance [animation-delay:0.7s] hover:opacity-100 transition-opacity duration-300 max-[900px]:hidden">
              <div className="phone-frame">
                <Image
                  src="/images/workout-details.jpg"
                  alt="Workout details screen"
                  width={260}
                  height={563}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
