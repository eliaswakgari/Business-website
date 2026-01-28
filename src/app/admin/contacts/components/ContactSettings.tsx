'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Mail } from "lucide-react";

export function ContactSettings() {
    const [fetching, setFetching] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [siteContact, setSiteContact] = useState({
        email: '',
        phone: '',
        address: ''
    });

    const supabase = createClient();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await supabase
                .from('site_settings')
                .select('*')
                .eq('key', 'contact_info')
                .single();

            if (data) {
                setSiteContact(data.value);
            }
        } catch (error) {
            console.error('Error fetching site settings:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({
                    key: 'contact_info',
                    value: siteContact,
                    updated_at: new Date().toISOString(),
                }, { onConflict: 'key' });

            if (error) throw error;
            alert('Site contact information updated successfully!');
        } catch (error: any) {
            alert('Error updating site settings: ' + error.message);
        } finally {
            setUpdating(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center p-8 bg-muted/20 rounded-lg">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <Card className="shadow-sm border-primary/10 mb-8">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <CardTitle>Site Contact Information</CardTitle>
                </div>
                <CardDescription>
                    Update the contact details that appear on the landing page's contact section.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="siteEmail">Support Email</Label>
                            <Input
                                id="siteEmail"
                                type="email"
                                placeholder="contact@procms.com"
                                value={siteContact.email}
                                onChange={(e) => setSiteContact({ ...siteContact, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sitePhone">Contact Phone</Label>
                            <Input
                                id="sitePhone"
                                placeholder="+1 (555) 123-4567"
                                value={siteContact.phone}
                                onChange={(e) => setSiteContact({ ...siteContact, phone: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="siteAddress">Office Address</Label>
                        <textarea
                            id="siteAddress"
                            rows={3}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="123 Business Street, San Francisco, CA 94102"
                            value={siteContact.address}
                            onChange={(e) => setSiteContact({ ...siteContact, address: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-start">
                        <Button type="submit" disabled={updating} className="px-8 transition-all hover:scale-[1.02]">
                            {updating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Site Info
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
