import { MarketingNav } from "@/components/marketing/nav";
import { Hero } from "@/components/marketing/hero";
import { Logos } from "@/components/marketing/logos";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Features } from "@/components/marketing/features";
import { MagicMoment } from "@/components/marketing/magic-moment";
import { Testimonials } from "@/components/marketing/testimonials";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { CTA } from "@/components/marketing/cta";
import { MarketingFooter } from "@/components/marketing/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <MarketingNav />
      <Hero />
      <Logos />
      <HowItWorks />
      <MagicMoment />
      <Features />
      <Testimonials />
      <Pricing />
      <section id="faq">
        <FAQ />
      </section>
      <CTA />
      <MarketingFooter />
    </main>
  );
}
