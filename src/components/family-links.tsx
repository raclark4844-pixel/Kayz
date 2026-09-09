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
