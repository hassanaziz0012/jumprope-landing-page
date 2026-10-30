import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureHighlights from "./components/FeatureHighlights";
import PhilosophyCards from "./components/PhilosophyCards";
import TrackingOverview from "./components/TrackingOverview";
import AchievementsTeaser from "./components/AchievementsTeaser";
import ScreenshotShowcase from "./components/ScreenshotShowcase";
import FinalCTA from "./components/FinalCTA";
import FAQ from "./components/FAQ";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { homeJsonLd } from "./lib/jsonLd";

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Navbar />
      <main>
        <Hero />
        <FeatureHighlights />
        <PhilosophyCards />
        <TrackingOverview />
        <AchievementsTeaser />
        <ScreenshotShowcase />
        <FinalCTA />
        <FAQ />
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  );
}
