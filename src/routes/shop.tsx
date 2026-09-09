import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ProductCard } from "@/components/product-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { CATEGORIES, productsByCategory } from "@/lib/catalog";
import { SPARKLE_URL, pageHead } from "@/lib/seo";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/shop")({
  head: () =>
    pageHead({
      title: "Shop Handmade Gifts | KayzCharmzz Cleveland",
      description:
        "Shop handmade tumblers, soy candles, junk phone cases, charm jewelry, and beaded pens from KayzCharmzz in Cleveland. Custom is part of the shop.",
      path: "/shop",
    }),
  component: ShopPage,
});

function ShopPage() {
  const catalog = useShop((s) => s.products);
  const isAdmin = useShop((s) => s.isAdmin);
  const openAdd = useShop((s) => s.openAdd);
  const signOut = useShop((s) => s.signOut);
  const products = productsByCategory("all", catalog);

  return (
    <main className="pb-nav">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]}
        />
      </div>
      <PageIntro kicker="The shop" title="Handmade, ready to gift">
        Tumblers, candles, junk cases, jewelry, and pens from Kay’s table. Original
        diamond painting kits are at{" "}
        <a href={SPARKLE_URL} className="text-gold underline">
          True Sparkle
        </a>
        , not here.
      </PageIntro>
      {isAdmin ? (
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 pt-2 sm:px-6">
          <Button type="button" onClick={openAdd}>
            <Plus className="size-4" />
            Add a piece
          </Button>
          <Button type="button" variant="outline" className="sm:hidden" onClick={() => void signOut()}>
            Sign out
          </Button>
        </div>
      ) : null}
      <div className="sticky top-16 z-20 border-y border-line bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
          <span className="inline-flex h-10 shrink-0 items-center rounded-full bg-gold px-4 text-xs uppercase tracking-[0.16em] text-gold-fg">
            All
          </span>
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={c.path}
              className="inline-flex h-10 shrink-0 items-center rounded-full px-4 text-xs uppercase tracking-[0.16em] text-muted hover:text-gold"
            >
              {c.label}
            </a>
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
