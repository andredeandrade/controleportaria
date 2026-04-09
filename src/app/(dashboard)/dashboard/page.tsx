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
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Acesse rapidamente os principais módulos do sistema pela área abaixo.
        </Typography>
      </Paper>

      <DashboardQuickLinks />
    </Stack>
  )
}
