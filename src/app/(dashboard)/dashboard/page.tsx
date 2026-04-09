import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const indicators = [
  { label: 'Entradas hoje', value: '128', helper: '+14 vs turno anterior' },
  { label: 'Visitantes aguardando', value: '06', helper: '2 com prioridade' },
  { label: 'Entregas recebidas', value: '09', helper: '4 para retirada' },
];

export default function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {indicators.map((item) => (
          <Paper key={item.label} sx={{ p: 2.5, borderRadius: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
              {item.value}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
              {item.helper}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="space-between">
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Operação do dia
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Resumo rápido do que está acontecendo na portaria.
            </Typography>
          </Box>
          <Chip label="Turno da manhã" color="primary" variant="outlined" />
        </Stack>

        <Typography sx={{ mt: 2.5, color: 'text.secondary', lineHeight: 1.7 }}>
          Essa página já está usando o layout autenticado com sidebar e topbar, seguindo a
          estrutura oficial do `App Router`.
        </Typography>
      </Paper>
    </Stack>
  );
}
