import { Loader2 } from "lucide-react";

export default function AdminLoading() {
    return (
        <div className="flex h-full items-center justify-center p-8">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
                <p className="text-sm text-muted-foreground animate-pulse">Loading page...</p>
            </div>
        </div>
    );
}
