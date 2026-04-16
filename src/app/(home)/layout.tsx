import "../globals.css";

import { Fragment, ReactNode } from "react";
import { Background } from "@/components/ui/background";
import { Footer } from "@/components/Footer";

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
        <Footer />
      </div>
      <Background />
    </Fragment>
  );
}
