import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthLayout,
});

function AuthLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition hover:bg-accent"
            aria-label="Menu"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
