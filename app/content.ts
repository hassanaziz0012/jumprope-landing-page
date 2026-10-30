// Homepage copy shared by the React sections and the Markdown version served
// to agents (see app/lib/markdown.ts), so the two never drift apart.

export const hero = {
  tagline: "🔥 Track every jump. Build every streak.",
  headline: "Your Jump Rope Journey, Beautifully Tracked.",
  subheadline:
    "Log workouts, crush goals, and build unstoppable streaks — all offline, all on your device.",
};

export const credibilityItems = [
  { icon: "✨", text: "100% Free" },
  { icon: "📵", text: "Offline, no accounts, no subscriptions" },
  { icon: "🔓", text: "Open source on GitHub" },
];

export interface Feature {
  id: string;
  headline: string;
  body: string;
  screenshot: string;
  badge: { label: string; color: string } | null;
  imageOnLeft: boolean;
}

export const features: Feature[] = [
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

export const philosophyCards = [
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

export const trackables = [
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

export const badges = [
  { name: "First Skip", emoji: "🎉", requirement: "Log your first workout" },
  { name: "7-Day Streak", emoji: "🔥", requirement: "Work out 7 days in a row" },
  { name: "30-Day Streak", emoji: "💪", requirement: "Work out 30 days in a row" },
  { name: "Thousand Club", emoji: "🏅", requirement: "1,000 skips in one session" },
  { name: "Speed Demon", emoji: "⚡", requirement: "150+ avg skips/min" },
  { name: "Million Club", emoji: "👑", requirement: "1,000,000 lifetime skips" },
];

export const faqs = [
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

export const finalCta = {
  headline: "Ready to jump?",
  body: "Free. Offline. No accounts. Just you and your rope.",
};

// ── About page ───────────────────────────────────────

export const aboutPage = {
  headline: "About Jumprope Tracker",
  intro:
    "Jumprope Tracker is a free, offline-first app for logging jump rope workouts, tracking streaks, and hitting your training goals. It's designed, built, and maintained by one person: me, Hassan Aziz, an independent software developer from Pakistan.",
  sections: [
    {
      heading: "Why I built it",
      paragraphs: [
        "I picked up a jump rope to improve my cardio and lose some weight, and it turned out to be the most fun cardio I've ever done. Being the geek that I am, I also wanted to track my progress: how long I jumped, how many skips I landed, how fast I was going, and whether I was actually showing up every day.",
        "So I built an app for it. Jumprope Tracker started as a tool for my own training and grew into a complete workout log with goals, streaks, charts, achievements, share cards, and an optional AI coach.",
      ],
    },
    {
      heading: "What it stands for",
      paragraphs: [
        "Offline first. Everything you log stays on your device. You don't need an account to use the app, and Cloud Sync and the AI Coach are strictly opt-in and off by default.",
        "Minimal and focused. Jumprope Tracker does one thing, tracking jump rope training, and tries to do it exceptionally well. No feature bloat, no distractions.",
        "Delightful to use. Smooth animations and celebratory moments at every milestone. If logging a workout isn't satisfying, you won't stick with it, and neither would I.",
      ],
    },
    {
      heading: "Free and open source",
      paragraphs: [
        "There are no in-app purchases, no subscriptions, and no premium tier. The full source code for the mobile app, the backend API, and this website is public on GitHub. Bug reports, feature requests, and contributions are all welcome.",
      ],
    },
    {
      heading: "Who's behind it",
      paragraphs: [
        "Jumprope Tracker isn't a company. It's a solo project by Hassan Aziz, a software developer who builds web and mobile apps and writes about how he builds them. If you want the technical story behind the app, read the case study on my website.",
      ],
    },
  ],
};

// ── Contact page ─────────────────────────────────────

export const contactPage = {
  headline: "Contact",
  intro:
    "Questions, feedback, a feature idea, or just want to share your latest streak? Send me a message using the form below. Jumprope Tracker is a solo project, so every message comes straight to me, and I read all of them.",
  bugReport: {
    heading: "Reporting a bug",
    intro:
      "For bugs and feature requests, opening an issue on GitHub is the fastest way to get them fixed, since that's where I track all work on the app. To help me reproduce a problem, please include:",
    checklist: [
      "The app version you're running (shown in Settings)",
      "Your phone model and Android or iOS version",
      "What you did, what you expected to happen, and what happened instead",
      "A screenshot or screen recording, if you can",
    ],
  },
  elsewhere: {
    heading: "Other ways to reach me",
    intro:
      "I'm also on the platforms below, where I share what I'm building, including updates on Jumprope Tracker.",
  },
};
