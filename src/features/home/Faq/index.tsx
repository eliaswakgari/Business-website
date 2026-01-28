import { createClient } from "@/lib/supabase/server";
import { FaqList } from "./components/FaqList";

export default async function Faq() {
  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('status', 'published')
    .order('order_index', { ascending: true });

  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Map DB fields to component expected props
  const mappedFaqs = faqs.map((f: any) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container relative px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our services.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <FaqList faqs={mappedFaqs} />
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="/contact"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Contact our support team →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
