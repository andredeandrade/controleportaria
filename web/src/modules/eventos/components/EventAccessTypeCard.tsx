'use client'

import RouteRoundedIcon from '@mui/icons-material/RouteRounded'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { EventVehicleMovementType } from '@/app/api/events/types'
import { EventVehicleMovementBadge } from '@/modules/eventos/components/EventVehicleMovementBadge'

type MovementOption = {
  value: EventVehicleMovementType
  title: string
  description: string
}

const MOVEMENT_OPTIONS: MovementOption[] = [
  {
    value: 'CONVIDADO',
    title: 'Entrada de convidado',
    description:
      'O convidado entra e permanece no evento. Se houver veículo, ele fica registrado como "no local" até a saída ser feita manualmente.',
  },
  {
    value: 'DESEMBARQUE',
    title: 'Desembarque',
    description:
      'O convidado apenas desce do veículo, que segue livre. A saída do veículo é sempre registrada manualmente depois, sem vínculo com convidados.',
  },
  {
    value: 'BUSCA',
    title: 'Busca de convidado',
    description:
      'Um veículo busca um convidado que já está presente no evento. Veículo é obrigatório e só aceita convidados presentes.',
  },
]

type EventAccessTypeCardProps = {
  value: EventVehicleMovementType
  onChange: (value: EventVehicleMovementType) => void
}

export function EventAccessTypeCard({ value, onChange }: EventAccessTypeCardProps) {
  return (
    <MuiCard>
      <CardContent>
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <RouteRoundedIcon color="primary" fontSize="small" />
            <Typography variant="h4">Tipo de Movimentação</Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            {MOVEMENT_OPTIONS.map((option) => {
              const isSelected = value === option.value

              return (
                <MuiCard
                  key={option.value}
                  variant="outlined"
                  onClick={() => onChange(option.value)}
                  sx={{
                    flex: 1,
                    cursor: 'pointer',
                    borderColor: isSelected ? 'primary.main' : 'divider',
                    borderWidth: isSelected ? 2 : 1,
                    bgcolor: isSelected ? 'rgba(52, 211, 153, 0.08)' : 'transparent',
                  }}
                >
                  <CardContent>
                    <Stack spacing={1.25}>
                      <EventVehicleMovementBadge movementType={option.value} />
                      <Typography variant="body2" fontWeight={700} color="text.primary">
                        {option.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </MuiCard>
              )
            })}
          </Stack>
        </Stack>
      </CardContent>
    </MuiCard>
  )
}
