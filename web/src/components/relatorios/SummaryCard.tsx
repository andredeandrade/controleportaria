'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import type { SvgIconComponent } from '@mui/icons-material'

interface SummaryCardProps {
  label: string
  value: number | undefined
  isLoading: boolean
  icon: SvgIconComponent
  color?: string
  /** Quando true, exibe badge "Total geral" indicando que não há filtro de data */
  isTotal?: boolean
}

export function SummaryCard({
  label,
  value,
  isLoading,
  icon: Icon,
  color = 'primary.main',
  isTotal = false,
}: SummaryCardProps) {
  return (
    <Card sx={{ borderRadius: 3, height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {label}
            </Typography>

            {isLoading ? (
              <Skeleton variant="text" width={64} height={48} sx={{ mt: 0.5 }} />
            ) : (
              <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>
                {value ?? '—'}
              </Typography>
            )}

            {isTotal && (
              <Tooltip title="Contagem total de registros, sem filtro de período">
                <Chip
                  label="Total geral"
                  size="small"
                  variant="outlined"
                  sx={{ mt: 1, fontSize: '0.7rem' }}
                />
              </Tooltip>
            )}
          </Box>

          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: `${color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color, fontSize: 28 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
