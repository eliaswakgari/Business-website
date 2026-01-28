# ProCMS – Modern Business CMS Platform

**ProCMS** is a production-ready, scalable Content Management System built with **Next.js 15**, **TypeScript**, **Supabase**, and **Tailwind CSS**. Perfect for professional portfolios and attracting real clients on Upwork.

🔗 **Portfolio Project**: Full-featured CMS with admin dashboard, role-based access, and enterprise-grade architecture.

---

## 🚀 What Makes This Special

This is not just a landing page template - it's a **complete CMS platform** that demonstrates:

- ✅ **Production-Ready Code** - Enterprise-grade architecture
- ✅ **Full-Stack Implementation** - Frontend + Backend + Database
- ✅ **Role-Based Access Control** - Admin, Editor, Viewer roles
- ✅ **Secure Authentication** - Supabase Auth with OAuth
- ✅ **Content Management** - CRUD for posts, pages, services, team, testimonials, FAQs
- ✅ **Media Management** - Image upload and optimization
- ✅ **Analytics Dashboard** - Page views, popular content, user activity
- ✅ **Contact Management** - Form submissions with admin panel
- ✅ **SEO Optimized** - Meta tags, OG images, schema markup
- ✅ **Fully Responsive** - Mobile-first design
- ✅ **Dark/Light Mode** - Theme switching
- ✅ **Type-Safe** - TypeScript strict mode
- ✅ **Database Design** - Scalable PostgreSQL schema with RLS

---

## 🎯 Perfect For

- **Portfolio Projects** - Showcase your full-stack skills
- **Upwork/Freelance** - Win high-value CMS projects
- **Client Projects** - Production-ready foundation
- **Learning** - Study modern web architecture
- **Startups** - Launch your business website quickly

---

## ✨ Key Features

### 1️⃣ Public Website

**Pages:**
- Home (hero, services, testimonials, CTA)
- About Us
- Services (dynamic from CMS)
- Blog / News
- Case Studies / Projects
- Contact Us (form → database)
- Privacy & Terms

**Features:**
- SEO optimized (meta, OG, schema)
- Fully responsive (mobile-first)
- Dark / Light mode
- Smooth animations (Framer Motion)
- Fast loading (ISR / SSR)

### 2️⃣ Admin Dashboard

**Authentication:**
- Email/password login
- OAuth (GitHub, Google)
- Role-based access (Admin, Editor, Viewer)
- Protected routes

**Content Management:**
- Posts (blog articles)
- Pages (static content)
- Services
- Team members
- Testimonials
- FAQs
- Case studies
- Draft/Publish workflow

**Media Management:**
- Image & file upload
- Auto optimization
- Folder organization

**Contact & Leads:**
- View submissions
- Mark as read
- Export CSV

**Analytics:**
- Page views
- Popular content
- User activity logs

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- Supabase account (free tier works)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Set up database (see SETUP_GUIDE.md)
# Run the SQL in supabase/schema.sql
# Optionally run supabase/seed.sql for sample data

# 4. Start development server
npm run dev
```

**📖 Full Setup Guide**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.

**🎯 Portfolio Pitch**: See [PORTFOLIO_PITCH.md](./PORTFOLIO_PITCH.md) for Upwork/client pitch templates.

---

## 📦 Tech Stack

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

---

## 🗂️ Project Structure

```
landing-page-template-2/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── login/             # Authentication
│   │   └── signup/
│   ├── components/
│   │   ├── ui/                # UI primitives
│   │   └── admin/             # Admin components
│   ├── features/              # Feature modules
│   ├── lib/
│   │   ├── supabase/          # Supabase clients
│   │   └── utils.ts
│   ├── types/
│   │   └── database.ts        # TypeScript types
│   └── layouts/
├── supabase/
│   └── schema.sql             # Database schema
├── middleware.ts              # Auth middleware
└── .env.local.example         # Environment template
```

---

## 📊 Database Schema

**11 Tables:**
- `profiles` - User profiles with roles
- `posts` - Blog posts
- `pages` - Static pages
- `services` - Service offerings
- `team_members` - Team profiles
- `testimonials` - Customer testimonials
- `faqs` - Frequently asked questions
- `contacts` - Contact form submissions
- `case_studies` - Project case studies
- `page_views` - Analytics
- `activity_logs` - Audit trail

**Security:**
- Row Level Security (RLS) policies
- Role-based access control
- Secure authentication flow

---

## 🎨 Design Philosophy

This template follows **Tailwind CSS's professional design patterns**:

- Typography-first approach
- Clean, minimal aesthetic
- Subtle interactions
- Consistent spacing
- Professional color palette
- Mobile-first responsive design

See [TAILWIND_STYLE_GUIDE.md](./TAILWIND_STYLE_GUIDE.md) for complete design documentation.

---

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions
- **[CMS_README.md](./CMS_README.md)** - CMS architecture and features
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[TAILWIND_STYLE_GUIDE.md](./TAILWIND_STYLE_GUIDE.md)** - Design system
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

**📖 Full Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎯 Portfolio Highlights

**What makes this impressive for clients:**

✅ **Enterprise Architecture** - Scalable, maintainable code structure  
✅ **Security Best Practices** - RLS, authentication, input validation  
✅ **Performance Optimized** - ISR, image optimization, edge functions  
✅ **SEO Ready** - Meta tags, sitemap, schema markup  
✅ **Fully Documented** - Setup guides, API docs, code comments  
✅ **Type-Safe** - TypeScript throughout  
✅ **Modern Stack** - Latest Next.js, React 19, Supabase  
✅ **Production Ready** - Error handling, loading states, empty states  

---

## 🤖 AI Prompts Used

This project was built using professional AI prompts:

### UI Design
```
Design a modern enterprise business website homepage UI. Clean layout, 
large hero section, professional color palette, modern typography, 
smooth animations, SaaS-style components, responsive design, dark/light mode.
```

### CMS Dashboard
```
Design a professional admin dashboard UI for a CMS system. Include sidebar 
navigation, content tables, forms, modals, analytics cards, and clean enterprise UX.
```

### Database Design
```
Design a scalable CMS database schema using PostgreSQL. Include role-based 
access, content publishing workflow, media storage, and audit logs.
```

---

## 🔧 Development

```bash
# Development
npm run dev

# Build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

Built with modern web technologies and best practices for professional business websites.

Created by [Aniq UI](https://www.aniq-ui.com) — Premium Next.js Templates for modern web apps.

---

**Ready for production. Ready for clients. Ready for your portfolio.** 🚀

---

## 🧠 Project Structure

This project follows a **feature-based architecture** with modular, reusable components:

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
│
├── components/             # Shared/Reusable components
│   ├── ui/                 # UI primitives (Button, Input, etc.)
│   └── index.ts            # Component exports
│
├── config/                 # App configuration
│   └── site.config.ts      # Site-wide settings (nav, footer, social links)
│
├── features/               # Page-specific features (organized by page)
│   ├── index.ts            # Feature exports
│   └── home/               # Home page features
│       ├── Hero/
│       │   ├── index.tsx
│       │   ├── components/
│       │   └── config/
│       ├── SocialProof/
│       ├── Features/
│       ├── HowItWorks/
│       ├── Testimonials/
│       ├── Pricing/
│       ├── ComparisonTable/
│       ├── Integrations/
│       ├── Faq/
│       ├── BlogPreview/
│       ├── Cta/
│       └── Newsletter/
│
├── hooks/                  # Global custom hooks
│   └── use-mobile.tsx      # Mobile detection hook
│
├── layouts/                # Layout components
│   ├── Header/
│   │   ├── index.tsx
│   │   ├── components/     # DesktopNav, MobileMenu, Logo, HeaderActions
│   │   └── config/         # mega-menu.config.tsx
│   └── Footer/
│       └── index.tsx
│
├── lib/                    # Utility functions
│   └── utils.ts            # cn() helper for Tailwind classes
│
├── providers/              # React context providers
│   └── theme-provider.tsx  # ThemeProvider setup
│
├── services/               # API services (future use)
├── store/                  # State management (future use)
├── styles/                 # Additional styles
└── types/                  # TypeScript type definitions
    └── index.ts
```

---

## 📄 Adding a New Page

Follow these steps to add a new page (e.g., `/about`):

### Step 1: Create the Page Route

Create a new file in `src/app/`:

```tsx
// src/app/about/page.tsx
import { AboutHero, AboutTeam, AboutValues } from "@/features/about";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutValues />
      <AboutTeam />
    </main>
  );
}
```

### Step 2: Create the Features Folder

Create the feature folder structure:

```
src/features/about/
├── index.ts              # Export all features
├── AboutHero/
│   ├── index.tsx         # Main component
│   ├── components/       # Sub-components
│   └── config/           # Feature-specific config/data
├── AboutTeam/
│   ├── index.tsx
│   └── components/
└── AboutValues/
    └── index.tsx
```

### Step 3: Create a Feature Component

Example feature component:

```tsx
// src/features/about/AboutHero/index.tsx
import { heroConfig } from "./config/hero.config";
import { HeroContent } from "./components/HeroContent";

export default function AboutHero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <HeroContent />
    </section>
  );
}
```

### Step 4: Export from Feature Index

```tsx
// src/features/about/index.ts
export { default as AboutHero } from "./AboutHero";
export { default as AboutTeam } from "./AboutTeam";
export { default as AboutValues } from "./AboutValues";
```

### Step 5: Add to Main Features Export

```tsx
// src/features/index.ts
// Home features
export {
  Hero,
  SocialProof,
  Features,
  HowItWorks,
  Testimonials,
  Pricing,
  ComparisonTable,
  Integrations,
  Faq,
  BlogPreview,
  Cta,
  Newsletter,
} from "./home";

// About features
export { AboutHero, AboutTeam, AboutValues } from "./about";
```

### Step 6: Update Navigation (Optional)

Add the new page to `src/config/site.config.ts`:

```tsx
export const siteConfig = {
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" }, // Add new link
    // ...
  ],
};
```

---

## 🧩 Component Architecture

### UI Components (`src/components/ui/`)

Reusable, stateless UI primitives:

- `Button` - Styled button with variants
- `Input` - Form input component

### Feature Components

Each feature follows this pattern with **separation of concerns**:

```
src/features/home/Hero/
├── index.tsx           # Main export (composition only)
├── components/         # UI sub-components
│   ├── HeroContent.tsx
│   ├── HeroImage.tsx
│   └── GridPattern.tsx
└── config/             # Data, constants, configurations
    └── hero.config.ts
```

**Key Principles:**

- **index.tsx** - Only composes sub-components, no business logic
- **components/** - Reusable UI pieces specific to the feature
- **config/** - Static data, text content, configuration objects

### Layout Components

```
src/layouts/Header/
├── index.tsx           # Main export
├── components/         # Logo, DesktopNav, MobileMenu, HeaderActions, MegaMenu
└── config/             # Navigation configuration
    └── mega-menu.config.tsx
```

---

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework
- **CSS Variables** - Theme colors defined in `globals.css`
- **Dark Mode** - Supported via `next-themes`
- **Custom Utilities** - `cn()` helper for conditional classes

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-class", isActive && "active-class")} />;
```

---

## 🔧 Configuration

### Site Config (`src/config/site.config.ts`)

Centralized configuration for:

- Navigation links
- Footer links
- Social media links
- Site metadata

### TypeScript Paths

Path aliases configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Usage:

```tsx
import { Button } from "@/components/ui/button";
import { Hero } from "@/features/home/Hero";
import { cn } from "@/lib/utils";
```

---

## 🌟 Features

- ✨ **Next.js 15** with App Router
- 📝 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🎭 **Framer Motion** for animations
- 🌙 **Dark Mode** support (optimized for dark theme)
- 📱 **Fully Responsive** design
- 🧩 **Feature-based Architecture** for scalability
- 🔄 **Separation of Concerns** (components, config, hooks)
- 🎯 **Professional Business UI** with modern components
- ♿ **Accessible** - WCAG AA compliant
- 🎨 **Design System** - Comprehensive design tokens and guidelines

---

## 📦 Tech Stack

| Technology    | Purpose                         |
| ------------- | ------------------------------- |
| Next.js 15    | React framework with App Router |
| TypeScript    | Type safety                     |
| Tailwind CSS  | Utility-first styling           |
| Framer Motion | Animations                      |
| Lucide React  | Icons                           |
| next-themes   | Theme management                |
| Radix UI      | Accessible UI primitives        |

---

## 💬 Support

For questions or support, contact the [Aniq UI team](https://www.aniq-ui.com/#contact).

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Created by [Aniq UI](https://www.aniq-ui.com) — Premium Next.js Templates for modern web apps.
# Business-website
