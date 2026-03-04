import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-highlight hover:bg-sky-400 active:bg-sky-600 transition-all",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-neutral-800 transition-all",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground transition-all",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground transition-all",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-red-600 transition-all",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-500 transition-all",
        neutral:
          "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 transition-all",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, loading, size, asChild = false, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-5 w-5 flex-shrink-0 animate-spin text-white" />
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
