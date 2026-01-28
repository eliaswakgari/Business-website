import { Metadata } from 'next';
import { Header, Footer } from '@/layouts';
import { Users, Target, Award, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - ProCMS',
  description: 'Learn about ProCMS - A modern business CMS platform built for professional companies.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower businesses with powerful, easy-to-use content management solutions that drive growth and efficiency.',
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'A dedicated team of developers, designers, and strategists committed to delivering excellence.',
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'Innovation, integrity, and customer success are at the core of everything we do.',
    },
    {
      icon: TrendingUp,
      title: 'Our Vision',
      description: 'To be the leading CMS platform for modern businesses worldwide, setting new standards in the industry.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <div className="container px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Building the Future of
                <span className="block text-primary mt-2">Content Management</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                ProCMS is a modern, scalable content management platform designed for professional businesses who demand excellence, security, and performance.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
              <div className="prose prose-lg dark:prose-invert mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Founded with a vision to simplify content management for businesses of all sizes, ProCMS has grown from a simple idea into a comprehensive platform trusted by companies worldwide.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We understand the challenges businesses face in managing their digital presence. That's why we've built a platform that combines powerful features with an intuitive interface, making content management accessible to everyone.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, ProCMS powers thousands of websites, helping businesses streamline their operations, engage their audiences, and achieve their goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our core values guide everything we do, from product development to customer support.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 md:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-primary mb-2">10K+</div>
                <div className="text-lg text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-lg text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">24/7</div>
                <div className="text-lg text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
