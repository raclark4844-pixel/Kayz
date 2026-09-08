import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-sans text-sm font-medium tracking-wide transition-[color,background-color,border-color,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        gold: "bg-gold text-gold-fg hover:bg-gold-soft",
        outline:
          "border border-gold/45 bg-transparent text-gold hover:border-gold hover:bg-gold/10",
        ghost: "text-foreground hover:text-gold",
        rose: "bg-rose text-gold-fg hover:opacity-90",
      },
      size: {
        sm: "h-10 px-3.5",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[0.9375rem]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
