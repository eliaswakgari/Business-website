'use client';

import { useState, useEffect } from 'react';
import { Header, Footer } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [siteContact, setSiteContact] = useState({
    email: 'contact@procms.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street\nSan Francisco, CA 94102'
  });

  const supabase = createClient();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'contact_info')
        .single();

      if (data) {
        setSiteContact(data.value);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: submitError } = await supabase
        .from('contacts')
        .insert([formData]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge className="mb-4">Contact Us</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have a question or want to work together? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{siteContact.email}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Phone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{siteContact.phone}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Office</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {siteContact.address}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-2">
                            Company
                          </label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your company"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Tell us about your project..."
                        />
                      </div>

                      {success && (
                        <div className="p-4 bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 rounded-md">
                          Thank you! Your message has been sent successfully.
                        </div>
                      )}

                      {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-md">
                          {error}
                        </div>
                      )}

                      <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Sending...' : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
