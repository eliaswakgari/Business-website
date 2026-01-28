import { plans } from "./config/plans.config";
import { PricingCard } from "./components/PricingCard";

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-muted/30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container relative px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20 animate-fade-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
            Start free, upgrade as you grow. No hidden fees.
          </p>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-8 items-start">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
