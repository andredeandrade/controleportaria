import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { BackToPreviousPageButton } from '@/modules/navigation/components/BackToPreviousPageButton'
import { RegisterVisitorForm } from '@/modules/visitantes/components/RegisterVisitorForm'

export const metadata: Metadata = {
  title: 'Cadastrar Visitante',
}

export default function CadastrarVisitantePage() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
        <BackToPreviousPageButton
          ariaLabel="Voltar para a pagina anterior"
          fallbackHref="/visitantes"
        />

        <Typography variant="h6" fontWeight={700} color="inherit">
          Cadastrar visitante
        </Typography>
      </Stack>

      <RegisterVisitorForm />
    </Stack>
  )
}
