import { Link, useRouterState } from "@tanstack/react-router";
import { GraduationCap, House, Mail, Sparkles, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/", label: "Home", icon: House },
  { to: "/shop", label: "Shop", icon: Store },
  { to: "/classes", label: "Classes", icon: GraduationCap },
  { to: "/custom", label: "Custom", icon: Sparkles },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map((item) => {
          const active =
            item.to === "/"
              ? pathname === "/"
              : pathname === item.to || pathname.startsWith(`${item.to}/`);
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-0.5 text-[0.65rem] tracking-wide transition-colors",
                  active ? "text-gold" : "text-muted",
                )}
              >
                <Icon className="size-5" strokeWidth={1.6} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
