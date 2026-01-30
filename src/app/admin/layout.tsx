import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SidebarProvider } from '@/components/admin/SidebarContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ProgressBar from '@/components/admin/ProgressBar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user profile with role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || !['admin', 'editor', 'viewer'].includes(profile.role)) {
    redirect('/');
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <AdminSidebar user={user} profile={profile} />
        <div className="flex-1 flex flex-col min-w-0">
          <ProgressBar />
          <AdminHeader user={user} profile={profile} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
