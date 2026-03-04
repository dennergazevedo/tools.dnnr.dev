import { Hammer } from "lucide-react";

export function Logo() {
  return (
    <strong className="mx-1 flex items-center gap-3 text-xl font-bold tracking-tight text-foreground">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-highlight ring-1 ring-white/20">
        <Hammer className="h-5 w-5 flex-shrink-0 text-white" />
      </div>
      <span className="sr-only lg:not-sr-only">tools.dnnr.dev</span>
    </strong>
  );
}
