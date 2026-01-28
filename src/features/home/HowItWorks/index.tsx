"use client";

import { useRef, useEffect } from "react";
import { useInView, useAnimation } from "framer-motion";
import { steps } from "./config/steps.config";
import { SectionHeader } from "./components/SectionHeader";
import {
  FloatingParticles,
  GridOverlay,
} from "./components/BackgroundElements";
import { StepCard } from "./components/StepCard";
import { CtaButton } from "./components/CtaButton";

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <section
      id="how-it-works"
      className="relative py-24 overflow-hidden bg-muted/20"
      ref={sectionRef}
    >
      <FloatingParticles />
      <GridOverlay />

      <div className="container relative px-4 md:px-8 z-10">
        <SectionHeader />

        {/* Interactive Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/70 via-info/70 to-primary/70 rounded-full transform -translate-x-1/2" />

          {/* Steps container */}
          <div className="space-y-20 md:space-y-32">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                index={index}
                mainControls={mainControls}
              />
            ))}
          </div>
        </div>

        <CtaButton isInView={isInView} />
      </div>
    </section>
  );
}
