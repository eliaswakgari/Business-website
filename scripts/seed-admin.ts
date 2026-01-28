
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

async function main() {
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
        console.error('Usage: tsx scripts/seed-admin.ts <email> <password>');
        process.exit(1);
    }

    console.log(`Creating Admin user: ${email}...`);

    // 1. Create or Update User in Auth
    // We use admin.createUser which bypasses email confirmation if "email_confirm" is off, 
    // or we can set email_confirm: true directly? No, usually createUser auto-confirms if specific flag is not set, or we can use "admin.createUser({ email, password, email_confirm: true })"

    // Note: createUser will error if user exists.
    // We try to list users first? Or just try create.

    // Try to create
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    let userId = userData.user?.id;

    if (createError) {
        if (createError.message.includes('already registered') || createError.status === 422) { // 422 is duplicate
            console.log('User already exists, fetching ID...');
            // Need to list users by email to get ID since we can't "get" by email easily without list
            const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
            if (listError) {
                console.error('Failed to list users:', listError);
                process.exit(1);
            }
            const existingUser = users.find(u => u.email === email);
            if (!existingUser) {
                console.error('User exists but could not be found in list.');
                process.exit(1);
            }
            userId = existingUser.id;

            // Optionally update password?
            // await supabase.auth.admin.updateUserById(userId, { password });
        } else {
            console.error('Error creating user:', createError);
            process.exit(1);
        }
    }

    if (!userId) {
        console.error('Failed to resolve User ID');
        process.exit(1);
    }

    console.log(`User ID: ${userId}`);

    // 2. Set Role to 'admin' in profiles
    console.log('Setting role to Admin in profiles...');

    const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            email: email,
            role: 'admin',
            updated_at: new Date().toISOString(),
            // We don't verify Full Name here, user can set it later or we default
        }, { onConflict: 'id' });

    if (profileError) {
        console.error('Error updating profile:', profileError);
        process.exit(1);
    }

    console.log('✅ Success! Admin user created/updated.');
}

main();
