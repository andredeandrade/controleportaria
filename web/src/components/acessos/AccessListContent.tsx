'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { AccessExitRegistrationFeedback } from '@/components/acessos/AccessExitRegistrationFeedback'
import { AccessListPagination } from '@/components/acessos/AccessListPagination'
import { AccessListSearch } from '@/components/acessos/AccessListSearch'
import { AccessListTable } from '@/components/acessos/AccessListTable'
import { AccessListTableMobile } from '@/components/acessos/AccessListTableMobile'
import { AccessListViewModeToggle } from '@/components/acessos/AccessListViewModeToggle'
import { useAccessListContext } from '@/components/acessos/context/AccessListContext'

export function AccessListContent() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { pagination } = useAccessListContext()

  return (
    <>
      <Stack spacing={5}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2.5}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          sx={{ px: { xs: 0.5, sm: 1 } }}
        >
          <AccessListSearch />
          <AccessListViewModeToggle />
        </Stack>

        <Typography
          variant="body2"
          color="text.disabled"
          sx={{ fontSize: '0.8125rem', px: { xs: 0.5, sm: 1 } }}
        >
          {pagination.total} acessos encontrados
        </Typography>

        {isMobile ? <AccessListTableMobile /> : <AccessListTable />}

        <AccessListPagination />
      </Stack>

      <AccessExitRegistrationFeedback />
    </>
  )
}
