import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ctaConfig } from "./config/cta.config";
import { FeaturesList } from "./components/FeaturesList";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="container relative px-4 md:px-8">
        <div className="relative mx-auto max-w-5xl">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border bg-card shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />

            <div className="relative px-8 py-16 sm:px-16 sm:py-24">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {ctaConfig.headline}
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  {ctaConfig.description}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link href="/contact">
                    <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg">
                      Contact Us
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-16">
                <FeaturesList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
