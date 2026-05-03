import { createFileRoute, Outlet, Navigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { User, LogOut } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthLayout,
});

function AuthLayout() {
  const { session, loading, signOut, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background" />;
  }
  if (!session) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/members" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/40">
              <span className="text-base font-black text-primary">M</span>
            </div>
            <span className="text-lg font-bold tracking-tight">Members</span>
          </Link>
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition hover:bg-accent"
              aria-label="Menu do usuário"
            >
              <User className="h-5 w-5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
                <div className="border-b border-border px-4 py-3">
                  <p className="truncate text-sm font-medium">{user?.email}</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-foreground transition hover:bg-accent"
                >
                  <LogOut className="h-4 w-4" /> Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
