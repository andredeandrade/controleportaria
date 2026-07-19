'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { MobileRegisterExitButton } from '@/components/acessos/styles/AccessStyles'
import { MobileListCard, MobileFieldLabel } from '@/styles/MobileList.styles'
import type { AccessRecord } from '@/components/acessos/hooks/useAccessList'

type AccessListTableMobileProps = {
  records: AccessRecord[]
  showActions: boolean
  onRegisterExit: (record: AccessRecord) => void
}

export function AccessListTableMobile({
  records,
  showActions,
  onRegisterExit,
}: AccessListTableMobileProps) {
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

            {showActions ? (
              <MobileRegisterExitButton
                variant="contained"
                size="small"
                onClick={() => onRegisterExit(record)}
              >
                Registrar saida
              </MobileRegisterExitButton>
            ) : null}
          </Stack>
        </MobileListCard>
      ))}
    </Stack>
  )
}
