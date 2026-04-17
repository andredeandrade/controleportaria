import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { RegisterResidentForm } from '@/components/moradores/RegisterResidentForm'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Cadastrar Morador',
}

export default function CadastrarMoradorPage() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
        <BackToPreviousPageButton
          ariaLabel="Voltar para a pagina anterior"
          fallbackHref="/moradores"
        />

        <Typography variant="h6" fontWeight={700} color="inherit">
          Cadastrar morador
        </Typography>
      </Stack>

      <RegisterResidentForm />
    </Stack>
  )
}
