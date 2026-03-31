import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/0.18)] hover:bg-[hsl(var(--primary-hover))] hover:shadow-[0_12px_28px_hsl(var(--primary)/0.22)] active:bg-[hsl(var(--primary-active))]",
        destructive:
          "border-[hsl(var(--destructive))] bg-[hsl(var(--destructive))] text-destructive-foreground shadow-[0_10px_24px_hsl(var(--destructive)/0.18)] hover:bg-[hsl(var(--primary-hover))] hover:shadow-[0_12px_28px_hsl(var(--destructive)/0.22)] active:bg-[hsl(var(--primary-active))]",
        outline:
          "border-[hsl(var(--primary)/0.16)] bg-white text-[hsl(var(--primary))] shadow-sm hover:border-[hsl(var(--primary)/0.28)] hover:bg-[hsl(var(--primary)/0.06)] hover:shadow-[0_10px_24px_hsl(var(--primary)/0.08)]",
        secondary:
          "border-slate-200 bg-slate-100 text-slate-700 shadow-sm hover:bg-slate-200 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]",
        ghost:
          "border-transparent bg-transparent text-slate-600 shadow-none hover:bg-[hsl(var(--primary)/0.06)] hover:text-[hsl(var(--primary))]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-12 px-6 py-2.5 text-sm",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
