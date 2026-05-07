'use client'

import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { ResidentsMobileList } from '@/components/moradores/ResidentsMobileList'
import { ResidentsTable } from '@/components/moradores/ResidentsTable'
import { useResidents } from '@/components/moradores/hooks/useResidents'
import { ListSearchField } from '@/components/table/ListSearchField'

export function ResidentsList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { records, searchTerm, handleSearchChange } = useResidents()

  return (
    <Stack spacing={2}>
      <Stack spacing={1} sx={{ px: { xs: 0.5, sm: 1 } }}>
        <ListSearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nome, unidade, vínculo, telefone ou placa"
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: 420 },
          }}
        />
      </Stack>

      {isMobile ? <ResidentsMobileList records={records} /> : <ResidentsTable records={records} />}
    </Stack>
  )
}
