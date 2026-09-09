import { Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { ProductCard } from "@/components/product-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CustomCta } from "@/components/custom-cta";
import { CATEGORIES, productsByCategory, type CategoryId } from "@/lib/catalog";
import { SPARKLE_URL } from "@/lib/seo";
import { useShop } from "@/lib/shop-store";

export function CategoryPage({
  id,
  title,
  kicker,
  intro,
}: {
  id: CategoryId;
  title: string;
  kicker: string;
  intro: string;
}) {
  const catalog = useShop((s) => s.products);
  const cat = CATEGORIES.find((c) => c.id === id);
  const products = productsByCategory(id, catalog);
  return (
    <main className="pb-nav">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: cat?.label ?? title, path: cat?.path ?? "/shop" },
          ]}
        />
      </div>
      <PageIntro kicker={kicker} title={title}>
        {intro}{" "}
        {id !== "tumblers" ? null : (
          <>
            Original diamond painting kits are at{" "}
            <a href={SPARKLE_URL} className="text-gold underline">
              True Sparkle
            </a>
            .
          </>
        )}
      </PageIntro>
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
        <div className="mt-14">
          <CustomCta heading="Want this custom?" compact />
        </div>
        <p className="mt-10 text-center text-sm text-muted">
          <Link to="/shop" className="text-gold hover:underline">
            View the full shop
          </Link>
        </p>
      </section>
    </main>
  );
}
