import "../globals.css";

import { Fragment, ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Background } from "@/components/ui/background";

export const metadata = {
  title: "Tools | dnnr.dev",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="mx-auto max-w-7xl flex-1 px-4 pb-12 pt-24 lg:px-8 lg:pt-16">
          {children}
        </main>

        <footer className="border-t border-neutral-800/50 py-8 text-center text-sm text-neutral-500">
          <p>
            © {new Date().getFullYear()} Direitos reservados. Feito por{" "}
            <a
              href="https://dnnr.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer border-b border-neutral-800 font-medium text-neutral-300 transition-colors hover:border-amber-500/50 hover:text-amber-400"
            >
              dnnr.dev
            </a>
          </p>
        </footer>
      </div>
      <Background />
    </Fragment>
  );
}
