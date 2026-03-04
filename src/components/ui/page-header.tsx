import { ElementType } from "react";
import { Separator } from "./separator";

interface PageHeaderProps {
  title: string;
  description: string;
  icon: ElementType;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg ring-1 ring-white/5">
            <Icon className="h-5 w-5 text-sky-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            {title}
          </h1>
        </div>
        <p className="max-w-2xl text-sm italic leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>
      <Separator className="bg-zinc-800/50" />
    </div>
  );
}
