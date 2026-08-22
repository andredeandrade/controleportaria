'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useAccessListContext } from '@/components/acessos/context/AccessListContext'
import { MobileRegisterExitButton } from '@/components/acessos/styles/AccessStyles'
import { MobileListCard, MobileFieldLabel } from '@/styles/MobileList.styles'

export function AccessListTableMobile() {
  const {
    records,
    showExitActions: showActions,
    handleOpenExitConfirmation: onRegisterExit,
  } = useAccessListContext()

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
              <Stack spacing={0.25}>
                {record.categoryUnits.map((categoryUnit) => (
                  <Typography key={categoryUnit.id} variant="body2" color="#0F172A">
                    {categoryUnit.label}
                  </Typography>
                ))}
              </Stack>
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

            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Saída em</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.exitAt}
              </Typography>
            </Stack>

            {showActions && !record.hasExited ? (
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
