import type { Metadata } from 'next'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AccessList } from '@/modules/acessos/components/AccessList'
import { AccessRegisterButton } from '@/modules/acessos/components/AccessRegisterButton'

export const metadata: Metadata = {
  title: 'Acessos',
}

export default function AcessosPage() {
  return (
    <Stack spacing={6} py={5}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Box>
          <Typography variant="h2" fontWeight={700} color="text.primary">
            Acessos
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: '4px' }}>
            Acompanhe as entradas e saídas registradas na portaria.
          </Typography>
        </Box>

        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <AccessRegisterButton />
        </Stack>
      </Stack>

      <AccessList />
    </Stack>
  )
}
