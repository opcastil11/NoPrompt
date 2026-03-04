import ResearchBanner from '@/components/landing/ResearchBanner';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksPreview from '@/components/landing/HowItWorksPreview';
import ResearchContextSection from '@/components/landing/ResearchContextSection';
import CTASection from '@/components/landing/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="px-4 -mt-16 relative z-10">
        <ResearchBanner />
      </div>
      <FeaturesSection />
      <HowItWorksPreview />
      <ResearchContextSection />
      <CTASection />
    </>
  );
}
