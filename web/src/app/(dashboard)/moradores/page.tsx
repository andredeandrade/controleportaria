import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { ResidentsList } from '@/components/moradores/ResidentsList'
import { RegisterResidentButton } from '@/components/moradores/RegisterResidentButton'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Moradores',
}

export default function MoradoresPage() {
  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ color: 'grey.900' }}>
          Moradores
        </Typography>

        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <RegisterResidentButton />
        </Stack>
      </Stack>

      <ResidentsList />
    </Stack>
  )
}
