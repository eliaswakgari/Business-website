'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminHeaderProps {
  user: any;
  profile: any;
}

export default function AdminHeader({ user, profile }: AdminHeaderProps) {
  const router = useRouter();
  const supabase = createClient();

  const [unreadContacts, setUnreadContacts] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();

    // Set up real-time subscription for new contacts
    const channel = supabase
      .channel('public:contacts')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'contacts'
      }, () => {
        fetchUnreadCount();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchUnreadCount = async () => {
    const { data, count } = await supabase
      .from('contacts')
      .select('*', { count: 'exact' })
      .eq('status', 'unread')
      .order('created_at', { ascending: false })
      .limit(5);

    setUnreadContacts(data || []);
    setUnreadCount(count || 0);
  };

  const markAsRead = async (contactId: string) => {
    await supabase
      .from('contacts')
      .update({ status: 'read' })
      .eq('id', contactId);

    fetchUnreadCount();
    router.push('/admin/contacts');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search content..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white dark:border-slate-900">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel className="flex justify-between items-center">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {unreadCount} New
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {unreadContacts.length > 0 ? (
                unreadContacts.map((contact) => (
                  <DropdownMenuItem
                    key={contact.id}
                    className="p-3 cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800"
                    onClick={() => markAsRead(contact.id)}
                  >
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm truncate">{contact.name}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {contact.message}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No new messages
                </div>
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-center text-primary font-medium p-2 cursor-pointer"
              onClick={() => router.push('/admin/contacts')}
            >
              View all messages
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                <AvatarFallback>{(profile?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{profile?.full_name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
