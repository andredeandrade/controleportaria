import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { DashboardQuickLinks } from '@/components/dashboard/DashboardQuickLinks'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <Stack spacing={3}>
      <DashboardQuickLinks />
    </Stack>
  )
}
