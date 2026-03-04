import { ReactNode, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Root(props: RootProps) {
  return (
    <div
      {...props}
      className={twMerge(
        "flex w-full items-center gap-2 rounded-lg border border-border bg-neutral-900/50 px-3 py-2 shadow-sm outline-none transition-all",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        props.className
      )}
    />
  );
}
