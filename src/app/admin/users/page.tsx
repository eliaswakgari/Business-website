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
import { Plus, Trash2, Loader2, Mail, Shield, User, CheckCircle2, Copy, Link2, Edit2, RefreshCw } from 'lucide-react';
import { inviteUser, getInviteLink, createUserDirectly } from './actions';
import { toast } from 'sonner';

export default function UsersManagement() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [inviting, setInviting] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [inviteMode, setInviteMode] = useState<'invite' | 'create'>('create');
    const [selectedUser, setSelectedUser] = useState<any>(null);

    // Invite Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'admin' | 'editor' | 'viewer'>('viewer');
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [successLink, setSuccessLink] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

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
                // Show error message
                toast.error(result.error);

                // Close modal after 2 seconds on error
                setTimeout(() => {
                    setInviteOpen(false);
                    setEmail('');
                    setRole('viewer');
                }, 2000);
            } else if (result.success) {
                // Log to console as requested
                if (result.emailSent) {
                    console.log('✅ Success: User invited and email sent successfully.');
                    toast.success('Invitation sent successfully! 🎉');
                } else {
                    console.error('⚠️ Warning: User created but email failed to send.');
                    console.error('Email Error:', result.emailError);
                    toast.warning('User created, but email failed. Please share the link manually.');
                }

                // Show success state with link
                setSuccessLink(result.inviteLink || null);

                // Copy to clipboard as a convenience
                if (result.inviteLink) {
                    navigator.clipboard.writeText(result.inviteLink).catch(() => { });
                }

                setEmail('');
                setRole('viewer');
                fetchUsers();

                // Automatically close modal after 5 seconds on success (longer to let them see the link)
                setTimeout(() => {
                    setInviteOpen(false);
                    setSuccessLink(null);
                }, 5000);
            }
        } catch (err: any) {
            // Show error message for unexpected errors
            toast.error('An unexpected error occurred');
            console.error(err);

            // Close modal after 2 seconds on error
            setTimeout(() => {
                setInviteOpen(false);
                setEmail('');
                setRole('viewer');
            }, 2000);
        } finally {
            setInviting(false);
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm('Are you sure you want to remove this user? This will remove their access immediately.')) return;

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

    const handleEditUser = (user: any) => {
        setEditMode(true);
        setSelectedUser(user);
        setEmail(user.email);
        setRole(user.role);
        setInviteOpen(true);
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setInviting(true);

        try {
            // Update user role in profiles table
            const { error } = await supabase
                .from('profiles')
                .update({
                    role: role,
                    updated_at: new Date().toISOString()
                })
                .eq('id', selectedUser.id);

            if (error) {
                toast.error('Failed to update user: ' + error.message);
            } else {
                toast.success('User updated successfully! 🎉');
                fetchUsers();

                // Close modal after 2 seconds
                setTimeout(() => {
                    setInviteOpen(false);
                    setEditMode(false);
                    setSelectedUser(null);
                    setEmail('');
                    setRole('viewer');
                }, 2000);
            }
        } catch (err: any) {
            toast.error('An unexpected error occurred');
            console.error(err);
        } finally {
            setInviting(false);
        }
    };

    const handleResendLink = async () => {
        if (!selectedUser) return;

        const result = await getInviteLink(selectedUser.email);
        if (result.error) {
            toast.error(result.error);
        } else if (result.inviteLink) {
            setSuccessLink(result.inviteLink);
            navigator.clipboard.writeText(result.inviteLink);
            toast.success('Fresh invite link copied to clipboard!');
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

    const handleCloseModal = () => {
        setInviteOpen(false);
        setEditMode(false);
        setInviteMode('invite');
        setSelectedUser(null);
        setSuccessLink(null);
        setSuccessMessage(false);
        setEmail('');
        setPassword('');
        setRole('viewer');
    };

    const handleCreateDirectly = async (e: React.FormEvent) => {
        e.preventDefault();
        setInviting(true);

        try {
            const result = await createUserDirectly(email, password, role);

            if (result.error) {
                toast.error(result.error);
            } else if (result.success) {
                toast.success('User created successfully! 🎉');
                setSuccessMessage(true);
                fetchUsers();

                // Do NOT close automatically, let admin copy details
            }
        } catch (err: any) {
            toast.error('An unexpected error occurred');
            console.error(err);
        } finally {
            setInviting(false);
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
                    if (!open) handleCloseModal();
                    else setInviteOpen(true);
                }}>
                    <DialogTrigger asChild>
                        <Button onClick={() => {
                            setEditMode(false);
                            setEmail('');
                            setPassword('');
                            setRole('viewer');
                            setInviteMode('create');
                        }}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                {editMode ? 'Edit User Details' : (
                                    <div className="flex items-center gap-4">
                                        <span onClick={() => !editMode && setInviteMode('invite')} className={`cursor-pointer ${inviteMode === 'invite' ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            Invite User
                                        </span>
                                        <span className="text-muted-foreground">|</span>
                                        <span onClick={() => !editMode && setInviteMode('create')} className={`cursor-pointer ${inviteMode === 'create' ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            Create User
                                        </span>
                                    </div>
                                )}
                            </DialogTitle>
                            <DialogDescription>
                                {editMode
                                    ? 'Update user role or resend invitation.'
                                    : inviteMode === 'invite'
                                        ? 'Send an invitation email to a new user.'
                                        : 'Create a user immediately with a password. No email needed.'}
                            </DialogDescription>
                        </DialogHeader>

                        {successLink || (inviteMode === 'create' && successMessage) ? (
                            <div className="py-6 space-y-6">
                                <div className="text-center space-y-2">
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <DialogTitle>{inviteMode === 'create' ? 'User Created! 🎉' : 'Link Generated! 🔗'}</DialogTitle>
                                    <DialogDescription>
                                        {inviteMode === 'create'
                                            ? 'User created successfully. You can now share the credentials.'
                                            : 'The invitation link matches the specific failure mode.'}
                                    </DialogDescription>
                                </div>

                                {inviteMode === 'create' && (
                                    <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Email:</span>
                                            <span className="font-medium">{email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Password:</span>
                                            <span className="font-medium">{password}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground pt-2 text-center">
                                            Copy these details now. The password will not be shown again.
                                        </p>
                                    </div>
                                )}

                                {successLink && (
                                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg border">
                                        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                        <code className="text-[10px] break-all flex-1 font-mono">{successLink}</code>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => {
                                                navigator.clipboard.writeText(successLink!);
                                                toast.success('Link copied!');
                                            }}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <DialogFooter>
                                    <Button type="button" className="w-full" onClick={handleCloseModal}>
                                        Done
                                    </Button>
                                </DialogFooter>
                            </div>
                        ) : (
                            <form onSubmit={editMode ? handleUpdateUser : (inviteMode === 'create' ? handleCreateDirectly : handleInvite)} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="colleague@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={editMode}
                                        className={editMode ? "bg-muted" : ""}
                                    />
                                    {editMode && (
                                        <p className="text-[10px] text-muted-foreground">
                                            Email cannot be changed once invited.
                                        </p>
                                    )}
                                </div>

                                {inviteMode === 'create' && !editMode && (
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="text"
                                            placeholder="Set a password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                        <p className="text-[10px] text-muted-foreground">
                                            Min 6 chars. You will share this with the user.
                                        </p>
                                    </div>
                                )}

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

                                {editMode && (
                                    <div className="pt-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="w-full text-muted-foreground hover:text-primary"
                                            onClick={handleResendLink}
                                        >
                                            <RefreshCw className="mr-2 h-3 w-3" />
                                            Resend Invitation Link
                                        </Button>
                                    </div>
                                )}

                                <DialogFooter>
                                    <Button type="submit" disabled={inviting} className="w-full">
                                        {inviting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                {editMode ? 'Updating...' : (inviteMode === 'create' ? 'Creating User...' : 'Sending Invite...')}
                                            </>
                                        ) : (
                                            editMode ? 'Update User' : (inviteMode === 'create' ? 'Create User' : 'Send Invitation')
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg bg-white dark:bg-slate-950 overflow-x-auto">
                <div className="min-w-[800px]">
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
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditUser(user)}
                                                    className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
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
