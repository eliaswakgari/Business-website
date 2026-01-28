'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { canEditContent, Role } from '@/lib/rbac';

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<Role>('viewer');
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    // Get user role
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (profile) setUserRole(profile.role as Role);
    }

    const { data } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id (full_name)
      `)
      .order('created_at', { ascending: false });

    if (data) setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!canEditContent(userRole)) {
      alert('Unauthorized: You do not have permission to delete content.');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting post: ' + error.message);
    } else {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const canEdit = canEditContent(userRole);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground mt-2">
            Manage your blog posts and articles
          </p>
        </div>
        {canEdit && (
          <Link href="/admin/posts/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{post.title}</h3>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>By {post.profiles?.full_name || 'Unknown'}</span>
                      <span>•</span>
                      <span>{format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.status === 'published' && (
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="ghost" size="sm" title="View live">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    {canEdit && (
                      <>
                        <Link href={`/admin/posts/${post.id}/edit`}>
                          <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(post.id, post.title)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No posts yet</p>
              {canEdit && (
                <Link href="/admin/posts/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first post
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
