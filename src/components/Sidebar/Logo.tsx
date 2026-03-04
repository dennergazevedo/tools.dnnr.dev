import { Hammer } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  onClose?: () => void;
}

export function Logo({ onClose }: LogoProps) {
  return (
    <strong className="mx-1 flex items-center gap-3 text-xl font-bold tracking-tight text-foreground">
      <Link
        href="/"
        onClick={onClose}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-highlight ring-1 ring-white/20"
      >
        <Hammer className="h-5 w-5 flex-shrink-0 text-white" />
      </Link>
      <span className="sr-only lg:not-sr-only">tools.dnnr.dev</span>
    </strong>
  );
}
