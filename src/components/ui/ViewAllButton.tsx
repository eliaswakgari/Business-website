import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewAllButtonProps {
    href: string;
    text?: string;
    className?: string;
}

export default function ViewAllButton({
    href,
    text = "View All",
    className
}: ViewAllButtonProps) {
    return (
        <div className={cn("flex justify-center mt-12", className)}>
            <Link
                href={href}
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary hover:text-primary/80 transition-all duration-300 border border-primary/20 rounded-full hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
                {text}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
        </div>
    );
}
