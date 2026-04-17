'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { ServiceProviderRecord } from '@/components/prestadores-servicos/hooks/useServiceProviders'
import { MobileFieldLabel, MobileListCard } from '@/styles/MobileList.styles'

type ServiceProvidersMobileListProps = {
  records: ServiceProviderRecord[]
}

export function ServiceProvidersMobileList({ records }: ServiceProvidersMobileListProps) {
  return (
    <Stack spacing={1.5}>
      {records.map((record) => (
        <MobileListCard key={record.id} variant="outlined">
          <Stack spacing={1.5}>
            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Empresa</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.companyName}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Responsável</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.responsibleName}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">CNPJ/CPF</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.document}
              </Typography>
            </Stack>

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Tipo de serviço</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.serviceType}
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