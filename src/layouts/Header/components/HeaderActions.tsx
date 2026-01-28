import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldAlert, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface HeaderActionsProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
}

export default function HeaderActions({
  isMenuOpen,
  setIsMenuOpen,
}: HeaderActionsProps) {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setRole(profile?.role || null);
      }
      setLoading(false);
    };

    checkUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleClaimAdmin = async () => {
    if (!user) return;
    setUpdating(true);
    try {
      // Dynamically import the server action to avoid build issues if mixed
      const { fixAdminProfile } = await import("@/app/actions");
      const result = await fixAdminProfile();

      if (result.success) {
        setRole('admin');
        window.location.href = '/admin'; // Force hard navigation to ensure clean state
      } else {
        console.error("Failed to update role", result.error);
        alert("Failed to fix profile: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="hidden md:flex items-center gap-4"><div className="h-9 w-24 bg-muted animate-pulse rounded"></div></div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        {role === 'admin' ? (
          <Link href="/admin">
            <Button variant="outline" className="text-foreground">
              Dashboard
            </Button>
          </Link>
        ) : (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClaimAdmin}
            disabled={updating}
            className="animate-pulse"
          >
            {updating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShieldAlert className="h-4 w-4 mr-2" />}
            Claim Admin (Fix)
          </Button>
        )}

        <Button
          variant="ghost"
          onClick={async () => {
            await supabase.auth.signOut();
            router.refresh();
          }}
          className="text-muted-foreground hover:text-foreground"
        >
          Sign Out
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-1 rounded transition"
      >
        Log in
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-foreground"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
}
