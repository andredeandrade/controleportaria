'use client'

import Stack from '@mui/material/Stack'
import { useState } from 'react'

import type { DashboardSummaryFilter } from '@/types/relatorios'
import { ReportsDateFilter } from './ReportsDateFilter'
import { ReportListings } from './ReportListings'
import { ReportsSummaryCards } from './ReportsSummaryCards'

export function RelatoriosView() {
  const [filter, setFilter] = useState<DashboardSummaryFilter | undefined>(undefined)

  return (
    <Stack spacing={3}>
      <ReportsDateFilter filter={filter} onChange={setFilter} />
      <ReportsSummaryCards filter={filter} />
      <ReportListings />
    </Stack>
  )
}
