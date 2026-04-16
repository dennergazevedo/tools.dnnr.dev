import Link from "next/link";
import { ElementType } from "react";
import { ArrowRight } from "lucide-react";

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
      className="group relative flex flex-col items-start gap-3 rounded-xl border border-border bg-neutral-900/40 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-800/70 hover:shadow-premium"
    >
      <div className="flex w-full items-center justify-start gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-neutral-950 group-hover:shadow-highlight">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <h3 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
          {label}
        </h3>
        <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 -translate-x-2 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}
