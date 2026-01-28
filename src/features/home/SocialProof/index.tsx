"use client";

import { CompanyLogos } from "./components/CompanyLogos";
import { StatsGrid } from "./components/StatsGrid";

export default function SocialProof() {
  return (
    <section className="relative py-16 sm:py-20 border-y bg-muted/30">
      <div className="container relative px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Trusted by Industry Leaders
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Join thousands of satisfied customers
          </h2>
        </div>

        <CompanyLogos />
        <StatsGrid />
      </div>
    </section>
  );
}
