'use client';

import type { FeatureItem } from "../config/features.config";

interface FeatureCardProps {
  feature: FeatureItem;
  index?: number;
}

export function FeatureCard({ feature, index = 0 }: FeatureCardProps) {
  return (
    <div
      className="relative group animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-info/30 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
      <div className="relative flex flex-col h-full rounded-xl border bg-card/50 backdrop-blur-sm p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift glass-card">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-info/20 text-primary ring-1 ring-primary/30 group-hover:scale-110 transition-transform duration-300">
          <div className="group-hover:animate-bounce-slow">
            {feature.icon}
          </div>
        </div>
        <h3 className="mb-3 text-xl font-semibold group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
