import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { QtyStepper } from "@/components/qty-stepper";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CATEGORIES, categoryLabel, getProduct, leadTimeLabel } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useShop } from "@/lib/shop-store";
import { formatPrice } from "@/lib/utils";
import { SPARKLE_URL, absoluteUrl, pageHead, trackEvent } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/shop/$slug")({
  head: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) {
      return pageHead({
        title: "Piece not found | KayzCharmzz",
        description: "That piece is not in the KayzCharmzz shop.",
        path: `/shop/${params.slug}`,
      });
    }
    return pageHead({
      title: `${product.name} | KayzCharmzz`,
      description: product.short.slice(0, 155),
      path: `/shop/${product.slug}`,
      image: product.image,
      type: "product",
    });
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const catalog = useShop((s) => s.products);
  const isAdmin = useShop((s) => s.isAdmin);
  const openEdit = useShop((s) => s.openEdit);
  const askDelete = useShop((s) => s.askDelete);
  const product = getProduct(slug, catalog);
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <main className="pb-nav px-4 pt-28 text-center">
        <h1 className="font-serif text-3xl">That piece is not in the shop</h1>
        <p className="mt-3 text-muted">
          If you wanted a diamond painting kit, that’s{" "}
          <a href={SPARKLE_URL} className="text-gold underline">
            original kits at True Sparkle
          </a>
          .
        </p>
        <Button asChild className="mt-6">
          <Link to="/shop">Back to shop</Link>
        </Button>
      </main>
    );
  }

  const primary = product.categories[0];
  const cat = CATEGORIES.find((c) => c.id === primary);
  const alt = product.alt ?? `${product.name} handmade by KayzCharmzz`;

  return (
    <main className="pb-nav">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: absoluteUrl(product.image),
          description: product.description,
          brand: { "@type": "Brand", name: "KayzCharmzz" },
          sku: product.slug,
          offers: {
            "@type": "Offer",
            url: absoluteUrl(`/shop/${product.slug}`),
            priceCurrency: "USD",
            price: product.price.toFixed(2),
            availability: "https://schema.org/MadeToOrder",
            itemCondition: "https://schema.org/NewCondition",
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
            },
          },
        }}
      />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            ...(cat ? [{ name: cat.label, path: cat.path }] : []),
            { name: product.name, path: `/shop/${product.slug}` },
          ]}
        />
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-6 sm:px-6 md:grid-cols-2 md:gap-12 md:pt-10">
        <img
          src={product.image}
          alt={alt}
          className="aspect-4/5 max-h-[52vh] w-full rounded-lg object-cover md:aspect-square md:max-h-none"
        />
        <div className="md:pt-6">
          <p className="text-xs uppercase tracking-[0.22em] text-rose">
            {product.categories.length
              ? product.categories.map(categoryLabel).join(" · ")
              : "Gift set"}
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg tabular-nums text-gold">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-muted">
            Made to order · {leadTimeLabel(product.leadTime)}
          </p>
          <p className="mt-5 max-w-prose text-muted">{product.description}</p>
          <ul className="mt-5 space-y-1.5 text-sm text-foreground">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" />
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} />
            <Button
              size="lg"
              onClick={() => {
                add(product.slug, qty, product);
                trackEvent("add_to_cart", {
                  item_id: product.slug,
                  item_name: product.name,
                  value: product.price * qty,
                  currency: "USD",
                });
              }}
            >
              Add to bag
            </Button>
          </div>
          {isAdmin ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={() => openEdit(product)}>
                <Pencil className="size-4" />
                Edit
              </Button>
              <Button type="button" variant="ghost" onClick={() => askDelete(product)}>
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          ) : null}
          <p className="mt-4 text-xs text-muted">
            Checkout next — shipping or pickup at {SITE.address}, then Lana confirms PayPal or Cash App.
          </p>
          <p className="mt-6 text-sm text-muted">
            Want this in different colors, a name, or a matching piece?{" "}
            <Link to="/custom" className="text-gold underline">
              Start a custom order
            </Link>
            . A photo is optional.
          </p>
          <div className="mt-10 flex gap-4 text-xs uppercase tracking-[0.16em]">
            <Link to="/shop" className="text-muted hover:text-gold">
              Keep shopping
            </Link>
            <Link to="/custom" className="text-muted hover:text-gold">
              Custom
            </Link>
            <Link to="/shipping-returns" className="text-muted hover:text-gold">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
