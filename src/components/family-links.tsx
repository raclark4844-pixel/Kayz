import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAMILY } from "@/lib/site";
import { cn } from "@/lib/utils";

const headerLinkClass =
  "inline-flex h-10 items-center justify-center gap-1 px-2.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold/10 sm:px-3.5";

export function FamilyHeaderLinks({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 overflow-hidden rounded-md border border-gold/45",
        className,
      )}
    >
      <a
        href={FAMILY.parent.href}
        aria-label={`Back to ${FAMILY.parent.name}`}
        className={headerLinkClass}
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.7} />
        <span>Parent</span>
      </a>
      <span className="w-px self-stretch bg-gold/45" aria-hidden />
      <a
        href={FAMILY.sparkle.href}
        aria-label={`Visit ${FAMILY.sparkle.name}`}
        className={headerLinkClass}
      >
        <span className="sm:hidden">Sparkle</span>
        <span className="hidden sm:inline">True Sparkle</span>
        <ArrowUpRight className="size-3.5" strokeWidth={1.7} />
      </a>
    </div>
  );
}

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
