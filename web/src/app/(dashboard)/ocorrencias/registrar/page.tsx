import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'
import { RegisterOccurrenceForm } from '@/components/ocorrencias/RegisterOccurrenceForm'

export const metadata: Metadata = {
  title: 'Registrar Ocorrência',
}

export default function RegistrarOcorrenciaPage() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
        <BackToPreviousPageButton
          ariaLabel="Voltar para a pagina anterior"
          fallbackHref="/ocorrencias"
        />

        <Typography variant="h6" fontWeight={700} color="inherit">
          Registrar ocorrência
        </Typography>
      </Stack>

      <RegisterOccurrenceForm />
    </Stack>
  )
}
