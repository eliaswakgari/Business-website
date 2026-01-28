'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function inviteUser(email: string, role: 'admin' | 'editor' | 'viewer') {
    const supabase = await createClient();

    // 1. Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { data: curProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (curProfile?.role !== 'admin') {
        return { error: 'Unauthorized: Only admins can invite users' };
    }

    // 2. Invite user via Supabase Admin API
    // NOTE: This usually requires SERVICE_ROLE_KEY if we want to bypass email confirmation or do specific things,
    // but standard inviteUserByEmail works with authenticated admin client IF "Enable Manual Linking" or similar is on,
    // OR we use the service role client. Since server.ts uses standard client, we might need service role.

    // Checking for service key in env (not exposed to client)
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey) {
        console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
        return { error: 'System configuration error: Service Role Key missing. Cannot invite users.' };
    }

    // Create admin client
    const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
    const adminClient = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    // 2. Hybrid Invite Approach
    // a) Try to send the email (as requested)
    const { data: inviteData, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/setup-account`
    });

    if (inviteError) {
        return { error: 'Email invite failed: ' + inviteError.message };
    }

    if (!inviteData.user) {
        return { error: 'Failed to create user invite' };
    }

    // b) Generate a backup link immediately so the Admin has it if email fails
    const { data: linkData } = await adminClient.auth.admin.generateLink({
        type: 'magiclink',
        email: email,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/setup-account`
        }
    });

    // We will return this link
    const finalLink = linkData?.properties?.action_link;

    // 3. Create profile entry with role
    // 3. Create or Update profile entry with role
    // We use upsert to handle cases where:
    // a) A trigger automatically created the profile
    // b) The user was already invited/exists and we are just updating their role
    const { error: profileError } = await adminClient
        .from('profiles')
        .upsert([
            {
                id: inviteData.user.id,
                email: email,
                role: role,
                // Only update full_name if it's new (handle via onConflict if needed, but simple upsert is fine here since we pass empty string)
                // Actually to avoid overwriting existing names with empty string, we should be careful.
                // improved strategy:
            }
        ], { onConflict: 'id', ignoreDuplicates: false });
    // Wait, if we upsert with full_name: '', we might wipe their name if they exist.
    // Better validation: Check if profile exists, if so update role. If not, insert.

    // Changing approach to be safer: Update role if exists, Insert if not.
    // Actually, upsert is fine if we exclude fields we don't want to overwrite?
    // Supabase upsert overwrites all columns provided.

    // Let's do:
    const { error: upsertError } = await adminClient
        .from('profiles')
        .upsert({
            id: inviteData.user.id,
            email: email,
            role: role,
            updated_at: new Date().toISOString()
        }, { onConflict: 'id' }); // We won't include full_name here to avoid wiping it.

    if (upsertError) {
        console.error('Error updating/creating profile:', upsertError);
        return { error: 'Failed to update profile: ' + upsertError.message };
    }

    revalidatePath('/admin/users');
    return { success: true, inviteLink: finalLink };
}

export async function getInviteLink(email: string) {
    const supabase = await createClient();

    // 1. Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };

    const { data: curProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (curProfile?.role !== 'admin') {
        return { error: 'Unauthorized' };
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) return { error: 'Configuration error' };

    const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
    const adminClient = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey
    );

    const { data, error } = await adminClient.auth.admin.generateLink({
        type: 'magiclink',
        email: email,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/setup-account`
        }
    });

    if (error) return { error: error.message };

    return { inviteLink: data?.properties?.action_link };
}
