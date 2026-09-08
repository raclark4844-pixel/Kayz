import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES, productsByCategory } from "@/lib/catalog";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

type ShopSearch = { cat?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    cat: typeof search.cat === "string" ? search.cat : undefined,
  }),
  component: ShopPage,
});

function ShopPage() {
  const { cat } = Route.useSearch();
  const catalog = useShop((s) => s.products);
  const isAdmin = useShop((s) => s.isAdmin);
  const openAdd = useShop((s) => s.openAdd);
  const signOut = useShop((s) => s.signOut);
  const active = cat && CATEGORIES.some((c) => c.id === cat) ? cat : "all";
  const products = productsByCategory(active, catalog);

  return (
    <main className="pb-nav">
      <PageIntro kicker="The shop" title="Handmade, ready to gift">
        Tumblers, candles, charms, earrings, junk cases, and diamond art —
        the same pieces from Kay’s table, ready to add to your bag.
      </PageIntro>
      {isAdmin ? (
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 pt-2 sm:px-6">
          <Button type="button" onClick={openAdd}>
            <Plus className="size-4" />
            Add a piece
          </Button>
          <Button
            type="button"
            variant="outline"
            className="sm:hidden"
            onClick={() => void signOut()}
          >
            Sign out
          </Button>
        </div>
      ) : null}
      <div className="sticky top-16 z-20 border-y border-line bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
          <FilterChip to="/shop" search={{ cat: undefined }} active={active === "all"}>
            All
          </FilterChip>
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c.id}
              to="/shop"
              search={{ cat: c.id }}
              active={active === c.id}
            >
              {c.label}
            </FilterChip>
          ))}
        </div>
      </div>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {products.length === 0 ? (
          <p className="py-16 text-center text-muted">Nothing in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function FilterChip({
  children,
  active,
  to,
  search,
}: {
  children: string;
  active: boolean;
  to: "/shop";
  search: ShopSearch;
}) {
  return (
    <Link
      to={to}
      search={search}
      className={cn(
        "inline-flex h-10 shrink-0 items-center rounded-full px-4 text-xs uppercase tracking-[0.16em] transition-colors",
        active
          ? "bg-gold text-gold-fg"
          : "text-muted shadow-[0_0_0_1px_rgb(255_255_255/0.12)] hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
