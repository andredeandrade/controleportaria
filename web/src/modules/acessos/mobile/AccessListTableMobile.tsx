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
    <Stack spacing={3}>
      {records.map((record) => {
        const units = Array.from(
          new Set(
            record.categoryUnits
              .map((categoryUnit) => categoryUnit.unit)
              .filter((unit): unit is string => Boolean(unit)),
          ),
        )

        return (
          <MobileListCard key={record.id} variant="outlined" sx={{ p: 5 }}>
            <Stack spacing={5}>
              <Stack spacing={0.5}>
                <Stack spacing={0.75}>
                  {record.categoryUnits.map((categoryUnit) => {
                    const chipColor =
                      categoryChipColor[categoryUnit.category] ?? DEFAULT_CATEGORY_CHIP_COLOR
                    const personName =
                      record.people.find((person) => person.id === categoryUnit.id)?.name ?? '-'

                    return (
                      <Stack
                        key={categoryUnit.id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                      >
                        <Typography variant="body1" fontWeight={700} color="text.primary">
                          {personName}
                        </Typography>
                        <Chip
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
                      </Stack>
                    )
                  })}
                </Stack>

                {units.length > 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Unidade: {units.join(', ')}
                  </Typography>
                ) : null}
              </Stack>

              <Divider sx={{ borderColor: 'divider' }} />

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
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
                  size="medium"
                  onClick={() => onRegisterExit(record)}
                >
                  Registrar Saída
                </MobileRegisterExitButton>
              ) : null}
            </Stack>
          </MobileListCard>
        )
      })}
    </Stack>
  )
}
