# Supabase Setup Instructions

Your project already contains a complete database schema with Row Level Security (RLS) policies in `supabase/schema.sql`.

Since you don't have the Supabase CLI installed, the easiest way to apply these settings is via the Supabase Dashboard.

## Option 1: Using the Supabase Dashboard (Recommended)

1.  **Log in** to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  **Select your project**.
3.  Go to the **SQL Editor** (icon on the left sidebar that looks like `>_`).
4.  **Create a new query**.
5.  **Copy the content** of `supabase/schema.sql`.
6.  **Paste** it into the SQL Editor.
7.  Click **Run**.
    - _Note: This creates all tables, enables RLS, and sets up security policies._
8.  (Optional) **Copy and Run** `supabase/seed.sql` if you want sample data.

### Option 1.1: Policies ONLY (If you already have tables)

If you already created your tables and just need to secure them:

1.  Open `supabase/policies.sql`.
2.  Copy the content.
3.  Paste into Supabase SQL Editor and Click **Run**.

---

## Option 2: Using Supabase CLI (Advanced)

If you prefer to use the command line, you first need to install the Supabase CLI.

1.  **Install CLI** (via npm):
    ```bash
    npm install -g supabase
    ```
2.  **Login**:
    ```bash
    supabase login
    ```
3.  **Link your project**:
    ```bash
    supabase link --project-ref your-project-ref
    ```
    _(Find your project ref in Settings -> General)_
4.  **Push the database schema**:
    ```bash
    supabase db reset
    ```
    _Warning: This resets the database to match your local schema._

## Schema Overview

Your `schema.sql` sets up the following:

- **Tables**: `profiles`, `posts`, `pages`, `services`, `team_members`, `testimonials`, `faqs`, `contacts`, `case_studies`, `page_views`, `activity_logs`.
- **RLS Policies**:
  - **Public Access**: `published` content (posts, pages, services, etc.) is viewable by everyone.
  - **Admin Access**: Users with `role = 'admin'` have full management access.
  - **User Access**: Users can manage their own `profiles` and `posts`.

## Next Steps

After applying the schema:

1.  **Sign up** a new user in your app.
2.  Go to the **Table Editor** -> `profiles` table in Supabase.
3.  Manually change your user's role to `admin` to access the dashboard.
