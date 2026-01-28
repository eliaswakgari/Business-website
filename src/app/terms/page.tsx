import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Header, Footer } from '@/layouts';

export const metadata: Metadata = {
  title: 'Terms of Service | ProCMS',
  description: 'Terms and conditions for using our services.',
};

export default async function TermsPage() {
  const supabase = await createClient();
  
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', 'terms-of-service')
    .eq('status', 'published')
    .single();

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <Header />
      
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {page?.title || 'Terms of Service'}
          </h1>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {page?.content ? (
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            ) : (
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  Last updated: January 25, 2026
                </p>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                  <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                  <p>Permission is granted to temporarily use our services for personal, non-commercial transitory viewing only.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
                  <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
                  <p>In no event shall we be liable for any damages arising out of the use or inability to use our services.</p>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
