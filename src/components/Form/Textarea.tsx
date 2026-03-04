import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface TextareaProps extends ComponentProps<"textarea"> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={twMerge(
        "flex min-h-[120px] w-full resize-y items-center gap-2 rounded-lg border border-border bg-neutral-900/50 px-3 py-2 text-foreground placeholder-muted-foreground shadow-sm outline-none transition-all",
        "focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20",
        className
      )}
      {...props}
    />
  );
}
