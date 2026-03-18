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
} from "lucide-react";

const CATEGORIES = [
  {
    id: "texto-codigo",
    title: "Texto e Código",
    tools: [
      {
        icon: Code2,
        label: "JSON",
        href: "/tools/json",
        description:
          "Valide JSON e transforme em interfaces TypeScript automaticamente.",
      },
      {
        icon: GitCompare,
        label: "Diff Checker",
        href: "/tools/diffchecker",
        description:
          "Compare versões de texto e identifique mudanças com facilidade.",
      },
    ],
  },
  {
    id: "conversores-encoders",
    title: "Conversores e Encoders",
    tools: [
      {
        icon: Layers,
        label: "Spreadsheet",
        href: "/tools/spreadsheet",
        description:
          "Converta planilhas (XLS, XLSX, CSV, ODS) em JSON e vice-versa com alta precisão e facilidade.",
      },
      {
        icon: Ampersands,
        label: "Base64",
        href: "/tools/base64",
        description:
          "Codificação e decodificação Base64 confiável para seus dados.",
      },
      {
        icon: FileCode2,
        label: "URI",
        href: "/tools/uri",
        description:
          "Codifique e decodifique URIs para transmissões seguras na web.",
      },
    ],
  },
  {
    id: "cores-imagens",
    title: "Cores e Imagens",
    tools: [
      {
        icon: Palette,
        label: "Color Picker",
        href: "/tools/color-picker",
        description:
          "Escolha cores e veja seus valores em diferentes formatos.",
      },
      {
        icon: Image,
        label: "SVG Tools",
        href: "/tools/svg",
        description: "Converta SVG para PNG, ICO, WebP ou componentes React.",
      },
    ],
  },
  {
    id: "utilitarios-dev",
    title: "Utilitários DEV",
    tools: [
      {
        icon: AlarmClock,
        label: "Cron",
        href: "/tools/cron",
        description:
          "Crie e valide expressões cron para seus agendamentos com facilidade.",
      },
      {
        icon: Sparkles,
        label: "UUID & Senhas",
        href: "/tools/generators",
        description: "Gere UUIDs aleatórios e senhas seguras instantaneamente.",
      },
    ],
  },
  {
    id: "organizacao-foco",
    title: "Organização e Foco",
    tools: [
      {
        icon: ListChecks,
        label: "To Do",
        href: "/tools/todo",
        description:
          "Organize suas tarefas e aumente sua produtividade com nossa lista sincronizada.",
      },
      {
        icon: AlarmClock,
        label: "Timer",
        href: "/tools/timer",
        description:
          "Um cronômetro preciso para ajudar você a gerenciar seus blocos de foco.",
      },
      {
        icon: Bookmark,
        label: "Bookmarks",
        href: "/tools/bookmark",
        description:
          "Salve seus links úteis e acesse-os de qualquer lugar com facilidade.",
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
            100% privado
          </span>
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
            <Terminal className="h-3 w-3" />
            ferramentas dev
          </span>
        </div>

        <h1 className="max-w-4xl bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
          Ferramentas Web Gratuitas que Respeitam Sua Privacidade
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          Sua privacidade é nossa prioridade. Processamos todos os dados
          localmente no seu navegador, garantindo que nada saia do seu
          dispositivo.
        </p>

        <div className="mt-4 animate-bounce">
          <Zap className="h-6 w-6 text-sky-500 opacity-50" />
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
              Ferramentas Essenciais para Desenvolvedores
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Database, title: "Manipulação de Dados", text: "Converta planilhas e JSON com alta fidelidade de tipos." },
              { icon: Binary, title: "Encoding & Debugging", text: "Base64, URI e mais — funciona 100% offline." },
              { icon: Code, title: "Assets & Frontend", text: "SVG para PNG, ICO, WebP ou componente React instantaneamente." },
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
            <h2 className="text-base font-semibold text-zinc-200">Privacidade em Primeiro Lugar</h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-500">
              <strong className="text-zinc-400">dnnr.dev não envia seus dados para nenhum servidor.</strong>{" "}
              Todo o processamento acontece localmente no seu navegador. Segredos, senhas e dados de clientes nunca saem da sua máquina.
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
            <Asterisk className="h-3 w-3" /> Exceto ferramentas de armazenamento proposital (To-Do, Bookmarks).
          </span>
        </section>


        {/* FAQ */}
        <FAQ />
      </div>
      </div>
    </Fragment>
  );
}
