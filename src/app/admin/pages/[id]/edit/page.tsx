'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditPagePage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        status: 'draft',
        meta_title: '',
        meta_description: ''
    });

    const supabase = createClient();

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const { data, error } = await supabase
                    .from('pages')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setFormData({
                        title: data.title,
                        slug: data.slug,
                        content: data.content || '',
                        status: data.status,
                        meta_title: data.meta_title || '',
                        meta_description: data.meta_description || ''
                    });
                }
            } catch (error: any) {
                alert('Error fetching page: ' + error.message);
                router.push('/admin/pages');
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchPage();
    }, [id, supabase, router]);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('pages')
                .update({
                    title: formData.title,
                    slug: formData.slug || generateSlug(formData.title),
                    content: formData.content,
                    status: formData.status,
                    meta_title: formData.meta_title,
                    meta_description: formData.meta_description,
                    updated_at: new Date().toISOString(),
                    published_at: formData.status === 'published' ? new Date().toISOString() : null,
                })
                .eq('id', id);

            if (error) throw error;

            router.push('/admin/pages');
            router.refresh();
        } catch (error: any) {
            alert('Error updating page: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/pages">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Edit Page</h1>
            </div>

            <div className="grid gap-6 max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Page Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Page Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. About Us"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    placeholder="about-us"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content (HTML/Markdown)</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Page content..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="min-h-[300px] font-mono"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        value={formData.meta_title}
                                        onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Input
                                        id="meta_description"
                                        value={formData.meta_description}
                                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 w-full md:w-1/2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Link href="/admin/pages">
                                    <Button variant="outline" type="button">Cancel</Button>
                                </Link>
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
