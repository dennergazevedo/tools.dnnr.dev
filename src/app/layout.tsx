import "./globals.css";

import Script from "next/script";
import { ReactNode } from "react";
import { Ubuntu } from "next/font/google";
import { Toaster } from "sonner";
import { AuthContextProvider } from "./auth/context";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: true,
});

export const metadata = {
  title: "dnnr.dev",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${ubuntu.className} min-h-screen`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PR3L6CCNJE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PR3L6CCNJE');
          `}
        </Script>
        <AuthContextProvider>
          <Toaster />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
