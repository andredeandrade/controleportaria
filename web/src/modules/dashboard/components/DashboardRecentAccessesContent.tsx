'use client'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { AccessExitRegistrationFeedback } from '@/modules/acessos/components/AccessExitRegistrationFeedback'
import { useAccessListContext } from '@/modules/acessos/context/AccessListContext'

const RECENT_ACCESSES_LIMIT = 4

export function DashboardRecentAccessesContent() {
  const { records, handleOpenExitConfirmation, isLoading, isError, errorMessage, refetch } =
    useAccessListContext()

  const recentRecords = records.slice(0, RECENT_ACCESSES_LIMIT)

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 600,
          }}
        >
          Últimos acessos
        </Typography>

        {isError ? (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
            action={
              <Button color="inherit" size="small" onClick={() => void refetch()}>
                Tentar novamente
              </Button>
            }
          >
            {errorMessage}
          </Alert>
        ) : isLoading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 4 }}>
            <CircularProgress size={24} />
          </Stack>
        ) : recentRecords.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Nenhum acesso registrado.
          </Typography>
        ) : (
          <Stack sx={{ mt: 1 }}>
            {recentRecords.map((record, index) => (
              <Stack
                key={record.id}
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  py: 1.5,
                  borderBottom: index < recentRecords.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'background.default',
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <PersonRoundedIcon sx={{ fontSize: 18 }} />
                </Avatar>

                <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography variant="body2" fontWeight={700} noWrap>
                    {record.name}
                  </Typography>
                  {record.categoryUnits.map((categoryUnit) => (
                    <Typography
                      key={categoryUnit.id}
                      variant="caption"
                      color="text.secondary"
                      noWrap
                    >
                      {categoryUnit.label}
                    </Typography>
                  ))}
                </Stack>

                {record.hasExited ? (
                  <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                    Saída em {record.exitAt}
                  </Typography>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ flexShrink: 0 }}
                    onClick={() => handleOpenExitConfirmation(record)}
                  >
                    Registrar saída
                  </Button>
                )}
              </Stack>
            ))}
          </Stack>
        )}
      </Card>

      <AccessExitRegistrationFeedback />
    </>
  )
}
