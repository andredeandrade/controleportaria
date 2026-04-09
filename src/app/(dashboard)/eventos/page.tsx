import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eventos',
}

const eventHighlights = [
  'Agenda de eventos com horários e responsáveis.',
  'Lista de convidados e autorizações vinculadas ao evento.',
  'Checklist operacional para apoio da equipe da portaria.',
]

export default function EventosPage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Eventos e agenda operacional
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Área reservada para apoiar festas, reservas, mudanças e outras movimentações especiais
          acompanhadas pela portaria.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {eventHighlights.map((highlight) => (
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
