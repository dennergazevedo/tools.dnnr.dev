"use client";

import { ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode } from "react";

interface PrivacyAlertProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function PrivacyAlert({
  title = "Private & Local",
  children,
  className = "mt-4",
}: PrivacyAlertProps) {
  return (
    <Alert className={`${className} border-neutral-800 bg-neutral-900/50`}>
      <ShieldCheck className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-foreground">{title}</AlertTitle>
      <AlertDescription className="text-muted-foreground">
        {children}
      </AlertDescription>
    </Alert>
  );
}
