import Link from "next/link";
import { ElementType } from "react";

interface HomeCardProps {
  icon: ElementType;
  href: string;
  label: string;
  description: string;
}

export default function HomeCard({
  href,
  icon: Icon,
  label,
  description,
}: HomeCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-neutral-900/50 p-6 transition-all hover:border-neutral-700 hover:bg-neutral-800/80 hover:shadow-premium"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:shadow-highlight">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
          {label}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="mt-2 flex translate-x-[-10px] items-center text-xs font-bold text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
        Try now →
      </div>
    </Link>
  );
}
