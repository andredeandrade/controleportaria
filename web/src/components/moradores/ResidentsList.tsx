'use client'

import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { ResidentsMobileList } from '@/components/moradores/ResidentsMobileList'
import { ResidentsTable } from '@/components/moradores/ResidentsTable'
import { useResidents } from '@/components/moradores/hooks/useResidents'
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
    isLoading,
    isFetching,
    isError,
    errorMessage,
    refetch,
  } = useResidents()

  const rangeStart = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.pageSize + 1
  const rangeEnd = Math.min(pagination.page * pagination.pageSize, pagination.total)

  return (
    <Stack spacing={6} mt={20}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        <ListSearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nome, unidade ou documento..."
          fullWidth
          sx={{
            maxWidth: { xs: '100%', sm: 400 },
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#131b2e',
              '& input': { color: '#dae2fd' },
              '& input::placeholder': { color: '#8c909f', opacity: 1 },
              '& .MuiInputAdornment-root svg': { color: '#8c909f' },
              '& fieldset': { borderColor: '#424754' },
              '&:hover fieldset': { borderColor: '#8c909f' },
              '&.Mui-focused fieldset': { borderColor: '#adc6ff', borderWidth: 2 },
            },
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListRoundedIcon />}
          sx={{
            borderColor: '#424754',
            color: '#c2c6d6',
            flexShrink: 0,
            '&:hover': { borderColor: '#8c909f', backgroundColor: 'rgba(173, 198, 255, 0.06)' },
          }}
        >
          Filtros
        </Button>
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
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={1}
      >
        <Typography variant="body2" sx={{ color: '#8c909f' }}>
          Mostrando {rangeStart} a {rangeEnd} de {pagination.total} registros
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
  )
}
