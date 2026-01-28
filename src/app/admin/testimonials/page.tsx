'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Star, Loader2, MoveUp, MoveDown } from 'lucide-react';
import Link from 'next/link';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) setTestimonials(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, author: string) => {
    if (!confirm(`Are you sure you want to delete the testimonial from "${author}"? This action cannot be undone.`)) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting testimonial: ' + error.message);
    } else {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === testimonials.length - 1) return;

    const newItems = [...testimonials];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    const currentItem = newItems[index];
    const targetItem = newItems[targetIndex];

    const currentOrder = currentItem.order_index ?? index;
    const targetOrder = targetItem.order_index ?? targetIndex;

    newItems[index] = { ...targetItem, order_index: currentOrder };
    newItems[targetIndex] = { ...currentItem, order_index: targetOrder };
    setTestimonials(newItems);

    try {
      const { error: error1 } = await supabase
        .from('testimonials')
        .update({ order_index: targetOrder })
        .eq('id', currentItem.id);

      const { error: error2 } = await supabase
        .from('testimonials')
        .update({ order_index: currentOrder })
        .eq('id', targetItem.id);

      if (error1 || error2) throw new Error('Failed to update order');
    } catch (error) {
      console.error(error);
      alert('Failed to reorder items');
      fetchTestimonials();
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
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground mt-2">
            Manage customer testimonials
          </p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Testimonial
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={index === 0}
                        onClick={() => handleMove(index, 'up')}
                      >
                        <MoveUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={index === testimonials.length - 1}
                        onClick={() => handleMove(index, 'down')}
                      >
                        <MoveDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.author_avatar || ''} alt={testimonial.author_name} />
                        <AvatarFallback>{testimonial.author_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{testimonial.author_name}</div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.author_role} {testimonial.author_company && `at ${testimonial.author_company}`}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md truncate text-sm">{testimonial.content}</TableCell>
                  <TableCell>
                    <Badge variant={testimonial.status === 'published' ? 'default' : 'secondary'}>
                      {testimonial.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(testimonial.id, testimonial.author_name)}
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
                  No testimonials found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
