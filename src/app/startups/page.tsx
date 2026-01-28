import { Header, Footer } from "@/layouts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Rocket, DollarSign, Zap, TrendingUp, Users, Code, Sparkles, Award } from "lucide-react";
import Link from "next/link";

export default function StartupsPage() {
    const benefits = [
        {
            icon: <DollarSign className="h-6 w-6" />,
            title: "Special Startup Pricing",
            description: "Up to 50% off for qualifying startups in first year"
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Fast Implementation",
            description: "Go live in days, not months with our quick-start templates"
        },
        {
            icon: <Code className="h-6 w-6" />,
            title: "Developer-Friendly",
            description: "Modern APIs and SDKs for rapid development"
        },
        {
            icon: <TrendingUp className="h-6 w-6" />,
            title: "Scale as You Grow",
            description: "Start small and scale seamlessly as your business grows"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Startup Community",
            description: "Connect with other founders and share experiences"
        },
        {
            icon: <Sparkles className="h-6 w-6" />,
            title: "Latest Features First",
            description: "Early access to new features and beta programs"
        }
    ];

    const successStories = [
        {
            name: "TaskFlow",
            industry: "Productivity",
            growth: "0 to 100k users in 6 months",
            funding: "Series A",
            logo: "TF"
        },
        {
            name: "ShopNow",
            industry: "E-commerce",
            growth: "10x revenue growth",
            funding: "Seed",
            logo: "SN"
        },
        {
            name: "LearnHub",
            industry: "EdTech",
            growth: "50k+ active learners",
            funding: "Series B",
            logo: "LH"
        }
    ];

    const requirements = [
        "Founded within the last 3 years",
        "Raised less than $5M in funding",
        "Less than 50 employees",
        "First-time using our platform"
    ];

    return (
        <div className="flex flex-col bg-background text-foreground min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 sm:py-24 bg-gradient-to-b from-muted/50 to-background">
                    <div className="container px-4 md:px-8">
                        <Breadcrumb items={[{ label: "Resources" }, { label: "Startups" }]} />

                        <div className="mx-auto max-w-3xl text-center">
                            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
                                <Rocket className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                                Built for Startups
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                Scale your business fast with powerful content management. Special pricing and support for early-stage companies.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="#apply"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                                >
                                    Apply for Program
                                </Link>
                                <Link
                                    href="#learn-more"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors font-medium text-lg"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Special Offer Banner */}
                <section className="py-8 bg-primary/10 border-y border-primary/20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 text-primary font-semibold mb-2">
                                <Sparkles className="h-5 w-5" />
                                Limited Time Offer
                            </div>
                            <p className="text-lg">
                                <span className="font-bold">50% off</span> for the first year + <span className="font-bold">$500 in credits</span> for qualifying startups
                            </p>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Why Startups Choose Us</h2>
                                <p className="text-lg text-muted-foreground">
                                    Everything you need to move fast and scale
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-4">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Success Stories */}
                <section className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Startup Success Stories</h2>
                                <p className="text-lg text-muted-foreground">
                                    Join hundreds of startups scaling with our platform
                                </p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                                {successStories.map((story, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 text-xl font-bold">
                                            {story.logo}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{story.name}</h3>
                                        <div className="text-sm text-muted-foreground mb-4">{story.industry}</div>
                                        <div className="space-y-2 mb-4">
                                            <div className="text-sm">
                                                <span className="text-muted-foreground">Growth:</span>{" "}
                                                <span className="font-medium text-primary">{story.growth}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="text-muted-foreground">Stage:</span>{" "}
                                                <span className="font-medium">{story.funding}</span>
                                            </div>
                                        </div>
                                        <Link
                                            href="/case-studies"
                                            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                                        >
                                            Read Story →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Eligibility & Application */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Eligibility */}
                                <div>
                                    <div className="inline-flex items-center gap-2 mb-6">
                                        <Award className="h-6 w-6 text-primary" />
                                        <h2 className="text-2xl font-bold">Eligibility Requirements</h2>
                                    </div>
                                    <p className="text-muted-foreground mb-6">
                                        To qualify for our startup program, your company should meet the following criteria:
                                    </p>
                                    <ul className="space-y-4">
                                        {requirements.map((req, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                </div>
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Application Form */}
                                <div className="bg-card border border-border rounded-lg p-8">
                                    <h3 className="text-xl font-semibold mb-6">Apply Now</h3>
                                    <form className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Startup Name"
                                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="url"
                                                placeholder="Website URL"
                                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="Founder Email"
                                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </div>
                                        <div>
                                            <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                                                <option>Funding Stage</option>
                                                <option>Pre-seed</option>
                                                <option>Seed</option>
                                                <option>Series A</option>
                                                <option>Series B</option>
                                            </select>
                                        </div>
                                        <div>
                                            <textarea
                                                placeholder="Tell us about your startup..."
                                                rows={4}
                                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                        >
                                            Submit Application
                                        </button>
                                        <p className="text-xs text-muted-foreground text-center">
                                            We'll review your application within 2 business days
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Start Guide */}
                <section className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 sm:p-12 border border-primary/20">
                            <h2 className="text-3xl font-bold mb-4">Get Started in Minutes</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Once approved, you'll get instant access to our platform with pre-configured templates and onboarding support.
                            </p>
                            <Link
                                href="/docs"
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                            >
                                View Quick Start Guide
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
