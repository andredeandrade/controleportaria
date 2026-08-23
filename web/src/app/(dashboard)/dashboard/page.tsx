import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { AccessRegisterButton } from '@/modules/acessos/components/AccessRegisterButton'
import { DashboardRecentAccesses } from '@/modules/dashboard/components/DashboardRecentAccesses'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <Stack spacing={6} py={5}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexWrap="wrap"
        spacing={2}
      >
        <Stack spacing={0.5} mb={2}>
          <Typography variant="h2">Dashboard</Typography>
          <Typography variant="body1" color="text.secondary">
            Visão geral de acessos do condomínio.
          </Typography>
        </Stack>

        <AccessRegisterButton size="large" />
      </Stack>

      <DashboardRecentAccesses />
    </Stack>
  )
}
