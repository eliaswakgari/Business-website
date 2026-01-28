import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Header, Footer } from '@/layouts';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:author_id (full_name, avatar_url)
    `)
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <Header />
      
      <main className="flex-1">
        <article className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Post Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <span>{post.published_at ? format(new Date(post.published_at), 'MMMM dd, yyyy') : 'Draft'}</span>
                {post.profiles && (
                  <>
                    <span>•</span>
                    <User className="h-4 w-4" />
                    <span>{post.profiles.full_name || 'Anonymous'}</span>
                  </>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              
              {post.excerpt && (
                <p className="text-xl text-muted-foreground">{post.excerpt}</p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
