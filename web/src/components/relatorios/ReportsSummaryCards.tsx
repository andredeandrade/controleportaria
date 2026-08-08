'use client'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import { SummaryCard } from './SummaryCard'
import { useDashboardSummary } from './hooks/useDashboardSummary'
import type { DashboardSummaryFilter } from '@/types/relatorios'

interface ReportsSummaryCardsProps {
  filter?: DashboardSummaryFilter
}

export function ReportsSummaryCards({ filter }: ReportsSummaryCardsProps) {
  const { data, isLoading, isError } = useDashboardSummary(filter)

  if (isError) {
    return (
      <Alert severity="error" sx={{ borderRadius: 3 }}>
        Não foi possível carregar os indicadores. Tente novamente.
      </Alert>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
      }}
    >
      <SummaryCard
        label="Acessos ativos agora"
        value={data?.totalActiveAccesses}
        isLoading={isLoading}
        icon={AccessTimeIcon}
        color="success.main"
      />
      <SummaryCard
        label="Autorizações"
        value={data?.totalAuthorizations}
        isLoading={isLoading}
        icon={AssignmentIndIcon}
        color="secondary.main"
      />
      <SummaryCard
        label="Ocorrências"
        value={data?.totalIncidents}
        isLoading={isLoading}
        icon={ReportProblemIcon}
        color="error.main"
      />
      <SummaryCard
        label="Moradores"
        value={data?.totalResidents}
        isLoading={isLoading}
        icon={HomeIcon}
        color="primary.main"
        isTotal
      />
      <SummaryCard
        label="Visitantes"
        value={data?.totalVisitors}
        isLoading={isLoading}
        icon={PeopleIcon}
        color="info.main"
        isTotal
      />
      <SummaryCard
        label="Prestadores de serviço"
        value={data?.totalServiceProviders}
        isLoading={isLoading}
        icon={BusinessCenterIcon}
        color="warning.main"
        isTotal
      />
    </Box>
  )
}
