import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visitantes',
};

const entries = [
  { nome: 'Maria Souza', status: 'Aguardando liberação' },
  { nome: 'Equipe de manutenção', status: 'Entrada prevista às 14:00' },
  { nome: 'Carlos Oliveira', status: 'Documento validado' },
];

export default function VisitantesPage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Controle de visitantes
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Área preparada para solicitações, autorizações e histórico de acesso.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography fontWeight={700}>Autorizações do dia</Typography>
        <Stack spacing={1.25} sx={{ mt: 2 }}>
          {entries.map((entry) => (
            <Box
              key={entry.nome}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1,
                px: 1.5,
                py: 1.25,
                borderRadius: 2,
                backgroundColor: 'rgba(148, 163, 184, 0.08)',
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                {entry.nome}
              </Typography>
              <Chip label={entry.status} size="small" color="primary" variant="outlined" />
            </Box>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
