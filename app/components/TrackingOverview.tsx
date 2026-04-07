"use client";

import { useEffect, useRef } from "react";

const trackables = [
  { icon: "⏱", label: "Duration" },
  { icon: "🔢", label: "Total Skips & Avg Skips/Min" },
  { icon: "🪢", label: "Trips (interruptions/misses)" },
  { icon: "🔥", label: "Calories Burned" },
  { icon: "❤️", label: "Heart Rate (Avg & Max)" },
  { icon: "📝", label: "Workout Notes" },
  { icon: "📈", label: "Custom Charts (Bar, Line, Area)" },
  { icon: "🎯", label: "Goals (Daily & Weekly, multiple)" },
  { icon: "🔥", label: "Workout Streaks + Rest Days" },
  { icon: "🏆", label: "Achievements & Badges" },
  { icon: "📤", label: "CSV & JSON Export" },
  { icon: "🤖", label: "AI Coach + Weekly Digest" },
];

export default function TrackingOverview() {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-[clamp(4rem,8vh,7rem)]"
      id="tracking-overview"
    >
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1rem,5vw,3rem)]">
        <h2 className="text-[clamp(2rem,3vw+0.5rem,3rem)] font-bold leading-tight tracking-tight text-center mb-14">
          Everything you track, in one place.
        </h2>

        <div
          ref={ref}
          className="bg-card rounded-2xl p-8 max-[640px]:p-6 opacity-0 translate-y-8 transition-all duration-700 ease-(--ease-out-expo) [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 max-[640px]:grid-cols-1">
            {trackables.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2"
              >
                <span className="text-xl w-8 shrink-0 text-center">{item.icon}</span>
                <span className="text-[0.9375rem] text-text-secondary font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
