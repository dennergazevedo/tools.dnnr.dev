import { tv, VariantProps } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

const button = tv({
  base: [
    "rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm",
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500",
    "active:opacity-80",
  ],
  variants: {
    variant: {
      success:
        "text-white bg-green-500 transition cursor-no-drop",
      ghost:
        "rounded-md px-2 hover:bg-zinc-50 shadow-none hover:bg-white/5 transition",
      primary:
        "text-white bg-sky-500 hover:bg-sky-600 transition",
      outline:
        "border border-zinc-300 border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
  loading?: boolean;
}

export function Button({
  asChild,
  variant,
  className,
  children,
  loading,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component {...props} className={button({ variant, className })}>
      {loading ? (
        <Loader2 className="h-5 w-5 flex-shrink-0 animate-spin text-white" />
      ) : (
        children
      )}
    </Component>
  );
}
