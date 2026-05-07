import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { RegisterAuthorizationForm } from '@/components/autorizacoes/RegisterAuthorizationForm'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Nova autorização',
}

export default function RegisterAuthorizationPage() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
        <BackToPreviousPageButton ariaLabel="Voltar para a página de autorizações" />
        <Typography variant="h6" fontWeight={700} color="inherit">
          Nova autorização
        </Typography>
      </Stack>
      <RegisterAuthorizationForm />
    </Stack>
  )
}
