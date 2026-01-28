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

export default function EditTestimonialPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        author_name: '',
        author_role: '',
        author_company: '',
        author_avatar: '',
        content: '',
        rating: 5,
        status: 'draft',
        order_index: 0
    });

    const supabase = createClient();

    useEffect(() => {
        const fetchTestimonial = async () => {
            try {
                const { data, error } = await supabase
                    .from('testimonials')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setFormData({
                        author_name: data.author_name,
                        author_role: data.author_role || '',
                        author_company: data.author_company || '',
                        author_avatar: data.author_avatar || '',
                        content: data.content,
                        rating: data.rating || 5,
                        status: data.status,
                        order_index: data.order_index
                    });
                }
            } catch (error: any) {
                alert('Error fetching testimonial: ' + error.message);
                router.push('/admin/testimonials');
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchTestimonial();
    }, [id, supabase, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('testimonials')
                .update({
                    author_name: formData.author_name,
                    author_role: formData.author_role,
                    author_company: formData.author_company,
                    author_avatar: formData.author_avatar,
                    content: formData.content,
                    rating: formData.rating,
                    status: formData.status,
                    order_index: formData.order_index,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;

            router.push('/admin/testimonials');
            router.refresh();
        } catch (error: any) {
            alert('Error updating testimonial: ' + error.message);
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
                <Link href="/admin/testimonials">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
            </div>

            <div className="grid gap-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Testimonial Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="author_name">Author Name</Label>
                                    <Input
                                        id="author_name"
                                        value={formData.author_name}
                                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="author_role">Role / Job Title</Label>
                                    <Input
                                        id="author_role"
                                        value={formData.author_role}
                                        onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="author_company">Company</Label>
                                    <Input
                                        id="author_company"
                                        value={formData.author_company}
                                        onChange={(e) => setFormData({ ...formData, author_company: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rating">Rating (1-5)</Label>
                                    <Input
                                        id="rating"
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <ImageUpload
                                value={formData.author_avatar}
                                onChange={(url) => setFormData({ ...formData, author_avatar: url })}
                                label="Author Avatar"
                                description="Update client photo"
                            />

                            <div className="space-y-2">
                                <Label htmlFor="content">Quote / Content</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="min-h-[100px]"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
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
                                <div className="space-y-2">
                                    <Label htmlFor="order">Order Index</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={formData.order_index}
                                        onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Link href="/admin/testimonials">
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
