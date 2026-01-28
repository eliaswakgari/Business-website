export const siteConfig = {
    name: "BusinessCMS",
    description: "Professional Content Management System for Modern Businesses",
    url: "https://businesscms.com",
    ogImage: "/image.png",
    links: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
        github: "#",
    },
    creator: "Mohamed Djoudir",
}

export const navigationConfig = {
    mainNav: [
        { title: "Features", href: "#features" },
        { title: "Pricing", href: "#pricing" },
        { title: "Testimonials", href: "#testimonials" },
        { title: "FAQ", href: "#faq" },
    ],
}

export const pricingConfig = {
    plans: [
        {
            name: "Starter",
            price: "$49",
            description: "Perfect for small businesses and startups",
            features: ["Up to 10 Users", "50GB Storage", "Basic Analytics", "Email Support", "Mobile App Access"],
        },
        {
            name: "Professional",
            price: "$99",
            description: "Ideal for growing businesses",
            features: [
                "Up to 50 Users",
                "200GB Storage",
                "Advanced Analytics & Reports",
                "Priority Support",
                "API Access",
                "Custom Integrations",
                "Advanced Security",
                "Team Collaboration Tools",
            ],
            popular: true,
        },
        {
            name: "Enterprise",
            price: "$249",
            description: "For large organizations with complex needs",
            features: [
                "Unlimited Users",
                "Unlimited Storage",
                "Enterprise Analytics",
                "24/7 Dedicated Support",
                "Advanced Security & Compliance",
                "Custom Development",
                "Onboarding & Training",
                "SLA Guarantee",
                "White Label Options",
            ],
        },
    ],
}

export const comparisonConfig = {
    features: [
        { name: "Core CMS Features", basic: true, pro: true, enterprise: true },
        { name: "Content Versioning", basic: true, pro: true, enterprise: true },
        { name: "Multi-language Support", basic: false, pro: true, enterprise: true },
        { name: "API Access", basic: false, pro: true, enterprise: true },
        { name: "Advanced Analytics", basic: false, pro: true, enterprise: true },
        { name: "Custom Workflows", basic: false, pro: true, enterprise: true },
        { name: "White Label", basic: false, pro: false, enterprise: true },
        { name: "Dedicated Support", basic: false, pro: false, enterprise: true },
        { name: "SLA Guarantee", basic: false, pro: false, enterprise: true },
        { name: "Custom Development", basic: false, pro: false, enterprise: true },
    ],
}
