'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import { Mail, MailOpen, User, Building, Phone, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { createClient } from '@/lib/supabase/client';

interface ContactListProps {
    initialContacts: any[];
}

export function ContactList({ initialContacts }: ContactListProps) {
    const [contacts, setContacts] = useState(initialContacts);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const supabase = createClient();

    const handleRowClick = async (contact: any) => {
        setSelectedContact(contact);
        setIsDialogOpen(true);

        if (contact.status === 'unread') {
            const { error } = await supabase
                .from('contacts')
                .update({ status: 'read' })
                .eq('id', contact.id);

            if (!error) {
                setContacts(contacts.map(c =>
                    c.id === contact.id ? { ...c, status: 'read' } : c
                ));
            }
        }
    };

    return (
        <>
            <div className="border rounded-lg bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Status</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Labels</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts && contacts.length > 0 ? (
                            contacts.map((contact) => (
                                <TableRow
                                    key={contact.id}
                                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${contact.status === 'unread' ? 'bg-primary/5 font-medium' : ''}`}
                                    onClick={() => handleRowClick(contact)}
                                >
                                    <TableCell>
                                        {contact.status === 'unread' ? (
                                            <Mail className="h-4 w-4 text-primary" />
                                        ) : (
                                            <MailOpen className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </TableCell>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.company || '-'}</TableCell>
                                    <TableCell className="max-w-[200px] truncate text-muted-foreground">
                                        {contact.message}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {format(new Date(contact.created_at), 'MMM d, yyyy')}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={
                                            contact.status === 'unread' ? 'default' :
                                                contact.status === 'replied' ? 'secondary' : 'outline'
                                        }>
                                            {contact.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <Mail className="h-8 w-8 opacity-20" />
                                        <p>No contact messages yet.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <div className="flex items-center justify-between mb-4">
                            <Badge variant={selectedContact?.status === 'unread' ? 'default' : 'outline'}>
                                {selectedContact?.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {selectedContact && format(new Date(selectedContact.created_at), 'MMMM d, yyyy HH:mm')}
                            </span>
                        </div>
                        <DialogTitle className="text-2xl font-bold">Message Details</DialogTitle>
                        <DialogDescription>
                            Full information about the contact request from {selectedContact?.name}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                    <User className="h-3 w-3" /> SENDER NAME
                                </p>
                                <p className="font-semibold">{selectedContact?.name}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                    <Mail className="h-3 w-3" /> EMAIL ADDRESS
                                </p>
                                <p className="font-semibold">{selectedContact?.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                    <Building className="h-3 w-3" /> COMPANY
                                </p>
                                <p className="font-semibold">{selectedContact?.company || 'N/A'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                    <Phone className="h-3 w-3" /> PHONE NUMBER
                                </p>
                                <p className="font-semibold">{selectedContact?.phone || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="space-y-2 border-t pt-4">
                            <p className="text-xs font-medium text-muted-foreground">MESSAGE</p>
                            <div className="bg-muted/30 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap min-h-[100px]">
                                {selectedContact?.message}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Close
                        </Button>
                        <a href={`mailto:${selectedContact?.email}`}>
                            <Button className="btn-premium">
                                Reply via Email
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </a>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
