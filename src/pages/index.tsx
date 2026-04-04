import Head from 'next/head';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Head>
        <title>Controle Portaria</title>
        <meta name="description" content="Sistema de gestão de entrada e saída em portarias" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Stack spacing={3}>
            <Typography variant="h3" component="h1" fontWeight={700}>
              Controle Portaria
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Base do projeto pronta com Next.js + TypeScript + Material UI para iniciar as
              features.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" size="large">
                Iniciar desenvolvimento
              </Button>
              <Button variant="outlined" size="large">
                Ver documentação
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
