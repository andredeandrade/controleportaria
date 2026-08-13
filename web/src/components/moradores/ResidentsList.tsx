'use client'

import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { ResidentsMobileList } from '@/components/moradores/ResidentsMobileList'
import { ResidentsTable } from '@/components/moradores/ResidentsTable'
import { useResidents } from '@/components/moradores/hooks/useResidents'
import { ListSearchField } from '@/components/table/ListSearchField'

export function ResidentsList() {
  const theme = useTheme()
  const filterHoverBg = alpha(theme.palette.primary.main, 0.05)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    records,
    searchTerm,
    handleSearchChange,
    pagination,
    handlePageChange,
    isLoading,
    isFetching,
    isError,
    errorMessage,
    refetch,
  } = useResidents()

  const rangeStart = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.pageSize + 1
  const rangeEnd = Math.min(pagination.page * pagination.pageSize, pagination.total)

  return (
    <Stack spacing={1.5}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        sx={{ pt: 1.5 }}
      >
        <ListSearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nome, CPF ou unidade..."
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: 384 },
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListRoundedIcon />}
          sx={{
            borderColor: 'divider',
            color: 'text.secondary',
            flexShrink: 0,
            minHeight: 40,
            px: '17px',
            py: '9px',
            '&:hover': {
              borderColor: 'text.disabled',
              backgroundColor: filterHoverBg,
            },
          }}
        >
          Filtros
        </Button>
      </Stack>

      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, pt: 1.5 }}>
        {pagination.total} moradores encontrados
      </Typography>

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
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={1}
        sx={{ pt: 0.5 }}
      >
        <Typography variant="caption" sx={{ color: '#505F76' }}>
          {rangeStart}-{rangeEnd} de {pagination.total} moradores
        </Typography>

        <Pagination
          color="primary"
          page={pagination.page}
          count={pagination.totalPages}
          onChange={(_, value) => handlePageChange(value)}
          disabled={isLoading || isFetching}
          size={isMobile ? 'small' : 'medium'}
          sx={{
            '& .MuiPaginationItem-root': {
              minWidth: 32,
              height: 32,
              borderRadius: '6px',
              color: 'text.secondary',
              fontWeight: 600,
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              color: 'primary.contrastText',
              backgroundColor: 'primary.main',
            },
            '& .MuiPaginationItem-root.Mui-selected:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        />
      </Stack>
    </Stack>
  )
}
