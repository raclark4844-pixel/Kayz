import { Link } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/catalog";
import { categoryLabel, leadTimeLabel } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useShop } from "@/lib/shop-store";
import { cn, formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const add = useCart((s) => s.add);
  const isAdmin = useShop((s) => s.isAdmin);
  const openEdit = useShop((s) => s.openEdit);
  const askDelete = useShop((s) => s.askDelete);
  const label = product.categories[0]
    ? categoryLabel(product.categories[0])
    : "Gift set";

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link
        to="/shop/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden rounded-lg bg-card"
      >
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-3">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-rose">{label}</p>
        <Link
          to="/shop/$slug"
          params={{ slug: product.slug }}
          className="mt-1 font-serif text-xl leading-snug text-foreground transition-colors hover:text-gold"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-muted">{product.short}</p>
        <p className="mt-1 text-xs text-muted">Made to order · {leadTimeLabel(product.leadTime)}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="text-sm font-medium tabular-nums text-gold">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="px-3"
            onClick={() => add(product.slug, 1, product)}
          >
            Add
          </Button>
        </div>
        {isAdmin ? (
          <div className="mt-2 flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-10 flex-1 px-2 text-xs uppercase tracking-[0.14em] text-muted"
              onClick={() => openEdit(product)}
            >
              <Pencil className="size-3.5" />
              Edit
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-10 flex-1 px-2 text-xs uppercase tracking-[0.14em] text-muted hover:text-rose-deep"
              onClick={() => askDelete(product)}
            >
              <Trash2 className="size-3.5" />
              Delete
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
