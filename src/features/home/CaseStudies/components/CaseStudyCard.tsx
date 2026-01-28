'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CaseStudy {
    title: string;
    client: string;
    description: string;
    image: string;
    tags: string[];
    slug: string;
}

interface CaseStudyCardProps {
    caseStudy: CaseStudy;
    index: number;
}

export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
    return (
        <Link href={`/case-studies/${caseStudy.slug}`} className="group flex flex-col h-full bg-card rounded-xl overflow-hidden border hover:shadow-xl transition-all hover-lift">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={caseStudy.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'}
                    alt={caseStudy.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />

                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {caseStudy.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="text-sm font-medium text-primary mb-2 uppercase tracking-wide">
                    {caseStudy.client}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {caseStudy.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                    {caseStudy.description}
                </p>

                <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </div>
            </div>
        </Link>
    );
}
