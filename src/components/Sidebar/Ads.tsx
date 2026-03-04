"use client";

import { ExternalLink, Sparkles, Monitor, User } from "lucide-react";
import Link from "next/link";

export function Ads() {
  return (
    <div className="flex flex-col gap-3 px-1">
      <Link
        href="https://divisor.dev"
        target="_blank"
        className="group relative flex flex-col gap-1 rounded-xl border border-border bg-neutral-900/40 p-3 transition-all hover:border-purple-500/30 hover:bg-purple-500/5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-600/10 text-purple-500 transition-all group-hover:bg-purple-600 group-hover:text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Divisor
            </span>
          </div>
          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground transition-colors group-hover:text-neutral-300">
          A/B testing without complexity
        </p>
      </Link>

      <Link
        href="https://os.dnnr.dev"
        target="_blank"
        className="group relative flex flex-col gap-1 rounded-xl border border-border bg-neutral-900/40 p-3 transition-all hover:border-neutral-600 hover:bg-neutral-800/60"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-800 text-neutral-400 transition-all group-hover:bg-neutral-700 group-hover:text-white">
              <Monitor className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Janelas XD
            </span>
          </div>
          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground transition-colors group-hover:text-neutral-300">
          Inspired by the iconic Windows XP interface.
        </p>
      </Link>

      <Link
        href="https://dnnr.dev"
        target="_blank"
        className="group relative flex flex-col gap-1 rounded-xl border border-border bg-neutral-900/40 p-3 transition-all hover:border-primary/30 hover:bg-primary/5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white">
              <User className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Portfolio
            </span>
          </div>
          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground transition-colors group-hover:text-neutral-300">
          Check out my projects and career path.
        </p>
      </Link>
    </div>
  );
}
