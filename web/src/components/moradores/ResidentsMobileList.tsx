'use client'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

import { MobileListCard } from '@/styles/MobileList.styles'
import { ResidentRelationEnum } from '@/types/moradores'
import type { ResidentRecord } from '@/types/moradores'

type ResidentsMobileListProps = {
  records: ResidentRecord[]
}

function formatVehicles(vehicles: ResidentRecord['vehicles']) {
  if (vehicles.length === 0) return 'Sem veículo'
  return vehicles.map((v) => v.plate).join(', ')
}

const relationChipColor: Record<string, { bg: string; color: string }> = {
  [ResidentRelationEnum.PROPRIETARIO]: { bg: 'rgba(78, 222, 163, 0.16)', color: '#4edea3' },
  [ResidentRelationEnum.INQUILINO]: { bg: 'rgba(173, 198, 255, 0.16)', color: '#adc6ff' },
  [ResidentRelationEnum.DEPENDENTE]: { bg: 'rgba(255, 185, 95, 0.16)', color: '#ffb95f' },
}

export function ResidentsMobileList({ records }: ResidentsMobileListProps) {
  if (records.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
        Nenhum morador encontrado.
      </Typography>
    )
  }

  return (
    <Stack spacing={1.5}>
      {records.map((record) => {
        const chipStyle = relationChipColor[record.relation.toLowerCase()] ?? {
          bg: 'rgba(173, 198, 255, 0.12)',
          color: '#adc6ff',
        }

        return (
          <MobileListCard key={record.id} variant="outlined">
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ color: '#dae2fd', mb: '4px' }}>
                  {record.name}
                </Typography>

                <Typography variant="caption" sx={{ color: '#8c909f', display: 'block' }}>
                  {record.unit}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: '8px' }}>
                  <Chip
                    label={record.relation}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      backgroundColor: chipStyle.bg,
                      color: chipStyle.color,
                      border: 'none',
                    }}
                  />
                </Stack>

                {record.vehicles.length > 0 && (
                  <Typography
                    variant="caption"
                    sx={{ color: '#8c909f', display: 'block', mt: '6px' }}
                  >
                    Veículo: {formatVehicles(record.vehicles)}
                  </Typography>
                )}
              </Box>

              <IconButton
                component={Link}
                href={`/moradores/${record.id}/editar`}
                size="small"
                aria-label="Editar morador"
                sx={{
                  color: '#8c909f',
                  flexShrink: 0,
                  '&:hover': { color: '#adc6ff', backgroundColor: 'rgba(173, 198, 255, 0.08)' },
                }}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </MobileListCard>
        )
      })}
    </Stack>
  )
}
