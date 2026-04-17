import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'
import { RegisterServiceProviderForm } from '@/components/prestadores-servicos/RegisterServiceProviderForm'

export const metadata: Metadata = {
  title: 'Cadastrar Prestador de Serviços',
}

export default function CadastrarPrestadorServicosPage() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
        <BackToPreviousPageButton
          ariaLabel="Voltar para a pagina anterior"
          fallbackHref="/prestadores-servicos"
        />

        <Typography variant="h6" fontWeight={700} color="inherit">
          Cadastrar prestador de serviços
        </Typography>
      </Stack>

      <RegisterServiceProviderForm />
    </Stack>
  )
}
