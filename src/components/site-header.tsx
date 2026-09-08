import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { FamilyHeaderLinks } from "@/components/family-links";
import { cartCount, useCart } from "@/lib/cart";
import { useShop } from "@/lib/shop-store";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const lines = useCart((s) => s.lines);
  const hydrated = useCart((s) => s.hydrated);
  const openCart = useCart((s) => s.openCart);
  const isAdmin = useShop((s) => s.isAdmin);
  const signOut = useShop((s) => s.signOut);
  const count = hydrated ? cartCount(lines) : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !isHome || scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-250",
        solid
          ? "bg-background shadow-[0_1px_0_0_rgb(212_175_55/0.18)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <BrandMark size="sm" className="shrink-0 text-lg sm:text-xl" />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors duration-150",
                  active ? "text-gold" : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {isAdmin ? (
            <button
              type="button"
              onClick={() => void signOut()}
              className="hidden h-9 items-center rounded-full px-3 text-[0.65rem] uppercase tracking-[0.16em] text-gold shadow-[0_0_0_1px_rgb(212_175_55/0.35)] sm:inline-flex"
            >
              Sign out
            </button>
          ) : null}
          <FamilyHeaderLinks />
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex size-11 items-center justify-center text-foreground transition-colors hover:text-gold"
            aria-label={count ? `Open bag, ${count} items` : "Open bag"}
          >
            <ShoppingBag className="size-5" strokeWidth={1.6} />
            {count > 0 ? (
              <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-gold text-[0.6rem] font-medium text-gold-fg tabular-nums">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}
