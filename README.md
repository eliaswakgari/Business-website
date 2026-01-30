# Business Website CMS

This is a business/agency website with a built-in admin dashboard (CMS). It’s designed so a client can update website content without editing code.

The project is built with Next.js (App Router) and Supabase (Auth + Postgres).

## What you can do

- Manage website content from `/admin`
- Create and edit pages and blog posts
- Update services, team members, testimonials, FAQs, and case studies
- Manage user access with roles (`admin`, `editor`, `viewer`)

## Features

- Public marketing website pages
- Admin dashboard at `/admin`
- Role-based access control (`admin`, `editor`, `viewer`)
- Supabase Auth + Postgres + RLS

## Tech stack

- Next.js + TypeScript
- Tailwind CSS
- Supabase (Auth, Postgres, Storage)

## Local development

```bash
npm install
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin`

## Prerequisites

- Node.js 18+
- Supabase account

## Environment variables

Create `.env.local` (see `.env.local.example`).

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Server-only:

- `SUPABASE_SERVICE_ROLE_KEY`

## Supabase setup

### Fresh database

1. Supabase Dashboard → SQL Editor
2. Run: `supabase/schema.sql`
3. (Optional) Run: `supabase/seed.sql`

### Storage

1. Supabase Dashboard → Storage
2. Create bucket: `media`
3. Make it public (or keep private and adjust policies)

### Existing database

If your tables already exist, do not re-run the full schema.

1. Supabase Dashboard → SQL Editor
2. Run: `supabase/policies.sql` (RLS/policies)

## Roles and security

- Roles live in `public.profiles.role`
- Role changes are protected at the database level (only admins/service role can change roles)
- Keep `SUPABASE_SERVICE_ROLE_KEY` on the server only

### Portfolio demo accounts (for quick testing)

These accounts are included in the README to help a client test the admin dashboard quickly.

In a real production project, you should never publish credentials in documentation. Treat these as demo-only and change/remove them in production.

- `admin@gmail.com` (role: `admin`,password:`12wq!@WQ`)
- `editor@gmail.com` (role: `editor`,password:`12wq!@WQ`)
- `viewer@gmail.com` (role: `viewer`,password:`12wq!@WQ`)

How to set them up:

1. Supabase Dashboard → Authentication → Users → create the users above (set a temporary password)
2. Supabase Dashboard → Table Editor → `profiles`
3. Ensure each user has a profile row with the matching `id` and set the correct `role`

### Make your first admin

1. Sign up in the app
2. Supabase Dashboard → Table Editor → `profiles`
3. Set your user’s `role` to `admin`

## Using the admin dashboard

1. Sign in
2. Go to `/admin`
3. Use the sidebar to manage content

### Inviting users vs creating users

In **production**, prefer **Invite User**.

- **Invite User (recommended)**
  - Admin enters the user’s email + role.
  - The system sends an invite link.
  - The user completes account setup themselves (and sets their own password).
  - This avoids sharing passwords and is the normal, secure onboarding flow.

- **Create User (demo/testing only)**
  - Admin enters email + role and sets a temporary password.
  - This is useful for portfolio demos and quick testing.
  - The password should be treated as temporary and changed by the user later.
  - For real client production usage, disable this flow or restrict it to internal admins.

### Roles

- `admin`: full access (content + user management)
- `editor`: can manage content
- `viewer`: read-only access to admin pages

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in Vercel
3. Add the same environment variables in Vercel
4. Deploy

### Supabase redirect URLs (production)

Supabase Dashboard → Authentication → URL Configuration:

- **Site URL**: `https://your-domain.com`
- **Redirect URLs**:
  - `https://your-domain.com/auth/callback`

## Project structure

```
src/
  app/                 # Routes (App Router)
    admin/             # Admin dashboard
  components/          # Shared UI
  layouts/             # Header/Footer
  lib/
    supabase/          # Supabase clients (client/server/admin/middleware)
    auth/              # Auth + access helpers
  types/               # Database types
supabase/
  schema.sql
  policies.sql
```

## Commands

```bash
npm run dev
npm run build
npm start
npm run lint
```

## License

MIT (see `LICENSE`).
