import { Fragment } from "react";
import HomeCard from "./card";

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
  Cpu,
  Database,
  Binary,
  Code2 as Code,
  Asterisk,
  Palette,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const CATEGORIES = [
  {
    title: "Produtividade",
    tools: [
      {
        icon: ListChecks,
        label: "To Do",
        href: "/tools/todo",
        description:
          "Organize suas tarefas e aumente sua produtividade com nossa lista sincronizada.",
      },
      {
        icon: Bookmark,
        label: "Bookmarks",
        href: "/tools/bookmark",
        description:
          "Salve seus links úteis e acesse-os de qualquer lugar com facilidade.",
      },
      {
        icon: AlarmClock,
        label: "Timer",
        href: "/tools/timer",
        description:
          "Um cronômetro preciso para ajudar você a gerenciar seus blocos de foco.",
      },
    ],
  },
  {
    title: "Desenvolvimento",
    tools: [
      {
        icon: Code2,
        label: "JSON",
        href: "/tools/json",
        description:
          "Valide JSON e transforme em interfaces TypeScript automaticamente.",
      },
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
      {
        icon: GitCompare,
        label: "Diff Checker",
        href: "/tools/diffchecker",
        description:
          "Compare versões de texto e identifique mudanças com facilidade.",
      },
      {
        icon: AlarmClock,
        label: "Cron",
        href: "/tools/cron",
        description:
          "Crie e valide expressões cron para seus agendamentos com facilidade.",
      },
    ],
  },
  {
    title: "Geradores",
    tools: [
      {
        icon: Sparkles,
        label: "UUID & Senhas",
        href: "/tools/generators",
        description: "Gere UUIDs aleatórios e senhas seguras instantaneamente.",
      },
    ],
  },
  {
    title: "Manipulação de Dados",
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
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 text-center">
        <div className="mb-2 flex gap-2">
          <span className="flex items-center gap-1 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
            <ShieldCheck className="h-3 w-3" />
            100% privado
          </span>
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
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
      <div className="flex flex-col gap-16">
        {CATEGORIES.map((category) => (
          <section key={category.title} className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h2 className="whitespace-nowrap text-xl font-semibold text-zinc-100">
                {category.title}
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      <div className="mt-24 flex flex-col gap-12 border-t border-zinc-800/50 pt-24 text-zinc-400">
        {/* Highlights Section */}
        <section className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-zinc-100 md:text-4xl">
              Ferramentas Essenciais para Desenvolvedores
            </h2>
            <p className="max-w-2xl text-zinc-500">
              Descubra como nossos utilitários podem acelerar seu processo
              criativo e técnico.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 p-8 transition-all hover:bg-zinc-900/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-200">
                Manipulação de Dados
              </h3>
              <p className="text-sm leading-relaxed">
                Converta CSV para JSON com um clique. Garantimos a integridade
                dos tipos de dados durante a conversão, facilitando a importação
                em bancos ou APIs.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 p-8 transition-all hover:bg-zinc-900/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400">
                <Binary className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-200">
                Encoding e Debugging
              </h3>
              <p className="text-sm leading-relaxed">
                Codificadores Base64 e URI que funcionam offline. Verifique
                headers de autenticação ou URLs complexas sem expor dados
                sensíveis.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 p-8 transition-all hover:bg-zinc-900/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-200">
                Assets e Frontend
              </h3>
              <p className="text-sm leading-relaxed">
                Nossas ferramentas de SVG preparam seus ícones para produção
                instantaneamente, gerando componentes React prontos para uso.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-premium transition-all hover:bg-zinc-900/60 md:p-12">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-500/5 blur-3xl transition-all group-hover:bg-sky-500/10" />
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-zinc-100">
              Por que usar o dnnr.dev?
            </h2>
            <p className="text-sm leading-relaxed md:text-base">
              Como desenvolvedores, frequentemente precisamos de utilitários
              rápidos para converter dados, formatar textos ou debugar códigos.
              O dnnr.dev foi criado para ser o seu canivete suíço digital:
              rápido, sem anúncios intrusivos e, acima de tudo, seguro.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-premium transition-all hover:bg-zinc-900/60 md:p-12">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl transition-all group-hover:bg-emerald-500/10" />
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
              <Cpu className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-zinc-100">
              Produtividade no Workflow
            </h2>
            <p className="text-sm leading-relaxed md:text-base">
              Economize tempo integrando nossas ferramentas no seu dia a dia.
              Seja gerando interfaces TypeScript a partir de um JSON ou
              comparando diffs de código, cada ferramenta foi otimizada para
              oferecer a melhor experiência DX possível.
            </p>
          </div>
        </section>

        {/* Privacy Highlight */}
        <section className="flex flex-col items-center gap-8 rounded-[2rem] border border-zinc-800 bg-zinc-900/40 p-8 text-center shadow-premium transition-all hover:bg-zinc-900/60 md:p-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-zinc-100 md:text-5xl">
              Privacidade em Primeiro Lugar
            </h2>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-lg">
              Diferente de outros sites de utilitários web, o{" "}
              <strong className="text-zinc-100">
                dnnr.dev não envia seus dados para nenhum servidor
              </strong>
              . Todo o processamento acontece localmente no seu navegador. Isso
              significa que segredos, senhas e dados de clientes nunca saem da
              sua máquina.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {["No Server Processing", "No Tracking", "Open Source Spirit"].map(
              (tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-400 transition-all hover:bg-sky-500/20"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                  {tag}
                </span>
              )
            )}
          </div>

          <Separator />

          <span className="flex items-center gap-2 rounded-full text-xs text-neutral-600">
            <Asterisk className="h-4 w-4" /> Exceto em ferramentas de
            armazenamento proposital, como To-Do e Bookmarks.
          </span>
        </section>
      </div>
    </div>
  );
}
