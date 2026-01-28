import { createClient } from "@/lib/supabase/server";
import { FeatureCard } from "./components/FeatureCard";
import { FileText, Shield, Users, Database, BarChart3, Zap, CheckCircle } from "lucide-react";

export default async function Features() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'published')
    .order('order_index', { ascending: true });

  // Fallback if no services exist
  if (!services || services.length === 0) {
    return (
      <section id="features" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container relative px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No services have been published yet. Log in to the Admin Panel to add your services.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Helper to resolve icon (simple approach: if it looks like a URL/Emoji, use it, else default)
  // Since FeatureCard expects a ReactNode, we'll wrap it.
  const mappedServices = services.map(service => ({
    title: service.title,
    description: service.description || '',
    icon: (
      <div className="text-2xl">
        {/* If it's a URL (rudimentary check), show img; else text (emoji) or icon */}
        {service.icon?.startsWith('http') ? (
          <img src={service.icon} alt="" className="h-6 w-6 object-contain" />
        ) : (
          <span>{service.icon || <CheckCircle className="h-6 w-6" />}</span>
        )}
      </div>
    )
  }));

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container relative px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional solutions tailored to your business needs
          </p>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mappedServices.map((feature: any, index: number) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
