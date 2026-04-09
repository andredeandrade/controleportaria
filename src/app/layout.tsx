import '@/styles/globals.css'
import { AppProviders } from '@/providers'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Controle Portaria',
    template: '%s | Controle Portaria',
  },
  description: 'Sistema de gestão de entrada e saída em portarias',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
