# Jumprope Tracker — Landing Page Plan (Revised)

A dark, high-energy landing page that sells the app's core philosophy: **simple, beautiful, offline-first jump rope tracking**. The design mirrors the app's own aesthetic — near-black backgrounds, electric orange accents, and lime green highlights — making it feel like a natural extension of the product.

**Hosting URL**: `https://jumprope.hassandev.me`
**GitHub URL**: `https://github.com/hassanaziz0012/jumprope-tracker`

---

## Brand Tokens (from styleguide)

| Token | Value |
|---|---|
| Primary Orange | `#ff5526` |
| Primary Lime | `#ccfa53` |
| Background | `#0a0a0a` |
| Card surface | `#1a1a1a` |
| Secondary surface | `#2a2a2a` |
| Primary text | `#ffffff` |
| Secondary text | `#a0a0a0` |
| Font | **Inter** (Google Fonts) |

**NOTE:** Make sure to store all design tokens in `app/globals.css` so we reuse them and don't write repetitive code.

---

## Page Sections (in order)

### 1. 🔝 Navigation Bar (Sticky)

- **Left**: App icon + wordmark "Jumprope Tracker"
- **Right**: "Download" CTA button — Primary Orange, pill-shaped — triggers a dropdown (see Download Dropdown spec below)
- Semi-transparent dark background with `backdrop-filter: blur(12px)` so content is visible on scroll
- Thin bottom border appears only on scroll: `1px solid #2a2a2a`

---

### 2. 🦸 Hero Section

**Goal**: Immediate wow factor. Communicate the app's purpose and premium feel within 3 seconds.

**Layout**: Two-column. Left = text + CTA. Right = 3 stacked/angled phone mockups.

**Text content**:
- Eyebrow (lime green pill badge): `🔥 Track every jump. Build every streak.`
- **H1**: `Your Jump Rope Journey, Beautifully Tracked.`
- **Subheadline**: `Log workouts, crush goals, and build unstoppable streaks — all offline, all on your device.`
- **Primary CTA**: "Download" button (orange, opens Download Dropdown — see spec below)
- **Secondary link**: `View on GitHub →` (links to `https://github.com/hassanaziz0012/jumprope-tracker`)

**Phone mockup display**:
- Show 3 phone screenshots in stylized device frames, arranged in a fanned/staggered composition:
  - **Center (primary)**: `home.jpg` — slightly larger, front-most
  - **Left (secondary)**: `goals-page.jpg` — slightly rotated and behind
  - **Right (secondary)**: `workout-details.jpg` — slightly rotated and behind
- On **mobile**, only render the `home.jpg` mockup (center one), hide the other two to preserve space
- Behind the phones: a slow-pulse radial glow in orange/lime (`#ff5526` at ~8% opacity, `#ccfa53` at ~5% opacity)
- Optional: 2–3 floating stat badges near the phones (CSS keyframe float animation):
  - `🔥 47-day streak`
  - `⚡ 182 skips/min`
  - `✅ Daily goal hit`

---

### 3. 📣 Credibility Bar

A narrow strip between Hero and Features. Muted, scannable, no fluff.

**Content (3 items, icon-separated)**:
- `📵 Offline. No accounts. No subscriptions.`
- `📱 Android & iOS`
- `🔓 Open source on GitHub`

Text style: `#a0a0a0`, Caption size (~13px). Thin top/bottom borders in `#2a2a2a`.

---

### 4. ✨ Feature Highlights

**Goal**: Walk visitors through the 5 key features with real app screenshots as proof.

**Layout**: Alternating left/right rows (screenshot + text). Stacks vertically on mobile.

> [!IMPORTANT]
> **Implementation note**: All 5 features must be defined as a **single data array** that gets mapped over to render the rows. No copy-pasting JSX per feature. Structure each item as an object with: `id`, `headline`, `body`, `screenshot`, `badge` (optional), `imageOnLeft` (boolean for alternating layout).

**Feature data array**:

```js
const features = [
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
```

Each row: screenshot in a phone/device frame on one side, headline + body + optional badge on the other. Rows animate in from the side on scroll (Intersection Observer + CSS transition).

---

### 5. 🃏 Philosophy Cards ("Why Jumprope Tracker?")

**Goal**: Reinforce the 3 core values in a visually premium card grid.

**Layout**: 3-column card grid (collapses to 1 column on mobile).

| # | Icon | Headline | Body |
|---|---|---|---|
| 1 | 📵 | **Offline First** | All your data lives on your device. No cloud, no accounts, no subscriptions — ever. |
| 2 | 🎯 | **Minimal & Focused** | One thing, done exceptionally well. No feature bloat. No distractions. |
| 3 | ✨ | **Delightful UX** | Smooth animations, satisfying interactions, and celebratory moments at every milestone. |

**Card styling**: `#1a1a1a` background, 16–20px border radius, 16–20px padding. Accent: thin top border in Primary Orange (`#ff5526`) per card. Icons in Lime Green.

---

### 6. 📊 "Everything You Can Track"

**Goal**: A scannable, at-a-glance overview of all trackable metrics and features.

**Section headline**: `Everything you track, in one place.`

**Layout**: Two-column icon + label list, inside a dark card (`#1a1a1a`). On mobile: single column.

**Items**:
- ⏱ Duration
- 🔢 Total Skips & Avg Skips/Min
- 🪢 Trips (interruptions/misses)
- 🔥 Calories Burned
- ❤️ Heart Rate (Avg & Max)
- 📝 Workout Notes
- 📈 Custom Charts (Bar, Line, Area)
- 🎯 Goals (Daily & Weekly, multiple simultaneous)
- 🔥 Workout Streaks + Rest Days
- 🏆 Achievements & Badges
- 📤 CSV & JSON Export
- 🤖 AI Coach + Weekly Digest

---

### 7. 🏆 Achievements Teaser

**Goal**: Gamification is a major selling point. Show it off visually to create FOMO.

**Section headline**: `Earn badges. Build momentum.`
**Subheadline**: `From your first skip to a million — every milestone is celebrated.`

**Layout**: Horizontal scrollable row on mobile; 3–4 column grid on desktop.

**Badge cards to show** (a curated sample):

| Badge | Emoji | Requirement |
|---|---|---|
| First Skip | 🎉 | Log your first workout |
| 7-Day Streak | 🔥 | Work out 7 days in a row |
| 30-Day Streak | 💪 | Work out 30 days in a row |
| Thousand Club | 🏅 | 1,000 skips in one session |
| Speed Demon | ⚡ | 150+ avg skips/min |
| Million Club | 👑 | 1,000,000 lifetime skips |

Each badge: dark card, large centered emoji, bold badge name, muted description. Subtle scale/glow on hover.

---

### 8. 📱 Screenshot Showcase

**Goal**: Let the UI speak for itself with a gallery of real app screens.

**Layout**: Horizontal scrollable strip (snap scrolling) of phone mockups on desktop and mobile alike.

**Screenshots**:
- `home.jpg`
- `charts-page.jpg`
- `goals-page.jpg`
- `streak-page.jpg`
- `workout-details.jpg`

**Background**: Subtle orange radial glow on `#0a0a0a` behind the phone frames.

---

### 9. 📥 Final CTA Section

**Goal**: Strong closing statement with a conversion-focused CTA.

**Background**: Full-width section with a faint dark-orange radial glow — `#ff5526` at ~6% opacity centered — giving it energy without breaking the dark aesthetic.

**Content**:
- **Headline**: `Ready to jump?`
- **Subheadline**: `Free. Offline. No accounts. Just you and your rope.`
- **Primary CTA**: "Download" button (orange) → opens Download Dropdown
- **Secondary**: `⭐ Star on GitHub` (links to `https://github.com/hassanaziz0012/jumprope-tracker`)

---

### 10. ❓ FAQ Section

**Goal**: Proactively answer hesitations and build trust.

**Layout**: Full-width section, single-column accordion. Max-width container (e.g., 720px) centered.

**Section headline**: `Frequently asked questions`

> [!IMPORTANT]
> **Implementation note**: All FAQs must be stored in a **data array** and mapped over to render accordion items. No hardcoded JSX per question. Each item: `{ question: string, answer: string }`.

**Accordion behavior**:
- Only one item open at a time (or allow multiple — your call)
- Animated open/close: height transition + chevron rotation (180°)
- Animation: `max-height` transition with `ease-in-out`, ~250ms
- Open state: answer text fades in, top border of item gets a subtle orange tint
- Closed state: chevron points down, answer hidden

**Suggested FAQ data array** (user can add more):

```js
const faqs = [
  {
    question: "Is this app really free?",
    answer: "Yes, completely free. No in-app purchases, no subscriptions, no premium tier. Download it, use it forever.",
  },
  {
    question: "Does it require an internet connection?",
    answer: "No. The app is fully offline. All your data is stored locally on your device. No accounts, no sign-up, no cloud sync.",
  },
  {
    question: "Is my data safe?",
    answer: "Your data never leaves your device. It's stored in a local database on your phone. We have no servers, no backend — there's literally nowhere for your data to go.",
  },
  {
    question: "What platforms does Jumprope Tracker support?",
    answer: "Jumprope Tracker is available for Android (via Google Play or direct APK) and iOS (IPA). It's built with React Native, so it runs natively on both platforms.",
  },
  {
    question: "Can I export my workout data?",
    answer: "Yes. You can export all your workouts as a CSV or JSON file anytime from the Settings screen. Save it to your files, email it to yourself, or upload it to cloud storage.",
  },
  {
    question: "What is the AI Coach?",
    answer: "The AI Coach is an in-app chat assistant that has access to your workout history, goals, and streaks. You can ask it for training advice, request a weekly digest, or even log a workout in plain English.",
  },
  {
    question: "What happens if I miss a day and break my streak?",
    answer: "Your streak resets. No freezes, no mercy — that's by design. Consistency is the whole point. You can mark planned rest days in advance to preserve your streak.",
  },
  {
    question: "Is the app open source?",
    answer: "Yes! You can find the full source code on GitHub. Contributions and feedback are welcome.",
  },
];
```

---

### 11. 🔒 Privacy Policy Section

**Goal**: Provide legal/trust coverage in a low-profile, footnote-style section.

**Layout**: Full-width section, single text block. Smaller font (13–14px), muted color (`#666666`). Separated from the FAQ section by a thin `#2a2a2a` divider.

**Section label**: `Privacy Policy` (small caps or muted H3)

**Placeholder content** (user will replace):

```
Last updated: April 2026

Jumprope Tracker is an offline-first application. We do not collect, store, or transmit any personal data. All workout data, goals, and settings are stored locally on your device using on-device storage and are never sent to any server.

[Placeholder: Add your full privacy policy text here. Cover: data collection (none), third-party services, AI Coach data handling, analytics (if any), contact information.]

If you have any questions about your privacy, contact hassan@example.com.
```

**Style**: Light gray text on `#0a0a0a`. No card background — just inline text with generous top/bottom padding.

---

### 12. 🦶 Footer

Minimal and clean.

- **Left**: App icon + "Jumprope Tracker" + tagline: `"Built with ❤️ by Hassan"`
- **Right**: Social links — [Twitter/X](https://x.com/nothassanaziz) · [YouTube](https://youtube.com/@itshassanaziz) · [GitHub](https://github.com/hassanaziz0012)
- **Bottom bar**: `© 2026 Jumprope Tracker. All data stays on your device. · hassandev.me`
- Top of footer: thin `#2a2a2a` divider

---

## 🔽 Download Dropdown Spec

Used in both the **Nav bar** and the **two CTA sections** (Hero + Final CTA).

**Trigger**: An orange button labeled "Download ↓" (or "Download ▾").

**Dropdown panel** (appears below the button on click):
- Dark card (`#1a1a1a`), `12px` border-radius, subtle box-shadow
- 3 options, each a clickable row:

| Option | Icon | Label | Description |
|---|---|---|---|
| 1 | 🤖 | **Google Play** | Download from the Play Store *(recommended)* |
| 2 | 📦 | **Download APK** | Android — manual install |
| 3 | 🍎 | **Download IPA** | iOS — manual install |

- Animate open: `opacity` + `translateY` transition (~200ms ease-out)
- Close on: click outside, Escape key, or selecting an option
- All three links can be `#` placeholders until real URLs are available
- On mobile: dropdown expands below button full-width or as a bottom sheet

---

## Design Direction

### Mood & Aesthetic
- **Dark-first**, athletic, premium — like the app itself
- Reference vibes: Raycast, Linear, Vercel — but with more energy and physicality befitting a fitness app

### Key Visual Treatments
- **Background**: `#0a0a0a` throughout; section breaks via subtle radial glows, NOT solid-color section backgrounds
- **Cards**: `#1a1a1a`, 16–20px border radius, no borders — depth via background contrast
- **Phone mockups**: CSS/SVG device frames, screenshots inside, orange/lime glow beneath
- **Animations** (subtle, purposeful):
  - Hero text + badge: staggered fade-in on load
  - Feature rows: slide in from opposite side on scroll (Intersection Observer)
  - Floating hero badges: gentle CSS keyframe float
  - CTA button: shimmer/pulse effect
  - Download dropdown: `opacity` + `translateY` slide-in
  - FAQ accordion: `max-height` + chevron rotate, `ease-in-out` 250ms
  - Achievement cards: scale + glow on hover

### Typography Hierarchy
| Element | Size | Weight |
|---|---|---|
| H1 (Hero) | 56–72px | 700 Bold |
| H2 (Section headings) | 36–48px | 700 Bold |
| H3 (Card titles) | 20–24px | 600 SemiBold |
| Body | 16–18px | 400 Regular |
| Caption / eyebrow | 12–14px | 500 Medium |
| Privacy / footnote | 13–14px | 400 Regular, `#666666` |

---

## Page Layout Summary

```
┌─────────────────────────────────────┐
│  1. NAV BAR (sticky, blur)          │
├─────────────────────────────────────┤
│  2. HERO                            │
│     Headline + CTA  | 3 phones      │
│                     | (1 on mobile) │
├─────────────────────────────────────┤
│  3. CREDIBILITY BAR                 │
├─────────────────────────────────────┤
│  4. FEATURE HIGHLIGHTS              │
│     (data array → mapped rows)      │
├─────────────────────────────────────┤
│  5. PHILOSOPHY CARDS (3-col)        │
├─────────────────────────────────────┤
│  6. EVERYTHING YOU CAN TRACK        │
├─────────────────────────────────────┤
│  7. ACHIEVEMENTS TEASER             │
├─────────────────────────────────────┤
│  8. SCREENSHOT SHOWCASE             │
├─────────────────────────────────────┤
│  9. FINAL CTA                       │
├─────────────────────────────────────┤
│ 10. FAQ ACCORDION                   │
│     (data array → mapped items)     │
├─────────────────────────────────────┤
│ 11. PRIVACY POLICY                  │
├─────────────────────────────────────┤
│ 12. FOOTER                          │
└─────────────────────────────────────┘
```

---

## Assets Inventory

| File | Section Used |
|---|---|
| `public/images/icon.png` | Nav logo, Footer logo, Favicon |
| `public/images/home.jpg` | Hero (center phone), Screenshot Showcase |
| `public/images/goals-page.jpg` | Hero (left phone) |
| `public/images/workout-details.jpg` | Hero (right phone) |
| `public/images/log-workouts-thumbnail.png` | Feature: Workout Logging |
| `public/images/ai-coach-thumbnail.png` | Feature: AI Coach |
| `public/images/streaks-thumbnail.png` | Feature: Streak Tracking |
| `public/images/goal-tracking-thumbnail.png` | Feature: Goal Tracking |
| `public/images/share-cards-thumbnail.png` | Feature: Share Cards |
| `public/images/charts-page.jpg` | Screenshot Showcase |
| `public/images/streak-page.jpg` | Screenshot Showcase |

---
