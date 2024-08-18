import './globals.css'

import { ReactNode } from 'react'
import { Ubuntu } from 'next/font/google'
import { Toaster } from 'sonner'
import { AuthContextProvider } from './auth/context'

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ['latin'],
  preload: true
})

export const metadata = {
  title: 'dnnr.dev',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={ubuntu.className}>
        <AuthContextProvider>
          <Toaster />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
