-- Sample data for ProCMS
-- Run this after schema.sql to populate your database with demo content

-- Insert sample services
INSERT INTO public.services (title, slug, description, icon, status, order_index) VALUES
('Web Development', 'web-development', 'Custom web applications built with modern technologies for optimal performance and user experience.', '🌐', 'published', 1),
('Mobile Apps', 'mobile-apps', 'Native and cross-platform mobile applications for iOS and Android.', '📱', 'published', 2),
('Cloud Solutions', 'cloud-solutions', 'Scalable cloud infrastructure and deployment solutions.', '☁️', 'published', 3),
('UI/UX Design', 'ui-ux-design', 'Beautiful, intuitive interfaces that users love.', '🎨', 'published', 4),
('Consulting', 'consulting', 'Expert technical consulting and architecture planning.', '💡', 'published', 5),
('Support & Maintenance', 'support-maintenance', '24/7 support and ongoing maintenance services.', '🛠️', 'published', 6);

-- Insert sample FAQs
INSERT INTO public.faqs (question, answer, category, order_index, status) VALUES
('What technologies do you use?', 'We use modern technologies including Next.js, React, TypeScript, Node.js, and cloud platforms like AWS and Vercel.', 'Technical', 1, 'published'),
('How long does a typical project take?', 'Project timelines vary based on complexity, but most projects take 4-12 weeks from start to launch.', 'General', 2, 'published'),
('Do you offer ongoing support?', 'Yes, we offer comprehensive support and maintenance packages to keep your application running smoothly.', 'Support', 3, 'published'),
('What is your pricing model?', 'We offer both fixed-price projects and hourly rates depending on your needs. Contact us for a custom quote.', 'Pricing', 4, 'published'),
('Can you work with our existing team?', 'Absolutely! We integrate seamlessly with your existing development team and processes.', 'General', 5, 'published');

-- Insert sample team members
INSERT INTO public.team_members (name, role, bio, order_index, status) VALUES
('John Smith', 'CEO & Founder', 'Visionary leader with 15+ years in tech industry. Passionate about building scalable solutions.', 1, 'active'),
('Sarah Johnson', 'CTO', 'Technical architect specializing in cloud infrastructure and system design.', 2, 'active'),
('Mike Chen', 'Lead Developer', 'Full-stack developer with expertise in React, Node.js, and modern web technologies.', 3, 'active'),
('Emily Davis', 'UX Designer', 'Creative designer focused on user-centered design and beautiful interfaces.', 4, 'active');

-- Insert sample testimonials
INSERT INTO public.testimonials (author_name, author_role, author_company, content, rating, status, order_index) VALUES
('David Wilson', 'CEO', 'TechStart Inc', 'Working with this team was an absolute pleasure. They delivered our project on time and exceeded our expectations.', 5, 'published', 1),
('Lisa Anderson', 'Product Manager', 'InnovateCo', 'The attention to detail and technical expertise is outstanding. Highly recommend for any serious project.', 5, 'published', 2),
('Robert Brown', 'CTO', 'Digital Solutions', 'Professional, responsive, and delivered exactly what we needed. Will definitely work with them again.', 5, 'published', 3);

-- Insert sample blog posts (requires a user_id - update after creating your first user)
-- You'll need to replace 'YOUR_USER_ID' with an actual user ID from profiles table
-- INSERT INTO public.posts (title, slug, content, excerpt, status, published_at, meta_title, meta_description) VALUES
-- ('Getting Started with Next.js', 'getting-started-nextjs', 'Full content here...', 'Learn how to build modern web applications with Next.js', 'published', NOW(), 'Getting Started with Next.js', 'Complete guide to Next.js');

-- Insert sample pages
INSERT INTO public.pages (title, slug, content, status, published_at) VALUES
('Privacy Policy', 'privacy-policy', '<h2>Privacy Policy</h2><p>Your privacy is important to us...</p>', 'published', NOW()),
('Terms of Service', 'terms-of-service', '<h2>Terms of Service</h2><p>By using our services, you agree to...</p>', 'published', NOW());

-- Insert sample case studies
INSERT INTO public.case_studies (title, slug, client_name, description, content, tags, status, published_at) VALUES
('E-Commerce Platform Redesign', 'ecommerce-platform-redesign', 'ShopCo', 'Complete redesign and modernization of legacy e-commerce platform', 'Full case study content...', ARRAY['E-Commerce', 'React', 'Node.js'], 'published', NOW()),
('Mobile Banking App', 'mobile-banking-app', 'FinanceBank', 'Secure mobile banking application for iOS and Android', 'Full case study content...', ARRAY['Mobile', 'React Native', 'Security'], 'published', NOW());

