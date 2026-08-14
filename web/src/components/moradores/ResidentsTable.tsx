'use client'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import type { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/table/DataTable'
import type { ResidentRecord } from '@/types/moradores'

type ResidentsTableProps = {
  records: ResidentRecord[]
}

function formatVehicles(vehicles: ResidentRecord['vehicles']) {
  if (vehicles.length === 0) return '-'
  return vehicles.map((v) => v.plate).join(', ')
}

export function ResidentsTable({ records }: ResidentsTableProps) {
  const theme = useTheme()
  const actionHoverBg = alpha(theme.palette.primary.main, 0.08)
  const rowHoverBg = alpha(theme.palette.primary.main, 0.03)

  const columns: ColumnDef<ResidentRecord>[] = [
    {
      id: 'resident',
      header: 'Morador',
      cell: ({ row }) => (
        <Stack spacing={0.25}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {row.original.name}
          </Typography>
          {row.original.document ? (
            <Typography sx={{ fontSize: '11px', lineHeight: '20px', color: '#505F76' }}>
              CPF: {row.original.document}
            </Typography>
          ) : null}
        </Stack>
      ),
    },
    { accessorKey: 'unit', header: 'Unidade' },
    { accessorKey: 'relation', header: 'Tipo' },
    { accessorKey: 'phone', header: 'Telefone' },
    {
      id: 'vehicles',
      header: 'Veículos',
      cell: ({ row }) => formatVehicles(row.original.vehicles),
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: () => (
        <IconButton
          size="small"
          aria-label="Abrir ações do morador"
          sx={{
            color: 'text.secondary',
            borderRadius: 1,
            p: 0.5,
            '&:hover': {
              color: 'primary.main',
              backgroundColor: actionHoverBg,
            },
          }}
        >
          <MoreVertRoundedIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <DataTable
      data={records}
      columns={columns}
      emptyMessage="Nenhum morador encontrado."
      containerSx={{
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
      }}
      headerCellSx={{
        px: '24px',
        py: '12px',
        backgroundColor: 'grey.50',
        color: 'text.secondary',
        fontSize: '0.875rem',
        fontWeight: 500,
        borderBottom: '1px solid',
        borderColor: 'divider',
        whiteSpace: 'nowrap',
        '&:last-of-type': {
          textAlign: 'right',
        },
      }}
      bodyCellSx={{
        px: '24px',
        py: '12px',
        color: 'text.primary',
        fontSize: '0.875rem',
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-of-type': {
          textAlign: 'right',
        },
      }}
      rowSx={{
        '&:hover': { backgroundColor: rowHoverBg },
        '&:last-child td': { borderBottom: 'none' },
      }}
    />
  )
}
