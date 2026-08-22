'use client'

import { AccessListContent } from '@/components/acessos/AccessListContent'
import { AccessListProvider } from '@/components/acessos/providers/AccessListProvider'

export function AccessList() {
  return (
    <AccessListProvider>
      <AccessListContent />
    </AccessListProvider>
  )
}
