'use client'

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import type { SvgIconComponent } from '@mui/icons-material'
import { useState } from 'react'

import {
  exportAcessosPdf,
  exportAutorizacoesPdf,
  exportMoradoresPdf,
  exportOcorrenciasPdf,
  exportPrestadoresPdf,
  exportVisitantesPdf,
} from '@/services/relatorios/pdf'

interface ReportEntry {
  key: string
  label: string
  description: string
  icon: SvgIconComponent
  color: string
  onExport: () => Promise<void>
}

const REPORT_ENTRIES: ReportEntry[] = [
  {
    key: 'acessos',
    label: 'Registro de acessos',
    description: 'Histórico completo de entradas e saídas pela portaria.',
    icon: SwapHorizIcon,
    color: 'success.main',
    onExport: exportAcessosPdf,
  },
  {
    key: 'autorizacoes',
    label: 'Registro de autorizações',
    description: 'Autorizações de entrada emitidas para visitantes e prestadores.',
    icon: AssignmentIndIcon,
    color: 'secondary.main',
    onExport: exportAutorizacoesPdf,
  },
  {
    key: 'ocorrencias',
    label: 'Registro de ocorrências',
    description: 'Ocorrências e incidentes registrados na portaria.',
    icon: ReportProblemIcon,
    color: 'error.main',
    onExport: exportOcorrenciasPdf,
  },
  {
    key: 'moradores',
    label: 'Registro de moradores',
    description: 'Cadastro completo dos moradores do condomínio.',
    icon: HomeIcon,
    color: 'primary.main',
    onExport: exportMoradoresPdf,
  },
  {
    key: 'visitantes',
    label: 'Registro de visitantes',
    description: 'Cadastro de visitantes registrados no sistema.',
    icon: PeopleIcon,
    color: 'info.main',
    onExport: exportVisitantesPdf,
  },
  {
    key: 'prestadores',
    label: 'Registro de prestadores de serviço',
    description: 'Cadastro de prestadores de serviço e empresas terceirizadas.',
    icon: BusinessCenterIcon,
    color: 'warning.main',
    onExport: exportPrestadoresPdf,
  },
]

function ReportRow({ entry }: { entry: ReportEntry }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleExport() {
    setLoading(true)
    setError(null)

    try {
      await entry.onExport()
    } catch {
      setError('Não foi possível gerar o PDF. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const Icon = entry.icon

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          py: 1.5,
          px: 0.5,
        }}
      >
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: `${entry.color}18`,
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <Icon sx={{ color: entry.color, fontSize: 22 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body1" fontWeight={600}>
            {entry.label}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {entry.description}
          </Typography>
        </Box>

        <Tooltip title="Exportar PDF">
          <span>
            <IconButton
              onClick={handleExport}
              disabled={loading}
              color="error"
              size="small"
              sx={{ flexShrink: 0 }}
            >
              {loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <PictureAsPdfIcon fontSize="small" />
              )}
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}

export function ReportListings() {
  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          Exportar relatórios
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Clique no ícone PDF para baixar o relatório completo de cada módulo.
        </Typography>
      </Box>

      <Box sx={{ px: 2 }}>
        {REPORT_ENTRIES.map((entry, index) => (
          <Box key={entry.key}>
            <ReportRow entry={entry} />
            {index < REPORT_ENTRIES.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      <Box sx={{ pb: 1 }} />
    </Paper>
  )
}
