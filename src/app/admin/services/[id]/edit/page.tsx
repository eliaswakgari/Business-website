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

export default function EditServicePage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '',
        status: 'draft',
        order_index: 0
    });

    const supabase = createClient();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setFormData({
                        title: data.title,
                        description: data.description || '',
                        icon: data.icon || '',
                        status: data.status,
                        order_index: data.order_index
                    });
                }
            } catch (error: any) {
                alert('Error fetching service: ' + error.message);
                router.push('/admin/services');
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchService();
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
            const slug = generateSlug(formData.title);

            const { error } = await supabase
                .from('services')
                .update({
                    title: formData.title,
                    slug: slug,
                    description: formData.description,
                    icon: formData.icon,
                    status: formData.status,
                    order_index: formData.order_index,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;

            router.push('/admin/services');
            router.refresh();
        } catch (error: any) {
            alert('Error updating service: ' + error.message);
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
                <Link href="/admin/services">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
            </div>

            <div className="grid gap-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Service Details</CardTitle>
                        <CardDescription>
                            Update your service offering.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Service Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. Web Development"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief description of the service..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="min-h-[100px]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <ImageUpload
                                    value={formData.icon}
                                    onChange={(url) => setFormData({ ...formData, icon: url })}
                                    label="Service Icon / Image"
                                    description="Change the icon or image"
                                />
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
                                <Link href="/admin/services">
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
