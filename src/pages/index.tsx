import Head from 'next/head';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { DataTable } from '@/components/table/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

type AccessLog = {
  id: string;
  visitante: string;
  unidade: string;
  status: 'Liberado' | 'Pendente';
};

export default function Home() {
  const data = useMemo<AccessLog[]>(
    () => [
      { id: '1', visitante: 'Carlos Almeida', unidade: 'Bloco A - 102', status: 'Liberado' },
      { id: '2', visitante: 'Fernanda Souza', unidade: 'Bloco C - 304', status: 'Pendente' },
      { id: '3', visitante: 'Ricardo Lima', unidade: 'Bloco B - 205', status: 'Liberado' },
    ],
    [],
  );

  const columns = useMemo<ColumnDef<AccessLog>[]>(
    () => [
      {
        accessorKey: 'visitante',
        header: 'Visitante',
      },
      {
        accessorKey: 'unidade',
        header: 'Unidade',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
    ],
    [],
  );

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

            <DataTable data={data} columns={columns} />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
