'use client'

import { AppReactQueryProvider } from './AppReactQueryProvider'
import { AppThemeProvider } from './AppThemeProvider'
import type { ReactNode } from 'react'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AppReactQueryProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </AppReactQueryProvider>
  )
}
