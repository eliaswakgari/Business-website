import { Header, Footer } from "@/layouts";
import {
  Hero,
  SocialProof,
  Features,
  HowItWorks,
  Testimonials,
  Pricing,
  ComparisonTable,
  Integrations,
  Faq,
  BlogPreview,
  Cta,
  Team,
  CaseStudies,
} from "@/features/home";

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <Header />
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <CaseStudies />
      <Testimonials />
      <Team />
      <Faq />
      <BlogPreview />
      <Cta />
      <Footer />
    </div>
  );
}
