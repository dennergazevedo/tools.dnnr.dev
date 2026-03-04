"use client";

import { Search, LifeBuoy, Menu } from "lucide-react";
import * as Input from "../Form/Input";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { Navigation } from "./Navigation";
import { NavItem } from "./Navigation/NavItem";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function Sidebar() {
  return (
    <Collapsible.Root className="scrollbar-v2 fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 overflow-hidden border-b border-border bg-neutral-950 p-4 scrollbar-thin data-[state=open]:bottom-0 lg:bottom-0 lg:right-auto lg:h-auto lg:w-80 lg:overflow-auto lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
      <div className="flex items-center justify-between">
        <Logo />
        <Collapsible.Trigger asChild className="lg:hidden">
          <Button variant="ghost">
            <Menu className="h-6 w-6 text-zinc-500" />
          </Button>
        </Collapsible.Trigger>
      </div>

      <Separator />

      <Collapsible.Content
        asChild
        forceMount
        className="data-[state=closed]:hidden data-[state=closed]:animate-slideUpAndFade data-[state=open]:animate-slideDownAndFade lg:data-[state=closed]:flex"
      >
        <div className="flex flex-1 flex-col gap-6">
          <Navigation />

          <div className="mt-auto flex flex-col gap-6">
            <Separator />
            <Profile />
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
