'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { EventRecord } from '@/components/eventos/hooks/useEvents'
import { MobileFieldLabel, MobileListCard } from '@/styles/MobileList.styles'

type EventsMobileListProps = {
  records: EventRecord[]
}

export function EventsMobileList({ records }: EventsMobileListProps) {
  return (
    <Stack spacing={1.5}>
      {records.map((record) => (
        <MobileListCard key={record.id} variant="outlined">
          <Stack spacing={1.5}>
            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Evento</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.title}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Data</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.date}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Horário</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.time}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Unidade</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.unit}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Responsável</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.responsibleName}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Convidados</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.guestsCount}
              </Typography>
            </Stack>
          </Stack>
        </MobileListCard>
      ))}
    </Stack>
  )
}
