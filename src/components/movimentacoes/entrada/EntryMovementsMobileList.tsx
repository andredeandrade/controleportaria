'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import {
  MobileEntryCard,
  MobileFieldLabel,
  MobileRegisterExitButton,
} from '@/components/movimentacoes/styles/EntryMovements.styles'
import type { EntryMovementRecord } from '@/components/movimentacoes/entrada/hooks/useEntryMovements'

type EntryMovementsMobileListProps = {
  records: EntryMovementRecord[]
  onRegisterExit: (record: EntryMovementRecord) => void
}

export function EntryMovementsMobileList({
  records,
  onRegisterExit,
}: EntryMovementsMobileListProps) {
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
              <MobileFieldLabel variant="caption">Entrada em</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.entryAt}
              </Typography>
            </Stack>

            <MobileRegisterExitButton
              variant="contained"
              size="small"
              onClick={() => onRegisterExit(record)}
            >
              Registrar saída
            </MobileRegisterExitButton>
          </Stack>
        </MobileEntryCard>
      ))}
    </Stack>
  )
}
