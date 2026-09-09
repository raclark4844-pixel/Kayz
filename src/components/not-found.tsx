import { Link } from "@tanstack/react-router";
import { SPARKLE_URL } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">404</p>
      <h1 className="mt-3 font-serif text-4xl">That piece isn’t in the shop</h1>
      <p className="mt-4 text-muted">
        Browse handmade gifts, start a custom order, or write Lana.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/shop">Shop</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact</Link>
        </Button>
      </div>
      <p className="mt-8 text-sm text-muted">
        Looking for original diamond painting kits?{" "}
        <a href={SPARKLE_URL} className="text-gold underline">
          True Sparkle
        </a>
        .
      </p>
    </main>
  );
}
