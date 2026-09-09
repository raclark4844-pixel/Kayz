import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES, featuredProducts } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { SPARKLE_URL, pageHead, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      path: "/",
    }),
  component: Home,
});

function Home() {
  const catalog = useShop((s) => s.products);
  const featured = featuredProducts(catalog);
  return (
    <main>
      <section className="relative min-h-[100svh]">
        <img
          src="/products/hero-mobile.jpg"
          alt="KayzCharmzz handmade tumbler, candle, and jewelry on black velvet"
          className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
        />
        <img
          src="/products/hero-desktop.jpg"
          alt="KayzCharmzz handmade tumbler, candle, and jewelry on black velvet"
          className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background via-background/80 to-transparent pb-24 pt-28 md:via-background/55 lg:pb-16">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold">
              {SITE.city} · Est. {SITE.est}
            </p>
            <h1 className="mt-2 font-serif text-3xl italic text-foreground sm:text-4xl">
              Handmade tumblers, candles & charms
            </h1>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-rose">Handmade boutique</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Beautiful gifts, without breaking the bank.
          </h2>
          <p className="mt-4 text-muted">
            Beautiful gifts, without breaking the bank. Jewelry, soy candles,
            tumblers, junk phone cases, and beaded pens — made with care in Cleveland.
            Custom is part of the shop: describe the piece, and add a photo only if
            you have one. Original diamond painting kits live at{" "}
            <a href={SPARKLE_URL} className="text-gold underline">
              True Sparkle
            </a>
            .
          </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link to="/shop">Shop</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/custom">Custom order</Link>
          </Button>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={cat.path}
              className="bg-background px-4 py-8 text-center transition-colors hover:bg-card"
            >
              <span className="block font-serif text-2xl text-foreground">{cat.label}</span>
              <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.22em] text-gold">
                Shop
              </span>
            </a>
          ))}
          <a
            href="/custom"
            className="bg-background px-4 py-8 text-center transition-colors hover:bg-card"
          >
            <span className="block font-serif text-2xl text-foreground">Custom</span>
            <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.22em] text-gold">
              Order
            </span>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold">The collection</p>
            <h2 className="mt-2 font-serif text-3xl">Pieces in the shop</h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-[0.7rem] uppercase tracking-[0.2em] text-muted hover:text-gold sm:inline"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <img
            src="/products/atelier.jpg"
            alt="KayzCharmzz atelier table with candles, tumblers, and jewelry"
            className="aspect-4/3 w-full rounded-lg object-cover"
          />
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold">From Lana</p>
            <blockquote className="mt-4 font-serif text-3xl leading-snug italic text-foreground">
              “I created KayzCharmzz when I had so many beautiful items around
              that I needed to share them with the world.”
            </blockquote>
            <p className="mt-5 text-sm text-muted">
              Female & Black owned · {SITE.city} · Est. {SITE.est}
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/about">The story</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2">
        <Link
          to="/classes"
          className="group relative overflow-hidden rounded-lg"
        >
          <img
            src="/products/classes.jpg"
            alt="Jewelry-making class tools on a black table"
            className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">Learn with Lana</p>
            <h3 className="mt-1 font-serif text-3xl">Classes</h3>
            <p className="mt-1 text-sm text-muted">Jewelry $55 / hour online. Candles on request.</p>
          </div>
        </Link>
        <Link to="/custom" className="group relative overflow-hidden rounded-lg bg-elevated">
          <img
            src="/products/earrings-bracelet.jpg"
            alt="Custom gold charm jewelry"
            className="aspect-4/3 w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">Made for you</p>
            <h3 className="mt-1 font-serif text-3xl">Custom orders</h3>
            <p className="mt-1 text-sm text-muted">
              Describe it. A photo helps if you have one — it is optional.
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}
