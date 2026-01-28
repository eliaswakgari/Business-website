'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, LogOut, Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from './SidebarContext';
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
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  const [unreadContacts, setUnreadContacts] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();

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
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden text-slate-600 dark:text-slate-400"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden sm:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 h-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Search className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel className="flex justify-between items-center px-4 py-3">
              <span className="font-bold">Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                  {unreadCount} New
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
              {unreadContacts.length > 0 ? (
                unreadContacts.map((contact) => (
                  <DropdownMenuItem
                    key={contact.id}
                    className="p-3 cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800 border-b last:border-0 border-slate-100 dark:border-slate-800"
                    onClick={() => markAsRead(contact.id)}
                  >
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{contact.name}</span>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase opacity-70">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {contact.message}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="px-6 py-10 text-center">
                  <div className="flex justify-center mb-3">
                    <Bell className="h-10 w-10 text-slate-200 dark:text-slate-800" />
                  </div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">No new messages</div>
                  <p className="text-xs text-slate-500 mt-1">We'll notify you when someone contacts you.</p>
                </div>
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-center text-primary font-bold py-3 cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => router.push('/admin/contacts')}
            >
              View all messages
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <Avatar className="h-9 w-9 border border-border/50">
                <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">{(profile?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">{profile?.full_name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground truncate opacity-70">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem onClick={() => router.push('/admin/settings')} className="rounded-md cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div className="p-1">
              <DropdownMenuItem onClick={handleSignOut} className="rounded-md cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
