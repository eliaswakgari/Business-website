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

export default function EditTeamMemberPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        avatar_url: '',
        linkedin_url: '',
        twitter_url: '',
        status: 'active',
        order_index: 0
    });

    const supabase = createClient();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const { data, error } = await supabase
                    .from('team_members')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setFormData({
                        name: data.name,
                        role: data.role,
                        bio: data.bio || '',
                        avatar_url: data.avatar_url || '',
                        linkedin_url: data.linkedin_url || '',
                        twitter_url: data.twitter_url || '',
                        status: data.status,
                        order_index: data.order_index
                    });
                }
            } catch (error: any) {
                alert('Error fetching team member: ' + error.message);
                router.push('/admin/team');
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchMember();
    }, [id, supabase, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('team_members')
                .update({
                    name: formData.name,
                    role: formData.role,
                    bio: formData.bio,
                    avatar_url: formData.avatar_url,
                    linkedin_url: formData.linkedin_url,
                    twitter_url: formData.twitter_url,
                    status: formData.status,
                    order_index: formData.order_index,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;

            router.push('/admin/team');
            router.refresh();
        } catch (error: any) {
            alert('Error updating team member: ' + error.message);
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
                <Link href="/admin/team">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Edit Team Member</h1>
            </div>

            <div className="grid gap-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Member Details</CardTitle>
                        <CardDescription>
                            Update team member profile information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input
                                    id="role"
                                    placeholder="e.g. Senior Developer"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Brief biography..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="min-h-[100px]"
                                />
                            </div>

                            <ImageUpload
                                value={formData.avatar_url}
                                onChange={(url) => setFormData({ ...formData, avatar_url: url })}
                                label="Member Avatar"
                                description="Change profile photo"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                    <Input
                                        id="linkedin_url"
                                        placeholder="https://linkedin.com/in/..."
                                        value={formData.linkedin_url}
                                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twitter_url">Twitter URL</Label>
                                    <Input
                                        id="twitter_url"
                                        placeholder="https://twitter.com/..."
                                        value={formData.twitter_url}
                                        onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                                    />
                                </div>
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
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
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
                                <Link href="/admin/team">
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
