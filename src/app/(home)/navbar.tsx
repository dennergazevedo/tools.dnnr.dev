import Link from "next/link";
import { Hammer } from "lucide-react";

export function HomeNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-800/60 bg-neutral-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-neutral-100 transition-colors hover:text-amber-400"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 shadow-highlight">
            <Hammer className="h-4 w-4 text-neutral-950" />
          </div>
          <span className="font-bold tracking-tight">tools.dnnr.dev</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-neutral-500 md:flex">
          <a href="#texto-codigo" className="transition-colors hover:text-neutral-100">
            Text and Code
          </a>
          <a href="#conversores-encoders" className="transition-colors hover:text-neutral-100">
            Converters
          </a>
          <a href="#cores-imagens" className="transition-colors hover:text-neutral-100">
            Colors and Images
          </a>
          <a href="#utilitarios-dev" className="transition-colors hover:text-neutral-100">
            DEV Utilities
          </a>
          <a href="#organizacao-foco" className="transition-colors hover:text-neutral-100">
            Organization
          </a>
        </div>
      </div>
    </nav>
  );
}
