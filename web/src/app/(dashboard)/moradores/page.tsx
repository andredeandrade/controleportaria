import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { ResidentsList } from '@/components/moradores/ResidentsList'
import { RegisterResidentButton } from '@/components/moradores/RegisterResidentButton'

export const metadata: Metadata = {
  title: 'Moradores',
}

export default function MoradoresPage() {
  return (
    <Stack spacing={3} margin="20px 10px">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Box>
          <Typography variant="h2" fontWeight={700} color="text.primary">
            Gestão de Moradores
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: '4px' }}>
            Gerencie os dados e acessos de todos os residentes do condomínio.
          </Typography>
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <RegisterResidentButton />
        </Box>
      </Stack>

      <ResidentsList />
    </Stack>
  )
}
