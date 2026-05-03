import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'
import { RegisterAuthorizationButton } from '@/components/autorizacoes/RegisterAuthorizationButton'
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
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
          <BackToPreviousPageButton ariaLabel="Voltar para a página anterior" />
          <Typography variant="h6" fontWeight={700} color="inherit">
            Autorizações
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          <RegisterAuthorizationButton />
        </Stack>
      </Stack>
      {/* Aqui entrará a lista de autorizações futuramente */}
    </Stack>
  )
}
