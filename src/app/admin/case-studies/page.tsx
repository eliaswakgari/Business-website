'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function CaseStudiesManagement() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setCaseStudies(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    const { error } = await supabase
      .from('case_studies')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting case study: ' + error.message);
    } else {
      setCaseStudies(caseStudies.filter(cs => cs.id !== id));
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
          <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
          <p className="text-muted-foreground mt-2">
            Showcase your successful projects
          </p>
        </div>
        <Link href="/admin/case-studies/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Case Study
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caseStudies.length > 0 ? (
              caseStudies.map((study) => (
                <TableRow key={study.id}>
                  <TableCell className="font-medium">{study.title}</TableCell>
                  <TableCell>{study.client_name || '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {study.tags?.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={study.status === 'published' ? 'default' : 'secondary'}>
                      {study.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(study.updated_at), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/case-studies/${study.id}/edit`}>
                        <Button variant="ghost" size="sm" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(study.id, study.title)}
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
                  No case studies found. Create your first case study to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
