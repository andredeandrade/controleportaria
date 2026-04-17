import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'
import { RegisterVisitorButton } from '@/components/visitantes/RegisterVisitorButton'

export const metadata: Metadata = {
  title: 'Visitantes',
}

export default function VisitantesPage() {
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
            Visitantes
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <RegisterVisitorButton />
        </Stack>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 720 }}>
        Cadastre visitantes com dados de identificação, unidade relacionada e responsável pela
        autorização, seguindo o mesmo padrão dos formulários do projeto.
      </Typography>
    </Stack>
  )
}
