import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PricingPlan } from "@/types";
import Link from "next/link";

interface PricingCardProps {
  plan: PricingPlan;
  index?: number;
}

export function PricingCard({ plan, index = 0 }: PricingCardProps) {
  const buttonHref = "/contact";

  return (
    <div
      className="relative h-full animate-fade-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <Card
        className={`relative flex flex-col h-full transition-all duration-300 ${plan.popular
          ? "border-primary shadow-2xl scale-105 bg-card z-10 hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] gradient-border"
          : "border shadow-sm hover:shadow-xl hover:scale-[1.02] bg-card/50 backdrop-blur-sm"
          }`}
      >
        {plan.popular && (
          <div className="absolute -top-5 left-0 right-0 mx-auto w-40 animate-float">
            <Badge className="w-full justify-center py-1.5 shadow-lg bg-gradient-to-r from-primary to-info border-0 text-white font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 fill-current" />
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader className={`pb-8 pt-10 ${plan.popular ? 'pt-12' : ''}`}>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>
          <div className="mt-6 flex items-baseline">
            <span className="text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              {plan.price}
            </span>
            {plan.price !== "Custom" && <span className="ml-2 text-muted-foreground font-medium">/month</span>}
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-6">
          <div className="h-px w-full bg-border/50" />
          <ul className="space-y-4">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3 group">
                <div className={`mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                    <Check className="h-3.5 w-3.5" />
                  </div>
                </div>
                <span className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="pt-6 pb-8">
          <Link href={buttonHref} className="w-full">
            <Button
              size="lg"
              className={`w-full font-semibold h-12 text-base transition-all duration-300 ${plan.popular
                ? "bg-gradient-to-r from-primary to-info hover:opacity-90 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                : "hover:bg-primary/5"
                }`}
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.name === "Enterprise" ? "Contact Sales" : "Contact Us"}
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Background glow for popular plan */}
      {plan.popular && (
        <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-3xl opacity-40 pointer-events-none" />
      )}
    </div>
  );
}
