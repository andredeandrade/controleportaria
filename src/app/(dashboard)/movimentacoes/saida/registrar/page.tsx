import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { RegisterExitForm } from '@/components/movimentacoes/saida/RegisterExitForm'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Registrar Saída',
}

export default function RegistrarSaidaPage() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
        <BackToPreviousPageButton ariaLabel="Voltar para a pagina anterior" />

        <Typography variant="h6" fontWeight={700} color="inherit">
          Registrar saída
        </Typography>
      </Stack>

      <RegisterExitForm />
    </Stack>
  )
}
