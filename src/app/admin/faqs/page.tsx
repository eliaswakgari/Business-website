'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function FaqsManagement() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) setFaqs(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Are you sure you want to delete this FAQ: "${question}"? This action cannot be undone.`)) return;

    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting FAQ: ' + error.message);
    } else {
      setFaqs(faqs.filter(f => f.id !== id));
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
          <h1 className="text-3xl font-bold tracking-tight">FAQs</h1>
          <p className="text-muted-foreground mt-2">
            Manage your frequently asked questions
          </p>
        </div>
        <Link href="/admin/faqs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New FAQ
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium max-w-md truncate">
                    {faq.question}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{faq.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={faq.status === 'published' ? 'default' : 'secondary'}>
                      {faq.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/faqs/${faq.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(faq.id, faq.question)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No FAQs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
