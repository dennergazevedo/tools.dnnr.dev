"use client";

import { cn } from "@/lib/utils";

type BackgroundProps = {
  className?: string;
  showGrid?: boolean;
  showGlow?: boolean;
  glowClassName?: string;
};

export function Background({
  className,
  showGrid = true,
  showGlow = true,
  glowClassName,
}: BackgroundProps) {
  return (
    <div className={cn("pointer-events-none fixed inset-0", className)}>
      {showGlow && (
        <div className={cn("hero-glow fixed inset-0", glowClassName)} />
      )}
      {showGrid && <div className="bg-grid fixed inset-0 opacity-20" />}
    </div>
  );
}
