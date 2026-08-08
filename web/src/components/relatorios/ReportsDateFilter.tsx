'use client'

import ClearIcon from '@mui/icons-material/Clear'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import type { DashboardSummaryFilter } from '@/types/relatorios'

interface ReportsDateFilterProps {
  filter: DashboardSummaryFilter | undefined
  onChange: (filter: DashboardSummaryFilter | undefined) => void
}

export function ReportsDateFilter({ filter, onChange }: ReportsDateFilterProps) {
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)
  const currentMonthStr = today.toISOString().slice(0, 7)

  function handleTypeChange(_: React.MouseEvent, type: 'day' | 'month' | null) {
    if (!type) {
      onChange(undefined)
      return
    }

    const value = type === 'day' ? todayStr : currentMonthStr
    onChange({ type, value })
  }

  function handleValueChange(value: string) {
    if (!filter) return
    onChange({ ...filter, value })
  }

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonthIcon fontSize="small" color="action" />
          <Typography variant="body2" fontWeight={600} color="text.secondary">
            Filtrar acessos, ocorrências e autorizações por:
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={filter?.type ?? null}
            onChange={handleTypeChange}
          >
            <ToggleButton value="day">Dia</ToggleButton>
            <ToggleButton value="month">Mês</ToggleButton>
          </ToggleButtonGroup>

          {filter?.type === 'day' && (
            <TextField
              type="date"
              size="small"
              value={filter.value}
              inputProps={{ max: todayStr }}
              onChange={(e) => handleValueChange(e.target.value)}
              sx={{ width: 160 }}
            />
          )}

          {filter?.type === 'month' && (
            <TextField
              type="month"
              size="small"
              value={filter.value}
              inputProps={{ max: currentMonthStr }}
              onChange={(e) => handleValueChange(e.target.value)}
              sx={{ width: 140 }}
            />
          )}

          {filter && (
            <Tooltip title="Remover filtro">
              <IconButton size="small" onClick={() => onChange(undefined)}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {!filter && (
            <Chip
              label="Sem filtro — exibindo todos os registros"
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </Box>
    </Paper>
  )
}
