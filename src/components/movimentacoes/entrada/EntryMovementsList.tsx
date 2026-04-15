'use client'

import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { RecentRecordsTitle } from '@/components/movimentacoes/entrada/styles/EntryMovements.styles'
import { ExitRegistrationFeedback } from '@/components/movimentacoes/entrada/ExitRegistrationFeedback'
import { EntryMovementsMobileList } from '@/components/movimentacoes/entrada/EntryMovementsMobileList'
import { EntryMovementsTable } from '@/components/movimentacoes/entrada/EntryMovementsTable'
import { useEntryMovements } from '@/components/movimentacoes/entrada/hooks/useEntryMovements'

export function EntryMovementsList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { records, selectedRecord, handleOpenExitConfirmation, handleCloseExitConfirmation } =
    useEntryMovements()

  return (
    <>
      <Stack spacing={2}>
        <Stack spacing={0.5} sx={{ px: { xs: 0.5, sm: 1 } }}>
          <RecentRecordsTitle variant="body1">Registros recentes</RecentRecordsTitle>
        </Stack>

        {isMobile ? (
          <EntryMovementsMobileList records={records} onRegisterExit={handleOpenExitConfirmation} />
        ) : (
          <EntryMovementsTable records={records} onRegisterExit={handleOpenExitConfirmation} />
        )}
      </Stack>

      <ExitRegistrationFeedback target={selectedRecord} onClose={handleCloseExitConfirmation} />
    </>
  )
}
