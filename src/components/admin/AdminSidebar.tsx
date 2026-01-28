'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  File,
  Briefcase,
  Users,
  MessageSquare,
  Star,
  HelpCircle,
  FolderOpen,
  Settings,
  BarChart3,
  Loader2,
} from 'lucide-react';

import { canManageUsers, Role } from '@/lib/rbac';
import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import { Menu, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface AdminSidebarProps {
  user: any;
  profile: any;
}

const getNavigation = (role: Role) => {
  // ... (keeping same navigation logic)
  const allNav = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, requiredRole: null },
    { name: 'Posts', href: '/admin/posts', icon: FileText, requiredRole: null },
    { name: 'Pages', href: '/admin/pages', icon: File, requiredRole: null },
    { name: 'Services', href: '/admin/services', icon: Briefcase, requiredRole: null },
    { name: 'Team', href: '/admin/team', icon: Users, requiredRole: null },
    { name: 'Users', href: '/admin/users', icon: Users, requiredRole: 'admin' },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Star, requiredRole: null },
    { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle, requiredRole: null },
    { name: 'Case Studies', href: '/admin/case-studies', icon: FolderOpen, requiredRole: null },
    { name: 'Contacts', href: '/admin/contacts', icon: MessageSquare, requiredRole: null },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, requiredRole: null },
    { name: 'Settings', href: '/admin/settings', icon: Settings, requiredRole: null },
  ];

  return allNav.filter(item => {
    if (item.requiredRole === 'admin') return canManageUsers(role);
    return true;
  });
};

export default function AdminSidebar({ user, profile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const { isSidebarOpen, setIsSidebarOpen, isMobile } = useSidebar();

  const userRole = (profile?.role as Role) || 'viewer';
  const navigation = getNavigation(userRole);

  useEffect(() => {
    setNavigatingTo(null);
  }, [pathname]);

  const handleNavigate = (href: string) => {
    if (href === pathname) return;
    setNavigatingTo(href);
    if (isMobile) setIsSidebarOpen(false);
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={cn(
          "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col relative transition-all duration-300 ease-in-out z-[101]",
          isMobile
            ? cn("fixed inset-y-0 left-0 w-72", !isSidebarOpen && "-translate-x-full")
            : cn(isSidebarOpen ? "w-64" : "w-20")
        )}
      >
        {/* Progress Bar (at very top) */}
        {navigatingTo && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary animate-progress-fast z-50 overflow-hidden">
            <div className="absolute inset-0 bg-white/20 animate-shimmer" />
          </div>
        )}

        {/* Header - Logo and Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          {(isSidebarOpen || isMobile) ? (
            <Link href="/admin" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold shadow-lg">
                B
              </div>
              <span className="text-lg font-bold">ProCMS</span>
            </Link>
          ) : (
            <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold shadow-lg">
              B
            </div>
          )}

          {isMobile ? (
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex"
            >
              {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
          <ul className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isLoading = navigatingTo === item.href;
              const showText = isSidebarOpen || isMobile;

              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigate(item.href)}
                    disabled={isLoading}
                    className={cn(
                      'w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                    )}
                    title={!showText ? item.name : undefined}
                  >
                    <div className="flex items-center justify-center min-w-[20px]">
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      ) : (
                        <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-500")} />
                      )}
                    </div>
                    {showText && <span className="ml-3 flex-1 text-left truncate">{item.name}</span>}
                    {isLoading && showText && (
                      <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info Section */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 overflow-hidden">
          <div className={cn("flex items-center gap-3", !isSidebarOpen && !isMobile && "justify-center")}>
            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold shadow-sm border border-white/10">
              {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            {(isSidebarOpen || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate leading-none mb-1">
                  {profile?.full_name || 'User'}
                </p>
                <div className="flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-green-500" />
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black opacity-80">
                    {profile?.role || 'viewer'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
