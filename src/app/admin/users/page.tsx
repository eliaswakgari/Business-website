'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Loader2, Mail, Shield, User, CheckCircle2, Copy, Link2 } from 'lucide-react';
import { inviteUser, getInviteLink } from './actions';
import { toast } from 'sonner';

export default function UsersManagement() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [inviting, setInviting] = useState(false);

    // Invite Form State
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'admin' | 'editor' | 'viewer'>('viewer');
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [successLink, setSuccessLink] = useState<string | null>(null);

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        checkUserRole();
    }, []);

    const checkUserRole = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/login');
            return;
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile) {
            setCurrentUserRole(profile.role);
            if (profile.role !== 'admin') {
                toast.error('Unauthorized access');
                router.push('/admin'); // Redirect to dashboard
            } else {
                fetchUsers();
            }
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        // Fetch profiles - in a real app we might join with auth.users if we had access, 
        // but here we rely on profiles table being the source of truth for app users.
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
        } else {
            setUsers(data || []);
        }
        setLoading(false);
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setInviting(true);

        try {
            const result = await inviteUser(email, role);

            if (result.error) {
                toast.error(result.error);
            } else if (result.success) {
                toast.success('User invited!');
                // Don't close modal immediately, show success state
                setSuccessLink(result.inviteLink || null);

                // Still copy to clipboard as a convenience
                if (result.inviteLink) {
                    navigator.clipboard.writeText(result.inviteLink).catch(() => { });
                }

                setEmail('');
                setRole('viewer');
                fetchUsers();
            }
        } catch (err: any) {
            toast.error('An unexpected error occurred');
            console.error(err);
        } finally {
            setInviting(false);
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm('Are you sure you want to remove this user? This will remove their access immediately.')) return;

        // Note: Deleting from auth.users requires admin API. 
        // For now we will just delete from profiles which effectively removes app access if RLS checks profile.
        // Ideally we would want a server action to delete from auth.users too.

        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', userId);

        if (error) {
            toast.error('Failed to delete user: ' + error.message);
        } else {
            toast.success('User removed');
            setUsers(users.filter(u => u.id !== userId));
        }
    };

    const handleGetLink = async (email: string) => {
        const result = await getInviteLink(email);
        if (result.error) {
            toast.error(result.error);
        } else if (result.inviteLink) {
            navigator.clipboard.writeText(result.inviteLink);
            toast.success('Fresh invite link copied to clipboard!');
        }
    };

    if (loading || currentUserRole !== 'admin') {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users & Access</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage system users and their roles
                    </p>
                </div>

                <Dialog open={inviteOpen} onOpenChange={(open) => {
                    setInviteOpen(open);
                    if (!open) setSuccessLink(null);
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Invite User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Invite a Team Member</DialogTitle>
                            <DialogDescription>
                                Send an invitation email to a new user. They will be able to set their password.
                            </DialogDescription>
                        </DialogHeader>
                        {successLink ? (
                            <div className="py-6 space-y-6">
                                <div className="text-center space-y-2">
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <DialogTitle>Invitation Generated</DialogTitle>
                                    <DialogDescription>
                                        The user has been added to the database. If they don't receive the email, you can share this link manually.
                                    </DialogDescription>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg border">
                                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <code className="text-[10px] break-all flex-1 font-mono">{successLink}</code>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => {
                                            navigator.clipboard.writeText(successLink);
                                            toast.success('Link copied!');
                                        }}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <DialogFooter>
                                    <Button type="button" className="w-full" onClick={() => setInviteOpen(false)}>
                                        Done
                                    </Button>
                                </DialogFooter>
                            </div>
                        ) : (
                            <form onSubmit={handleInvite} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="colleague@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select value={role} onValueChange={(val: any) => setRole(val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="viewer">
                                                <div className="flex items-center">
                                                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    <span>Viewer (Read only)</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="editor">
                                                <div className="flex items-center">
                                                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    <span>Editor (Can manage content)</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="admin">
                                                <div className="flex items-center">
                                                    <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    <span>Admin (Full access)</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={inviting} className="w-full">
                                        {inviting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending Invite...
                                            </>
                                        ) : (
                                            'Send Invitation'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg bg-white dark:bg-slate-950">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar_url || ''} />
                                                <AvatarFallback>{(user.full_name?.[0] || user.email?.[0] || '?').toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{user.full_name || 'Pending...'}</div>
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                user.role === 'admin' ? 'border-purple-500 text-purple-600 bg-purple-50 dark:bg-purple-900/20' :
                                                    user.role === 'editor' ? 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20' :
                                                        'border-slate-500 text-slate-600 bg-slate-50 dark:bg-slate-900/20'
                                            }
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {!user.full_name && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleGetLink(user.email)}
                                                    title="Copy Magic Link"
                                                    className="text-primary hover:text-primary hover:bg-primary/10"
                                                >
                                                    <Link2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(user.id)}
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

// Icon for select
function FileText({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    )
}
