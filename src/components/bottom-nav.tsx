import { Link, useRouterState } from "@tanstack/react-router";
import { Gem, GraduationCap, House, Landmark, Mail, Sparkles, Store, type LucideIcon } from "lucide-react";
import { FAMILY } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavItem =
  | { to: string; label: string; icon: LucideIcon }
  | { href: string; label: string; icon: LucideIcon; external: true; ariaLabel: string };

const ITEMS: NavItem[] = [
  { to: "/", label: "Home", icon: House },
  { to: "/shop", label: "Shop", icon: Store },
  { to: "/classes", label: "Classes", icon: GraduationCap },
  { to: "/custom", label: "Custom", icon: Sparkles },
  { to: "/contact", label: "Contact", icon: Mail },
  {
    href: FAMILY.sparkle.href,
    label: "Sparkle",
    icon: Gem,
    external: true,
    ariaLabel: "True Sparkle diamond painting kits",
  },
  {
    href: FAMILY.parent.href,
    label: "Parent",
    icon: Landmark,
    external: true,
    ariaLabel: `Back to ${FAMILY.parent.name}`,
  },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-7">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const className = cn(
            "flex h-14 flex-col items-center justify-center gap-0.5 px-0.5 text-center text-[0.6rem] tracking-wide transition-colors",
          );
          if ("external" in item) {
            return (
              <li key={item.href}>
                <a href={item.href} rel="noopener" aria-label={item.ariaLabel} className={cn(className, "text-muted")}>
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                  {item.label}
                </a>
              </li>
            );
          }
          const active =
            item.to === "/"
              ? pathname === "/"
              : pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <li key={item.to}>
              <Link to={item.to} className={cn(className, active ? "text-gold" : "text-muted")}>
                <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
