"use client";

import { useEffect, useRef } from "react";

const badges = [
  { name: "First Skip", emoji: "🎉", requirement: "Log your first workout" },
  { name: "7-Day Streak", emoji: "🔥", requirement: "Work out 7 days in a row" },
  { name: "30-Day Streak", emoji: "💪", requirement: "Work out 30 days in a row" },
  { name: "Thousand Club", emoji: "🏅", requirement: "1,000 skips in one session" },
  { name: "Speed Demon", emoji: "⚡", requirement: "150+ avg skips/min" },
  { name: "Million Club", emoji: "👑", requirement: "1,000,000 lifetime skips" },
];

export default function AchievementsTeaser() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-in");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-[clamp(4rem,8vh,7rem)]"
      id="achievements"
    >
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1rem,5vw,3rem)]">
        <div className="text-center mb-14">
          <h2 className="text-[clamp(2rem,3vw+0.5rem,3rem)] font-bold leading-tight tracking-tight mb-4">
            Earn badges. Build momentum.
          </h2>
          <p className="text-text-secondary text-[clamp(1rem,1vw+0.25rem,1.125rem)] max-w-[520px] mx-auto">
            From your first skip to a million — every milestone is celebrated.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[640px]:flex max-[640px]:overflow-x-auto max-[640px]:snap-x max-[640px]:snap-mandatory max-[640px]:-mx-4 max-[640px]:px-4 max-[640px]:gap-4 opacity-0 translate-y-8 transition-all duration-700 ease-(--ease-out-expo) [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
        >
          {badges.map((badge) => (
            <div
              key={badge.name}
              className="bg-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,85,38,0.12)] cursor-default max-[640px]:min-w-[220px] max-[640px]:shrink-0 max-[640px]:snap-center"
            >
              <span className="text-5xl block mb-4">{badge.emoji}</span>
              <h3 className="font-bold text-lg mb-1">{badge.name}</h3>
              <p className="text-text-secondary text-sm">{badge.requirement}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
