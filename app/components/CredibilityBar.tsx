const items = [
  { icon: "✨", text: "100% Free" },
  { icon: "📵", text: "Offline, no accounts, no subscriptions" },
  { icon: "🔓", text: "Open source on GitHub" },
];

export default function CredibilityBar() {
  return (
    <div
      className="border-y border-border py-5 w-full"
      id="credibility-bar"
    >
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1rem,5vw,3rem)] flex items-center justify-center gap-8 flex-wrap">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {i > 0 && (
              <span className="hidden sm:block text-text-muted mx-2">·</span>
            )}
            <span className="text-[0.8125rem] font-medium text-text-secondary">
              {item.icon} {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
