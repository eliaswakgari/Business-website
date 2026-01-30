-- Enable Row Level Security (Idempotent by default in recent Postgres, but good to keep)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can read all, update own
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow admins to update any profile (for role management)
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Posts: Published posts are public, drafts only for authors/admins
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;
CREATE POLICY "Published posts are viewable by everyone" ON public.posts
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can create posts" ON public.posts;
CREATE POLICY "Authors can create posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can update own posts" ON public.posts;
CREATE POLICY "Authors can update own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can delete own posts" ON public.posts;
CREATE POLICY "Authors can delete own posts" ON public.posts
  FOR DELETE USING (auth.uid() = author_id);

-- Pages: Similar to posts
DROP POLICY IF EXISTS "Published pages are viewable by everyone" ON public.pages;
CREATE POLICY "Published pages are viewable by everyone" ON public.pages
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

DROP POLICY IF EXISTS "Authenticated users can manage pages" ON public.pages;
CREATE POLICY "Authenticated users can manage pages" ON public.pages
  FOR ALL USING (auth.role() = 'authenticated');

-- Services: Published services are public
DROP POLICY IF EXISTS "Published services are viewable by everyone" ON public.services;
CREATE POLICY "Published services are viewable by everyone" ON public.services
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can manage services" ON public.services;
CREATE POLICY "Authenticated users can manage services" ON public.services
  FOR ALL USING (auth.role() = 'authenticated');

-- Team members: Active members are public
DROP POLICY IF EXISTS "Active team members are viewable by everyone" ON public.team_members;
CREATE POLICY "Active team members are viewable by everyone" ON public.team_members
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Authenticated users can manage team members" ON public.team_members;
CREATE POLICY "Authenticated users can manage team members" ON public.team_members
  FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials: Published testimonials are public
DROP POLICY IF EXISTS "Published testimonials are viewable by everyone" ON public.testimonials;
CREATE POLICY "Published testimonials are viewable by everyone" ON public.testimonials
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON public.testimonials;
CREATE POLICY "Authenticated users can manage testimonials" ON public.testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- FAQs: Published FAQs are public
DROP POLICY IF EXISTS "Published FAQs are viewable by everyone" ON public.faqs;
CREATE POLICY "Published FAQs are viewable by everyone" ON public.faqs
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can manage FAQs" ON public.faqs;
CREATE POLICY "Authenticated users can manage FAQs" ON public.faqs
  FOR ALL USING (auth.role() = 'authenticated');

-- Contacts: Only authenticated users can view
DROP POLICY IF EXISTS "Authenticated users can view contacts" ON public.contacts;
CREATE POLICY "Authenticated users can view contacts" ON public.contacts
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Anyone can create contact" ON public.contacts;
CREATE POLICY "Anyone can create contact" ON public.contacts
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update contacts" ON public.contacts;
CREATE POLICY "Admins can update contacts" ON public.contacts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Case studies: Published case studies are public
DROP POLICY IF EXISTS "Published case studies are viewable by everyone" ON public.case_studies;
CREATE POLICY "Published case studies are viewable by everyone" ON public.case_studies
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can manage case studies" ON public.case_studies;
CREATE POLICY "Authenticated users can manage case studies" ON public.case_studies
  FOR ALL USING (auth.role() = 'authenticated');

-- Page views: Anyone can insert, only admins can read
DROP POLICY IF EXISTS "Anyone can create page view" ON public.page_views;
CREATE POLICY "Anyone can create page view" ON public.page_views
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view page views" ON public.page_views;
CREATE POLICY "Admins can view page views" ON public.page_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Activity logs: Only admins can read
DROP POLICY IF EXISTS "Admins can view activity logs" ON public.activity_logs;
CREATE POLICY "Admins can view activity logs" ON public.activity_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
