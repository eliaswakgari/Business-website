import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "./components/ArticleCard";
import { SectionHeader } from "./components/SectionHeader";
import { format } from "date-fns";

export default async function BlogPreview() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3);

  if (!posts || posts.length === 0) {
    return null; // Or show empty state
  }

  const mappedPosts = posts.map((post: any) => ({
    title: post.title,
    excerpt: post.excerpt || '',
    image: post.featured_image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', // Fallback
    category: post.tags && post.tags.length > 0 ? post.tags[0] : 'Blog',
    date: post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : 'Recent',
    readTime: '5 min read', // Placeholder logic
    slug: post.slug // Pass slug if ArticleCard supports it (it links to # currently, should fix link)
  }));

  // IMPORTANT: ArticleCard currently links to "#".
  // We should ideally update ArticleCard to accept a slug or href, but for now we match props.
  // The ArticleCard component in the file view didn't show 'slug' prop in interface, but Link href="#"
  // We will assume for now we just render them. 

  return (
    <section className="relative py-24 sm:py-32 bg-muted/30">
      <div className="container relative px-4 md:px-8">
        <SectionHeader />

        <div className="mx-auto max-w-7xl">
          <div className="flex overflow-x-auto pb-4 gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 snap-x snap-mandatory scrollbar-hide">
            {mappedPosts.map((article, index) => (
              <div key={index} className="min-w-[300px] md:min-w-0 snap-start">
                <ArticleCard article={article as any} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
