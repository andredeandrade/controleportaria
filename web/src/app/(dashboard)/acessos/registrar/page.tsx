import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { AccessRegisterForm } from '@/components/acessos/AccessRegisterForm'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Registrar Acesso',
}

export default function AcessoRegistrarPage() {
  return (
    <Stack spacing={6} py={5}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <BackToPreviousPageButton
            ariaLabel="Voltar para a pagina anterior"
            fallbackHref="/acessos"
          />

          <Typography variant="h2" fontWeight={700} color="text.primary">
            Registrar Acesso
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Identifique a categoria e preencha os dados para registrar o acesso.
        </Typography>
      </Stack>

      <AccessRegisterForm />
    </Stack>
  )
}
