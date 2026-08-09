import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'
import { RegisterAuthorizationButton } from '@/components/autorizacoes/RegisterAuthorizationButton'
import { AuthorizationsList } from '@/components/autorizacoes/AuthorizationsList'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Autorizações',
}

export default function AutorizacoesPage() {
  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ color: 'grey.900' }}>
          Autorizações
        </Typography>

        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          <RegisterAuthorizationButton />
        </Stack>
      </Stack>
      <AuthorizationsList />
    </Stack>
  )
}
