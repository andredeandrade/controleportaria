import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'
import { RegisterOccurrenceButton } from '@/components/ocorrencias/RegisterOccurrenceButton'

export const metadata: Metadata = {
  title: 'Ocorrências',
}

export default function OcorrenciasPage() {
  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
          <BackToPreviousPageButton ariaLabel="Voltar para a pagina anterior" />

          <Typography variant="h6" fontWeight={700} color="inherit">
            Ocorrências
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <RegisterOccurrenceButton />
        </Stack>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 720 }}>
        Registre ocorrências com classificação, data, hora e relato detalhado para apoiar o
        acompanhamento operacional da portaria.
      </Typography>
    </Stack>
  )
}
