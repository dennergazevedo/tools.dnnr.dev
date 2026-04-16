"use client";

import Link from "next/link";
import { ElementType } from "react";
import { usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
  icon: ElementType;
  to: string;
  onClose?: () => void;
}

export function NavItem({ title, icon: Icon, to, onClose }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      onClick={onClose}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 ${
        isActive
          ? "bg-primary/10 text-primary"
          : "hover:bg-neutral-800/50"
      }`}
    >
      <Icon
        className={`h-4 w-4 flex-shrink-0 transition-colors ${
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
        }`}
      />
      <span
        className={`text-sm font-medium transition-colors ${
          isActive ? "text-primary" : "text-foreground group-hover:text-primary"
        }`}
      >
        {title}
      </span>
      {isActive && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
      )}
    </Link>
  );
}
