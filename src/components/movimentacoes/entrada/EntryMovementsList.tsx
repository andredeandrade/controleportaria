'use client'

import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { ExitRegistrationFeedback } from '@/components/movimentacoes/entrada/ExitRegistrationFeedback'
import { EntryMovementsMobileList } from '@/components/movimentacoes/entrada/EntryMovementsMobileList'
import { EntryMovementsTable } from '@/components/movimentacoes/entrada/EntryMovementsTable'
import { useEntryMovements } from '@/components/movimentacoes/entrada/hooks/useEntryMovements'
import { ListSearchField } from '@/components/table/ListSearchField'

export function EntryMovementsList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    records,
    selectedRecord,
    searchTerm,
    handleSearchChange,
    handleOpenExitConfirmation,
    handleCloseExitConfirmation,
  } = useEntryMovements()

  return (
    <>
      <Stack spacing={2}>
        <Stack spacing={1} sx={{ px: { xs: 0.5, sm: 1 } }}>
          <ListSearchField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar por nome, categoria, locomoção ou placa"
            fullWidth
            sx={{
              maxWidth: { xs: '100%', sm: 420 },
            }}
          />
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
