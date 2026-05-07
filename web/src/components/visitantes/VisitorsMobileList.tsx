'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { MobileFieldLabel, MobileListCard } from '@/styles/MobileList.styles'
import type { VisitorRecord } from '@/components/visitantes/hooks/useVisitors'

type VisitorsMobileListProps = {
  records: VisitorRecord[]
}

export function VisitorsMobileList({ records }: VisitorsMobileListProps) {
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
              <MobileFieldLabel variant="caption">CPF/RG</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.document}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Unidade</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.unit}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Autorizado por</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.authorizedBy}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Telefone</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.phone}
              </Typography>
            </Stack>
          </Stack>
        </MobileListCard>
      ))}
    </Stack>
  )
}
