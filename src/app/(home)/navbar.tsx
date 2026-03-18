import Link from "next/link";
import { Hammer } from "lucide-react";

export function HomeNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-100 transition-colors hover:text-sky-400"
        >
          <Hammer className="h-5 w-5" />
          <span className="font-bold tracking-tight">tools.dnnr.dev</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-zinc-400 md:flex">
          <a
            href="#texto-codigo"
            className="transition-colors hover:text-zinc-100"
          >
            Texto e Código
          </a>
          <a
            href="#conversores-encoders"
            className="transition-colors hover:text-zinc-100"
          >
            Conversores
          </a>
          <a
            href="#cores-imagens"
            className="transition-colors hover:text-zinc-100"
          >
            Cores e Imagens
          </a>
          <a
            href="#utilitarios-dev"
            className="transition-colors hover:text-zinc-100"
          >
            Utilitários DEV
          </a>
          <a
            href="#organizacao-foco"
            className="transition-colors hover:text-zinc-100"
          >
            Organização
          </a>
        </div>
      </div>
    </nav>
  );
}
