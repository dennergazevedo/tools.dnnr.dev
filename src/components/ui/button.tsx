import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        success:
        "text-white bg-green-500 transition cursor-no-drop",
        ghost:
          "rounded-md px-2 hover:bg-zinc-50 shadow-none hover:bg-white/5 transition",
          primary:
          "text-white bg-sky-500 hover:bg-sky-600 transition",
        neutral:
          "text-white bg-zinc-200 hover:bg-zinc-300 text-zinc-900 transition",
        outline:
          "border border-zinc-300 border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition",
        link: "text-primary underline-offset-4 hover:underline",
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
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, loading, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
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
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
