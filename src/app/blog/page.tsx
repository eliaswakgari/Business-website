import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Header, Footer } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Blog | ProCMS',
  description: 'Read our latest articles, insights, and updates about technology, business, and innovation.',
};

export default async function BlogPage() {
  const supabase = await createClient();
  
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:author_id (full_name, avatar_url)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge className="mb-4">Blog</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Latest Articles & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with our latest thoughts on technology, business strategies, and industry trends.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {posts && posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      {post.featured_image && (
                        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                          <img 
                            src={post.featured_image} 
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{post.published_at ? format(new Date(post.published_at), 'MMM dd, yyyy') : 'Draft'}</span>
                        </div>
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt || post.content?.substring(0, 150) + '...'}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
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
                <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
