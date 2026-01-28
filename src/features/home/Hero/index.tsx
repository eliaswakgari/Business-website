import { GridPattern } from "./components/GridPattern";
import { HeroContent } from "./components/HeroContent";
import { HeroImage } from "./components/HeroImage";
import { MovingStars } from "./components/MovingStars";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Moving Colorful Stars - Very bottom layer */}
      <MovingStars />

      {/* Premium gradient background - subtle overlay to blend */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />

      {/* Animated decorative blur elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-info/20 blur-3xl animate-pulse-glow [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl animate-float" />
      </div>

      {/* Background SVG pattern */}
      <GridPattern />

      <div className="container relative px-4 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
}
