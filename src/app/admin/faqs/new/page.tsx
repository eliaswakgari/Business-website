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

export default function NewFaqPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: 'General',
        status: 'draft',
        order_index: 0
    });

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('faqs')
                .insert({
                    question: formData.question,
                    answer: formData.answer,
                    category: formData.category,
                    status: formData.status,
                    order_index: formData.order_index
                });

            if (error) throw error;

            router.push('/admin/faqs');
            router.refresh();
        } catch (error: any) {
            alert('Error creating FAQ: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/faqs">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Add FAQ</h1>
            </div>

            <div className="grid gap-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>FAQ Details</CardTitle>
                        <CardDescription>
                            Add a new frequently asked question.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="question">Question</Label>
                                <Input
                                    id="question"
                                    placeholder="e.g. What is your refund policy?"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="answer">Answer</Label>
                                <Textarea
                                    id="answer"
                                    placeholder="The answer is..."
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    className="min-h-[100px]"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    placeholder="e.g. Pricing, Technical, General"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                                <Link href="/admin/faqs">
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
                                            Save FAQ
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
