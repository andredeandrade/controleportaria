'use client'

import { useQuery } from '@tanstack/react-query'

import { getDashboardSummary } from '@/services/relatorios/service'
import type { DashboardSummaryFilter } from '@/types/relatorios'

export function useDashboardSummary(filter?: DashboardSummaryFilter) {
  return useQuery({
    queryKey: ['reports', 'dashboard-summary', filter ?? null],
    queryFn: () => getDashboardSummary(filter),
    staleTime: 60_000,
  })
}
