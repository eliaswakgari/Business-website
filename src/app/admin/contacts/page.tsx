import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import { ContactSettings } from './components/ContactSettings';
import { ContactList } from './components/ContactList';

export default async function ContactsManagement() {
  const supabase = await createClient();

  const { data: contacts } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  const unreadCount = contacts?.filter(c => c.status === 'unread').length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
          <p className="text-muted-foreground mt-2">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <ContactSettings />

      <ContactList initialContacts={contacts || []} />
    </div>
  );
}
