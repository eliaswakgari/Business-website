'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function fixAdminProfile() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: 'Not authenticated' };
        }

        const adminClient = createAdminClient();

        const { data: existingProfile, error: existingProfileError } = await adminClient
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (existingProfileError) {
            console.error('Error fetching current profile:', existingProfileError);
            return { success: false, error: existingProfileError.message };
        }

        if (existingProfile?.role !== 'admin') {
            return { success: false, error: 'Unauthorized' };
        }

        // Force upsert the profile with admin role
        const { error } = await adminClient
            .from('profiles')
            .upsert({
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || 'Admin User',
                avatar_url: user.user_metadata?.avatar_url,
                role: 'admin',
                updated_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Error fixing profile:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: any) {
        console.error('Server action error:', error);
        return { success: false, error: error.message };
    }
}
