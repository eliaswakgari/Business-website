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
import { Loader2, ArrowLeft, Save, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from '@/components/admin/ImageUpload';

export default function NewTeamMemberPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('team_members')
                .insert({
                    name: formData.name,
                    role: formData.role,
                    bio: formData.bio,
                    avatar_url: formData.avatar_url,
                    linkedin_url: formData.linkedin_url,
                    twitter_url: formData.twitter_url,
                    status: formData.status,
                    order_index: formData.order_index
                });

            if (error) throw error;

            router.push('/admin/team');
            router.refresh();
        } catch (error: any) {
            alert('Error creating team member: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/team">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Add Team Member</h1>
            </div>

            <div className="grid gap-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Member Profile</CardTitle>
                        <CardDescription>
                            Add a new team member to your About page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. John Smith"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Job Title / Role</Label>
                                    <Input
                                        id="role"
                                        placeholder="e.g. CEO & Founder"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Short biography..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="min-h-[100px]"
                                />
                            </div>

                            <ImageUpload
                                value={formData.avatar_url}
                                onChange={(url) => setFormData({ ...formData, avatar_url: url })}
                                label="Member Avatar"
                                description="Upload a square profile photo"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                                        <Linkedin className="h-4 w-4" /> LinkedIn URL
                                    </Label>
                                    <Input
                                        id="linkedin"
                                        placeholder="https://linkedin.com/in/..."
                                        value={formData.linkedin_url}
                                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twitter" className="flex items-center gap-2">
                                        <Twitter className="h-4 w-4" /> Twitter URL
                                    </Label>
                                    <Input
                                        id="twitter"
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
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Add Member
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
