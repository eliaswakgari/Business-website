import { createClient } from "@/lib/supabase/server";
import { CaseStudyCard } from "./components/CaseStudyCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function CaseStudies() {
    const supabase = await createClient();
    const { data: caseStudies } = await supabase
        .from('case_studies')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

    if (!caseStudies || caseStudies.length === 0) {
        return null;
    }

    const mappedCaseStudies = caseStudies.map((cs: any) => ({
        title: cs.title,
        client: cs.client_name || 'Client',
        description: cs.description || '',
        image: cs.featured_image || '',
        tags: cs.tags || [],
        slug: cs.slug
    }));

    return (
        <section id="case-studies" className="relative py-24 sm:py-32">
            <div className="container relative px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <p className="text-primary font-medium mb-2">Success Stories</p>
                        <h2 className="text-3xl md:text-4xl font-bold">Featured Case Studies</h2>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Link
                            href="/case-studies"
                            className="text-primary hover:text-primary/80 flex items-center gap-1 font-medium group transition-colors"
                        >
                            View all case studies
                            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl">
                    <div className="flex overflow-x-auto pb-4 gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 snap-x snap-mandatory scrollbar-hide">
                        {mappedCaseStudies.map((cs: any, index: number) => (
                            <div key={index} className="min-w-[300px] md:min-w-0 snap-start">
                                <CaseStudyCard caseStudy={cs} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
