import { Header, Footer } from "@/layouts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { createClient } from "@/lib/supabase/server";
import { TestimonialCard } from "@/features/home/Testimonials/components/TestimonialCard";
import { Star } from "lucide-react";

export default async function TestimonialsPage() {
    const supabase = await createClient();
    const { data: testimonials } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'published')
        .order('order_index', { ascending: true });

    const mappedTestimonials = testimonials?.map((t: any) => ({
        author: t.author_name,
        role: t.author_role || '',
        company: t.author_company || '',
        avatar: t.author_avatar || '',
        quote: t.content,
        rating: t.rating || 5,
    })) || [];

    // Calculate average rating
    const avgRating = mappedTestimonials.length > 0
        ? (mappedTestimonials.reduce((sum, t) => sum + t.rating, 0) / mappedTestimonials.length).toFixed(1)
        : "0.0";

    return (
        <div className="flex flex-col bg-background text-foreground min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 sm:py-24 bg-gradient-to-b from-muted/50 to-background">
                    <div className="container px-4 md:px-8">
                        <Breadcrumb items={[{ label: "Testimonials" }]} />

                        <div className="mx-auto max-w-3xl text-center">
                            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
                                <Star className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                                Trusted by Industry Leaders
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                See what our clients say about working with us. Real feedback from real customers.
                            </p>

                            {/* Stats */}
                            <div className="flex items-center justify-center gap-8 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                                        ))}
                                    </div>
                                    <span className="font-semibold">{avgRating} / 5.0</span>
                                </div>
                                <div className="text-muted-foreground">
                                    {mappedTestimonials.length} reviews
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Grid */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="mx-auto max-w-7xl">
                            {mappedTestimonials.length > 0 ? (
                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {mappedTestimonials.map((testimonial: any, index: number) => (
                                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">No testimonials found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 sm:p-12 border border-primary/20">
                            <h2 className="text-3xl font-bold mb-4">Ready to Join Them?</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Start your journey with us today and see why our clients love working with us.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                                >
                                    Get Started
                                </a>
                                <a
                                    href="/case-studies"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors font-medium text-lg"
                                >
                                    View Case Studies
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
