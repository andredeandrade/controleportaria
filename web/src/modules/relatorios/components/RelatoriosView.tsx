'use client'

import DownloadIcon from '@mui/icons-material/Download'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { ReportModuleCardsGrid } from './ReportModuleCardsGrid'
import { ReportsPeriodFilterCard } from './ReportsPeriodFilterCard'
import { useReportCounts } from '../hooks/useReportCounts'
import { getPeriodLabel } from '../utils/periodLabel'
import { exportAllReports } from '@/services/relatorios/export'
import { useAppSnackbar } from '@/providers/AppSnackbarProvider'
import type { ReportFormat, ReportsPeriodFilter } from '@/types/relatorios'

const DEFAULT_FILTER: ReportsPeriodFilter = { from: '', to: '', shortcut: 'todos' }

export function RelatoriosView() {
  const [filter, setFilter] = useState<ReportsPeriodFilter>(DEFAULT_FILTER)
  const [format, setFormat] = useState<ReportFormat>('CSV')
  const [exportingAll, setExportingAll] = useState(false)

  const { showSuccess, showError } = useAppSnackbar()
  const { counts, isLoading, isError } = useReportCounts(filter)

  const totalGeral = Object.values(counts).reduce((sum, value) => sum + (value ?? 0), 0)

  async function handleExportAll() {
    setExportingAll(true)

    try {
      await exportAllReports(format, filter)
      showSuccess('Relatórios exportados com sucesso.')
    } catch {
      showError('Não foi possível exportar todos os relatórios.')
    } finally {
      setExportingAll(false)
    }
  }

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Relatórios
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Consulte, filtre e exporte os dados operacionais do condomínio por módulo.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={
            exportingAll ? <CircularProgress size={16} color="inherit" /> : <DownloadIcon />
          }
          disabled={exportingAll}
          onClick={handleExportAll}
        >
          Exportar todos
        </Button>
      </Box>

      <ReportsPeriodFilterCard
        filter={filter}
        onChange={setFilter}
        format={format}
        onFormatChange={setFormat}
      />

      <Typography variant="body2" color="text.secondary">
        Período: {getPeriodLabel(filter)} · {totalGeral} registros no total
      </Typography>

      <ReportModuleCardsGrid
        filter={filter}
        format={format}
        counts={counts}
        isLoading={isLoading}
        isError={isError}
      />
    </Stack>
  )
}
