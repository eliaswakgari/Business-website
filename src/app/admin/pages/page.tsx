'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function PagesManagement() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('pages')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false });

    if (data) setPages(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting page: ' + error.message);
    } else {
      setPages(pages.filter(p => p.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground mt-2">
            Manage your website pages
          </p>
        </div>
        <Link href="/admin/pages/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Page
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.length > 0 ? (
              pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell className="text-muted-foreground">/{page.slug}</TableCell>
                  <TableCell>
                    <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                      {page.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{page.profiles?.full_name || 'Unknown'}</TableCell>
                  <TableCell>{format(new Date(page.updated_at), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/pages/${page.id}/edit`}>
                        <Button variant="ghost" size="sm" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(page.id, page.title)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No pages found. Create your first page to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
