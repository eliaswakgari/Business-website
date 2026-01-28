'use client';

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Testimonial } from "@/types";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const initials = testimonial.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="relative flex flex-col h-full p-8 rounded-2xl bg-card border shadow-sm hover:shadow-xl transition-all duration-300 hover-lift animate-fade-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-info/20 blur-2xl rounded-full opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity" />

      {/* Rating Stars */}
      <div className="flex gap-1 mb-6 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>

      {/* Quote text */}
      <blockquote className="flex-1 mb-6 relative">
        <svg
          className="absolute -top-4 -left-2 h-8 w-8 text-primary/10 select-none transform -scale-x-100"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="text-lg leading-relaxed text-foreground relative z-10 pl-4">{testimonial.quote}</p>
      </blockquote>

      {/* Author info */}
      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
        <Avatar className="h-12 w-12 ring-2 ring-primary/10">
          <AvatarImage src={testimonial.avatar} alt={testimonial.author} className="object-cover" />
          <AvatarFallback className="bg-gradient-to-br from-primary to-info text-primary-foreground font-semibold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-foreground">{testimonial.author}</div>
          <div className="text-sm text-primary font-medium">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}
