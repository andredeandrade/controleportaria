import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { RegisterEventForm } from '@/components/eventos/RegisterEventForm'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Cadastrar Evento',
}

export default function CadastrarEventoPage() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
        <BackToPreviousPageButton
          ariaLabel="Voltar para a pagina anterior"
          fallbackHref="/eventos"
        />

        <Typography variant="h6" fontWeight={700} color="inherit">
          Cadastrar evento
        </Typography>
      </Stack>

      <RegisterEventForm />
    </Stack>
  )
}
