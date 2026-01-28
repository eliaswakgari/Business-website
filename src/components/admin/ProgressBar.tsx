"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // When the path or search params change, we consider the navigation "finished"
        setLoading(false);
    }, [pathname, searchParams]);

    // We can't easily hook into the START of navigation in Next.js App Router 
    // without a custom router or listening to click events.
    // We'll expose a way to trigger it manually via a global event or similar if needed,
    // but for now, we'll let it show when pages are transitioning.

    return (
        <div
            className={`fixed top-0 left-0 right-0 h-1 bg-primary z-[9999] transition-all duration-500 ease-out ${loading ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                }`}
            style={{ transformOrigin: "left" }}
        />
    );
}
