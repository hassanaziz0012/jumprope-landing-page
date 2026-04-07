import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CredibilityBar from "./components/CredibilityBar";
import FeatureHighlights from "./components/FeatureHighlights";
import PhilosophyCards from "./components/PhilosophyCards";
import TrackingOverview from "./components/TrackingOverview";
import AchievementsTeaser from "./components/AchievementsTeaser";
import ScreenshotShowcase from "./components/ScreenshotShowcase";
import FinalCTA from "./components/FinalCTA";
import FAQ from "./components/FAQ";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CredibilityBar />
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
