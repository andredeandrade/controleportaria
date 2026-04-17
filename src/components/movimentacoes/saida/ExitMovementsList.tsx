'use client'

import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { ExitMovementsMobileList } from '@/components/movimentacoes/saida/ExitMovementsMobileList'
import { ExitMovementsTable } from '@/components/movimentacoes/saida/ExitMovementsTable'
import { useExitMovements } from '@/components/movimentacoes/saida/hooks/useExitMovements'
import { ListSearchField } from '@/components/table/ListSearchField'

export function ExitMovementsList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { records, searchTerm, handleSearchChange } = useExitMovements()

  return (
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
        <ExitMovementsMobileList records={records} />
      ) : (
        <ExitMovementsTable records={records} />
      )}
    </Stack>
  )
}
