import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Header, Footer } from '@/layouts';

export const metadata: Metadata = {
  title: 'Privacy Policy | ProCMS',
  description: 'Our privacy policy and data protection practices.',
};

export default async function PrivacyPage() {
  const supabase = await createClient();
  
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', 'privacy-policy')
    .eq('status', 'published')
    .single();

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <Header />
      
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {page?.title || 'Privacy Policy'}
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
                  <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                  <p>We collect information you provide directly to us, including name, email, and any other information you choose to provide.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                  <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
                  <p>We implement appropriate security measures to protect your personal information.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">4. Contact Us</h2>
                  <p>If you have questions about this Privacy Policy, please contact us.</p>
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
