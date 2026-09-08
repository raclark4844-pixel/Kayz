import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QtyStepper({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (n: number) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-11 items-center rounded-md shadow-[0_0_0_1px_rgb(255_255_255/0.1)]",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className="inline-flex size-11 items-center justify-center text-muted transition-colors hover:text-gold"
        onClick={() => onChange(value - 1)}
      >
        <Minus className="size-3.5" />
      </button>
      <span className="min-w-6 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="inline-flex size-11 items-center justify-center text-muted transition-colors hover:text-gold"
        onClick={() => onChange(Math.min(10, value + 1))}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
