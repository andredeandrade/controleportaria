// Listagem mobile de ocorrências
'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { MobileListCard, MobileFieldLabel } from '@/styles/MobileList.styles'
import type { OccurrenceRecord } from '@/types/ocorrencias'

type OccurrencesMobileListProps = {
  records: OccurrenceRecord[]
}

export function OccurrencesMobileList({ records }: OccurrencesMobileListProps) {
  if (records.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
        Nenhuma ocorrencia encontrada.
      </Typography>
    )
  }

  return (
    <Stack spacing={1.5}>
      {records.map((record) => (
        <MobileListCard key={record.id}>
          <Stack spacing={0.5}>
            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Tipo</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.occurrenceTypeLabel}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Data</MobileFieldLabel>
                <Typography variant="body2" color="#0F172A">
                  {record.date}
                </Typography>
              </Stack>
              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Hora</MobileFieldLabel>
                <Typography variant="body2" color="#0F172A">
                  {record.time}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Responsável</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.responsible}
              </Typography>
            </Stack>
            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Relato</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.report}
              </Typography>
            </Stack>
          </Stack>
        </MobileListCard>
      ))}
    </Stack>
  )
}
