import { Header, Footer } from "@/layouts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { createClient } from "@/lib/supabase/server";
import { TeamCard } from "@/features/home/Team/components/TeamCard";
import { Users } from "lucide-react";

export default async function TeamPage() {
    const supabase = await createClient();
    const { data: members } = await supabase
        .from('team_members')
        .select('*')
        .eq('status', 'active')
        .order('order_index', { ascending: true });

    const mappedMembers = members?.map((m: any) => ({
        name: m.name,
        role: m.role,
        bio: m.bio || '',
        avatar_url: m.avatar_url || '',
        linkedin_url: m.linkedin_url || '',
        twitter_url: m.twitter_url || ''
    })) || [];

    return (
        <div className="flex flex-col bg-background text-foreground min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 sm:py-24 bg-gradient-to-b from-muted/50 to-background">
                    <div className="container px-4 md:px-8">
                        <Breadcrumb items={[{ label: "Team" }]} />

                        <div className="mx-auto max-w-3xl text-center">
                            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                                Meet Our Team
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The experts behind our success. Get to know the talented individuals who make it all possible.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team Grid */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="mx-auto max-w-7xl">
                            {mappedMembers.length > 0 ? (
                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                                    {mappedMembers.map((member: any, index: number) => (
                                        <TeamCard key={index} member={member} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">No team members found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 sm:p-12 border border-primary/20">
                            <h2 className="text-3xl font-bold mb-4">Want to Join Our Team?</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                We're always looking for talented individuals to join our growing team.
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
