import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("flex items-center gap-2 text-sm text-muted-foreground mb-8", className)}
        >
            <Link
                href="/"
                className="hover:text-foreground transition-colors flex items-center gap-1"
                aria-label="Home"
            >
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4" />
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={cn(
                                    isLast && "text-foreground font-medium"
                                )}
                                aria-current={isLast ? "page" : undefined}
                            >
                                {item.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
