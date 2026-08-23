import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { BackToPreviousPageButton } from '@/modules/navigation/components/BackToPreviousPageButton'
import { VisitorsList } from '@/modules/visitantes/components/VisitorsList'
import { RegisterVisitorButton } from '@/modules/visitantes/components/RegisterVisitorButton'

export const metadata: Metadata = {
  title: 'Visitantes',
}

export default function VisitantesPage() {
  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ color: 'grey.900' }}>
          Visitantes
        </Typography>

        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <RegisterVisitorButton />
        </Stack>
      </Stack>

      <VisitorsList />
    </Stack>
  )
}
