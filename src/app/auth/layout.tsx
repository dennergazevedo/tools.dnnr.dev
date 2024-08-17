import '../globals.css'

import { ReactNode } from 'react'

export const metadata = {
  title: 'Tools | dnnr.dev',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-zinc-900">
      <main className="flex w-full items-center justify-center p-4">
        {children}
      </main>
    </div>
  )
}
