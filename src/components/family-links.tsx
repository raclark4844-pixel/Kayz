import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAMILY } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ParentCompanyButton({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Button asChild variant="outline" size={compact ? "sm" : "md"} className={className}>
      <a href={FAMILY.parent.href} aria-label={`Back to ${FAMILY.parent.name}`}>
        <ArrowLeft className="size-4" strokeWidth={1.7} />
        {compact ? (
          <>
            <span className="sm:hidden">Parent</span>
            <span className="hidden sm:inline">Parent company</span>
          </>
        ) : (
          "Parent company"
        )}
      </a>
    </Button>
  );
}

export function TrueSparkleButton({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Button asChild variant="outline" size={compact ? "sm" : "md"} className={className}>
      <a href={FAMILY.sparkle.href} aria-label={`Visit ${FAMILY.sparkle.name}`}>
        {compact ? (
          <>
            <span className="sm:hidden">Sparkle</span>
            <span className="hidden sm:inline">True Sparkle</span>
          </>
        ) : (
          FAMILY.sparkle.label
        )}
        <ArrowUpRight className="size-4" strokeWidth={1.7} />
      </a>
    </Button>
  );
}

export function FamilyNavStrip({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 border-b border-line px-3 py-2", className)}>
      <a
        href={FAMILY.sparkle.href}
        rel="noopener"
        className="inline-flex h-9 items-center justify-center gap-1 rounded-full border border-gold/45 px-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-gold hover:border-gold hover:bg-gold/10"
      >
        <span className="truncate">{FAMILY.sparkle.name}</span>
        <ArrowUpRight className="size-3 shrink-0" aria-hidden />
      </a>
      <a
        href={FAMILY.parent.href}
        rel="noopener"
        aria-label={`Back to ${FAMILY.parent.name}`}
        className="inline-flex h-9 items-center justify-center gap-1 rounded-full border border-gold/45 px-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-gold hover:border-gold hover:bg-gold/10"
      >
        <span className="truncate">Parent studio</span>
        <ArrowUpRight className="size-3 shrink-0" aria-hidden />
      </a>
    </div>
  );
}

export function FamilyBrandButtons({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center",
        className,
      )}
    >
      <ParentCompanyButton className="w-full sm:w-auto" />
      <TrueSparkleButton className="w-full sm:w-auto" />
    </div>
  );
}
