"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is this app really free?",
    answer:
      "Yes, completely free. No in-app purchases, no subscriptions, no premium tier. Download it, use it forever.",
  },
  {
    question: "Does it require an internet connection?",
    answer:
      "No. The app is fully offline. All your data is stored locally on your device. We offer cloud-sync features, but those are optional.",
  },
  {
    question: "Is my data safe?",
    answer:
      "The app is designed to work completely offline. Your data never leaves your device, unless you enable features like cloud sync or AI coach. Feel free to read our privacy policy if you want to learn more.",
  },
  {
    question: "What platforms does Jumprope Tracker support?",
    answer:
      "Jumprope Tracker is available for Android (via Google Play or direct APK) and iOS (IPA). It's built with React Native, so it runs natively on both platforms.",
  },
  {
    question: "Can I export my workout data?",
    answer:
      "Yes. You can export all your workouts as a CSV or JSON file anytime from the Settings screen. Save it to your files, email it to yourself, or upload it to cloud storage.",
  },
  {
    question: "What is the AI Coach?",
    answer:
      "The AI Coach is an in-app chat assistant that has access to your workout history, goals, and streaks. You can ask it for training advice, request a weekly digest, or even log a workout in plain English.",
  },
  {
    question: "What happens if I miss a day and break my streak?",
    answer:
      "Your streak resets. No freezes, no mercy — that's by design. Consistency is the whole point. You can mark planned rest days in advance to preserve your streak.",
  },
  {
    question: "Is the app open source?",
    answer:
      "Yes! You can find the full source code on GitHub. Contributions and feedback are welcome.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border-b border-border transition-colors duration-200 ${isOpen ? "border-b-orange/30" : ""}`}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer bg-transparent border-none text-text-primary"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[clamp(0.9375rem,1vw+0.25rem,1.0625rem)] pr-4">
          {item.question}
        </span>
        <span
          className={`text-text-secondary shrink-0 transition-transform duration-[250ms] ease-in-out ${isOpen ? "rotate-180" : ""}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 7.5L10 12.5L15 7.5" />
          </svg>
        </span>
      </button>

      <div
        className="grid transition-all duration-[250ms] ease-in-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <p className="text-text-secondary text-[0.9375rem] leading-relaxed pb-5 pr-8">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[clamp(4rem,8vh,7rem)]" id="faq">
      <div className="w-full max-w-[720px] mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-[clamp(2rem,3vw+0.5rem,3rem)] font-bold leading-tight tracking-tight text-center mb-12">
          Frequently asked questions
        </h2>

        <div>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
