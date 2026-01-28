import { Header, Footer } from "@/layouts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { FileText, BookOpen, Code, Zap, Search, Github } from "lucide-react";
import Link from "next/link";

export default function DocumentationPage() {
    const quickStartItems = [
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Quick Start",
            description: "Get up and running in 5 minutes",
            href: "#quick-start"
        },
        {
            icon: <Code className="h-6 w-6" />,
            title: "API Reference",
            description: "Complete API documentation",
            href: "#api-reference"
        },
        {
            icon: <BookOpen className="h-6 w-6" />,
            title: "Guides",
            description: "Step-by-step tutorials",
            href: "#guides"
        },
        {
            icon: <Github className="h-6 w-6" />,
            title: "GitHub",
            description: "View source code and examples",
            href: "https://github.com"
        }
    ];

    const sections = [
        {
            title: "Getting Started",
            items: [
                { title: "Installation", href: "#installation" },
                { title: "Configuration", href: "#configuration" },
                { title: "Your First Project", href: "#first-project" },
                { title: "Authentication Setup", href: "#auth-setup" }
            ]
        },
        {
            title: "Core Concepts",
            items: [
                { title: "Content Models", href: "#content-models" },
                { title: "API Architecture", href: "#api-architecture" },
                { title: "User Permissions", href: "#permissions" },
                { title: "Webhooks", href: "#webhooks" }
            ]
        },
        {
            title: "Advanced Topics",
            items: [
                { title: "Custom Plugins", href: "#plugins" },
                { title: "Performance Optimization", href: "#performance" },
                { title: "Security Best Practices", href: "#security" },
                { title: "Deployment Strategies", href: "#deployment" }
            ]
        }
    ];

    return (
        <div className="flex flex-col bg-background text-foreground min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 sm:py-24 bg-gradient-to-b from-muted/50 to-background">
                    <div className="container px-4 md:px-8">
                        <Breadcrumb items={[{ label: "Resources" }, { label: "Documentation" }]} />

                        <div className="mx-auto max-w-3xl text-center">
                            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4 sm:mb-6">
                                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
                                Documentation
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                                Technical guides and API references to help you build amazing content experiences.
                            </p>

                            {/* Search Bar */}
                            <div className="relative max-w-2xl mx-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Start Cards */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                            {quickStartItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="group p-4 sm:p-6 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 min-h-[120px] flex flex-col"
                                >
                                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Documentation Sections */}
                <section className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Browse Documentation</h2>

                            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {sections.map((section, index) => (
                                    <div key={index} className="bg-card border border-border rounded-lg p-4 sm:p-6">
                                        <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                                        <ul className="space-y-3">
                                            {section.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    <Link
                                                        href={item.href}
                                                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border border-primary/20">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Help?</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Can't find what you're looking for? Our support team is here to help.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base min-h-[44px]"
                                >
                                    Contact Support
                                </Link>
                                <Link
                                    href="/community"
                                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors font-medium text-sm sm:text-base min-h-[44px]"
                                >
                                    Join Community
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
