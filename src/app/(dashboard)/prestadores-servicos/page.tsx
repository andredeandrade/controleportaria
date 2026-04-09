import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prestadores de Serviços',
}

const serviceHighlights = [
  'Cadastro de empresas, responsáveis e documentos obrigatórios.',
  'Controle de acesso recorrente por unidade ou condomínio.',
  'Histórico de visitas técnicas e manutenção preventiva.',
]

export default function PrestadoresServicosPage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Prestadores de serviços
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Página pronta para cadastrar equipes recorrentes, permissões de acesso e dados de contato
          de manutenção.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {serviceHighlights.map((highlight) => (
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
