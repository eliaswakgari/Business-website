'use client';

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { heroConfig } from "../config/hero.config";
import Link from "next/link";

export function HeroContent() {
  return (
    <>
      <div className="mb-8 flex justify-center animate-fade-down">
        <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium border shadow-sm hover-lift">
          <Sparkles className="mr-2 h-3.5 w-3.5 text-primary animate-pulse-glow" />
          <span className="text-primary font-semibold">{heroConfig.badge.label}</span>
          <span className="mx-2 text-muted-foreground">·</span>
          <span>{heroConfig.badge.text}</span>
        </Badge>
      </div>
      <h1 className="mb-6 mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-up">
        <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          {heroConfig.headline}
        </span>
      </h1>
      <p className="mb-10 mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl leading-relaxed animate-fade-up [animation-delay:200ms]">
        {heroConfig.description}
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-up [animation-delay:400ms]">
        <Link href="/admin">
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base font-semibold hover-lift"
          >
            {heroConfig.secondaryButton.text}
          </Button>
        </Link>
      </div>

      {/* Trust indicators */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-up [animation-delay:600ms]">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>No credit card required</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Free forever plan</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Setup in 5 minutes</span>
        </div>
      </div>
    </>
  );
}
