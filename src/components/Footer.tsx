import { Linkedin, Youtube, Github, Globe, ExternalLink } from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/dnnr/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://www.youtube.com/@devdenegociosmg",
    icon: Youtube,
    label: "YouTube",
  },
  {
    href: "https://github.com/dennergazevedo",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://dnnr.dev",
    icon: Globe,
    label: "Portfolio",
  },
];

const FEATURED_PROJECTS = [
  {
    name: "Divisor",
    href: "https://divisor.dev",
    description: "A/B testing without complexity. Open source.",
  },
  {
    name: "Janelas XD",
    href: "https://os.dnnr.dev",
    description: "Portfolio com temática Windows XP. Pura nostalgia.",
  },
  {
    name: "dnews",
    href: "https://news.dnnr.dev",
    description: "Notícias de Tech, Curadas por IA. Seu jornal digital.",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-800/50 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 lg:px-8">
        {/* Social links */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            Find me online
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-500 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

        {/* Featured projects */}
        <div className="flex flex-col gap-3">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-neutral-600">
            Other projects
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {FEATURED_PROJECTS.map((project) => (
              <a
                key={project.href}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-neutral-800/60 bg-neutral-900/30 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-800/50"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-sm font-semibold text-neutral-300 transition-colors group-hover:text-amber-400">
                    {project.name}
                  </span>
                  <span className="text-xs leading-relaxed text-neutral-500">
                    {project.description}
                  </span>
                </div>
                <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-700 transition-colors group-hover:text-amber-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Direitos reservados. Feito por{" "}
          <a
            href="https://dnnr.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-neutral-800 font-medium text-neutral-300 transition-colors hover:border-amber-500/50 hover:text-amber-400"
          >
            dnnr.dev
          </a>
        </p>
      </div>
    </footer>
  );
}
