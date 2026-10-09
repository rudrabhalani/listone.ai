import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { MarketplaceMarquee } from "@/components/landing/MarketplaceMarquee";
import { BeforeAfterSlider } from "@/components/landing/BeforeAfterSlider";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesBento } from "@/components/landing/FeaturesBento";
import { EditorDemo } from "@/components/landing/EditorDemo";
import { ExamplesGallery } from "@/components/landing/ExamplesGallery";
import { AiChatPreview } from "@/components/landing/AiChatPreview";
import { StatsSection } from "@/components/landing/StatsSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { FaqSection } from "@/components/landing/FaqSection";
import { FounderSection } from "@/components/landing/FounderSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0B14] text-[#E5E7EB] flex flex-col selection:bg-brand-violet/30 selection:text-white">
      {/* 1. Sticky Glass Navbar with Subscription in Upper Panel */}
      <Navbar />

      {/* 2. Hero with Aurora gradient & Clean CTAs */}
      <Hero />

      {/* 3. Marketplace Marquee (Amazon, Flipkart, Shopify, Etsy, Meesho) */}
      <MarketplaceMarquee />

      {/* 4. Interactive Before / After Slider */}
      <BeforeAfterSlider />

      {/* 5. How It Works (3 Glowing Step Cards) */}
      <HowItWorks />

      {/* 6. Features Bento Grid */}
      <FeaturesBento />

      {/* 7. Canva-style Editor Demo */}
      <EditorDemo />

      {/* 8. Examples Gallery with Masonry & Filters */}
      <ExamplesGallery />

      {/* 9. AI Chat Preview */}
      <AiChatPreview />

      {/* 10. Platform Stats (Sample benchmark data) */}
      <StatsSection />

      {/* 11. Testimonials Carousel (Sample) */}
      <Testimonials />

      {/* 12. FAQ Accordion */}
      <FaqSection />

      {/* 13. Founder Section: BHALANI RUDRA SANDIPBHAI */}
      <FounderSection />

      {/* 14. Full-width Gradient Final CTA */}
      <FinalCta />

      {/* 15. Dark Footer with About as last link */}
      <Footer />
    </main>
  );
}
