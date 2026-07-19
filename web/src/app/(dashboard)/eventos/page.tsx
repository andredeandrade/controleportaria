import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { RegisterEventButton } from '@/components/eventos/RegisterEventButton'
import { EventsList } from '@/components/eventos/EventsList'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Eventos',
}

export default function EventosPage() {
  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ color: 'grey.900' }}>
          Eventos
        </Typography>

        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <RegisterEventButton />
        </Stack>
      </Stack>

      <EventsList />
    </Stack>
  )
}
