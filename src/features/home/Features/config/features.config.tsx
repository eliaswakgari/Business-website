import { FileText, Shield, Users, Database, BarChart3, Zap } from "lucide-react";
import type { ReactNode } from "react";

export interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
}

export const features: FeatureItem[] = [
  {
    title: "Content Management",
    description:
      "Manage posts, pages, services, and more with an intuitive CRUD interface and rich text editor.",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    title: "Role-Based Access",
    description:
      "Secure your content with granular permissions for Admin, Editor, and Viewer roles.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Team Collaboration",
    description: "Work seamlessly with your team members with real-time updates and activity logs.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Powerful Database",
    description: "Built on Supabase PostgreSQL with Row Level Security for enterprise-grade data protection.",
    icon: <Database className="h-6 w-6" />,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Track page views, popular content, and user activity with beautiful charts and metrics.",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    title: "Lightning Fast",
    description:
      "Optimized with Next.js ISR, edge functions, and smart caching for blazing fast performance.",
    icon: <Zap className="h-6 w-6" />,
  },
];
