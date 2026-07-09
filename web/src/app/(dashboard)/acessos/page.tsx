import type { Metadata } from 'next'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AccessList } from '@/components/acessos/AccessList'
import { AccessRegisterButton } from '@/components/acessos/AccessRegisterButton'

type AcessosPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const getAccessPageTitle = (status: string | string[] | undefined): string => {
  const normalizedStatus = Array.isArray(status) ? status[0] : status

  return normalizedStatus === 'history' ? 'Histórico de Acessos' : 'Acessos Ativos'
}

export async function generateMetadata({ searchParams }: AcessosPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const pageTitle = getAccessPageTitle(resolvedSearchParams.status)

  return {
    title: pageTitle,
  }
}

export default async function AcessosPage({ searchParams }: AcessosPageProps) {
  const resolvedSearchParams = await searchParams
  const pageTitle = getAccessPageTitle(resolvedSearchParams.status)

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ color: 'grey.900' }}>
          {pageTitle}
        </Typography>

        <Stack
          direction="row"
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <AccessRegisterButton />
        </Stack>
      </Stack>

      <AccessList />
    </Stack>
  )
}
