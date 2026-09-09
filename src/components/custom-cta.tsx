import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CustomCta({
  heading = "Don’t see it on the shelf?",
  compact = false,
}: {
  heading?: string;
  compact?: boolean;
}) {
  return (
    <aside className="rounded-lg border border-line bg-card px-5 py-8 text-center sm:px-8">
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-gold">
        Custom is part of the shop
      </p>
      <h2 className={compact ? "mt-3 font-serif text-2xl" : "mt-3 font-serif text-3xl"}>
        {heading}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
        Tell Lana the colors, the name, the occasion. A photo of a mockup, a
        screenshot, or a shade you like helps — it is optional. She will write
        back with a price and a lead time.
      </p>
      <Button asChild className="mt-6">
        <Link to="/custom">Start a custom order</Link>
      </Button>
    </aside>
  );
}
