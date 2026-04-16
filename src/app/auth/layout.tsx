import '../globals.css'

import { ReactNode } from 'react'

export const metadata = {
  title: 'Auth | dnnr.dev',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-neutral-950">
      <main className="flex flex-col w-full min-h-screen items-center justify-center p-4 text-neutral-100">
        {children}
      </main>
    </div>
  )
}
