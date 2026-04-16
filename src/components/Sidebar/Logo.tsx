import { Hammer } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  onClose?: () => void;
}

export function Logo({ onClose }: LogoProps) {
  return (
    <Link
      href="/"
      className="mx-1 flex items-center gap-3 text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
    >
      <span
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-highlight ring-1 ring-white/10"
      >
        <Hammer className="h-4 w-4 flex-shrink-0 text-neutral-950" />
      </span>
      <span className="sr-only lg:not-sr-only">tools.dnnr.dev</span>
    </Link>
  );
}
