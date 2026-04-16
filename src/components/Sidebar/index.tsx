"use client";

import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { Profile } from "./Profile";
import { Ads } from "./Ads";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { useState } from "react";

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="fixed left-0 right-0 top-0 z-20 flex flex-col gap-5 overflow-hidden border-b border-neutral-800/60 bg-neutral-950 p-4 data-[state=open]:bottom-0 lg:bottom-0 lg:right-auto lg:h-auto lg:w-80 lg:overflow-auto lg:border-b-0 lg:border-r lg:px-5 lg:py-8"
    >
      <div className="flex items-center justify-between">
        <Logo onClose={closeSidebar} />
        <Collapsible.Trigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5 text-neutral-500" />
          </Button>
        </Collapsible.Trigger>
      </div>

      <Separator className="hidden lg:flex opacity-50" />

      <Collapsible.Content
        asChild
        forceMount
        className="data-[state=closed]:hidden data-[state=closed]:animate-slideUpAndFade data-[state=open]:animate-slideDownAndFade lg:data-[state=closed]:flex"
      >
        <div className="flex flex-1 flex-col gap-5">
          <Navigation onClose={closeSidebar} />

          <div className="mt-auto flex flex-col gap-5">
            <Ads />
            <Separator className="opacity-50" />
            <Profile />
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
