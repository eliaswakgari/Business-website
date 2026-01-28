import { createClient } from "@/lib/supabase/server";
import { TeamCard } from "./components/TeamCard";
import ViewAllButton from "@/components/ui/ViewAllButton";

export default async function Team() {
    const supabase = await createClient();
    const { data: members } = await supabase
        .from('team_members')
        .select('*')
        .eq('status', 'active')
        .order('order_index', { ascending: true });

    if (!members || members.length === 0) {
        return null;
    }

    const mappedMembers = members.map((m: any) => ({
        name: m.name,
        role: m.role,
        bio: m.bio || '',
        avatar_url: m.avatar_url || '',
        linkedin_url: m.linkedin_url || '',
        twitter_url: m.twitter_url || ''
    }));

    // Show only first 4 members on homepage
    const displayedMembers = mappedMembers.slice(0, 4);
    const hasMore = members.length > 4;

    return (
        <section id="team" className="relative py-24 sm:py-32 bg-muted/30">
            <div className="container relative px-4 md:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                        Meet Our Team
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        The experts behind our success.
                    </p>
                </div>
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {displayedMembers.map((member: any, index: number) => (
                            <TeamCard key={index} member={member} />
                        ))}
                    </div>
                    {hasMore && <ViewAllButton href="/team" />}
                </div>
            </div>
        </section>
    );
}
