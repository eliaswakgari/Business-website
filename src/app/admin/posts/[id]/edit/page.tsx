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
import { Loader2, ArrowLeft, Save, Sparkles } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from '@/components/admin/ImageUpload';

export default function EditPostPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featured_image: '',
        tags: '',
        status: 'draft',
        meta_title: '',
        meta_description: ''
    });

    const supabase = createClient();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setFormData({
                        title: data.title,
                        slug: data.slug,
                        content: data.content || '',
                        excerpt: data.excerpt || '',
                        featured_image: data.featured_image || '',
                        tags: data.tags ? data.tags.join(', ') : '',
                        status: data.status,
                        meta_title: data.meta_title || '',
                        meta_description: data.meta_description || ''
                    });
                }
            } catch (error: any) {
                alert('Error fetching post: ' + error.message);
                router.push('/admin/posts');
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchPost();
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
                .from('posts')
                .update({
                    title: formData.title,
                    slug: formData.slug || generateSlug(formData.title),
                    content: formData.content,
                    excerpt: formData.excerpt,
                    featured_image: formData.featured_image,
                    tags: tagsArray,
                    status: formData.status,
                    meta_title: formData.meta_title,
                    meta_description: formData.meta_description,
                    updated_at: new Date().toISOString(),
                    published_at: formData.status === 'published' ? new Date().toISOString() : null,
                })
                .eq('id', id);

            if (error) throw error;

            router.push('/admin/posts');
            router.refresh();
        } catch (error: any) {
            alert('Error updating post: ' + error.message);
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
                <Link href="/admin/posts">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Post Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter post title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    placeholder="post-url-slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    placeholder="A short summary..."
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content (Markdown)</Label>
                                <Textarea
                                    id="content"
                                    placeholder="# Write your post content here..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="min-h-[400px] font-mono"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                                <Textarea
                                    id="meta_description"
                                    value={formData.meta_description}
                                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Publishing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
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
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Update Post
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Organization</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ImageUpload
                                value={formData.featured_image}
                                onChange={(url) => setFormData({ ...formData, featured_image: url })}
                                label="Featured Image"
                                description="Change the cover image for your post"
                            />

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    placeholder="tech, tutorial (comma separated)"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}
