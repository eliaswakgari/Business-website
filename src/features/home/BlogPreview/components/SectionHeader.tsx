import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function SectionHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
      <div>
        <p className="text-purple-400 font-medium mb-2">Latest Articles</p>
        <h2 className="text-3xl md:text-4xl font-bold">From Our Blog</h2>
      </div>
      <div className="mt-4 md:mt-0">
        <Link
          href="/blog"
          className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium group transition-colors"
        >
          View all articles
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
