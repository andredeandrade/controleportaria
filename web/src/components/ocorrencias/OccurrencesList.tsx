'use client'

import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { ListSearchField } from '@/components/table/ListSearchField'
import { OccurrencesMobileList } from './OccurrencesMobileList'
import { useOccurrences } from './hooks/useOccurrences'
import { OccurrencesTable } from './OccurrencesTable'

export function OccurrencesList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { records, searchTerm, handleSearchChange } = useOccurrences()

  return (
    <Stack spacing={2}>
      <Stack spacing={1} sx={{ px: { xs: 0.5, sm: 1 } }}>
        <ListSearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por tipo, data, relato ou responsável"
          fullWidth
          sx={{ maxWidth: { xs: '100%', sm: 420 } }}
        />
      </Stack>
      {isMobile ? (
        <OccurrencesMobileList records={records} />
      ) : (
        <OccurrencesTable records={records} />
      )}
    </Stack>
  )
}
