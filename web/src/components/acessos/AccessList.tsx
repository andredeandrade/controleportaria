'use client'

import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useSearchParams } from 'next/navigation'

import { AccessExitRegistrationFeedback } from '@/components/acessos/AccessExitRegistrationFeedback'
import { useAccessList } from '@/components/acessos/hooks/useAccessList'
import { ListSearchField } from '@/components/table/ListSearchField'
import { AccessListTable } from './AccessListTable'
import { AccessListTableMobile } from './AccessListTableMobile'

export function AccessList() {
  const theme = useTheme()
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const statusParam = searchParams.get('status')
  const viewMode = statusParam === 'history' ? 'history' : 'active'

  const {
    records,
    selectedRecord,
    searchTerm,
    handleSearchChange,
    handleOpenExitConfirmation,
    handleCloseExitConfirmation,
  } = useAccessList({ viewMode })

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
          <AccessListTableMobile records={records} onRegisterExit={handleOpenExitConfirmation} />
        ) : (
          <AccessListTable records={records} onRegisterExit={handleOpenExitConfirmation} />
        )}
      </Stack>

      <AccessExitRegistrationFeedback
        target={selectedRecord}
        onClose={handleCloseExitConfirmation}
      />
    </>
  )
}
