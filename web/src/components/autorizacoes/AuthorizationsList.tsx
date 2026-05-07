'use client'

import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { ListSearchField } from '@/components/table/ListSearchField'
import { AuthorizationsMobileList } from './AuthorizationsMobileList'
import { useAuthorizations } from './hooks/useAuthorizations'
import { AuthorizationsTable } from './AuthorizationsTable'

export function AuthorizationsList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { records, searchTerm, handleSearchChange } = useAuthorizations()

  return (
    <Stack spacing={2}>
      <Stack spacing={1} sx={{ px: { xs: 0.5, sm: 1 } }}>
        <ListSearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nome ou documento"
          fullWidth
          sx={{ maxWidth: { xs: '100%', sm: 420 } }}
        />
      </Stack>
      {isMobile ? (
        <AuthorizationsMobileList records={records} />
      ) : (
        <AuthorizationsTable records={records} />
      )}
    </Stack>
  )
}
