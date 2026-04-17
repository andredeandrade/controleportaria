'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { ExitMovementRecord } from '@/components/movimentacoes/saida/hooks/useExitMovements'
import {
  MobileEntryCard,
  MobileFieldLabel,
} from '@/components/movimentacoes/entrada/styles/EntryMovements.styles'

type ExitMovementsMobileListProps = {
  records: ExitMovementRecord[]
}

export function ExitMovementsMobileList({ records }: ExitMovementsMobileListProps) {
  return (
    <Stack spacing={1.5}>
      {records.map((record) => (
        <MobileEntryCard key={record.id} variant="outlined">
          <Stack spacing={1.5}>
            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Nome</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.name}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Categoria</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.category}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Locomoção</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.locomotion}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Placa</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.plate}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Saída em</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.exitAt}
              </Typography>
            </Stack>
          </Stack>
        </MobileEntryCard>
      ))}
    </Stack>
  )
}
