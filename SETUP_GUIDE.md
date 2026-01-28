# ProCMS Setup Guide

Complete step-by-step guide to set up your CMS platform.

## 📋 Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- A Supabase account (free tier works)
- Git

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
cd landing-page-template-2
npm install
```

### Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - Project name: `procms` (or your choice)
   - Database password: (save this!)
   - Region: Choose closest to you
4. Wait 2-3 minutes for project creation

### Step 3: Get API Keys

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### Step 4: Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and paste your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 5: Set Up Database

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open `supabase/schema.sql` in your code editor
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click **Run** (bottom right)
7. Wait for "Success" message

This creates:
- ✅ 11 database tables
- ✅ Row Level Security policies
- ✅ Indexes for performance
- ✅ Triggers for auto-updates
- ✅ Functions for user management

### Step 6: Configure Storage

1. In Supabase Dashboard, go to **Storage**
2. Click **New Bucket**
3. Name it: `media`
4. Make it **Public**
5. Click **Create Bucket**

#### Add Storage Policies

Go to **Storage** → **Policies** → **media** bucket:

**Policy 1: Public Read**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'media' );
```

**Policy 2: Authenticated Upload**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
);
```

**Policy 3: Authenticated Update**
```sql
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'media' AND auth.role() = 'authenticated' );
```

**Policy 4: Authenticated Delete**
```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'media' AND auth.role() = 'authenticated' );
```

### Step 7: Configure Authentication

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider (should be on by default)
3. Optional: Enable **GitHub** and **Google** OAuth:
   - Click on each provider
   - Follow setup instructions
   - Add redirect URL: `http://localhost:3000/auth/callback`

### Step 8: Create First Admin User

#### Option A: Via Supabase Dashboard

1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter email and password
4. Click **Create User**
5. Go to **Table Editor** → **profiles**
6. Find your user
7. Change `role` from `viewer` to `admin`
8. Click **Save**

#### Option B: Via SQL

```sql
-- First, sign up via your app at /signup
-- Then run this SQL to make yourself admin:

UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### Step 9: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 10: Test Everything

1. **Public Site**: Visit `http://localhost:3000`
2. **Login**: Go to `http://localhost:3000/login`
3. **Admin Dashboard**: After login, visit `http://localhost:3000/admin`

## ✅ Verification Checklist

- [ ] Dependencies installed
- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database schema executed successfully
- [ ] Storage bucket created with policies
- [ ] Authentication providers enabled
- [ ] First admin user created
- [ ] Dev server running
- [ ] Can access public site
- [ ] Can login
- [ ] Can access admin dashboard

## 🎯 Next Steps

### Add Sample Content

1. Login to admin dashboard
2. Go to **Posts** → **Create New**
3. Add a blog post
4. Go to **Pages** → **Create New**
5. Add an About page
6. Go to **Services** → **Create New**
7. Add your services

### Customize Branding

1. Update logo in `src/layouts/Header/components/Logo.tsx`
2. Update site name in `src/config/site.config.ts`
3. Update colors in `src/app/globals.css`
4. Update favicon in `public/`

### Configure Email (Optional)

1. In Supabase Dashboard, go to **Authentication** → **Email Templates**
2. Customize confirmation email
3. Add your SMTP settings in **Settings** → **Auth**

## 🐛 Troubleshooting

### "Failed to fetch" error

**Problem**: Can't connect to Supabase

**Solution**:
- Check `.env.local` has correct values
- Restart dev server: `npm run dev`
- Check Supabase project is running

### "Row Level Security" error

**Problem**: Can't read/write data

**Solution**:
- Make sure you ran the full `schema.sql`
- Check RLS policies are created
- Verify user is authenticated

### "Storage bucket not found"

**Problem**: Can't upload images

**Solution**:
- Create `media` bucket in Supabase Storage
- Make it public
- Add storage policies (see Step 6)

### Can't access admin dashboard

**Problem**: Redirected to login

**Solution**:
- Make sure you're logged in
- Check user role is `admin` or `editor` in profiles table
- Clear browser cache and cookies

### Database tables not created

**Problem**: SQL script failed

**Solution**:
- Copy SQL in smaller chunks
- Check for error messages in SQL Editor
- Make sure UUID extension is enabled

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🆘 Need Help?

1. Check error messages in browser console
2. Check Supabase logs in Dashboard
3. Review this guide again
4. Check `CMS_README.md` for architecture details

## 🚀 Production Deployment

See `DEPLOYMENT.md` for production deployment guide.

---

**Setup complete! You now have a fully functional CMS platform.** 🎉
