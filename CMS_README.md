# ProCMS – Modern Business CMS Platform

A scalable, role-based content management system for professional businesses built with Next.js 15, TypeScript, Supabase, and Tailwind CSS.

## 🚀 Project Overview

A full-featured, production-grade CMS business website that allows companies to manage their website content, users, media, and analytics through a secure admin dashboard. Built with a focus on performance, SEO, security, and UX.

## ✨ Key Features

### 1️⃣ Public Client-Facing Website

**Pages:**
- ✅ Home (hero, services, CTA)
- ✅ About Us
- ✅ Services (dynamic from CMS)
- ✅ Blog / News
- ✅ Case Studies / Projects
- ✅ Contact Us (form → database)
- ✅ Privacy & Terms (CMS-managed)

**Features:**
- ✅ SEO optimized (meta, OG, schema)
- ✅ Fully responsive (mobile-first)
- ✅ Dark / Light mode
- ✅ Smooth animations (Framer Motion)
- ✅ Fast loading (ISR / SSR)
- ✅ Multi-language ready (i18n)

### 2️⃣ Admin Dashboard (CMS Core)

**Authentication & Roles:**
- Email/password login (Supabase Auth)
- Roles: Admin, Editor, Viewer
- Role-based route protection

**CMS Content Management:**
CRUD operations for:
- Pages
- Blog posts
- Services
- Team members
- Testimonials
- FAQs
- Case studies

**Features:**
- Rich text editor (Markdown / Tiptap)
- Draft / Publish workflow
- Scheduled publishing
- SEO metadata management

**Media Management:**
- Image & file upload (Supabase Storage)
- Auto image optimization
- Folder-based organization
- File size/type validation

**Contact & Leads:**
- Contact form submissions stored in DB
- Admin can:
  - View messages
  - Mark as read
  - Export CSV
  - Email notifications (optional)

**Analytics & Monitoring:**
- Page views
- Popular posts
- Contact conversion rate
- User activity logs

### 3️⃣ Technical Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 | React framework with App Router |
| TypeScript | Type safety (strict mode) |
| Tailwind CSS | Utility-first styling |
| Supabase | Backend (Postgres + Auth + Storage) |
| React Query | Server state management |
| React Hook Form + Zod | Form validation |
| Framer Motion | Animations |
| Lucide React | Icons |

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- Supabase account

### Step 1: Clone and Install

```bash
git clone <repository-url>
cd landing-page-template-2
npm install
```

### Step 2: Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy your project URL and anon key

### Step 3: Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 4: Set Up Database

1. Go to Supabase Dashboard → SQL Editor
2. Copy the contents of `supabase/schema.sql`
3. Run the SQL script

This will create:
- All database tables
- Row Level Security policies
- Indexes for performance
- Triggers for timestamps
- Functions for user management

### Step 5: Configure Storage

1. Go to Supabase Dashboard → Storage
2. Create a new bucket called `media`
3. Set it to public
4. Add storage policies for authenticated users

### Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗂️ Database Schema

### Core Tables

**profiles** - User profiles with roles
- id, email, full_name, avatar_url, role, timestamps

**posts** - Blog posts
- id, title, slug, content, excerpt, featured_image, status, author_id, published_at, meta fields, tags

**pages** - Static pages
- id, title, slug, content, status, author_id, published_at, meta fields

**services** - Service offerings
- id, title, slug, description, icon, featured_image, status, order_index

**team_members** - Team profiles
- id, name, role, bio, avatar_url, social links, order_index, status

**testimonials** - Customer testimonials
- id, author details, content, rating, status, order_index

**faqs** - Frequently asked questions
- id, question, answer, category, order_index, status

**contacts** - Contact form submissions
- id, name, email, phone, company, message, status

**case_studies** - Project case studies
- id, title, slug, client_name, description, content, featured_image, tags, status

**page_views** - Analytics
- id, page_path, user_agent, referrer, ip_address, timestamp

**activity_logs** - Audit trail
- id, user_id, action, entity_type, entity_id, metadata, timestamp

## 🔐 Security Features

- Row Level Security (RLS) policies
- Role-based access control
- Protected admin routes
- Secure authentication flow
- Input validation with Zod
- XSS protection
- CSRF protection

## 🎨 UI/UX Features

- Clean enterprise-style layout
- Large hero typography
- Professional color palette
- Skeleton loaders
- Empty-state UI
- Toast notifications
- Accessibility (WCAG basics)
- Responsive design
- Dark/Light mode

## 📁 Project Structure

```
landing-page-template-2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Public pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── login/             # Authentication
│   │   └── signup/
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI primitives
│   │   └── admin/            # Admin components
│   ├── features/             # Feature modules
│   │   ├── home/
│   │   ├── blog/
│   │   └── admin/
│   ├── lib/                  # Utilities
│   │   ├── supabase/        # Supabase clients
│   │   └── utils.ts
│   ├── types/               # TypeScript types
│   │   └── database.ts
│   └── layouts/             # Layout components
├── supabase/
│   └── schema.sql           # Database schema
├── middleware.ts            # Auth middleware
└── .env.local.example       # Environment template
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📊 Analytics Setup

The CMS includes built-in analytics:
- Page view tracking
- Popular content reports
- Contact form conversion
- User activity monitoring

## 🎯 Portfolio Highlights

**For Upwork/Freelance:**
- ✅ Production-ready code
- ✅ Enterprise-grade architecture
- ✅ Role-based access control
- ✅ SEO optimized
- ✅ Fully documented
- ✅ Scalable database design
- ✅ Security best practices
- ✅ Modern tech stack

## 🤖 AI Prompts Used

### UI Design Prompt (Homepage)
```
Design a modern enterprise business website homepage UI. Clean layout, large hero section, professional color palette, modern typography, smooth animations, SaaS-style components, responsive design, dark/light mode.
```

### CMS Dashboard UI Prompt
```
Design a professional admin dashboard UI for a CMS system. Include sidebar navigation, content tables, forms, modals, analytics cards, and clean enterprise UX.
```

### Content Writing Prompt
```
Write professional website content for a tech consulting company. Tone: confident, modern, trustworthy. Include headline, subheadline, CTA, and SEO-friendly sections.
```

### Database Design Prompt
```
Design a scalable CMS database schema using PostgreSQL. Include role-based access, content publishing workflow, media storage, and audit logs.
```

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Credits

Built with modern web technologies and best practices for professional business websites.

---

**Ready for production. Ready for clients. Ready for your portfolio.**
