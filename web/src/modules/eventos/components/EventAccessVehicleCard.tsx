'use client'

import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { EventVehicleMovementType } from '@/app/api/events/types'
import { TextField, TextFieldLabel, TextFieldStack } from '@/modules/form'

export type EventAccessVehicleValues = {
  driverName: string
  driverDocument: string
  plate: string
  brandModel: string
  color: string
}

export const EMPTY_EVENT_ACCESS_VEHICLE_VALUES: EventAccessVehicleValues = {
  driverName: '',
  driverDocument: '',
  plate: '',
  brandModel: '',
  color: '',
}

type EventAccessVehicleCardProps = {
  movementType: EventVehicleMovementType
  value: EventAccessVehicleValues
  onChange: (value: EventAccessVehicleValues) => void
  plateError?: string
}

export function EventAccessVehicleCard({
  movementType,
  value,
  onChange,
  plateError,
}: EventAccessVehicleCardProps) {
  const isPlateRequired = movementType === 'BUSCA'

  const patch = (field: keyof EventAccessVehicleValues, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue })
  }

  return (
    <MuiCard>
      <CardContent>
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <DirectionsCarRoundedIcon color="primary" fontSize="small" />
            <Typography variant="h4">Dados do Veículo</Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {isPlateRequired
              ? 'Busca de convidado exige um veículo — não é possível registrar uma busca a pé.'
              : 'Preencha apenas se um veículo estiver envolvido nesta movimentação.'}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldStack>
                <TextFieldLabel>Motorista</TextFieldLabel>
                <TextField
                  value={value.driverName}
                  onChange={(event) => patch('driverName', event.target.value)}
                />
              </TextFieldStack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldStack>
                <TextFieldLabel>CPF do motorista</TextFieldLabel>
                <TextField
                  value={value.driverDocument}
                  onChange={(event) => patch('driverDocument', event.target.value)}
                  placeholder="000.000.000-00"
                />
              </TextFieldStack>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextFieldStack>
                <TextFieldLabel required={isPlateRequired}>Placa</TextFieldLabel>
                <TextField
                  value={value.plate}
                  onChange={(event) => patch('plate', event.target.value)}
                  error={Boolean(plateError)}
                  helperText={plateError}
                />
              </TextFieldStack>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextFieldStack>
                <TextFieldLabel>Marca/Modelo</TextFieldLabel>
                <TextField
                  value={value.brandModel}
                  onChange={(event) => patch('brandModel', event.target.value)}
                />
              </TextFieldStack>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextFieldStack>
                <TextFieldLabel>Cor</TextFieldLabel>
                <TextField
                  value={value.color}
                  onChange={(event) => patch('color', event.target.value)}
                />
              </TextFieldStack>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </MuiCard>
  )
}
