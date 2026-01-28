-- Create a bucket for media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to read files
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    bucket_id = 'media'
  );

-- Allow authenticated users to update/delete their own files (or any in this case for simplicity in admin)
CREATE POLICY "Authenticated users can manage" ON storage.objects
  FOR ALL USING (
    auth.role() = 'authenticated' AND 
    bucket_id = 'media'
  );
