import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Metadata } from 'next'

import { FormPaper, TextField, TextFieldLabel, TextFieldStack } from '@/components/form'
import { BackToPreviousPageButton } from '@/components/navigation/BackToPreviousPageButton'

export const metadata: Metadata = {
  title: 'Registrar Entrada',
}

export default function RegistrarEntradaPage() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'grey.900' }}>
        <BackToPreviousPageButton ariaLabel="Voltar para a pagina anterior" />

        <Typography variant="h6" fontWeight={700} color="inherit">
          Registrar entrada
        </Typography>
      </Stack>

      <FormPaper>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextFieldStack>
              <TextFieldLabel required>Nome</TextFieldLabel>
              <TextField required />
            </TextFieldStack>
          </Grid>
        </Grid>
      </FormPaper>
    </Stack>
  )
}
