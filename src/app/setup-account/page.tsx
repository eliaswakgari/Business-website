'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from 'sonner';

export default function SetupAccountPage() {
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                // If no user, they might have lost the session or link is invalid.
                // Redirect to login (Supabase invite links usually log you in automatically).
                console.log('No active session found on setup page');
                router.push('/login');
                return;
            }
            setEmail(user.email || '');
        };
        getUser();
    }, []);

    const validatePassword = (pass: string): { valid: boolean; message: string } => {
        if (pass.length < 8) {
            return { valid: false, message: 'Password must be at least 8 characters' };
        }
        if (!/[A-Z]/.test(pass)) {
            return { valid: false, message: 'Password must contain at least one uppercase letter' };
        }
        if (!/[a-z]/.test(pass)) {
            return { valid: false, message: 'Password must contain at least one lowercase letter' };
        }
        if (!/[0-9]/.test(pass)) {
            return { valid: false, message: 'Password must contain at least one number' };
        }
        return { valid: true, message: 'Strong password' };
    };

    const handleSetup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        const passwordCheck = validatePassword(password);
        if (!passwordCheck.valid) {
            toast.error(passwordCheck.message);
            return;
        }

        if (!fullName.trim()) {
            toast.error("Please enter your full name");
            return;
        }

        setLoading(true);

        try {
            // 1. Update Password
            const { error: passError } = await supabase.auth.updateUser({
                password: password
            });

            if (passError) throw passError;

            // 2. Update Profile (Name)
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({
                        full_name: fullName,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', user.id);

                if (profileError) throw profileError;
            }

            toast.success("Account setup complete! 🎉");

            // 3. Redirect to Dashboard
            setTimeout(() => {
                router.push('/admin');
            }, 1000);

        } catch (error: any) {
            console.error('Setup error:', error);
            toast.error(error.message || "Failed to setup account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Welcome to ProCMS</CardTitle>
                    <CardDescription className="text-center">
                        Complete your account setup to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSetup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input value={email} disabled className="bg-muted" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Create Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Must be at least 8 characters with uppercase, lowercase, and a number
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Setting up...
                                </>
                            ) : (
                                <>
                                    Complete Setup
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
