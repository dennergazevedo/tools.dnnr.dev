"use client";

import { useEffect, useState, useCallback, Fragment } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Command as CommandIcon,
  FileCode2,
  Ampersands,
  AlarmClock,
  Bookmark,
  ListChecks,
  Layers,
  Code2,
  Image,
  GitCompare,
  Palette,
  Sparkles,
  Rocket,
  Regex,
  Network,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

const CATEGORIES = [
  {
    title: "Get Started",
    tools: [
      {
        icon: Rocket,
        label: "Get Started",
        href: "/tools",
        description: "Welcome to dnnr.dev tools.",
      },
    ],
  },
  {
    title: "Text and Code",
    tools: [
      {
        icon: Code2,
        label: "JSON",
        href: "/tools/json",
        description: "Validate JSON and transform it into TypeScript interfaces.",
      },
      {
        icon: GitCompare,
        label: "Diff Checker",
        href: "/tools/diffchecker",
        description: "Compare text versions and identify changes.",
      },
      {
        icon: Regex,
        label: "Regex",
        href: "/tools/regex",
        description: "Test, break down, and explain Regular Expressions.",
      },
    ],
  },
  {
    title: "Converters and Encoders",
    tools: [
      {
        icon: Layers,
        label: "Spreadsheet",
        href: "/tools/spreadsheet",
        description: "Convert XLS, XLSX, CSV, ODS to JSON and vice versa.",
      },
      {
        icon: Ampersands,
        label: "Base64",
        href: "/tools/base64",
        description: "Base64 encoding and decoding for your data.",
      },
      {
        icon: FileCode2,
        label: "URI",
        href: "/tools/uri",
        description: "Encode and decode URIs for secure web transmissions.",
      },
    ],
  },
  {
    title: "Colors and Images",
    tools: [
      {
        icon: Palette,
        label: "Colors",
        href: "/tools/colors",
        description: "Choose colors and see their values in different formats.",
      },
      {
        icon: Image,
        label: "SVG Tools",
        href: "/tools/svg",
        description: "Convert SVG to PNG, ICO, WebP, or React components.",
      },
      {
        icon: Image,
        label: "Image Tools",
        href: "/tools/image",
        description: "Convert images to different formats and sizes.",
      },
    ],
  },
  {
    title: "DEV Utilities",
    tools: [
      {
        icon: AlarmClock,
        label: "Cron",
        href: "/tools/cron",
        description: "Create and validate cron expressions for your schedules.",
      },
      {
        icon: Sparkles,
        label: "UUID & Passwords",
        href: "/tools/generators",
        description: "Generate random UUIDs and secure passwords instantly.",
      },
      {
        icon: Network,
        label: "HAR Viewer",
        href: "/tools/har",
        description: "Inspect .har files — requests, timings, and headers.",
      },
    ],
  },
  {
    title: "Organization and Focus",
    tools: [
      {
        icon: ListChecks,
        label: "To Do",
        href: "/tools/todo",
        description: "Organize your tasks and boost productivity.",
      },
      {
        icon: AlarmClock,
        label: "Timer",
        href: "/tools/timer",
        description: "A precise timer to manage your focus blocks.",
      },
      {
        icon: Bookmark,
        label: "Bookmarks",
        href: "/tools/bookmark",
        description: "Save useful links and access them from anywhere.",
      },
    ],
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-3 rounded-full border border-neutral-700/60 bg-neutral-900/70 px-5 py-2.5 text-sm text-neutral-400 shadow-inner backdrop-blur-sm transition-all hover:border-amber-500/40 hover:bg-neutral-800/80 hover:text-neutral-200"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Search tools...</span>
        <span className="inline sm:hidden">Search...</span>
        <kbd className="ml-1 flex items-center gap-0.5 rounded border border-neutral-700 bg-neutral-800/80 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
          <CommandIcon className="h-2.5 w-2.5" />
          K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tools..." />
        <CommandList>
          <CommandEmpty>No tools found.</CommandEmpty>
          {CATEGORIES.map((category, idx) => (
            <Fragment key={category.title}>
              <CommandGroup heading={category.title}>
                {category.tools.map((tool) => (
                  <CommandItem
                    key={tool.href}
                    value={`${tool.label} ${tool.description}`}
                    onSelect={() => handleSelect(tool.href)}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-amber-500">
                      <tool.icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium text-neutral-100">
                        {tool.label}
                      </span>
                      <span className="truncate text-xs text-neutral-500">
                        {tool.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              {idx < CATEGORIES.length - 1 && <CommandSeparator />}
            </Fragment>
          ))}
        </CommandList>
        <div className="border-t border-neutral-800 px-4 py-2.5 text-[11px] text-neutral-600">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5 font-mono">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5 font-mono">↵</kbd>
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5 font-mono">esc</kbd>
              close
            </span>
          </span>
        </div>
      </CommandDialog>
    </>
  );
}
