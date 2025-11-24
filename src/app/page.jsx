import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import PricingSection from "../components/PricingSection";
import CreatorShowcase from "../components/CreatorShowcase";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0B1E]">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CreatorShowcase />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
