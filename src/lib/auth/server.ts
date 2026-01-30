import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Role } from './access-control';

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: Role;
  updated_at?: string | null;
  created_at?: string | null;
};

export async function getCurrentUserWithProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null } as const;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return { user, profile: (profile as Profile | null) ?? null } as const;
}

export async function requireAuth(redirectTo: string = '/login') {
  const { user, profile } = await getCurrentUserWithProfile();

  if (!user) {
    redirect(redirectTo);
  }

  return { user, profile };
}

export async function requireRole(requiredRoles: Role[], redirectTo: string = '/') {
  const { user, profile } = await requireAuth();

  const role = profile?.role;

  if (!role || !requiredRoles.includes(role)) {
    redirect(redirectTo);
  }

  return { user, profile, role };
}

export async function ensureRole(requiredRoles: Role[]) {
  const { user, profile } = await getCurrentUserWithProfile();

  if (!user) {
    return { user: null, profile: null, role: null, error: 'Not authenticated' } as const;
  }

  const role = profile?.role ?? null;

  if (!role || !requiredRoles.includes(role)) {
    return { user, profile, role, error: 'Unauthorized' } as const;
  }

  return { user, profile, role, error: null } as const;
}
