import { createClient } from "@/lib/supabase/server";
import { TestimonialCard } from "./components/TestimonialCard";
import ViewAllButton from "@/components/ui/ViewAllButton";

export default async function Testimonials() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'published')
    .order('order_index', { ascending: true });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const mappedTestimonials = testimonials.map((t: any) => ({
    author: t.author_name,
    role: t.author_role || '', // Handle nulls
    company: t.author_company || '',
    avatar: t.author_avatar || '',
    quote: t.content,
    rating: t.rating || 5, // Default to 5 stars if null
  }));

  // Show only first 3 testimonials on homepage
  const displayedTestimonials = mappedTestimonials.slice(0, 3);
  const hasMore = testimonials.length > 3;

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container relative px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20 animate-fade-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
            See what our clients say about working with us.
          </p>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedTestimonials.map((testimonial: any, index: number) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
          <ViewAllButton href="/testimonials" />
        </div>
      </div>
    </section>
  );
}
