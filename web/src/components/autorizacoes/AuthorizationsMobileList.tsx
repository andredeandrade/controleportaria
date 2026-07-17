// Listagem mobile de autorizações
'use client'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'

import { MobileListCard, MobileFieldLabel } from '@/styles/MobileList.styles'
import type { AuthorizationRecord } from '@/types/autorizacoes'

type AuthorizationsMobileListProps = {
  records: AuthorizationRecord[]
}

export function AuthorizationsMobileList({ records }: AuthorizationsMobileListProps) {
  const router = useRouter()

  if (records.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
        Nenhuma autorizacao encontrada.
      </Typography>
    )
  }

  return (
    <Stack spacing={1.5}>
      {records.map((record) => (
        <MobileListCard key={record.id}>
          <Stack spacing={0.5}>
            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Autorizado</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.authorizedName}
              </Typography>
            </Stack>
            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Tipo</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.personTypeLabel}
              </Typography>
            </Stack>
            <Stack spacing={0.25}>
              <MobileFieldLabel variant="caption">Documento</MobileFieldLabel>
              <Typography variant="body2" color="#0F172A">
                {record.document}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Válido de</MobileFieldLabel>
                <Typography variant="body2" color="#0F172A">
                  {record.validFromDate}
                </Typography>
              </Stack>
              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Válido até</MobileFieldLabel>
                <Typography variant="body2" color="#0F172A">
                  {record.validToDate}
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              size="small"
              onClick={() => router.push('/movimentacoes/entrada/registrar')}
              sx={{
                mt: 0.5,
                minWidth: 148,
                alignSelf: 'flex-start',
                bgcolor: '#16A34A',
                color: '#FFFFFF',
                fontWeight: 700,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#15803D',
                  boxShadow: 'none',
                },
              }}
            >
              Registrar entrada
            </Button>
          </Stack>
        </MobileListCard>
      ))}
    </Stack>
  )
}
