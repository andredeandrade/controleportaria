import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Relatórios',
}

const reportHighlights = [
  'Filtros por período, tipo de acesso e perfil cadastrado.',
  'Indicadores de fluxo diário e ocorrências registradas.',
  'Base pronta para exportação e auditoria administrativa.',
]

export default function RelatoriosPage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="space-between">
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Relatórios operacionais
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Área destinada a indicadores, históricos e exportações para acompanhamento da rotina
              da portaria.
            </Typography>
          </Box>
          <Chip label="Base pronta" color="primary" variant="outlined" />
        </Stack>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {reportHighlights.map((highlight) => (
          <Paper key={highlight} sx={{ p: 2.5, borderRadius: 3 }}>
            <Typography fontWeight={700}>Próximo passo</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              {highlight}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Stack>
  )
}
