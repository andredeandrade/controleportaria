'use client'

import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

import { ResidentsMobileList } from '@/components/moradores/ResidentsMobileList'
import { ResidentsTable } from '@/components/moradores/ResidentsTable'
import { useResidents } from '@/components/moradores/hooks/useResidents'
import { TextField } from '@/components/form'
import { ListSearchField } from '@/components/table/ListSearchField'

export function ResidentsList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    records,
    searchTerm,
    handleSearchChange,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    isLoading,
    isFetching,
    isError,
    errorMessage,
    refetch,
  } = useResidents()

  return (
    <Stack spacing={2}>
      <Stack spacing={1} sx={{ px: { xs: 0.5, sm: 1 } }}>
        <ListSearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nome"
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: 420 },
          }}
        />
      </Stack>

      {isError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => void refetch()}>
              Tentar novamente
            </Button>
          }
        >
          {errorMessage}
        </Alert>
      ) : null}

      {isLoading ? (
        <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : isMobile ? (
        <ResidentsMobileList records={records} />
      ) : (
        <ResidentsTable records={records} />
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
        sx={{ px: { xs: 0.5, sm: 1 } }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Itens por pagina
          </Typography>

          <TextField
            select
            value={String(pagination.pageSize)}
            onChange={(event) => handlePageSizeChange(Number(event.target.value))}
            size="small"
            sx={{ width: 90 }}
          >
            {[10, 20, 50].map((size) => (
              <MenuItem key={size} value={String(size)}>
                {size}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Total: {pagination.total}
          </Typography>

          <Pagination
            color="primary"
            page={pagination.page}
            count={pagination.totalPages}
            onChange={(_, value) => handlePageChange(value)}
            disabled={isLoading || isFetching}
            size={isMobile ? 'small' : 'medium'}
            showFirstButton
            showLastButton
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
