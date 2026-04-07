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
        <div className="text-text-muted text-[0.8125rem] leading-relaxed space-y-8">
          <div className="space-y-4">
            <div>
              <p>Effective Date: April 7, 2026 &middot; Last Updated: April 7, 2026</p>
            </div>

            <p><strong className="text-text-primary">The short version:</strong> This app works completely offline by default. Your data stays on your device unless you turn on Cloud Sync or the AI Coach &mdash; both are off by default and clearly explained below.</p>
          </div>

          <div className="space-y-3">
            <h1 className="text-base font-bold text-text-primary">1. Who made this app?</h1>
            <p>Jump Rope Tracker was built by <strong className="text-text-primary">Hassan Aziz</strong>, an independent developer. This is not a company &mdash; it&apos;s a solo hobby project.</p>
            <p>If you have any questions or concerns about your privacy, you can reach out directly at <a href={`mailto:${email}`} className="text-text-secondary hover:text-text-primary transition-colors duration-200 underline underline-offset-2 font-medium">hassanaziz0012@gmail.com</a>.</p>
          </div>

          <div className="space-y-3">
            <h1 className="text-base font-bold text-text-primary">2. Who is this app for?</h1>
            <p>This app is for people aged 13 and older. If you&apos;re under 13, please don&apos;t use it. I don&apos;t knowingly collect information from children under 13, and if I find out that&apos;s happened, I&apos;ll delete that data.</p>
          </div>

          <div className="space-y-3">
            <h1 className="text-base font-bold text-text-primary">3. By default: your data never leaves your phone</h1>
            <p>Everything you log &mdash; workouts, goals, streaks, charts, notes &mdash; is saved only on your device. Nothing is sent anywhere unless you turn on one of the optional features below.</p>
            <p>This also applies to notifications. Streak reminders and goal nudges are generated entirely on your device. No server is involved.</p>
            <p>The social sharing feature works the same way: it creates a shareable image on your device. That image goes nowhere unless you choose to send it yourself. Once you share it via WhatsApp, email, or any other app, what happens to it is up to that app, not this one.</p>
          </div>

          <div className="space-y-3">
            <h1 className="text-base font-bold text-text-primary">4. Cloud Sync (optional &mdash; off by default)</h1>
            <p>If you turn on Cloud Sync, you&apos;ll need to create an account using your name and email address. Once enabled, all of your app data is backed up to a server &mdash; workouts, goals, streaks, charts, notes, everything.</p>

            <h2 className="text-sm font-semibold text-text-primary mt-4">Where is it stored?</h2>
            <p>Your data is stored on servers hosted by Vercel and NeonDB. These are reputable cloud infrastructure providers, but they operate under their own privacy policies and terms of service, which are outside my control.</p>

            <h2 className="text-sm font-semibold text-text-primary mt-4">Want to delete your data?</h2>
            <p>Turn off cloud sync for your account inside the app, and all your data will be automatically deleted from our cloud servers.</p>
          </div>

          <div className="space-y-3">
            <h1 className="text-base font-bold text-text-primary">5. AI Training Coach (optional &mdash; off by default)</h1>
            <p>The AI Coach gives you personalized coaching and analysis based on your workout history. It&apos;s powered by Google Gemini. Before you can turn it on, you&apos;ll see a clear explanation of what data gets shared and where it goes &mdash; you have to explicitly agree.</p>

            <h2 className="text-sm font-semibold text-text-primary mt-4">What gets sent to Google?</h2>
            <p>When the AI Coach is active, the following is sent to Google&apos;s Gemini API (via my backend server):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your workout data, including any notes you&apos;ve written</li>
              <li>Your goals and progress</li>
              <li>Your streak and rest day history</li>
              <li>Your chat history with the coach</li>
            </ul>
            <p><strong className="text-text-primary">Heads up:</strong> Your workout notes are plain text and are included when your data is sent to Gemini. Avoid putting sensitive personal information in your notes if you plan to use the AI Coach.</p>

            <h2 className="text-sm font-semibold text-text-primary mt-4">Google&apos;s role</h2>
            <p>Google processes the data you send through the AI Coach according to their own privacy policy. I don&apos;t control what Google does with that data on their end.</p>

            <h2 className="text-sm font-semibold text-text-primary mt-4">Chat history</h2>
            <p>Your conversations with the AI Coach are stored on my server and kept until you delete them. There&apos;s no automatic expiry. You can delete individual chats or everything from within the app&apos;s Settings.</p>

            <h2 className="text-sm font-semibold text-text-primary mt-4">Turning it off</h2>
            <p>You can disable the AI Coach at any time in Settings. This immediately stops all data from being sent. You&apos;ll also be given the option to delete your stored conversation history.</p>
          </div>

          <div className="space-y-3">
            <h1 className="text-base font-bold text-text-primary">6. Crash reporting (Sentry)</h1>
            <p>The app uses a service called Sentry to catch bugs and crashes. This runs in the background for all users and helps me fix problems.</p>
            <p>When a crash or error happens, Sentry may collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your device type and operating system version</li>
              <li>The app version you&apos;re running</li>
              <li>Your IP address</li>
              <li>What you were doing in the app just before the crash</li>
              <li>Technical error details</li>
            </ul>
            <p>If you&apos;re logged into a Cloud Sync account when a crash happens, your account details may be associated with the crash report. This helps me debug account-specific issues.</p>
            <p>Crash data is handled by Sentry, Inc. under their own privacy policy at <a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors duration-200 underline underline-offset-2">https://sentry.io/privacy/</a>. I only use this data to fix bugs.</p>
          </div>

          <div className="space-y-3">
            <h1 className="text-base font-bold text-text-primary">7. A note on third-party services</h1>
            <p>This app connects to a few external services when you use optional features. Each of these services is responsible for their own data practices:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Vercel &mdash; hosts the backend server</li>
              <li>NeonDB &mdash; stores your synced data</li>
              <li>Google Gemini &mdash; powers the AI Coach</li>
              <li>Sentry &mdash; handles crash reporting</li>
            </ul>
            <p>I&apos;ve chosen reputable providers and use encrypted connections for all data in transit. But I&apos;m a solo developer, not a security company. If something goes wrong on the side of one of these providers, that&apos;s outside my control and beyond what I can be held responsible for. By using these optional features, you&apos;re also agreeing to those providers&apos; own terms.</p>
          </div>

          <div className="space-y-3">
            <h1 className="text-base font-bold text-text-primary">8. Changes to this policy</h1>
            <p>If I make significant changes to this policy, I&apos;ll let you know through the app. The &quot;Last Updated&quot; date at the top of this document will always reflect the latest version. Continuing to use the app after a change means you&apos;re okay with the updated policy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
