'use client'

import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { ListSearchField } from '@/components/table/ListSearchField'
import { ServiceProvidersMobileList } from '@/components/prestadores-servicos/ServiceProvidersMobileList'
import { ServiceProvidersTable } from '@/components/prestadores-servicos/ServiceProvidersTable'
import { useServiceProviders } from '@/components/prestadores-servicos/hooks/useServiceProviders'

export function ServiceProvidersList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { records, searchTerm, handleSearchChange } = useServiceProviders()

  return (
    <Stack spacing={2}>
      <Stack spacing={1} sx={{ px: { xs: 0.5, sm: 1 } }}>
        <ListSearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por empresa, responsável, documento ou serviço"
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: 420 },
          }}
        />
      </Stack>

      {isMobile ? (
        <ServiceProvidersMobileList records={records} />
      ) : (
        <ServiceProvidersTable records={records} />
      )}
    </Stack>
  )
}
