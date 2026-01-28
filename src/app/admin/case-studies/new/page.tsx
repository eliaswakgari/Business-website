'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function NewCaseStudyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        client_name: '',
        description: '',
        content: '',
        featured_image: '',
        tags: '',
        status: 'draft',
    });

    const supabase = createClient();

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
            const slug = generateSlug(formData.title);
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            const { error } = await supabase
                .from('case_studies')
                .insert({
                    title: formData.title,
                    slug: slug,
                    client_name: formData.client_name,
                    description: formData.description,
                    content: formData.content,
                    featured_image: formData.featured_image,
                    tags: tagsArray,
                    status: formData.status,
                    published_at: formData.status === 'published' ? new Date().toISOString() : null,
                });

            if (error) throw error;

            router.push('/admin/case-studies');
            router.refresh();
        } catch (error: any) {
            alert('Error creating case study: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/case-studies">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Add Case Study</h1>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Case Study Details</CardTitle>
                        <CardDescription>
                            Create a new case study or portfolio item.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Project Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g. E-Commerce Redesign"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="client">Client Name</Label>
                                    <Input
                                        id="client"
                                        placeholder="e.g. ShopCo"
                                        value={formData.client_name}
                                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Short Description / Excerpt</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief overview used in cards..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="min-h-[80px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Full Content (Markdown/HTML)</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Detailed case study content..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="min-h-[200px]"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <ImageUpload
                                    value={formData.featured_image}
                                    onChange={(url) => setFormData({ ...formData, featured_image: url })}
                                    label="Featured Image"
                                    description="Upload a cover image for this case study"
                                />
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags (comma separated)</Label>
                                    <Input
                                        id="tags"
                                        placeholder="React, Next.js, Design"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    />
                                </div>
                            </div>

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

                            <div className="flex justify-end gap-4 pt-4">
                                <Link href="/admin/case-studies">
                                    <Button variant="outline" type="button">Cancel</Button>
                                </Link>
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Create Case Study
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
