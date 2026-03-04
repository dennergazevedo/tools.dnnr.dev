import Link from "next/link";
import { ElementType } from "react";

interface NavItemProps {
  title: string;
  icon: ElementType;
  to: string;
}

export function NavItem({ title, icon: Icon, to }: NavItemProps) {
  return (
    <Link
      href={to}
      className="group flex items-center gap-3 rounded-lg px-3 py-2 outline-none transition-all hover:bg-neutral-800/50 focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <Icon className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      <span className="font-medium text-foreground transition-colors group-hover:text-primary">
        {title}
      </span>
    </Link>
  );
}
