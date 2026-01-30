import Link from 'next/link';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SetupRequiredPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
              <AlertCircle className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Supabase Setup Required</CardTitle>
          <p className="text-muted-foreground mt-2">
            Your CMS needs to be configured with Supabase credentials
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              <strong>Missing Environment Variables:</strong> The application cannot connect to Supabase because the required environment variables are not configured.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Setup (5 minutes)</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Create a Supabase Project</p>
                  <p className="text-sm text-muted-foreground">
                    Go to{' '}
                    <a 
                      href="https://supabase.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      supabase.com
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {' '}and create a new project
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Get Your API Keys</p>
                  <p className="text-sm text-muted-foreground">
                    In Supabase Dashboard → Settings → API, copy your Project URL and anon key
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Configure Environment Variables</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Create a <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.env.local</code> file in your project root:
                  </p>
                  <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000`}
                  </pre>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium">Run Database Schema</p>
                  <p className="text-sm text-muted-foreground">
                    Copy the SQL from <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">supabase/schema.sql</code> and run it in Supabase SQL Editor
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <p className="font-medium">Restart Development Server</p>
                  <p className="text-sm text-muted-foreground">
                    Stop and restart your dev server: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">npm run dev</code>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Complete Documentation
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              For setup and deployment instructions, see:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">→</span>
                <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">README.md</code>
                <span className="text-muted-foreground">- Project documentation</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
            <a 
              href="https://supabase.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full gap-2">
                Go to Supabase
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
