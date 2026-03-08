import { HeroSection } from '@/components/landing/hero-section';
import { ValueProposition } from '@/components/landing/value-proposition';
import { TemplatePreview } from '@/components/landing/template-preview';
import { PricingSection } from '@/components/landing/pricing-section';
import { FAQSection } from '@/components/landing/faq-section';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ValueProposition />
      <TemplatePreview />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
