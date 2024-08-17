import '../globals.css'

import { Fragment, ReactNode } from 'react'
import { Sidebar } from '@/components/Sidebar'

export const metadata = {
  title: 'Tools | dnnr.dev',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <div className="relative min-h-screen bg-zinc-900 lg:grid lg:grid-cols-app">
        <Sidebar />
        <main className="max-w-screen px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
          {children}
        </main>
      </div>
    </Fragment>
  )
}
