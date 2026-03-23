import { Fragment } from "react";
import HomeCard from "./card";
import FAQ from "./faq";
import { HomeNavbar } from "./navbar";

import {
  FileCode2,
  Ampersands,
  AlarmClock,
  Bookmark,
  ListChecks,
  Layers,
  Code2,
  Image,
  GitCompare,
  Zap,
  ShieldCheck,
  Terminal,
  Sparkles,
  Database,
  Binary,
  Code2 as Code,
  Asterisk,
  Palette,
  Hammer,
  Regex,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "texto-codigo",
    title: "Text and Code",
    tools: [
      {
        icon: Code2,
        label: "JSON",
        href: "/tools/json",
        description:
          "Validate JSON and transform it into TypeScript interfaces automatically.",
      },
      {
        icon: GitCompare,
        label: "Diff Checker",
        href: "/tools/diffchecker",
        description:
          "Compare text versions and easily identify changes.",
      },
      {
        icon: Regex,
        label: "Regex",
        href: "/tools/regex",
        description:
          "Test, break down, and get human-readable explanations for your Regular Expressions.",
      },
    ],
  },
  {
    id: "conversores-encoders",
    title: "Converters and Encoders",
    tools: [
      {
        icon: Layers,
        label: "Spreadsheet",
        href: "/tools/spreadsheet",
        description:
          "Convert spreadsheets (XLS, XLSX, CSV, ODS) to JSON and vice versa with high precision and ease.",
      },
      {
        icon: Ampersands,
        label: "Base64",
        href: "/tools/base64",
        description:
          "Reliable Base64 encoding and decoding for your data.",
      },
      {
        icon: FileCode2,
        label: "URI",
        href: "/tools/uri",
        description:
          "Encode and decode URIs for secure web transmissions.",
      },
    ],
  },
  {
    id: "cores-imagens",
    title: "Colors and Images",
    tools: [
      {
        icon: Palette,
        label: "Colors",
        href: "/tools/colors",
        description:
          "Choose colors and see their values in different formats.",
      },
      {
        icon: Image,
        label: "SVG Tools",
        href: "/tools/svg",
        description: "Convert SVG to PNG, ICO, WebP, or React components.",
      },
    ],
  },
  {
    id: "utilitarios-dev",
    title: "DEV Utilities",
    tools: [
      {
        icon: AlarmClock,
        label: "Cron",
        href: "/tools/cron",
        description:
          "Easily create and validate cron expressions for your schedules.",
      },
      {
        icon: Sparkles,
        label: "UUID & Passwords",
        href: "/tools/generators",
        description: "Generate random UUIDs and secure passwords instantly.",
      },
    ],
  },
  {
    id: "organizacao-foco",
    title: "Organization and Focus",
    tools: [
      {
        icon: ListChecks,
        label: "To Do",
        href: "/tools/todo",
        description:
          "Organize your tasks and boost your productivity with our synchronized list.",
      },
      {
        icon: AlarmClock,
        label: "Timer",
        href: "/tools/timer",
        description:
          "A precise timer to help you manage your focus blocks.",
      },
      {
        icon: Bookmark,
        label: "Bookmarks",
        href: "/tools/bookmark",
        description:
          "Save your useful links and access them from anywhere with ease.",
      },
    ],
  },
];

export default function Home() {
  return (
    <Fragment>
      <HomeNavbar />
      <div className="flex flex-col gap-12 py-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 text-center">
        <div className="mb-2 flex gap-2">
          <span className="flex items-center gap-1 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-400">
            <ShieldCheck className="h-3 w-3" />
            100% private
          </span>
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
            <Terminal className="h-3 w-3" />
            dev tools
          </span>
        </div>

        <h1 className="max-w-4xl bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
          Free Web Tools That Respect Your Privacy
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          Your privacy is our priority. We process all data
          locally in your browser, ensuring nothing leaves your
          device.
        </p>

        <div className="mt-4 animate-bounce">
          <Zap className="h-6 w-6 text-sky-500 opacity-50" />
        </div>

        <div>
          <Link href="/tools" className="flex items-center gap-2 bg-sky-500 text-white hover:bg-sky-600 p-3 px-8 rounded-full">
            <Hammer className="h-4 w-4" />
            Get started
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="flex flex-col gap-12">
        {CATEGORIES.map((category) => (
          <section key={category.id} id={category.id} className="flex scroll-mt-24 flex-col gap-6">
            <div className="flex items-center gap-4">
              <h2 className="whitespace-nowrap text-xl font-semibold text-zinc-100">
                {category.title}
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.tools.map((tool) => (
                <HomeCard
                  key={tool.href}
                  icon={tool.icon}
                  label={tool.label}
                  href={tool.href}
                  description={tool.description}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      {/* SEO Sections */}
      <div className="mt-12 flex flex-col gap-8 pt-8 text-zinc-400">
        {/* Highlights — compact icon+text row */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <h2 className="whitespace-nowrap text-xl font-semibold text-zinc-100">
              Essential Tools for Developers
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Database, title: "Data Manipulation", text: "Convert spreadsheets and JSON with high type fidelity." },
              { icon: Binary, title: "Encoding & Debugging", text: "Base64, URI and more — works 100% offline." },
              { icon: Code, title: "Assets & Frontend", text: "SVG to PNG, ICO, WebP, or React component instantly." },
            ].map(({ icon: Ic, title, text }) => (
              <div key={title} className="flex items-start gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/20 p-4">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                  <Ic className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-zinc-200">{title}</span>
                  <span className="text-sm leading-relaxed text-zinc-500">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy — single compact bar */}
        <section className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800/60 bg-zinc-900/20 p-5 text-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-zinc-200">Privacy First</h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-500">
              <strong className="text-zinc-400">dnnr.dev does not send your data to any server.</strong>{" "}
              All processing happens locally in your browser. Secrets, passwords, and client data never leave your machine.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["No Server Processing", "No Tracking", "Open Source Spirit"].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-sky-400"
              >
                <div className="h-1 w-1 rounded-full bg-sky-500" />
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-[10px] text-neutral-600">
            <Asterisk className="h-3 w-3" /> Except purposeful storage tools (To-Do, Bookmarks).
          </span>
        </section>


        {/* FAQ */}
        <FAQ />
      </div>
      </div>
    </Fragment>
  );
}
