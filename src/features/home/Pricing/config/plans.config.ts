import type { PricingPlan } from "@/types";

export const plans: PricingPlan[] = [
    {
        name: "Viewer",
        price: "$0",
        description: "Perfect for personal blogs and portfolios",
        features: [
            "1 Editor",
            "Unlimited Viewers",
            "100 Published Posts",
            "Basic Analytics",
            "Community Support",
        ],
    },
    {
        name: "Pro",
        price: "$49",
        description: "Everything you need to grow your business",
        features: [
            "5 Editors",
            "Unlimited Published Posts",
            "Advanced Analytics",
            "Custom Domain",
            "Priority Support",
            "SEO Tools",
            "No 'ProCMS' Branding",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Advanced features for large organizations",
        features: [
            "Unlimited Editors",
            "Custom Roles & Permissions",
            "SSO Authentication",
            "Dedicated Success Manager",
            "99.9% Uptime SLA",
            "Audit Logs",
            "Bulk Content Import",
        ],
    },
];
