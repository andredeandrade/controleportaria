'use client'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DownloadIcon from '@mui/icons-material/Download'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { exportReport } from '@/services/relatorios/export'
import type { ReportModuleDef } from '@/services/relatorios/reportDefs'
import { useAppSnackbar } from '@/providers/AppSnackbarProvider'
import type { ReportFormat, ReportsPeriodFilter } from '@/types/relatorios'

type ReportModuleCardProps = {
  def: ReportModuleDef
  total: number | undefined
  isLoading: boolean
  format: ReportFormat
  filter: ReportsPeriodFilter
}

export function ReportModuleCard({ def, total, isLoading, format, filter }: ReportModuleCardProps) {
  const router = useRouter()
  const { showSuccess, showError } = useAppSnackbar()
  const [loading, setLoading] = useState(false)

  const Icon = def.icon

  async function handleExport() {
    setLoading(true)

    try {
      await exportReport(def.key, format, filter)
      showSuccess(`Relatório de ${def.label.toLowerCase()} exportado com sucesso.`)
    } catch {
      showError(`Não foi possível exportar o relatório de ${def.label.toLowerCase()}.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: '12px',
              bgcolor: `${def.color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color: def.color, fontSize: 24 }} />
          </Box>

          <Tooltip title="Abrir módulo">
            <IconButton
              size="small"
              onClick={() => router.push(def.route)}
              aria-label={`Abrir módulo de ${def.label.toLowerCase()}`}
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box>
          <Typography variant="body1" fontWeight={600}>
            {def.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {def.descricao}
          </Typography>
        </Box>

        {isLoading ? (
          <Skeleton variant="text" width={64} height={40} />
        ) : (
          <Typography variant="h2">{total ?? '—'}</Typography>
        )}

        <Button
          variant="outlined"
          size="small"
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <DownloadIcon />}
          disabled={loading}
          onClick={handleExport}
          sx={{ alignSelf: 'flex-start' }}
        >
          Exportar {format}
        </Button>
      </CardContent>
    </Card>
  )
}
