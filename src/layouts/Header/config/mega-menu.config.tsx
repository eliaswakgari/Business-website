import {
  Laptop,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  FileText,
  Zap,
} from "lucide-react";
import type { MegaMenuData } from "@/types";

export const megaMenuConfig: Record<string, MegaMenuData> = {
  products: {
    title: "Features",
    columns: [
      {
        title: "Content Engine",
        items: [
          {
            icon: <FileText className="h-5 w-5" />,
            title: "Visual Editor",
            description: "Block-based rich text editing",
            href: "/features/editor",
          },
          {
            icon: <Users className="h-5 w-5" />,
            title: "Team Roles",
            description: "Granular access control",
            href: "/features/roles",
          },
          {
            icon: <BarChart3 className="h-5 w-5" />,
            title: "Analytics",
            description: "Content performance metrics",
            href: "/features/analytics",
          },
        ],
      },
      {
        title: "Platform",
        items: [
          {
            icon: <Zap className="h-5 w-5" />,
            title: "API First",
            description: "Headless CMS capabilities",
            href: "/features/api",
          },
          {
            icon: <Settings className="h-5 w-5" />,
            title: "Integrations",
            description: "Connect your favorite tools",
            href: "/features/integrations",
          },
          {
            icon: <Laptop className="h-5 w-5" />,
            title: "Asset Manager",
            description: "Organize media files",
            href: "/features/assets",
          },
        ],
      },
    ],
    featured: {
      title: "New: AI Assistant",
      description: "Auto-generate content and SEO metadata with our new AI tools.",
      ctaText: "Try AI Features",
      ctaLink: "/features/ai",
      imageSrc: "/images/dashboard.png",
    },
  },
  resources: {
    title: "Resources",
    columns: [
      {
        title: "Learn",
        items: [
          {
            icon: <FileText className="h-5 w-5" />,
            title: "Documentation",
            description: "Technical guides and API refs",
            href: "/docs",
          },
          {
            icon: <HelpCircle className="h-5 w-5" />,
            title: "University",
            description: "Video courses and certifications",
            href: "/university",
          },
          {
            icon: <Users className="h-5 w-5" />,
            title: "Community",
            description: "Join 10k+ developers",
            href: "/community",
          },
        ],
      },
      {
        title: "Use Cases",
        items: [
          {
            icon: <Laptop className="h-5 w-5" />,
            title: "Enterprise",
            description: "For large organizations",
            href: "/enterprise",
          },
          {
            icon: <Zap className="h-5 w-5" />,
            title: "Startups",
            description: "Scale your business fast",
            href: "/startups",
          },
          {
            icon: <FileText className="h-5 w-5" />,
            title: "Agencies",
            description: "Manage client websites",
            href: "/agencies",
          },
        ],
      },
    ],
    featured: {
      title: "Case Study",
      description: "How TechCorp scaled their content operations by 300%",
      ctaText: "Read Story",
      ctaLink: "/case-studies/techcorp",
      imageSrc: "/images/webinar.png",
    },
  },
};
