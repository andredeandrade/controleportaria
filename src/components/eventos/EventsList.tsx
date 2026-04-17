'use client'

import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { EventsMobileList } from '@/components/eventos/EventsMobileList'
import { EventsTable } from '@/components/eventos/EventsTable'
import { useEvents } from '@/components/eventos/hooks/useEvents'
import { ListSearchField } from '@/components/table/ListSearchField'

export function EventsList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { records, searchTerm, handleSearchChange } = useEvents()

  return (
    <Stack spacing={2}>
      <Stack spacing={1} sx={{ px: { xs: 0.5, sm: 1 } }}>
        <ListSearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por evento, data, unidade ou responsável"
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: 420 },
          }}
        />
      </Stack>

      {isMobile ? <EventsMobileList records={records} /> : <EventsTable records={records} />}
    </Stack>
  )
}
