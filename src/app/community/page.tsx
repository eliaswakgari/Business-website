import { Header, Footer } from "@/layouts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Users, MessageCircle, Calendar, Github, Twitter, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
    const communityChannels = [
        {
            icon: <MessageCircle className="h-6 w-6" />,
            title: "Discord Server",
            description: "Join 10k+ developers in real-time discussions",
            members: "10,234",
            link: "#discord"
        },
        {
            icon: <Github className="h-6 w-6" />,
            title: "GitHub Discussions",
            description: "Ask questions and share solutions",
            members: "5,678",
            link: "#github"
        },
        {
            icon: <Twitter className="h-6 w-6" />,
            title: "Twitter Community",
            description: "Follow updates and connect with peers",
            members: "8,901",
            link: "#twitter"
        },
        {
            icon: <Youtube className="h-6 w-6" />,
            title: "YouTube Channel",
            description: "Watch tutorials and community highlights",
            members: "3,456",
            link: "#youtube"
        }
    ];

    const upcomingEvents = [
        {
            date: "Feb 15",
            title: "Monthly Community Call",
            time: "2:00 PM EST",
            attendees: "234"
        },
        {
            date: "Feb 22",
            title: "Advanced API Workshop",
            time: "10:00 AM EST",
            attendees: "156"
        },
        {
            date: "Mar 1",
            title: "Community Hackathon",
            time: "All Day",
            attendees: "489"
        }
    ];

    const featuredMembers = [
        {
            name: "Sarah Chen",
            role: "Community Leader",
            contributions: "500+ answers",
            avatar: "SC"
        },
        {
            name: "Alex Kumar",
            role: "Top Contributor",
            contributions: "350+ answers",
            avatar: "AK"
        },
        {
            name: "Maria Garcia",
            role: "Tutorial Creator",
            contributions: "50+ tutorials",
            avatar: "MG"
        },
        {
            name: "James Wilson",
            role: "Plugin Developer",
            contributions: "25+ plugins",
            avatar: "JW"
        }
    ];

    return (
        <div className="flex flex-col bg-background text-foreground min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 sm:py-24 bg-gradient-to-b from-muted/50 to-background">
                    <div className="container px-4 md:px-8">
                        <Breadcrumb items={[{ label: "Resources" }, { label: "Community" }]} />

                        <div className="mx-auto max-w-3xl text-center">
                            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                                Join Our Community
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                Connect with 10,000+ developers, share knowledge, and grow together.
                            </p>
                            <Link
                                href="#join"
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 border-y bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">10k+</div>
                                <div className="text-sm text-muted-foreground">Active Members</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">50k+</div>
                                <div className="text-sm text-muted-foreground">Discussions</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                                <div className="text-sm text-muted-foreground">Events/Year</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                                <div className="text-sm text-muted-foreground">Support</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Community Channels */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl font-bold mb-12 text-center">Connect With Us</h2>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {communityChannels.map((channel, index) => (
                                    <Link
                                        key={index}
                                        href={channel.link}
                                        className="group bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                                            {channel.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{channel.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">{channel.description}</p>
                                        <div className="text-xs text-muted-foreground">
                                            {channel.members} members
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl font-bold">Upcoming Events</h2>
                                <Link
                                    href="#all-events"
                                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                >
                                    View All →
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {upcomingEvents.map((event, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            <div className="flex-shrink-0 text-center sm:text-left">
                                                <div className="inline-flex flex-col items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                                                    <div className="text-xs font-medium text-muted-foreground">
                                                        {event.date.split(' ')[0]}
                                                    </div>
                                                    <div className="text-xl font-bold">{event.date.split(' ')[1]}</div>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {event.time}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        {event.attendees} attending
                                                    </span>
                                                </div>
                                            </div>
                                            <Link
                                                href="#register"
                                                className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Members */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl font-bold mb-12 text-center">Featured Community Members</h2>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {featuredMembers.map((member, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-lg font-semibold">
                                            {member.avatar}
                                        </div>
                                        <h3 className="font-semibold mb-1">{member.name}</h3>
                                        <div className="text-sm text-muted-foreground mb-2">{member.role}</div>
                                        <div className="text-xs text-primary">{member.contributions}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 sm:p-12 border border-primary/20">
                            <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Become part of our thriving community and accelerate your growth.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="#discord"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Join Discord
                                </Link>
                                <Link
                                    href="#github"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors font-medium"
                                >
                                    GitHub Discussions
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
