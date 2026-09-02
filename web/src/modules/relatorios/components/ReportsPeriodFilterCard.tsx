'use client'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { TextField } from '@/modules/form'
import { useAppSnackbar } from '@/providers/AppSnackbarProvider'
import type { ReportFormat, ReportPeriodShortcut, ReportsPeriodFilter } from '@/types/relatorios'

const SHORTCUTS: Array<{ value: ReportPeriodShortcut; label: string }> = [
  { value: 'hoje', label: 'Hoje' },
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: 'mes', label: 'Este mês' },
  { value: 'todos', label: 'Todo o período' },
]

const FORMAT_OPTIONS: Array<{ value: ReportFormat; label: string }> = [
  { value: 'CSV', label: 'CSV' },
  { value: 'XLSX', label: 'XLSX' },
  { value: 'PDF', label: 'PDF' },
]

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function shortcutToRange(shortcut: ReportPeriodShortcut): { from: string; to: string } {
  const today = new Date()

  if (shortcut === 'hoje') {
    const todayIso = toIsoDate(today)
    return { from: todayIso, to: todayIso }
  }

  if (shortcut === '7') {
    const from = new Date(today)
    from.setDate(from.getDate() - 6)
    return { from: toIsoDate(from), to: toIsoDate(today) }
  }

  if (shortcut === '30') {
    const from = new Date(today)
    from.setDate(from.getDate() - 29)
    return { from: toIsoDate(from), to: toIsoDate(today) }
  }

  if (shortcut === 'mes') {
    const from = new Date(today.getFullYear(), today.getMonth(), 1)
    return { from: toIsoDate(from), to: toIsoDate(today) }
  }

  return { from: '', to: '' }
}

const EMPTY_FILTER: ReportsPeriodFilter = { from: '', to: '', shortcut: 'todos' }

type ReportsPeriodFilterCardProps = {
  filter: ReportsPeriodFilter
  onChange: (filter: ReportsPeriodFilter) => void
  format: ReportFormat
  onFormatChange: (format: ReportFormat) => void
}

export function ReportsPeriodFilterCard({
  filter,
  onChange,
  format,
  onFormatChange,
}: ReportsPeriodFilterCardProps) {
  const { showSuccess } = useAppSnackbar()
  // Rascunho local: o filtro só é propagado ao clicar em "Aplicar", para permitir
  // ajustar data inicial/final sem disparar buscas a cada tecla digitada.
  const [draft, setDraft] = useState<ReportsPeriodFilter>(filter)

  function handleShortcutClick(shortcut: ReportPeriodShortcut) {
    const range = shortcutToRange(shortcut)
    setDraft({ ...range, shortcut })
  }

  function handleClear() {
    setDraft(EMPTY_FILTER)
    onChange(EMPTY_FILTER)
  }

  function handleApply() {
    onChange(draft)
    showSuccess('Filtro aplicado.')
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2.5}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonthIcon fontSize="small" color="action" />
          <Typography variant="subtitle1" fontWeight={700}>
            Filtro de Período
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: { xs: 'stretch', sm: 'flex-end' },
          }}
        >
          <Stack spacing={1} sx={{ width: { xs: '100%', sm: 180 } }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Data inicial
            </Typography>
            <TextField
              type="date"
              value={draft.from}
              onChange={(e) => setDraft({ from: e.target.value, to: draft.to, shortcut: null })}
            />
          </Stack>

          <Stack spacing={1} sx={{ width: { xs: '100%', sm: 180 } }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Data final
            </Typography>
            <TextField
              type="date"
              value={draft.to}
              onChange={(e) => setDraft({ from: draft.from, to: e.target.value, shortcut: null })}
            />
          </Stack>

          <Stack spacing={1} sx={{ width: { xs: '100%', sm: 160 } }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Formato de exportação
            </Typography>
            <TextField
              select
              value={format}
              onChange={(e) => onFormatChange(e.target.value as ReportFormat)}
            >
              {FORMAT_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {SHORTCUTS.map((shortcut) => (
            <Chip
              key={shortcut.value}
              label={shortcut.label}
              color="primary"
              variant={draft.shortcut === shortcut.value ? 'filled' : 'outlined'}
              onClick={() => handleShortcutClick(shortcut.value)}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={handleClear}>
            Limpar
          </Button>
          <Button variant="contained" onClick={handleApply}>
            Aplicar
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}
