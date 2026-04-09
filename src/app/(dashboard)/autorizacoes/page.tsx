import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autorizações',
}

const authorizationHighlights = [
  'Autorização por morador, unidade ou evento específico.',
  'Validade configurável para acessos temporários.',
  'Consulta rápida para aprovação no momento da entrada.',
]

export default function AutorizacoesPage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Autorizações de acesso
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Página preparada para centralizar liberações antecipadas, permissões temporárias e
          validações da portaria.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {authorizationHighlights.map((highlight) => (
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
