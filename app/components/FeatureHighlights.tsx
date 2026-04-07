"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Feature {
  id: string;
  headline: string;
  body: string;
  screenshot: string;
  badge: { label: string; color: string } | null;
  imageOnLeft: boolean;
}

const features: Feature[] = [
  {
    id: "workout-logging",
    headline: "Log every rep. Miss nothing.",
    body: "Track duration, skip count, trips, calories, heart rate, and notes. Everything you need — nothing you don't.",
    screenshot: "/images/log-workouts-thumbnail.png",
    badge: null,
    imageOnLeft: true,
  },
  {
    id: "ai-coach",
    headline: "Your personal coach, powered by AI.",
    body: "Ask questions, get personalized advice, or just log a workout in plain English. The coach knows your data — your workouts, your goals, all of it.",
    screenshot: "/images/ai-coach-thumbnail.png",
    badge: { label: "✨ New", color: "#ccfa53" },
    imageOnLeft: false,
  },
  {
    id: "streaks",
    headline: "Build streaks. Break records.",
    body: "Keep the flame alive with consecutive-day tracking. Mark rest days to protect your streak. No excuses — if it breaks, it breaks.",
    screenshot: "/images/streaks-thumbnail.png",
    badge: null,
    imageOnLeft: true,
  },
  {
    id: "goals",
    headline: "Set goals. Crush them. Repeat.",
    body: "Daily and weekly goals for skips, calories, duration, or workout count. Progress rings keep you honest. Automatic resets so you're always moving forward.",
    screenshot: "/images/goal-tracking-thumbnail.png",
    badge: null,
    imageOnLeft: false,
  },
  {
    id: "share-cards",
    headline: "Show off your progress.",
    body: "Generate beautiful, branded share cards for milestones, streaks, and personal records. No watermarks. Just clean, shareable wins.",
    screenshot: "/images/share-cards-thumbnail.png",
    badge: null,
    imageOnLeft: true,
  },
];

function FeatureRow({ feature }: { feature: Feature }) {
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

  const imageBlock = (
    <div className="flex justify-center w-full">
      <div className="phone-frame w-full max-w-[320px] md:max-w-[460px] lg:max-w-[540px] xl:max-w-[600px]">
        <Image
          src={feature.screenshot}
          alt={feature.headline}
          width={600}
          height={1300}
          className="w-full h-auto"
        />
      </div>
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center gap-4 max-[900px]:text-center max-[900px]:items-center">
      {feature.badge && (
        <span
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold w-fit"
          style={{
            color: feature.badge.color,
            background: `${feature.badge.color}20`,
          }}
        >
          {feature.badge.label}
        </span>
      )}
      <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-tight tracking-tight">
        {feature.headline}
      </h3>
      <p className="text-text-secondary text-[clamp(1rem,1vw+0.25rem,1.125rem)] leading-relaxed max-w-[480px]">
        {feature.body}
      </p>
    </div>
  );

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 gap-8 items-center max-[900px]:grid-cols-1 max-[900px]:gap-10 opacity-0 transition-all duration-700 ease-(--ease-out-expo) [&.animate-in]:opacity-100 ${feature.imageOnLeft
          ? "translate-x-[-60px] [&.animate-in]:translate-x-0"
          : "translate-x-[60px] [&.animate-in]:translate-x-0"
        }`}
      id={`feature-${feature.id}`}
    >
      {feature.imageOnLeft ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          <div className="max-[900px]:order-2">{textBlock}</div>
          <div className="max-[900px]:order-1">{imageBlock}</div>
        </>
      )}
    </div>
  );
}

export default function FeatureHighlights() {
  return (
    <section
      className="py-[clamp(4rem,8vh,7rem)] overflow-hidden"
      id="features"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-24 max-[900px]:gap-20">
        {features.map((feature) => (
          <FeatureRow key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}
