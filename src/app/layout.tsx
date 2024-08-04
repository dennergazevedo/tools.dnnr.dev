import './globals.css'

import { ReactNode } from 'react'
import { Ubuntu } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ['latin'],
  preload: true
})

export const metadata = {
  title: 'Tools | dnnr.dev',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={ubuntu.className}>
        <div className="relative min-h-screen dark:bg-zinc-900 lg:grid lg:grid-cols-app">
          <Sidebar />

          <main className="max-w-screen px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
