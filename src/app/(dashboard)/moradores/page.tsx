import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moradores',
};

export default function MoradoresPage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Gestão de moradores
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Área pronta para listar unidades, responsáveis e permissões permanentes.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography fontWeight={700}>Próximo passo</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            Integrar tabela, filtros e cadastro de moradores reaproveitando o mesmo layout.
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography fontWeight={700}>Vantagem dessa estrutura</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            Menu lateral e topbar ficam centralizados, sem repetir código nas páginas internas.
          </Typography>
        </Paper>
      </Box>
    </Stack>
  );
}
