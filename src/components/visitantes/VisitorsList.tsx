'use client'

import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { ListSearchField } from '@/components/table/ListSearchField'
import { VisitorsMobileList } from '@/components/visitantes/VisitorsMobileList'
import { VisitorsTable } from '@/components/visitantes/VisitorsTable'
import { useVisitors } from '@/components/visitantes/hooks/useVisitors'

export function VisitorsList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { records, searchTerm, handleSearchChange } = useVisitors()

  return (
    <Stack spacing={2}>
      <Stack spacing={1} sx={{ px: { xs: 0.5, sm: 1 } }}>
        <ListSearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nome, documento, unidade ou responsável"
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: 420 },
          }}
        />
      </Stack>

      {isMobile ? <VisitorsMobileList records={records} /> : <VisitorsTable records={records} />}
    </Stack>
  )
}
