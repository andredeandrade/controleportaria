import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'
import { RelatoriosView } from '@/modules/relatorios/components/RelatoriosView'

export const metadata: Metadata = {
  title: 'Relatórios',
}

export default function RelatoriosPage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Relatórios operacionais
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Indicadores com filtro de data para acessos, ocorrências e autorizações. Moradores,
          visitantes e prestadores exibem o total geral do sistema.
        </Typography>
      </Paper>

      <RelatoriosView />
    </Stack>
  )
}
