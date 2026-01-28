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
import { ImageUpload } from '@/components/admin/ImageUpload';

export default function EditCaseStudyPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        client_name: '',
        description: '',
        content: '',
        featured_image: '',
        tags: '',
        status: 'draft'
    });

    const supabase = createClient();

    useEffect(() => {
        const fetchStudy = async () => {
            try {
                const { data, error } = await supabase
                    .from('case_studies')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setFormData({
                        title: data.title,
                        slug: data.slug,
                        client_name: data.client_name || '',
                        description: data.description || '',
                        content: data.content || '',
                        featured_image: data.featured_image || '',
                        tags: data.tags ? data.tags.join(', ') : '',
                        status: data.status
                    });
                }
            } catch (error: any) {
                alert('Error fetching case study: ' + error.message);
                router.push('/admin/case-studies');
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchStudy();
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
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            const { error } = await supabase
                .from('case_studies')
                .update({
                    title: formData.title,
                    slug: formData.slug || generateSlug(formData.title),
                    client_name: formData.client_name,
                    description: formData.description,
                    content: formData.content,
                    featured_image: formData.featured_image,
                    tags: tagsArray,
                    status: formData.status,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;

            router.push('/admin/case-studies');
            router.refresh();
        } catch (error: any) {
            alert('Error updating case study: ' + error.message);
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
                <Link href="/admin/case-studies">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Edit Case Study</h1>
            </div>

            <div className="grid gap-6 max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Case Study Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Project Title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        placeholder="project-slug"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="client">Client Name</Label>
                                    <Input
                                        id="client"
                                        placeholder="Client Name"
                                        value={formData.client_name}
                                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags (comma separated)</Label>
                                    <Input
                                        id="tags"
                                        placeholder="React, Next.js, UI/UX"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Short Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Small summary of the project..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <ImageUpload
                                value={formData.featured_image}
                                onChange={(url) => setFormData({ ...formData, featured_image: url })}
                                label="Featured Image"
                                description="Update the cover image"
                            />

                            <div className="space-y-2">
                                <Label htmlFor="content">Full Content (Markdown)</Label>
                                <Textarea
                                    id="content"
                                    placeholder="# Full Project Story..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="min-h-[300px] font-mono"
                                />
                            </div>

                            <div className="space-y-2 w-full md:w-1/3">
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
                                <Link href="/admin/case-studies">
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
