import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export const metadata: Metadata = {
  title: 'Entrada',
}

export default function EntradaPage() {
  return (
    <Stack spacing={2}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Movimentacoes de entrada
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Fluxo simplificado por enquanto. Vamos construir por etapas.
        </Typography>
      </Paper>

      <Link href="/movimentacoes/entrada/registrar" style={{ textDecoration: 'none', width: 'fit-content' }}>
        <Button variant="contained">Ir para registrar</Button>
      </Link>
    </Stack>
  )
}
