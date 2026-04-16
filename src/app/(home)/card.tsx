"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HomeCardProps {
  icon: ReactNode;
  href: string;
  label: string;
  description: string;
}

export default function HomeCard({
  href,
  icon,
  label,
  description,
}: HomeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.025, y: -2 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="group relative flex flex-col items-start gap-3 rounded-xl border border-border bg-neutral-900/40 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-800/70 hover:shadow-premium"
      >
        <div className="flex w-full items-center justify-start gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-neutral-950 group-hover:shadow-highlight">
            {icon}
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
    </motion.div>
  );
}
