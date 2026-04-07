"use client";

import { useEffect, useRef } from "react";

const cards = [
  {
    icon: "📵",
    headline: "Offline First",
    body: "All your data lives on your device. No cloud, no accounts, no subscriptions — ever.",
  },
  {
    icon: "🎯",
    headline: "Minimal & Focused",
    body: "One thing, done exceptionally well. No feature bloat. No distractions.",
  },
  {
    icon: "✨",
    headline: "Delightful UX",
    body: "Smooth animations, satisfying interactions, and celebratory moments at every milestone.",
  },
];

export default function PhilosophyCards() {
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
      id="philosophy"
    >
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1rem,5vw,3rem)]">
        <h2 className="text-[clamp(2rem,3vw+0.5rem,3rem)] font-bold leading-tight tracking-tight text-center mb-14">
          Why Jumprope Tracker?
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-3 gap-6 max-[768px]:grid-cols-1 opacity-0 translate-y-8 transition-all duration-700 ease-(--ease-out-expo) [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
        >
          {cards.map((card) => (
            <div
              key={card.headline}
              className="bg-card rounded-2xl p-6 border-t-2 border-orange transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="text-3xl text-lime mb-4 block">{card.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{card.headline}</h3>
              <p className="text-text-secondary text-[0.9375rem] leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
