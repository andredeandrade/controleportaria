'use client'

import { AccessListProvider } from '@/components/acessos/providers/AccessListProvider'
import { DashboardRecentAccessesContent } from '@/components/dashboard/DashboardRecentAccessesContent'

export function DashboardRecentAccesses() {
  return (
    <AccessListProvider>
      <DashboardRecentAccessesContent />
    </AccessListProvider>
  )
}
