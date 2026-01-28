'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, MoveUp, MoveDown, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ServicesManagement() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) setServices(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting service: ' + error.message);
    } else {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === services.length - 1) return;

    const newServices = [...services];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    const currentItem = newServices[index];
    const targetItem = newServices[targetIndex];

    // Swap order_index locally first for UI snap
    // Assuming order_index exists. If it's null, we might need to initialize it.
    // For now, let's assume we swap the values. 
    // If values are same or null, we might need a robust re-index strategy, 
    // but assuming they are 0, 1, 2... or distinct.

    // Better strategy: Swap the objects in the array, and then update their specific order_index in DB
    // to match their new array position (or swap the values of order_index).

    // Let's swap the DB values.
    const currentOrder = currentItem.order_index ?? index;
    const targetOrder = targetItem.order_index ?? targetIndex;

    // Optimistic update
    newServices[index] = { ...targetItem, order_index: currentOrder };
    newServices[targetIndex] = { ...currentItem, order_index: targetOrder };
    setServices(newServices);

    try {
      const { error: error1 } = await supabase
        .from('services')
        .update({ order_index: targetOrder })
        .eq('id', currentItem.id);

      const { error: error2 } = await supabase
        .from('services')
        .update({ order_index: currentOrder })
        .eq('id', targetItem.id);

      if (error1 || error2) throw new Error('Failed to update order');
    } catch (error) {
      console.error(error);
      alert('Failed to reorder items');
      fetchServices(); // Revert
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
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-2">
            Manage your service offerings
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Service
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length > 0 ? (
              services.map((service, index) => (
                <TableRow key={service.id}>
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
                        disabled={index === services.length - 1}
                        onClick={() => handleMove(index, 'down')}
                      >
                        <MoveDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>
                    {service.icon && <span className="text-2xl">{service.icon}</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.status === 'published' ? 'default' : 'secondary'}>
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/services/${service.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(service.id, service.title)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No services found. Create your first service to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
