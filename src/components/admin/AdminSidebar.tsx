'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
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

import { canManageUsers, canManageSettings, Role } from '@/lib/rbac';
import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminSidebarProps {
  user: any;
  profile: any;
}

const getNavigation = (role: Role) => {
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

  const userRole = (profile?.role as Role) || 'viewer';
  const navigation = getNavigation(userRole);

  // Clear loading state when pathname changes
  useEffect(() => {
    setNavigatingTo(null);
  }, [pathname]);

  const handleNavigate = (href: string) => {
    if (href === pathname) return;
    setNavigatingTo(href);
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col relative">
      {/* Visual Indicator of Global Progress */}
      {navigatingTo && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary animate-progress-fast z-50 overflow-hidden">
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </div>
      )}

      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold shadow-lg">
            B
          </div>
          <span className="text-lg font-bold">ProCMS</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isLoading = navigatingTo === item.href;

            return (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigate(item.href)}
                  disabled={isLoading}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  ) : (
                    <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-500")} />
                  )}
                  <span className="flex-1 text-left">{item.name}</span>
                  {isLoading && (
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold shadow-sm border border-white/20">
            {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {profile?.full_name || 'User'}
            </p>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                {profile?.role || 'viewer'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
