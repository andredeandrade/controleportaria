'use client'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'

import { AccessExitRegistrationFeedback } from '@/components/acessos/AccessExitRegistrationFeedback'
import { useCheckOutAccessRecord } from '@/components/acessos/hooks/useCheckOutAccessRecord'
import { useAccessList } from '@/components/acessos/hooks/useAccessList'
import { ListSearchField } from '@/components/table/ListSearchField'
import { ListPagination } from '@/components/table/ListPagination'
import type { AccessListViewMode } from '@/types/acessos'
import { AccessListTable } from './AccessListTable'
import { AccessListTableMobile } from './AccessListTableMobile'

export function AccessList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [viewMode, setViewMode] = useState<AccessListViewMode>('all')
  const checkOutMutation = useCheckOutAccessRecord()

  const {
    records,
    pagination,
    selectedRecord,
    searchTerm,
    handleSearchChange,
    handlePageChange,
    handleOpenExitConfirmation,
    handleCloseExitConfirmation,
    isLoading,
    isFetching,
    isError,
    errorMessage,
    refetch,
  } = useAccessList({ viewMode })

  const handleConfirmExit = async (personIds?: string[], observations?: string) => {
    if (!selectedRecord) {
      return
    }

    await checkOutMutation.mutateAsync({
      id: selectedRecord.id,
      personIds,
      observations,
    })
  }

  return (
    <>
      <Stack spacing={5}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2.5}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          sx={{ px: { xs: 0.5, sm: 1 } }}
        >
          <ListSearchField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar por nome, documento ou placa..."
            fullWidth
            sx={{
              maxWidth: { xs: '100%', sm: 420 },
            }}
          />

          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant={viewMode === 'all' ? 'contained' : 'outlined'}
              color={viewMode === 'all' ? 'primary' : 'inherit'}
              onClick={() => setViewMode('all')}
              sx={
                viewMode === 'all'
                  ? undefined
                  : { color: 'text.primary', borderColor: 'rgba(255, 255, 255, 0.1)' }
              }
            >
              Todos
            </Button>

            <Button
              size="small"
              variant={viewMode === 'active' ? 'contained' : 'outlined'}
              color={viewMode === 'active' ? 'primary' : 'inherit'}
              onClick={() => setViewMode('active')}
              sx={
                viewMode === 'active'
                  ? undefined
                  : { color: 'text.primary', borderColor: 'rgba(255, 255, 255, 0.1)' }
              }
            >
              Acesso ativo
            </Button>
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          color="text.disabled"
          sx={{ fontSize: '0.8125rem', px: { xs: 0.5, sm: 1 } }}
        >
          {pagination.total} acessos encontrados
        </Typography>

        {isMobile ? (
          <AccessListTableMobile
            records={records}
            onRegisterExit={handleOpenExitConfirmation}
            showActions
          />
        ) : (
          <AccessListTable
            records={records}
            onRegisterExit={handleOpenExitConfirmation}
            showActions
            isLoading={isLoading}
            isError={isError}
            errorMessage={errorMessage}
            onRetry={refetch}
          />
        )}

        <ListPagination
          pagination={pagination}
          onPageChange={handlePageChange}
          disabled={isLoading || isFetching}
        />
      </Stack>

      <AccessExitRegistrationFeedback
        target={selectedRecord}
        onConfirm={handleConfirmExit}
        isPending={checkOutMutation.isPending}
        errorMessage={checkOutMutation.isError ? checkOutMutation.error.message : null}
        onClose={handleCloseExitConfirmation}
      />
    </>
  )
}
