import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Header, Footer } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Studies | ProCMS',
  description: 'Explore our successful projects and client success stories.',
};

export default async function CaseStudiesPage() {
  const supabase = await createClient();
  
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge className="mb-4">Case Studies</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Success Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how we've helped businesses achieve their goals through innovative solutions.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {caseStudies && caseStudies.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {caseStudies.map((study) => (
                  <Link key={study.id} href={`/case-studies/${study.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      {study.featured_image && (
                        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                          <img 
                            src={study.featured_image} 
                            alt={study.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        {study.client_name && (
                          <Badge variant="secondary" className="w-fit mb-2">
                            {study.client_name}
                          </Badge>
                        )}
                        <CardTitle className="line-clamp-2">{study.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                          {study.description}
                        </p>
                        {study.tags && study.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {study.tags.slice(0, 3).map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No case studies available yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
