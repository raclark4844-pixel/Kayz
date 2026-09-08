import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <Link
      to="/"
      className={cn(
        "font-serif leading-none tracking-[0.04em] text-foreground",
        size === "sm" ? "text-xl" : "text-[1.65rem]",
        className,
      )}
    >
      Kayz<span className="italic text-gold">Charmzz</span>
    </Link>
  );
}
