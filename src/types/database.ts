export type UserRole = 'admin' | 'editor' | 'viewer';
export type ContentStatus = 'draft' | 'published';
export type ContactStatus = 'unread' | 'read' | 'replied';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  status: ContentStatus;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[] | null;
  author?: Profile;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  status: ContentStatus;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  author?: Profile;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  icon: string | null;
  featured_image: string | null;
  status: ContentStatus;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  order_index: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  author_company: string | null;
  author_avatar: string | null;
  content: string;
  rating: number | null;
  status: ContentStatus;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order_index: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  description: string | null;
  content: string | null;
  featured_image: string | null;
  tags: string[] | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageView {
  id: string;
  page_path: string;
  user_agent: string | null;
  referrer: string | null;
  ip_address: string | null;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
  user?: Profile;
}
