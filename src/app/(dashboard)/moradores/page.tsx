import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { RegisterResidentButton } from '@/components/moradores/RegisterResidentButton'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Moradores',
}

export default function MoradoresPage() {
  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
          <BackToPreviousPageButton ariaLabel="Voltar para a pagina anterior" />

          <Typography variant="h6" fontWeight={700} color="inherit">
            Moradores
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <RegisterResidentButton />
        </Stack>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 720 }}>
        Cadastre moradores com dados de unidade, vínculo e contato, seguindo o mesmo padrão dos
        formulários já usados no fluxo de movimentações.
      </Typography>
    </Stack>
  )
}
