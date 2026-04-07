export default function PrivacyPolicy() {
  const email = "hassanaziz0012@gmail.com"

  return (
    <section
      className="py-[clamp(3rem,6vh,5rem)] border-t border-border"
      id="privacy-policy"
    >
      <div className="w-full max-w-[720px] mx-auto px-[clamp(1rem,5vw,3rem)]">
        <h3 className="text-text-muted text-sm font-semibold uppercase tracking-wider mb-6">
          Privacy Policy
        </h3>
        <div className="text-text-muted text-[0.8125rem] leading-relaxed space-y-4">
          <p>Last updated: April 2026</p>
          <p>
            Jumprope Tracker is an offline-first application. We do not collect,
            store, or transmit any personal data. All workout data, goals, and
            settings are stored locally on your device using on-device storage
            and are never sent to any server.
          </p>
          <p className="text-text-muted/60">
            [Placeholder: Add your full privacy policy text here. Cover: data
            collection (none), third-party services, AI Coach data handling,
            analytics (if any), contact information.]
          </p>
          <p>
            If you have any questions about your privacy, {" "}
            <a
              href={`mailto:${email}`}
              className="text-text-secondary hover:text-text-primary transition-colors duration-200 underline underline-offset-2"
            >
              email me here
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
