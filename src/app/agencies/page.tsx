import { Header, Footer } from "@/layouts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Briefcase, Users, Palette, Zap, Shield, DollarSign, Award, Globe } from "lucide-react";
import Link from "next/link";

export default function AgenciesPage() {
    const features = [
        {
            icon: <Users className="h-6 w-6" />,
            title: "Multi-Client Management",
            description: "Manage unlimited client websites from a single dashboard"
        },
        {
            icon: <Palette className="h-6 w-6" />,
            title: "White-Label Solution",
            description: "Brand the platform as your own with custom domains and logos"
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Client Permissions",
            description: "Granular access control for each client and team member"
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Rapid Deployment",
            description: "Launch client sites in hours with pre-built templates"
        },
        {
            icon: <DollarSign className="h-6 w-6" />,
            title: "Agency Pricing",
            description: "Volume discounts and flexible billing for agencies"
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: "Multi-Site Management",
            description: "Centralized control across all client properties"
        }
    ];

    const partnerBenefits = [
        {
            title: "Revenue Share",
            description: "Earn recurring revenue from client referrals",
            icon: <DollarSign className="h-5 w-5" />
        },
        {
            title: "Priority Support",
            description: "Dedicated agency success manager",
            icon: <Briefcase className="h-5 w-5" />
        },
        {
            title: "Co-Marketing",
            description: "Featured in our agency directory",
            icon: <Award className="h-5 w-5" />
        },
        {
            title: "Training & Resources",
            description: "Exclusive agency training materials",
            icon: <Users className="h-5 w-5" />
        }
    ];

    const agencyShowcase = [
        {
            name: "Digital Dynamics",
            specialty: "E-commerce",
            clients: "50+",
            logo: "DD"
        },
        {
            name: "Creative Studio",
            specialty: "Brand & Design",
            clients: "35+",
            logo: "CS"
        },
        {
            name: "Growth Partners",
            specialty: "Marketing",
            clients: "60+",
            logo: "GP"
        }
    ];

    return (
        <div className="flex flex-col bg-background text-foreground min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 sm:py-24 bg-gradient-to-b from-muted/50 to-background">
                    <div className="container px-4 md:px-8">
                        <Breadcrumb items={[{ label: "Resources" }, { label: "Agencies" }]} />

                        <div className="mx-auto max-w-3xl text-center">
                            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
                                <Briefcase className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                                Built for Agencies
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                Manage client websites at scale with powerful multi-site management, white-label options, and agency-specific features.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="#partner-program"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                                >
                                    Become a Partner
                                </Link>
                                <Link
                                    href="#demo"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors font-medium text-lg"
                                >
                                    Request Demo
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 border-y bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                                <div className="text-sm text-muted-foreground">Agency Partners</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">10k+</div>
                                <div className="text-sm text-muted-foreground">Client Sites</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">30%</div>
                                <div className="text-sm text-muted-foreground">Revenue Share</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                                <div className="text-sm text-muted-foreground">Support</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Agency Features */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Agency-Specific Features</h2>
                                <p className="text-lg text-muted-foreground">
                                    Everything you need to scale your agency
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-4">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partner Program */}
                <section id="partner-program" className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Agency Partner Program</h2>
                                <p className="text-lg text-muted-foreground">
                                    Join our partner program and grow your revenue
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {partnerBenefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Agency Showcase */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Featured Agency Partners</h2>
                                <p className="text-lg text-muted-foreground">
                                    Successful agencies building with our platform
                                </p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                                {agencyShowcase.map((agency, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 text-xl font-bold">
                                            {agency.logo}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{agency.name}</h3>
                                        <div className="text-sm text-muted-foreground mb-4">{agency.specialty}</div>
                                        <div className="text-primary font-medium">{agency.clients} clients managed</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Application Form */}
                <section className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 sm:p-12 border border-primary/20">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4">Join Our Partner Network</h2>
                                    <p className="text-lg text-muted-foreground mb-6">
                                        Apply to become an agency partner and unlock exclusive benefits, revenue sharing, and priority support.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            30% recurring revenue share
                                        </li>
                                        <li className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            Dedicated success manager
                                        </li>
                                        <li className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            Co-marketing opportunities
                                        </li>
                                        <li className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            Exclusive training & resources
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-card border border-border rounded-lg p-8">
                                    <h3 className="text-xl font-semibold mb-4">Partner Application</h3>
                                    <form className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Agency Name"
                                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <input
                                            type="url"
                                            placeholder="Website URL"
                                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Contact Email"
                                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Number of Clients"
                                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                        >
                                            Apply Now
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
