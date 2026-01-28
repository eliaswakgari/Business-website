# AI Prompts for ProCMS Development

This document contains all the AI prompts used to build ProCMS. Reuse these for your own projects!

---

## 🎨 UI/UX Design Prompts

### Homepage Hero Section
```
Design a modern enterprise business website homepage UI.
Clean layout, large hero section, professional color palette,
modern typography, smooth animations, SaaS-style components,
responsive design, dark/light mode support.

Include:
- Large headline with gradient text
- Compelling subheadline
- Primary and secondary CTAs
- Hero image or illustration
- Trust indicators (logos, stats)
```

### Admin Dashboard
```
Design a professional admin dashboard UI for a CMS system.
Include sidebar navigation, content tables, forms, modals,
analytics cards, and clean enterprise UX.

Requirements:
- Sidebar with icons and labels
- Top header with search and notifications
- Stats cards with icons
- Data tables with actions
- Clean, minimal aesthetic
- Dark mode support
```

### Service Cards
```
Design modern service cards for a business website.
Each card should have:
- Icon or emoji
- Service title
- Description
- Hover effects
- Consistent spacing
- Professional appearance
```

### Contact Form
```
Design a professional contact form with:
- Name, email, phone, company fields
- Message textarea
- Submit button
- Validation states
- Success/error messages
- Accessible labels
```

---

## ✍️ Content Writing Prompts

### Homepage Content
```
Write professional website content for a tech consulting company.
Tone: confident, modern, trustworthy.

Include:
- Headline: Clear value proposition (8-12 words)
- Subheadline: Expand on value (20-30 words)
- CTA: Action-oriented button text
- Features: 3-6 key benefits
- Social proof: Client testimonials

Target audience: Startups and SMEs
Focus: Technical expertise, reliability, results
```

### About Us Page
```
Write an engaging About Us page for a software development agency.

Include:
- Company story and mission
- Team introduction
- Core values
- Why choose us
- Call to action

Tone: Professional yet approachable
Length: 300-500 words
```

### Service Descriptions
```
Write compelling service descriptions for:
1. Web Development
2. Mobile Apps
3. Cloud Solutions
4. UI/UX Design
5. Consulting
6. Support & Maintenance

Each description should:
- Be 2-3 sentences
- Highlight key benefits
- Use action-oriented language
- Be SEO-friendly
```

### Blog Post
```
Write a technical blog post for a software development agency.

Topic: [Your Topic]
Target audience: Startups and SMEs
Tone: Professional, educational, SEO-optimized
Length: 800-1200 words

Structure:
- Engaging headline
- Introduction (problem statement)
- Main content (3-5 sections)
- Code examples (if applicable)
- Conclusion with CTA
- Meta description (150-160 characters)
```

### Testimonials
```
Write 5 authentic customer testimonials for a software development company.

Each testimonial should:
- Be 2-3 sentences
- Mention specific benefits
- Sound genuine and varied
- Include author name, role, company
- Highlight different aspects (quality, speed, communication, results)
```

---

## 🗄️ Database Design Prompts

### CMS Database Schema
```
Design a scalable CMS database schema using PostgreSQL.

Requirements:
- User management with roles (admin, editor, viewer)
- Content types: posts, pages, services, team, testimonials, FAQs
- Publishing workflow (draft, published)
- Media storage references
- Contact form submissions
- Analytics tracking
- Activity logs for audit trail

Include:
- Table definitions with columns and types
- Relationships and foreign keys
- Indexes for performance
- Row Level Security (RLS) policies
- Triggers for timestamps
```

### RLS Policies
```
Create Row Level Security policies for a CMS database.

Tables: profiles, posts, pages, services, team_members, testimonials, faqs, contacts, case_studies

Roles: admin, editor, viewer

Rules:
- Public content (published) is viewable by everyone
- Draft content only visible to authors and admins
- Admins can do everything
- Editors can manage most content
- Viewers can only read
- Anyone can submit contact forms
```

---

## 🔧 Technical Implementation Prompts

### Next.js App Router Structure
```
Create a Next.js 15 App Router structure for a CMS platform.

Requirements:
- Public pages (home, about, services, blog, contact)
- Admin dashboard with nested routes
- Authentication pages (login, signup)
- Protected routes with middleware
- Server and client components
- TypeScript throughout
- SEO optimization (metadata)
```

### Supabase Integration
```
Implement Supabase integration for a Next.js app.

Include:
- Client-side Supabase client
- Server-side Supabase client
- Middleware for auth
- Type definitions from database
- Authentication flow (email/password, OAuth)
- Database queries with RLS
- File upload to Storage
```

### Form Validation
```
Create form validation using React Hook Form and Zod.

Forms needed:
- Login (email, password)
- Signup (name, email, password, confirm password)
- Contact (name, email, phone, company, message)
- Post editor (title, slug, content, excerpt, status)

Include:
- Schema definitions
- Error messages
- Async validation
- Submit handling
```

### Admin CRUD Interface
```
Create a CRUD interface for managing [content type].

Include:
- List view with table
- Create form
- Edit form
- Delete confirmation
- Search and filters
- Pagination
- Loading states
- Error handling
- Success messages
```

---

## 🎯 SEO Optimization Prompts

### Meta Tags
```
Generate SEO-optimized meta tags for:

Page: [Page Name]
Description: [Brief description]

Include:
- Title (50-60 characters)
- Description (150-160 characters)
- Open Graph tags
- Twitter Card tags
- Keywords
- Canonical URL
```

### Schema Markup
```
Create JSON-LD schema markup for:

Type: [Organization/Article/Product/etc.]

Include appropriate properties for the type.
```

---

## 🎨 Styling Prompts

### Tailwind Component
```
Create a [component name] component using Tailwind CSS.

Requirements:
- Responsive design
- Dark mode support
- Hover/focus states
- Accessibility (ARIA labels)
- Smooth animations
- Professional appearance

Style: [Modern/Minimal/Bold/etc.]
```

### Color Palette
```
Generate a professional color palette for a tech company.

Include:
- Primary color
- Secondary color
- Accent color
- Neutral grays
- Success/warning/error colors
- Dark mode variants

Style: Modern, trustworthy, professional
```

---

## 📱 Responsive Design Prompts

### Mobile Navigation
```
Design a mobile navigation menu for a business website.

Include:
- Hamburger menu icon
- Slide-in drawer
- Navigation links
- Close button
- Smooth animations
- Accessibility features
```

### Responsive Grid
```
Create a responsive grid layout for [content type].

Breakpoints:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

Include proper spacing and alignment.
```

---

## 🔐 Security Prompts

### Authentication Flow
```
Implement secure authentication flow using Supabase.

Include:
- Email/password signup
- Email verification
- Login with remember me
- Password reset
- OAuth (GitHub, Google)
- Protected routes
- Session management
```

### Input Validation
```
Create input validation and sanitization for:

Fields: [List fields]

Include:
- Type validation
- Length limits
- Format validation (email, phone, URL)
- XSS prevention
- SQL injection prevention
```

---

## 📊 Analytics Prompts

### Analytics Dashboard
```
Design an analytics dashboard showing:

Metrics:
- Page views
- Unique visitors
- Popular content
- User activity
- Conversion rates

Include:
- Stats cards
- Charts/graphs
- Time period selector
- Export functionality
```

---

## 🚀 Deployment Prompts

### Vercel Deployment
```
Create deployment configuration for Vercel.

Include:
- Environment variables
- Build settings
- Domain configuration
- Edge functions
- Redirects and rewrites
```

---

## 💡 Tips for Using These Prompts

1. **Be Specific**: Add your specific requirements to each prompt
2. **Iterate**: Refine the output by asking follow-up questions
3. **Context**: Provide context about your project and goals
4. **Examples**: Show examples of what you like
5. **Constraints**: Mention any technical constraints or requirements

---

**Use these prompts with ChatGPT, Claude, or any AI assistant to accelerate your development!** 🚀

