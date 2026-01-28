import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Header, Footer } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Our Services | ProCMS',
  description: 'Explore our comprehensive range of professional services designed to help your business grow.',
};

export default async function ServicesPage() {
  const supabase = await createClient();
  
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'published')
    .order('order_index', { ascending: true });

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge className="mb-4">Our Services</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Solutions for Your Business
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer comprehensive services designed to help your business thrive in the digital age.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {services && services.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      {service.icon && (
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <span className="text-2xl">{service.icon}</span>
                        </div>
                      )}
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No services available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}