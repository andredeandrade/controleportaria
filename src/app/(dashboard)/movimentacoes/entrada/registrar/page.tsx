import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { RegistrarEntradaForm } from '@/components/movimentacoes/entrada/RegistrarEntradaForm'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Registrar Entrada',
}

export default function RegistrarEntradaPage() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
        <BackToPreviousPageButton ariaLabel="Voltar para a pagina anterior" />

        <Typography variant="h6" fontWeight={700} color="inherit">
          Registrar entrada
        </Typography>
      </Stack>

      <RegistrarEntradaForm />
    </Stack>
  )
}
