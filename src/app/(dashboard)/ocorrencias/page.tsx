import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ocorrências',
}

const occurrenceHighlights = [
  'Registro padronizado por data, turno e responsável.',
  'Classificação de prioridade e acompanhamento da resolução.',
  'Consulta rápida do histórico para auditoria interna.',
]

export default function OcorrenciasPage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Registro de ocorrências
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Espaço preparado para documentar incidentes, observações do turno e acompanhamentos
          internos do condomínio.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {occurrenceHighlights.map((highlight) => (
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
