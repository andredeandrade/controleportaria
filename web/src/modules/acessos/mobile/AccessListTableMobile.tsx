'use client'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useAccessListContext } from '@/modules/acessos/context/AccessListContext'
import { MobileRegisterExitButton } from '@/modules/acessos/styles/AccessStyles'
import { MobileListCard, MobileFieldLabel } from '@/styles/MobileList.styles'

const categoryChipColor: Record<string, { bg: string; color: string }> = {
  morador: { bg: 'rgba(52, 211, 153, 0.16)', color: '#34d399' },
  visitante: { bg: 'rgba(96, 165, 250, 0.16)', color: '#60a5fa' },
  prestador_servico: { bg: 'rgba(251, 191, 36, 0.16)', color: '#fbbf24' },
  colaborador: { bg: 'rgba(255, 255, 255, 0.08)', color: '#9aa1ab' },
}

const DEFAULT_CATEGORY_CHIP_COLOR = { bg: 'rgba(255, 255, 255, 0.08)', color: '#9aa1ab' }

export function AccessListTableMobile() {
  const {
    records,
    showExitActions: showActions,
    handleOpenExitConfirmation: onRegisterExit,
  } = useAccessListContext()

  return (
    <Stack spacing={1.5}>
      {records.map((record) => (
        <MobileListCard key={record.id} variant="outlined" sx={{ p: 5 }}>
          <Stack spacing={2}>
            <Stack spacing={0.5}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={1}
              >
                <Typography variant="body1" fontWeight={700} color="text.primary">
                  {record.name}
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ flexWrap: 'wrap', rowGap: 0.5, justifyContent: 'flex-end' }}
                >
                  {record.categoryUnits.map((categoryUnit) => {
                    const chipColor =
                      categoryChipColor[categoryUnit.category] ?? DEFAULT_CATEGORY_CHIP_COLOR

                    return (
                      <Chip
                        key={categoryUnit.id}
                        label={categoryUnit.categoryLabel}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          backgroundColor: chipColor.bg,
                          color: chipColor.color,
                          border: 'none',
                        }}
                      />
                    )
                  })}
                </Stack>
              </Stack>

              {record.categoryUnits.length === 1 ? (
                record.categoryUnits[0].unit ? (
                  <Typography variant="body2" color="text.secondary">
                    {record.categoryUnits[0].unit}
                  </Typography>
                ) : null
              ) : (
                <Stack spacing={0.25}>
                  {record.categoryUnits.map((categoryUnit) => (
                    <Typography key={categoryUnit.id} variant="body2" color="text.secondary">
                      {categoryUnit.label}
                    </Typography>
                  ))}
                </Stack>
              )}
            </Stack>

            <Divider sx={{ borderColor: 'divider' }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Entrada</MobileFieldLabel>
                <Typography variant="body2" color="text.primary">
                  {record.entryAt}
                </Typography>
              </Stack>

              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Saída</MobileFieldLabel>
                <Typography variant="body2" color="text.primary">
                  {record.exitAt}
                </Typography>
              </Stack>

              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Locomoção</MobileFieldLabel>
                <Typography variant="body2" color="text.primary">
                  {record.locomotion}
                </Typography>
              </Stack>

              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Placa</MobileFieldLabel>
                <Typography variant="body2" color="text.primary">
                  {record.plate}
                </Typography>
              </Stack>
            </Box>

            {showActions && !record.hasExited ? (
              <MobileRegisterExitButton
                variant="outlined"
                size="small"
                onClick={() => onRegisterExit(record)}
              >
                Registrar Saída
              </MobileRegisterExitButton>
            ) : null}
          </Stack>
        </MobileListCard>
      ))}
    </Stack>
  )
}
