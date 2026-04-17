'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { ResidentRecord } from '@/components/moradores/hooks/useResidents'
import { MobileFieldLabel, MobileListCard } from '@/styles/MobileList.styles'

type ResidentsMobileListProps = {
  records: ResidentRecord[]
}

function formatVehicles(vehicles: ResidentRecord['vehicles']) {
  if (vehicles.length === 0) {
    return 'Sem veículo cadastrado'
  }

  return vehicles.map((vehicle) => `${vehicle.type}: ${vehicle.plate}`).join(' | ')
}

export function ResidentsMobileList({ records }: ResidentsMobileListProps) {
  return (
    <Stack spacing={1.5}>
      {records.map((record) => (
        <MobileListCard key={record.id} variant="outlined">
          <Stack spacing={1.5}>
            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Nome</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.name}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Unidade</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.unit}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Vínculo</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.relation}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Telefone</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.phone}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Veículos</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {formatVehicles(record.vehicles)}
              </Typography>
            </Stack>
          </Stack>
        </MobileListCard>
      ))}
    </Stack>
  )
}
