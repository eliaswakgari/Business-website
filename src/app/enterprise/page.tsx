import { Header, Footer } from "@/layouts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Building2, Shield, Zap, Users, Lock, BarChart3, Headphones, Globe } from "lucide-react";
import Link from "next/link";

export default function EnterprisePage() {
    const features = [
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Enterprise Security",
            description: "SOC 2, GDPR, and HIPAA compliant with advanced security features"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Unlimited Team Members",
            description: "Add unlimited users with granular role-based access control"
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "99.99% Uptime SLA",
            description: "Mission-critical reliability with guaranteed uptime"
        },
        {
            icon: <Lock className="h-6 w-6" />,
            title: "SSO & SAML",
            description: "Seamless integration with your identity provider"
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "Advanced Analytics",
            description: "Deep insights into content performance and team productivity"
        },
        {
            icon: <Headphones className="h-6 w-6" />,
            title: "Dedicated Support",
            description: "24/7 priority support with dedicated account manager"
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: "Multi-Region Hosting",
            description: "Deploy content closer to your global audience"
        },
        {
            icon: <Building2 className="h-6 w-6" />,
            title: "Custom SLA",
            description: "Tailored service level agreements for your organization"
        }
    ];

    const caseStudies = [
        {
            company: "TechCorp Global",
            industry: "Technology",
            result: "300% increase in content velocity",
            logo: "TC"
        },
        {
            company: "FinanceHub",
            industry: "Financial Services",
            result: "50% reduction in time-to-market",
            logo: "FH"
        },
        {
            company: "HealthCare Plus",
            industry: "Healthcare",
            result: "100% compliance maintained",
            logo: "HC"
        }
    ];

    const complianceBadges = [
        "SOC 2 Type II",
        "GDPR",
        "HIPAA",
        "ISO 27001",
        "CCPA",
        "PCI DSS"
    ];

    return (
        <div className="flex flex-col bg-background text-foreground min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 sm:py-24 bg-gradient-to-b from-muted/50 to-background">
                    <div className="container px-4 md:px-8">
                        <Breadcrumb items={[{ label: "Resources" }, { label: "Enterprise" }]} />

                        <div className="mx-auto max-w-3xl text-center">
                            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
                                <Building2 className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                                Enterprise Solutions
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                Powerful content management for large organizations with enterprise-grade security, scalability, and support.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="#contact-sales"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                                >
                                    Contact Sales
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

                {/* Compliance Badges */}
                <section className="py-12 border-y bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-5xl mx-auto">
                            <p className="text-center text-sm text-muted-foreground mb-6">Trusted for compliance and security</p>
                            <div className="flex flex-wrap justify-center gap-6">
                                {complianceBadges.map((badge, index) => (
                                    <div
                                        key={index}
                                        className="px-6 py-3 bg-card border border-border rounded-lg text-sm font-medium"
                                    >
                                        {badge}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enterprise Features */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Features</h2>
                                <p className="text-lg text-muted-foreground">
                                    Everything you need to manage content at scale
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

                {/* Case Studies */}
                <section className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Trusted by Leading Enterprises</h2>
                                <p className="text-lg text-muted-foreground">
                                    See how organizations like yours achieve success
                                </p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                                {caseStudies.map((study, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 text-xl font-bold">
                                            {study.logo}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{study.company}</h3>
                                        <div className="text-sm text-muted-foreground mb-4">{study.industry}</div>
                                        <div className="text-primary font-medium">{study.result}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Link
                                    href="/case-studies"
                                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                                >
                                    View All Case Studies →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing CTA */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 sm:p-12 border border-primary/20">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4">Custom Enterprise Pricing</h2>
                                    <p className="text-lg text-muted-foreground mb-6">
                                        Get a tailored solution that fits your organization's needs and budget.
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            Volume-based pricing
                                        </li>
                                        <li className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            Flexible payment terms
                                        </li>
                                        <li className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            Custom SLA agreements
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-card border border-border rounded-lg p-8">
                                    <h3 className="text-xl font-semibold mb-4">Contact Sales</h3>
                                    <form className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Work Email"
                                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                        >
                                            Get Custom Quote
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
