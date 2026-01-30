'use server';

import { revalidatePath } from 'next/cache';
import { ensureRole } from '@/lib/auth/server';

export async function deleteUser(userId: string) {
    const { error } = await ensureRole(['admin']);
    if (error) return { error };

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) return { error: 'Configuration error' };

    const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
    const adminClient = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false }
    });

    const { error: deleteProfileError } = await adminClient
        .from('profiles')
        .delete()
        .eq('id', userId);

    if (deleteProfileError) return { error: 'Failed to delete profile: ' + deleteProfileError.message };

    const { error: deleteAuthError } = await adminClient.auth.admin.deleteUser(userId);
    if (deleteAuthError) return { error: 'Profile deleted, but auth user deletion failed: ' + deleteAuthError.message };

    revalidatePath('/admin/users');
    return { success: true };
}

export async function inviteUser(email: string, role: 'admin' | 'editor' | 'viewer') {
    const { error } = await ensureRole(['admin']);
    if (error) return { error };

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

    // 2. Alternative Approach: Create user + Generate magic link
    // This is more reliable than inviteUserByEmail which can timeout
    console.log('Attempting to create user and generate invitation link for:', email);
    console.log('Redirect URL:', `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/setup-account`);

    // First, check if user already exists
    const { data: existingUsers } = await adminClient.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find((u: any) => u.email === email);

    let userId: string;

    if (existingUser) {
        console.log('User already exists:', existingUser.id);
        userId = existingUser.id;
    } else {
        // Create the user without sending email (we'll send it manually via magic link)
        const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
            email: email,
            email_confirm: true, // Auto-confirm email
            user_metadata: {
                invited_at: new Date().toISOString(),
                invited_role: role
            }
        });

        if (createError) {
            console.error('Error creating user:', createError);
            return { error: 'Failed to create user: ' + createError.message };
        }

        if (!newUser.user) {
            console.error('No user data returned');
            return { error: 'Failed to create user' };
        }

        console.log('User created successfully:', newUser.user.id);
        userId = newUser.user.id;
    }

    // Generate magic link for the user to set their password
    const { data: linkData, error: linkError } = await adminClient.auth.admin.generateLink({
        type: 'magiclink',
        email: email,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/setup-account`
        }
    });

    if (linkError) {
        console.error('Error generating magic link:', linkError);
        return { error: 'Failed to generate invitation link: ' + linkError.message };
    }

    const finalLink = linkData?.properties?.action_link;

    if (!finalLink) {
        console.error('No magic link generated');
        return { error: 'Failed to generate invitation link' };
    }

    console.log('Magic link generated successfully');

    // Now try to send email via Supabase
    // We await this now to give feedback to the admin
    let emailSent = false;
    let emailError = null;

    try {
        const { error } = await adminClient.auth.admin.inviteUserByEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/setup-account`
        });

        if (error) {
            console.error('Email sending failed:', error.message);
            emailError = error.message;
        } else {
            console.log('✅ Email sent successfully via Supabase');
            emailSent = true;
        }
    } catch (err: any) {
        console.error('Email sending exception:', err.message);
        emailError = err.message;
    }

    // 3. Create or Update profile entry with role
    const { error: upsertError } = await adminClient
        .from('profiles')
        .upsert({
            id: userId,
            email: email,
            role: role,
            updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

    if (upsertError) {
        console.error('Error updating/creating profile:', upsertError);
        return { error: 'Failed to update profile: ' + upsertError.message };
    }

    console.log('Profile created/updated successfully');
    console.log('✅ Invitation process completed.');

    revalidatePath('/admin/users');
    return {
        success: true,
        emailSent: emailSent,
        emailError: emailError,
        inviteLink: finalLink,
        message: emailSent
            ? 'User invited successfully! Email sent.'
            : 'User created, but email failed to send. Please share the link manually.'
    };
}

export async function getInviteLink(email: string) {
    const { error } = await ensureRole(['admin']);
    if (error) return { error };

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) return { error: 'Configuration error' };

    const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
    const adminClient = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey
    );

    const { data: linkData, error: linkError } = await adminClient.auth.admin.generateLink({
        type: 'magiclink',
        email: email,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/setup-account`
        }
    });

    if (linkError) return { error: linkError.message };

    return { inviteLink: linkData?.properties?.action_link };
}

export async function createUserDirectly(email: string, password: string, role: 'admin' | 'editor' | 'viewer') {
    const { error } = await ensureRole(['admin']);
    if (error) return { error };

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) return { error: 'Configuration error: Missing SUPABASE_SERVICE_ROLE_KEY' };

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

    const { data: createdUser, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { created_by_admin: true }
    });

    let userId = createdUser?.user?.id ?? null;

    if (createError) {
        const message = (createError as any)?.message?.toLowerCase?.() ?? '';
        const looksLikeExists =
            message.includes('already') ||
            message.includes('exists') ||
            message.includes('registered') ||
            message.includes('duplicate');

        if (!looksLikeExists) {
            return { error: 'Failed to create user: ' + (createError as any).message };
        }

        const { data: usersList, error: listError } = await adminClient.auth.admin.listUsers();
        if (listError) return { error: 'User exists, but failed to look them up: ' + listError.message };

        const existing = usersList?.users?.find((u: any) => (u.email ?? '').toLowerCase() === email.toLowerCase());
        if (!existing) return { error: 'User already exists, but could not find them in Auth users list' };

        userId = existing.id;

        const { error: updateError } = await adminClient.auth.admin.updateUserById(userId, { password });
        if (updateError) return { error: 'User exists, but password update failed: ' + updateError.message };
    }

    if (!userId) {
        return { error: 'Failed to create user (No user id returned)' };
    }

    const { error: upsertError } = await adminClient
        .from('profiles')
        .upsert({
            id: userId,
            email,
            role,
            updated_at: new Date().toISOString(),
            full_name: 'New User'
        }, { onConflict: 'id' });

    if (upsertError) {
        return { error: 'User created but profile failed: ' + upsertError.message };
    }

    revalidatePath('/admin/users');
    return { success: true, message: 'User created successfully.' };
}

export async function resetUserPassword(userId: string, newPassword: string) {
    const { error: authError } = await ensureRole(['admin']);
    if (authError) return { error: authError };

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) return { error: 'Configuration error' };

    const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
    const adminClient = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false }
    });

    const { error: updateError } = await adminClient.auth.admin.updateUserById(userId, {
        password: newPassword
    });

    if (updateError) return { error: 'Failed to reset password: ' + updateError.message };

    return { success: true };
}
