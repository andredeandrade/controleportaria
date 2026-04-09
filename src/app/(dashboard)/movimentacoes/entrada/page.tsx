import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrada',
}

const entryHighlights = [
  'Cadastro ágil na guarita com dados essenciais.',
  'Validação de autorização e documentos no momento da entrada.',
  'Histórico do turno visível para acompanhamento operacional.',
]

export default function EntradaPage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="space-between">
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Controle de entrada
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Área preparada para registrar acessos de moradores, visitantes e prestadores com
              validação rápida na portaria.
            </Typography>
          </Box>
          <Chip label="Próxima entrega" color="primary" variant="outlined" />
        </Stack>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {entryHighlights.map((highlight) => (
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
