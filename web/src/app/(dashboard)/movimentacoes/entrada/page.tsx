import type { Metadata } from 'next'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { EntryMovementsList } from '@/components/movimentacoes/entrada/EntryMovementsList'
import { RegisterEntryButton } from '@/components/movimentacoes/entrada/RegisterEntryButton'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Entrada',
}

export default function EntradaPage() {
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
            Movimentações de entrada
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <RegisterEntryButton />
        </Stack>
      </Stack>

      <EntryMovementsList />
    </Stack>
  )
}
