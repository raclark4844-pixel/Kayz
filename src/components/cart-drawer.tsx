import { Link } from "@tanstack/react-router";
import { Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { QtyStepper } from "@/components/qty-stepper";
import { Button } from "@/components/ui/button";
import { checkoutTotals } from "@/lib/checkout";
import { resolveCart, useCart } from "@/lib/cart";
import { useShop } from "@/lib/shop-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const open = useCart((s) => s.open);
  const closeCart = useCart((s) => s.closeCart);
  const lines = useCart((s) => s.lines);
  const products = useShop((s) => s.products);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const items = resolveCart(lines, products);
  const { subtotal } = checkoutTotals(items, "pickup");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeCart]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close bag"
        className="absolute inset-0 bg-overlay"
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        className="absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col rounded-t-xl bg-background shadow-[0_0_0_1px_rgb(212_175_55/0.22)] md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[26.5rem] md:max-h-none md:rounded-none"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <h2 id="bag-title" className="font-serif text-2xl">
            Your bag
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex size-11 items-center justify-center text-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="gold-rule mx-5" />
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-muted">Your bag is empty.</p>
              <Button asChild className="mt-5" onClick={closeCart}>
                <Link to="/shop">Shop the collection</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((line) => (
                <li key={line.slug} className="flex gap-3">
                  <img
                    src={line.product.image}
                    alt=""
                    className="size-20 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-lg leading-tight">
                      {line.product.name}
                    </p>
                    <p className="mt-0.5 text-sm tabular-nums text-gold">
                      {formatPrice(line.product.price)}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <QtyStepper
                        value={line.qty}
                        onChange={(n) => setQty(line.slug, n)}
                      />
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        className="inline-flex size-11 items-center justify-center text-muted hover:text-rose-deep"
                        aria-label={`Remove ${line.product.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 ? (
          <div className="border-t border-line px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium tabular-nums text-gold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">
              Shipping, pickup, and payment on the next step.
            </p>
            <Button asChild className="mt-4 w-full" size="lg">
              <Link to="/checkout" onClick={closeCart}>
                Check out
              </Link>
            </Button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
